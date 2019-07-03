<template>
  <a-drawer title="新增企业"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="companyAddVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='企业名称'
                   v-bind="formItemLayout">
        <a-input style="width: 100%"
                 v-decorator="['companyName',
                   {rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='企业编号'
                   v-bind="formItemLayout">
        <a-input v-decorator="[
          'companyNumber',
          {rules: [
            { max: 50, message: '长度不能超过50个字符'}
          ]}]" />
      </a-form-item>
      <a-form-item label='企业介绍'
                   v-bind="formItemLayout">
        <a-textarea :rows="4"
                    v-decorator="[
          'introduce',
          {rules: [
            { max: 1000, message: '长度不能超过1000个字符'}
          ]}]">
        </a-textarea>
      </a-form-item>
      <a-form-item label='监管政府'
                   v-bind="formItemLayout">
        <a-input v-decorator="[
          'government',
          {rules: [
            { max: 50, message: '长度不能超过50个字符'}
          ]}]" />
      </a-form-item>
      <a-form-item label='联系人'
                   v-bind="formItemLayout">
        <a-input v-decorator="[
          'linkman',
          {rules: [
            { max: 50, message: '长度不能超过50个字符'}
          ]}]" />
      </a-form-item>
      <a-form-item label='联系电话'
                   v-bind="formItemLayout">
        <a-input v-decorator="[
          'linkphone',
          {rules: [
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
        <a-input v-model=select.postcode />
      </a-form-item>
      <a-form-item label='详细地址'
                   v-bind="formItemLayout">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input v-decorator="[
              'address',
              {rules: [
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
        <a-input v-decorator="['lng']" />
      </a-form-item>
      <a-form-item label='纬度'
                   v-bind="formItemLayout">
        <a-input v-decorator="['lat']" />
      </a-form-item>
      <a-form-item label='商标和图片'
                   v-bind="formItemLayout">
        <p style="color:red;">请选择两张图片，第一张为商标，第二张为公司展示图片</p>
        <upload-image ref="uploadImageChild"
                      limitNum=2
                      @fileSelect="handleFileSelect"
                      @fileRemove="handleFileRemove"></upload-image>
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
import UploadImage from '@/components/upload/UploadImage'
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'CompanyAdd',
  components: { VMap, UploadImage, VDistpicker },
  props: {
    companyAddVisiable: {
      default: false
    }
  },
  data () {
    return {
      loading: false,
      showMapComponent: false,
      formItemLayout,
      form: this.$form.createForm(this),
      fileList: [],
      select: { province: '', city: '', area: '', postcode: '' }
    }
  },
  methods: {
    reset () {
      this.loading = false
      this.select.province = ''
      this.select.city = ''
      this.select.area = ''
      this.select.postcode = ''
      this.form.resetFields()
      this.fileList = []
      this.$refs.uploadImageChild.finished()
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
    handleFileSelect (file) {
      this.fileList.push(file)
    },
    handleFileRemove (index) {
      this.fileList.splice(index, 1)
    },
    showMap () {
      this.showMapComponent = true
    },
    confirmMap (center, keyword) {
      this.form.setFieldsValue({
        address: keyword,
        lng: center.lng,
        lat: center.lat
      })
      this.showMapComponent = false
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.fileList.length !== 2) {
            this.$message.error('请选择两张图片')
            return
          }
          this.loading = true
          values.province = this.select.province
          values.city = this.select.city
          values.area = this.select.area
          values.postcode = this.select.postcode
          const formData = new FormData()
          Object.keys(values).forEach((key) => {
            if (values[key]) {
              formData.append(key, values[key])
            }
          })
          this.fileList.forEach((img, index) => {
            var type = img.type.split('/')[1]
            formData.append('files', img, 'file_' + Date.parse(new Date()) + '.' + type)
          })
          this.$upload('admin/company', formData).then(() => {
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
