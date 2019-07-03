<template>
  <a-drawer title="修改监控"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="monitorEditVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='企业编号'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['ownerId']" />
      </a-form-item>
      <a-form-item label='类型'
                   v-bind="formItemLayout">
        <a-radio-group v-model="value">
          <a-radio :value="1">监控</a-radio>
          <a-radio :value="2">直播</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label='监控名称'
                   v-bind="formItemLayout">
        <a-input v-decorator="['title',
                   {rules: [
                    { max: 50, message: '长度不能超过50个字符'},
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='URL'
                   v-bind="formItemLayout">
        <a-input v-decorator="[
              'url',
              {rules: [
                 { max: 100, message: '长度不能超过100个字符'},
                 { required: true, message: '不能为空'}
              ]}]" />
      </a-form-item>
      <a-form-item v-show="value===1"
                   label='AccessToken'
                   v-bind="formItemLayout">
        <a-input v-decorator="[
              'token',
              {rules: [
                { max: 100, message: '长度不能超过100个字符'}
              ]}]" />
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
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'MonitorEdit',
  props: {
    monitorEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      videoId: '',
      value: 1
    }
  },
  methods: {
    reset () {
      this.loading = false
      this.form.resetFields()
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    setFormValues ({ ...monitor }) {
      let fields = ['ownerId', 'title', 'url', 'token']
      let obj = {}
      this.videoId = monitor.videoId
      Object.keys(monitor).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          obj[key] = monitor[key]
          this.form.setFieldsValue(obj)
        }
      })
      if (monitor.token) {
        this.value = 1
      } else {
        this.value = 2
      }
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          let monitor = this.form.getFieldsValue()
          monitor.videoId = this.videoId
          if (this.value !== 1) { monitor.token = null }
          this.$put('video', {
            ...monitor
          }).then(() => {
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
