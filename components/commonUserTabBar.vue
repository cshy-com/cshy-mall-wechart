 
<template>
  <view class="tab-bar">
    <view v-for="(tab, index) in tabs" :key="index" @click="switchTab(tab)" safe-area-inset-bottom>
   
     
      <template v-if="index == 0 && currentTab == tab.pagePath">
        <image safe-area-inset-bottom
          class="home-icon"
          :src="
            currentTab === tab.pagePath ? tab.selectedIconPath : tab.iconPath
          "
          mode="aspectFit"
        ></image>
      </template>
      <template v-else>
        <image
          :src="
            currentTab === tab.pagePath ? tab.selectedIconPath : tab.iconPath
          "
          mode="aspectFit"
        ></image>
        <text :class="currentTab === tab.pagePath ? 'active' : ''">{{
          tab.text
        }}</text>
   
      </template>
    </view>
  </view>
</template>
<script>
export default {
  props: {
    currentTab: {
      type: String,
      required: true,
    },
  },
  computed: {
    tabs() {
      return [
        {
          pagePath: '/pages/index/index',
          iconPath: 'https://cshy.store/file/sysFile/wechart/navTab/ic_tab_home_no.png',
          selectedIconPath: 'https://cshy.store/file/sysFile/wechart/navTab/ic_tab_home_yes.png',
          text: '首页',
        },
        {
          pagePath: '/pages/goodsAll/index',
          iconPath: 'https://cshy.store/file/sysFile/wechart/navTab/ic_tab_fenl_no.png',
          selectedIconPath: 'https://cshy.store/file/sysFile/wechart/navTab/ic_tab_fenl_yes.png',
          text: '全部商品',
        },
        {
          pagePath: '/pages/goods_search/index',
          iconPath: 'https://cshy.store/file/sysFile/wechart/navTab/ic_tab_sousuo_no.png',
          selectedIconPath: 'https://cshy.store/file/sysFile/wechart/navTab/ic_tab_sousuo_yes.png',
          text: '搜索',
        },
        {
          pagePath: '/pages/order_addcart/order_addcart',
          iconPath: 'https://cshy.store/file/sysFile/wechart/navTab/ic_tab_gwc_no.png',
          selectedIconPath: 'https://cshy.store/file/sysFile/wechart/navTab/ic_tab_gwc_yes.png',
          text: '购物车',
        },
        {
          pagePath: '/pages/user/index',
          iconPath: 'https://cshy.store/file/sysFile/wechart/navTab/ic_tab_wode_no.png',
          selectedIconPath: 'https://cshy.store/file/sysFile/wechart/navTab/ic_tab_wode_yes.png',
          text: '我的',
        },
      ]
    },
  },
  methods: {
    switchTab(tab) {
      uni.reLaunch({
        url: tab.pagePath,
      })
    },
  },
}
</script>
<style  >
.tab-bar {
  justify-content: space-around;
  align-items: center;
  /* height: 98upx; */
  background-color: #fff;
  border-top: 1px solid #E5E5E5;
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-bottom: 9upx;
  padding-bottom: constant(safe-area-inset-bottom);/*兼容 IOS<11.2*/
padding-bottom: env(safe-area-inset-bottom); /*兼容 IOS>11.2*/
}

.tab-bar view {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-bar image {
  width: 50upx;
  height: 50upx;
  margin-top: 9upx;
}
.tab-bar .home-icon {
  width: 86upx;
  height: 86upx;
  margin-bottom: 5upx;
}
.tab-bar text {
  font-size: 20upx;
  margin-top: 3upx;
  line-height: 28upx;
  color: #363737;
  margin-bottom: 9upx;
}

.tab-bar text.active {
  font-weight: bold;
 
  
}
</style>
