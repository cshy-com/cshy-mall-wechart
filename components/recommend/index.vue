<template>
  <view class="recommend">
    <slot name="header">
      <view class="title acea-row row-center-wrapper">
        <text class="iconfont icon-zhuangshixian"></text>
        <text class="name">精选推荐</text>
        <text class="iconfont icon-zhuangshixian lefticon"></text>
      </view>
    </slot>
    <view class="recommendList acea-row row-between-wrapper">
      <view
        class="item"
        v-for="(item, index) in hostProduct"
        :key="index"
        hover-class="none"
        @tap="goDetail(item)"
      >
        <view class="pictrue">
          <image
            :src="item.image"
            lazy-load
            @error="handleImageError(item)"
          ></image>
        </view>
        <span
          class="pictrue_log_big pictrue_log_class"
          v-if="item.activityH5 && item.activityH5.type === '1'"
          >秒杀</span
        >
        <span
          class="pictrue_log_big pictrue_log_class"
          v-if="item.activityH5 && item.activityH5.type === '2'"
          >砍价</span
        >
        <span
          class="pictrue_log_big pictrue_log_class"
          v-if="item.activityH5 && item.activityH5.type === '3'"
          >拼团</span
        >

        <view class="name van-multi-ellipsis--l2">{{ item.storeName }}</view>
        <view class="money">
          <text class="font-color">
            <text class="num"> {{ item.price }}</text>
            元
          </text>
          <!-- <text class="text-line">
            {{ item.otPrice }}元
          </text> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { goShopDetail } from '@/libs/order.js'
export default {
  computed: mapGetters(['uid']),
  props: {
    hostProduct: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {
      defaultPic:  ('https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif'),
    }
  },

  methods: {
    handleImageError(item) {
      item.image = this.defaultPic
    },
    goDetail(item) {
      goShopDetail(item, this.uid).then((res) => {
        uni.navigateTo({
          url: `/pages/goods/goods_details/index?id=${item.id}`,
        })
      })
    },
  },
}
</script>

<style scoped lang="scss">
.recommend {
  background-color: #fff;
}

.recommend .title {
  height: 135rpx;
  line-height: 135rpx;
  font-size: 28rpx;
  color: #282828;
}

.recommend .title .name {
  margin: 0 28rpx;
}

.recommend .title .iconfont {
  font-size: 170rpx;
  color: #454545;
}

.recommend .title .iconfont.lefticon {
  transform: rotate(180deg);
}

.recommend .recommendList {
  padding: 0 30rpx;
  /* #ifdef H5 */
  padding-bottom: 50rpx;
  /* #endif */
  margin-top: 25rpx;
}

.recommend .recommendList .item {
  width: 335rpx;
  margin-bottom: 20rpx;
  background: #fff;
  border-radius: 20rpx;
}

.recommend .recommendList .item .pictrue {
  position: relative;
  width: 100%;
  height: 335rpx;
  margin: 0;
}

.recommend .recommendList .item .pictrue image {
  width: 100%;
  height: 100%;
  border-radius: 20rpx 20rpx 0 0;background-image: url(https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif);
              background-size: 100% 100%;
              background-position: no-repeat;
              background-position: 0;
}

.recommend .recommendList .item .name {
  font-size: 30rpx;
  color: #2b2b2b;
  margin-top: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  margin-bottom: 10rpx;
  height: 80rpx;
}

.recommend .recommendList .item .money {
  margin-left: 20rpx;
  margin-right: 20rpx;
  padding-bottom: 18rpx;

  font-size: 28rpx;
  color: #9a9a9a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .text-line {    text-decoration: line-through;
  }
}

.recommend .recommendList .item .money .num {
  font-size: 34rpx;
}
</style>
