<template>
  <div class="multi-page not-menu-page user-profile">
    <div class="video">
      <div id="playWind"
           v-show="isMonitor"
           v-bind:style="{width: w+'px', height: h+'px', display: 'inline-block'}">
      </div>
      <video id="myPlayer"
             v-show="!isMonitor"
             v-bind:style="{width: w+'px', height: h+'px', display: 'inline-block'}"
             :src="src"
             controls
             playsInline
             webkit-playsinline
             autoplay>
      </video>
    </div>
    <div class="nav">
      <a-button v-for="(item, index) in videos"
                :key="index"
                @click="play(item)"
                plain>{{item.title}}</a-button>
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
require('@/utils/ezuikit.js')

export default {
  name: 'MonitorView',
  components: {},
  data () {
    return {
      videos: [],
      w: 600,
      h: 400,
      isMonitor: true,
      monitor: null,
      player: null,
      src: null
    }
  },
  computed: {
    ...mapState({
      user: state => state.account.user
    })
  },
  created () {
  },
  mounted () {
    var companyId = this.user.companyId
    this.$get('company/monitor', { companyId: companyId }).then((r) => {
      this.videos = r.data
      if (this.videos) { this.play(this.videos[0]) }
    })
  },
  beforeDestroy () {
    console.log('destroy')
    try {
      this.stopMonitor()
      this.stopPlayer()
    } catch (e) { }
  },
  methods: {
    stopPlayer () {
      if (this.player) {
        this.player.stop()
        this.player = null
        this.src = null
      }
    },
    stopMonitor () {
      if (this.monitor) {
        this.monitor.stop()
        this.monitor = null
      }
    },
    play (item) {
      this.stopMonitor()
      this.stopPlayer()
      if (item.token) {
        this.isMonitor = true
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          this.monitor = new EZUIKit.EZUIPlayer({
            id: 'playWind',
            autoplay: true,
            url: item.url,
            accessToken: item.token,
            decoderPath: '../',
            width: this.w,
            height: this.h
          })
        }, 500)
      } else {
        this.isMonitor = false
        this.src = item.url
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          this.player = new EZUIKit.EZUIPlayer('myPlayer')
        }, 500)
      }
    }
  }
}
</script>
<style lang="less">
.user-profile {
  .ant-card-body {
    padding: 1rem 0 !important;
    p {
      font-size: 0.9rem !important;
      margin-bottom: 0.6rem !important;
    }
  }
}
.video {
  text-align: center;
}
.nav {
  padding: 10px;
}
</style>
