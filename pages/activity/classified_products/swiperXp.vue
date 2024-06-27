<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-01-03 14:21:30
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-26 17:08:53
 * @FilePath: \cshy-h5\pages\activity\classified_products\swiperXp.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="swiper swiper-xp" style="position: relative">
    
    <scroll-view scroll-x="true" >
    <view class="swiper-wrapper active-grid swiper-slide-ms">
      <view
        class="swiper-slide swiper-slide-xp"
        v-for="item in tempArr"
        :key="item.id"
        @click="goPage('/pages/goods/goods_details/index?id=' + item.id)"
      >
        <view class="swiper-slide-xp-item">
          <image class="active-img" :src="item.image" mode="aspectFill">
          </image>
          <view class="swiper-slide-disprice">
            <view class="active-text van-ellipsis">
              {{ item.storeName }}
            </view>
          
            <view class="active-price">
              <text class="font-28 fw-5">{{ item.price }}元</text>
              <text class="sale-text"
                >销量：{{ item.sales }}&nbsp;&nbsp;库存：{{ item.stock }}</text
              >
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="swiper-pagination swiper-pagination2"></view>
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
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {
    var mySwiper = new Swiper('.swiper-xp', {
      slidesPerView: 'auto',
      loopedSlides: 5,

      // slidesPerView: 3,
      spaceBetween: 10,
      loop: false,
      speed: 1000,
      autoplay: false,
      autoplayDisableOnInteraction: false,
      disableOnInteraction: true,
      observer: true,
      observeParents: true,
      // pagination: '.swiper-pagination',
      paginationClickable: true,
      mousewheelControl: true,
      pagination: {
        el: '.swiper-pagination2',
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
  top: 420rpx;
}
.swiper-xp {
  overflow: hidden;
  margin: 0 20rpx;
  .swiper-wrapper {
    .active-img {
      border-radius: 20rpx 20rpx 0px 0px;
      width: 490rpx;
      height: 209rpx;
      border: none;
      background-image: url(https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif);
      background-size: 199rpx 199rpx;
      background-repeat: no-repeat;
      background-position: center;
      background-color: rgb(245, 245, 245);
    }
    .swiper-slide-disprice {
      padding: 14rpx 10rpx;
    }
    .active-text {
      width: 468rpx;
      margin-top: 0;
    }
    .org-price {
      font-size: 18rpx;
      padding: 5rpx 14rpx;
      border-radius: 20rpx;
      font-weight: 400;
      color: #ffffff;
      background: linear-gradient(90deg, #fc7d09 0%, #ffab4a 100%);
    }
    .active-price {
      background: rgba(94, 84, 239, 0.2);
      border-radius: 14rpx;
      padding: 8rpx 13rpx;
      margin-top: 20rpx;
    }
    .font-28 {
      font-weight: 28rpx;
    }
    .fw-5 {
      font-weight: 500;
    }
    .sale-text {
      font-size: 24rpx;
      margin-left: 27rpx;
      font-weight: 400;
      color: #fc7e0a;
      line-height: 33rpx;
    }
    .swiper-slide {
    }
    .swiper-slide-xp {
      width: 490rpx;
      border-radius: 20rpx;
      height: 396rpx;
      margin-bottom: 54rpx;
      margin-right: 30rpx;
    }
    .swiper-slide-xp-item {
      background: #fff;
      width: 100%;
      border-radius: 20rpx;
    }
    .swiper-slide-xp:last-child {
      // margin-right: 20rpx;
      .swiper-slide-xp-item {
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
