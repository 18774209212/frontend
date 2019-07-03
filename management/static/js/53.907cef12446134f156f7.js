webpackJsonp([53],{qmc6:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("ZLEe"),s=t.n(r),o={labelCol:{span:3},wrapperCol:{span:18}},i={name:"UserAdd",props:{userAddVisiable:{default:!1}},data:function(){return{user:{username:""},loading:!1,roleData:[],companyData:[],formItemLayout:o,defaultPassword:"abc1234",form:this.$form.createForm(this),validateStatus:"",help:""}},methods:{reset:function(){this.validateStatus="",this.help="",this.user.username="",this.loading=!1,this.form.resetFields()},onClose:function(){this.reset(),this.$emit("close")},handleSubmit:function(){var e=this;"success"!==this.validateStatus&&this.handleUserNameBlur(),this.form.validateFields(function(a,t){if(!a&&"success"===e.validateStatus){e.loading=!0,t.roleId=t.roleId.join(",");var r={};s()(t).forEach(function(e){t[e]&&(r[e]=t[e])}),e.$post("admin/user",r).then(function(a){e.reset(),e.$emit("success")}).catch(function(){e.loading=!1})}})},handleUserNameBlur:function(){var e=this,a=this.form.getFieldValue("username");a.length?a.length>10?(this.validateStatus="error",this.help="用户名不能超过10个字符"):a.length<4?(this.validateStatus="error",this.help="用户名不能少于4个字符"):(this.validateStatus="validating",this.$get("user/check/"+a).then(function(a){a.data?(e.validateStatus="success",e.help=""):(e.validateStatus="error",e.help="抱歉，该用户名已存在")})):(this.validateStatus="error",this.help="用户名不能为空")}},watch:{userAddVisiable:function(){var e=this;this.userAddVisiable&&(this.$get("admin/role").then(function(a){e.roleData=a.data.rows}),this.$get("admin/company").then(function(a){e.companyData=a.data.rows}))}}},l={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("a-drawer",{staticStyle:{height:"calc(100% - 55px)",overflow:"auto","padding-bottom":"53px"},attrs:{title:"新增用户",maskClosable:!1,width:"650",placement:"right",closable:!1,visible:e.userAddVisiable},on:{close:e.onClose}},[t("a-form",{attrs:{form:e.form}},[t("a-form-item",e._b({attrs:{label:"用户名",validateStatus:e.validateStatus,help:e.help}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["username",{rules:[{required:!0,message:"用户名不能为空"}]}],expression:"['username',{rules: [{ required: true, message: '用户名不能为空'}]}]"}],on:{blur:e.handleUserNameBlur}})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"密码"}},"a-form-item",e.formItemLayout,!1),[t("a-tooltip",{attrs:{title:"新用户默认密码为 abc1234"}},[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{initialValue:e.defaultPassword}],expression:"['password',{ initialValue: defaultPassword }]"}],attrs:{type:"password",readOnly:""}})],1)],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"邮箱"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["email",{rules:[{type:"email",message:"请输入正确的邮箱"},{max:50,message:"长度不能超过50个字符"}]}],expression:"['email',{rules: [\n          { type: 'email', message: '请输入正确的邮箱' },\n          { max: 50, message: '长度不能超过50个字符'}\n        ]}]"}]})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"手机"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["mobile",{rules:[{pattern:"^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$",message:"请输入正确的手机号"}]}],expression:"['mobile', {rules: [\n          { pattern: '^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$', message: '请输入正确的手机号'}\n        ]}]"}]})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"角色"}},"a-form-item",e.formItemLayout,!1),[t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["roleId",{rules:[{required:!0,message:"请选择角色"}]}],expression:"['roleId',{rules: [{ required: true, message: '请选择角色' }]}]"}],staticStyle:{width:"100%"},attrs:{mode:"multiple",allowClear:!0}},e._l(e.roleData,function(a){return t("a-select-option",{key:a.roleId},[e._v(e._s(a.roleName))])}))],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"企业"}},"a-form-item",e.formItemLayout,!1),[t("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["companyId",{rules:[{required:!0,message:"请选择用户所属企业!"}]}],expression:"[\n          'companyId',\n          {rules: [{ required: true, message: '请选择用户所属企业!' }]}\n        ]"}],attrs:{allowClear:!0,dropdownStyle:{maxHeight:"220px",overflow:"auto"}}},e._l(e.companyData,function(a){return t("a-select-option",{key:a.companyId},[e._v(e._s(a.companyName))])}))],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"状态"}},"a-form-item",e.formItemLayout,!1),[t("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["status",{rules:[{required:!0,message:"请选择状态"}]}],expression:"['status',{rules: [{ required: true, message: '请选择状态'}]}]"}]},[t("a-radio",{attrs:{value:"0"}},[e._v("锁定")]),e._v(" "),t("a-radio",{attrs:{value:"1"}},[e._v("有效")])],1)],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"性别"}},"a-form-item",e.formItemLayout,!1),[t("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["ssex",{rules:[{required:!0,message:"请选择性别"}]}],expression:"['ssex',{rules: [{ required: true, message: '请选择性别' }]}]"}]},[t("a-radio",{attrs:{value:"0"}},[e._v("男")]),e._v(" "),t("a-radio",{attrs:{value:"1"}},[e._v("女")]),e._v(" "),t("a-radio",{attrs:{value:"2"}},[e._v("保密")])],1)],1)],1),e._v(" "),t("div",{staticClass:"drawer-bootom-button"},[t("a-popconfirm",{attrs:{title:"确定放弃编辑？",okText:"确定",cancelText:"取消"},on:{confirm:e.onClose}},[t("a-button",{staticStyle:{"margin-right":".8rem"}},[e._v("取消")])],1),e._v(" "),t("a-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)},staticRenderFns:[]},m=t("C7Lr")(i,l,!1,null,null,null);a.default=m.exports}});
//# sourceMappingURL=53.907cef12446134f156f7.js.map