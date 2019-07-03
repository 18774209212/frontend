webpackJsonp([68],{mNoI:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("ZLEe"),s=a.n(r),o=a("A9zj"),i=a.n(o),n=a("4YfN"),l=a.n(n),m=a("2bvH"),u={labelCol:{span:3},wrapperCol:{span:18}},d={props:{profileEditVisiable:{default:!1}},data:function(){return{formItemLayout:u,form:this.$form.createForm(this),userId:"",roleId:"",companyId:"",status:"",username:"",loading:!1}},computed:l()({},Object(m.c)({currentUser:function(e){return e.account.user}})),methods:l()({},Object(m.b)({setUser:"account/setUser"}),{onClose:function(){this.loading=!1,this.form.resetFields(),this.$emit("close")},setFormValues:function(e){var t=this,a=i()(e,[]);this.userId=a.userId;var r=["email","ssex","description","mobile"];s()(a).forEach(function(e){if(-1!==r.indexOf(e)){t.form.getFieldDecorator(e);var s={};s[e]=a[e],t.form.setFieldsValue(s)}}),this.status=a.status,this.roleId=a.roleId,this.username=a.username},handleSubmit:function(){var e=this;this.form.validateFields(function(t,a){if(!t){e.loading=!0;var r=e.form.getFieldsValue();r.userId=e.userId,r.roleId=e.roleId,r.companyId=e.companyId,r.status=e.status,r.username=e.username,e.$put("user/profile",l()({},r)).then(function(t){e.loading=!1,e.$emit("success"),e.$get("user/"+r.username).then(function(t){e.setUser(t.data)})}).catch(function(){e.loading=!1})}})}})},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-drawer",{staticStyle:{height:"calc(100% - 55px)",overflow:"auto","padding-bottom":"53px"},attrs:{title:"编辑资料",maskClosable:!1,width:"650",placement:"right",closable:!1,visible:e.profileEditVisiable},on:{close:e.onClose}},[a("a-form",{attrs:{form:e.form}},[a("a-form-item",e._b({attrs:{label:"邮箱"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["email",{rules:[{type:"email",message:"请输入正确的邮箱"},{max:50,message:"长度不能超过50个字符"}]}],expression:"[\n        'email',\n        {rules: [\n          { type: 'email', message: '请输入正确的邮箱' },\n          { max: 50, message: '长度不能超过50个字符'}\n        ]}\n      ]"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"手机"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["mobile",{rules:[{pattern:"^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$",message:"请输入正确的手机号"}]}],expression:"['mobile', {rules: [\n          { pattern: '^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$', message: '请输入正确的手机号'}\n        ]}]"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"性别"}},"a-form-item",e.formItemLayout,!1),[a("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["ssex",{rules:[{required:!0,message:"请选择性别"}]}],expression:"[\n          'ssex',\n          {rules: [{ required: true, message: '请选择性别' }]}\n        ]"}]},[a("a-radio",{attrs:{value:"0"}},[e._v("男")]),e._v(" "),a("a-radio",{attrs:{value:"1"}},[e._v("女")]),e._v(" "),a("a-radio",{attrs:{value:"2"}},[e._v("保密")])],1)],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"描述"}},"a-form-item",e.formItemLayout,!1),[a("a-textarea",{directives:[{name:"decorator",rawName:"v-decorator",value:["description",{rules:[{max:100,message:"长度不能超过100个字符"}]}],expression:"[\n        'description',\n        {rules: [\n          { max: 100, message: '长度不能超过100个字符'}\n        ]}]"}],attrs:{rows:4}})],1)],1),e._v(" "),a("div",{staticClass:"drawer-bootom-button"},[a("a-popconfirm",{attrs:{title:"确定放弃编辑？",okText:"确定",cancelText:"取消"},on:{confirm:e.onClose}},[a("a-button",{staticStyle:{"margin-right":".8rem"}},[e._v("取消")])],1),e._v(" "),a("a-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)},staticRenderFns:[]},f=a("C7Lr")(d,c,!1,null,null,null);t.default=f.exports}});
//# sourceMappingURL=68.6668f6783288c0c093b3.js.map