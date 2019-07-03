<template>
  <a-card :bordered="false"
          class="card-area">
    <div>
      <div class="operator">
        <a-button type="primary"
                  ghost
                  @click="addMonitor">新增</a-button>
        <a-button v-hasPermission="'video:delete'"
                  type="primary"
                  ghost
                  @click="videoDelete">删除</a-button>
        <!-- <a-button v-hasPermission="'video:delete'"
                  type="primary"
                  ghost
                  @click="view">查看</a-button> -->
      </div>
      <!-- 表格区域 -->
      <a-table ref="TableInfo"
               :columns="columns"
               :dataSource="dataSource"
               rowKey="videoId"
               :pagination="pagination"
               :loading="loading"
               :scroll="{ x: 900 }"
               :rowSelection="rowSelection"
               @change="handleTableChange">
        <template slot="operation"
                  slot-scope="text, record">
          <a-icon type="edit"
                  theme="twoTone"
                  twoToneColor="#faad14"
                  @click="eidtMonitor(record)"
                  title="修改"></a-icon>
          <a-icon type="eye"
                  theme="twoTone"
                  twoToneColor="#42b983"
                  @click="viewMonitor(record)"
                  title="查看"></a-icon>
        </template>
      </a-table>
    </div>
    <a-modal :title="video.title"
             v-model="visible"
             style="text-align: center;"
             :width=700
             :footer="null"
             :maskClosable=false
             @cancel='handleCnacel'
             okText='播放'
             cancelText='关闭'>
      <div id="playWind"
           v-show="isMonitor"
           v-bind:style="{width: w+'px', height: h+'px', display: 'inline-block'}">
      </div>
      <video id="myPlayer"
             v-show="!isMonitor"
             v-bind:style="{width: w+'px', height: h+'px', display: 'inline-block'}"
             :src="video.url"
             controls
             playsInline
             webkit-playsinline
             autoplay>
      </video>
    </a-modal>
    <!-- 添加监控 -->
    <monitor-add @success="handleMonitorAddSuccess"
                 @close="handleMonitorAddClose"
                 :monitorAddVisiable="monitorAddVisiable"
                 :ownerId="company.companyId">
    </monitor-add>
    <!-- 修改监控信息 -->
    <monitor-edit ref="monitorEdit"
                  @success="handleMonitorEditSuccess"
                  @close="handleMonitorEditClose"
                  :monitorEditVisiable="monitorEditVisiable">
    </monitor-edit>
  </a-card>
</template>

<script>
import MyPlayer from '@/components/player/MyPlayer'
import MonitorAdd from './MonitorAdd'
import MonitorEdit from './MonitorEdit'
import { mapState } from 'vuex'
require('@/utils/ezuikit.js')

export default {
  name: 'Monitor',
  components: { MyPlayer, MonitorAdd, MonitorEdit },
  data () {
    return {
      current_user: this.$store.state.account.user,
      advanced: false,
      dataSource: [],
      selectedRowKeys: [],
      queryParams: {},
      sortedInfo: null,
      loading: false,
      paginationInfo: null,
      pagination: {
        pageSizeOptions: ['10', '20', '30', '40', '100'],
        defaultCurrent: 1,
        defaultPageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
      },
      visible: false,
      video: {
        url: '',
        title: ''
      },
      monitorAddVisiable: false,
      monitorEditVisiable: false,
      w: 600,
      h: 400,
      isMonitor: true,
      monitor: null,
      player: null
    }
  },
  computed: {
    ...mapState({
      company: state => state.account.company
    }),
    columns () {
      let { sortedInfo } = this
      sortedInfo = sortedInfo || {}
      return [{
        title: '所属ID',
        dataIndex: 'ownerId'
      }, {
        title: '监控名称',
        dataIndex: 'title'
      }, {
        title: '接入地址',
        dataIndex: 'url'
      }, {
        title: 'AccessToken',
        dataIndex: 'token'
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
    addMonitor () {
      this.monitorAddVisiable = true
    },
    handleMonitorAddClose () {
      this.monitorAddVisiable = false
    },
    handleMonitorAddSuccess () {
      this.monitorAddVisiable = false
      this.$message.success('新增监控成功')
      this.fetch()
    },
    eidtMonitor (record) {
      this.monitorEditVisiable = true
      this.$refs.monitorEdit.setFormValues(record)
    },
    handleMonitorEditClose () {
      this.monitorEditVisiable = false
    },
    handleMonitorEditSuccess () {
      this.monitorEditVisiable = false
      this.$message.success('修改监控成功')
      this.fetch()
    },
    // view () {
    //   this.$router.push('/company/monitorView')
    // },
    viewMonitor (item) {
      this.video.title = item.title
      this.video.url = item.url
      this.visible = true
      this.stopMonitor()
      this.stopPlayer()
      if (item.token) {
        this.isMonitor = true
        // eslint-disable-next-line no-undef
        this.monitor = new EZUIKit.EZUIPlayer({
          id: 'playWind',
          autoplay: true,
          url: item.url,
          accessToken: item.token,
          decoderPath: '../',
          width: this.w,
          height: this.h
        })
        // setTimeout(() => {

        // }, 500)
      } else {
        this.isMonitor = false
        this.src = item.url
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          this.player = new EZUIKit.EZUIPlayer('myPlayer')
        }, 500)
      }
    },
    handleCnacel (e) {
      this.stopPlayer()
      this.stopMonitor()
    },
    stopPlayer () {
      if (this.player) {
        this.player.stop()
        this.player = null
        this.src = null
      }
    },
    stopMonitor () {
      if (this.monitor) {
        this.monitor.stop()
        this.monitor = null
      }
    },
    videoDelete () {
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
          that.$delete('video/' + that.selectedRowKeys.join(',')).then(() => {
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
      this.$get('video', {
        ...params,
        classify: 1
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
@import "../../../static/less/Common";
</style>
