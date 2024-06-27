<template>
  <view>
    <view class="order-details">
      <view
        class="p-30 bgf" style="padding: 30rpx 30rpx 0 30rpx;"
        v-if="orderInfo.deliveryType == 'express' && orderInfo.status > 0"
      >
        <view class="content-header" style="padding-bottom: 30rpx;">
          <image
            class="header-icon"
            src="https://cshy.store/file/sysFile/wechart/gift/logistics-icon.png"
            mode="aspectFit"
            lazy-load="false"
            binderror=""
            bindload=""
          >
          </image>

          <text> 物流信息 </text>
          <view class="logistics-code" @click="goLogisticsPage">
            <text class="iconfont icon-jiantou"></text>
          </view>
        </view>
        <view class="line"></view>
      </view>
      <view v-if="orderInfo.shippingType == 2 && orderInfo.paid" class="writeOff borRadius14">
					<view class="title">核销信息</view>
					<view class="grayBg">
						<view class="pictrue">
							<!-- <div class="qrcode" ref="qrcode"></div> -->
							<!-- <canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}100%`, height: `${qrcodeSize}100%`}"/> -->
							<image :src="codeImg"></image>
						</view>
					</view>
					<view class="gear">
						<image src="https://cshy.store/file/sysFile/wechart/writeOff.jpg"></image>
					</view>
					<view class="num">{{orderInfo.verifyCode}}</view>
					<view class="rules" v-if='orderInfo.systemStore'>
						<view class="item">
							<view class="rulesTitle acea-row row-middle">
								<text class="iconfont icon-shijian"></text>核销时间
							</view>
							<view class="info">
								每日：<text class="time">{{orderInfo.systemStore.dayTime.replace(',','-')}}</text>
							</view>
						</view>
						<view class="item">
							<view class="rulesTitle acea-row row-middle">
								<text class="iconfont icon-shuoming1"></text>使用说明
							</view>
							<view class="info">可将二维码出示给店员扫描或提供数字核销码</view>
						</view>
					</view>
				</view>
				<view v-if="orderInfo.shippingType == 2" class="map acea-row row-between-wrapper borRadius14">
					<view>自提地址信息</view>
					<view class="place cart-color acea-row row-center-wrapper" @tap="showMaoLocation">
						<text class="iconfont icon-weizhi"></text>查看位置
					</view>
				</view>
				<view v-if="orderInfo.shippingType === 1" class='address borRadius14'>
					<view class='name'>{{orderInfo.realName}}<text class='phone'>{{orderInfo.userPhone}}</text></view>
					<view>{{orderInfo.userAddress}}</view>
				</view>
      <view v-if="isGoodsReturn == false">
        <view class="allAddress">
          <view class="address acea-row row-between-wrapper">
            <view class="iconfont">
              <image
                class="iconfont-img"
                src="https://cshy.store/file/sysFile/wechart/address-icon.png"
                mode="aspectFill"
                lazy-load="false"
              >
              </image>
            </view>

            <view class="addressCon">
              <view class="acea-row">
                <text class="line2">{{ orderInfo.address }}</text>
              </view>
              <view class="acea-row address-detail">{{
                orderInfo.addressDetail
              }}</view>
              <view class="name"
                >{{ orderInfo.realName }}
                <text class="phone">{{ orderInfo.userMobile }}</text>
              </view>
            </view>
          </view>
          <view class="line">
            <image src="https://cshy.store/file/sysFile/wechart/line.jpg"></image>
          </view>
        </view>
        <view class="order-info-box">
          <orderItem :item="orderInfo"></orderItem>
          <view class="remark-item">
            <view>订单备注</view>

            <view class="remark-value" style="color: #9a9a9a">
              <text> {{ orderInfo.mark || '未备注' }}</text>

              <text class="iconfont icon-jiantou"></text>
            </view>
          </view>
        </view>
      </view>

      <view class="">
        <view class="nav refund" v-if="orderInfo.refundStatus > 0">
          <view class="title">
            <image src="https://cshy.store/file/sysFile/wechart/shuoming.png" mode=""></image>
            {{
              orderInfo.refundStatus == 1
                ? '商家审核中'
                : orderInfo.refundStatus == 2
                ? '商家已退款'
                : '商家拒绝退款'
            }}
          </view>
          <view class="con pad30">{{
            orderInfo.refundStatus == 1
              ? '您已成功发起退款申请，请耐心等待商家处理；退款前请与商家协商一致，有助于更好的处理售后问题'
              : orderInfo.refundStatus == 2
              ? '退款已成功受理，如商家已寄出商品请尽快退回；感谢您的支持'
              : '拒绝原因：' + orderInfo.refundReason
          }}</view>
        </view>
        <view class="order-illustrate">
          <view class="illustrate-title">消费提醒</view>
          <view class="illustrate-content">
            如出现商品明显使用痕迹、说明书丢失、商品被洗涤等影响二次销售情形，且无质量问题的，不支持七天无理由退换货
          </view>
        </view>
        <view class="wrapper">
          <view class="item acea-row row-left">
            <view>订单编号：</view>
            <view class="conter acea-row row-middle row-right"
              >{{ orderInfo.orderId }}
            </view>
            <view
              class="copy copy-data"
              :data-clipboard-text="orderInfo.orderId"
              ><image
                src="https://cshy.store/file/sysFile/wechart/copy.png"
                class="copy-icon"
              ></image>
              <text>复制</text></view
            >
          </view>

          <view class="item acea-row row-left">
            <view>支付状态：</view>
            <view class="conter" v-if="orderInfo.paid">已支付</view>
            <view class="conter" v-else>未支付</view>
          </view>
          <view class="item acea-row row-left">
            <view>支付方式：</view>
            <view class="conter">{{ orderInfo.payTypeStr }}</view>
          </view>
          <view
            class="item acea-row row-left"
            v-if="orderInfo.status > 0 && orderInfo.deliveryType == 'express'"
          >
            <view>快递单号：</view>
            <view class="conter">{{ orderInfo.trackingNo || '' }} </view>
            <view
              class="copy copy-data"
              :data-clipboard-text="orderInfo.trackingNo"
            >
              <image src="https://cshy.store/file/sysFile/wechart/copy.png" class="copy-icon"></image>
              <text>复制</text></view
            >
          </view>
          <view class="item acea-row row-left">
            <view>下单时间：</view>
            <view class="conter">{{ orderInfo.createTime || 0 }}</view>
          </view>
          <view class="item acea-row row-left" v-if="orderInfo.status == 1">
            <view>发货时间：</view>
            <view class="conter">{{ orderInfo.orderDeliveryTime || 0 }}</view>
          </view>
        </view>
        <!-- 退款订单详情 "-->
        <view v-if="isGoodsReturn" class="wrapper borRadius14">
          <view class="item acea-row row-left">
            <view>收货人：</view>
            <view class="conter">{{ orderInfo.realName }}</view>
          </view>
          <view class="item acea-row row-left">
            <view>联系电话：</view>
            <view class="conter">{{ orderInfo.userPhone }}</view>
          </view>
          <view class="item acea-row row-left">
            <view>收货地址：</view>
            <view class="conter">{{ orderInfo.userAddress }}</view>
          </view>
        </view>

        <view class="wrapper borRadius14">
          <view class="item acea-row row-left">
            <view>商品总价：</view>
            <view class="conter">￥{{ orderInfo.proTotalPrice }}</view>
          </view>
          <view class="item acea-row row-left" v-if="orderInfo.payPostage > 0">
            <view>运费：</view>
            <view class="conter">￥{{ orderInfo.payPostage }}</view>
          </view>
          <view class="item acea-row row-left" v-if="orderInfo.couponId">
            <view>优惠券抵扣：</view>
            <view class="conter">-￥{{ orderInfo.couponPrice }}</view>
          </view>
          <view class="item acea-row row-left" v-if="orderInfo.useIntegral > 0">
            <view>积分抵扣：</view>
            <view class="conter">-￥{{ orderInfo.deductionPrice }}</view>
          </view>
          <view class="actualPay acea-row row-right"
            >实付款：<text class="money font-color"
              >￥{{ orderInfo.payPrice }}</text
            ></view
          >
        </view>
        <view style="height: 120rpx"></view>
        {{isGoodsReturn}}
        <view
          class="footer acea-row row-right row-middle"
       
        >

           
          <view
            class="bnt bg-color"
          
            @tap="confirmVerification"
            >确认核销</view
          >
           
        </view>
      </view>
    </view>
    <home></home>
 
    <payment
      :payMode="payMode"
      :pay_close="pay_close"
      @onChangeFun="onChangeFun"
      :order_id="pay_order_id"
      :totalPrice="totalPrice"
    ></payment>
  </view>
</template>

<script>
import {
  getOrderDetail,
  orderTake,
  orderDel,
  orderCancel,
  qrcodeApi,
} from '@/api/order.js'
import { openOrderRefundSubscribe } from '@/utils/SubscribeMessage.js'
import home from '@/components/home'
import payment from '@/components/payment'
import orderGoods from '@/components/orderGoods'
import ClipboardJS from '@/plugin/clipboard/clipboard.js'
import { toLogin } from '@/libs/login.js'
import { mapGetters } from 'vuex'
import orderItem from './../order_list/orderItem.vue'
// #ifdef MP
 
import uQRCode from '@/js_sdk/Sansnn-uQRCode/uqrcode.js'
// #endif
export default {
  components: {
    payment,
    home,
    orderGoods,
    orderItem,
    
  },
  data() {
    return {
      codeImg: '',
      qrcodeSize: 100,
      order_id: '',
      evaluate: 0,
      cartInfo: [], //购物车产品
      orderInfo: {
        systemStore: {},
        pstatus: {},
      }, //订单详情
      system_store: {},
      isGoodsReturn: false, //是否为退款订单
      status: {}, //订单底部按钮状态
      isClose: false,
      payMode: [
      {
          name: '积分支付',
          icon: 'icon-icon-test',
          value: 'integral',
          title: '积分:',
          payStatus: 1,
          iconImg: 'https://cshy.store/file/sysFile/wechart/pay-integral.png',
        },
        // {
        //   name: '微信支付',
        //   icon: 'icon-weixin2',
        //   value: 'weixin',
        //   title: '微信快捷支付',
        //   payStatus: 1,
        //   iconImg: 'https://cshy.store/file/sysFile/wechart/pay-wechat.png',
        // },
      ],
      pay_close: false,
      pay_order_id: '',
      totalPrice: '0',
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      id: 0, //订单id
      uniId: '',
      utils: this.$util,
      type: 'normal',
      pageTitle: '订单详情',
    }
  },
  computed: mapGetters(['isLogin', 'chatUrl', 'userInfo']),
  onLoad: function (options) {
    options.type == undefined || options.type == null
      ? (this.type = 'normal')
      : (this.type = options.type)
    if (!options.order_id && !options.uniId)
      return this.$util.Tips(
        {
          title: '缺少参数',
        },
        {
          tab: 3,
          url: 1,
        }
      )
    this.$set(this, 'order_id', options.order_id)
    if (options.status) {
      this.pageTitle = options.status
    }
    uni.$on('updateTitle', (data) => {
      uni.setNavigationBarTitle({
        title: data || this.pageTitle,
      })
    })
  },
  onShow() {
    if (this.isLogin) {
      this.getOrderInfo()
      this.payMode[0].number = this.userInfo.integral
      this.$set(this, 'payMode', this.payMode)
    } else {
      toLogin()
    }
  },
  onHide: function () {
    this.isClose = true
  },
  onReady: function () {
    // #ifdef H5
    this.$nextTick(function () {
      const clipboard = new ClipboardJS('.copy-data')
      clipboard.on('success', () => {
        this.$util.Tips({
          title: '复制成功',
        })
      })
    })
    // #endif
  },
  methods: {
    confirmVerification(){

    },
    evaluateTap() {
      uni.navigateTo({
        url:
          '/pages/users/goods_comment_con/index?unique=' +
          this.orderInfo.orderInfoList[0].attrId +
          '&orderId=' +
          this.order_id +
          '&id=' +
          this.orderInfo.id,
      })
    },
    kefuClick() {
      location.href = this.chatUrlchatUrl
    },
    goGoodCall() {
      let self = this
      uni.navigateTo({
        url: `/pages/customer_list/index?orderId=${self.order_id}`,
      })
    },
    openSubcribe: function (e) {
      let page = e
      uni.showLoading({
        title: '正在加载',
      })
      openOrderRefundSubscribe()
        .then((res) => {
          uni.hideLoading()
          uni.navigateTo({
            url: page,
          })
        })
        .catch(() => {
          uni.hideLoading()
        })
    },
    /**
     * 事件回调
     *
     */
    onChangeFun: function (e) {
      let opt = e
      let action = opt.action || null
      let value = opt.value != undefined ? opt.value : null
      action && this[action] && this[action](value)
    },

    /**
     * 打开地图
     *
     */
    showMaoLocation: function () {
      if (!this.system_store.latitude || !this.system_store.longitude)
        return this.$util.Tips({
          title: '缺少经纬度信息无法查看地图！',
        })
      uni.openLocation({
        latitude: parseFloat(this.system_store.latitude),
        longitude: parseFloat(this.system_store.longitude),
        scale: 8,
        name: this.system_store.name,
        address: this.system_store.address + this.system_store.detailedAddress,
        success: function () {},
      })
    },
    /**
     * 关闭支付组件
     *
     */
    payClose: function () {
      this.pay_close = false
    },
    // 联系客服
    callPhone() {
      this.$util.makePhoneCall()
    },
    /**
     * 打开支付组件
     *
     */
    pay_open: function () {
      this.pay_close = true
      this.pay_order_id = this.orderInfo.orderId
      this.totalPrice = this.orderInfo.payPrice
    },
    /**
     * 支付成功回调
     *
     */
    pay_complete: function () {
      this.pay_close = false
      this.pay_order_id = ''
      this.getOrderInfo()
    },
    /**
     * 支付失败回调
     *
     */
    pay_fail: function () {
      this.pay_close = false
      this.pay_order_id = ''
    },
    /**
     * 登录授权回调
     *
     */
    onLoadFun: function () {
      this.getOrderInfo()
    },
    // 查看物流
    goLogisticsPage() {
      // let address = encodeURIComponent(JSON.stringify(this.addressInfo))
      uni.navigateTo({
        url: `/pages/gift/gift_logistics?trackingNo=${this.orderInfo.trackingNo}&userMobile=${this.orderInfo.userMobile}`,
      })
    },
    /**
     * 获取订单详细信息
     *
     */
    getOrderInfo: function () {
      let that = this
      uni.showLoading({
        title: '正在加载中',
      })
      getOrderDetail(that.order_id)
        .then((res) => {
          uni.hideLoading()
          that.pageTitle = 'sceshi'
          that.$set(that, 'orderInfo', res.data)
          that.$set(that, 'evaluate', res.data.status == 2 ? 2 : 0)
          that.$set(that, 'system_store', res.data.systemStore)
          that.$set(that, 'id', res.data.id)
          that.$set(that, 'cartInfo', res.data.orderInfoList)
          uni.$emit('updateTitle', res.data.orderStatusMsg)

          if (res.data.refundStatus != 0) {
            that.isGoodsReturn = true
          }
          if (that.orderInfo.shippingType == 2 && that.orderInfo.paid)
            that.markCode(res.data.verifyCode)
          if (that.orderInfo.refundStatus > 0) {
            uni.setNavigationBarColor({
              frontColor: '#ffffff',
              backgroundColor: '#666666',
            })
          }
        })
        .catch((err) => {
          uni.hideLoading()
          that.$util.Tips(
            {
              title: err,
            },
            '/pages/users/order_list/index'
          )
        })
    },
    /**
     *
     * 生成二维码
     */
    markCode(text) {
      qrcodeApi({
        height: '145',
        text: text,
        width: '145',
      }).then((res) => {
        this.codeImg = res.data.code
      })
    },
    /**
     *
     * 剪切订单号
     */
    // #ifndef H5
    copy: function () {
      let that = this
      uni.setClipboardData({
        data: this.orderInfo.orderId,
      })
    },
    // #endif

    /**
     * 设置底部按钮
     *
     */
    getOrderStatus: function () {
      let orderInfo = this.orderInfo || {},
        _status = orderInfo.pstatus || {
          type: 0,
        },
        status = {}
      let type = parseInt(_status.type),
        delivery_type = orderInfo.deliveryType,
        seckill_id = orderInfo.seckillId ? parseInt(orderInfo.seckillId) : 0,
        bargain_id = orderInfo.bargainId ? parseInt(orderInfo.bargainId) : 0,
        combination_id = orderInfo.combinationId
          ? parseInt(orderInfo.combinationId)
          : 0
      status = {
        type: type == 9 ? -9 : type,
        class_status: 0,
      }
      if (type == 1 && combination_id > 0) status.class_status = 1 //查看拼团
      if (type == 2 && delivery_type == 'express') status.class_status = 2 //查看物流
      if (type == 2) status.class_status = 3 //确认收货
      if (type == 4 || type == 0) status.class_status = 4 //删除订单
      if (
        !seckill_id &&
        !bargain_id &&
        !combination_id &&
        (type == 3 || type == 4)
      )
        status.class_status = 5 //再次购买
      this.$set(this, 'status', status)
    },
    /**
     * 去拼团详情
     *
     */
    goJoinPink: function () {
      uni.navigateTo({
        url:
          '/pages/activity/goods_combination_status/index?id=' +
          this.orderInfo.pinkId,
      })
    },
    /**
     * 再此购买
     *
     */
    goOrderConfirm: function () {
      this.$Order.getPreOrder('again', [
        {
          orderNo: this.order_id,
        },
      ])
    },
    confirmOrder: function () {
      let that = this
      uni.showModal({
        title: '确认收货',
        content: '为保障权益，请收到货确认无误后，再确认收货',
        success: function (res) {
          if (res.confirm) {
            orderTake(that.id)
              .then((res) => {
                return that.$util.Tips(
                  {
                    title: '操作成功',
                    icon: 'success',
                  },
                  function () {
                    that.getOrderInfo()
                  }
                )
              })
              .catch((err) => {
                return that.$util.Tips({
                  title: err,
                })
              })
          }
        },
      })
    },
    /**
     *
     * 删除订单
     */
    delOrder: function () {
      let that = this
      orderDel(this.id)
        .then((res) => {
          return that.$util.Tips(
            {
              title: '删除成功',
              icon: 'success',
            },
            {
              tab: 3,
              url: 1,
            }
          )
        })
        .catch((err) => {
          return that.$util.Tips({
            title: err,
          })
        })
    },
    cancelOrder() {
      let self = this
      uni.showModal({
        title: '提示',
        content: '确认取消该订单?',
        success: function (res) {
          if (res.confirm) {
            orderCancel(self.orderInfo.id)
              .then((data) => {
                self.$util.Tips(
                  {
                    title: '取消成功',
                  },
                  {
                    tab: 3,
                  }
                )
              })
              .catch(() => {
                self.$util.Tips({
                  title: err,
                })
                self.getDetail()
              })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        },
      })
    },
  },
}
</script>
<style scoped lang="scss">
.p-30 {
  padding: 30rpx;
}
.bgf {
  background: #fff;
}
.content-header {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 42rpx;
  .header-icon {
    width: 44rpx;
    height: 44rpx;
    margin-right: 10rpx;
  }
  .logistics-code {
    margin-left: auto;
    color: rgb(154, 154, 154);
  }
  .header-icon-right {
    width: 17rpx;
    height: 30rpx;
    margin-left: auto;
  }
  .remarks {
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 40rpx;
    margin-left: auto;
  }
}
.order-illustrate {
  margin-top: 20rpx;
  background: #fff;
  font-size: 28rpx;
  padding: 30rpx;
  font-weight: 400;
  color: #9a9a9a;
  .illustrate-title {
    font-size: 30rpx;
    margin-bottom: 18rpx;
  }
}
.order-info-box {
  margin-top: 15rpx;
  background: #fff;
  padding: 30rpx;
  /deep/ .text {
    flex: 1;
    margin-left: 20rpx;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .remark-item {
    padding-top: 28rpx;
    display: flex;
    justify-content: space-between;
    .remark-value {
      max-width: 500rpx;
    }
  }
}
.allAddress {
  width: 100%;
  .line {
    width: 100%;
    height: 3rpx;
    image {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  .iconfont-img {
    width: 48rpx;
    height: 48rpx;
    margin-right: 18rpx;
  }
  .nav {
    width: 690rpx;
    margin: 0 auto;
    .item {
      width: 334rpx;
    }
    .item.on {
      position: relative;
      width: 230rpx;
    }
  }
  .addressCon {
    width: 596rpx;
    font-size: 28rpx;
    color: #666666;
    .acea-row {
      margin-bottom: 10rpx;
    }
    .address-detail {
      color: #333333;
      font-size: 30rpx;
      font-weight: 500;
    }
    .name {
    }
    .name .phone {
      margin-left: 50rpx;
    }
  }
}
.shuoming {
  width: 32rpx;
  height: 32rpx;
}
.goodCall {
  color: $theme-color;
  text-align: center;
  width: 100%;
  height: 86rpx;
  padding: 0 30rpx;
  border-bottom: 1rpx solid #eee;
  font-size: 30rpx;
  line-height: 86rpx;
  background: #fff;

  .icon-kefu {
    font-size: 36rpx;
    margin-right: 15rpx;
  }

  /* #ifdef MP */
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 86rpx;
    font-size: 30rpx;
    color: $theme-color;
  }

  /* #endif */
}

.order-details .header {
  background: #fff;
}

.order-details .header.on {
  background-color: #666 !important;
}

.order-details .header .pictrue {
  width: 110rpx;
  height: 110rpx;
}

.order-details .header .pictrue image {
  width: 100%;
  height: 100%;
}

.order-details .header .data {
  margin-left: 30rpx;
  margin-right: 30rpx;
  font-size: 30rpx;
  border-bottom: 2rpx solid #eeeeee;
}

.order-details .header .data.on {
  margin-left: 0;
}

.order-details .header .data .state {
  margin-left: 60rpx;
  font-weight: 500;
  color: #333333;
  margin-bottom: 7rpx;
  padding-bottom: 30rpx;
  padding-top: 30rpx;
}

.order-details .header .data .time {
  margin-left: 20rpx;
}

.picTxt {
  // height: 150rpx;
}

.order-details .nav {
  background-color: #fff;
  font-size: 26rpx;
  color: #282828;
  padding: 27rpx 0;
  width: 100%;
  border-radius: 14rpx;
  margin: -100rpx auto 0 auto;
}

.order-details .nav .navCon {
  padding: 0 40rpx;
}

.order-details .nav .on {
  color: $theme-color;
}

.order-details .nav .progress {
  padding: 0 65rpx;
  margin-top: 10rpx;
}

.order-details .nav .progress .line {
  width: 100rpx;
  height: 2rpx;
  background-color: #939390;
}

.order-details .nav .progress .iconfont {
  font-size: 25rpx;
  color: #939390;
  margin-top: -2rpx;
}

.order-details .address {
  font-size: 26rpx;
  color: #868686;
  background-color: #fff;

  padding: 30rpx 24rpx;
}

.order-details .address .name {
  font-size: 30rpx;
  color: #282828;
}

.order-details .address .name .phone {
  margin-left: 40rpx;
}

.order-details .line {
  width: 100%;
  height: 3rpx;background: #EEEEEE;
}

.order-details .line image {
  width: 100%;
  height: 100%;
  display: block;
}

.order-details .wrapper {
  background-color: #fff;
  margin-top: 12rpx;
  padding: 30rpx 24rpx;
}

.order-details .wrapper .item {
  font-size: 28rpx;
  color: #9a9a9a;
}

.order-details .wrapper .item ~ .item {
  margin-top: 20rpx;
}

.order-details .wrapper .item .conter {
  color: #868686;
  // width: 490rpx;
  text-align: right;
}

.order-details .wrapper .item .copy {
  font-size: 28rpx;
  color: #666666;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  .copy-icon {
    width: 34rpx;
    height: 34rpx;
    margin-right: 10rpx;
  }
}

.order-details .wrapper .actualPay {
  border-top: 1rpx solid #eee;
  margin-top: 30rpx;
  padding-top: 30rpx;
}

.order-details .wrapper .actualPay .money {
  font-weight: bold;
  font-size: 30rpx;
}

.order-details .footer {
  width: 100%;
  height: 100rpx;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
  padding: 0 30rpx;
  box-sizing: border-box;
}

.order-details .footer .bnt {
  text-align: center;
  line-height: 69rpx;

  color: #fff;
  font-size: 27rpx;

  width: 189rpx;
  height: 69rpx;
  border-radius: 14rpx;
}

.order-details .footer .bnt.cancel {
  color: #666666;
  border: 2rpx solid #e5e5e5;
}

.order-details .footer .bnt ~ .bnt {
  margin-left: 18rpx;
}

.order-details .writeOff {
  background-color: #fff;
  margin-top: 15rpx;
  padding-bottom: 50rpx;
}

.order-details .writeOff .title {
  font-size: 30rpx;
  color: #282828;
  height: 87rpx;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 24rpx;
  line-height: 87rpx;
}

.order-details .writeOff .grayBg {
  background-color: #f2f5f7;
  width: 590rpx;
  height: 384rpx;
  border-radius: 20rpx 20rpx 0 0;
  margin: 50rpx auto 0 auto;
  padding-top: 55rpx;
}

.order-details .writeOff .grayBg .pictrue {
  width: 290rpx;
  height: 290rpx;
  margin: 0 auto;
}

.order-details .writeOff .grayBg .pictrue image {
  width: 100%;
  height: 100%;
  display: block;
}

.order-details .writeOff .gear {
  width: 590rpx;
  height: 30rpx;
  margin: 0 auto;
}

.order-details .writeOff .gear image {
  width: 100%;
  height: 100%;
  display: block;
}

.order-details .writeOff .num {
  background-color: #f0c34c;
  width: 590rpx;
  height: 84rpx;
  color: #282828;
  font-size: 48rpx;
  margin: 0 auto;
  border-radius: 0 0 20rpx 20rpx;
  text-align: center;
  padding-top: 4rpx;
}

.order-details .writeOff .rules {
  margin: 46rpx 30rpx 0 30rpx;
  border-top: 1px solid #f0f0f0;
  padding-top: 10rpx;
}

.order-details .writeOff .rules .item {
  margin-top: 20rpx;
}

.order-details .writeOff .rules .item .rulesTitle {
  font-size: 28rpx;
  color: #282828;
}

.order-details .writeOff .rules .item .rulesTitle .iconfont {
  font-size: 30rpx;
  color: #333;
  margin-right: 8rpx;
  margin-top: 5rpx;
}

.order-details .writeOff .rules .item .info {
  font-size: 28rpx;
  color: #999;
  margin-top: 7rpx;
}

.order-details .writeOff .rules .item .info .time {
  margin-left: 20rpx;
}

.order-details .map {
  height: 86rpx;
  font-size: 30rpx;
  color: #282828;
  line-height: 86rpx;
  border-bottom: 1px solid #f0f0f0;
  margin-top: 15rpx;
  background-color: #fff;
  padding: 0 24rpx;
}

.order-details .map .place {
  font-size: 26rpx;
  width: 176rpx;
  height: 50rpx;
  border-radius: 25rpx;
  line-height: 50rpx;
  text-align: center;
}

.order-details .map .place .iconfont {
  font-size: 27rpx;
  height: 27rpx;
  line-height: 27rpx;
  margin: 2rpx 3rpx 0 0;
}

.order-details .address .name .iconfont {
  font-size: 34rpx;
  margin-left: 10rpx;
}

.refund {
  padding: 0 !important;
  margin-top: 15rpx;
  background-color: #fff;

  .title {
    display: flex;
    align-items: center;
    font-size: 30rpx;
    color: #333;
    height: 86rpx;
    border-bottom: 1px solid #f5f5f5;
    font-weight: 400;
    padding: 0 24rpx;

    image {
      width: 32rpx;
      height: 32rpx;
      margin-right: 10rpx;
    }
  }

  .con {
    font-size: 25rpx;
    color: #666666;
    padding: 30rpx 24rpx;
  }
}
</style>

<style>
.qs-btn {
  width: auto;
  height: 60rpx;
  text-align: center;
  line-height: 60rpx;
  border-radius: 50rpx;
  color: #fff;
  font-size: 27rpx;
  padding: 0 3%;
  color: #aaa;
  border: 1px solid #ddd;
  margin-right: 20rpx;
}
</style>
