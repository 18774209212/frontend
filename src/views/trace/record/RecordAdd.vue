<template>
  <a-drawer title="新增生产档案"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="recordAddVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='批次号'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['batchId',
                   {initialValue: batchId,
                     rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='操作'
                   v-bind="formItemLayout">
        <a-input v-decorator="['operation',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 50, message: '长度不能超过50个字符'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='操作时间'
                   v-bind="formItemLayout">
        <a-date-picker showTime
                       :key="timeId"
                       format="YYYY-MM-DD HH:mm:ss"
                       placeholder="Select Time"
                       @change="onTimeChange" />
      </a-form-item>
      <a-form-item label='工具'
                   v-bind="formItemLayout">
        <a-input v-decorator="['tool',
              {rules: [
                { max: 50, message: '长度不能超过50个字符'}
              ]}]" />
      </a-form-item>
      <a-form-item label='操作员'
                   v-bind="formItemLayout">
        <a-input v-decorator="['operator',
              {rules: [
                { max: 50, message: '长度不能超过50个字符'}
              ]}]" />
      </a-form-item>
      <a-form-item label='用品'
                   v-bind="formItemLayout">
        <a-input v-decorator="['item',
              {rules: [
                { max: 100, message: '长度不能超过100个字符'}
              ]}]" />
      </a-form-item>
      <a-form-item label='用量'
                   v-bind="formItemLayout">
        <a-input v-decorator="['dosage',
              {rules: [
                { max: 100, message: '长度不能超过100个字符'}
              ]}]" />
      </a-form-item>
      <a-form-item label='图片'
                   v-bind="formItemLayout">
        <upload-image ref="uploadImageChild"
                      limitNum=3
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
import UploadImage from '@/components/upload/UploadImage'
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'RecordAdd',
  components: { UploadImage },
  props: {
    recordAddVisiable: {
      default: false
    },
    batchId: {}
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      fileList: [],
      operationTime: null,
      timeId: +new Date()
    }
  },
  methods: {
    onTimeChange (value, dataString) {
      this.operationTime = value
    },
    handleFileSelect (file) {
      this.fileList.push(file)
    },
    handleFileRemove (index) {
      this.fileList.splice(index, 1)
    },
    reset () {
      this.loading = false
      this.form.resetFields()
      this.fileList = []
      this.$refs.uploadImageChild.finished()
      this.timeId = +new Date()
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.operationTime = this.operationTime
          const formData = new FormData()
          Object.keys(values).forEach((key) => {
            if (values[key]) {
              formData.append(key, values[key])
            }
          })
          this.loading = true
          this.fileList.forEach((img, index) => {
            formData.append('files', img, 'file_' + Date.parse(new Date()) + '.jpg')
          })
          this.$upload('record', formData).then(() => {
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
