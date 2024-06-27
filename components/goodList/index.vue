<template>
  <view class="goodList">
    <block v-for="(item, index) in bastList" :key="index">
      <view
        @click="goDetail(item)"
        class="item acea-row row-between-wrapper"
        hover-class="none"
      >
        <view class="pictrue">
          <image :src="item.image"></image>
          <span
            class="pictrue_log pictrue_log_class"
            v-if="item.activityH5 && item.activityH5.type === '1'"
            >秒杀</span
          >
          <span
            class="pictrue_log pictrue_log_class"
            v-if="item.activityH5 && item.activityH5.type === '2'"
            >砍价</span
          >
          <span
            class="pictrue_log pictrue_log_class"
            v-if="item.activityH5 && item.activityH5.type === '3'"
            >拼团</span
          >
        </view>
        <view class="underline">
          <view class="text">
            <view class="van-multi-ellipsis--l2">{{ item.storeName }}</view>
            
            <view class="last-money">
              <view class="money font-color"
                ><text class="num">{{ item.price }}</text
                >元</view
              >

              <view class="vip-money">
                <text class="vip-money-text"
                  >销量{{ Number(item.sales) + Number(item.ficti) || 0 }}</text
                ><text class="vip-money-text">库存{{ Number(item.stock) || 0 }}</text></view
              >
            </view>
          </view>
        </view>
        <!-- <view class='iconfont icon-gouwuche cart-color acea-row row-center-wrapper'></view> -->
      </view>
    </block>
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import { goShopDetail } from '@/libs/order.js'
export default {
  computed: mapGetters(['uid']),
  props: {
    status: {
      type: Number,
      default: 0,
    },
    bastList: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
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
.goodList .item {
  position: relative;
	justify-content: flex-start;
	margin-bottom: 20rpx;
  // padding-left: 30rpx;
}

.goodList .item .pictrue {
  width: 230rpx;
  height: 230rpx;
  position: relative;
}

.goodList .item .pictrue image {
  width: 100%;
  height: 100%;
  border-radius: 20rpx 0 0 20rpx;
  background-image: url(https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif);
              background-size: 100% 100%;
              background-position: no-repeat;
              background-position: 0;
}

.goodList .item .pictrue .numPic {
  position: absolute;
  left: 7rpx;
  top: 7rpx;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
}

.goodList .item .underline {
  padding: 30rpx 30rpx 30rpx 0;
  border-bottom: 1px solid #f5f5f5;
	width: 460rpx;
	background: #fff;
	height: 230rpx;
	padding-left: 20rpx;border-radius: 0 20rpx 20rpx 0;
}

.goodList .item:nth-last-child(1) .underline {
  border-bottom: 0;
}

.goodList .item .text {
  font-size: 30rpx;
  color: #222;
  // width: 489rpx;
}

.goodList .item .text .money {
  font-size: 34rpx;
  font-weight: bold;
}
.goodList .item .text .last-money {
  display: flex;
  align-items: center;
}
.goodList .item .text .org-money {
  font-size: 28rpx;

  font-weight: 400;
  color: #9a9a9a;
  text-decoration: line-through;
  margin: 11rpx 0 7rpx 0;
}

.goodList .item .text .money .num {
  font-size: 34rpx;
}

.goodList .item .text .vip-money {
  font-size: 24rpx;

  font-weight: 400;
  color: #9a9a9a;
  margin-left: auto;
	.vip-money-text{
		margin-left: 20rpx;
	}
}

.goodList .item .text .vip-money image {
  width: 46rpx;
  height: 21rpx;
  margin: 0 22rpx 0 5rpx;
}

.goodList .item .text .vip-money .num {
  font-size: 22rpx;
  color: #aaa;
  font-weight: normal;
  margin: -2rpx 0 0 0;
}

.goodList .item .iconfont {
  position: absolute;
  right: 30rpx;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  font-size: 30rpx;
  bottom: 38rpx;
}
</style>
