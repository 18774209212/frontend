<template>
  <a-modal v-model="show"
           :centered="true"
           :keyboard="false"
           :footer="null"
           :width="600"
           @cancel="handleCancleClick"
           title="信息详情">
    <div class="info">
      <a-row v-if="images" :gutter="2">
        <a-col :span="12" class="poster">
          <a-carousel arrows
                  dotsClass="slick-dots slick-thumb">
            <a slot="customPaging"
              slot-scope="props">
              <img :src="images[props.i]" />
            </a>
            <div v-for="item in images"
                :key="item" style="height:165px;width: 90%;overflow:hidden">
              <img :src="item"
                  style="height:100%;display: inline-block;" />
            </div>
          </a-carousel>
        </a-col>
        <a-col :span="12">
          <p v-for="(value, key) in label.top"
            :key="key">
            {{value}} : {{data[key]}}
          </p>
        </a-col>
      </a-row>
      <a-row v-else>
        <a-col :span="24">
          <p v-for="(value, key) in label.top"
            :key="key">
            {{value}} : {{data[key]}}
          </p>
        </a-col>
      </a-row>
      <a-row>
        <div v-for="(value, key) in label.bottom" v-if="data[key]"
            :key="key">
          <a-divider orientation="left">{{value}}</a-divider>
          <div style="text-indent: 1rem;margin-bottom: 2rem">{{data[key]}}</div>
        </div>
      </a-row>
    </div>
  </a-modal>
</template>
<script>
export default {
  name: 'Info',
  props: {
    infoVisiable: {
      require: true,
      default: false
    },
    data: {
      require: true
    },
    label: {
      require: true
    },
    images: {
      type: Array
    }
  },
  computed: {
    show: {
      get: function () {
        return this.infoVisiable
      },
      set: function () {
      }
    }
  },
  methods: {
    handleCancleClick () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
/* For demo */
.ant-carousel >>> .slick-slider {
  position: unset;
}
.ant-carousel >>> .slick-dots {
  height: auto;
  position: unset;
}
.ant-carousel >>> .slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
.ant-carousel >>> .slick-thumb {
  bottom: -45px;
}
.ant-carousel >>> .slick-thumb li {
  width: 60px;
  height: 45px;
}
.ant-carousel >>> .slick-thumb li img {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
.poster {
  text-align: center;
}
.info {
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 400px;
  margin-top: -20px;
  margin-top: -20px;
}
.info-side {
  background: #fff;
}
.content-one {
  display: inline-block;
  text-align: left;
  tr {
    vertical-align: top;
  }
  .label {
    min-width: 80px;
  }
}
p {
  margin-bottom: 0.5rem;
  white-space: unset;
  word-break: break-all;
}
i {
  margin-right: 0.8rem;
}
</style>
