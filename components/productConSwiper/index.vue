<template>
  <view class="product-bg">
    <swiper
      :indicator-dots="indicatorDots"
      indicator-active-color="#e93323"
      :autoplay="autoplay"
      :circular="circular"
      :interval="interval"
      :duration="duration"
      @change="change"
    >
      <swiper-item v-if="videoline">
        <view class="item">
          <view v-show="!controls" style="width: 100%; height: 100%">
            <video
              id="myVideo"
              :src="videoline"
              objectFit="cover"
              controls
              style="width: 100%; height: 100%"
              show-center-play-btn
              show-mute-btn="true"
              auto-pause-if-navigate
              :custom-cache="false"
              :enable-progress-gesture="false"
              :poster="imgUrls[0]"
              @pause="videoPause"
            ></video>
          </view>
          <view class="poster" v-show="controls">
            <image class="image" :src="imgUrls[0]"></image>
          </view>
          <view class="stop" v-show="controls" @tap="bindPause">
            <image class="image" src="https://cshy.store/file/sysFile/wechart/stop.png"></image>
          </view>
        </view>
      </swiper-item>

      <block v-for="(item, index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" />
        </swiper-item>
      </block>
      <template v-if="userIndicatorDots"> </template>
    </swiper>
    <view class="dot-box" v-if="imgUrls.length>1">
      <view
        class="dot-item"
        :class="{ 'dot-item-active': currents == index + 1 }"
        v-for="(item, index) in imgUrls"
        ></view
      >
    </view>
  </view>
</template>

<script>
export default {
  props: {
    imgUrls: {
      type: Array,
      default: function () {
        return []
      },
    },
    videoline: {
      type: String,
      value: '',
    },
    indicatorDots: {
      type: Boolean,
      default: true,
    },
    userIndicatorDots: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // indicatorDots: true,
      circular: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      currents: '1',
      controls: true,
      isPlay: true,
      videoContext: '',
    }
  },
  mounted() {
    if (this.videoline) {
      this.imgUrls.shift()
    }
  },
  methods: {
    videoPause(e) {},
    bindPause: function () {
      this.videoContext.play()
      this.$set(this, 'controls', false)
      this.autoplay = false
    },
    change: function (e) {
      this.$set(this, 'currents', e.detail.current + 1)
    },
  },
}
</script>

<style scoped lang="scss">
.product-bg {
  width: 100%;
  height: 750rpx;
  position: relative;
  .dot-box {
    position: absolute;
    bottom: 26rpx;
    left: 30rpx;
    right: 30rpx;
   display: flex;
    justify-content: center;
    align-items: center;
    .dot-item {
      height: 4rpx;
      background: #ffffff;
      border-radius: 3rpx;
      opacity: 0.4;
      margin-right: 13rpx;
      width: 128rpx;
    }
    .dot-item:last-child {
      margin-right: 0;
    }
    .dot-item-active {
      opacity: 1;
    }
  }
}

.product-bg swiper {
  width: 100%;
  height: 100%;
  position: relative;
}

.product-bg .slide-image {
  width: 100%;
  height: 100%;
}

.product-bg .pages {
  position: absolute;
  background-color: #fff;
  height: 34rpx;
  padding: 0 10rpx;
  border-radius: 3rpx;
  right: 30rpx;
  bottom: 30rpx;
  line-height: 34rpx;
  font-size: 24rpx;
  color: #050505;
}

#myVideo {
  width: 100%;
  height: 100%;
}

.product-bg .item {
  position: relative;
  width: 100%;
  height: 100%;
}

.product-bg .item .poster {
  position: absolute;
  top: 0;
  left: 0;
  height: 750rpx;
  width: 100%;
  z-index: 9;
}

.product-bg .item .poster .image {
  width: 100%;
  height: 100%;
}

.product-bg .item .stop {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 136rpx;
  height: 136rpx;
  margin-top: -68rpx;
  margin-left: -68rpx;
  z-index: 9;
}

.product-bg .item .stop .image {
  width: 100%;
  height: 100%;
}
</style>
