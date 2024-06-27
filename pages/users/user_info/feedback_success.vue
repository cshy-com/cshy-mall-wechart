<template>
  <view class="page">
    <view class="payment-status">
      <!--失败时： 用icon-iconfontguanbi fail替换icon-duihao2 bg-color-->
      <view class="icons">
        <image
          class="payment-status-img"
          src="https://cshy.store/file/sysFile/wechart/pay-success.png"
        >
        </image>
      </view>

      <!-- 失败时：订单支付失败 -->
      <view class="status">感谢您的建议！</view>
    </view>

    <button
      @click="goIndex"
      class="returnBnt cart-color"
      formType="submit"
      hover-class="none"
      app-parameter=""
    >
      返回首页
    </button>
  </view>
</template>

<script>
import { getOrderDetail } from '@/api/order.js'
import { openOrderSubscribe } from '@/utils/SubscribeMessage.js'
import { toLogin } from '@/libs/login.js'
import { mapGetters } from 'vuex'
 
export default {
  components: {
   
  },
  data() {
    return {
      orderId: '',
      order_pay_info: {
        paid: 1,
        _status: {},
      },
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      status: 0,
      msg: '',
    }
  },
  computed: mapGetters(['isLogin']),
  watch: {
    isLogin: {
      handler: function (newV, oldV) {
        if (newV) {
          
        }
      },
      deep: true,
    },
  },
  onLoad: function (options) {
    
    if (this.isLogin) {
      
    } else {
      toLogin()
    }
  },
  methods: {
   
    
    /**
     * 去首页关闭当前所有页面
     */
    goIndex: function (e) {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },
   
  },
}
</script>

<style lang="scss" scoped>
.icon-iconfontguanbi {
  background-color: #999 !important;
  text-shadow: none !important;
}
.payment-status {
  background-color: #fff;
  margin: 195rpx 30rpx 132rpx 30rpx;
  border-radius: 20rpx;
  padding: 1rpx 0 28rpx 0;
}
.payment-status .icons {
  margin: -91rpx auto 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .payment-status-img {
    width: 224rpx;
    height: 177rpx;
  }
}

.payment-status .status {
  color: #e91331;
  font-weight: 400;
  text-align: center;
  font-size: 30rpx;
  margin: 18rpx 0 63rpx 0;
}
.payment-status .pay-money {
  font-size: 58rpx;

  font-weight: 500;
  color: #2b2b2b;
  margin-top: 61rpx;
  text-align: center;
}
.payment-status .wrapper {
  border-top: 1rpx solid #eee;
  margin: 0 30rpx 0rpx 30rpx;
  padding: 30rpx 0;
  border-left: 0;
  border-right: 0;
}

.payment-status .wrapper .item {
  font-size: 28rpx;
  color: #9a9a9a;
}

.payment-status .wrapper .item ~ .item {
  margin-top: 20rpx;
}

.payment-status .wrapper .item .itemCom {
  color: #9a9a9a;
}

.page .returnBnt {
  width: 411rpx;
  height: 72rpx;
  border-radius: 36rpx;
  color: #fff;
  font-size: 30rpx;
  text-align: center;
  line-height: 72rpx;
  margin: 0 auto 20rpx auto;
}
</style>
