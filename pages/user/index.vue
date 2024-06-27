<template>
  <view class="new-users copy-data" :style="{ height: pageHeight }">
    <view class="mid" style="flex: 1; overflow: hidden">
      <scroll-view scroll-y="true" style="height: 100%">
        <view class="bg"></view>
        <view class="head pad30">
          <view class="user-card">
            <view class="user-info">
              <image
                class="avatar"
                :src="userInfo.avatar"
                v-if="userInfo.avatar && uid"
                @click="goEdit()"
              ></image>
              <image
                v-else
                class="avatar"
                src="https://cshy.store/file/sysFile/wechart/user/def-avater.png"
                mode=""
                @click="goEdit()"
              ></image>
              <view class="info">
                <view
                  class="name"
                  v-if="!uid"
                  @tap="openAuto"
                  style="margin-top: 28rpx"
                >
                  登录/注册
                </view>
                <view class="name" v-if="uid">
                  Hi，{{ userInfo.nickname }}
                </view>
                <view
                  class="num"
                  v-if="userInfo.phone && uid"
                  @click="goEdit()"
                >
                  <view class="num-txt">{{ userInfo.phone }}</view>
                  <!-- <view class="icon">
										<image src="https://cshy.store/file/sysFile/wechart/edit.png" mode=""></image>
									</view> -->
                </view>
                <view
                  class="phone"
                  v-if="!userInfo.phone && isLogin"
                  @tap="bindPhone"
                  >绑定手机号</view
                >
              </view>
              <view
                @click="goEdit()"
                class="user-info-edit"
                v-if="userInfo.phone && uid"
              >
                <text> 个人资料</text>
                <text class="iconfont icon-xiangyou"></text>
              </view>
            </view>
            <view class="num-wrapper">
              <!-- <view
                class="num-item"
                @click="goMenuPage('/pages/users/user_money/index')"
              >
                <text class="num">{{
                  userInfo.nowMoney && uid
                    ? Number(userInfo.nowMoney).toFixed(2)
                    : 0
                }}</text>
                <view class="txt">余额</view>
              </view> -->
              <view
                class="num-item"
                @click="goMenuPage('/pages/users/user_coupon/index')"
              >
                <text class="num"
                  >{{ userInfo.couponCount && uid ? userInfo.couponCount : 0 }}
                  <!-- <text class="num-tag"> 10 </text> -->
                </text>
                <view class="txt">优惠券</view>
              </view>
              <view
                class="num-item"
                @click="goMenuPage('/pages/users/user_integral/index')"
              >
                <text class="num">{{
                  userInfo.integral && uid ? userInfo.integral : 0
                }}</text>
                <view class="txt">积分</view>
              </view>
              <!-- <view
                class="num-item"
                @click="goMenuPage('/pages/users/order_list/giftList')"
              >
                <text class="num">0</text>
                <view class="txt">我的兑换</view>
              </view> -->
              <view
                class="num-item"
                @click="goMenuPage('/pages/users/user_goods_collection/index')"
              >
                <text class="num">{{
                  userInfo.collectCount && uid ? userInfo.collectCount : 0
                }}</text>
                <view class="txt">收藏</view>
              </view>
            </view>
            <!-- <view class="sign" @click="goSignIn">签到</view> -->
          </view>
          <view class="user-box-bg"></view>
          <view class="order-wrapper">
            <view class="order-hd flex">
              <view class="left">我的订单</view>
              <navigator
                class="right flex"
                hover-class="none"
                url="/pages/users/order_list/index"
                open-type="navigate"
              >
                全部订单
                <text class="iconfont icon-xiangyou"></text>
              </navigator>
            </view>
            <view class="order-bd">
      
              <block v-for="(item, index) in orderMenu" :key="index">
                <navigator
                  class="order-item"
                  hover-class="none"
                  :url="item.url"
                >
                  <view class="pic">
                    <image :src="item.img" mode=""></image>

                    <text class="order-status-num" v-if="item.num > 0">{{
                      item.num
                    }}</text>
                  </view>
                  <view class="txt">{{ item.title }}</view>
                </navigator>
              </block>
            </view>
          </view>

          <image
            class="order-bg"
            :src="'https://cshy.store/file/sysFile/wechart/user/order-bg.png'"
            mode=""
          ></image>
        </view>
        <view class="contenBox">
          <!-- 轮播 -->
          <view class="slider-wrapper" v-if="imgUrls.length > 0">
            <swiper
              indicator-dots="true"
              :autoplay="autoplay"
              :circular="circular"
              :interval="interval"
              :duration="duration"
              indicator-color="rgba(255,255,255,0.6)"
              indicator-active-color="#fff"
            >
              <block v-for="(item, index) in imgUrls" :key="index">
                <swiper-item class="borRadius14">
                  <image
                    :src="item.pic"
                    class="slide-image"
                    @click="navito(item.url)"
                  ></image>
                </swiper-item>
              </block>
            </swiper>
          </view>

          <!-- 会员菜单 -->
          <view class="user-menus">
            <view class="menu-title">我的服务</view>
            <view class="list-box">
              <block v-for="(item, index) in MyMenus" :key="index">
                <navigator
                  class="item"
                  :url="item.url"
                  hover-class="none"
                  v-if="
                    !(
                      item.url == '/pages/service/index' ||
                      (item.url == '/pages/users/user_spread_user/index' &&
                        !userInfo.isPromoter)
                    )
                  "
                >
                  <image :src="item.pic"></image>
                  <text>{{ item.name }}</text>
                </navigator>
              </block>
             
              <view class="item" @click="kefuClick">
                <image :src="servicePic"></image>
                <text>专属客服</text>
              </view>
            
              <!-- <button class="item" open-type="contact" hover-class="none">
                <image :src="servicePic"></image>
                <text>专属客服</text>
              </button> -->
           
              <view class="item"   @click="goMenuPage('/pages/users/user_address_list/index')">
                <image :src="'https://cshy.store/file/sysFile/wechart/user/service-2.png'"></image>
                <text>收货地址</text>
              </view>
              <view class="item" @click="goPage">
                <image :src="'https://cshy.store/file/sysFile/wechart/user/service-3.png'"></image>
                <text>浏览记录</text>
              </view>
              <view class="item" @click="goMenuPage('/pages/users/user_info/feedback')"> 
                <image :src="'https://cshy.store/file/sysFile/wechart/user/service-4.png'"></image>
                <text>意见反馈</text>
              </view>
              <view class="item"  @click="goMenuPage('/pages/users/user_info/question_type')">
                <image :src="'https://cshy.store/file/sysFile/wechart/user/service-5.png'"></image>
                <text>常见问题</text>
              </view>
            </view>
          </view>
      
        </view>
        <view class="noCommodity">
          <recommend :hostProduct="hostProduct">
            <template v-slot:header>
              <view class="title acea-row row-center-wrapper">
                <image
                  class="title-line"
                  src="https://cshy.store/file/sysFile/wechart/user/tuijian.png"
                ></image>
                <view class="titleTxt">精选推荐</view>
              </view>
            </template>
          </recommend>  
        </view> 
        <!-- <view class="filing-box">
        <Filing></Filing>
      </view> -->
      </scroll-view>
   
    </view>

    <commonUserTabBar :currentTab="'/pages/user/index'"></commonUserTabBar>
  </view>
</template>
<script>
let sysHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
import Cache from '@/utils/cache'
import { BACK_URL } from '@/config/cache'
import { getMenuList } from '@/api/user.js'
import { orderData } from '@/api/order.js'
import { toLogin } from '@/libs/login.js'
import { getCity } from '@/api/api.js'
import recommend from '@/components/recommend'
// import Filing from '@/components/Filing'
import { mapGetters } from 'vuex'
import {getUserInfo} from '@/api/user'
import {
  getSearchKeyword,
  getProductslist,
  getProductHot,
} from '@/api/store.js'
// #ifdef H5
import Auth from '@/libs/wechat'
// #endif
 
const app = getApp()
export default {
  components: {
   
    recommend,
    // Filing
  },
  computed: mapGetters(['isLogin', 'chatUrl', 'userInfo', 'uid']),
  data() {
    return {
      hostProduct: [],
      orderMenu: [
        {
          img: 'https://cshy.store/file/sysFile/wechart/user/order-1.png',
          title: '待付款',
          url: '/pages/users/order_list/index?status=0',
          num: 0,
        },
        {
          img: 'https://cshy.store/file/sysFile/wechart/user/order-2.png',
          title: '待发货',
          url: '/pages/users/order_list/index?status=1',
          num: 0,
        },
        {
          img: 'https://cshy.store/file/sysFile/wechart/user/order-3.png',
          title: '待收货',
          url: '/pages/users/order_list/index?status=2',
          num: 0,
        },
        {
          img: 'https://cshy.store/file/sysFile/wechart/user/order-4.png',
          title: '评价',
          url: '/pages/users/order_list/index?status=3',
          num: 0,
        },
        {
          img: 'https://cshy.store/file/sysFile/wechart/user/order-5.png',
          title: '售后/退款',
          url: '/pages/users/user_return_list/index',
          num: 0,
        },
      ],
      imgUrls: [],
      userMenu: [],
      autoplay: true,
      circular: true,
      interval: 3000,
      duration: 500,
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      orderStatusNum: {},
      MyMenus: [],
      wechatUrl: [],
      servicePic: 'https://cshy.store/file/sysFile/wechart/user/service-1.png',
      sysHeight: sysHeight,
      // #ifdef MP
      pageHeight: '100%',
      // #endif
      // #ifdef H5
      pageHeight: app.globalData.windowHeight,
      // #endif
      // #ifdef H5
      isWeixin: Auth.isWeixin(),
      //#endif
      hotPage: 1,
      limit: 8,
      isScroll: true,
    }
  },
  onLoad() {
    let that = this
    // #ifdef H5
    that.$set(that, 'pageHeight', app.globalData.windowHeight)
    // #endif
    that.$set(that, 'MyMenus', app.globalData.MyMenus)
    if (!this.$Cache.has('cityList')) this.getCityList()
    if (that.isLogin == false) {
      toLogin()
    }
  },
  onShow: function () {
    this.getHostProduct()
    let that = this
    // #ifdef H5
    uni.getSystemInfo({
      success: function (res) {
        that.pageHeight = res.windowHeight + 'px'
      },
    })
    // #endif
 
    if (that.isLogin) {
    
      this.getOrderData()
     
      this.$store.dispatch('USERINFO')
      


    } else {
      toLogin()
    }
  },
  onReachBottom: function () {
    this.getHostProduct()
  },
  onPullDownRefresh(){
    this.getHostProduct()
    if (this.isLogin) {
      this.$store.dispatch('USERINFO')
    this.getOrderData()
  }
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  methods: {
    goPage(){
      uni.navigateTo({
        url: '/pages/users/footsteps/index',
      })
    },
    getHostProduct: function () {
      let that = this
      if (!this.isScroll) return
      getProductHot(that.hotPage, that.limit).then((res) => {
        that.isScroll = res.data.list.length >= that.limit
        that.hostProduct = that.hostProduct.concat(res.data.list)
        that.hotPage += 1
      })
    },
 
    navito(e) {
      window.location.href = 'https://' + e
    },
    kefuClick() {
      this.$util.makePhoneCall()
    },
    getOrderData() {
      uni.showLoading({
        title: '加载中',
      })
      let that = this
      orderData().then((res) => {
        that.orderMenu.forEach((item, index) => {
          switch (item.title) {
            case '待付款':
              item.num = res.data.unPaidCount
              break
            case '待发货':
              item.num = res.data.unShippedCount
              break
            case '待收货':
              item.num = res.data.receivedCount
              break
            case '评价':
              item.num = res.data.evaluatedCount
              break
            case '售后/退款':
              item.num = res.data.refundCount
              break
          }
        })
        that.$set(that, 'orderMenu', that.orderMenu)
      }).finally(() => {
          uni.hideLoading()
        })
    },
    // 打开授权
    openAuto() {
      Cache.set(BACK_URL, '')

      toLogin()
    },
    // 授权回调
    onLoadFun() {
      this.getMyMenus()
   
      this.getOrderData()
    },
    Setting: function () {
      uni.openSetting({
        success: function (res) {
          console.log(res.authSetting)
        },
      })
    },
    // 授权关闭
    authColse: function (e) {
      this.isShowAuth = e
    },
    // 绑定手机
    bindPhone() {
      uni.navigateTo({
        url: '/pages/users/app_login/index',
      })
    },
    /**
     *
     * 获取个人中心图标
     */
    getMyMenus: function () {
      let that = this
      if (this.MyMenus.length) return
      getMenuList().then((res) => {
        that.$set(that, 'MyMenus', res.data.routine_my_menus)
        that.wechatUrl = res.data.routine_my_menus.filter((item) => {
          return item.url.indexOf('service') !== -1
        })
        res.data.routine_my_menus.map((item) => {
          if (item.url.indexOf('service') !== -1) that.servicePic = item.pic
        })
        if (res.data.routine_my_banner) {
          that.imgUrls = res.data.routine_my_banner
        }
      })
    },
    // 编辑页面
    goEdit() {
      if (this.isLogin == false) {
        toLogin()
      } else {
        uni.navigateTo({
          url: '/pages/users/user_info/index',
        })
      }
    },
    // 签到
    goSignIn() {
      uni.navigateTo({
        url: '/pages/users/user_sgin/index',
      })
    },
    // goMenuPage
    goMenuPage(url) {
      if (this.isLogin) {
        uni.navigateTo({
          url,
        })
      } else {
        // #ifdef MP
        this.openAuto()
        // #endif
      }
    },
    // 获取地址数据
    getCityList: function () {
      let that = this
      getCity().then((res) => {
        let oneDay = 24 * 3600 * 1000
        this.$Cache.setItem({
          name: 'cityList',
          value: res.data,
          expires: oneDay * 7,
        }) //设置七天过期时间
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.mid{
  margin-bottom: 60px;
}
page,
body {
  height: 100%;
}
.filing-box{
  padding-bottom:150rpx;
}
.noCommodity {
  margin-top: 38rpx;  padding-bottom: 0rpx;
  /deep/ .recommend {
    background: transparent;
  }
  .title {
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    .titleTxt {
      margin: 0 10rpx;
      font-size: 28rpx;
      color: #666666;
    }
    .sp {
      margin: 0 20rpx;
    }
  }
  .title-line {
    position: absolute;
    width: 448rpx;
    height: 16rpx;
    // border: 2rpx solid #e5e5e5;
  }
}
.bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 525rpx;
  background-image: url('https://cshy.store/file/sysFile/wechart/user/user-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.contenBox {
  padding: 0 30rpx;
}

.support {
  width: 219rpx;
  height: 74rpx;
  margin: 54rpx auto;
  display: block;
}

.new-users {
  display: flex;
  flex-direction: column;
  height: 100%;

  .sys-head {
    position: relative;
    width: 100%;
    background: linear-gradient(90deg, $bg-star1 0%, $bg-end1 100%);

    .sys-title {
      z-index: 10;
      position: relative;
      height: 43px;
      text-align: center;
      line-height: 43px;
      font-size: 36rpx;
      color: #ffffff;
    }
  }

  .head {
    // background: linear-gradient(360deg, rgba(255, 121, 49, 0) 0%, rgba(248, 74, 29, 0.82) 39%, #E93323 100%);
    // padding: 0 30rpx;

    .user-card {
      position: relative;
      width: 100%;
      margin: 0 auto;
      padding: 77rpx 0 20rpx 0;
      .user-info {
        z-index: 20;
        position: relative;
        display: flex;

        .avatar {
          width: 104rpx;
          height: 104rpx;
          border-radius: 50%;
          border: 1px solid #fff;
        }

        .info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 20rpx;

          .name {
            display: flex;
            align-items: center;
            color: #2b2b2b;
            font-size: 34rpx;
            margin-bottom: 10rpx;
            font-weight: 500;

            .vip {
              display: flex;
              align-items: center;
              padding: 6rpx 20rpx;
              background: rgba(0, 0, 0, 0.2);
              border-radius: 18px;
              font-size: 20rpx;
              margin-left: 12rpx;

              image {
                width: 27rpx;
                height: 27rpx;
              }
            }
          }

          .num {
            display: flex;
            align-items: center;
            font-size: 28rpx;

            color: #2b2b2b;
            image {
              width: 22rpx;
              height: 23rpx;
              margin-left: 20rpx;
            }
          }
        }
        .user-info-edit {
          color: #666666;
          font-size: 26rpx;
          margin-top: 11rpx;
        }
      }

      .num-wrapper {
        z-index: 30;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 64rpx;
        color: #fff;

        .num-item {
          width: 33.33%;
          text-align: center;

          .num {
            font-size: 46rpx;
            color: #2b2b2b;
            font-weight: bold;
            position: relative;
            .num-tag {
              position: absolute;
              width: 32rpx;
              height: 32rpx;
              text-align: center;
              line-height: 32rpx;
              right: -30rpx;

              border-radius: 50%;
              background: #e91331;

              top: -13rpx;
              color: #ffffff;
              font-size: 20rpx;
            }
          }

          .txt {
            margin-top: 10rpx;
            font-size: 30rpx;
            color: #666666;
          }
        }
      }

      .sign {
        z-index: 200;
        position: absolute;
        right: -12rpx;
        top: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120rpx;
        height: 60rpx;
        background: linear-gradient(
          90deg,
          rgba(255, 225, 87, 1) 0%,
          rgba(238, 193, 15, 1) 100%
        );
        border-radius: 29rpx 4rpx 4rpx 29rpx;
        color: #282828;
        font-size: 28rpx;
        font-weight: bold;
      }
    }
    .user-box-bg {
      width: 620rpx;
      height: 20rpx;
      background: #ffffff;
      opacity: 0.3;
      margin: 0 35rpx;
      border-radius: 20rpx 20rpx 0 0;
    }
    .order-bg {
      width: 690rpx;
      height: 25rpx;
      top: -2px;
      position: relative;
    }
    .order-wrapper {
      background-color: #fff;
      border-radius: 20rpx 20rpx 0 0;
      padding: 30rpx 34rpx;
      position: relative;
      z-index: 11;

      .order-hd {
        justify-content: space-between;
        font-size: 30rpx;
        color: #2b2b2b;
        margin-bottom: 18rpx;

        .left {
          font-weight: 600;
        }

        .right {
          align-items: center;
          color: #9a9a9a;
          font-size: 26rpx;

          .icon-xiangyou {
            margin-left: 10rpx;
            font-size: 24rpx;
          }
        }
      }

      .order-bd {
        display: flex;
        justify-content: space-between;
        padding: 0;

        .order-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .pic {
            position: relative;
            text-align: center;

            image {
              width: 88rpx;
              height: 88rpx;
            }
          }

          .txt {
            margin-top: 11rpx;
            font-size: 28rpx;
            color: #2b2b2b;
          }
        }
      }
    }
  }

  .slider-wrapper {
    margin: 20rpx 0;
    height: 138rpx;

    swiper,
    swiper-item {
      height: 100%;
    }

    image {
      width: 100%;
      height: 100%;
    }
  }

  .user-menus {
    background-color: #fff;
    border-radius: 20rpx;
    margin-top: 20rpx;

    .menu-title {
      padding: 30rpx 0 24rpx 34rpx;
      font-size: 30rpx;
      color: #2b2b2b;
      font-weight: 600;
    }

    .list-box {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
    }

    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      width: 20%;
      margin-bottom: 47rpx;
      font-size: 26rpx;
      color: #2b2b2b;

      image {
        width: 56rpx;
        height: 56rpx;
        margin-bottom: 15rpx;
      }

      &:last-child::before {
        display: none;
      }
    }

    button {
      font-size: 28rpx;
    }
  }

  .phone {
    color: #fff;
  }

  .order-status-num {
    min-width: 32rpx;
    background: #e91331;
    color: #fff;
    border-radius: 26rpx;
    position: absolute;
    right: -14rpx;
    top: -15rpx;
    font-size: 20rpx;
    // padding: 0 8rpx;
    width: 32rpx;
    height: 32rpx;
    text-align: center;
    line-height: 32rpx;
    background-color: #FEB15F;

  }
}
</style>
 