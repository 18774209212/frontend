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
                <a-input v-model="queryParams.productName" />
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
        <a-button v-hasPermission="'product:add'"
                  type="primary"
                  ghost
                  @click="add">新增</a-button>
        <a-button v-hasPermission="'product:delete'"
                  @click="batchDelete">删除</a-button>
      </div>
      <!-- 表格区域 -->
      <a-table ref="TableInfo"
               :columns="columns"
               :dataSource="dataSource"
               rowKey="productId"
               :pagination="pagination"
               :loading="loading"
               :scroll="{ x: 900 }"
               :rowSelection="rowSelection"
               @change="handleTableChange">
        <template slot="operation"
                  slot-scope="text, record">
          <div v-if="current_user.username === record.username">
            <a-icon type="eye"
                    theme="twoTone"
                    twoToneColor="#42b983"
                    @click="view(record)"
                    title="查看"></a-icon>
            <a-icon v-hasPermission="'product:update'"
                    type="edit"
                    theme="twoTone"
                    twoToneColor="#faad14"
                    @click="edit(record)"
                    title="修改"></a-icon>
            <a-dropdown>
              <a class="ant-dropdown-link">
                <a-icon type="plus" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item v-hasPermission="'batch:add'">
                  <a @click="addBatch(record.productId)">添加批次</a>
                </a-menu-item>
                <a-menu-item v-hasPermission="'batch:add'">
                  <a @click="addVideo(record.productId)">添加视频</a>
                </a-menu-item>
                <a-menu-item v-hasPermission="'batch:add'">
                  <a @click="addDetail(record.productId)">添加产品详情</a>
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
    <!-- 新增产品 -->
    <product-add @success="handleProductAddSuccess"
                 @close="handleProductAddClose"
                 :productAddVisiable="productAddVisiable">
    </product-add>
    <!-- 修改产品 -->
    <product-edit ref="productEdit"
                  @success="handleProductEditSuccess"
                  @close="handleProductEditClose"
                  :productEditVisiable="productEditVisiable">
    </product-edit>
    <!-- 新增批次 -->
    <batch-add @success="handleBatchAddSuccess"
               @close="handleBatchAddClose"
               :batchAddVisiable="batchAddVisiable"
               :productId="productId">
    </batch-add>
    <!-- 新增视频 -->
    <upload-video @success="handleVideoAddSuccess"
                  @close="handleVideoAddClose"
                  :videoAddVisiable="videoAddVisiable"
                  :ownerId="productId">
    </upload-video>
    <!-- 信息查看 -->
    <info :data="info.data"
          :images="info.images"
          :label="info.label"
          :infoVisiable="info.visiable"
          @close="handleInfoClose">
    </info>
    <!-- 添加图片 -->
    <image-add @success="handleImageAddSuccess"
               @close="handleImageAddClose"
               :imageAddVisiable="imageAddVisiable"
               :initData="initData">
    </image-add>
  </a-card>
</template>

<script>
import RangeDate from '@/components/datetime/RangeDate'
import Info from '@/components/info/Info'
import UploadVideo from '@/components/upload/UploadVideo'
import ProductAdd from './ProductAdd'
import ProductEdit from './ProductEdit'
import BatchAdd from '../batch/BatchAdd'
import ImageAdd from '../../file/image/ImageAdd'
import {Decrypt} from '@/utils/aesUtil.js'

export default {
  name: 'Product',
  components: { ProductAdd, ProductEdit, RangeDate, BatchAdd, Info, UploadVideo, ImageAdd },
  data () {
    return {
      current_user: this.$store.state.account.user,
      advanced: false,
      dataSource: [],
      selectedRowKeys: [],
      queryParams: {},
      sortedInfo: null,
      loading: false,
      productAddVisiable: false,
      productEditVisiable: false,
      batchAddVisiable: false,
      videoAddVisiable: false,
      imageAddVisiable: false,
      initData: {},
      productId: null,
      paginationInfo: null,
      info: {
        visiable: false,
        label: {
          top: {
            productName: '产品名',
            companyName: '企业',
            username: '创建人',
            address: '产地',
            createTime: '创建时间',
            expiration: '保质期'
          },
          bottom: {
            introduce: '产品简介',
            recipe: '产品配方'
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
        title: '名称',
        dataIndex: 'productName'
      }, {
        title: '企业',
        dataIndex: 'companyName'
      }, {
        title: '创建人',
        dataIndex: 'username'
      }, {
        title: '产地',
        dataIndex: 'address'
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
            disabled: record.username !== that.current_user.username,
            name: record.username
          }
        })
      }
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    addDetail (id) {
      this.initData.ownerId = id
      this.initData.label = 'productDetail'
      this.initData.headTitle = '添加产品详情图'
      this.imageAddVisiable = true
    },
    handleImageAddClose () {
      this.imageAddVisiable = false
    },
    handleImageAddSuccess () {
      this.imageAddVisiable = false
      this.$message.success('添加成功')
    },
    view (record) {
      this.info.data = record
      this.info.images = [record.picture]
      this.info.visiable = true
    },
    handleInfoClose () {
      this.info.visiable = false
    },
    addBatch (id) {
      this.productId = id
      this.batchAddVisiable = true
    },
    handleBatchAddClose () {
      this.batchAddVisiable = false
    },
    handleBatchAddSuccess () {
      this.batchAddVisiable = false
      this.$message.success('新增批次成功')
    },
    addVideo (id) {
      this.productId = id
      this.videoAddVisiable = true
    },
    handleVideoAddClose () {
      this.videoAddVisiable = false
    },
    handleVideoAddSuccess () {
      this.videoAddVisiable = false
      this.$message.success('添加视频成功')
    },
    handleProductAddClose () {
      this.productAddVisiable = false
    },
    handleProductAddSuccess () {
      this.productAddVisiable = false
      this.$message.success('新增产品成功')
      this.fetch()
    },
    add () {
      this.productAddVisiable = true
    },
    handleProductEditClose () {
      this.productEditVisiable = false
    },
    handleProductEditSuccess () {
      this.productEditVisiable = false
      this.$message.success('修改产品成功')
      this.fetch()
    },
    edit (record) {
      this.productEditVisiable = true
      this.$refs.productEdit.setFormValues(record)
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
          that.$delete('product/' + that.selectedRowKeys.join(',')).then(() => {
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
      params.companyId = this.current_user.companyId
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
      this.$get('product/list', {
        ...params
      }).then((r) => {
        let data = r.data
        let rows = data.rows
        for (var i = 0; i < rows.length; i++) {
          rows[i].recipe = Decrypt(rows[i].recipe, '', 'base64')
        }
        this.dataSource = rows
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
