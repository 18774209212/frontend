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
              <a-form-item label="名称"
                           :labelCol="{span: 5}"
                           :wrapperCol="{span: 18, offset: 1}">
                <a-input v-model="queryParams.companyName" />
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
        <a-button v-hasPermission="'admin:company:add'"
                  type="primary"
                  ghost
                  @click="add">新增</a-button>
        <a-button v-hasPermission="'admin:company:delete'"
                  @click="batchDelete">删除</a-button>
        <a-dropdown v-hasPermission="'admin:company:export'">
          <a-menu slot="overlay">
            <a-menu-item key="export-data"
                         @click="exportExcel">导出Excel</a-menu-item>
          </a-menu>
          <a-button>
            更多操作
            <a-icon type="down" />
          </a-button>
        </a-dropdown>
      </div>
      <!-- 表格区域 -->
      <a-table :columns="columns"
               :dataSource="dataSource"
               rowKey="companyId"
               :pagination="pagination"
               :loading="loading"
               :scroll="{ x: 900 }"
               :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
               @change="handleTableChange">
        <template slot="operation"
                  slot-scope="text, record">
          <a-icon type="eye"
                  theme="twoTone"
                  twoToneColor="#42b983"
                  @click="view(record)"
                  title="查看"></a-icon>
          <a-icon v-hasPermission="'admin:company:update'"
                  type="edit"
                  theme="twoTone"
                  twoToneColor="#faad14"
                  @click="edit(record)"
                  title="修改"></a-icon>
          <a-badge v-hasNoPermission="'admin:company:update'"
                   status="warning"
                   text="无权限"></a-badge>
        </template>
      </a-table>
    </div>
    <!-- 新增企业 -->
    <company-add @success="handleCompanyAddSuccess"
                 @close="handleCompanyAddClose"
                 :companyAddVisiable="companyAddVisiable">
    </company-add>
    <!-- 修改企业 -->
    <company-edit ref="companyEdit"
                  @success="handleCompanyEditSuccess"
                  @close="handleCompanyEditClose"
                  :companyEditVisiable="companyEditVisiable">
    </company-edit>
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
import RangeDate from '@/components/datetime/RangeDate'
import Info from '@/components/info/Info'
import CompanyAdd from './CompanyAdd'
import CompanyEdit from './CompanyEdit'

export default {
  name: 'Company',
  components: { CompanyAdd, CompanyEdit, RangeDate, Info },
  data () {
    return {
      advanced: false,
      dataSource: [],
      selectedRowKeys: [],
      queryParams: {},
      sortedInfo: null,
      info: {
        visiable: false,
        label: {
          top: {
            companyId: '企业ID',
            companyName: '企业名称',
            linkman: '联系人',
            linkphone: '联系电话',
            province: '省',
            city: '市',
            area: '县',
            postcode: '邮编',
            address: '详细地址',
            lng: '经度',
            lat: '纬度',
            createTime: '创建时间',
            modifyTime: '修改时间'
          },
          bottom: {
            introduce: '企业介绍'
          }
        },
        data: {},
        images: []
      },
      pagination: {
        defaultPageSize: 10000000,
        hideOnSinglePage: true,
        indentSize: 100
      },
      loading: false,
      companyAddVisiable: false,
      companyEditVisiable: false
    }
  },
  computed: {
    columns () {
      let { sortedInfo } = this
      sortedInfo = sortedInfo || {}
      return [{
        title: '企业名称',
        dataIndex: 'companyName'
      }, {
        title: '企业编号',
        dataIndex: 'companyNumber'
      }, {
        title: '联系人',
        dataIndex: 'linkman'
      }, {
        title: '联系电话',
        dataIndex: 'linkphone'
      }, {
        title: '省',
        dataIndex: 'province'
      }, {
        title: '市',
        dataIndex: 'city'
      }, {
        title: '县',
        dataIndex: 'area'
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
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    view (record) {
      this.info.data = record
      this.info.images = [record.picture]
      this.info.visiable = true
    },
    handleInfoClose () {
      this.info.visiable = false
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    handleCompanyAddClose () {
      this.companyAddVisiable = false
    },
    handleCompanyAddSuccess () {
      this.companyAddVisiable = false
      this.$message.success('新增企业成功')
      this.fetch()
    },
    add () {
      this.companyAddVisiable = true
    },
    handleCompanyEditClose () {
      this.companyEditVisiable = false
    },
    handleCompanyEditSuccess () {
      this.companyEditVisiable = false
      this.$message.success('修改企业成功')
      this.fetch()
    },
    edit (record) {
      this.companyEditVisiable = true
      this.$refs.companyEdit.setFormValues(record)
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
          that.$delete('admin/company/' + that.selectedRowKeys.join(',')).then(() => {
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
    exportExcel () {
      let { sortedInfo } = this
      let sortField, sortOrder
      // 获取当前列的排序和列的过滤规则
      if (sortedInfo) {
        sortField = sortedInfo.field
        sortOrder = sortedInfo.order
      }
      this.$export('admin/company/excel', {
        sortField: sortField,
        sortOrder: sortOrder,
        ...this.queryParams
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
      this.$get('admin/company', {
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
