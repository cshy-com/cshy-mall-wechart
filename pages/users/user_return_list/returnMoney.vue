<template>
  <view>
    <view class="order-details">
      <view class="processing-box bgf p-30">
        <view class="processing-tip">
          <view class="processing-tip-left"> 退款金额 </view>
          <view class=" acea-row row-middle">
            <image
              class="processing-tip-icon"
              src="https://cshy.store/file/sysFile/wechart/gift/tel-icon.png"
              mode="aspectFit"
              lazy-load="false"
              binderror=""
              bindload=""
            >
            </image>
            <text> 联系客服 </text>
          </view>
        </view>
        <view class="processing-info">
          <view class="processing-info-money"> {{orderInfo.refundPrice}}元 </view>
          <view class="processing-info-status"> 到账成功 </view>
        </view>
      </view>
      <image
        class="page-line-img"
        src="https://cshy.store/file/sysFile/wechart/address-bg.png"
      ></image>
      <view class="p-30 bgf">
        <view class="content-header">
          <text> 支付渠道 </text>
          <view class="logistics-code">
            <text>积分</text>
          </view>
        </view>
      </view>
      <view class="p-30 bgf border-top">
        <view class="content-header">
          <text> 退款账户 </text>
          <view class="logistics-code">
            <text>积分</text>
          </view>
        </view>
      </view>

      <view>
        <view class="order-info-box">
          <orderItem :item="orderInfo" :showTotalPrice="false"></orderItem>
        </view>
      </view>

      <view class="">
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
            <view>申请金额：</view>
            <view class="conter">{{ orderInfo.refundPrice }}</view>
          </view>
          <view class="item acea-row row-left">
            <view>退款原因：</view>
            <view class="conter">{{ orderInfo.refundReasonWap }}</view>
          </view>
          <view class="item acea-row row-left">
            <view>收货状态：</view>
            <view class="conter">
              {{
                orderInfo.refundReceivingStatus == 0 ? '未收货' : '已收货'
              }}</view
            >
          </view>
          <view class="item acea-row row-left">
            <view>申请时间：</view>
            <view class="conter">{{ orderInfo.refundReasonTime }}</view>
          </view>
        </view>

        <view style="height: 120rpx"></view>
      </view>
    </view>
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
import orderItem from './../../users/order_list/orderItem.vue'
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
          icon: ('https://cshy.store/file/sysFile/wechart/pay-type1.png'),
          value: 'integral',
          title: '积分',
          number: 0,
        },
        {
          name: '微信支付',
          icon: ('https://cshy.store/file/sysFile/wechart/pay-type2.png'),
          value: 'weixin',
          title: '微信快捷支付',
        },
        // {
        //   name: '余额支付',
        //   icon: 'icon-yuezhifu',
        //   value: 'yue',
        //   title: '可用余额:',
        //   number: 0,
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
      returnTypeArr: [
        {
          value: 0,
          label: '申请退款',
        },
        {
          value: 1,
          label: '商家处理',
        },
        {
          value: 2,
          label: '退款成功',
        },
      ],
      returnGoodsTypeArr: [
        {
          value: 0,
          label: '商家处理',
        },
        {
          value: 1,
          label: '寄回商品',
        },
        {
          value: 2,
          label: '商家收货',
        },
        {
          value: 3,
          label: '退款成功',
        },
      ],
      returnActive: null,
      stepsOptions: [],
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
      uni.setNavigationBarTitle({
        title: options.status || this.pageTitle,
      })
    }
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
          that.$set(that, 'orderInfo', res.data)
          that.$set(that, 'evaluate', res.data.status == 2 ? 2 : 0)
          that.$set(that, 'system_store', res.data.systemStore)
          that.$set(that, 'id', res.data.id)
          that.$set(that, 'cartInfo', res.data.orderInfoList)
          if (res.data.refundStatus != 0) {
            that.isGoodsReturn = true
          }
          //退货
          if (res.data.refundType == 0) {
            that.stepsOptions = that.returnTypeArr
            if (res.data.refundStatus == 2) {
              that.returnActive = 2
            }
          } else {
            that.stepsOptions = that.returnGoodsTypeArr
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
.page-line-img {
  width: 750rpx;
  height: 6rpx;
  position: relative;
  top: -20rpx;
}
.processing-box {
  font-size: 30rpx;

  color: #666666;
  .processing-tip {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #2b2b2b;
    .processing-tip-left {
      font-size: 44rpx;

      font-weight: 500;
      color: #2b2b2b;
    }
    .processing-tip-icon {
      width: 34rpx;
      height: 34rpx;
      margin-right: 10rpx;
    }
  }
  .processing-info {
    margin-top: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .processing-info-money {
      font-size: 44rpx;

      font-weight: 500;
      color: #e91331;
    }
    .processing-info-status {
      font-size: 30rpx;

      color: #75bb44;
    }
  }
}

.p-30 {
  padding: 30rpx;
}
.m-t-20 {
  margin-top: 20rpx;
}
.bgf {
  background: #fff;
}
.border-top {
  border-top: 2rpx solid #eeeeee;
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
    .name {
      width: 100%;
    }
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
  margin-top: 15rpx;
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
  height: 3rpx;
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
