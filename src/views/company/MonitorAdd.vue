<template>
  <a-drawer title="新增监控"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="monitorAddVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='企业编号'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['ownerId',
                   {initialValue: ownerId,
                     rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
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
  name: 'MonitorAdd',
  props: {
    monitorAddVisiable: {
      default: false
    },
    ownerId: {}
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      value: 1
    }
  },
  methods: {
    onDateChange (value, str) {
      this.produceDate = str
    },
    reset () {
      this.loading = false
      this.form.resetFields()
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.produceDate = this.produceDate
          this.loading = true
          if (this.value !== 1) { values.token = null }
          const formData = {}
          Object.keys(values).forEach((key) => {
            if (values[key]) {
              formData[key] = values[key]
            }
          })
          this.$post('video/monitor', formData).then(() => {
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
