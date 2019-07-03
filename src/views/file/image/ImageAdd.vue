<template>
  <a-drawer :title="initData.headTitle"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="imageAddVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='所属ID'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['ownerId',
                   {initialValue: initData.ownerId,
                     rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='标签'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['label',
                   {initialValue: initData.label,
                     rules: [{ required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='图片描述'
                   v-bind="formItemLayout">
        <a-input v-decorator="[
          'title',
          {initialValue:'',
            rules: [
            { max: 255, message: '长度不能超过255个字符'}
          ]}]" />
      </a-form-item>
      <a-form-item label='图片'
                   v-bind="formItemLayout">
        <upload-image ref="uploadImageChild"
                      limitNum=1
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
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'ImageAdd',
  components: { UploadImage },
  props: {
    imageAddVisiable: {
      default: false
    },
    initData: {
      default: {
      }
    }
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
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          const formData = new FormData()
          Object.keys(values).forEach((key) => {
            if (values[key]) {
              formData.append(key, values[key])
            }
          })
          this.fileList.forEach((img, index) => {
            var type = img.type.split('/')[1]
            formData.append('file', img, 'file_' + Date.parse(new Date()) + '.' + type)
          })
          this.$upload('image', formData).then(() => {
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
