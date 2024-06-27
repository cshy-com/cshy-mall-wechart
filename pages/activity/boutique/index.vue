<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-25 10:46:08
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-27 09:53:46
 * @FilePath: \cshy-h5\pages\activity\crab\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="mainer-container">
      <image class="xieli--logo-img" :src="logoUrl" mode=""></image>
      <van-sticky @change="changeSticky">
        <view class="common-tab">
          <view class="common-tab-nav">
            <tabBig ref="tabBig" :navList="navList" @changeTab="changeTab">
            </tabBig>
          </view>
          <view class="common-tab-right" @click="openPicker">
            <image class="common-tab-right-icon" :src="('https://cshy.store/file/sysFile/wechart/down-icon.png')">
            </image>
          </view>
        </view>
      </van-sticky>
      <view>
        <view v-for="(item, index) in tabList" :key="item.id" class="banner-wrap" :id="'banner-wrap' + (index + 1)">
          <view class="brand-box" @click="goPage('/pages/goods/goods_details/index?id=' + item.id)">
            <view class="brand-box-item">
              <view class="brand-ranking-box">
                {{ index + 1 }}
              </view>
              <view class="brand-box-row">
                <image class="brand-box-img" :src="item.image"> </image>
                <view class="brand-box-right">
                  <view class="row-1">
                    <view class="brand-box-title van-multi-ellipsis--l2">
                      {{ item.storeName }}
                    </view>
                    <view> 销量 {{ item.sales }} </view>
                  </view>
                  <view class="row-2">
                    <view><text class="red">{{ item.price }}元</text></view>
                    <view class="brand-box-btn">
                      <image class="brand-box-btn-icon"
                        :src="('https://cshy.store/file/sysFile/wechart/qiang-icon.png')">
                      </image>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <uni-popup background-color="#fff" ref="popup" type="right" 
      :style="{ height: '100%', width: '75%' }">
    <!-- <van-popup get-container="body" v-model="popupShow" position="right" :closeable="true"
      :close-icon-position="'top-left'" :style="{ height: '100%', width: '75%' }"> -->
      <view class="popup-box">
        <view class="popup-content">
          <view class="popup-content-ul">
            <view class="popup-content-item" @click="changeNav(item.id, index)" :class="{
              'popup-content-active': active == index,
            }" v-for="(item, index) in navList" :key="item.id">
              {{ item.label }}
            </view>
          </view>
        </view>
      </view>
    </uni-popup>
    <!-- </van-popup> -->
  </view>
</template>

<script>
import tabBig from './../components/tabBig.vue'
import { getCategoryList } from '@/api/store.js'

import { productListCategoryFeature } from '@/api/api.js'


//   import grid from './grid'
//   import crabRow from './crabRow'
export default {
  //import引入组件才能使用
  components: {
    // grid, crabRow ,
    tabBig,

  },
  props: {},
  data() {
    return {
      popupShow: false,
      navList: [
        // { id: 1, code: '0', label: '特价专区' },
        // { id: 2, code: '1', label: '饮品零食' },
        // { id: 3, code: '2', label: '日用百货' },
        // { id: 4, code: '3', label: '粮油干调' },
        // { id: 5, code: '4', label: '个护清洁' },
        // { id: 6, code: '5', label: '家用电器' },
        // { id: 7, code: '6', label: '生鲜水果' },
        // { id: 8, code: '7', label: '母婴用品' },
        // { id: 9, code: '8', label: '美妆护肤' },
        // { id: 10, code: '9', label: '烘焙蛋糕' },
      ],
      tabList: [
        // {
        //   name: '199',
        //   id: '2',
        // },
        // {
        //   name: '299',
        //   id: '3',
        // },
        // {
        //   name: '399',
        //   id: '3',
        // },
        // {
        //   name: '499',
        //   id: '3',
        // },
        // {
        //   name: '599',
        //   id: '3',
        // },
        // {
        //   name: '699',
        //   id: '3',
        // },
      ],
      brandList: [
        {
          type: '799',
          discount: '4.7',
          tip: '到手价',
          price: '399',
          id: '1',
        },
        {
          type: '799',
          discount: '4.7',
          tip: '到手价',
          price: '399',
          id: '2',
        },
        {
          type: '799',
          discount: '4.7',
          tip: '到手价',
          price: '399',
          id: '3',
        },
        {
          type: '799',
          discount: '4.7',
          tip: '到手价',
          price: '399',
          id: '1',
        },
        {
          type: '799',
          discount: '4.7',
          tip: '到手价',
          price: '399',
          id: '2',
        },
        {
          type: '799',
          discount: '4.7',
          tip: '到手价',
          price: '399',
          id: '2',
        },
      ],

      brandUrl: ('https://cshy.store/file/sysFile/wechart/active-icon3.png'),
      bottomUrl: ('https://cshy.store/file/sysFile/wechart/bottom-img.png'),
      navUrl: ('https://cshy.store/file/sysFile/wechart/card-bg.png'),
      itemUrl: ('https://cshy.store/file/sysFile/wechart/tab-actived.png'),
      logoUrl: ('https://cshy.store/file/sysFile/wechart/banner2.png'),
      tabActivedUrl: ('https://cshy.store/file/sysFile/wechart/tab-actived.png'),
      rightIcon: ('https://cshy.store/file/sysFile/wechart/card-icon.png'),
      active: 0,
      tabs: [
        {
          id: 1,
          name: '待付款',
          disabled: false,
        },
        {
          id: 2,
          name: '待收货',
          disabled: false,
        },
        {
          id: 3,
          name: '待评价',
          disabled: false,
        },
        {
          id: 4,
          name: '退款/售后',
          disabled: true,
        },
        {
          id: 5,
          name: '我的订单',
          disabled: false,
        },
      ],
      current: 0,

      isSticky: false,
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
    openPicker(){
      this.$refs.popup.open('right')
    },
    getAllCategory() {
      getCategoryList().then((res) => {
        res.data.forEach((e, index) => {
          this.navList.push({
            id: index + 1,
            code: index,
            label: e.name,
            cid: e.id,
          })
        })
        this.$nextTick(() => {
          this.getList()
        })
      })
    },
    async getList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await productListCategoryFeature({
          categoryId: this.navList[this.current].cid,
          feature: 2,
        })
        this.tabList = res.data
      } finally {
        uni.hideLoading()
      }
    },
    getContainer() {
      return document.querySelector('.mainer-container')
    },
    changeNav(id, index) {
      this.$refs.tabBig.swichMenu(id - 1, index)
      this.$refs.popup.close()
    },
    changeSticky(e) {
      this.isSticky = e
    },
    changeTab(index) {
      this.active = index
      this.current = index
      this.getList()
    },
    getClick(id, index) {
      // 0 0 是全部
      this.activeTabIndex = index
      console.log(id)
    },
    changeTopNav(code, index) {
      document.documentElement.scrollTop = 450
      // return
      // }
      // if (index < 2) {
      // 	document.documentElement.scrollTop = 600
      // } else {
      // 	let anchorId = 'banner-wrap' + code

      // 	document.documentElement.scrollTop =
      // 		document.getElementById(anchorId).offsetTop - 100
      // }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.getAllCategory()
  },
  onShow() { },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, //生命周期：创建之前
  beforeMount() { }, //生命周期：挂载之前
  beforeUpdate() { }, //生命周期：更新之前
  updated() { }, //生命周期：更新之后
  beforeDestroy() { }, //生命周期：销毁之前
  destroyed() { }, //生命周期：销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>

<style scoped lang="scss">
.popup-box {
  padding: 30rpx;
  padding-top: 100rpx;

  .popup-content-ul {
    display: flex;
    flex-wrap: wrap;
    width: 280px;
  }

  .popup-content-item {
    width: 210rpx;
    height: 88rpx;
    background: #ffffff;
    border-radius: 20rpx;
    border: 2rpx solid #e5e5e5;
    font-size: 30rpx;

    font-weight: 400;
    color: #363737;
    line-height: 88rpx;
    margin-left: 30rpx;
    margin-bottom: 30rpx;
    text-align: center;
  }

  .popup-content-active {
    background: #f5ded4;

    border: 2rpx solid #f97d49;
  }
}

/deep/ .van-sticky--fixed .detail_tab_content {
  background: #fff;
  height: 138rpx;
  padding-top: 20rpx;
  padding-left: 16rpx;
}

page {
  background: #f8f8ff;
}

.mainer-container {
  .xieli--logo-img {
    width: 750rpx;
    height: 838rpx;
  }

  .brand-box {
    .brand-box-item {
      background: #fff;
      padding: 20rpx;
      border-radius: 20rpx;
      position: relative;
      margin-bottom: 20rpx;

      .brand-ranking-box {
        position: absolute;
        left: 20rpx;
        top: 0;
        width: 49rpx;
        height: 63rpx;
        background-image: url('https://cshy.store/file/sysFile/wechart/ranking-icon.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: 0 0;
        font-size: 32rpx;

        font-weight: 500;
        color: #2b2b2b;
        text-align: center;
        line-height: 63rpx;
        z-index: 99;
      }

      .brand-box-row {
        display: flex;
      }

      .brand-box-img {
        width: 170rpx;
        height: 170rpx;
        border-radius: 20rpx;
        margin-right: 30rpx;
      }

      .brand-box-right {
        flex: 1;
      }

      .row-1 {
        font-size: 26rpx;
        height: 84rpx;
        font-weight: 400;
        color: #666666;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 31rpx;
      }

      .row-2 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 28rpx;

        font-weight: 400;
        color: #9a9a9a;

        .red {
          font-size: 34rpx;

          font-weight: 500;
          color: #e91331;
        }
      }

      .brand-box-title {
        width: 309rpx;

        font-size: 30rpx;

        font-weight: 500;
        color: #2b2b2b;
      }

      .brand-box-btn {
        width: 100rpx;
        height: 55rpx;
        background: $bg-gradient;
        border-radius: 28rpx;
        display: flex;
        justify-content: center;
        align-items: center;

        .brand-box-btn-icon {
          width: 34rpx;
          height: 34rpx;
        }
      }
    }
  }
}

.banner-wrap {
  position: relative;
  margin: 0 30rpx;
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
  padding-top: 16rpx;
  padding-bottom: 16rpx;
  padding-left: 30rpx;
  position: relative;

  .common-tab-nav {
    width: 644rpx;
  }

  .common-tab-right {
    position: absolute;
    top: 0;
    right: 0;
    color: #2b2b2b;

    .common-tab-right-icon {
      width: 87rpx;
      height: 108rpx;
    }
  }

  /deep/ .van-tab {
    margin-right: 30rpx;
    // position: relative;
    // width: 200rpx;
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
    // padding: 23rpx 40rpx;
  }

  /deep/ .title-class {
    width: 200rpx;
  }

  /deep/ .van-tab__text {
    // padding: 23rpx 40rpx;
  }

  /deep/ .van-tab--active {
    font-size: 30rpx;

    font-weight: 500;
    color: #f8f8ff;
    background-image: url('https://cshy.store/file/sysFile/wechart/tab-actived.png');
  }

  /deep/ .van-tabs__nav--line.van-tabs__nav--complete {
    padding: 0;
  }

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
