<template>
  <view>
    <view class="productSort">
      <view
        class="aside"
        :style="{ bottom: tabbarH + 'px', height: height + 'rpx' }"
      >
        <scroll-view
          scroll-y="true"
          scroll-with-animation="true"
          style="height: 100%"
        >
          <view class="item-box">
            <view
              class="item acea-row row-center-wrapper"
              :class="index == navActive ? 'on' : ''"
              v-for="(item, index) in productList"
              :key="index"
              @click="tap(index, 'b' + index)"
              ><text class="item-text">{{ item.name }}</text></view
            ></view
          >
        </scroll-view>
      </view>

      <view class="conter">
        <scroll-view
          scroll-y="true"
          :scroll-into-view="toView"
          :style="'height:' + childHeight + 'rpx;'"
          @scroll="scroll"
          scroll-with-animation="true"
        >
          <block v-for="(item, index) in childProductList" :key="index">
            <view class="listw" :id="'b' + index">
              <view class="title acea-row row-center-wrapper">
                <view class="line"></view>
                <view class="name">{{ item.name }}</view>
                <view class="line"></view>
              </view>
              <view class="list acea-row">
                <block v-for="(itemn, indexn) in item.child" :key="indexn">
                  <navigator
                    hover-class="none"
                    :url="
                      '/pages/goods/goods_list/index?cid=' +
                      itemn.id +
                      '&title=' +
                      itemn.name
                    "
                    class="item acea-row row-column row-middle"
                  >
                    <view
                      class="picture"
                      :style="{
                        'background-color': itemn.extra ? 'none' : '#f7f7f7',
                      }"
                    >
                      <image
                        mode="aspectFill"
                        @error="handleImageError(itemn)"
                        :src="itemn.extra"
                      ></image>
                    </view>
                    <view class="name line1">{{ itemn.name }}</view>
                  </navigator>
                </block>
              </view>
            </view>
          </block>
          <view :style="'height:' + height + 'rpx;'" v-if="number < 15"></view>
        </scroll-view> </view
    ></view>
    <!-- <commonUserTabBar
      :currentTab="'/pages/goods_cate/goods_cate'"
    ></commonUserTabBar> -->
  </view>
</template>

<script>
import { getCateChild, getCateParent } from '@/api/store.js'
import ClipboardJS from '@/plugin/clipboard/clipboard.js'
export default {
  data() {
    return {
      navlist: [],
      productList: [],
      navActive: 0,
      number: '',
      height: 0,
      childHeight: 0,
      hightArr: [],
      toView: '',
      tabbarH: 0,
      childProductList: [],
      defImage: 'https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif',
    }
  },
  onLoad(options) {
    this.getAllCategory()
  },
  onShow() {},
  methods: {
    handleImageError(item) {
      item.extra = this.defImage
    },
    loadImg() {},
    errorImg() {},
    getChildList() {
      uni.showLoading({
        title: '加载中',
      })
      getCateChild({
        parentId: this.productList[this.navActive].id,
      })
        .then((res) => {
          this.childProductList = res.data
        })
        .finally(() => {
          uni.hideLoading()
        })
    },
    infoScroll() {
      // let that = this
      // let len = that.productList.length
      // let child =
      //   that.productList[len - 1] && that.productList[len - 1].child
      //     ? that.productList[len - 1].child
      //     : []
      // this.number = child ? child.length : 0

      // //设置商品列表高度
      uni.getSystemInfo({
        success: (res) => {
          this.height = res.windowHeight * (750 / res.windowWidth)
          this.childHeight = res.windowHeight * (750 / res.windowWidth)
        },
      })
      // let height = 0
      // let hightArr = []
      // for (let i = 0; i < len; i++) {
      //   //获取元素所在位置
      //   let query = uni.createSelectorQuery().in(this)
      //   let idView = '#b' + i
      //   query.select(idView).boundingClientRect()
      //   query.exec(function (res) {
      //     let top = res[0].top
      //     hightArr.push(top)
      //     that.hightArr = hightArr
      //   })
      // }
    },
    tap(index, id) {
      // this.toView = id
      this.navActive = index
      this.getChildList()
    },
    getAllCategory: function () {
      let that = this
      getCateParent().then((res) => {
        that.productList = res.data
        that.infoScroll()
        setTimeout(() => {
          this.getChildList()
        }, 500)
      })
    },
    scroll: function (e) {
      // let scrollTop = e.detail.scrollTop
      // let scrollArr = this.hightArr
      // for (let i = 0; i < scrollArr.length; i++) {
      //   if (scrollTop >= 0 && scrollTop < scrollArr[1] - scrollArr[0]) {
      //     this.navActive = 0
      //   } else if (
      //     scrollTop >= scrollArr[i] - scrollArr[0] &&
      //     scrollTop < scrollArr[i + 1] - scrollArr[0]
      //   ) {
      //     this.navActive = i
      //   } else if (
      //     scrollTop >=
      //     scrollArr[scrollArr.length - 1] - scrollArr[0]
      //   ) {
      //     this.navActive = scrollArr.length - 1
      //   }
      // }
    },
    searchSubmitValue: function (e) {
      if (this.$util.trim(e.detail.value).length > 0)
        uni.navigateTo({
          url: '/pages/goods/goods_list/index?searchValue=' + e.detail.value,
        })
      else
        return this.$util.Tips({
          title: '请填写要搜索的产品信息',
        })
    },
  },
}
</script>

<style scoped lang="scss">
.productSort {
  display: flex;
}
.productSort .header {
  width: 100%;
  height: 96rpx;
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  border-bottom: 1rpx solid #f5f5f5;
}

.productSort .header .input {
  width: 700rpx;
  height: 60rpx;
  background-color: #f5f5f5;
  border-radius: 50rpx;
  box-sizing: border-box;
  padding: 0 25rpx;
}

.productSort .header .input .iconfont {
  font-size: 26rpx;
  color: #555;
}

.productSort .header .input .placeholder {
  color: #999;
}

.productSort .header .input input {
  font-size: 26rpx;
  height: 100%;
  width: 597rpx;
}

.productSort .aside {
  // position: fixed;
  width: 198rpx;
  left: 0;
  top: 0;
  // background-color: #f1f1f1;
  overflow-y: scroll;
  overflow-x: overlay;
  position: relative;
  // z-index: 99999;
  height: auto;
  //  background: #fff;
  /deep/ .uni-scroll-view {
    overflow-x: overlay;
  }
  // margin-top: 96rpx;
}
.productSort .aside .item-box {
  width: 180rpx;
  background: #fff;
  min-height: 100vh;
  .item:last-child {
    // padding-bottom: 30rpx;
  }
}
.productSort .aside .item {
  font-size: 30rpx;
  color: #333333;
  width: 180rpx;
  height: 88rpx;
  .item-text {
    width: 120rpx;
    text-align: left;
    display: inline-block;
  }
}

.productSort .aside .item.on {
  // background-color: #fff;
  // border-left: 4rpx solid #fc4141;

  text-align: center;
  color: $base-color-1;
  font-weight: bold;
  position: relative;
}
.productSort .aside .item.on::after {
  position: absolute;
  content: '';
  width: 6rpx;
  height: 18rpx;
  background: $bg-gradient;
  border-radius: 3rpx;
  left: 14rpx;
  top: 35rpx;
}
.productSort .aside .item.on::before {
  position: absolute;
  content: '';
  width: 16rpx;
  height: 25rpx;
  right: -16rpx;
  top: 31rpx;
  background-image: url(https://cshy.store/file/sysFile/wechart/cate-right.png);
  background-size: 16rpx 25rpx;
  background-position: 0%;
  background-repeat: no-repeat;
}
.productSort .conter {
  margin: 0rpx 0 0 14rpx;
  // padding: 0 14rpx;
  background-color: #f4f4f4;
  flex: 1;
}

.productSort .conter .listw {
  // padding-top: 20rpx;
  margin-left: 7rpx;
}

.productSort .conter .listw .title {
  height: 104rpx;
}

.productSort .conter .listw .title .line {
  width: 94rpx;
  height: 1rpx;
  background-color: #e5e5e5;
}

.productSort .conter .listw .title .name {
  font-size: 30rpx;
  color: #666;
  margin: 0 20rpx;
}

.productSort .conter .list {
  flex-wrap: wrap;
}

.productSort .conter .list .item {
  width: 156rpx;
  margin-top: 20rpx;
  margin-right: 22rpx;
}
.productSort .conter .list {
  .item:nth-child(1),
  .item:nth-child(2),
  .item:nth-child(3) {
    margin-top: 0;
  }
  .item:nth-child(3n) {
    margin-right: 0;
  }
}
.productSort .conter .list .item .picture {
  width: 156rpx;
  height: 156rpx;
  border-radius: 10rpx 10rpx 0 0;
}

.productSort .conter .list .item .picture image {
  width: 100%;
  height: 100%;
  border-radius: 10rpx 10rpx 0 0;

  div {
    background-color: #f7f7f7;
  }
}

.productSort .conter .list .item .name {
  line-height: 56rpx;
  width: 156rpx;
  border-radius: 0px 0px 10rpx 10rpx;
  // padding: 10rpx 0;
  text-align: center;
  font-size: 26rpx;
  background: #fff;
  font-weight: 400;
  color: #333333;
}
</style>
