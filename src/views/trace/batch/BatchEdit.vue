<template>
  <a-drawer title="修改批次"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="batchEditVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='产品ID'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['productId']" />
      </a-form-item>
      <a-form-item label='批次Id'
                   v-bind="formItemLayout">
        <a-input readOnly
                 style="width: 100%"
                 v-decorator="['batchId']" />
      </a-form-item>
      <a-form-item label='批次名称'
                   v-bind="formItemLayout">
        <a-input v-decorator="['batchName',
                   {rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='通知标题'
                   v-bind="formItemLayout">
        <a-input v-decorator="['informTitle',
                   {rules: [
                    {  max: 50, message: '长度不能超过50个字符'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='通知内容'
                   v-bind="formItemLayout">
        <a-textarea :rows="4"
                    v-decorator="[
          'informContent',
          {rules: [
            { max: 255, message: '长度不能超过255个字符'}
          ]}]">
        </a-textarea>
      </a-form-item>
      <a-form-item label='生产者'
                   v-bind="formItemLayout">
        <a-input v-decorator="['producer']" />
      </a-form-item>
      <a-form-item label='生产日期'
                   format="YYYY-MM-DD"
                   v-bind="formItemLayout">
        <a-date-picker :value="produceDate"
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
import moment from 'moment'
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'BatchEdit',
  props: {
    batchEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      batch: {},
      produceDate: null
    }
  },
  methods: {
    moment,
    onDateChange (value, str) {
      this.batch.produceDate = str
    },
    reset () {
      this.loading = false
      this.form.resetFields()
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    setFormValues ({ ...batch }) {
      let fields = ['batchId', 'batchName', 'productId', 'producer', 'informTitle', 'informContent']
      Object.keys(batch).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = batch[key]
          this.form.setFieldsValue(obj)
        }
      })
      if (batch.produceDate) {
        this.produceDate = moment(batch.produceDate, 'YYYY-MM-DD')
      }
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          let batch = this.form.getFieldsValue()
          batch.produceDate = this.batch.produceDate
          this.$put('batch', {
            ...batch
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
