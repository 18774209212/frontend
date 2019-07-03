<template>
  <a-drawer title="修改产品"
            :maskClosable="false"
            width=650
            placement="right"
            :closable="false"
            @close="onClose"
            :visible="productEditVisiable"
            style="height: calc(100% - 55px);overflow: auto;padding-bottom: 53px;">
    <a-form :form="form">
      <a-form-item label='产品ID'
                   v-bind="formItemLayout">
        <a-input readOnly
                 v-decorator="['productId']" />
      </a-form-item>
      <a-form-item label='产品名称'
                   v-bind="formItemLayout">
        <a-input style="width: 100%"
                 v-decorator="['productName',
                   {rules: [
                    { required: true, message: '不能为空'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='产品介绍'
                   v-bind="formItemLayout">
        <a-textarea :rows="4"
                    v-decorator="[
          'introduce',
          {rules: [
            { max: 1000, message: '长度不能超过1000个字符'}
          ]}]">
        </a-textarea>
      </a-form-item>
      <a-form-item label='购买链接'
                   v-bind="formItemLayout">
        <a-input v-decorator="['buyLink',
                   {rules: [
                    { max: 100, message: '长度不能超过100个字符'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='产品配方'
                   v-bind="formItemLayout">
        <a-textarea :rows="4"
                    v-decorator="[
          'recipe',
          {rules: [
            { max: 1000, message: '长度不能超过1000个字符'}
          ]}]">
        </a-textarea>
      </a-form-item>
      <a-form-item label='产地'
                   v-bind="formItemLayout">
        <a-input v-decorator="['address',
                   {rules: [
                    { max: 100, message: '长度不能超过100个字符'}
                  ]}]" />
      </a-form-item>
      <a-form-item label='保质期'
                   v-bind="formItemLayout">
        <a-input v-decorator="['expiration',
                   {rules: [
                    { max: 20, message: '长度不能超过20个字符'}
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
  name: 'ProductEdit',
  props: {
    productEditVisiable: {
      default: false
    }
  },
  data () {
    return {
      loading: false,
      formItemLayout,
      form: this.$form.createForm(this),
      product: {}
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
    setFormValues ({ ...product }) {
      let fields = ['productId', 'productName', 'introduce', 'buyLink', 'recipe', 'address', 'expiration']
      Object.keys(product).forEach((key) => {
        if (fields.indexOf(key) !== -1) {
          this.form.getFieldDecorator(key)
          let obj = {}
          obj[key] = product[key]
          this.form.setFieldsValue(obj)
        }
      })
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          let product = this.form.getFieldsValue()
          this.$put('product', {
            ...product
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
