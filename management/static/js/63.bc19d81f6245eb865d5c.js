webpackJsonp([63],{Zbla:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"DetpInputTree",data:function(){return{deptTreeData:[],value:void 0}},methods:{reset:function(){this.value=""}},mounted:function(){var e=this;this.$get("dept").then(function(t){e.deptTreeData=t.data.rows.children})},watch:{value:function(e){this.$emit("change",e)}}},r={render:function(){var e=this,t=e.$createElement;return(e._self._c||t)("a-tree-select",{attrs:{allowClear:!0,dropdownStyle:{maxHeight:"220px",overflow:"auto"},treeData:e.deptTreeData},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})},staticRenderFns:[]},l=a("C7Lr")(n,r,!1,null,null,null);t.default=l.exports}});
//# sourceMappingURL=63.bc19d81f6245eb865d5c.js.map