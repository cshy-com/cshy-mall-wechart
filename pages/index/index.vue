<template>
  <view>
    <view
      class="page-index"
      :class="{ bgf: navIndex > 0 }"
      :style="{ paddingTop: barTop + 'px' }"
    >
      <view class="serch-wrapper" @click="goSearch">
        <view class="serch-box flex">
          <view class="logo">
            <image :src="logoUrl" mode=""></image>
          </view>
          <navigator
            url="/pages/goods_search/index"
            class="input"
            hover-class="none"
            >请输入关键字
          </navigator>
          <view class="search-text">搜索</view>
        </view>
      </view>

      <view v-for="item in diyList" :key="item.id">
        <cate
          v-if="item.type == 'cate' && item.isEnabled"
          :eleValue="item"
        ></cate>
        <active
          v-if="item.type == 'active' && item.isEnabled"
          :eleValue="item"
        ></active>
        <swipper
          v-if="item.type == 'swipper' && item.isEnabled"
          :eleValue="item"
        ></swipper>
        <banner
          v-if="item.type == 'banner' && item.isEnabled"
          :eleValue="item"
        ></banner>
        <adver
          v-if="item.type == 'adver' && item.isEnabled"
          :eleValue="item"
        ></adver>
        <priceGoods v-if="item.type == 'price' && item.isEnabled"></priceGoods>
      </view>

      <view
        class="page_content"
        :style="'margin-top:' + marTop + 'px;'"
        v-if="navIndex == 0"
      >
        <a_seckill></a_seckill>
        <b_combination></b_combination>
        <c_bargain></c_bargain>

        <van-sticky @change="changeSticky">
          <view
            class="sticky-box"
            :class="{ 'sticky-box-fiexd': isSticky }"
            :style="'top:' + marTop + 'px;'"
          >
            <view class="sticky-box-grid">
              <scroll-view
                class="scroll-view_H"
                style="width: 100%"
                scroll-x="true"
                scroll-with-animation
                :scroll-left="tabsScrollLeft"
                @scroll="scroll"
              >
                <view class="tab nav-bd" id="tab_list">
                  <view
                    id="tab_item"
                    :class="{ active: listActive == index }"
                    class="item"
                    v-for="(item, index) in explosiveMoney"
                    :key="index"
                    @click="ProductNavTab(item, index)"
                  >
                    <view class="item-grid">
                      <view class="txt">{{ item.name }}</view>
                      <view class="txt-info">{{ item.info }}</view>
                    </view>
                  </view>
                </view>
              </scroll-view>
            </view>
          </view>
        </van-sticky>

        <productGrid
          :iSshowH="iSshowH"
          @goDetail="goDetail"
          :loading="loading"
          :goodScroll="goodScroll"
          :tempArr="tempArr"
        >
        </productGrid>
      </view>
    </view>

    <commonUserTabBar :currentTab="'/pages/index/index'"></commonUserTabBar>
  </view>
</template>

<script>
import Auth from '@/libs/wechat'
import Cache from '../../utils/cache'
var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
let app = getApp()
import {
  getIndexData,
  getCoupons,
  setCouponReceive,
  bannerActivityConfigPage,
} from '@/api/api.js'
// #ifdef MP-WEIXIN
import { getTemlIds } from '@/api/api.js'
// import {
// 	SUBSCRIBE_MESSAGE,
// 	TIPS_KEY
// } from '@/config/cache';
// #endif
// #ifdef H5
import { follow } from '@/api/public.js'
// #endif
import { getShare } from '@/api/public.js'
import a_seckill from './components/a_seckill'
import b_combination from './components/b_combination'
import c_bargain from './components/c_bargain'
// import goodList from '@/components/goodList'

import ClipboardJS from '@/plugin/clipboard/clipboard.js'
import { goShopDetail } from '@/libs/order.js'
import { mapGetters } from 'vuex'

// import Filing from '@/components/Filing'
import {
  getCategoryList,
  getProductslist,
  getProductHot,
  getGroomList,
} from '@/api/store.js'
// import {
// 	setVisit
// } from '@/api/user.js'
import recommend from '@/components/recommend'

import { silenceBindingSpread } from '@/utils'

import { getWXStatusHeight } from '@/utils/util'
// #ifndef MP
import { kefuConfig } from '@/api/public'
import { getWechatConfig } from '@/api/public'
// #endif
import Loading from '@/components/Loading/index.vue'
import {
  productListCategoryFeature,
  activityQueryProductList,
  homeConfigList,
} from '@/api/api.js'
const arrTemp = [
  'beforePay',
  'afterPay',
  'refundApply',
  'beforeRecharge',
  'createBargain',
  'pink',
]

import {
  loginH5,
  loginMobile,
  registerVerify,
  register,
  // getCodeApi,
  getUserInfo,
  userGetToken,
  userToken,
} from '@/api/user'
import productGrid from '@/components/productGrid.vue'
import cate from './components/cate.vue'
import swipper from './components/swipper.vue'
import active from './components/active.vue'
import priceGoods from './components/priceGoods.vue'
import banner from './components/banner.vue'
import adver from './components/adver.vue'
export default {
  computed: mapGetters(['isLogin', 'uid']),
  components: {
    cate,
    swipper,
    active,
    adver,
    banner,
    // goodList,

    a_seckill,
    b_combination,
    c_bargain,
    recommend,

    Loading,
    productGrid,
    // Filing,
    priceGoods,
  },
  data() {
    return {
      loaded: false,
      loading: false,
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      statusBarHeight: statusBarHeight,
      navIndex: 0,
      navTop: [],
      followUrl: '',
      followHid: true,
      followCode: false,
      logoUrl: 'https://cshy.store/file/sysFile/wechart/0.jpg',
      imgUrls: [],
      itemNew: [],
      menus: [],
      bastInfo: '',
      fastInfo: '',
      fastList: [],
      firstInfo: '',
      salesInfo: '',
      indicatorDots: false,
      circular: true,
      autoplay: true,
      interval: 3000,
      duration: 500,
      window: false,
      iShidden: false,
      navH: '',
      newGoodsBananr: '',
      couponList: [],
      liveList: [],

      ProductNavindex: 0,
      marTop: 0,
      childID: 0,
      loadend: false,
      loadTitle: '加载更多',
      sortProduct: [],
      where: {
        cid: 0,
        page: 1,
        limit: 10,
      },
      is_switch: true,
      hotPage: 1,
      hotLimit: 10,
      hotScroll: false,
      explosiveMoney: [],
      prodeuctTop: 0,
      searchH: 0,
      isFixed: false,
      goodType: 0, //精品推荐Type
      goodScroll: true, //精品推荐开关
      params: {
        //精品推荐分页
        page: 1,
        limit: 10,
      },
      tempArr: [], //精品推荐临时数组
      roll: [], // 新闻简报
      site_name: '', //首页title
      iSshowH: false,
      configApi: {}, //分享类容配置
      spikeList: [], // 秒杀
      point: '',
      privacyStatus: false, // 隐私政策是否同意过
      tabsScrollLeft: 0, // tabs当前偏移量
      scrollLeft: 0,
      lineColor: 'red',
      lineStyle: {}, // 下划线位置--动态甲酸
      listActive: 0, // 当前选中项

      duration: 0.2, // 下划线动画时长
      banner1: 'https://cshy.store/file/sysFile/wechart/img_home_banner.png',
      advertisementCommodityList: [],
      classificationList: [],
      banner2: 'https://cshy.store/file/sysFile/wechart/haohuo.png',
      activeList: [],
      activeIcon1: 'https://cshy.store/file/sysFile/wechart/active-icon1.png',
      activeIcon2: 'https://cshy.store/file/sysFile/wechart/active-icon2.png',
      activeIcon3: 'https://cshy.store/file/sysFile/wechart/active-icon3.png',
      activeIcon4: 'https://cshy.store/file/sysFile/wechart/active-icon4.png',
      activeIcon5: 'https://cshy.store/file/sysFile/wechart/active-icon5.png',
      activeIcon6: 'https://cshy.store/file/sysFile/wechart/active-icon6.png',
      activeIcon7: 'https://cshy.store/file/sysFile/wechart/active-icon7.png',
      isSticky: false,

      bannerConfig: {},
      activeGoods: [],
      swipperList: [
        {
          img: 'https://cshy.store/file/swipper1.png',
          url: '/pages/goods_list/active_index?title=新品推荐&feature=3',
        },
        {
          img: 'https://cshy.store/file/swipper2.png',
          url: '/pages/activity/boutique/index',
        },
        {
          img: 'https://cshy.store/file/swipper3.png',
          url: '/pages/activity/city/index',
        },
        {
          img: 'https://cshy.store/file/swipper4.png',
          url: '/pages/activity/cake/index',
        },
        {
          img: 'https://cshy.store/file/swipper5.png',
          url: '/pages/activity/flower/index',
        },
      ],
      time:
        new Date(new Date().toLocaleDateString()).getTime() +
        1000 * 60 * 60 * 24 -
        Date.parse(new Date()),
      diyList: [],
      barTop: null,
    }
  },
  onLaunch() {},
  watch: {
    ProductNavindex(newVal) {
      // 监听当前选中项
      this.setTabList()
    },
    listActive(newVal) {
      // 监听当前选中项
      this.setTabList()
    },
  },
  mounted() {
    this.setTabList()
  },
  onLoad(options) {
    console.log('options.code' + options.code)
    var that = this
    // 获取系统信息
    uni.getSystemInfo({
      success(res) {
        that.$store.commit('SYSTEM_PLATFORM', res.platform)
      },
    })
// #ifdef MP-WEIXIN
    let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
    this.barTop = menuButtonInfo.top + menuButtonInfo.height
	// #endif
    

    // uni.getLocation({
    //   type: 'gcj02',
    //   altitude: true,
    //   geocode: true,
    //   success: function (res) {
    //     try {
    //       uni.setStorageSync('user_latitude', res.latitude)
    //       uni.setStorageSync('user_longitude', res.longitude)
    //     } catch {}
    //   },
    // })
    let self = this

    // #ifndef MP
    this.navH = 0
    // #endif
    this.isLogin && silenceBindingSpread()
    // Promise.all([this.getAllCategory(), this.getIndexConfig()
    // 	// , this.setVisit()
    // ]);
    this.getIndexConfig()
    // #ifdef MP
    this.getTemlIds()
    // #endif

    this.getHomeData()
    this.getList()
    this.getHomeConfigList()
    console.log('onLoad')
    // #ifdef H5
    let urlParams = this.getUrlParams(window.location.href)
    this.code = urlParams.code
    console.log('this.code:' + this.code + new Date())
// #endif
    let userToken = uni.getStorage('userToken')
    console.log('userToken:' + userToken)
    if (['', 'null', null, undefined].includes(userToken)) {
      let type 
        // #ifdef H5
        type=1
        // #endif
// #ifdef MP-WEIXIN
type=2
  // #endif

     
      userGetToken({
        code: this.code,
        type:type,
      }).then((res) => {})
  
    }



    
   
 



  },
  onShow() {
    //隐藏官方的tabBar
    uni.hideTabBar({
      animation: false,
    })
    let self = this
    uni.setNavigationBarTitle({
      title: self.site_name,
    })
  },
  onPullDownRefresh() {
    this.getIndexConfig()
    this.getHomeData()
    this.getList()
    this.getHomeConfigList()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  methods: {
    goSearch(e) {
      uni.reLaunch({
        url: '/pages/goods_search/index',
      })
    },
    getUrlParams(url) {
      let o = {}
      if (url.indexOf('?') != -1) {
        let str = url.substr(url.indexOf('?') + 1).replace(/[#/|/#/]/g, '')
        // console.log(str);
        let strs = str.split('&')
        // console.log(strs);
        for (let i = 0; i < strs.length; i++) {
          o[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
        }
      }
      return o
    },
    async getHomeConfigList() {
      let res = await homeConfigList({})

      this.diyList = res.data
    },
    async getList() {
      let data = await activityQueryProductList({
        activityCategoryName: '好货集结',
      })
      this.activeGoods = data.data
    },
    async getHomeData() {
      try {
        let res = await bannerActivityConfigPage()

        this.bannerConfig = res.data
      } catch (error) {
      } finally {
        uni.hideLoading()
      }
    },

    goPage(url) {
      if (!url) {
        return this.$util.Tips({
          title: '即将开放，敬请期待！',
        })
      }
      uni.navigateTo({
        url: url,
      })
    },
    changeSticky(e) {
      this.isSticky = e
    },
    getCoupon: function (id, index) {
      let that = this
      //领取优惠券
      setCouponReceive(id).then(
        function (res) {
          that.$set(that.couponList[index], 'isUse', true)
          that.$util.Tips({
            title: '领取成功',
          })
        },
        function (res) {
          return that.$util.Tips({
            title: res,
          })
        }
      )
    },
    clickSort(index) {
      this.listActive = index
    },
    // scroll-view滑动事件
    scroll(e) {
      this.scrollLeft = e.detail.scrollLeft
    },
    setTabList() {
      this.$nextTick(() => {
        //this.setLine()
        this.scrollIntoView()
      })
    },
    // 计算tabs位置
    scrollIntoView() {
      // item滚动
      let lineLeft = 0
      this.getElementData('#tab_list', (data) => {
        let list = data[0]
        this.getElementData(`#tab_item`, (data) => {
          let el = data[this.listActive]
          lineLeft =
            el.width / 2 +
            -list.left +
            el.left -
            list.width / 2 -
            this.scrollLeft
          this.tabsScrollLeft = this.scrollLeft + lineLeft
        })
      })
    },
    //  计算下划线位置
    setLine() {
      let lineWidth = 0,
        lineLeft = 0
      this.getElementData(`#tab_item`, (data) => {
        let el = data[this.listActive]
        lineWidth = el.width / 2
        // lineLeft = el.width * (this.currentIndex + 0.5)  // 此种只能针对每个item长度一致的
        lineLeft = el.width / 2 + -data[0].left + el.left
        this.lineStyle = {
          width: `${lineWidth}px`,
          transform: `translateX(${lineLeft}px) translateX(-50%)`,
          transitionDuration: `${this.duration}s`,
        }
      })
    },
    getElementData(el, callback) {
      uni
        .createSelectorQuery()
        .in(this)
        .selectAll(el)
        .boundingClientRect()
        .exec((data) => {
          callback(data[0])
        })
    },
    xieyiApp() {
      uni.navigateTo({
        url: '/pages/users/web_page/index?webUel=https://admin.java.crmeb.net/useragreement/xieyi.html&title=协议内容',
      })
    },
    // #ifdef MP
    getTemlIds() {
      for (var i in arrTemp) {
        this.getTem(arrTemp[i])
      }
    },
    getTem(data) {
      getTemlIds({
        type: data,
      }).then((res) => {
        if (res.data) {
          let arr = res.data.map((item) => {
            return item.tempId
          })
          wx.setStorageSync('tempID' + data, arr)
        }
      })
    },
    // #endif
    // 首页数据
    getIndexConfig: function () {
      let that = this
      getIndexData().then((res) => {
        uni.setNavigationBarTitle({
          title: '楚商精选',
        })
        // that.$set(that, 'logoUrl', res.data.logoUrl)
        that.$set(that, 'site_name', '首页')
        uni.setStorageSync('consumerHotline', res.data.consumerHotline)

        that.$set(that, 'imgUrls', res.data.banner)
        that.$set(that, 'menus', res.data.menus)
        that.$set(that, 'roll', res.data.roll ? res.data.roll : [])
        // #ifdef H5
        that.$store.commit('SET_CHATURL', res.data.yzfUrl)
        Cache.set('chatUrl', res.data.yzfUrl)
        // #endif
        that.$set(that, 'explosiveMoney', res.data.explosiveMoney)
        that.goodType = res.data.explosiveMoney[0].type
        this.getGroomList()
        this.shareApi()
        this.getcouponList()
        // #ifdef H5
        // that.subscribe = res.data.subscribe;
        // #endif
      })
    },
    getcouponList() {
      let that = this
      getCoupons({
        page: 1,
        limit: 6,
      })
        .then((res) => {
          that.$set(that, 'couponList', res.data)
          // 小程序判断用户是否授权；
          // #ifdef MP
          uni.getSetting({
            success(res) {
              if (!res.authSetting['scope.userInfo']) {
                that.window = that.couponList.length ? true : false
              } else {
                that.window = false
                that.iShidden = true
              }
            },
          })
          // #endif
          // #ifndef MP
          if (that.isLogin) {
            that.window = false
          } else {
            that.window = res.data.length ? true : false
          }
          // #endif
        })
        .catch((err) => {
          return this.$util.Tips({
            title: err,
          })
        })
    },
    shareApi: function () {
      getShare().then((res) => {
        this.$set(this, 'configApi', res.data)
        // #ifdef H5
        this.setOpenShare(res.data)
        // #endif
      })
    },
    getChatUrL() {
      kefuConfig().then((res) => {
        let data = res.data
        this.$store.commit('SET_CHATURL', data.yzfUrl)
        Cache.set('chatUrl', data.yzfUrl)
      })
    },
    // 微信分享；
    setOpenShare: function (data) {
      let that = this
      if (that.$wechat.isWeixin()) {
        let configAppMessage = {
          desc: data.synopsis,
          title: data.title,
          link: location.href,
          imgUrl: data.img,
        }
        that.$wechat.wechatEvevt(
          ['updateAppMessageShareData', 'updateTimelineShareData'],
          configAppMessage
        )
      }
    },
    // 授权关闭
    authColse: function (e) {
      this.isShowAuth = e
    },
    // 授权回调
    onLoadFun() {},
    // 首发新品切换
    ProductNavTab(item, index) {
      this.listActive = index
      this.goodType = item.type
      this.listActive = index
      this.ProductNavindex = index
      this.tempArr = []
      this.params.page = 1
      this.goodScroll = true
      let onloadH = true
      this.getGroomList(onloadH)
    },
    // 首发新品详情
    goDetail(item) {
      if (item.activityH5 && item.activityH5.type === '2' && !this.isLogin) {
        toLogin()
      } else {
        goShopDetail(item, this.uid).then((res) => {
          uni.navigateTo({
            url: `/pages/goods/goods_details/index?id=${item.id}`,
          })
        })
      }
    },
    // 分类详情
    godDetail(item) {
      goShopDetail(item, this.uid).then((res) => {
        uni.navigateTo({
          url: `/pages/goods/goods_details/index?id=${item.id}`,
        })
      })
    },
    // 精品推荐
    getGroomList(onloadH) {
      this.loading = true
      let type = this.goodType
      if (!this.goodScroll) return
      if (onloadH) {
        this.iSshowH = true
      }
      // getGroomList(type, this.params).then(({ data }) => {
      //   this.iSshowH = false
      //   this.loading = false
      //   this.goodScroll = data.list.length >= this.params.limit
      //   this.params.page++
      //   this.tempArr = this.tempArr.concat(data.list)
      // })
      //  0是否热卖isHot;1 是否优惠isBenefit;2 是否精品isBest;3 是否新品isNew;4 是否放心用isSafe;5 是否安心吃isEnjoy;
      // name
      // :
      // "精选"  name
      // :
      // "热卖" name
      // :
      // "新品" name
      // :
      // "推荐"
      let arr = [2, 0, 3, 6]

      productListCategoryFeature({
        feature: arr[this.listActive],
      }).then((res) => {
        this.goodScroll = false
        this.iSshowH = false
        this.loading = false
        this.tempArr = res.data
      })
    },
    /**
     * 获取我的推荐
     */
    get_host_product: function () {
      let that = this
      that.loading = true

      if (that.hotScroll) return
      getProductHot(that.hotPage, that.hotLimit).then((res) => {
        that.hotPage++
        that.hotScroll = res.data.list.length < that.hotLimit
        that.hostProduct = that.hostProduct.concat(res.data.list)
      })
    },
  },
  mounted() {
    let self = this
    // #ifdef H5
    //self.getChatUrL();
    // 获取H5 搜索框高度
    let appSearchH = uni.createSelectorQuery().select('.serch-wrapper')
    appSearchH
      .boundingClientRect(function (data) {
        self.searchH = data.height
      })
      .exec()
    // #endif
  },
  /**
   * 用户点击右上角分享
   */
  // #ifdef MP
  onShareAppMessage: function () {
    return {
      title: this.configApi.title,
      imageUrl: this.configApi.img,
      desc: this.configApi.synopsis,
      path: '/pages/index/index',
    }
  },
  // #endif
  onReachBottom() {
    if (this.navIndex == 0) {
      // 首页加载更多
      if (this.params.page != 1) {
        this.getGroomList()
      }
    } else {
      // 分类栏目加载更多
      if (this.sortProduct.length > 0) {
        //this.get_product_list();
      } else {
        this.get_host_product()
      }
    }
  },
}
</script>
<style>
page {
  display: flex;
  flex-direction: column;
  height: 100%;
  /* #ifdef H5 */
  background-color: #fff;
  /* #endif */
}
</style>
<style lang="scss">
.fixed-coupons {
  position: fixed;
  bottom: 220rpx;
  right: 5rpx;
  width: 223rpx;
  height: 182rpx;

  .fixed-coupons-img {
    width: 223rpx;
    height: 182rpx;
  }

  .coupons-text {
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 29rpx;
    color: #ffffff;
    line-height: 41rpx;
    text-align: center;
    font-style: normal;
    position: absolute;
    right: 53rpx;
    bottom: 18rpx;
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }

  50% {
    transform: scale(1.1);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/deep/ .index-product-wrapper {
  margin-bottom: 40rpx;
}

.filing-box {
  margin-bottom: 180rpx;
}

.notice {
  width: 100%;
  height: 70rpx;
  border-radius: 10rpx;
  background-color: #fff;
  margin-bottom: 25rpx;
  line-height: 70rpx;
  padding: 0 14rpx;

  .line {
    color: #cccccc;
  }

  .pic {
    width: 130rpx;
    height: 36rpx;

    image {
      width: 100%;
      height: 100%;
      display: block !important;
    }
  }

  .swipers {
    height: 100%;
    width: 444rpx;
    overflow: hidden;

    swiper {
      height: 100%;
      width: 100%;
      overflow: hidden;
      font-size: 22rpx;
      color: #333333;
    }
  }

  .iconfont {
    color: #999999;
    font-size: 20rpx;
  }
}

.couponIndex {
  width: auto;
  height: 238rpx;
  background-image: url('https://cshy.storehttps://cshy.store/file/sysFile/wechart/yhjsy.png');
  background-size: 100% 100%;
  padding-left: 42rpx;
  margin-bottom: 30rpx;

  .titBox {
    padding: 47rpx 0;
    text-align: center;
    height: 100%;

    .tit1 {
      color: #ffebd2;
      font-size: 34rpx;
      font-weight: 600;
    }

    .tit2 {
      color: #ffebd2;
      font-size: 22rpx;
      margin: 10rpx 0 26rpx 0;
    }

    .tit3 {
      color: #ffdaaf;
      font-size: 24rpx;

      .iconfont {
        font-size: 20rpx;
      }
    }
  }

  .listBox {
    padding: 14rpx 0;

    .listActive {
      background-image: url('https://cshy.storehttps://cshy.store/file/sysFile/wechart/lingyhj.png');
      background-size: 100% 100%;
    }

    .listHui {
      background-image: url('https://cshy.storehttps://cshy.store/file/sysFile/wechart/weiling.png');
      background-size: 100% 100%;
    }

    .list {
      width: 170rpx;
      height: 210rpx;
      padding: 16rpx 0;
      text-align: center;
      margin-left: 24rpx;

      .tit {
        font-size: 18rpx;
        padding: 0 26rpx;
      }

      .titActive {
        color: #c99959;
      }

      .price {
        font-size: 46rpx;
        font-weight: 900;
        margin-top: 4rpx;
      }

      .pricehui {
        color: #b2b2b2;
      }

      .fonthui {
        background-color: #f5f5f5 !important;
      }

      .yuan {
        font-size: 24rpx;
      }

      .ling {
        font-size: 24rpx;
        margin-top: 9.5rpx;
        width: 102rpx;
        height: 36rpx;
        line-height: 36rpx;
        background-color: #ffe5c7;
        border-radius: 28rpx;
        margin: auto;
      }

      .priceM {
        color: #ffdaaf;
        font-size: 22rpx;
        margin-top: 14rpx;
      }
    }
  }
}

.sticky-box {
}

.sticky-box-grid {
  // margin: 30rpx;
  display: flex;
  flex-direction: row;
  border-radius: 20rpx;
  z-index: 99;
  // background: #fff;
  padding: 20rpx 0;
}

.sticky-box-fiexd {
  background: #fff;

  .sticky-box-grid {
    margin-top: 0;
  }
}

.listAll {
  width: 20%;
  text-indent: 62rpx;
  font-size: 30rpx;
  border-left: 1px #eee solid;
  margin: 1% 0;
  padding: 5rpx;
  position: relative;

  image {
    position: absolute;
    left: 20rpx;
    top: 8rpx;
  }
}

.tab {
  position: relative;
  display: flex;
  font-size: 28rpx;
  white-space: nowrap;

  .tab-url {
    width: 44rpx;
    height: 44rpx;
    margin-right: 5rpx;
  }

  &__item {
    flex: 1;
    padding: 0 20rpx;
    text-align: center;
    height: 60rpx;
    line-height: 60rpx;
    color: #666;

    &.active {
      color: #09c2c9;
    }
  }
}

.tab__line {
  display: block;
  height: 6rpx;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  border-radius: 3rpx;
  position: relative;
  background: #2fc6cd;
}

.scroll-view_H {
  /* 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
  white-space: nowrap;
  width: 100%;
}

.privacy-wrapper {
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #7f7f7f;

  .privacy-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 560rpx;
    padding: 50rpx 45rpx 0;
    background: #fff;
    border-radius: 20rpx;

    .title {
      text-align: center;
      font-size: 32rpx;
      text-align: center;
      color: #333;
      font-weight: 700;
    }

    .content {
      margin-top: 20rpx;
      line-height: 1.5;
      font-size: 26rpx;
      color: #666;
      text-indent: 54rpx;

      i {
        font-style: normal;
        color: $theme-color;
      }
    }

    .btn-box {
      margin-top: 40rpx;
      text-align: center;
      font-size: 30rpx;

      .btn-item {
        height: 82rpx;
        line-height: 82rpx;
        background: linear-gradient(90deg, #f67a38 0%, #f11b09 100%);
        color: #fff;
        border-radius: 41rpx;
      }

      .btn {
        padding: 30rpx 0;
      }
    }
  }
}

.page-index {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);
  // padding-top: 120rpx;

  .serch-wrapper {
    align-items: center;

    padding-top: 20rpx;

    margin: 0 30rpx;
    padding-bottom: 44rpx;

    .serch-box {
      border: 3rpx solid #ff879f;
      background: #ffffff;
      border-radius: 33rpx;
      width: 690rpx;
      height: 66rpx;
      position: relative;
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

      .iconfont {
        margin-right: 20rpx;
        font-size: 26rpx;
        color: #666666;
      }
    }

    .search-text {
      width: 108rpx;
      height: 62rpx;
      background: linear-gradient(270deg, #fe3b7f 0%, #ff7c5c 100%);
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

  .header {
    width: 100%;

    // padding: 28rpx 30rpx;
    .advertisement {
      width: 100%;
      height: 575rpx;
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: 0;
      z-index: 9;
      position: relative;
    }

    .advertisement-commodity {
      position: absolute;
      left: 211rpx;
      top: 302rpx;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      .advertisement-box {
        width: 140rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .advertisement-box:nth-child(1) {
        margin-right: 45rpx;
      }

      .advertisement-text {
        font-size: 22rpx;
        margin-top: 4rpx;
        font-weight: 400;
        color: #ffffff;
        line-height: 30rpx;
      }

      .advertisement-url {
        width: 106rpx;
        height: 106rpx;
        margin-top: 5rpx;
      }
    }
  }

  .classification {
    display: flex;
    justify-content: flex-start;
    // margin-top: -28rpx;
    margin-right: 32rpx;
    margin-left: 32rpx;
    flex-wrap: wrap;

    .classification-grid {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 25rpx;
      width: 118rpx;
      position: relative;

      .tip {
        position: absolute;
        right: -32rpx;
        top: -19rpx;
        background-image: url('https://cshy.store/file/sysFile/wechart/tip.png');
        background-size: 100%;
        background-position: 0;
        width: 97rpx;
        height: 37rpx;
        font-size: 18rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 37rpx;
        text-align: center;
      }

      .classification-img {
        width: 86rpx;
        height: 86rpx;
        border-radius: 50%;
      }

      .classification-text {
        font-size: 26rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2b2b2b;
        line-height: 37rpx;
        margin: 9rpx 0 30rpx 0;
      }
    }

    .classification-grid:nth-child(5n) {
      margin-right: 0;
    }
  }

  .active-box {
    .active-box-tiitle {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .active-box-tiitle-left {
        width: 424rpx;
        height: 54rpx;
        background: rgba(255, 229, 222, 1);
        border-radius: 0px 100px 100px 0px;

        font-family: PingFangSC, PingFang SC;
        font-weight: 500;
        font-size: 28rpx;
        color: #e91331;
        line-height: 54rpx;
        text-align: left;
        font-style: normal;
        display: flex;
        align-items: center;

        .skill-min {
          width: 42rpx;
          height: 34rpx;
          line-height: 34rpx;
          background: #e91331;
          border-radius: 4px;
          color: #fff;
          font-weight: 400;
          display: inline-block;
          // text-indent: 4rpx;
          text-align: center;
        }

        text {
          color: #e91331;
        }
      }

      .active-box-tiitle-right {
        margin-right: 30rpx;

        .active-box-tiitle-right-img {
          width: 216rpx;
          height: 52rpx;
        }
      }
    }

    .active-row {
      margin: 0 30rpx;
      width: 690rpx;
      padding-bottom: 30rpx;
      background-size: 100%;
      background-position: 0;
      padding-top: 23rpx;

      display: flex;
      justify-content: flex-start;

      .active-grid {
        display: flex;
        justify-content: flex-start;
        width: 217rpx;
        font-size: 28rpx;
        margin-right: 20rpx;
        flex-direction: column;

        background: #f5f5f5;
        border-radius: 20rpx;

        .active-img {
          width: 217rpx;
          height: 198rpx;
          border-radius: 20rpx 20rpx 0 0;
          background-image: url(https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif);
          background-size: 100%;
          background-position: no-repeat;
          background-position: 0;
        }

        .active-text {
          font-size: 28rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #2b2b2b;
          line-height: 40rpx;
          margin: 10rpx 0 6rpx 0;
        }

        .active-price {
          background: linear-gradient(270deg, #ff7c5c 0%, #fe3b7f 100%);
          border-radius: 18rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #fff;
          line-height: 35rpx;
          text-align: center;

          width: 178rpx;
          height: 35rpx;
          margin-left: 19rpx;
          margin-top: 15rpx;
          margin-bottom: 9rpx;
        }

        .font-34 {
          font-size: 34rpx;
        }

        .active-price-org {
          text-align: center;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #9a9a9a;
          line-height: 40rpx;
          text-decoration: line-through;
        }
      }

      .active-grid:nth-child(3n) {
        margin-right: 0;
      }
    }
  }

  .swipper-active {
    display: flex;
    padding: 30rpx;

    .swipper-box {
      width: 335rpx;
      height: 420rpx;

      /deep/ .van-swipe__indicator {
        width: 8rpx;
        height: 8rpx;
      }

      /deep/ .van-swipe__indicator--active {
        width: 10rpx;
        height: 10rpx;
      }

      .swipe-img {
        width: 335rpx;
        height: 420rpx;
      }
    }

    .swipper-right {
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .swipper-right-img {
        width: 335rpx;
        height: 200rpx;
      }

      .swipper-right-img:first-child {
        margin-bottom: 20rpx;
      }
    }
  }

  .active-icon-box {
    margin: 30rpx 30rpx 0 30rpx;

    .active-icon-row {
      margin-bottom: 20rpx;

      .row-top-item {
        width: 335rpx;
        height: 251rpx;
      }

      .row-top-item:nth-child(1) {
        margin-right: 20rpx;
      }

      .row-left-item {
        width: 217rpx;
        height: 344rpx;
        border-radius: 30rpx;
      }

      .ative-icon-row-grid {
        width: 474rpx;
        display: flex;
        flex-wrap: wrap;

        .row-grid-item {
          width: 217rpx;
          height: 162rpx;
          border-radius: 30rpx;
          margin-left: 20rpx;
          margin-bottom: 20rpx;
        }
      }
    }

    .active-icon-row:nth-child(2) {
      margin-bottom: 0;
      display: flex;
    }
  }

  .page_content {
    background-color: #f4f4f4;
    border-radius: 30rpx 30rpx 0 0;
    /* #ifdef H5 */
    // margin-top: 20rpx !important;
    /* #endif */
    // padding: 0 30rpx;

    .swiper {
      position: relative;
      width: 100%;
      height: 280rpx;
      margin: 0 auto;
      border-radius: 10rpx;
      overflow: hidden;
      margin-bottom: 25rpx;
      /* #ifdef MP */
      z-index: 10;
      margin-top: 20rpx;

      /* #endif */
      swiper,
      .swiper-item,
      image {
        width: 100%;
        height: 280rpx;
        border-radius: 10rpx;
      }
    }

    .nav {
      padding-bottom: 26rpx;
      background: #fff;
      opacity: 1;
      border-radius: 14rpx;
      width: 100%;
      margin-bottom: 30rpx;

      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 20%;
        margin-top: 30rpx;

        image {
          width: 82rpx;
          height: 82rpx;
        }
      }
    }

    .nav-bd {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      position: relative;

      .item {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        width: 25%;
        padding-bottom: 10rpx;

        .item-grid {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .txt {
          font-size: 30rpx;
          color: #2b2b2b;
          font-weight: 600;
        }

        .txt-info {
          margin-top: 5rpx;
          width: 120rpx;
          height: 31rpx;

          font-family: PingFangSC, PingFang SC;
          font-weight: 400;
          font-size: 22rpx;
          color: #9a9a9a;
          line-height: 30rpx;
          text-align: center;
          font-style: normal;
        }

        .label {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 124rpx;
          height: 32rpx;
          margin-top: 5rpx;
          font-size: 24rpx;
          color: #999;
        }

        &.active {
          color: $theme-color;

          .txt {
            color: $theme-color;
            position: relative;
            line-height: 42rpx;
          }

          .txt-info {
            background: linear-gradient(270deg, #fe3b7f 0%, #ff7c5c 100%);
            border-radius: 16rpx;

            color: #ffffff;
          }

          .label {
            background: linear-gradient(90deg, $bg-star 0%, $bg-end 100%);
            border-radius: 16rpx;
            color: #fff;
          }
        }

        .line {
          width: 2rpx;
          height: 30rpx;
          background: #e5e5e5;
          margin-left: auto;
        }
      }

      .item:last-child::after {
        width: 0;
      }

      .item:last-child {
        margin-right: 0;
      }
    }
  }
}

.productList {
  /* #ifdef H5 */
  padding-bottom: 140rpx;
  /* #endif */
}

.productList .list {
  padding: 0 20rpx;
}

.productList .list.on {
  background-color: #fff;
  border-top: 1px solid #f6f6f6;
}

.productList .list .item {
  width: 345rpx;
  margin-top: 20rpx;
  background-color: #fff;
  border-radius: 10rpx;
}

.productList .list .item.on {
  width: 100%;
  display: flex;
  border-bottom: 1rpx solid #f6f6f6;
  padding: 30rpx 0;
  margin: 0;
}

.productList .list .item .pictrue {
  position: relative;
  width: 100%;
  height: 345rpx;
}

.productList .list .item .pictrue.on {
  width: 180rpx;
  height: 180rpx;
}

.productList .list .item .pictrue image {
  width: 100%;
  height: 100%;
  border-radius: 20rpx 20rpx 0 0;
}

.productList .list .item .pictrue image.on {
  border-radius: 6rpx;
}

.productList .list .item .text {
  padding: 20rpx 17rpx 26rpx 17rpx;
  font-size: 30rpx;
  color: #222;
}

.productList .list .item .text.on {
  width: 508rpx;
  padding: 0 0 0 22rpx;
}

.productList .list .item .text .money {
  font-size: 26rpx;
  font-weight: bold;
  margin-top: 8rpx;
}

.productList .list .item .text .money.on {
  margin-top: 50rpx;
}

.productList .list .item .text .money .num {
  font-size: 34rpx;
}

.productList .list .item .text .vip {
  font-size: 22rpx;
  color: #aaa;
  margin-top: 7rpx;
}

.productList .list .item .text .vip.on {
  margin-top: 12rpx;
}

.productList .list .item .text .vip .vip-money {
  font-size: 24rpx;
  color: #282828;
  font-weight: bold;
}

.productList .list .item .text .vip .vip-money image {
  width: 46rpx;
  height: 21rpx;
  margin-left: 4rpx;
}

.pictrue {
  position: relative;
}

.fixed {
  z-index: 100;
  position: fixed;
  left: 0;
  top: 0;
  background: linear-gradient(90deg, red 50%, #ff5400 100%);
}

.mores-txt {
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 70rpx;
  color: #999;
  font-size: 24rpx;

  .iconfont {
    margin-top: 2rpx;
    font-size: 20rpx;
  }
}

.menu-txt {
  font-size: 24rpx;
  color: #454545;
}

.mp-bg {
  position: absolute;
  left: 0;

  top: 98rpx;

  width: 100%;
  height: 304rpx;

  // border-radius: 0 0 30rpx 30rpx;
}
</style>
