<template>
  <view>
    <view class="order-details">
      <view class="order-return-steps bgf">
        <template v-for="(item, index) in stepsOptions"  v-if="orderInfo.refundStatus !=6&&orderInfo.refundStatus!=7"  >
          <view class="step-line" v-if="index > 0" :key="item.id"> </view>
          <view     class="step-text" :class="{ 'step-text-active': returnActive == index }">{{ item.label }}
          </view>
        </template>
      </view>
      <view class="processing-box bgf p-30 border-top" v-if="orderInfo.refundStatus == 1">
        <view class="processing-tip">
          <view class="processing-tip-left"> 商家处理中 </view>
          <view class="acea-row row-middle">
            <image class="processing-tip-icon" src="https://cshy.store/file/sysFile/wechart/gift/tel-icon.png"
              mode="aspectFit" lazy-load="false" binderror="" bindload="">
            </image>
            联系客服
          </view>
        </view>
        <view class="processing-info">
          亲亲，商家正在积极为你处理，请您耐心等候，处理结果，我们会以短信的方式通知您
        </view>
      </view>
      <view class="processing-box bgf p-30 border-top" v-if="orderInfo.refundStatus == 7||orderInfo.refundStatus == 6">
        <view class="processing-tip">
          <view class="processing-tip-left"> 商家拒绝 </view>
          <view class="acea-row row-middle">
            <image class="processing-tip-icon" src="https://cshy.store/file/sysFile/wechart/gift/tel-icon.png"
              mode="aspectFit" lazy-load="false" binderror="" bindload="">
            </image>
            联系客服
          </view>
        </view>
        
      </view>
      <view class="processing-box bgf p-30 border-top" v-if="orderInfo.refundStatus == 4">
        <view class="processing-tip">
          <view class="processing-tip-left"> 请退回商品 </view>
          <view class="acea-row row-middle">
            <image class="processing-tip-icon" src="https://cshy.store/file/sysFile/wechart/gift/tel-icon.png"
              mode="aspectFit" lazy-load="false" binderror="" bindload="">
            </image>
            联系客服
          </view>
        </view>
        <view class="processing-info-tip">
          请在<text class="color-font">7天内</text>填写快递单号
        </view>
        <view class="processing-info">
          请您自行联系快递公司退回，需填写快递单号；请不要邮寄到付
        </view>
      </view>
      <view class="processing-box bgf p-30 border-top" v-if="[2, 3].includes(orderInfo.refundStatus)">
        <view class="processing-tip">
          <view class="processing-tip-left"> {{ orderInfo.refundStatus == 2 ? '退款成功' : '退款中' }} </view>
          <view class="acea-row row-middle" @click="callPhone">
            <image class="processing-tip-icon" src="https://cshy.store/file/sysFile/wechart/gift/tel-icon.png"
              mode="aspectFit" lazy-load="false" binderror="" bindload="">
            </image>
            联系客服
          </view>
        </view>
        <view class="refundStatus-success">
          <template v-if="orderInfo.refundPrice>0" >
          <text class="money" >{{ orderInfo.refundPrice }}元</text> {{ orderInfo.refundStatus == 2 ? '已' : '即将' }} 退到微信中
        </template>
        <template v-if="orderInfo.backIntegral>0" >
          <text class="money" v-if="orderInfo.backIntegral>0" >{{ orderInfo.backIntegral }}积分</text> {{ orderInfo.refundStatus == 2 ? '已' : '即将' }} 退到积分中
       </template>
        </view>
      </view>
      <view class="p-30 bgf m-t-20" v-if="!orderInfo.trackingNo&&orderInfo.shippingType==1">
        <view class="content-header">
          <text> 商家未发货 </text>
          <view class="logistics-code">
            <text>物流信息暂未更新</text>
          </view>
        </view>
      </view>
      <view class="p-30 bgf m-t-20" v-if="orderInfo.shippingType==2">
        <view class="content-header">
          <text> 核销码 </text>
          <view class="logistics-code">
            <text>{{orderInfo.verifyCode}}</text>
          </view>
        </view>
      </view>
      <view class="business-address-box" v-if="[4, 5].includes(orderInfo.refundStatus)">
        <view class="content-header">
          <text> 商家地址 </text>

          <view class="copy copy-data" @click="copyAddress">
            <image class="copy-icon" src="https://cshy.store/file/sysFile/wechart/copy.png"></image>
            <text>复制</text>
          </view>
        </view>
        <view class="business-address-content">
          <image class="address-icon" src="https://cshy.store/file/sysFile/wechart/address-icon.png" mode="aspectFill"
            lazy-load="false">
          </image>
          <view class="business-address-text">
            <view class="business-address-name">
              {{ orderInfo.returnName }} {{ orderInfo.returnMobile }}
            </view>
            <view>
              {{ orderInfo.returnAddress }}
            </view>
          </view>
        </view>
      </view>
      <view class="p-30 bgf m-t-20" v-if="orderInfo.trackingNo && orderInfo.refundStatus != 4">
        <view class="content-header">
          <text> 商家已发货 </text>
          <view class="logistics-code" @click="goLogisticsPage">
            <text>查看物流</text>
            <text class="iconfont icon-jiantou"></text>
          </view>
        </view>
      </view>
      <view class="p-30 bgf border-top">
        <view class="content-header">
          <text> 协商留言信息 </text>
          <view class="logistics-code" @click="goOperation">
            <text>查看记录</text>
            <text class="iconfont icon-jiantou"></text>
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
            <view class="conter acea-row row-middle row-right">{{ orderInfo.orderId }}
            </view>
            <view class="copy copy-data" :data-clipboard-text="orderInfo.orderId">
              <image src="https://cshy.store/file/sysFile/wechart/copy.png" class="copy-icon"></image>
              <text>复制</text>
            </view>
          </view>

          <view class="item acea-row row-left">
            <view>申请金额：</view>
            <view class="conter">{{ orderInfo.refundPrice }}</view>
          </view>
          <view class="item acea-row row-left">
            <view>退款原因：</view>
            <view class="conter">{{ orderInfo.refundReasonWap||'' }}</view>
          </view>
          <view class="item acea-row row-left">
            <view>收货状态：</view>
            <view class="conter">
              {{
                orderInfo.refundReceivingStatus == 0 ? '未收货' : '已收货'
              }}</view>
          </view>
          <view class="item acea-row row-left">
            <view>申请时间：</view>
            <view class="conter">{{ orderInfo.refundReasonTime||'' }}</view>
          </view>
          <view class="item acea-row row-left">
            <view>商品总价：</view>
            <view class="conter">¥{{ orderInfo.proTotalPrice }}</view>
          </view>
          <view class="item acea-row row-left" v-if="orderInfo.payPostage>0">
            <view>运费：</view>
            <view class="conter">¥{{ orderInfo.payPostage }}</view>
          </view>
          <view class="item acea-row row-left" v-if="orderInfo.deductionPostage>0">
            <view>运费减免：</view>
            <view class="conter">-¥{{ orderInfo.deductionPostage }}</view>
          </view>
          <view class="item acea-row row-left" v-if="orderInfo.couponId">
            <view>优惠券抵扣：</view>
            <view class="conter">-¥{{ orderInfo.couponPrice }}</view>
          </view>
          <view class="item acea-row row-left" v-if="orderInfo.deductionPrice">
            <view>积分抵扣：</view>
            <view class="conter">-¥{{ orderInfo.deductionPrice }}</view>
          </view>
          <view class="item acea-row row-left">
            <view>实付款：</view>
            <view class="conter">¥{{ orderInfo.payPrice }}</view>
          </view>
          
        </view>

        <view style="height: 120rpx"></view>
        <template v-if="orderInfo.id">


          <view class="footer acea-row row-right row-middle" v-if="isGoodsReturn == false">
            <view class="qs-btn" v-if="!orderInfo.paid" @click.stop="cancelOrder">取消订单</view>
            <view @click="callPhone" class="bnt cancel">联系客服 </view>
            <view class="bnt bg-color" v-if="!orderInfo.paid" @tap="pay_open(orderInfo.orderId)">立即付款</view>
            <view class="bnt bg-color" v-if="orderInfo.status == 2" @tap="evaluateTap()">评价</view>

            <navigator hover-class="none" :url="'/pages/users/goods_return/list?orderId=' + orderInfo.orderId"
              class="bnt cancel" v-else-if="
                orderInfo.paid === true &&
               ( orderInfo.refundStatus === 0||orderInfo.refundStatus === 6||orderInfo.refundStatus === 7) &&
                orderInfo.type !== 1 &&
                type === 'normal'
              ">申请退款
            </navigator>

            <view class="bnt bg-color" v-if="orderInfo.combinationId > 0" @tap="goJoinPink">查看拼团</view>

            <view class="bnt bg-color" v-if="orderInfo.status == 1" @tap="confirmOrder">确认收货</view>
            <view class="bnt cancel" v-if="orderInfo.status == 3" @tap="delOrder">删除订单</view>
            <view class="bnt bg-color" v-if="orderInfo.status == 3 && orderInfo.type !== 1" @tap="goOrderConfirm">再次购买
            </view>
          </view>
          <view v-else class="footer acea-row row-right row-middle">
            <view class="bnt cancel" v-if="[1, 4].includes(orderInfo.refundStatus)" @tap="revokeOrder">撤销售后</view>
            <view class="bnt cancel" v-if="[2].includes(orderInfo.refundStatus)"
              @tap="goReturnMoney(orderInfo.orderId, orderInfo)">钱款去向</view>
            <view class="bnt bg-color" v-if="orderInfo.refundStatus == 4" @tap="goOrderReturnLogistics">我已退回，填写物流单号
            </view>
          </view>
        </template>
      </view>
    </view>
    <home></home>
 
    <payment :payMode="payMode" :pay_close="pay_close" @onChangeFun="onChangeFun" :order_id="pay_order_id"
      :totalPrice="totalPrice"></payment>
  </view>
</template>

<script>
import {
  getOrderDetail,
  orderTake,
  orderDel,
  orderCancel,
  qrcodeApi, refundRevoke
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
          label: '退款中',
        },
        {
          value: 3,
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
          label: '退款中',
        },
        {
          value: 4,
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
    // 钱款去向
    // 钱款去项
    goReturnMoney(order_id, item) {
      if (!order_id)
        return that.$util.Tips({
          title: '缺少订单号无法查看订单',
        })

      uni.navigateTo({
        url:
          '/pages/users/user_return_list/returnMoney?order_id=' +
          order_id +
          '&status=' +
          item.orderStatus,
      })
    },
    // 撤销售后
    revokeOrder() {
      let that = this
      uni.showModal({
        title: '撤销售后',
        content: '为保障您的权益，请确认是否撤销售后？',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            refundRevoke({ orderId: that.orderInfo.orderId })
              .then((res) => {
                uni.$emit('updateData',{data:1});      
                           
    

                return that.$util.Tips(
                  {
                    title: '操作成功',
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
          }
        },
      })
    },
    copyAddress() {
      let businessAddress = `${this.orderInfo.returnName} ${this.orderInfo.returnMobile} ${this.orderInfo.returnAddress}`
      this.copyData(businessAddress)
    },
    copyData(data) {
      uni.setClipboardData({
        data,
        success: () => {
          this.$util.Tips({
            title: '复制成功',
          })
        },
      })
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
     * 拨打电话
     */
    makePhone: function () {
      this.$util.makePhoneCall()
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
        success: function () { },
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
    goOperation() {
      uni.navigateTo({
        url: `/pages/users/goods_return/negotiationRecord?order_id=${this.orderInfo.id}`,
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
          that.$set(that, 'orderInfo', res.data)
          that.$set(that, 'evaluate', res.data.status == 2 ? 2 : 0)
          that.$set(that, 'system_store', res.data.systemStore)
          that.$set(that, 'id', res.data.id)
          uni.$emit('updateTitle', res.data.orderStatusMsg)

          that.$set(that, 'cartInfo', res.data.orderInfoList)
          if ([1,2,3,4,5].includes( res.data.refundStatus)) {
            that.isGoodsReturn = true
          }
          // refundType  0 退款 1 退货退款
          // refundStatus   0 未退款 1 申请中 2 已退款 3 退款中 4 退货待发货 5 退货已发货 6 退货退款被拒绝 7 退款被拒绝
          //退货
          if (res.data.refundType == 0) {
            that.stepsOptions = that.returnTypeArr
            // 申请退款中
            if (res.data.refundStatus == 1) {
              that.returnActive = 1
            }
            // 退款中
            if (res.data.refundStatus == 2) {
              that.returnActive = 2
            }
            // 退款成功
            if (res.data.refundStatus == 3) {
              that.returnActive = 3
            }
          } else {
            // 退款退货
            that.stepsOptions = that.returnGoodsTypeArr
            //  申请中
            if (res.data.refundStatus == 1) {
              that.returnActive = 0
            }
            // 退货待发货
            if (res.data.refundStatus == 4) {
              that.returnActive = 1
            }
            // 退货已发货
            if (res.data.refundStatus == 5) {
              that.returnActive = 2
            }
            // 退款中
            if (res.data.refundStatus == 3) {
              that.returnActive = 3
            }
            // 2 已退款
            if (res.data.refundStatus == 2) {
              that.returnActive = 4
            }
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
     * 打电话
     */
    goTel: function () {
      uni.makePhoneCall({
        phoneNumber: this.orderInfo.deliveryId,
      })
    },
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
    goOrderReturnLogistics() {
       
      uni.navigateTo({
        url:
          '/pages/users/goods_return/trackingNumber?orderId=' +
          this.orderInfo.orderId,
      })
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
.color-font {
  color: #e91331;
}

.business-address-box {
  margin-top: 20rpx;

  .content-header {
    border-bottom: 2rpx solid #eeeeee;
    padding: 28rpx 30rpx;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30rpx;
    color: #333333;

    .copy-data {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28rpx;

      color: #666666;
    }
  }

  .copy-icon {
    width: 34rpx;
    height: 34rpx;
    margin-right: 10rpx;
  }

  .business-address-content {
    padding: 30rpx;
    background-color: #ffffff;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .address-icon {
      width: 48rpx;
      height: 48rpx;
      margin-right: 30rpx;
    }

    .business-address-text {
      font-size: 28rpx;

      color: #666666;
      line-height: 40rpx;

      .business-address-name {
        margin-bottom: 20rpx;
        font-size: 30rpx;

        font-weight: 500;
        color: #333333;
      }
    }
  }
}

.refundStatus-success {
  font-size: 28rpx;

  color: #75bb44;
  margin-top: 30rpx;

  .money {
    font-size: 44rpx;

    font-weight: 500;
    color: #e91331;
    margin-right: 10rpx;
  }
}

.order-return-steps {
  padding: 30rpx;
  font-size: 30rpx;
  color: #2b2b2b;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .step-text-active {
    font-size: 30rpx;

    font-weight: 500;
    color: $base-color-1;
  }

  .step-line {
    min-width: 10rpx;
    heihth: 1rpx;
    flex: 1;
    border-top: 2rpx dashed #bfbfbf;
    margin: 0 9rpx;
  }

  .step-text {}
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
    height: 163rpx;
    background: #f4f4f4;
    padding: 30rpx 30rpx 30rpx 30rpx;
    margin-top: 10rpx;
    border-radius: 20rpx;
  }

  .processing-info-tip {
    margin: 20rpx 0;
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
      flex: 1;
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

    .name {}

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

.order-details .wrapper .item~.item {
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
  padding: 0 15rpx;
  min-width: 189rpx;
  height: 69rpx;
  border-radius: 14rpx;
}

.order-details .footer .bnt.cancel {
  color: #666666;
  border: 2rpx solid #e5e5e5;
}

.order-details .footer .bnt~.bnt {
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
