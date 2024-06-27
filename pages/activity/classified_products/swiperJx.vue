<template>
  <view class="swiper-jx" style="position: relative">
    <scroll-view scroll-x="true" >
    <view class="swiper-wrapper active-grid swiper-wrapper-jx">
      <view
        class="swiper-slide swiper-slide-jx"
        v-for="childList in tempArr"
        :key="childList.id"
      >
        <view
          v-for="item in childList"
          class="swiper-slide-jx-grid" :key="item.id"
          @click="goPage('/pages/goods/goods_details/index?id=' + item.id)"
        >
          <image class="active-img" :src="item.image" mode="aspectFill"> </image>
          <view class="silde-right">
            <view class="active-text van-ellipsis">
              {{ item.storeName }}
            </view>
            <view class="sale-price">
              <text class="font-24">{{item.sales}}人买过</text>
            </view>
            <view class="active-price">
              <text class="font-24">{{ item.price }}元</text>
              <text class="qiang"> 抢购 </text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="swiper-pagination swiper-pagination3"></view>
  </scroll-view>
  </view>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  //import引入组件才能使用
  components: {},
  props: {
    tempArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {  goPage(url) {
      if (!url) {
        return this.$util.Tips({
          title: '即将开放，敬请期待！',
        })
      }
      uni.navigateTo({
        url: url,
      })
    },},
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {
    var mySwiper = new Swiper('.swiper-jx', {
      slidesPerView: 'auto',
      loopedSlides: 5,
      spaceBetween: 15,
      loop: false,
      speed: 1000,
      autoplay: true,
      autoplayDisableOnInteraction: false,
      disableOnInteraction: true,
      observer: true,
      observeParents: true,
      // pagination: '.swiper-pagination',
      paginationClickable: true,
      mousewheelControl: true,
      debugger: true,
      pagination: {
        el: '.swiper-pagination3',
        type: 'progressbar',
      },
    })
  },
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
  left: 20rpx;
  top: 568rpx;
}
 
 
.swiper-jx {
      padding-left: 20rpx;
      background: #fff;
      padding-top: 30rpx;
      border-radius: 0 0 20rpx 20rpx;
      padding-bottom: 20rpx;
      overflow: hidden;
    
      .swiper-wrapper-jx {
      }
      .swiper-slide-jx {
        width: 594rpx;
        flex-wrap: wrap;
        flex-direction: column;
        display: flex;
        height: calc((100% - 64rpx) / 3) !important;
        .swiper-slide-jx-grid {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          margin-bottom: 32rpx;
          .active-img {
            width: 144rpx;
            height: 144rpx;
            border: none;
            border-radius: 20rpx;  background-image: url(https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif);
      background-size: 100%;
      background-position: no-repeat;
      background-position: 0;
       
          }
          .silde-right {
            margin-left: 20rpx;
            width: 400rpx;
            .active-text {
              margin-top: 0;
            }
            .sale-price {
              box-shadow: 2px 2px 0px 0px #fc7d0947;
              border-radius: 20px;
              background: rgba(252, 125, 9, 0.3);
              text-indent: 20rpx;
              color: #e91331;
              margin: 10rpx 0 14rpx 0;
            }
            .qiang {
              margin-bottom: 0;
              margin-top: 0;
              width: 100rpx;
              height: 50rpx;
              background: linear-gradient(270deg, #3660ef 0%, #7e5bff 100%);
              border-radius: 25rpx;
              line-height: 50rpx;
            }
          }
        }
      }
    }
    .active-grid {
      
      .active-img {
        width: 199rpx;
        height: 199rpx;
        border: 7rpx solid #85a8fd;
        border-radius: 30rpx;
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
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 600;
        color: #e91331;
        line-height: 40rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .font-34 {
        font-size: 34rpx;
      }
      .qiang {
        display: inline-block;
        text-align: center;
        margin-top: 10rpx;
        font-size: 28rpx;

        font-weight: 400;
        color: #ffffff;
        line-height: 40rpx;
        width: 182rpx;
        height: 50rpx;
        background: linear-gradient(270deg, #3660ef 0%, #7e5bff 100%);
        border-radius: 25rpx;
        margin-bottom: 44rpx;
      }
      .active-price-org {
        margin-top: 2rpx;

        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #9a9a9a;
        line-height: 40rpx;
        text-decoration: line-through;
      }
    }
</style>
