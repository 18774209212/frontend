<template>
  <a-drawer title="修改生产档案"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="recordEditVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='批次ID'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['batchId']" />
      </a-form-item>
      <a-form-item label='生产档案ID'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['recordId']" />
      </a-form-item>
      <a-form-item label='操作'
                   v-bind="formItemLayout">
        <a-input v-decorator="['operation',
                   {rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='操作时间'
                   v-bind="formItemLayout">
        <a-date-picker showTime
                       :value="operationTime"
                       format="YYYY-MM-DD HH:mm:ss"
                       placeholder="Select Time"
                       @change="onTimeChange" />
      </a-form-item>
      <a-form-item label='工具'
                   v-bind="formItemLayout">
        <a-input v-decorator="['tool']" />
      </a-form-item>
      <a-form-item label='操作员'
                   v-bind="formItemLayout">
        <a-input v-decorator="['operator']" />
      </a-form-item>
      <a-form-item label='用品'
                   v-bind="formItemLayout">
        <a-input v-decorator="['item']" />
      </a-form-item>
      <a-form-item label='用量'
                   v-bind="formItemLayout">
        <a-input v-decorator="['dosage']" />
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
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}
export default {
  name: 'RecordEdit',
  props: {
    recordEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      record: {},
      operationTime: null
    }
  },
  methods: {
    moment,
    onTimeChange (value, dataString) {
      this.record.operationTime = value
    },
    reset () {
      this.loading = false
      this.form.resetFields()
    },
    onClose () {
      this.reset()
      this.$emit('close')
    },
    setFormValues ({ ...record }) {
      let fields = ['recordId', 'batchId', 'operation', 'tool', 'operator', 'item', 'dosage']
      Object.keys(record).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = record[key]
          this.form.setFieldsValue(obj)
        }
      })
      if (record.operationTime) {
        this.operationTime = moment(record.operationTime, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          let record = this.form.getFieldsValue()
          record.operationTime = this.record.operationTime
          this.$put('record', {
            ...record
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
