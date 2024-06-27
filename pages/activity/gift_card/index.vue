<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-25 10:46:08
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-02-29 14:21:24
 * @FilePath: \cshy-h5\pages\activity\crab\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="mainer-container">
      <image class="xieli--logo-img" :src="logoUrl" mode=""></image>
      <van-sticky @change="changeSticky">
        <view class="common-tab">
                   
            <tabBig :navList="navList" @changeTab="changeTab"> </tabBig>
     
        </view>
      </van-sticky>
      <view>
        <view
          v-for="(item, index) in CateArr"
          class="banner-wrap"
          :id="'banner-wrap' + (index + 1)"
          :style="{
            'background-image': 'url(' + navUrl + ')',
          }"
        >
          <view class="banner-nav">
            <view class="banner-nav-left">
              <view class="van-ellipsis">{{ item.name.slice(0,3) }}型·好礼甄选</view>
              <view class="banner-nav-more" @click="goPage('/pages/gift/index?typeId='+item.id+'&title='+item.name)"> 查看更多> </view>
            </view>
            <view class="banner-nav-right">
              <image
                class="banner-nav-right-icon"
                :src="('https://cshy.store/file/sysFile/wechart/card-icon.png')"
              ></image>
              <view class="banner-nav-right-text">
                <view>福利</view>
                <view>优品</view>
              </view>
            </view>
          </view>
          <view class="brand-box">
            <view class="brand-box-item" v-for="prod in item.productList.slice(0,3)" :key="prod.productId"
            @click="goPage('/pages/gift/gift_detail?id=' + prod.productId+'&pickupCode=')"
            >
              <image
                class="brand-box-img"
                :src="prod.image"
              >
              </image>
              <view class="brand-box-title van-multi-ellipsis--l2"
                >{{prod.productName}}</view
              >
              <view class="brand-box-btn">立即抢购</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {giftCardByType } from "@/api/api.js"
 
import tabBig from './../components/tabBig.vue'
//   import grid from './grid'
//   import crabRow from './crabRow'
export default {
  //import引入组件才能使用
  components: {
    tabBig,
    // grid, crabRow ,
 
  },
  props: {},
  data() {
    return {
      navList: [
        { id: 1, code: '0', label: '全部卡券' },
        
      ],
      tabList: [
        {
          name: '199',
          id: '2',
        },
        {
          name: '299',
          id: '3',
        },
        {
          name: '399',
          id: '3',
        },
        {
          name: '499',
          id: '3',
        },
        {
          name: '599',
          id: '3',
        },
        {
          name: '699',
          id: '3',
        },
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
      logoUrl: ('https://cshy.store/file/sysFile/wechart/banner1.png'),
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
      active: 0,
      isSticky: false,
      CateArr:[]
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
      let data = await giftCardByType({
        
      })
      data.data.forEach((e,index)=>{
        this.navList.push(
          { id: index+2, code:index+1, label: e.name },
        )
      })
    
      this.CateArr=data.data
    } finally {
        uni.hideLoading()
      }
    },
    changeSticky(e) {
      this.isSticky = e
    },
    changeTab(index) {
      this.changeTopNav(index, this.navList[index].code)
    },
    getClick(id, index) {
      // 0 0 是全部
      this.activeTabIndex = index
      console.log(id)
    },
    changeTopNav(index, code) {
      if (index == 1 || index == 0) {
        document.documentElement.scrollTop = 350
        return
      }
      if (index < 2) {
        document.documentElement.scrollTop = 600
      } else {
        let anchorId = 'banner-wrap' + code

        document.documentElement.scrollTop =
          document.getElementById(anchorId).offsetTop - 100
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.getList()
  },
  onShow() {},
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
/deep/ .van-sticky--fixed .detail_tab_content {
  background: #fff;
  height: 110rpx;
  padding-top: 10rpx;
  padding-left: 30rpx;
}
page {
  background: #f8f8ff;
}

.mainer-container {
  .xieli--logo-img {
    width: 750rpx;
    height: 838rpx;
  }

  .banner-nav {
    font-size: 50rpx;
    margin: 0rpx 75rpx 0 75rpx;
    padding-top: 87rpx;
    font-weight: 500;
    color: #4c3e32;
    display: flex;
    justify-content: space-between;

    .banner-nav-left {
      padding-top: 15rpx;

      .banner-nav-more {
        width: 178rpx;
        height: 48rpx;
        background: #ffffff;
        margin-top: 18rpx;
        border-radius: 20rpx;
        font-size: 26rpx;
        text-align: center;
        font-weight: 400;
        color: #915929;
        line-height: 48rpx;
      }
    }

    .banner-nav-right {
      position: relative;
      font-size: 32rpx;

      font-weight: 600;
      color: #915929;
      line-height: 36rpx;
      width: 164rpx;
      height: 164rpx;

      .banner-nav-right-icon {
        position: absolute;
        width: 100%;
        height: 100%;
      }

      .banner-nav-right-text {
        width: 100%;
        height: 100%;
        flex-direction: column;
        position: relative;
        z-index: 98;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

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
    margin-top: 41rpx;
    justify-content: flex-start;

    position: relative;
    margin-left: 48rpx;

    .brand-box-item {
      width: 199rpx;
      background-color: #fff;
      border-radius: 20rpx;
      margin-right: 12rpx;

      .brand-box-img {
        width: 100%;
        height: 198rpx;
        border-radius: 20rpx 20rpx 0 0;
      }

      .brand-box-title {
        margin: 12rpx 0 14rpx 16rpx;
        font-size: 28rpx;
height: 72rpx;
        font-weight: 400;
        color: #2b2b2b;
      }

      .brand-box-btn {
        width: 152rpx;
        height: 44rpx;
        background: #fc7f0c;
        border-radius: 27rpx;
        font-size: 28rpx;
        text-align: center;
        font-weight: 400;
        line-height: 44rpx;
        color: #ffffff;
        margin-left: 24rpx;
        margin-bottom: 17rpx;
      }
    }

    .brand-box-item:last-child {
      margin-right: 0;
    }
  }
}

.banner-wrap {
  position: relative;
  margin: 0 17rpx;
  height: 712rpx;
  width: 717rpx;
  background-size: 717rpx 712rpx;
  background-position: 0 0;
  margin-bottom: 17rpx;
  background-repeat: no-repeat;
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
