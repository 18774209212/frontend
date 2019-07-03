webpackJsonp([17,45],{"64m4":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("4YfN"),r=a.n(o),i=a("JABh"),n={name:"Record",components:{RecordEdit:a("PMBB").default,Info:i.a},data:function(){return{current_user:this.$store.state.account.user,advanced:!1,dataSource:[],selectedRowKeys:[],queryParams:{},sortedInfo:null,loading:!1,recordEditVisiable:!1,paginationInfo:null,info:{visiable:!1,label:{top:{batchId:"批次号",recordId:"档案号",operation:"操作",operationTime:"操作时间",tool:"工具",operator:"操作员",item:"用品",dosage:"用量"}},data:{},images:[]},pagination:{pageSizeOptions:["10","20","30","40","100"],defaultCurrent:1,defaultPageSize:10,showQuickJumper:!0,showSizeChanger:!0,showTotal:function(e,t){return"显示 "+t[0]+" ~ "+t[1]+" 条记录，共 "+e+" 条记录"}}}},computed:{columns:function(){var e=this.sortedInfo;return[{title:"批次号",dataIndex:"batchId",sorter:!0,sortOrder:"createTime"===(e=e||{}).columnKey&&e.order},{title:"档案号",dataIndex:"recordId"},{title:"操作",dataIndex:"operation"},{title:"工具",dataIndex:"tool"},{title:"操作员",dataIndex:"operator"},{title:"操作时间",dataIndex:"operationTime"},{title:"用品",dataIndex:"item"},{title:"用量",dataIndex:"dosage"},{title:"操作",dataIndex:"operations",scopedSlots:{customRender:"operation"},fixed:"right",width:120}]},rowSelection:function(){var e=this;return{onChange:function(t,a){e.selectedRowKeys=t},getCheckboxProps:function(t){return{props:{disabled:t.creator!==e.current_user.username,name:t.creator}}}}}},mounted:function(){this.fetch()},methods:{view:function(e){this.info.data=e,this.info.images=JSON.parse(e.picture),this.info.visiable=!0},handleInfoClose:function(){this.info.visiable=!1},handleRecordEditClose:function(){this.recordEditVisiable=!1},handleRecordEditSuccess:function(){this.recordEditVisiable=!1,this.$message.success("修改档案成功"),this.fetch()},edit:function(e){this.recordEditVisiable=!0,this.$refs.recordEdit.setFormValues(e)},recordDelete:function(){if(this.selectedRowKeys.length){var e=this;this.$confirm({title:"确定删除所选中的记录?",content:"当您点击确定按钮后，这些记录将会被彻底删除！",centered:!0,onOk:function(){e.$delete("record/"+e.selectedRowKeys.join(",")).then(function(){e.$message.success("删除成功"),e.selectedRowKeys=[],e.fetch()})},onCancel:function(){e.selectedRowKeys=[]}})}else this.$message.warning("请选择需要删除的记录")},search:function(){var e=this.sortedInfo,t=void 0,a=void 0;e&&(t=e.field,a=e.order),this.fetch(r()({sortField:t,sortOrder:a},this.queryParams))},reset:function(){this.selectedRowKeys=[],this.sortedInfo=null,this.queryParams={},this.fetch()},handleTableChange:function(e,t,a){this.paginationInfo=e,this.filteredInfo=t,this.sortedInfo=a,this.fetch(r()({sortField:a.field,sortOrder:a.order},this.queryParams,t))},fetch:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.loading=!0,t.creator=this.current_user.username,this.paginationInfo?(this.$refs.TableInfo.pagination.current=this.paginationInfo.current,this.$refs.TableInfo.pagination.pageSize=this.paginationInfo.pageSize,t.pageSize=this.paginationInfo.pageSize,t.pageNum=this.paginationInfo.current):(t.pageSize=this.pagination.defaultPageSize,t.pageNum=this.pagination.defaultCurrent),this.$get("record",r()({},t)).then(function(t){var a=t.data;e.dataSource=a.rows;var o=r()({},e.pagination);o.total=a.total,e.pagination=o,e.loading=!1})}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-card",{staticClass:"card-area",attrs:{bordered:!1}},[a("div",{class:e.advanced?"search":null},[a("a-form",{attrs:{layout:"horizontal"}},[a("div",{class:e.advanced?null:"fold"},[a("a-row",[a("a-col",{attrs:{md:12,sm:24}},[a("a-form-item",{attrs:{label:"批次号",labelCol:{span:5},wrapperCol:{span:18,offset:1}}},[a("a-input",{model:{value:e.queryParams.batchId,callback:function(t){e.$set(e.queryParams,"batchId",t)},expression:"queryParams.batchId"}})],1)],1),e._v(" "),a("a-col",{attrs:{md:12,sm:24}},[a("span",{staticStyle:{float:"left","margin-top":"3px","margin-left":"15px"}},[a("a-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")]),e._v(" "),a("a-button",{staticStyle:{"margin-left":"8px"},on:{click:e.reset}},[e._v("重置")])],1)])],1)],1)])],1),e._v(" "),a("div",[a("div",{staticClass:"operator"},[a("a-button",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"record:delete",expression:"'record:delete'"}],attrs:{type:"primary",ghost:""},on:{click:e.recordDelete}},[e._v("删除")])],1),e._v(" "),a("a-table",{ref:"TableInfo",attrs:{columns:e.columns,dataSource:e.dataSource,rowKey:"recordId",pagination:e.pagination,loading:e.loading,scroll:{x:900},rowSelection:e.rowSelection},on:{change:e.handleTableChange},scopedSlots:e._u([{key:"operation",fn:function(t,o){return[e.current_user.username===o.creator?a("div",[a("a-icon",{attrs:{type:"eye",theme:"twoTone",twoToneColor:"#42b983",title:"查看"},on:{click:function(t){e.view(o)}}}),e._v(" "),a("a-icon",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"record:update",expression:"'record:update'"}],attrs:{type:"edit",theme:"twoTone",twoToneColor:"#faad14",title:"修改"},on:{click:function(t){e.edit(o)}}}),e._v(" "),a("a-badge",{directives:[{name:"hasNoPermission",rawName:"v-hasNoPermission",value:"record:update",expression:"'record:update'"}],attrs:{status:"warning",text:"无权限"}})],1):a("a-badge",{attrs:{status:"warning",text:"无权限"}})]}}])})],1),e._v(" "),a("record-edit",{ref:"recordEdit",attrs:{recordEditVisiable:e.recordEditVisiable},on:{success:e.handleRecordEditSuccess,close:e.handleRecordEditClose}}),e._v(" "),a("info",{attrs:{data:e.info.data,images:e.info.images,label:e.info.label,infoVisiable:e.info.visiable},on:{close:e.handleInfoClose}})],1)},staticRenderFns:[]};var d=a("C7Lr")(n,s,!1,function(e){a("fJ1b")},"data-v-620ee9b3",null);t.default=d.exports},PMBB:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("4YfN"),r=a.n(o),i=a("ZLEe"),n=a.n(i),s=a("A9zj"),d=a.n(s),c=a("ryJa"),l=a.n(c),m={labelCol:{span:4},wrapperCol:{span:18}},u={name:"RecordEdit",props:{recordEditVisiable:{default:!1}},data:function(){return{loading:!1,formItemLayout:m,form:this.$form.createForm(this),record:{},operationTime:null}},methods:{moment:l.a,onTimeChange:function(e,t){this.record.operationTime=e},reset:function(){this.loading=!1,this.form.resetFields()},onClose:function(){this.reset(),this.$emit("close")},setFormValues:function(e){var t=this,a=d()(e,[]),o=["recordId","batchId","operation","tool","operator","item","dosage"];n()(a).forEach(function(e){if(-1!==o.indexOf(e)){t.form.getFieldDecorator(e);var r={};r[e]=a[e],t.form.setFieldsValue(r)}}),a.operationTime&&(this.operationTime=l()(a.operationTime,"YYYY-MM-DD HH:mm:ss"))},handleSubmit:function(){var e=this;this.form.validateFields(function(t,a){if(!t){var o=e.form.getFieldsValue();o.operationTime=e.record.operationTime,e.$put("record",r()({},o)).then(function(){e.reset(),e.$emit("success")}).catch(function(){e.loading=!1})}})}}},f={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-drawer",{staticStyle:{height:"calc(100% - 55px)",overflow:"auto","padding-bottom":"53px"},attrs:{title:"修改生产档案",maskClosable:!1,width:"650",placement:"right",closable:!1,visible:e.recordEditVisiable},on:{close:e.onClose}},[a("a-form",{attrs:{form:e.form}},[a("a-form-item",e._b({attrs:{label:"批次ID"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["batchId"],expression:"['batchId']"}],attrs:{readOnly:""}})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"生产档案ID"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["recordId"],expression:"['recordId']"}],attrs:{readOnly:""}})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"操作"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["operation",{rules:[{required:!0,message:"不能为空"}]}],expression:"['operation',\n                 {rules: [\n                  { required: true, message: '不能为空'}\n                ]}]"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"操作时间"}},"a-form-item",e.formItemLayout,!1),[a("a-date-picker",{attrs:{showTime:"",value:e.operationTime,format:"YYYY-MM-DD HH:mm:ss",placeholder:"Select Time"},on:{change:e.onTimeChange}})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"工具"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["tool"],expression:"['tool']"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"操作员"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["operator"],expression:"['operator']"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"用品"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["item"],expression:"['item']"}]})],1),e._v(" "),a("a-form-item",e._b({attrs:{label:"用量"}},"a-form-item",e.formItemLayout,!1),[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["dosage"],expression:"['dosage']"}]})],1)],1),e._v(" "),a("div",{staticClass:"drawer-bootom-button"},[a("a-popconfirm",{attrs:{title:"确定放弃编辑？",okText:"确定",cancelText:"取消"},on:{confirm:e.onClose}},[a("a-button",{staticStyle:{"margin-right":".8rem"}},[e._v("取消")])],1),e._v(" "),a("a-button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v("提交")])],1)],1)},staticRenderFns:[]},h=a("C7Lr")(u,f,!1,null,null,null);t.default=h.exports},fJ1b:function(e,t){}});
//# sourceMappingURL=17.e784d405ab26c63eb01c.js.map