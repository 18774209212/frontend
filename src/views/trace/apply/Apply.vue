<template>
  <a-card :bordered="false"
          class="card-area">
    <div :class="advanced ? 'search' : null">
      <!-- 搜索区域 -->
      <a-form layout="horizontal">
        <div :class="advanced ? null: 'fold'">
          <a-row>
            <a-col :md="12"
                   :sm="24">
              <a-form-item label="批次号"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}">
                <a-input v-model="queryParams.batchId" />
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24">
              <span style="float: left; margin-top: 3px; margin-left: 15px;">
                <a-button type="primary"
                          @click="search">查询</a-button>
                <a-button style="margin-left: 8px"
                          @click="reset">重置</a-button>
              </span>
            </a-col>
          </a-row>
        </div>
      </a-form>
    </div>
    <div>
      <!-- 表格区域 -->
      <a-table ref="TableInfo"
               :columns="columns"
               :dataSource="dataSource"
               rowKey="applyId"
               :pagination="pagination"
               :loading="loading"
               :scroll="{ x: 900 }"
               @change="handleTableChange">
        <span slot="status"
              slot-scope="status">
          <a-tag v-if="status === 0"
                 color="blue">审核中</a-tag>
          <a-tag v-else-if="status === 1"
                 color="green">申请成功</a-tag>
          <a-tag v-else-if="status === 2"
                 color="red">审核不通过</a-tag>
        </span>
        <template slot="operation"
                  slot-scope="text, record">
          <a-icon type="eye"
                  theme="twoTone"
                  twoToneColor="#42b983"
                  @click="view(record)"
                  title="查看"></a-icon>
          <a-icon v-if="record.status === 1"
                  type="qrcode"
                  title="下载二维码图片"
                  @click="showQrModal(record.batchId, record.applyId)" />
          <a-icon v-if="record.status === 1"
                  title="下载二维码URL"
                  type="file-text"
                  @click="downloadQrUrl(record.applyId)" />
        </template>
      </a-table>
    </div>
    <!-- 信息查看 -->
    <info :data="info.data"
          :label="info.label"
          :infoVisiable="info.visiable"
          @close="handleInfoClose">
    </info>
    <a-modal title="生成二维码"
             :confirmLoading="qrLoading"
             v-model="qrVisible"
             @ok="qrOk"
             :okText="qrLoading?'生成中':'确认'"
             cancelText="取消">
      请输入二维码尺寸：
      <a-input-number :min="10"
                      :max="300"
                      v-model="size" />
    </a-modal>
  </a-card>
</template>

<script>
import Info from '@/components/info/Info'

export default {
  name: 'Apply',
  components: { Info },
  data () {
    return {
      current_user: this.$store.state.account.user,
      advanced: false,
      dataSource: [],
      queryParams: {},
      sortedInfo: null,
      loading: false,
      batchId: null,
      applyId: null,
      qrVisible: false,
      qrLoading: false,
      size: 128,
      paginationInfo: null,
      info: {
        visiable: false,
        label: {
          top: {
            batchId: '批次号',
            num: '申请数量',
            startId: '码段开始值',
            endId: '码段结束值',
            applyTime: '申请时间',
            auditTime: '审核时间',
            status: '状态'
          }
        },
        data: {}
      },
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '100'],
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
      }
    }
  },
  computed: {
    columns () {
      let { sortedInfo } = this
      sortedInfo = sortedInfo || {}
      return [{
        title: '批次号',
        dataIndex: 'batchId'
      }, {
        title: '申请数量',
        dataIndex: 'num'
      }, {
        title: '申请人',
        dataIndex: 'applicant'
      }, {
        title: '码段开始值',
        dataIndex: 'startId'
      }, {
        title: '码段结束值',
        dataIndex: 'endId'
      }, {
        title: '申请时间',
        dataIndex: 'applyTime',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'applyTime' && sortedInfo.order
      }, {
        title: '审核时间',
        dataIndex: 'auditTime'
      }, {
        title: '状态',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
        fixed: 'right',
        width: 120
      }]
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    view (record) {
      this.info.data = record
      this.info.visiable = true
    },
    handleInfoClose () {
      this.info.visiable = false
    },
    downloadQrUrl (id) {
      var myFrame = document.createElement('iframe')
      myFrame.src = 'api/anon/apply/generateCodeUrl?applyId=' + id
      myFrame.style.display = 'none'
      document.body.appendChild(myFrame)
    },
    showQrModal (batchId, applyId) {
      this.batchId = batchId
      this.applyId = applyId
      this.qrVisible = true
    },
    qrOk () {
      var myFrame = document.createElement('iframe')
      myFrame.src = 'api/anon/apply/generateCode?applyId=' + this.applyId + '&size=' + this.size
      myFrame.style.display = 'none'
      document.body.appendChild(myFrame)
    },
    search () {
      let { sortedInfo } = this
      let sortField, sortOrder
      // 获取当前列的排序和列的过滤规则
      if (sortedInfo) {
        sortField = sortedInfo.field
        sortOrder = sortedInfo.order
      }
      this.fetch({
        sortField: sortField,
        sortOrder: sortOrder,
        ...this.queryParams
      })
    },
    reset () {
      // 重置列排序规则
      this.sortedInfo = null
      // 重置查询参数
      this.queryParams = {}
      this.fetch()
    },
    handleTableChange (pagination, filters, sorter) {
      // 将这三个参数赋值给Vue data，用于后续使用
      this.paginationInfo = pagination
      this.filteredInfo = filters
      this.sortedInfo = sorter

      this.fetch({
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...this.queryParams,
        ...filters
      })
    },
    fetch (params = {}) {
      this.loading = true
      if (this.paginationInfo) {
        // 如果分页信息不为空，则设置表格当前第几页，每页条数，并设置查询分页参数
        this.$refs.TableInfo.pagination.current = this.paginationInfo.current
        this.$refs.TableInfo.pagination.pageSize = this.paginationInfo.pageSize
        params.pageSize = this.paginationInfo.pageSize
        params.pageNum = this.paginationInfo.current
      } else {
        // 如果分页信息为空，则设置为默认值
        params.pageSize = this.pagination.defaultPageSize
        params.pageNum = this.pagination.defaultCurrent
      }
      this.$get('apply/page', {
        ...params
      }).then((r) => {
        let data = r.data
        this.dataSource = data.rows
        const pagination = { ...this.pagination }
        pagination.total = data.total
        this.pagination = pagination
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../../../static/less/Common";
</style>
