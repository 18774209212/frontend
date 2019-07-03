<!--
使用说明:
   v-on:  map-confirm,参数为array数组,传递经纬度值
   v-on   cancel    取消时发出事件
-->
<template>
  <div v-if="showMapComponent"
       style="border:1px solid lightgray">
    <baidu-map v-bind:style="mapStyle"
               class="bm-view"
               ak="1dweTUj6HlNxAPGkBQFnaG5Xe9Ms4meK"
               :center="center"
               :zoom="zoom"
               :scroll-wheel-zoom="true"
               @click="getClickInfo"
               @moving="syncCenterAndZoom"
               @moveend="syncCenterAndZoom"
               @zoomend="syncCenterAndZoom">
      <bm-view style="width: 100%; height:300px;"></bm-view>
      <bm-marker :position="{lng: center.lng, lat: center.lat}"
                 :dragging="true"
                 animation="BMAP_ANIMATION_BOUNCE">
      </bm-marker>
      <bm-control style="{width: '10px', height: '10px'}">
        <bm-auto-complete v-model="keyword"
                          :sugStyle="{zIndex: 999999}">
          <input type="text"
                 placeholder="请输入搜索关键字"
                 class="serachinput">
        </bm-auto-complete>
      </bm-control>
      <bm-local-search :keyword="keyword"
                       :auto-viewport="true"
                       style="width:0px;height:0px;overflow: hidden;"></bm-local-search>
    </baidu-map>
    <div slot="footer"
         style="margin-top: 0px; text-align: right;">
      <a-button type="primary"
                style="width: 60px;height: 36px;"
                @click="confirm">确定</a-button>
    </div>
  </div>
</template>
<script>
import { BaiduMap, BmControl, BmView, BmAutoComplete, BmLocalSearch, BmMarker } from 'vue-baidu-map'
export default {
  components: {
    BaiduMap,
    BmControl,
    BmView,
    BmAutoComplete,
    BmLocalSearch,
    BmMarker
  },
  data: function () {
    return {
      keyword: '',
      mapStyle: {
        width: '100%',
        height: this.mapHeight + 'px'
      },
      center: { lng: 116.404, lat: 39.915 },
      zoom: 15
    }
  },
  props: {
    showMapComponent: {
      default: false
    },
    mapHeight: {
      type: Number,
      default: 300
    }
  },
  methods: {
    /***
       * 地图点击事件。
       */
    getClickInfo (e) {
      this.center.lng = e.point.lng
      this.center.lat = e.point.lat
      console.log(this.center.lng, this.center.lat)
    },
    syncCenterAndZoom (e) {
      const { lng, lat } = e.target.getCenter()
      this.center.lng = lng
      this.center.lat = lat
      this.zoom = e.target.getZoom()
    },
    /***
       * 确认
       */
    confirm: function () {
      // this.showMapComponent = false
      this.$emit('map-confirm', this.center, this.keyword)
      this.keyword = ''
    }
  }
}
</script>

<style scoped>
.serachinput {
  width: 300px;
  box-sizing: border-box;
  padding: 9px;
  border: 1px solid #dddee1;
  line-height: 20px;
  font-size: 16px;
  height: 38px;
  color: #333;
  position: relative;
  border-radius: 4px;
  -webkit-box-shadow: #666 0px 0px 10px;
  -moz-box-shadow: #666 0px 0px 10px;
  box-shadow: #666 0px 0px 10px;
}
</style>
