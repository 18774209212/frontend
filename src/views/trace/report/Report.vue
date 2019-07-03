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
              <a-form-item label="检验报告名"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}">
                <a-input v-model="queryParams.reportName" />
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
      <div class="operator">
        <a-button v-hasPermission="'report:delete'"
                  type="primary"
                  ghost
                  @click="reportDelete">删除</a-button>
      </div>
      <!-- 表格区域 -->
      <a-table ref="TableInfo"
               :columns="columns"
               :dataSource="dataSource"
               rowKey="reportId"
               :pagination="pagination"
               :loading="loading"
               :scroll="{ x: 900 }"
               :rowSelection="rowSelection"
               @change="handleTableChange">
        <template slot="operation"
                  slot-scope="text, record">
          <div v-if="current_user.username === record.creator">
            <a-icon type="eye"
                    theme="twoTone"
                    twoToneColor="#42b983"
                    @click="view(record)"
                    title="查看"></a-icon>
            <a-icon v-hasPermission="'report:update'"
                    type="edit"
                    theme="twoTone"
                    twoToneColor="#faad14"
                    @click="edit(record)"
                    title="修改"></a-icon>
            <a-badge v-hasNoPermission="'report:update'"
                     status="warning"
                     text="无权限"></a-badge>
          </div>
          <a-badge v-else
                   status="warning"
                   text="无权限"></a-badge>
        </template>
      </a-table>
    </div>
    <!-- 修改检验报告 -->
    <report-edit ref="reportEdit"
                 @success="handleReportEditSuccess"
                 @close="handleReportEditClose"
                 :reportEditVisiable="reportEditVisiable">
    </report-edit>
    <!-- 信息查看 -->
    <info :data="info.data"
          :images="info.images"
          :label="info.label"
          :infoVisiable="info.visiable"
          @close="handleInfoClose">
    </info>
  </a-card>
</template>

<script>
import Info from '@/components/info/Info'
import ReportEdit from './ReportEdit'

export default {
  name: 'Report',
  components: { ReportEdit, Info },
  data () {
    return {
      current_user: this.$store.state.account.user,
      advanced: false,
      dataSource: [],
      selectedRowKeys: [],
      queryParams: {},
      sortedInfo: null,
      loading: false,
      reportEditVisiable: false,
      paginationInfo: null,
      info: {
        visiable: false,
        label: {
          top: {
            batchId: '批次号',
            reportId: '检验报告ID',
            reportName: '检验报告名称',
            surveyor: '检验人',
            result: '检验结果'
          }
        },
        data: {},
        images: []
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
        dataIndex: 'batchId',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'createTime' && sortedInfo.order
      }, {
        title: '报告ID',
        dataIndex: 'reportId'
      }, {
        title: '报告名称',
        dataIndex: 'reportName'
      }, {
        title: '检验人',
        dataIndex: 'surveyor'
      }, {
        title: '检验结果',
        dataIndex: 'result'
      }, {
        title: '操作',
        dataIndex: 'operations',
        scopedSlots: { customRender: 'operation' },
        fixed: 'right',
        width: 120
      }]
    },
    rowSelection () {
      let that = this
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          that.selectedRowKeys = selectedRowKeys
        },
        getCheckboxProps: report => ({
          props: {
            disabled: report.creator !== that.current_user.username,
            name: report.creator
          }
        })
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    view (record) {
      this.info.data = record
      this.info.images = JSON.parse(record.picture)
      this.info.visiable = true
    },
    handleInfoClose () {
      this.info.visiable = false
    },
    edit (record) {
      this.reportEditVisiable = true
      this.$refs.reportEdit.setFormValues(record)
    },
    handleReportEditClose () {
      this.reportEditVisiable = false
    },
    handleReportEditSuccess () {
      this.reportEditVisiable = false
      this.$message.success('修改检验报告成功')
      this.fetch()
    },
    reportDelete () {
      if (!this.selectedRowKeys.length) {
        this.$message.warning('请选择需要删除的记录')
        return
      }
      let that = this
      this.$confirm({
        title: '确定删除所选中的记录?',
        content: '当您点击确定按钮后，这些记录将会被彻底删除！',
        centered: true,
        onOk () {
          that.$delete('report/' + that.selectedRowKeys.join(',')).then(() => {
            that.$message.success('删除成功')
            that.selectedRowKeys = []
            that.fetch()
          })
        },
        onCancel () {
          that.selectedRowKeys = []
        }
      })
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
      // 取消选中
      this.selectedRowKeys = []
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
      params.creator = this.current_user.username
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
      this.$get('report', {
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
