<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-25 10:46:08
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-02-29 14:21:04
 * @FilePath: \cshy-h5\pages\activity\crab\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="mainer-container">
      <image class="xieli--logo-img" :src="logoUrl" mode=""></image>
      <van-sticky @change="changeSticky">
        <view class="common-tab">
          <tabBig ref="tabBig" :navList="navList" @changeTab="changeTab">
          </tabBig>
        </view>
      </van-sticky>
      <view v-if="activeTabIndex == 0">
        <view v-for="(item, index) in CateArr" class="banner-wrap">
          <view
            class="banner-nav"
            :style="{
              'background-image': 'url(' + navUrl + ')',
            }"
            @click.stop="
              goPage(
                '/pages/goods_list/active_index?id=' +
                  item.id +
                  '&title=' +
                  item.name
              )
            "
          >
            <view>品牌 • {{ item.name }}</view>
          </view>
          <view class="brand-box">
            <image
              class="brand-box-bottom-bg"
              :src="('https://cshy.store/file/sysFile/wechart/band-footer-bg.png')"
            ></image>
            <grid :list="item.productList"></grid>
            <view class="brand-footer">
              <view
                class="brand-footer-more"
                @click="getClick(item.id, index + 1)"
              >
                查看更多
              </view>
            </view>
          </view>
        </view>
        <view class="banner-wrap">
          <view
            class="banner-nav"
            :style="{
              'background-image': 'url(' + navUrl + ')',
            }"
          >
            <view>热销榜单</view>
          </view>
          <view class="brand-box" v-if="CateArr && CateArr.length > 0">
            <image
              class="brand-box-bottom-bg"
              :src="('https://cshy.store/file/sysFile/wechart/band-footer-bg.png')"
            ></image>
            <crabRow :list="CateArr[0].productList"></crabRow>
          </view>
        </view>
      </view>
      <view v-if="activeTabIndex > 0">
        <crabRow :list="CateArr[activeTabIndex - 1].productList"></crabRow>
      </view>
    </view>
  </view>
</template>

<script>
import { activityQueryProductList } from '@/api/api.js'

import grid from './grid'
import crabRow from './crabRow'
import tabBig from './../components/tabBig.vue'
export default {
  //import引入组件才能使用
  components: { grid, crabRow, tabBig },
  props: {},
  data() {
    return {
      navList: [{ label: '全部品牌', id: '1' }],
      brandList: [
        { type: '799', discount: '4.7', tip: '到手价', price: '399', id: '1' },
        { type: '799', discount: '4.7', tip: '到手价', price: '399', id: '2' },
        { type: '799', discount: '4.7', tip: '到手价', price: '399', id: '3' },
        { type: '799', discount: '4.7', tip: '到手价', price: '399', id: '1' },
        { type: '799', discount: '4.7', tip: '到手价', price: '399', id: '2' },
        { type: '799', discount: '4.7', tip: '到手价', price: '399', id: '2' },
      ],
      activeTabIndex: 0,
      isSticky: false,
      brandUrl: ('https://cshy.store/file/sysFile/wechart/active-icon3.png'),
      bottomUrl: ('https://cshy.store/file/sysFile/wechart/bottom-img.png'),
      navUrl: ('https://cshy.store/file/sysFile/wechart/nav-1.png'),
      itemUrl: ('https://cshy.store/file/sysFile/wechart/tab-actived.png'),
      logoUrl: ('https://cshy.store/file/sysFile/wechart/logo-icon1.png'),
      tabActivedUrl: ('https://cshy.store/file/sysFile/wechart/tab-actived.png'),
      CateArr: [],
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
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
    async getList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let data = await activityQueryProductList({
          activityCategoryName: '金秋蟹礼',
        })
        this.CateArr = data.data
        data.data.forEach((item, index) => {
          this.navList.push({
            label: item.name,
            id: index + 2,
          })
        })
      } finally {
        uni.hideLoading()
      }
    },
    changeSticky(e) {
      this.isSticky = e
    },
    changeTab(index) {
      this.activeTabIndex = index
      document.documentElement.scrollTop = 350
    },
    getClick(id, index) {
      this.$refs.tabBig.currentTab = index
      this.activeTabIndex = 1
      console.log(id)
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.getList()
  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>

<style scoped lang="scss">
page {
  background: #f8f8ff;
}
.mainer-container {
  .xieli--logo-img {
    width: 750rpx;
    height: 838rpx;
  }
  .banner-nav {
    width: 726rpx;
    height: 194rpx;
    text-align: center;

    padding-top: 42rpx;
    background-position: 0 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 20rpx 12rpx 0 12rpx;
    .nav-img {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      position: absolute;
    }
    p {
      font-weight: 500;
      color: #363737;
      font-size: 36rpx;
      position: relative;
      padding-bottom: 63rpx;
    }
  }
  .brand-box {
    display: flex;
    justify-content: center;
    margin: 0 30rpx;
    flex-direction: column;

    padding-bottom: 30rpx;
    background-color: #ffc89b;
    border-radius: 0 0 20rpx 20rpx;
    position: relative;
    .brand-box-bottom-bg {
      position: absolute;
      width: 690rpx;
      height: 191rpx;
      bottom: 0;
      left: 0;
    }
  }
  .brand-footer {
    position: relative;
    display: flex;
    justify-content: center;

    margin-left: 30rpx;
    .brand-footer-more {
      width: 316rpx;
      height: 82rpx;
      background-image: url(https://cshy.store/file/sysFile/wechart/more.png);
      background-position: 0 0;
      background-size: 100%;
      background-repeat: no-repeat;
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;

      color: #ffffff;
      line-height: 42rpx;
      padding-top: 20rpx;
      padding-left: 60rpx;
    }
  }
}
.banner-wrap {
  position: relative;
}
.banner-wrap:last-child {
  padding-bottom: 35rpx;
}
/deep/ .van-sticky--fixed {
  .common-tab {
    background: #fff;
  }
}
.common-tab {
  display: flex;
  padding-top: 16rpx;
  padding-bottom: 16rpx;
  padding-left: 30rpx;
  .tab-item {
    margin-right: 30rpx;
    position: relative;
    width: 210rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    font-weight: 400;
    color: #363737;
    background: #ffc89a;
    border-radius: 44px;
    background-position: 0 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .tab-item-on {
    font-weight: 500;
    color: #f8f8ff;
  }
  .tab-item-def {
    background-image: none !important;
  }
}
</style>
