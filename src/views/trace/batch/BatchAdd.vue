<template>
  <a-drawer title="新增批次"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="batchAddVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='产品ID'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['productId',
                   {initialValue: productId,
                     rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='批次名称'
                   v-bind="formItemLayout">
        <a-input v-decorator="['batchName',
                   {rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='生产者'
                   v-bind="formItemLayout">
        <a-input v-decorator="[
              'producer',
              {rules: [
                { max: 30, message: '长度不能超过30个字符'}
              ]}]" />
      </a-form-item>
      <a-form-item label='生产日期'
                   format="YYYY-MM-DD"
                   v-bind="formItemLayout">
        <a-date-picker :key="timeId"
                       @change="onDateChange" />
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
  name: 'BatchAdd',
  props: {
    batchAddVisiable: {
      default: false
    },
    productId: {}
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      timeId: +new Date(),
      produceDate: null
    }
  },
  methods: {
    onDateChange (value, str) {
      this.produceDate = str
    },
    reset () {
      this.loading = false
      this.form.resetFields()
      this.produceDate = null
      this.timeId = +new Date()
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
          const formData = {}
          Object.keys(values).forEach((key) => {
            if (values[key]) {
              formData[key] = values[key]
            }
          })
          this.$post('batch', formData).then(() => {
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
