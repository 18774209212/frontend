<template>
  <a-drawer title="上传视频"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="videoAddVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='视频所属ID'
                   v-bind="formItemLayout">
        <a-input readOnly v-decorator="['ownerId',
                   {initialValue: ownerId,
                     rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='视频标题'
                   v-bind="formItemLayout">
        <a-input style="width: 100%"
                 v-decorator="['title',
                   {rules: [
                    { required: true, message: '不能为空'},
                    { max: 50, message: '长度不能超过50个字符'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='视频'
                   v-bind="formItemLayout">
        <div class="clearfix">
          <a-upload :fileList="fileList"
                    :remove="handleRemove"
                    accept="video/*"
                    :disabled="fileList.length > 0"
                    :beforeUpload="beforeUpload">
            <a-button>
              <a-icon type="upload" /> Select File
            </a-button>
          </a-upload>
        </div>
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
                :disabled="fileList.length === 0"
                :loading="loading"> {{loading ? '正在上传' : '开始上传' }}</a-button>
    </div>
  </a-drawer>
</template>
<script>
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'UploadVideo',
  props: {
    videoAddVisiable: {
      default: false
    },
    ownerId: {}
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      fileList: []
    }
  },
  methods: {
    reset () {
      this.loading = false
      this.form.resetFields()
      this.fileList = []
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    beforeUpload (file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('视频必须小于10MB!')
        return false
      }
      this.fileList = [...this.fileList, file]
      return false
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const { fileList } = this
          const formData = new FormData()
          Object.keys(values).forEach((key) => {
            formData.append(key, values[key])
          })
          formData.append('file', fileList[0])
          this.loading = true
          this.$upload('video', formData).then(() => {
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
