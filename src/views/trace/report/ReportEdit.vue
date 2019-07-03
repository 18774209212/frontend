<template>
  <a-drawer title="修改检验报告"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="reportEditVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='批次ID'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['batchId']" />
      </a-form-item>
      <a-form-item label='报告ID'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['reportId']" />
      </a-form-item>
      <a-form-item label='检验名称'
                   v-bind="formItemLayout">
        <a-input v-decorator="['reportName',
                   {rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='检验人'
                   v-bind="formItemLayout">
        <a-input v-decorator="['surveyor']" />
      </a-form-item>
      <a-form-item label='检验结果'
                   v-bind="formItemLayout">
        <a-input v-decorator="['result']" />
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
  name: 'ReportEdit',
  props: {
    reportEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      report: {}
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
    setFormValues ({ ...report }) {
      let fields = ['reportId', 'batchId', 'reportName', 'surveyor', 'result']
      Object.keys(report).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = report[key]
          this.form.setFieldsValue(obj)
        }
      })
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          let report = this.form.getFieldsValue()
          this.$put('report', {
            ...report
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
