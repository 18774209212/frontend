webpackJsonp([46],{Qz03:function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=t("ZLEe"),o=t.n(r),i={labelCol:{span:4},wrapperCol:{span:18}},s={name:"RecordAdd",components:{UploadImage:t("AS2Z").a},props:{recordAddVisiable:{default:!1},batchId:{}},data:function(){return{loading:!1,formItemLayout:i,form:this.$form.createForm(this),fileList:[],operationTime:null,timeId:+new Date}},methods:{onTimeChange:function(e,a){this.operationTime=e},handleFileSelect:function(e){this.fileList.push(e)},handleFileRemove:function(e){this.fileList.splice(e,1)},reset:function(){this.loading=!1,this.form.resetFields(),this.fileList=[],this.$refs.uploadImageChild.finished(),this.timeId=+new Date},onClose:function(){this.reset(),this.$emit("close")},handleSubmit:function(){var e=this;this.form.validateFields(function(a,t){if(!a){t.operationTime=e.operationTime;var r=new FormData;o()(t).forEach(function(e){t[e]&&r.append(e,t[e])}),e.loading=!0,e.fileList.forEach(function(e,a){r.append("files",e,"file_"+Date.parse(new Date)+".jpg")}),e.$upload("record",r).then(function(){e.reset(),e.$emit("success")}).catch(function(){e.loading=!1})}})}}},m={render:function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("a-drawer",{staticStyle:{height:"calc(100% - 55px)",overflow:"auto","padding-bottom":"53px"},attrs:{title:"新增生产档案",maskClosable:!1,width:"650",placement:"right",closable:!1,visible:e.recordAddVisiable},on:{close:e.onClose}},[t("a-form",{attrs:{form:e.form}},[t("a-form-item",e._b({attrs:{label:"批次号"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["batchId",{initialValue:e.batchId,rules:[{required:!0,message:"不能为空"}]}],expression:"['batchId',\n                 {initialValue: batchId,\n                   rules: [\n                  { required: true, message: '不能为空'}\n                ]}]"}],attrs:{readOnly:""}})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"操作"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["operation",{rules:[{required:!0,message:"不能为空"},{max:50,message:"长度不能超过50个字符"}]}],expression:"['operation',\n                 {rules: [\n                  { required: true, message: '不能为空'},\n                  { max: 50, message: '长度不能超过50个字符'}\n                ]}]"}]})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"操作时间"}},"a-form-item",e.formItemLayout,!1),[t("a-date-picker",{key:e.timeId,attrs:{showTime:"",format:"YYYY-MM-DD HH:mm:ss",placeholder:"Select Time"},on:{change:e.onTimeChange}})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"工具"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["tool",{rules:[{max:50,message:"长度不能超过50个字符"}]}],expression:"['tool',\n            {rules: [\n              { max: 50, message: '长度不能超过50个字符'}\n            ]}]"}]})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"操作员"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["operator",{rules:[{max:50,message:"长度不能超过50个字符"}]}],expression:"['operator',\n            {rules: [\n              { max: 50, message: '长度不能超过50个字符'}\n            ]}]"}]})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"用品"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["item",{rules:[{max:100,message:"长度不能超过100个字符"}]}],expression:"['item',\n            {rules: [\n              { max: 100, message: '长度不能超过100个字符'}\n            ]}]"}]})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"用量"}},"a-form-item",e.formItemLayout,!1),[t("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["dosage",{rules:[{max:100,message:"长度不能超过100个字符"}]}],expression:"['dosage',\n            {rules: [\n              { max: 100, message: '长度不能超过100个字符'}\n            ]}]"}]})],1),e._v(" "),t("a-form-item",e._b({attrs:{label:"图片"}},"a-form-item",e.formItemLayout,!1),[t("upload-image",{ref:"uploadImageChild",attrs:{limitNum:"3"},on:{fileSelect:e.handleFileSelect,fileRemove:e.handleFileRemove}})],1)],1),e._v(" "),t("div",{staticClass:"drawer-bootom-button"},[t("a-popconfirm",{attrs:{title:"确定放弃编辑？",okText:"确定",cancelText:"取消"},on:{confirm:e.onClose}},[t("a-button",{staticStyle:{"margin-right":".8rem"}},[e._v("取消")])],1),e._v(" "),t("a-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)},staticRenderFns:[]},n=t("C7Lr")(s,m,!1,null,null,null);a.default=n.exports}});
//# sourceMappingURL=46.c53e1db9cb6cfa235a06.js.map