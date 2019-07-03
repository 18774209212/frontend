<template>
  <div style="width:100%;">
    <a-row :gutter="8">
      <a-card title="企业信息"
              style="margin-top:1rem">
        <a-icon slot="extra"
                type="edit"
                theme="twoTone"
                @click="editCompany"
                twoToneColor="#faad14"
                title="编辑企业信息"></a-icon>
        <a-dropdown slot="extra"
                    style="margin-left: 10px;">
          <a class="ant-dropdown-link">
            <a-icon type="plus" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a @click="addHonor">添加荣誉资质</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="addQuality">添加质量体系认证</a>
            </a-menu-item>
            <a-menu-item>
              <a @click="addEnvironment">添加生产环境</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
        <a-row :gutter="8">
          <a-col :span="6">
            <a-row style="text-align: center;">
              <img style="width: 10rem;border-radius: 2px"
                   alt="商标"
                   :src="company.brand">
            </a-row>
            <a-row style="text-align: center;margin-top:1rem">
              <a-button icon="edit"
                        @click="updateBrand">修改商标</a-button>
            </a-row>
            <a-row style="text-align: center;margin-top:1rem">
              <img style="width: 10rem;border-radius: 2px"
                   alt="图片"
                   :src="company.picture">
            </a-row>
            <a-row style="text-align: center;margin-top:1rem">
              <a-button icon="edit"
                        @click="updatePic">修改图片</a-button>
            </a-row>
          </a-col>
          <a-col :span="12"
                 style="font-size: 1rem">
            <p>企业名：{{company.companyName}}</p>
            <p>联系人：{{company.linkman}}</p>
            <p>联系电话：{{company.linkphone}}</p>
            <p>地址：{{company.province}}{{company.city}}{{company.area}}</p>
            <p>详细地址：{{company.address}}</p>
            <p>邮编：{{company.postcode}}</p>
            <p>经纬度：{{company.lng}}, {{company.lat}}</p>
            <p>创建时间：{{company.createTime}}</p>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-divider orientation="left">企业简介</a-divider>
            <div style="text-indent: 1rem;margin-bottom: 2rem">{{company.introduce}}</div>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-divider orientation="left">企业荣誉</a-divider>
            <a-list class="honor"
                    :grid="{ gutter: 16, column: 4 }"
                    :dataSource="honors">
              <a-list-item slot="renderItem"
                           slot-scope="item">
                <div style="text-align: center;">
                  <img :src="item.imageUrl"
                       style="max-width: 100%;height: 200px;" />
                  <div>{{item.title}}</div>
                </div>
              </a-list-item>
            </a-list>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-divider orientation="left">企业环境</a-divider>
            <a-list class="honor"
                    :grid="{ gutter: 16, column: 4 }"
                    :dataSource="environments">
              <a-list-item slot="renderItem"
                           slot-scope="item">
                <div style="text-align: center;">
                  <img :src="item.imageUrl"
                       style="max-width: 100%;height: 200px;" />
                  <div>{{item.title}}</div>
                </div>
              </a-list-item>
            </a-list>
          </a-col>
        </a-row>
        <a-row>
          <a-col>
            <a-divider orientation="left">质量体系认证</a-divider>
            <a-list class="honor"
                    :grid="{ gutter: 16, column: 4 }"
                    :dataSource="qualities">
              <a-list-item slot="renderItem"
                           slot-scope="item">
                <div style="text-align: center;">
                  <img :src="item.imageUrl"
                       style="max-width: 100%;height: 200px;" />
                  <div>{{item.title}}</div>
                </div>
              </a-list-item>
            </a-list>
          </a-col>
        </a-row>
      </a-card>
    </a-row>
    <!-- 添加图片 -->
    <image-add @success="handleImageAddSuccess"
               @close="handleImageAddClose"
               :imageAddVisiable="imageAddVisiable"
               :initData="initData">
    </image-add>
    <!-- 修改图片 -->
    <update-pic @success="handleUpdatePicSuccess"
                @close="handleUpdatePicClose"
                :updatePicVisiable="updatePicVisiable"
                :initData="updatePicData">
    </update-pic>
    <!-- 修改企业 -->
    <company-edit ref="companyEdit"
                  @success="handleCompanyEditSuccess"
                  @close="handleCompanyEditClose"
                  :companyEditVisiable="companyEditVisiable">
    </company-edit>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'
import ImageAdd from '../file/image/ImageAdd'
import UpdatePic from './UpdatePic'
import CompanyEdit from '../system/company/CompanyEdit'
moment.locale('zh-cn')

export default {
  name: 'CompanyInfo',
  components: { ImageAdd, UpdatePic, CompanyEdit },
  data () {
    return {
      userRole: '',
      imageAddVisiable: false,
      initData: {},
      updatePicVisiable: false,
      updatePicData: {},
      companyEditVisiable: false,
      honors: [],
      qualities: [],
      environments: []
    }
  },
  computed: {
    ...mapState({
      multipage: state => state.setting.multipage,
      user: state => state.account.user,
      company: state => state.account.company
    })
  },
  methods: {
    editCompany () {
      this.companyEditVisiable = true
      this.$refs.companyEdit.setFormValues(this.company)
    },
    handleCompanyEditClose () {
      this.companyEditVisiable = false
    },
    handleCompanyEditSuccess () {
      this.companyEditVisiable = false
      this.$message.success('修改企业成功')
      this.getCompany()
    },
    addHonor () {
      this.initData.ownerId = this.company.companyId
      this.initData.label = 'honor'
      this.initData.headTitle = '添加荣誉资质'
      this.imageAddVisiable = true
    },
    addQuality () {
      this.initData.ownerId = this.company.companyId
      this.initData.label = 'quality'
      this.initData.headTitle = '添加质量体系认证'
      this.imageAddVisiable = true
    },
    addEnvironment () {
      this.initData.ownerId = this.company.companyId
      this.initData.label = 'environment'
      this.initData.headTitle = '添加生产环境'
      this.imageAddVisiable = true
    },
    handleImageAddClose () {
      this.imageAddVisiable = false
    },
    handleImageAddSuccess () {
      this.imageAddVisiable = false
      this.$message.success('添加成功')
      this.fetch()
    },
    updateBrand () {
      this.updatePicData = {
        companyId: this.company.companyId,
        field: 'brand',
        headTitle: '修改商标'
      }
      this.updatePicVisiable = true
    },
    updatePic (field, headTitle) {
      this.updatePicData = {
        companyId: this.company.companyId,
        field: 'picture',
        headTitle: '修改公司图片'
      }
      this.updatePicVisiable = true
    },
    handleUpdatePicClose () {
      this.updatePicVisiable = false
    },
    handleUpdatePicSuccess () {
      this.updatePicVisiable = false
      this.$message.success('修改成功')
      this.getCompany()
    },
    ...mapMutations({
      setCompany: 'account/setCompany'
    }),
    getCompany () {
      this.$get('admin/company/' + this.company.companyId).then((r) => {
        this.setCompany(r.data)
      })
    },
    fetch () {
      this.$get('anon/image/list', {
        ownerId: this.user.companyId
      }).then((r) => {
        let data = r.data
        let honors = []
        let qualities = []
        let environments = []
        var item
        for (var i = 0, len = data.length; i < len; i++) {
          item = data[i]
          if (item.label === 'honor') {
            honors.push(item)
          } else if (item.label === 'quality') {
            qualities.push(item)
          } else if (item.label === 'environment') {
            environments.push(item)
          }
        }
        this.honors = honors
        this.qualities = qualities
        this.environments = environments
      })
    }
  },
  mounted () {
    this.fetch()
  }
}
</script>
<style lang="less">
</style>
