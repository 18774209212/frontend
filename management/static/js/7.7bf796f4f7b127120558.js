webpackJsonp([7,29,68],{MOKd:function(e,t){},Up6C:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("4YfN"),r=a.n(s),i=a("2bvH"),n=a("bst0"),o=a("mNoI"),c=a("LgPp"),l={name:"Profile",components:{UpdateAvatar:n.default,UpdateProfile:o.default,ImageAdd:c.default},data:function(){return{updateAvatarModelVisible:!1,profileEditVisiable:!1,userId:"",imageAddVisiable:!1,initData:{},honors:[],qualities:[],environments:[]}},computed:r()({},Object(i.c)({multipage:function(e){return e.setting.multipage},user:function(e){return e.account.user},company:function(e){return e.account.company}}),{avatar:function(){return"static/avatar/"+this.user.avatar},sex:function(){switch(this.user.ssex){case"0":return"男";case"1":return"女";case"2":return"保密";default:return this.user.ssex}}}),mounted:function(){},methods:r()({},Object(i.b)({setUser:"account/setUser"}),{handleUpdateAvatarCancel:function(){this.updateAvatarModelVisible=!1},handleUpdateAvatarSuccess:function(e){this.updateAvatarModelVisible=!1,this.$message.success("更换头像成功");var t=this.user;t.avatar=e,this.setUser(t)},updateAvatar:function(){this.updateAvatarModelVisible=!0,this.userId=this.user.userId},updateProfile:function(){this.$refs.updateProfile.setFormValues(this.user),this.profileEditVisiable=!0},handleProfileEditClose:function(){this.profileEditVisiable=!1},handleProfileEditSuccess:function(){this.profileEditVisiable=!1,this.$message.success("修改成功")},handleImageAddClose:function(){this.imageAddVisiable=!1},handleImageAddSuccess:function(){this.imageAddVisiable=!1,this.$message.success("添加成功")}})},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{class:[!0===e.multipage?"multi-page":"single-page","not-menu-page","user-profile"]},[a("a-card",{attrs:{title:"个人信息"}},[a("a-icon",{attrs:{slot:"extra",type:"edit",theme:"twoTone",twoToneColor:"#faad14",title:"编辑个人信息"},on:{click:e.updateProfile},slot:"extra"}),e._v(" "),a("a-row",{attrs:{gutter:8}},[a("a-col",{attrs:{span:6}},[a("a-row",{staticStyle:{"text-align":"center"}},[a("img",{staticStyle:{width:"10rem","border-radius":"2px"},attrs:{alt:"头像",src:e.avatar}})]),e._v(" "),a("a-row",{staticStyle:{"text-align":"center"}},[a("a-button",{staticStyle:{"margin-top":"1rem"},attrs:{icon:"edit"},on:{click:e.updateAvatar}},[e._v("修改头像")])],1)],1),e._v(" "),a("a-col",{staticStyle:{"font-size":"1rem"},attrs:{span:12}},[a("p",[e._v("账户："+e._s(e.user.username))]),e._v(" "),a("p",{attrs:{title:e.user.roleName}},[e._v("角色："+e._s(e.user.roleName?e.user.roleName:"暂无角色"))]),e._v(" "),a("p",[e._v("性别："+e._s(e.sex))]),e._v(" "),a("p",[e._v("电话："+e._s(e.user.mobile?e.user.mobile:"暂未绑定电话"))]),e._v(" "),a("p",[e._v("邮箱："+e._s(e.user.email?e.user.email:"暂未绑定邮箱"))]),e._v(" "),a("p",[e._v("企业："+e._s(e.user.companyName?e.user.companyName:"暂无企业"))]),e._v(" "),a("p",[e._v("描述："+e._s(e.user.description))])])],1)],1),e._v(" "),a("update-avatar",{attrs:{user:e.user,updateAvatarModelVisible:e.updateAvatarModelVisible},on:{cancel:e.handleUpdateAvatarCancel,success:e.handleUpdateAvatarSuccess}}),e._v(" "),a("update-profile",{ref:"updateProfile",attrs:{profileEditVisiable:e.profileEditVisiable},on:{success:e.handleProfileEditSuccess,close:e.handleProfileEditClose}}),e._v(" "),a("image-add",{attrs:{imageAddVisiable:e.imageAddVisiable,initData:e.initData},on:{success:e.handleImageAddSuccess,close:e.handleImageAddClose}})],1)},staticRenderFns:[]};var d=a("C7Lr")(l,u,!1,function(e){a("YvvS")},null,null);t.default=d.exports},YvvS:function(e,t){},bst0:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=["default.jpg","1d22f3e41d284f50b2c8fc32e0788698.jpeg","2dd7a2d09fa94bf8b5c52e5318868b4d9.jpg","2dd7a2d09fa94bf8b5c52e5318868b4df.jpg","8f5b60ef00714a399ee544d331231820.jpeg","17e420c250804efe904a09a33796d5a10.jpg","17e420c250804efe904a09a33796d5a16.jpg","87d8194bc9834e9f8f0228e9e530beb1.jpeg","496b3ace787342f7954b7045b8b06804.jpeg","595ba7b05f2e485eb50565a50cb6cc3c.jpeg","964e40b005724165b8cf772355796c8c.jpeg","5997fedcc7bd4cffbd350b40d1b5b987.jpg","5997fedcc7bd4cffbd350b40d1b5b9824.jpg","a3b10296862e40edb811418d64455d00.jpeg","a43456282d684e0b9319cf332f8ac468.jpeg","bba284ac05b041a8b8b0d1927868d5c9x.jpg","c7c4ee7be3eb4e73a19887dc713505145.jpg","ff698bb2d25c4d218b3256b46c706ece.jpeg"],r=["cnrhVkzwxjPwAaCfPbdc.png","BiazfanxmamNRoxxVxka.png","gaOngJwsRYRaVAuXXcmB.png","WhxKECPNujWoWEFNdnJE.png","ubnKSIfAJTxIgXOKlciN.png","jZUIxmJycoymBprLOUbT.png"],i=["19034103295190235.jpg","20180414165920.jpg","20180414170003.jpg","20180414165927.jpg","20180414165754.jpg","20180414165815.jpg","20180414165821.jpg","20180414165827.jpg","20180414165834.jpg","20180414165840.jpg","20180414165846.jpg","20180414165855.jpg","20180414165909.jpg","20180414165914.jpg","20180414165936.jpg","20180414165942.jpg","20180414165947.jpg","20180414165955.jpg"],n={props:{updateAvatarModelVisible:{default:!1},user:{required:!0}},data:function(){return{hthz:s,al:r,lm:i,updating:!1}},computed:{show:{get:function(){return this.updateAvatarModelVisible},set:function(){}}},methods:{handleCancel:function(){this.$emit("cancel")},change:function(e){var t=this;this.updating?this.$message.warning("更换头像中，请勿重复点击"):(this.updating=!0,this.$put("user/avatar",{username:this.user.username,avatar:e}).then(function(){t.$emit("success",e),t.updating=!1}).catch(function(e){console.error(e),t.$message.error("更新头像失败"),t.updating=!1}))}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-modal",{staticClass:"update-avatar",attrs:{title:"选择头像",width:710,footer:null},on:{cancel:e.handleCancel},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[a("a-tabs",{staticClass:"avatar-tabs",attrs:{defaultActiveKey:"1"}},[a("a-tab-pane",{key:"1",attrs:{tab:"后田花子"}},[e._l(e.hthz,function(t,s){return[a("div",{key:s,staticClass:"avatar-wrapper"},[a("img",{attrs:{alt:"点击选择",src:"static/avatar/"+t},on:{click:function(a){e.change(t)}}})])]})],2),e._v(" "),a("a-tab-pane",{key:"2",attrs:{tab:"阿里系",forceRender:""}},[e._l(e.al,function(t,s){return[a("div",{key:s,staticClass:"avatar-wrapper"},[a("img",{attrs:{alt:"点击选择",src:"static/avatar/"+t},on:{click:function(a){e.change(t)}}})])]})],2),e._v(" "),a("a-tab-pane",{key:"3",attrs:{tab:"脸萌"}},[e._l(e.lm,function(t,s){return[a("div",{key:s,staticClass:"avatar-wrapper"},[a("img",{attrs:{alt:"点击选择",src:"static/avatar/"+t},on:{click:function(a){e.change(t)}}})])]})],2)],1)],1)},staticRenderFns:[]};var c=a("C7Lr")(n,o,!1,function(e){a("MOKd")},null,null);t.default=c.exports},mNoI:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("ZLEe"),r=a.n(s),i=a("A9zj"),n=a.n(i),o=a("4YfN"),c=a.n(o),l=a("2bvH"),u={labelCol:{span:3},wrapperCol:{span:18}},d={props:{profileEditVisiable:{default:!1}},data:function(){return{formItemLayout:u,form:this.$form.createForm(this),userId:"",roleId:"",companyId:"",status:"",username:"",loading:!1}},computed:c()({},Object(l.c)({currentUser:function(e){return e.account.user}})),methods:c()({},Object(l.b)({setUser:"account/setUser"}),{onClose:function(){this.loading=!1,this.form.resetFields(),this.$emit("close")},setFormValues:function(e){var t=this,a=n()(e,[]);this.userId=a.userId;var s=["email","ssex","description","mobile"];r()(a).forEach(function(e){if(-1!==s.indexOf(e)){t.form.getFieldDecorator(e);var r={};r[e]=a[e],t.form.setFieldsValue(r)}}),this.status=a.status,this.roleId=a.roleId,this.username=a.username},handleSubmit:function(){var e=this;this.form.validateFields(function(t,a){if(!t){e.loading=!0;var s=e.form.getFieldsValue();s.userId=e.userId,s.roleId=e.roleId,s.companyId=e.companyId,s.status=e.status,s.username=e.username,e.$put("user/profile",c()({},s)).then(function(t){e.loading=!1,e.$emit("success"),e.$get("user/"+s.username).then(function(t){e.setUser(t.data)})}).catch(function(){e.loading=!1})}})}})},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-drawer",{staticStyle:{height:"calc(100% - 55px)",overflow:"auto","padding-bottom":"53px"},attrs:{title:"编辑资料",maskClosable:!1,width:"650",placement:"right",closable:!1,visible:e.profileEditVisiable},on:{close:e.onClose}},[a("a-form",{attrs:{form:e.form}},[a("a-form-item",e._b({attrs:{label:"邮箱"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["email",{rules:[{type:"email",message:"请输入正确的邮箱"},{max:50,message:"长度不能超过50个字符"}]}],expression:"[\n        'email',\n        {rules: [\n          { type: 'email', message: '请输入正确的邮箱' },\n          { max: 50, message: '长度不能超过50个字符'}\n        ]}\n      ]"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"手机"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["mobile",{rules:[{pattern:"^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$",message:"请输入正确的手机号"}]}],expression:"['mobile', {rules: [\n          { pattern: '^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$', message: '请输入正确的手机号'}\n        ]}]"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"性别"}},"a-form-item",e.formItemLayout,!1),[a("a-radio-group",{directives:[{name:"decorator",rawName:"v-decorator",value:["ssex",{rules:[{required:!0,message:"请选择性别"}]}],expression:"[\n          'ssex',\n          {rules: [{ required: true, message: '请选择性别' }]}\n        ]"}]},[a("a-radio",{attrs:{value:"0"}},[e._v("男")]),e._v(" "),a("a-radio",{attrs:{value:"1"}},[e._v("女")]),e._v(" "),a("a-radio",{attrs:{value:"2"}},[e._v("保密")])],1)],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"描述"}},"a-form-item",e.formItemLayout,!1),[a("a-textarea",{directives:[{name:"decorator",rawName:"v-decorator",value:["description",{rules:[{max:100,message:"长度不能超过100个字符"}]}],expression:"[\n        'description',\n        {rules: [\n          { max: 100, message: '长度不能超过100个字符'}\n        ]}]"}],attrs:{rows:4}})],1)],1),e._v(" "),a("div",{staticClass:"drawer-bootom-button"},[a("a-popconfirm",{attrs:{title:"确定放弃编辑？",okText:"确定",cancelText:"取消"},on:{confirm:e.onClose}},[a("a-button",{staticStyle:{"margin-right":".8rem"}},[e._v("取消")])],1),e._v(" "),a("a-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)},staticRenderFns:[]},m=a("C7Lr")(d,p,!1,null,null,null);t.default=m.exports}});
//# sourceMappingURL=7.7bf796f4f7b127120558.js.map