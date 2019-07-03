/* eslint-disable space-before-function-paren */
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
              <a-form-item label="批次名"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}">
                <a-input v-model="queryParams.batchName" />
              </a-form-item>
            </a-col>
            <a-col :md="12"
                   :sm="24">
              <a-form-item label="创建时间"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}">
                <range-date @change="handleDateChange"
                            ref="createTime"></range-date>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary"
                    @click="search">查询</a-button>
          <a-button style="margin-left: 8px"
                    @click="reset">重置</a-button>
        </span>
      </a-form>
    </div>
    <div>
      <div class="operator">
        <a-button v-hasPermission="'batch:delete'"
                  type="primary"
                  ghost
                  @click="batchDelete">删除</a-button>
      </div>
      <!-- 表格区域 -->
      <a-table ref="TableInfo"
               :columns="columns"
               :dataSource="dataSource"
               rowKey="batchId"
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
            <a-icon v-hasPermission="'batch:update'"
                    type="edit"
                    theme="twoTone"
                    twoToneColor="#faad14"
                    @click="edit(record)"
                    title="修改"></a-icon>
            <a-icon v-if="!record.hash" type="link" title="上链" @click="showBlockchain(record.batchId)"/>
            <a-dropdown>
              <a class="ant-dropdown-link">
                <a-icon type="plus" title="添加"/>
              </a>
              <a-menu slot="overlay">
                <a-menu-item v-hasPermission="'record:add'">
                  <a @click="addRecord(record.batchId)">生产档案</a>
                </a-menu-item>
                <a-menu-item v-hasPermission="'report:add'">
                  <a @click="addReport(record.batchId)">检验报告</a>
                </a-menu-item>
                <a-menu-item v-hasPermission="'report:add'">
                  <a @click="addApply(record.batchId)">申请标签</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </div>
          <a-badge v-else
                   status="warning"
                   text="无权限"></a-badge>
        </template>
      </a-table>
    </div>
    <!-- 修改批次 -->
    <batch-edit ref="batchEdit"
                @success="handleBatchEditSuccess"
                @close="handleBatchEditClose"
                :batchEditVisiable="batchEditVisiable">
    </batch-edit>
    <!-- 新增生产档案 -->
    <record-add @success="handleRecordAddSuccess"
                @close="handleRecordAddClose"
                :recordAddVisiable="recordAddVisiable"
                :batchId="batchId">
    </record-add>
    <!-- 新增检验报告 -->
    <report-add @success="handleReportAddSuccess"
                @close="handleReportAddClose"
                :reportAddVisiable="reportAddVisiable"
                :batchId="batchId">
    </report-add>
    <!-- 申请标签 -->
    <apply-add @success="handleApplyAddSuccess"
               @close="handleApplyAddClose"
               :applyAddVisiable="applyAddVisiable"
               :batchId="batchId">
    </apply-add>
    <!-- 信息查看 -->
    <info :data="info.data"
          :label="info.label"
          :infoVisiable="info.visiable"
          @close="handleInfoClose">
    </info>
    <!-- 信息上链 -->
    <a-modal title="批次上链"
             :confirmLoading="confirmLoading"
             :maskClosable=false
             v-model="blockchainVisible"
             @ok="blockchainOk"
             :okText="confirmLoading?'上链中...':'确认'"
             cancelText="取消">
      上链批次号：{{this.batchId}}
    </a-modal>
  </a-card>
</template>

<script>
import RangeDate from '@/components/datetime/RangeDate'
import Info from '@/components/info/Info'
import BatchEdit from './BatchEdit'
import RecordAdd from '../record/RecordAdd'
import ReportAdd from '../report/ReportAdd'
import ApplyAdd from '../apply/ApplyAdd'

export default {
  name: 'Batch',
  components: { BatchEdit, RangeDate, RecordAdd, ReportAdd, Info, ApplyAdd },
  data () {
    return {
      current_user: this.$store.state.account.user,
      advanced: false,
      dataSource: [],
      selectedRowKeys: [],
      queryParams: {},
      sortedInfo: null,
      loading: false,
      batchEditVisiable: false,
      recordAddVisiable: false,
      applyAddVisiable: false,
      blockchainVisible: false,
      confirmLoading: false,
      batchId: null,
      reportAddVisiable: false,
      paginationInfo: null,
      info: {
        visiable: false,
        label: {
          top: {
            productName: '产品名',
            batchId: '批次号',
            producer: '生产者',
            informTitle: '通知标题',
            informContent: '通知内容',
            produceDate: '生产日期',
            createTime: '创建时间',
            hash: '验证hash'
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
        title: '产品名',
        dataIndex: 'productName'
      }, {
        title: '批次号',
        dataIndex: 'batchId'
      }, {
        title: '批次名',
        dataIndex: 'batchName'
      }, {
        title: '生产者',
        dataIndex: 'producer'
      }, {
        title: '生产日期',
        dataIndex: 'produceDate'
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        sorter: true,
        sortOrder: sortedInfo.columnKey === 'createTime' && sortedInfo.order
      }, {
        title: '操作',
        dataIndex: 'operation',
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
        getCheckboxProps: record => ({
          props: {
            disabled: record.creator !== that.current_user.username,
            name: record.creator
          }
        })
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    showBlockchain (batchId) {
      this.batchId = batchId
      this.blockchainVisible = true
    },
    blockchainOk () {
      this.confirmLoading = true
      this.$post('batch/blockchain', {
        batchId: this.batchId
      }).then(() => {
        this.$message.success('上链成功')
        this.confirmLoading = false
        this.blockchainVisible = false
        this.search()
      }).catch(() => {
        this.confirmLoading = false
      })
    },
    view (record) {
      this.info.data = record
      this.info.visiable = true
    },
    handleInfoClose () {
      this.info.visiable = false
    },
    addApply (id) {
      this.batchId = id
      this.applyAddVisiable = true
    },
    handleApplyAddClose () {
      this.applyAddVisiable = false
    },
    handleApplyAddSuccess () {
      this.applyAddVisiable = false
      this.$message.success('提交成功')
    },
    addRecord (id) {
      this.batchId = id
      this.recordAddVisiable = true
    },
    handleRecordAddClose () {
      this.recordAddVisiable = false
    },
    handleRecordAddSuccess () {
      this.recordAddVisiable = false
      this.$message.success('新增档案成功')
    },
    addReport (id) {
      this.batchId = id
      this.reportAddVisiable = true
    },
    handleReportAddClose () {
      this.reportAddVisiable = false
    },
    handleReportAddSuccess () {
      this.reportAddVisiable = false
      this.$message.success('新增检验报告成功')
    },
    handleBatchEditClose () {
      this.batchEditVisiable = false
    },
    handleBatchEditSuccess () {
      this.batchEditVisiable = false
      this.$message.success('修改批次成功')
      this.fetch()
    },
    edit (record) {
      this.batchEditVisiable = true
      this.$refs.batchEdit.setFormValues(record)
    },
    handleDateChange (value) {
      if (value) {
        this.queryParams.createTimeFrom = value[0]
        this.queryParams.createTimeTo = value[1]
      }
    },
    batchDelete () {
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
          that.$delete('batch/' + that.selectedRowKeys.join(',')).then(() => {
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
      // 清空时间选择
      this.$refs.createTime.reset()
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
      this.$get('batch', {
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
