<template>
  <view>
    <view class="order-tab">
      <!-- <van-tabs
        v-model="activeTab"
        sticky
        @change="changeTab($event)"
        line-width="18rpx"
        title-active-color="#FD3C84"
      >
        <van-tab v-for="(item, index) in orderTab" :title="item.name">
        </van-tab> </van-tabs
    > -->
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
    <view class="return-list" v-if="orderList.length">
      <view class="goodWrapper" v-for="(item, index) in orderList" :key="index">
        <view
          @click="goOrderDetails(item.orderId)"
          class="item acea-row row-between-wrapper"
          v-for="(items, index) in item.orderInfoList"
          :key="index"
        >
          <view class="pictrue">
            <image :src="items.image"></image>
          </view>
          <view class="text">
            <view class="acea-row row-between-wrapper">
              <view class="name line1">{{ items.storeName }}</view>
              <!-- <view
                class="num"
                v-if="item.refundStatus == 1 || item.refundStatus == 3"
                >商家处理中</view
              >
              <view class="num" v-if="item.refundStatus == 2">已退款</view> -->
              <view class="num"> {{ item.orderStatus }}</view>
            </view>
            <view class="attr line1">{{ items.sku }}x{{ items.cartNum }}</view>
            <view class="attr line1" v-if="items.refundNum>0&&item.refundStatus>0">退款数量{{ items.refundNum }} </view>
            <!-- <view class='attr line1' v-else>{{items.storeName}}</view> -->
            <!-- <view class='money'>￥{{items.price}}</view> -->
          </view>
        </view>
        <view class="totalSum">
          <view> 实付{{ item.payPrice }}元 </view>
          <view>
            退款金额<text class="font-color price"
              >{{ item.refundPrice }}元</text
            >
          </view>
        </view>
        <view class="return-footer acea-row row-right">
          <view
            class="return-btn-item"
            @click="revokeOrder(item)"
            v-if="item.refundStatus == 1 || item.refundStatus == 3"
          >
            撤销售后
          </view>
          <view @click="goOrderDetails(item.orderId)"
            class="return-btn-item bg-color"
            v-if="item.refundStatus == 4"
          >
            去处理
          </view>
          <view @click="goOrderDetails(item.orderId)" class="return-btn-item" v-if="[1,2,3,4,5,6,7].includes(item.refundStatus)">
            售后详情
          </view>
          <view
            class="return-btn-item"
            @click="goReturnMoney(item.orderId, item)"
            v-if="item.refundStatus == 2"
          >
            钱款去向
          </view>
        </view>
      </view>
    </view>
    <view
      class="loadingicon acea-row row-center-wrapper"
      v-if="orderList.length"
    >
      <text
        class="loading iconfont icon-jiazai"
        :hidden="loading == false"
      ></text
      >{{ loadTitle }}
    </view>
    <view v-if="orderList.length == 0">
      <emptyPage title="暂无订单~"></emptyPage>
    </view>
   
    <home></home>
  </view>
</template>

<script>
import home from '@/components/home'
import emptyPage from '@/components/emptyPage.vue'
import { getOrderList, refundRevoke } from '@/api/order.js'
import { toLogin } from '@/libs/login.js'
import { mapGetters } from 'vuex'
 
export default {
  components: {
    emptyPage,
    home,
 
  },
  data() {
    return {
      loading: false,
      loadend: false,
      loadTitle: '加载更多', //提示语
      orderList: [], //订单数组
      orderStatus: -3, //订单状态
      page: 1,
      limit: 20,
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      activeTab: 0,
      orderTab: [
        {
          name: '全部',
          orderStatus: '-3',
        },
        {
          name: '待处理',
          orderStatus: '-4',
        },
      ],
    }
  },
  computed: mapGetters(['isLogin']),
  watch: {
    isLogin: {
      handler: function (newV, oldV) {
        if (newV) {
          this.getOrderList()
        }
      },
      deep: true,
    },
  },
  onLoad() {
  
  },
  onShow(){
    if (this.isLogin) {
      this.getOrderList()
    } else {
      toLogin()
    }
  
    uni.$on('updateData',(data)=>{
    
      this.loadend=false
      this.loading=false
      this.page=1
      this.orderList=[]
      this.getOrderList()
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getOrderList()
  },
  methods: {
   
    // 撤销售后
    revokeOrder(item) {
      let that = this
      uni.showModal({
        title: '撤销售后',
        content: '为保障您的权益，请确认是否撤销售后？',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          if (res.confirm) {
            refundRevoke({ orderId: item.orderId })
              .then((res) => {
                that.loadend=false
                that.loading=false
                that.page = 1
                that.orderList=[]
                that.getOrderList()
             
                return that.$util.Tips({
                  title: '操作成功',
                  icon: 'success',
                })
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
    changeTab(e) {
      this.orderStatus = this.orderTab[e].orderStatus
      this.loadend = false
      this.page = 1
      this.$set(this, 'orderList', [])

      this.getOrderList()
    },
    onLoadFun() {
      this.getOrderList()
    },
    // 授权关闭
    authColse: function (e) {
      this.isShowAuth = e
    },
    /**
     * 去订单详情
     */
    goOrderDetails: function (order_id) {
      if (!order_id)
        return that.$util.Tips({
          title: '缺少订单号无法查看订单详情',
        })
      uni.navigateTo({
        url:
          '/pages/users/user_return_list/detail?order_id=' +
          order_id +
          '&isReturen=1',
      })
    },

    /**
     * 获取订单列表
     */
    getOrderList: function () {
     

      let that = this
      if (that.loadend) return
      if (that.loading) return
      that.loading = true
      that.loadTitle = ''
      uni.showLoading({
        title: '加载中',
      })
      getOrderList({
        type: that.orderStatus + '',
        page: that.page,
        limit: that.limit,
      })
        .then((res) => {
          let list = res.data.list || []
          let loadend = list.length < that.limit
    
          that.$set(that, 'orderList', list.concat(that.orderList))  
          that.loadend = loadend
          that.loading = false
          that.loadTitle = loadend ? '我也是有底线的' : '加载更多'
          that.page = that.page + 1
        })
        .catch((err) => {
          that.loading = false
          that.loadTitle = '加载更多'
        }).finally(e=>{
          uni.hideLoading()
        }) 
        
      
    },
  },
}
</script>

<style lang="scss" scoped>
.order-tab {
  border-bottom: 2rpx solid #eeeeee;
  /deep/ .van-tab {
    font-size: 30rpx;
    flex: initial;
    width: 150rpx;
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
.return-list .goodWrapper {
  background-color: #fff;
  margin-bottom: 20rpx;
  position: relative;
  padding: 0rpx 30rpx;
}

.return-list .goodWrapper .orderNum {
  border-bottom: 1px solid #eee;
  height: 87rpx;
  line-height: 87rpx;
  font-size: 30rpx;
  color: #333333;
}
.return-list .goodWrapper .name {
  flex: 1;
}
.return-list .goodWrapper .item {
  border-bottom: 0;
}

.return-list .goodWrapper .totalSum {
  padding: 0 0rpx 20rpx 0rpx;
  text-align: right;
  font-size: 30rpx;
  border-bottom: 2rpx solid #eeeeee;
  color: #2b2b2b;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.return-list .goodWrapper .totalSum .price {
  font-size: 28rpx;
  font-weight: bold;
}

.return-list .goodWrapper .iconfont {
  position: absolute;
  font-size: 109rpx;
  top: 7rpx;
  right: 22rpx;
  color: #ccc;
}

.return-list .goodWrapper .iconfont.powder {
  color: #f8c1bd;
}
.return-footer {
  padding: 15rpx 0;
  .return-btn-item {
    width: 158rpx;
    height: 58rpx;
    border-radius: 10rpx;
    border: 2rpx solid #e5e5e5;
    font-size: 28rpx;

    font-weight: 400;
    color: #666666;
    margin-left: 20rpx;
    text-align: center;
    line-height: 58rpx;
  }
  .bg-color {
    color: #fff;
  }
}
</style>
