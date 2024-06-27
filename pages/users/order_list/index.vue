<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-25 10:08:18
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-06-10 11:29:10
 * @FilePath: \cshy-h5\pages\users\order_list\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="my-order">
      <!-- 订单 -->
      <view class="serch-wrapper">
        <view class="serch-box flex">
          <input
            class="input"
            type="text"
            :value="searchValue"
            placeholder="输入想搜索的订单"
            @input="setValue"
            :focus="focus"
            @focus="onFocusEvent"
            @blur="focus = false"
            @confirm="searchBut"
          />
          <view class="search-text" @tap="searchBut">搜索</view>
        </view>
        <view class="date-picker" @click="openDatePicker">
          <view>筛选</view>
          <image
            class="date-picker-icon"
            :src="('https://cshy.store/file/sysFile/wechart/seach-1.png')"
            mode=""
          ></image>
        </view>
      </view>
      <view class="order-tab">
    
        <v-tabs
        @change="changeTab($event)"
          bgColor="#f5f5f5"
          :scroll="false"
          activeColor="#FD3C84"
          lineHeight="4rpx"
          :lineScale="0.2"
          lineRadius="10rpx"
          field="name"
          lineColor="#FD3C84"
          v-model="activeTab"
          :tabs="orderTab"
        ></v-tabs>
      </view>
   
      <view class="list">
        <view class="item" v-for="(item, index) in orderList" :key="item.id">
          
          <view @click="goOrderDetails(item.orderId, item)">
            <orderItem
              :item="item"
              :showorderStatus="true"
              :isGoProd="false"
            ></orderItem>
          </view>
          <view class="bottom acea-row row-right row-middle">
            <!--  -->

            <template v-if="item.refundStatus == 0">
              <template v-if="item.status == 1">

                <zb-popover placement="bottom-start"
                 :options="actions"
                 ref="Popover1"
                 @handleClick="handleClick"
                 @select="selectClick($event,item)"
                 class="item-popover">
                 <view class="more" style="margin-right: 40rpx"> 更多</view>
                 </zb-popover>


           
              </template>
              <view
                class="bnt cancelBnt"
                v-if="!item.paid&&item.status != 4"
                @click="cancelOrder(index, item.id)"
                >取消订单</view
              >

              <view class="bnt" v-if="item.status == 0" @click="callPhone"
                >联系客服</view
              >
              <view
                class="bnt bg-color color-fff"
                v-if="!item.paid&&item.status != 4"
                @click="goPay(item.payPrice, item.orderId)"
                >立即付款
              </view>
              <view
                class="bnt"
                v-if="[0, 1,2].includes(item.status) && item.paid"
                @click="
                  goPage(
                    `/pages/users/goods_return/list?orderId=${item.orderId}`
                  )
                "
                >申请退款</view
              >
              <view
                class="bnt"
                v-if="item.status == 1"
                @click="
                  goPage(
                    `/pages/gift/gift_logistics?trackingNo=${item.trackingNo}&userMobile=${item.userMobile}`
                  )
                "
                >查看物流</view
              >
              <view
                class="bnt"
                v-if="item.status == 1"
                @click="confirmOrder(item.id, item)"
                >确认收货</view
              >

              <view
                class="bnt bg-color color-fff"
                v-if="item.status == 2"
                @click="
                  goPage(
                    `/pages/users/goods_comment_con/index?unique=${item.orderInfoList[0].attrId}&orderId=${item.orderId}&id=${item.id}`
                  )
                "
                >去评价</view
              >
              <view
                class="bnt cancelBnt"
                v-if="item.status == 3"
                @click="delOrder(item.id, index)"
                >删除订单</view
              >
            </template>

            <template v-if="item.refundStatus > 0">
              <view
                class="bnt"
                v-if="item.refundStatus > 0"
                @click="goOrderDetails(item.orderId, item)"
                >售后详情</view
              >
              <view
                class="bnt border-color"
                v-if="item.refundStatus == 2"
                @click="goReturnMoney(item.orderId, item)"
              >
                钱款去向</view
              >
            </template>
          </view>
          <view
            class="evaluate-box"
            v-if="item.status == 2"
            @click="
              goPage(
                `/pages/users/goods_comment_con/index?unique=${item.orderInfoList[0].attrId}&orderId=${item.orderId}&id=${item.id}`
              )
            "
          >
            <view> 商品好不好，评价一下吧 </view>
            <view class="right-star">
              <text
                v-for="(itemn, indexn) in 5"
                :key="indexn"
                class="iconfont icon-kongxinxing"
              ></text>
            </view>
          </view>
          <!-- <view class='bottom acea-row row-right row-middle'>
						<view class='bnt cancelBnt' v-if="item.status?item.status.type==0:0 || item.status?item.status.type == 9:0" @click='cancelOrder(index,item.id)'>取消订单</view>
						<view class='bnt bg-color' v-if="item.status?item.status.type == 0:0" @click='goPay(item.payPrice,item.orderId)'>立即付款</view>
						<view class='bnt bg-color' v-else-if="item.status?item.status.type == 1:0 || item.status?item.status.type == 9:0" @click='goOrderDetails(item.orderId)'>查看详情</view>
						<view class='bnt bg-color' v-else-if="item.status?item.status.type == 2:0 && item.status.deliveryType" @click='goOrderDetails(item.orderId)'>查看详情</view>
						<view class='bnt bg-color' v-else-if="item.status?item.status.type == 3:0" @click='goOrderDetails(item.orderId)'>去评价</view>
						<view class='bnt bg-color' v-else-if="item.storeOrder.seckillId < 1 && item.storeOrder.bargainId < 1 && item.storeOrder.combinationId < 1 && item.status?item.status.type == 4:0"
						 @click='goOrderDetails(item.orderId)'>再次购买</view>
						<view class='bnt cancelBnt' v-if="item.status?item.status.type == 4:0" @click='delOrder(item.id,index)'>删除订单</view>
					</view> -->
        </view>
      </view>
      <view
        class="loadingicon acea-row row-center-wrapper"
        v-if="orderList.length > 0"
      >
        <text
          class="loading iconfont icon-jiazai"
          :hidden="loading == false"
        ></text
        >{{ loadTitle }}
      </view>
      <view v-if="orderList.length == 0">
        <emptyPage
          title="您还没有相关订单~"
          :img="('https://cshy.store/file/sysFile/wechart/noOrder.png')"
        ></emptyPage>
      </view>
    </view>
    <!-- <view class="noCart" v-if="orderList.length == 0 && page > 1">
      <view class="pictrue">
        <image src="https://cshy.store/file/sysFile/wechart/noOrder.png"></image>
      </view>
    </view> -->

    <home></home>
    <payment
      :payMode="payMode"
      :pay_close="pay_close"
      @onChangeFun="onChangeFun"
      :order_id="pay_order_id"
      :totalPrice="totalPrice"
    ></payment>

    <uni-popup
      background-color="#fff"
      ref="popupDate"
      type="bottom"
      border-radius="10px 10px 0 0"
      :style="{ height: '50%' }"
    >
      <!-- <van-popup v-model="dateModelShow" closeable position="bottom" round :style="{ height: '60%' }"> -->
      <view class="pop-model">
        <view class="pop-title"> 自定义时间 </view>
        <view class="pop-content">
          <uni-datetime-picker ref="datetimePicker"
            v-model="range"
            type="daterange"
            @change="maskClick"
          />
          <!-- <view class="pop-content-box">
            <view @click="openCalendar('left')" class="pop-content-box-item">
              <view v-if="!sDate"> 开始时间 </view>
              <view v-else>
                {{ sDate }}
              </view>
            </view>
            <view class="pop-line"> </view>
            <view @click="openCalendar('right')" class="pop-content-box-item">
              <view v-if="!eDate"> 结束时间 </view>
              <view v-else>
                {{ eDate }}
              </view>
            </view>
          </view> -->
        </view>
        <view class="pop-search-footer">
          <view class="pop-search clear" @click="clearDate"> 清空日期 </view>
          <view class="pop-search search" @click="searchDate"> 查询 </view>
        </view>
      </view>

      <!-- </van-popup> -->
      <!-- </van-popup> -->
    </uni-popup>

    <uni-popup
      background-color="#fff"
      ref="popup"
      type="bottom"
      border-radius="10px 10px 0 0"
      :style="{ height: '50%' }"
    >
      ksksks
      <!-- <van-popup v-model="showCalendar" position="bottom" round :style="{ height: '50%' }"> -->
      <!-- <van-datetime-picker v-model="calendarDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate"
        @confirm="onConfirm" @cancel='cancelPop' /> -->
      <!-- </van-popup> -->
    </uni-popup>
  </view>
</template>

<script>
import {
  getOrderList,
  orderData,
  orderCancel,
  orderDel,
  orderTake,
} from '@/api/order.js'
import { openOrderSubscribe } from '@/utils/SubscribeMessage.js'
import home from '@/components/home'
import payment from '@/components/payment'
import { toLogin } from '@/libs/login.js'
import { mapGetters } from 'vuex'
 
import emptyPage from '@/components/emptyPage.vue'
import orderItem from './orderItem.vue'
export default {
  components: {
    payment,
    home,
    emptyPage,
    
    orderItem,
  },
  data() {
    return {
      loading: false, //是否加载中
      loadend: false, //是否加载完毕
      loadTitle: '加载更多', //提示语
      orderList: [], //订单数组
      orderData: {}, //订单详细统计
      orderStatus: null, //订单状态
      page: 1,
      limit: 20,
      payMode: [
        // {
        //   name: '积分支付',
        //   icon: 'icon-icon-test',
        //   value: 'integral',
        //   title: '积分:',
        //   payStatus: 1,
        //   iconImg: 'https://cshy.store/file/sysFile/wechart/pay-integral.png',
        // },
        {
          name: '微信支付',
          icon: 'icon-weixin2',
          value: 'weixin',
          title: '微信快捷支付',
          disabled:false,
          iconImg: 'https://cshy.store/file/sysFile/wechart/pay-wechat.png',
     },
      ],
      pay_close: false,
      pay_order_id: '',
      totalPrice: '0',
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      activeTab: null,
      orderTab: [
        {
          name: '全部',
          orderStatus: null,
        },
        {
          name: '待付款',
          orderStatus: 0,
        },
        {
          name: '待发货',
          orderStatus: 1,
        },
        {
          name: '待收货',
          orderStatus: 2,
        },
        {
          name: '待评价',
          orderStatus: 3,
        },
      ],
      searchValue: '',
      focus: false,
      showPopover: false,
      // 通过 actions 属性来定义菜单选项
      actions: [{ text: '再次购买' }, { text: '联系客服' }],
      dateModelShow: false,
      sDate: '',
      eDate: '',
      showCalendar: false,
      openType: '',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      calendarDate: new Date(),
      range: [null, null],
     
    }
  },
  computed: mapGetters(['isLogin', 'userInfo']),
  onShow() {
    if (this.isLogin) {
      this.loadend = false
      this.page = 1
      this.$set(this, 'orderList', [])
      this.getOrderData()
      this.getOrderList()
      this.payMode[0].number = this.userInfo.integral
      this.$set(this, 'payMode', this.payMode)
    } else {
      toLogin()
    }
  },
  methods: {
    handleClick(e){
      
    },
    selectClick(e,item){
 if(e.text=='再次购买'){
  this.goPage(
                          `/pages/goods/goods_details/index?id=${item.orderInfoList[0].productId}`
                        )
 }
 if(e.text=='联系客服'){
  this.callPhone()
 }
    },
    maskClick(e) {
      this.sDate = e[0]
      this.eDate = e[1]
      // console.log('maskClick事件:', e);
    },
    clearDate() {
      // this.sDate = '',
      //   this.eDate = ''
      this.$refs.datetimePicker.clear()
      // this.range = [null, null]
    },
    searchDate() {
      this.dateModelShow = false
      this.loadend = false
      this.page = 1
      this.$set(this, 'orderList', [])

      this.$refs.popupDate.close()
      this.getOrderList()
    },
    openDatePicker() {
      this.$refs.popupDate.open('bottom')
    },
    openCalendar(type) {
      this.openType = type
      // this.showCalendar = true
      this.$refs.popup.open('bottom')
    },
    cancelPop() {
      this.$refs.popup.close()
      // this.showCalendar = false
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },
    onConfirm(date) {
      if (this.openType == 'left') {
        this.sDate = this.formatDate(date)
      } else {
        this.eDate = this.formatDate(date)
      }
      this.showCalendar = false
    },
    confirmOrder(orderId, item) {
      let that = this
      uni.showModal({
        title: '确认收货',
        content: '为保障权益，请收到货确认无误后，再确认收货',
        success: function (res) {
          if (res.confirm) {
            orderTake(orderId)
              .then((res) => {
                uni.showModal({
                title: '操作成功',
                content: '赶快去评价吧',
                showCancel:false,
                success: function (res) {
                  if (res.confirm) {
                    that.goPage(
                                  `/pages/users/goods_comment_con/index?unique=${item.orderInfoList[0].attrId}&orderId=${item.orderId}&id=${item.id}`
                                )
                  } else if (res.cancel) {
                    that.loadend=false
              that.loading=false
              that.page=1
              that.orderList=[]
            
              that.getOrderList()
                  }
                }
              });
               
               
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
    goPage(url) {
      uni.navigateTo({
        url: url,
      })
    },
    callPhone() {
      this.$util.makePhoneCall()
    },
  
    searchBut: function () {
      let that = this
      that.focus = false
      if (that.searchValue.length > 0) {
        that.page = 1
        that.loadend = false
        that.$set(that, 'orderList', [])
        uni.showLoading({
          title: '正在搜索中',
        })
        that.getOrderList()
        uni.hideLoading()
      } else {
        return this.$util.Tips({
          title: '请输入要搜索的订单',
          icon: 'none',
          duration: 1000,
          mask: true,
        })
      }
    },
    onFocusEvent() {
      this.focus = true
    },
    setValue: function (event) {
      this.$set(this, 'searchValue', event.detail.value)
    },
    changeTab(e) {
      this.orderStatus = this.orderTab[e].orderStatus
      this.loadend = false
      this.page = 1
      this.$set(this, 'orderList', [])

      this.getOrderList()
    },
    onLoadFun() {
      this.getOrderData()
      this.getOrderList()
    },
    // 授权关闭
    authColse: function (e) {
      this.isShowAuth = e
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
     * 关闭支付组件
     *
     */
    payClose: function () {
      this.pay_close = false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      if (options.status) {
        this.orderStatus = options.status
        this.activeTab = Number(options.status) + 1
      }
    },
    /**
     * 获取订单统计数据
     *
     */
    getOrderData: function () {
      let that = this
      orderData().then((res) => {
        that.$set(that, 'orderData', res.data)
      })
    },
    /**
     * 取消订单
     *
     */
    cancelOrder: function (index, order_id) {
      let that = this
      if (!order_id)
        return that.$util.Tips({
          title: '缺少订单号无法取消订单',
        })
      uni.showLoading({
        title: '操作',
      })
      orderCancel(order_id)
        .then((res) => {
          uni.hideLoading()
          return that.$util.Tips(
            {
              title: '操作成功',
              icon: 'success',
            },
            function () {
              that.loadend=false
              that.loading=false
              that.page=1
              that.orderList=[]
            
              that.getOrderList()
            }
          )
        })
        .catch((err) => {
          return that.$util.Tips({
            title: err,
          })
        })
    },

    /**
     * 打开支付组件
     *
     */
    goPay(pay_price, order_id) {
      this.$set(this, 'pay_close', true)
      this.$set(this, 'pay_order_id', order_id)
      this.$set(this, 'totalPrice', pay_price)
    },
    /**
     * 支付成功回调
     *
     */
    pay_complete: function () {
      this.loadend = false
      this.page = 1
      this.$set(this, 'orderList', [])
      this.$set(this, 'pay_close', false)
      this.getOrderData()
      this.getOrderList()
    },
    /**
     * 支付失败回调
     *
     */
    pay_fail: function () {
      this.pay_close = false
    },
    /**
     * 去订单详情
     */
    goOrderDetails: function (order_id, item) {
      if (!order_id)
        return that.$util.Tips({
          title: '缺少订单号无法查看订单详情',
        })
      if (item.refundStatus > 0) {
        uni.navigateTo({
          url: '/pages/users/user_return_list/detail?order_id=' + order_id,
        })
      } else {
        uni.navigateTo({
          url: '/pages/users/order_details/index?order_id=' + order_id,
        })
      }
    },
    // 钱款去项
    goReturnMoney(order_id, item) {
      if (!order_id)
        return that.$util.Tips({
          title: '缺少订单号无法查看订单',
        })

      uni.navigateTo({
        url: '/pages/users/user_return_list/returnMoney?order_id=' + order_id,
      })
    },
    /**
     * 切换类型
     */
    statusClick: function (status) {
      if (status == this.orderStatus) return
      this.orderStatus = status
      this.loadend = false
      this.page = 1
      this.$set(this, 'orderList', [])
      this.getOrderList()
    },
    /**
     * 获取订单列表
     */
    getOrderList: function () {
       
      let that = this
      if (that.loadend) return
      if (that.loading) return
      that.loading = true
      that.loadTitle = '加载更多'
      uni.showLoading({
        title: '加载中',
      })
     
      getOrderList({
        type: that.orderStatus == null ? null : that.orderStatus + '',
        page: that.page,
        limit: that.limit,
        condition: this.searchValue,
        startDate: this.sDate,
        endDate: this.eDate,
      })
        .then((res) => {
      
          let list = res.data.list || []
          let loadend = list.length < that.limit
          that.orderList = that.$util.SplitArray(list, that.orderList)
       
           that.$nextTick(() => {
            that.$set(that, 'orderList', that.orderList)
           })
      
        
          that.$forceUpdate()
          that.loadend = loadend
          that.loading = false
          that.loadTitle = loadend ? '我也是有底线的' : '加载更多'
          that.page = that.page + 1
        })
        .catch((err) => {
          that.loading = false
          that.loadTitle = '加载更多'
        })
        .finally(() => {
          uni.hideLoading()
        })
    },

    /**
     * 删除订单
     */
    delOrder: function (order_id, index) {
      let that = this
      orderDel(order_id)
        .then((res) => {
          that.loadend=false
              that.loading=false
              that.page=1
              that.orderList=[]
            
              that.getOrderList()
          return that.$util.Tips({
            title: '删除成功',
            icon: 'success',
          })
        })
        .catch((err) => {
          return that.$util.Tips({
            title: err,
          })
        })
    },
  },
  onReachBottom: function () {
    this.getOrderList()
  },
}
</script>

<style scoped lang="scss">
/deep/ .uni-popup {
  z-index: 999999;
}
/deep/ .v-tabs__container-line {
  top: 58rpx;
}

.pop-model {
  .pop-title {
    text-align: center;
    margin: 60rpx auto;
    font-size: 32rpx;
  }

  .pop-content {
    .pop-content-box {
      display: flex;
      justify-content: space-between;
      padding: 30rpx;
      align-items: center;

      .pop-content-box-item {
        width: 300rpx;
        height: 80rpx;

        border-radius: 30rpx;
        border: 1px solid #f1f1f1;
        padding: 0rpx 30px;
        text-align: center;
        line-height: 80rpx;
      }

      .pop-line {
        width: 50rpx;
        height: 2rpx;
        background: #343434;
      }
    }
  }

  .pop-search-footer {
    margin: 0 auto;
    margin-top: 60rpx;
    text-align: center;
    line-height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;

    .pop-search {
      width: 690rpx;
      height: 80rpx;
      border-radius: 40rpx;
      border: 1px solid #f1f1f1;
      margin-bottom: 20rpx;
    }

    .search {
      color: #fff;
      background: $bg-gradient;

      margin-left: 30rpx;
    }
  }
}

.pop-action {
  padding: 0 23rpx;

  .pop-action-item {
    padding: 17rpx 0;
    font-size: 28rpx;
    border-bottom: 2rpx solid #eeeeee;

    color: #9a9a9a;
  }

  .pop-action-item:last-child {
    border-bottom: none;
  }
}

.order-tab {
  /deep/ .van-tab {
    font-size: 30rpx;

    color: #2b2b2b;
  }

  /deep/ .van-tab--active {
    font-weight: 500;
  }

  /deep/ .van-tabs__line {
    background: $bg-gradient;
    border-radius: 10rpx;
    bottom: 40rpx;
  }
}

.font-color-status {
  color: #fa6400;
}

.my-order .header {
  height: 250rpx;
  padding: 0 30rpx;
}

.my-order .header .picTxt {
  height: 190rpx;
}

.my-order .header .picTxt .text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 26rpx;
  font-family: 'Guildford Pro';
}

.my-order .header .picTxt .text .name {
  font-size: 34rpx;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20rpx;
}

.my-order .header .picTxt .pictrue {
  width: 122rpx;
  height: 109rpx;
}

.my-order .header .picTxt .pictrue image {
  width: 100%;
  height: 100%;
}

.my-order .nav {
  background-color: #fff;
  width: 690rpx;
  height: 140rpx;
  border-radius: 14rpx;
  margin: -60rpx auto 0 auto;
}

.my-order .nav .item {
  text-align: center;
  font-size: 26rpx;
  color: #282828;
  padding: 26rpx 0;
}

.my-order .nav .item.on {
  // font-weight: bold;
  // border-bottom: 5rpx solid #e93323;
  /* #ifdef H5 || MP */
  font-weight: bold;
  /* #endif */
  border-bottom: 5rpx solid $theme-color;
}

.my-order .nav .item .num {
  margin-top: 18rpx;
}

.my-order .list {
  width: 750rpx;
  margin-bottom: 20rpx;  
  padding-bottom: env(safe-area-inset-bottom);
}

.my-order .list .item {
  background-color: #fff;
  margin-bottom: 20rpx;
  padding: 30rpx 30rpx 16rpx 30rpx;

  .evaluate-box {
    padding: 9rpx 10rpx;
    background: #f4f4f4;
    border-radius: 10rpx;
    font-size: 26rpx;

    color: #9a9a9a;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .right-star {
      color: #bfbfbf;
      font-size: 24rpx;

      .icon-kongxinxing {
        margin-left: 10rpx;
      }
    }
  }
}

.my-order .list .item .title {
  height: 84rpx;
  padding: 0 24rpx;
  border-bottom: 1rpx solid #eee;
  font-size: 28rpx;
  color: #282828;
}

.my-order .list .item .title .sign {
  font-size: 24rpx;
  padding: 0 13rpx;
  height: 36rpx;
  margin-right: 15rpx;
  border-radius: 18rpx;
}

.my-order .list .item .bottom {
  height: 107rpx;

  /deep/ .van-popover__wrapper {
    margin-right: auto;
    position: relative;
  }

  /deep/ .van-popover {
    left: 10rpx !important;
    top: 50rpx !important;
    width: 158rpx !important;
  }

  // padding: 0 30rpx;
}

.my-order .list .item .bottom {
  .bnt {
    width: 158rpx;
    height: 58rpx;
    text-align: center;
    line-height: 58rpx;

    border-radius: 10rpx;
    font-size: 28rpx;
    color: #666666;
    border: 2rpx solid #e5e5e5;
  }

  .color-fff {
    color: #fff;
  }

  .border-color {
    border: 2rpx solid #e91331;
    color: #e91331;
  }
}

.my-order .list .item .bottom .bnt.cancelBnt {
  border: 1rpx solid #ddd;
  color: #aaa;
}

.my-order .list .item .bottom .bnt ~ .bnt {
  margin-left: 17rpx;
}

.noCart {
  margin-top: 171rpx;
  padding-top: 0.1rpx;
}

.noCart .pictrue {
  width: 414rpx;
  height: 336rpx;
  margin: 78rpx auto 56rpx auto;
}

.noCart .pictrue image {
  width: 100%;
  height: 100%;
}

.serch-wrapper {
  padding-top: 20rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30rpx;

  .serch-box {
    border: 3rpx solid #ff879f;
    background: #ffffff;
    border-radius: 33rpx;
    width: 546rpx;
    height: 66rpx;
    position: relative;
  }

  .date-picker {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30rpx;

    color: #2b2b2b;

    .date-picker-icon {
      width: 44rpx;
      height: 44rpx;
    }
  }

  .logo {
    margin-top: 10rpx;
    margin-left: 24rpx;
    margin-right: 19upx;
  }

  image {
    width: 57upx;
    height: 46upx;
  }

  .input {
    display: flex;
    align-items: center;
    width: 546rpx;
    height: 66rpx;
    padding: 0 0 0 30rpx;
    padding-left: 0;
    color: #9a9a9a;
    font-size: 28rpx;
    text-indent: 30rpx;
    padding-left: 30px;
    .iconfont {
      margin-right: 20rpx;
      font-size: 26rpx;
      color: #666666;
    }
  }

  .search-text {
    width: 108rpx;
    height: 62rpx;
    background: $bg-gradient;
    border-radius: 30rpx;
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: 60rpx;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0rpx;
  }
}
</style>
