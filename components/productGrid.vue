<template>
  <view>
    <view class="index-product-wrapper" :class="iSshowH ? 'on' : ''">
    <view
      class="list-box animated"
      :class="tempArr.length > 0 ? 'fadeIn on' : ''"
    >
      <view
        class="item"
        v-for="(item, index) in tempArr"
        :key="index"
        @click="goDetail(item)"
      >
        <view class="pictrue">
          <span
            class="pictrue_log pictrue_log_class"
            v-if="item.activityH5 && item.activityH5.type === '1'"
            >秒杀</span
          >
          <span
            class="pictrue_log pictrue_log_class"
            v-if="item.activityH5 && item.activityH5.type === '2'"
            >砍价</span
          >
          <span
            class="pictrue_log pictrue_log_class"
            v-if="item.activityH5 && item.activityH5.type === '3'"
            >拼团</span
          >
          <image :src="item.image" mode=""></image>
        </view>
        <view class="text-info">
          <view class="title van-multi-ellipsis--l2">{{ item.storeName }}</view>
          <view class="price-box">
            <view class="price">
              {{ item.price }}<text>元</text>
              <view class="txt" v-if="item.checkCoupon">券</view>
            </view>
            <!-- <view class="old-price"
              >{{ item.otPrice }}元</view
            > -->
          </view>
        </view>
      </view>
    </view>
    <view class="loadingicon acea-row row-center-wrapper" v-if="goodScroll">
      <text
        class="loading iconfont icon-jiazai"
        :hidden="loading == false"
      ></text>
    </view>
    <view class="mores-txt  acea-row row-center-wrapper" v-if="!goodScroll&&showTip">
      <text>我是有底线的</text>
    </view>  </view>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    goodScroll: {
      type: Boolean,
      default: false,
    },
    tempArr: {
      type: Array,
      default: [],
    },
    iSshowH:{
      type: Boolean,
      default: false,
    },
    showTip:{
      type: Boolean,
      default: true,
    }
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
    goDetail(item) {
      this.$emit('goDetail', item)
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
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
 .index-product-wrapper {
      margin-bottom: 110rpx;
      padding: 0 30rpx;
      &.on {
        min-height: 1500rpx;
      }

      .list-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        .item {
          width: 335rpx;
          margin-bottom: 20rpx;
          background-color: #fff;
          border-radius: 20rpx;
          overflow: hidden;

          image {
            width: 100%;
            height: 335rpx;background-image: url(https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif);
              background-size: 100% 335rpx;
              background-position: no-repeat;
              background-position: 0;
          }

          .text-info {
            padding: 20rpx;

            .title {
              color: #2b2b2b;
              font-size: 30rpx;
              // height: 84rpx;
            }
            .price-box {
              display: flex;
              justify-content: space-between;
              margin-top: 10rpx;
            }
            .old-price {
              font-size: 28rpx;
              color: #9a9a9a;
              text-decoration: line-through;

              text {
                margin-right: 2px;
                font-size: 20rpx;
              }
            }

            .price {
              display: flex;
              align-items: flex-end;
              color: $theme-color;
              font-size: 34rpx;
              font-weight: 400;

              text {
                padding-bottom: 4rpx;
                font-size: 24rpx;
                font-weight: 800;
              }

              .txt {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 28rpx;
                height: 28rpx;
                margin-left: 15rpx;
                margin-bottom: 10rpx;
                border: 1px solid $theme-color;
                border-radius: 4rpx;
                font-size: 22rpx;
                font-weight: normal;
              }
            }
          }
        }

        &.on {
          display: flex;
        }
      }
    }
    .mores-txt{

    }
</style>
