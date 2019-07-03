webpackJsonp([44],{IbCB:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("ZLEe"),i=a.n(r),o={labelCol:{span:3},wrapperCol:{span:18}},s={name:"ReportAdd",components:{UploadImage:a("AS2Z").a},props:{reportAddVisiable:{default:!1},batchId:{}},data:function(){return{loading:!1,formItemLayout:o,form:this.$form.createForm(this),fileList:[]}},methods:{handleFileSelect:function(e){this.fileList.push(e)},handleFileRemove:function(e){this.fileList.splice(e,1)},reset:function(){this.loading=!1,this.form.resetFields(),this.fileList=[],this.$refs.uploadImageChild.finished()},onClose:function(){this.reset(),this.$emit("close")},handleSubmit:function(){var e=this;this.form.validateFields(function(t,a){if(!t){e.loading=!0;var r=new FormData;i()(a).forEach(function(e){a[e]&&r.append(e,a[e])}),e.fileList.forEach(function(e,t){r.append("files",e,"file_"+Date.parse(new Date)+".jpg")}),e.$upload("report",r).then(function(){e.reset(),e.$emit("success")}).catch(function(){e.loading=!1})}})}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-drawer",{staticStyle:{height:"calc(100% - 55px)",overflow:"auto","padding-bottom":"53px"},attrs:{title:"新增检验报告",maskClosable:!1,width:"650",placement:"right",closable:!1,visible:e.reportAddVisiable},on:{close:e.onClose}},[a("a-form",{attrs:{form:e.form}},[a("a-form-item",e._b({attrs:{label:"批次ID"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["batchId",{initialValue:e.batchId,rules:[{required:!0,message:"不能为空"}]}],expression:"['batchId',\n                 {initialValue: batchId,\n                   rules: [\n                  { required: true, message: '不能为空'}\n                ]}]"}],attrs:{readOnly:""}})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"检验名称"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["reportName",{rules:[{required:!0,message:"不能为空"}]}],expression:"['reportName',\n                 {rules: [\n                  { required: true, message: '不能为空'}\n                ]}]"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"检验人"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["surveyor",{rules:[{max:30,message:"长度不能超过30个字符"}]}],expression:"['surveyor',\n            {rules: [{ max: 30, message: '长度不能超过30个字符'}\n            ]}]"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"检验结果"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["result",{rules:[{max:100,message:"长度不能超过100个字符"}]}],expression:"['result',\n            {rules: [{ max: 100, message: '长度不能超过100个字符'}\n            ]}]"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"图片"}},"a-form-item",e.formItemLayout,!1),[a("upload-image",{ref:"uploadImageChild",attrs:{limitNum:"3"},on:{fileSelect:e.handleFileSelect,fileRemove:e.handleFileRemove}})],1)],1),e._v(" "),a("div",{staticClass:"drawer-bootom-button"},[a("a-popconfirm",{attrs:{title:"确定放弃编辑？",okText:"确定",cancelText:"取消"},on:{confirm:e.onClose}},[a("a-button",{staticStyle:{"margin-right":".8rem"}},[e._v("取消")])],1),e._v(" "),a("a-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)},staticRenderFns:[]},n=a("C7Lr")(s,l,!1,null,null,null);t.default=n.exports}});
//# sourceMappingURL=44.4ef07b7a9ba6d4e1bd05.js.map