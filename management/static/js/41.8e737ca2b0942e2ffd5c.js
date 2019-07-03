webpackJsonp([41],{PODr:function(e,t){},to5F:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("4YfN"),o=a.n(n),r={name:"SystemLog",components:{RangeDate:a("JpjP").a},data:function(){return{advanced:!1,dataSource:[],sortedInfo:null,paginationInfo:null,selectedRowKeys:[],queryParams:{},pagination:{pageSizeOptions:["10","20","30","40","100"],defaultCurrent:1,defaultPageSize:10,showQuickJumper:!0,showSizeChanger:!0,showTotal:function(e,t){return"显示 "+t[0]+" ~ "+t[1]+" 条记录，共 "+e+" 条记录"}},loading:!1}},computed:{columns:function(){var e=this.$createElement,t=this.sortedInfo;return[{title:"操作人",dataIndex:"username"},{title:"操作描述",dataIndex:"operation"},{title:"耗时",dataIndex:"time",customRender:function(t,a,n){return e("a-tag",t<500?{attrs:{color:"green"}}:t<1e3?{attrs:{color:"cyan"}}:t<1500?{attrs:{color:"orange"}}:{attrs:{color:"red"}},[t," ms"])},sorter:!0,sortOrder:"time"===(t=t||{}).columnKey&&t.order},{title:"执行方法",dataIndex:"method",scopedSlots:{customRender:"method"}},{title:"方法参数",dataIndex:"params",scopedSlots:{customRender:"params"},width:100},{title:"IP地址",dataIndex:"ip"},{title:"操作地点",dataIndex:"location"},{title:"操作时间",dataIndex:"createTime",sorter:!0,sortOrder:"createTime"===t.columnKey&&t.order}]}},mounted:function(){this.fetch()},methods:{onSelectChange:function(e){this.selectedRowKeys=e},toggleAdvanced:function(){this.advanced=!this.advanced,this.advanced||(this.queryParams.createTimeFrom="",this.queryParams.createTimeTo="",this.queryParams.location="")},handleDateChange:function(e){e&&(this.queryParams.createTimeFrom=e[0],this.queryParams.createTimeTo=e[1])},batchDelete:function(){if(this.selectedRowKeys.length){var e=this;this.$confirm({title:"确定删除所选中的记录?",content:"当您点击确定按钮后，这些记录将会被彻底删除",centered:!0,onOk:function(){e.$delete("admin/log/"+e.selectedRowKeys.join(",")).then(function(){e.$message.success("删除成功"),e.selectedRowKeys=[],e.search()})},onCancel:function(){e.selectedRowKeys=[]}})}else this.$message.warning("请选择需要删除的记录")},exprotExccel:function(){var e=this.sortedInfo,t=void 0,a=void 0;e&&(t=e.field,a=e.order),this.$export("admin/log/excel",o()({sortField:t,sortOrder:a},this.queryParams))},search:function(){var e=this.sortedInfo,t=void 0,a=void 0;e&&(t=e.field,a=e.order),this.fetch(o()({sortField:t,sortOrder:a},this.queryParams))},reset:function(){this.selectedRowKeys=[],this.$refs.TableInfo.pagination.current=this.pagination.defaultCurrent,this.paginationInfo&&(this.paginationInfo.current=this.pagination.defaultCurrent,this.paginationInfo.pageSize=this.pagination.defaultPageSize),this.sortedInfo=null,this.queryParams={},this.advanced&&this.$refs.createTime.reset(),this.fetch()},handleTableChange:function(e,t,a){this.paginationInfo=e,this.sortedInfo=a,this.fetch(o()({sortField:a.field,sortOrder:a.order},this.queryParams,t))},fetch:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.loading=!0,this.paginationInfo?(this.$refs.TableInfo.pagination.current=this.paginationInfo.current,this.$refs.TableInfo.pagination.pageSize=this.paginationInfo.pageSize,t.pageSize=this.paginationInfo.pageSize,t.pageNum=this.paginationInfo.current):(t.pageSize=this.pagination.defaultPageSize,t.pageNum=this.pagination.defaultCurrent),this.$get("admin/log",o()({},t)).then(function(t){var a=t.data,n=o()({},e.pagination);n.total=a.total,e.loading=!1,e.dataSource=a.rows,e.pagination=n})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-card",{staticClass:"card-area",attrs:{bordered:!1}},[a("a-form",{attrs:{layout:"horizontal"}},[a("div",{class:e.advanced?null:"fold"},[a("a-row",[a("a-col",{attrs:{md:12,sm:24}},[a("a-form-item",{attrs:{label:"操作人",labelCol:{span:5},wrapperCol:{span:18,offset:1}}},[a("a-input",{model:{value:e.queryParams.username,callback:function(t){e.$set(e.queryParams,"username",t)},expression:"queryParams.username"}})],1)],1),e._v(" "),a("a-col",{attrs:{md:12,sm:24}},[a("a-form-item",{attrs:{label:"操作描述",labelCol:{span:5},wrapperCol:{span:18,offset:1}}},[a("a-input",{model:{value:e.queryParams.operation,callback:function(t){e.$set(e.queryParams,"operation",t)},expression:"queryParams.operation"}})],1)],1)],1),e._v(" "),e.advanced?a("a-row",[a("a-col",{attrs:{md:12,sm:24}},[a("a-form-item",{attrs:{label:"操作地点",labelCol:{span:5},wrapperCol:{span:18,offset:1}}},[a("a-input",{model:{value:e.queryParams.location,callback:function(t){e.$set(e.queryParams,"location",t)},expression:"queryParams.location"}})],1)],1),e._v(" "),a("a-col",{attrs:{md:12,sm:24}},[a("a-form-item",{attrs:{label:"操作时间",labelCol:{span:5},wrapperCol:{span:18,offset:1}}},[a("range-date",{ref:"createTime",staticStyle:{width:"100%"},on:{change:e.handleDateChange}})],1)],1)],1):e._e()],1),e._v(" "),a("span",{staticStyle:{float:"right","margin-top":"3px"}},[a("a-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查询")]),e._v(" "),a("a-button",{staticStyle:{"margin-left":"8px"},on:{click:e.reset}},[e._v("重置")]),e._v(" "),a("a",{staticStyle:{"margin-left":"8px"},on:{click:e.toggleAdvanced}},[e._v("\n          "+e._s(e.advanced?"收起":"展开")+"\n          "),a("a-icon",{attrs:{type:e.advanced?"up":"down"}})],1)],1)]),e._v(" "),a("div",[a("div",{staticClass:"operator"},[a("a-button",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"admin:log:delete",expression:"'admin:log:delete'"}],attrs:{type:"primary",ghost:""},on:{click:e.batchDelete}},[e._v("删除")]),e._v(" "),a("a-dropdown",{directives:[{name:"hasPermission",rawName:"v-hasPermission",value:"admin:log:export",expression:"'admin:log:export'"}]},[a("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[a("a-menu-item",{key:"export-data",on:{click:e.exprotExccel}},[e._v("导出Excel")])],1),e._v(" "),a("a-button",[e._v("\n          更多操作 "),a("a-icon",{attrs:{type:"down"}})],1)],1)],1),e._v(" "),a("a-table",{ref:"TableInfo",attrs:{columns:e.columns,rowKey:"id",dataSource:e.dataSource,pagination:e.pagination,loading:e.loading,rowSelection:{selectedRowKeys:e.selectedRowKeys,onChange:e.onSelectChange},scroll:{x:1400}},on:{change:e.handleTableChange},scopedSlots:e._u([{key:"method",fn:function(t,n){return[a("a-popover",{attrs:{placement:"topLeft"}},[a("template",{slot:"content"},[a("div",[e._v(e._s(t))])]),e._v(" "),a("p",{staticStyle:{width:"200px","margin-bottom":"0"}},[e._v(e._s(t))])],2)]}},{key:"params",fn:function(t,n){return[a("a-popover",{attrs:{placement:"topLeft"}},[a("template",{slot:"content"},[a("div",{staticStyle:{"max-width":"300px"}},[e._v(e._s(t))])]),e._v(" "),a("p",{staticStyle:{width:"100px","margin-bottom":"0"}},[e._v(e._s(t))])],2)]}}])})],1)],1)},staticRenderFns:[]};var s=a("C7Lr")(r,i,!1,function(e){a("PODr")},"data-v-050f6457",null);t.default=s.exports}});
//# sourceMappingURL=41.8e737ca2b0942e2ffd5c.js.map