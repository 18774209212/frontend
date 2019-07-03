<template>
  <a-drawer title="修改企业"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="companyEditVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='企业名称'
                   v-bind="formItemLayout">
        <a-input style="width: 100%"
                 readOnly
                 v-decorator="['companyName']" />
      </a-form-item>
      <a-form-item label='企业编号'
                   v-bind="formItemLayout">
        <a-input v-decorator="['companyNumber',
                   {initialValue:'',
                     rules: [
                    { max: 50, message: '长度不能超过50个字符'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='企业介绍'
                   v-bind="formItemLayout">
        <a-textarea :rows="4"
                    v-decorator="[
          'introduce',
          {initialValue:'',
            rules: [
            { max: 1000, message: '长度不能超过1000个字符'}
          ]}]">
        </a-textarea>
      </a-form-item>
      <a-form-item label='监管政府'
                   v-bind="formItemLayout">
        <a-input v-decorator="['government',{initialValue:''}]" />
      </a-form-item>
      <a-form-item label='联系人'
                   v-bind="formItemLayout">
        <a-input v-decorator="['linkman',
                   {initialValue:'',
                     rules: [
                    { max: 30, message: '长度不能超过30个字符'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='联系电话'
                   v-bind="formItemLayout">
        <a-input v-decorator="['linkphone',
                   {initialValue:'',
                     rules: [
                    { max: 20, message: '长度不能超过20个字符'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='地址'
                   v-bind="formItemLayout">
        <v-distpicker :province="select.province"
                      :city="select.city"
                      :area="select.area"
                      @province="selectProvince"
                      @city="selectCity"
                      @area="selectArea"
                      wrapper="address-wrapper"></v-distpicker>
      </a-form-item>
      <a-form-item label='邮编'
                   v-bind="formItemLayout">
        <a-input v-model="select.postcode" />
      </a-form-item>
      <a-form-item label='详细地址'
                   v-bind="formItemLayout">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input v-decorator="['address',
                   {initialValue:'',
                     rules: [
                    { max: 100, message: '长度不能超过100个字符'}
                  ]}]" />
          </a-col>
          <a-col :span="12">
            <a-button @click="showMap">选择地址</a-button>
          </a-col>
        </a-row>
        <v-map :showMapComponent="showMapComponent"
               v-on:map-confirm="confirmMap"></v-map>
      </a-form-item>
      <a-form-item label='经度'
                   v-bind="formItemLayout">
        <a-input v-decorator="['lng',{initialValue:''}]" />
      </a-form-item>
      <a-form-item label='纬度'
                   v-bind="formItemLayout">
        <a-input v-decorator="['lat',{initialValue:''}]" />
      </a-form-item>
    </a-form>
    <div class="drawer-bootom-button">
      <a-popconfirm title="确定放弃编辑？"
                    @confirm="onClose"
                    okText="确定"
                    cancelText="取消">
        <a-button style="margin-right: .8rem">取消</a-button>
      </a-popconfirm>
      <a-button @click="handleSubmit"
                type="primary"
                :loading="loading">提交</a-button>
    </div>
  </a-drawer>
</template>
<script>
import VDistpicker from 'v-distpicker'
import VMap from '@/components/map/VMap'
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'CompanyEdit',
  components: { VDistpicker, VMap },
  props: {
    companyEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      loading: false,
      showMapComponent: false,
      formItemLayout,
      form: this.$form.createForm(this),
      company: {},
      select: { province: null, city: null, area: null, postcode: null }
    }
  },
  methods: {
    reset () {
      this.loading = false
      this.select.province = null
      this.select.city = null
      this.select.area = null
      this.select.postcode = null
      this.form.resetFields()
    },
    showMap () {
      this.showMapComponent = true
    },
    confirmMap (center, keyword) {
      let obj = {}
      obj['address'] = keyword
      obj['lng'] = center.lng
      obj['lat'] = center.lat
      this.form.setFieldsValue(obj)
      this.showMapComponent = false
    },
    selectProvince (value) {
      this.select.province = value.value
    },
    selectCity (value) {
      this.select.city = value.value
    },
    selectArea (value) {
      this.select.area = value.value
      this.select.postcode = value.code
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    setFormValues ({ ...company }) {
      let fields = ['companyName', 'companyNumber', 'introduce', 'government', 'linkman', 'linkphone', 'address', 'lng', 'lat']
      Object.keys(company).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = company[key]
          this.form.setFieldsValue(obj)
        }
      })
      this.select.province = company.province
      this.select.city = company.city
      this.select.area = company.area
      this.select.postcode = company.postcode
      this.company.companyId = company.companyId
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          let company = this.form.getFieldsValue()
          company.companyId = this.company.companyId
          company.province = this.select.province
          company.city = this.select.city
          company.area = this.select.area
          company.postcode = this.select.postcode
          this.$put('admin/company', company).then(() => {
            this.reset()
            this.$emit('success')
          }).catch(() => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.address-wrapper >>> select {
  padding: 0.5rem 0.75rem;
  line-height: 1.25;
  /* color: #464a4c; */
  background-color: #fff;
  /* background-image: none; */
  /* -webkit-background-clip: padding-box; */
  /* background-clip: padding-box; */
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
}
</style>
