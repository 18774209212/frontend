webpackJsonp([47],{"cu3+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("4YfN"),o=a.n(r),s=a("ZLEe"),i=a.n(s),n=a("A9zj"),m=a.n(n),l={labelCol:{span:3},wrapperCol:{span:18}},u={name:"ProductEdit",props:{productEditVisiable:{default:!1}},data:function(){return{loading:!1,formItemLayout:l,form:this.$form.createForm(this),product:{}}},methods:{reset:function(){this.loading=!1,this.form.resetFields()},onClose:function(){this.reset(),this.$emit("close")},setFormValues:function(e){var t=this,a=m()(e,[]),r=["productId","productName","introduce","buyLink","recipe","address","expiration"];i()(a).forEach(function(e){if(-1!==r.indexOf(e)){t.form.getFieldDecorator(e);var o={};o[e]=a[e],t.form.setFieldsValue(o)}})},handleSubmit:function(){var e=this;this.form.validateFields(function(t,a){if(!t){var r=e.form.getFieldsValue();e.$put("product",o()({},r)).then(function(){e.reset(),e.$emit("success")}).catch(function(){e.loading=!1})}})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-drawer",{staticStyle:{height:"calc(100% - 55px)",overflow:"auto","padding-bottom":"53px"},attrs:{title:"修改产品",maskClosable:!1,width:"650",placement:"right",closable:!1,visible:e.productEditVisiable},on:{close:e.onClose}},[a("a-form",{attrs:{form:e.form}},[a("a-form-item",e._b({attrs:{label:"产品ID"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["productId"],expression:"['productId']"}],attrs:{readOnly:""}})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"产品名称"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["productName",{rules:[{required:!0,message:"不能为空"}]}],expression:"['productName',\n                 {rules: [\n                  { required: true, message: '不能为空'}\n                ]}]"}],staticStyle:{width:"100%"}})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"产品介绍"}},"a-form-item",e.formItemLayout,!1),[a("a-textarea",{directives:[{name:"decorator",rawName:"v-decorator",value:["introduce",{rules:[{max:1e3,message:"长度不能超过1000个字符"}]}],expression:"[\n        'introduce',\n        {rules: [\n          { max: 1000, message: '长度不能超过1000个字符'}\n        ]}]"}],attrs:{rows:4}})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"购买链接"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["buyLink",{rules:[{max:100,message:"长度不能超过100个字符"}]}],expression:"['buyLink',\n                 {rules: [\n                  { max: 100, message: '长度不能超过100个字符'}\n                ]}]"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"产品配方"}},"a-form-item",e.formItemLayout,!1),[a("a-textarea",{directives:[{name:"decorator",rawName:"v-decorator",value:["recipe",{rules:[{max:1e3,message:"长度不能超过1000个字符"}]}],expression:"[\n        'recipe',\n        {rules: [\n          { max: 1000, message: '长度不能超过1000个字符'}\n        ]}]"}],attrs:{rows:4}})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"产地"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["address",{rules:[{max:100,message:"长度不能超过100个字符"}]}],expression:"['address',\n                 {rules: [\n                  { max: 100, message: '长度不能超过100个字符'}\n                ]}]"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"保质期"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["expiration",{rules:[{max:20,message:"长度不能超过20个字符"}]}],expression:"['expiration',\n                 {rules: [\n                  { max: 20, message: '长度不能超过20个字符'}\n                ]}]"}]})],1)],1),e._v(" "),a("div",{staticClass:"drawer-bootom-button"},[a("a-popconfirm",{attrs:{title:"确定放弃编辑？",okText:"确定",cancelText:"取消"},on:{confirm:e.onClose}},[a("a-button",{staticStyle:{"margin-right":".8rem"}},[e._v("取消")])],1),e._v(" "),a("a-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)},staticRenderFns:[]},d=a("C7Lr")(u,c,!1,null,null,null);t.default=d.exports}});
//# sourceMappingURL=47.812e2411b6db1042f10f.js.map