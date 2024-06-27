<template>
  <view class="page">
    <view class="payment-status">
      <!--失败时： 用icon-iconfontguanbi fail替换icon-duihao2 bg-color-->
      <view
        class=" icons "
        v-if="order_pay_info.paid || order_pay_info.payType == 'offline'"
      >
        <image
          class="payment-status-img"
          src="https://cshy.store/file/sysFile/wechart/pay-success.png"
        >
        </image>
      </view>
      <view class=" icons  " v-else>
        <image
          class="payment-status-img"
          src="https://cshy.store/file/sysFile/wechart/pay-fail.png"
        >
        </image>
      </view>
      <view class="pay-money">
        {{ order_pay_info.payPrice }} 元
      </view>
      <!-- 失败时：订单支付失败 -->
      <view class="status" v-if="order_pay_info.payType != 'offline'">{{
        order_pay_info.paid ? '订单支付成功' : '订单支付失败'
      }}</view>
      <view class="status" v-else>订单创建成功</view>
      <view class="wrapper">
        <!-- <view class="item acea-row  ">
          <view>订单编号：</view>
          <view class="itemCom">{{ order_pay_info.orderId }}</view>
        </view> -->
        <view class="item acea-row  ">
          <view>下单时间：</view>
          <view class="itemCom">{{
            order_pay_info.createTime ? order_pay_info.createTime : '-'
          }}</view>
        </view>
        <view class="item acea-row  ">
          <view>支付方式：</view>
          <view class="itemCom">
            {{ order_pay_info.payTypeStr }}
          </view>
          <!-- <view class='itemCom' v-if="order_pay_info.payType=='weixin'">微信支付</view>
					<view class='itemCom' v-else-if="order_pay_info.payType=='yue'">余额支付</view>
					<view class='itemCom' v-else-if="order_pay_info.payType=='offline'">线下支付</view>
					<view class='itemCom' v-else-if="order_pay_info.payType=='alipay'">支付宝支付</view>
			 -->
        </view>
        
        <!--失败时加上这个  -->
        <view
          class="item acea-row "
          v-if="order_pay_info.paid == 0 && order_pay_info.payType != 'offline'"
        >
          <view>失败原因：</view>
          <view class="itemCom">{{ status == 2 ? '取消支付' : msg }}</view>
        </view>
      </view>
     
    </view>
     <!--失败时： 重新购买 -->
     <view @tap="goOrderDetails">
        <button formType="submit" class="returnBnt bg-color" hover-class="none">
          查看订单
        </button>
      </view>
      <!-- 	<view @tap="goOrderDetails" v-if="order_pay_info.paid==0 && status==1">
				<button class='returnBnt bg-color' hover-class='none'>重新购买</button>
			</view>
			<view @tap="goOrderDetails" v-if="order_pay_info.paid==0 && status==2">
				<button class='returnBnt bg-color' hover-class='none'>重新支付</button>
			</view> -->
      <button
        @click="goPink(order_pay_info.pinkId)"
        class="returnBnt cart-color"
        formType="submit"
        hover-class="none"
        v-if="
          order_pay_info.pinkId &&
          order_pay_info.paid != 0 &&
          status != 2 &&
          status != 1
        "
      >
        邀请好友参团
      </button>
      <button
        @click="goIndex"
        class="returnBnt cart-color"
        formType="submit"
        hover-class="none"
        v-else
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
          this.getOrderPayInfo()
        }
      },
      deep: true,
    },
  },
  onLoad: function (options) {
    if (!options.order_id)
      return this.$util.Tips(
        {
          title: '缺少参数无法查看订单支付状态',
        },
        {
          tab: 3,
          url: 1,
        }
      )
      if(options.order_id){
        this.orderId =  options.order_id.split(",")[0]
       
      }

    this.status = options.status || 0
    this.msg = options.msg || ''
    if (this.isLogin) {
      this.getOrderPayInfo()
    } else {
      toLogin()
    }
  },
  methods: {
    onLoadFun: function () {
      this.getOrderPayInfo()
    },
    /**
     *
     * 支付完成查询支付状态
     *
     */
    getOrderPayInfo: function () {
      let that = this
      uni.showLoading({
        title: '正在加载中',
      })
      getOrderDetail(that.orderId)
        .then((res) => {
          uni.hideLoading()
          that.$set(that, 'order_pay_info', res.data)
          uni.setNavigationBarTitle({
            title: res.data.paid ? '支付成功' : '支付失败',
          })
        })
        .catch((err) => {
          uni.hideLoading()
        })
    },
    /**
     * 去首页关闭当前所有页面
     */
    goIndex: function (e) {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },
    // 去参团页面；
    goPink: function (id) {
      uni.navigateTo({
        url: '/pages/activity/goods_combination_status/index?id=' + id,
      })
    },
    /**
     *
     * 去订单详情页面
     */
    goOrderDetails: function (e) {
      let that = this

      uni.navigateTo({
        url:
          '/pages/users/order_list/index',
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

  .payment-status-img{
width:224rpx;
height: 177rpx;
  }
}

 

 
.payment-status .status {
  color: #E91331;
  font-weight: 400;
  text-align: center;
  font-size: 30rpx;
  margin: 18rpx 0 63rpx 0;
}
.payment-status .pay-money{
  font-size: 58rpx;
 
font-weight: 500;
color: #2B2B2B;
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
  color: #9A9A9A;
}

.payment-status .wrapper .item ~ .item {
  margin-top: 20rpx;
}

.payment-status .wrapper .item .itemCom {
  color: #9A9A9A;
}

.page .returnBnt {
  width: 411rpx;
  height: 72rpx;
  border-radius: 36rpx;
  color: #fff;
  font-size: 30rpx;
  text-align: center;
  line-height:72rpx;
  margin: 0 auto 20rpx auto;
}
</style>
