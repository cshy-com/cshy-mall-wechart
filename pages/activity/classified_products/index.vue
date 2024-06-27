<template>
  <view>
    <view class="page-index" :class="{ bgf: navIndex > 0 }">
      <view class="header" @click="goSearch">
        <view class="advertisement" :class="{ 'advertisement-show': !seckillProducts || seckillProducts.length == 0 }">
          <view class="serch-wrapper">
            <view class="serch-box flex">
              <view class="logo">
                <image :src="nav_logo" mode=""></image>
              </view>
              <navigator url="/pages/goods_search/index" class="input" hover-class="none">螃蟹
              </navigator>
              <view class="search-text">搜索</view>
            </view>
          </view>
        </view>
      </view>
      <!-- 闪电秒杀 -->
      <view class="active-box" v-if="seckillProducts && seckillProducts.length > 0">
        <view class="active-row" :style="{
          'background-image': 'url(' + banner1 + ')',
        }">
          <view class="active-header">
            <view class="active-header-left">
              <image class="active-header-left-icon" src="https://cshy.store/file/sysFile/wechart/shandianmiaosha.png">
              </image>
              <view class="active-title-1">
                <image class="active-title-1-icon" src="https://cshy.store/file/sysFile/wechart/cate_header_bg_1.png">
                </image>
                <text class="text">限时爆款</text>
              </view>
            </view>
          </view>
          <view class="active-swipper">
            <view class="active-swiper-tip">
              <text> 秒杀区每日限购5件商品 </text>
              <!-- <text>距结束00:50:26</text> -->
            </view>
            <swiperMs :tempArr="seckillProducts"></swiperMs>
          </view>
        </view>
      </view>
      <!-- 新品推荐 -->
      <!-- -->
      <view class="active-box margin-t-0 active-box2" v-if="newProducts && newProducts.length > 0">
        <view class="active-row" :style="{
          'background-image': 'url(' + banner2 + ')',
        }">
          <view class="active-header">
            <view class="active-header-left">
              <image class="active-header-left-icon" src="https://cshy.store/file/sysFile/wechart/xinpintuijian.png">
              </image>
              <view class="active-title-1">
                <image class="active-title-1-icon active-title-2-icon"
                  src="https://cshy.store/file/sysFile/wechart/cate_header_bg_2.png">
                </image>
                <text class="text">真低价不用比</text>
              </view>
            </view>
          </view>
          <swiperXp :tempArr="newProducts"></swiperXp>
        </view>
      </view>

      <!-- 精选榜单 -->
      <view class="active-box margin-t-0 active-box3" v-if="siftProducts && siftProducts.length > 0">
        <view class="active-row" :style="{
          'background-image': 'url(' + banner3 + ')',
        }">
          <view class="active-header">
            <view class="active-header-left">
              <image class="active-header-left-icon" src="https://cshy.store/file/sysFile/wechart/jingxuanbangdan.png">
              </image>
              <view class="active-title-1">
                <image class="active-title-1-icon active-title-3-icon"
                  src="https://cshy.store/file/sysFile/wechart/cate_header_bg_3.png">
                </image>
                <text class="text">精选好物趋势洞察</text>
              </view>
            </view>
            <view class="active-header-right" @click.stop="
              goPage(
                '/pages/goods/goods_list/active_index?title=精选榜单&feature=2'

              )">
              <text class="describe">全部榜单</text>
              <view class="iconfont icon-jiantou"></view>
            </view>
          </view>
          <swiperJx :tempArr="jxArr"></swiperJx>
        </view>
      </view>
      <!-- 首页展示 -->
      <view class="page_content" :style="'margin-top:' + marTop + 'px;'" v-if="navIndex == 0">
        <!-- 首页推荐 -->
        <!-- :class="iSshowH?'on':''" -->
        <van-sticky @change="changeSticky">
          <view class="sticky-box" :class="{ 'sticky-box-fiexd': isSticky }" :style="'top:' + marTop + 'px;'">
            <view class="sticky-box-grid">
              <scroll-view class="scroll-view_H" style="width: 100%" scroll-x="true" scroll-with-animation
                :scroll-left="tabsScrollLeft" @scroll="scroll">
           
                <view class="search-sort">
                  <view class="search-sort-box">
                    <view class="search-sort-item" :class="{ 'search-sort-item-active': searchActive == 0 }"
                      @click="changeTabSearch(0)">
                      综合排序
                    </view>
                    <view @click="changePriceSearch()" class="search-sort-item search-price"
                      :class="{ 'search-sort-item-active': searchActive == 1 }">
                      <text>价格</text>
                      <!-- <van-icon name="chat-o" /> -->
                      <view class="search-price-font">
                        <image v-if="params.priceOrder == 'desc' && searchActive == 1" src='https://cshy.store/file/sysFile/wechart/up.png'></image>
					<image v-else-if="params.priceOrder == 'asc' && searchActive == 1" src='https://cshy.store/file/sysFile/wechart/down.png'></image>
					<image v-else src='https://cshy.store/file/sysFile/wechart/horn.png'></image>


                        <!-- <van-icon name="arrow-up" class="arrow-up" :class="{
                          'search-price-font-active':
                            params.priceOrder == 'desc' && searchActive == 1,
                        }" />
                        <van-icon name="arrow-down" class="arrow-down" :class="{
                          'search-price-font-active':
                            params.priceOrder == 'asc' && searchActive == 1,
                        }" /> -->
                      </view>
                    </view>
                    <view class="search-sort-item" @click="changeSaleSearch"
                      :class="{ 'search-sort-item-active': searchActive == 2 }">
                      <text>销量</text>
                      <view class="search-price-font">
                        <image v-if="params.salesOrder == 'desc' && searchActive == 2" src='https://cshy.store/file/sysFile/wechart/up.png'></image>
					<image v-else-if="params.salesOrder == 'asc' && searchActive == 2" src='https://cshy.store/file/sysFile/wechart/down.png'></image>
					<image v-else src='https://cshy.store/file/sysFile/wechart/horn.png'></image>

                       
                      </view>
                     
                    </view>
                    <view class="search-sort-item" @click="changeShowType()"
                      :class="{ 'search-sort-item-active': searchActive == 3 }">
                      <image class="search-sort-icon" :src="('https://cshy.store/file/sysFile/wechart/grid.png')"
                        mode="aspectFit" v-if="defType == 'row'" lazy-load="false">
                      </image>
                      <image v-if="defType == 'grid'" class="search-sort-icon"
                        :src="('https://cshy.store/file/sysFile/wechart/seach-1.png')" mode="aspectFit"
                        lazy-load="false">
                      </image>
                    </view>
                  </view>
                </view>
              </scroll-view>
            </view>
          </view>
        </van-sticky>

        <!-- 首发新品 -->

        <productGrid v-if="defType == 'grid'" :iSshowH="iSshowH" @goDetail="goDetail" :loading="loading"
          :goodScroll="goodScroll" :tempArr="tempArr"></productGrid>
        <view v-if="defType == 'row'" style="padding: 0 16px; padding-right: 0">
          <goodList :bastList="tempArr"></goodList>
        </view>
      </view>
    </view>
   
  </view>
</template>

<script>
import Auth from '@/libs/wechat'
// Import Swiper Vue.js components
// import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
// import 'swiper/css';

var statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px'
let app = getApp()
import {
  getIndexData,
 
  setCouponReceive,
  productListCategoryFeature,
  activitySecKillQueryByCateId,
  getTemlIds,
} from '@/api/api.js'
// #ifdef MP-WEIXIN

// import {
// 	SUBSCRIBE_MESSAGE,
// 	TIPS_KEY
// } from '@/config/cache';
// #endif
// #ifdef H5
import { follow } from '@/api/public.js'
// #endif
import { getShare } from '@/api/public.js'

import goodList from '@/components/goodList'
 
 
import ClipboardJS from '@/plugin/clipboard/clipboard.js'
import { goShopDetail } from '@/libs/order.js'
import { mapGetters } from 'vuex'
 
import countDown from '@/components/countDown'
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
// #ifndef MP
import { kefuConfig } from '@/api/public'
import { getWechatConfig } from '@/api/public'
// #endif
import Loading from '@/components/Loading/index.vue'
const arrTemp = [
  'beforePay',
  'afterPay',
  'refundApply',
  'beforeRecharge',
  'createBargain',
  'pink',
]
import productGrid from '@/components/productGrid.vue'
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
import swiperMs from './swiperMs.vue'
import swiperXp from './swiperXp.vue'
import swiperJx from './swiperJx.vue'
// import "swiper/swiper-bundle.css";
// import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  computed: {
    ...mapGetters(['isLogin', 'uid']),
  },
  components: {
   
    goodList,
 
 
    countDown,

    recommend,
  
    Loading,
    productGrid,
    swiperMs,
    swiperXp,
    swiperJx,
    //   swiper,
    // swiperSlide
    //  Swiper,
    //   SwiperSlide,
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        speed: 2000,
        autoplay: {
          delay: 3000,

          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // 显示分页
        pagination: {
          el: '.swiper-pagination',
          clickable: true, //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // 修改默认点击左右箭头样式
        // navigation: {
        // nextEl: ".swiper-button-next",
        //prevEl: ".swiper-button-prev",
        //},
      },

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
      logoUrl: ('https://cshy.store/file/sysFile/wechart/0.jpg'),
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
        keyword: '',
        priceOrder: '',
        salesOrder: '',
        news: 0,
        page: 1,
        limit: 20,
        cid: 0,
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
      banner1: ('https://cshy.store/file/sysFile/wechart/zhuangshi2.png'),
      banner2: ('https://cshy.store/file/sysFile/wechart/zhuangshi3.png'),
      banner3: ('https://cshy.store/file/sysFile/wechart/zhuangshi4.png'),
      advertisementCommodityList: [
        {
          title: '限时39.9',
          img: ('https://cshy.store/file/sysFile/wechart/img_home_banner.png'),
        },
        {
          title: '限量99元',
          img: ('https://cshy.store/file/sysFile/wechart/img_home_banner.png'),
        },
      ],
      manu: [
        {
          name: '精品推荐',
        },
        {
          name: '9.9元封顶',
        },
        {
          name: '19.9元封顶',
        },
        {
          name: '29.9元封顶',
        },
        {
          name: '39.9元封顶',
        },
        {
          name: '59.9元封顶',
        },
        {
          name: '69.9元封顶',
        },
      ],

      nav_logo: ('https://cshy.store/file/sysFile/wechart/0.jpg'),

      activeIcon1: ('https://cshy.store/file/sysFile/wechart/active-icon1.png'),
      activeIcon2: ('https://cshy.store/file/sysFile/wechart/active-icon2.png'),
      activeIcon3: ('https://cshy.store/file/sysFile/wechart/active-icon3.png'),
      activeIcon4: ('https://cshy.store/file/sysFile/wechart/active-icon4.png'),
      activeIcon5: ('https://cshy.store/file/sysFile/wechart/active-icon5.png'),
      activeIcon6: ('https://cshy.store/file/sysFile/wechart/active-icon6.png'),
      activeIcon7: ('https://cshy.store/file/sysFile/wechart/active-icon7.png'),
      isSticky: false,
      jxArr: [],
      searchActive: 0,

      defType: 'row',
      newProducts: [], //新品
      siftProducts: [], //精选
      seckillProducts: [], //秒杀
    }
  },
  onLaunch() { },
  watch: {
    ProductNavindex(newVal) {
      // 监听当前选中项
      // this.setTabList()
    },
    listActive(newVal) {
      // 监听当前选中项
      // this.setTabList()
    },
  },

  onLoad(options) {
    var that = this

    let self = this
    this.$set(this.params, 'cid', options.cid || 0)
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
    this.getActiveGoods()
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
  methods: {
    goSearch(){
      uni.reLaunch({
        url: '/pages/goods_search/index',
      })
    },
    async getActiveGoods() {
      // 0是否热卖isHot;1
      // 是否优惠isBenefit;
      // 2 是否精品isBest;
      // 3 是否新品isNew;
      // 4 是否放心用isSafe;
      // 5 是否安心吃isEnjoy;
      //  秒杀
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await activitySecKillQueryByCateId({
          cateId: this.params.cid,
        })
        this.seckillProducts = res.data
        //  新品
        let data = await productListCategoryFeature({
          categoryId: this.params.cid,
          feature: 3,
        })
        this.newProducts = data.data
        // 精选
        let data1 = await productListCategoryFeature({
          categoryId: this.params.cid,
          feature: 2,
        })

        this.siftProducts = data1.data
        this.jxArr = []
        for (var i = 0; i < this.siftProducts.length; i += 3) {
          this.jxArr.push(this.siftProducts.slice(i, i + 3))
        }
      } finally {
        uni.hideLoading()
      }
    },
    changeShowType() {
      this.defType = this.defType == 'row' ? 'grid' : 'row'
    },
    changeTabSearch(index) {
      this.searchActive = index
      this.params.page = 1
      this.loadend = false
      this.loading = false
     this.goodScroll=true
      this.$set(this, 'tempArr', [])
      this.params.priceOrder = null
      this.params.salesOrder = null
      this.getGroomList()
    },
    changePriceSearch() {
      this.searchActive = 1
      this.params.priceOrder = this.params.priceOrder == 'asc' ? 'desc' : 'asc'
      this.params.page = 1
      this.loadend = false
      this.goodScroll=true
      this.loading = false
      this.$set(this, 'tempArr', [])
      this.getGroomList()
    },
    changeSaleSearch() {
      this.goodScroll=true
      this.searchActive = 2
      this.params.salesOrder = this.params.salesOrder == 'asc' ? 'desc' : 'asc'
      this.params.page = 1
      this.loadend = false
      this.loading = false
      this.$set(this, 'tempArr', [])
      this.getGroomList()
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

    onSwiper(swiper) {
      console.log(swiper)
    },
    onSlideChange() {
      console.log('slide change')
    },

    changeSticky(e) {
      this.isSticky = e
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
        // uni.setNavigationBarTitle({
        //   title: '首页',
        // })
        // that.$set(that, 'logoUrl', res.data.logoUrl)
        // that.$set(that, 'site_name', '首页')
        // that.$set(that, 'imgUrls', res.data.banner)
        // that.$set(that, 'menus', res.data.menus)
        // that.$set(that, 'roll', res.data.roll ? res.data.roll : [])
        // #ifdef H5
        // that.$store.commit('SET_CHATURL', res.data.yzfUrl)

        // #endif
        // that.$set(that, 'explosiveMoney', res.data.explosiveMoney)
        // that.goodType = res.data.explosiveMoney[0].type
        this.getGroomList()
        // this.shareApi()
    
        // #ifdef H5
        // that.subscribe = res.data.subscribe;
        // #endif
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
    onLoadFun() { },
 
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
      getProductslist(this.params).then(({ data }) => {
        this.iSshowH = false
        this.loading = false
        this.goodScroll = data.list.length >= this.params.limit
        this.params.page++
        this.tempArr = this.tempArr.concat(data.list)
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
    console.log('Current Swiper instance object', this.swiper)
    // this.swiper.slideTo(3, 1000, false)
    // this.setTabList()
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

<style lang="scss" lang="scss">
.search-sort {
  background: #fff;

  font-size: 30rpx;
  border-radius: 20rpx;
  font-weight: 400;
  color: #2b2b2b;

  .search-sort-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search-sort-icon {
      width: 44rpx;
      height: 44rpx;
      margin-left: 3rpx;
    }

    .search-sort-item {
      position: relative;
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .search-sort-item-active {
      font-weight: 500;
      color: $base-color-1;
    }

    .search-sort-item::after {
      position: absolute;
      right: 0;
      content: '';
      width: 2rpx;
      height: 30rpx;
      background: #e5e5e5;
    }

    .search-sort-item:last-child::after {
      width: 0;
    }

    .search-price {
      display: flex;
      justify-content: center;
      align-items: center;

      .search-sort-icon {
        width: 24rpx;
        height: 13rpx;
        margin-bottom: 5rpx;
      }

      .search-sort-icon:last-child {
        margin-bottom: 0;
      }
    }

    .search-price-font {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 40rpx;
      margin-left: 10rpx;
      color: #2b2b2b;
      font-size: 24rpx;
      display: flex;
   
    align-items: center;
    justify-content: center;
image{
  width: 15rpx;
    height: 19rpx;
    margin-left: 10rpx;
}
      .arrow-up {
        position: relative;
        top: 4rpx;
      }

      .arrow-down {
        position: relative;
        top: -4rpx;
      }

      .search-price-font-active {
        color: $base-color-1;
      }
    }

    .search-price-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

.swiper-pagination-progressbar {
  background: rgba(255, 193, 118, 0.4);
  width: 651rpx;
  height: 4rpx;
  border-radius: 3rpx;

  /deep/ .swiper-pagination-progressbar-fill {
    background: #fc7f0c;
    border-radius: 3rpx;
    height: 4rpx;
  }
}

.swiper-pagination {
  position: absolute;
  top: 420rpx;
}

.swiper-pagination2 {
  left: 20rpx;
  position: absolute;
  top: 420rpx;
}

.swiper-pagination3 {
  position: absolute;
  left: 20rpx;
  top: 568rpx;
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
  background-image: url('https://cshy.store/file/sysFile/wechart/yhjsy.png');
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
      background-image: url('https://cshy.store/file/sysFile/wechart/lingyhj.png');
      background-size: 100% 100%;
    }

    .listHui {
      background-image: url('https://cshy.store/file/sysFile/wechart/weiling.png');
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

.sticky-box {}

.sticky-box-grid {
  margin: 30rpx;
  display: flex;
  flex-direction: row;
  border-radius: 20rpx;
  z-index: 99;
  background: #fff;
  padding: 20rpx 30rpx;
  padding-right: 0;
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
  // background: linear-gradient(180deg, #fff 0%, #f5f5f5 100%);

  .header {
    width: 100%;

    // padding: 28rpx 30rpx;
    .advertisement {
      width: 750upx;
      height: 575upx;
      // position: relative;
      height: 274rpx;
      // background: linear-gradient(270deg, #fe3b7f 0%, #ff7c5c 100%);
    }

    .advertisement-show {
      height: 100rpx;
    }

    .serch-wrapper {
      align-items: center;

      padding-top: 20rpx;

      margin: 0 30rpx;

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

    
  }

  .active-box {
    margin: 0 30rpx;
    margin-top: -158rpx;

    border-radius: 20rpx;

    .active-swipper {
      background: #fff;
      padding: 20rpx;
      border-radius: 20rpx;
      overflow: hidden;

      .active-swiper-tip {
        font-size: 26rpx;

        font-weight: 400;
        color: #e91331;
        margin: 20rpx 0;
      }
    }

    .active-row {
      width: 690rpx;

      background-size: 690rpx 180rpx;
      background-repeat: no-repeat;
      background-position: 0 0;

      .active-header {
        margin-left: 20rpx;
        padding-top: 75rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15rpx;

        .active-header-left {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          .active-header-left-icon {
            width: 172rpx;
            height: 50rpx;
          }

          .active-title-1 {
            font-size: 24rpx;

            color: #fff;

            margin-left: 14rpx;
            position: relative;

            .active-title-1-icon {
              width: 122rpx;
              height: 40rpx;

              position: absolute;
              left: 0;
              top: 0;
              z-index: 9;
            }

            .active-title-2-icon {
              width: 173rpx;
            }

            .active-title-3-icon {
              width: 217rpx;
            }

            .text {
              position: relative;
              z-index: 99;
              margin-left: 13rpx;
              line-height: 40rpx;
            }
          }

          .active-title-2 {
            font-size: 26rpx;
            font-weight: 400;
            color: #9d8c82;
          }
        }

        .active-header-right {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 20rpx;

          .describe {
            font-size: 28rpx;
            font-weight: 400;
            color: #666666;
            margin-right: 10rpx;
          }

          .iconfont {
            font-size: 28rpx;
          }
        }
      }
    }
  }

  .active-box2 {
    margin-bottom: 30rpx;

    .active-swipper {
      background: none;
    }

    .active-row {
      background-size: 690rpx 565rpx;
    }

    .active-header {
      padding-top: 59rpx !important;
    }
  }

  .active-box3 {
    .active-header {
      padding-top: 24rpx !important;
    }

    .active-row {
      background-size: 690rpx 129rpx;
    }

    .active-header-right,
    .describe {
      font-size: 28rpx !important;

      font-weight: 400 !important;
      color: #ab5303 !important;
    }
  }

  .margin-t-0 {
    margin-top: 0;
  }

  .active-row {}

  .page_content {
    min-height:50vh;
    background-color: #f4f4f4;
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
        margin-right: 30rpx;

        .item-grid {
          display: flex;
        }

        .txt {
          font-size: 30rpx;
          color: #2b2b2b;
          font-weight: 600;
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

          .txt::after {
            content: '';
            position: absolute;
            width: 18rpx;
            height: 6rpx;
            background: linear-gradient(270deg, #fe3b7f 0%, #ff7c5c 100%);
            border-radius: 3rpx;
            top: 48rpx;
            right: 40%;
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

// .mp-bg {
//   position: absolute;
//   left: 0;

//   top: 98rpx;

//   width: 100%;
//   height: 304rpx;

// }</style>
