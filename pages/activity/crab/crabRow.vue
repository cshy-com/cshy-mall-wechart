<template>
  <view>
    <view class="brand-container">
      <view class="brand-item" v-for="(item, index) in list" :key="index"  @click="goPage('/pages/goods/goods_details/index?id=' + item.id)">
      <!-- {{item.image}} -->
        <image class="brand-url" :src="item.image" mode=""></image>
        <view class="discount-box">
          <view class="line-1">
            <view class="type-left">
              <view class="van-ellipsis type-left-title"> {{ item.title }}型</view>
              <view class="discount">{{ ( item.price /item.otPrice).toFixed(2)*10}}折</view>
            </view>
            <!-- <view class="type-right">库存 199</view> -->
          </view>
          <!-- <view class="line-2"> 母蟹 2.5两4只 | 公蟹5.0两8只 </view> -->
          <view class="line-3">
            <view class="type-left">
              <view> <text class="big">{{item.price}}</text>元/省 {{ Number( item.otPrice)-Number(item.price)}}元</view>
            </view>
            <view class="type-right">抢</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return { brandUrl: ('https://cshy.store/file/sysFile/wechart/active-icon3.png') }
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
.brand-container {
  display: flex;
  position: relative;

  margin: 20rpx;
  flex-direction: column;
  .brand-item {
    padding: 20rpx;
    background: #ffffff;
    width: 100%;
    height: 210rpx;
    border-radius: 20rpx;
    margin-bottom: 20rpx;
    font-size: 28rpx;
    display: flex;
    .brand-url {
      width: 170rpx;
      height: 170rpx;
      border-radius: 20rpx 20rpx 0px 0px;
    }
    .discount-box {
      // flex: 1;
      width: 430rpx;
      margin-left: 10rpx;
      font-size: 28rpx;
      color: #666666;
      display: flex;
    flex-direction: column;
    justify-content: space-between;
      .line-1 {
        display: flex;

        justify-content: space-between;

        .type-left {
          font-size: 30rpx;
          font-weight: 500;
          color: #2b2b2b;
          display: flex;
          width: 100%;justify-content: space-between;
          .type-left-title{
            width: 300rpx;
          }
        }
        .discount {
          width: 85rpx;
          height: 38rpx;
          background: rgba(252, 125, 9, 0.2);
          border-radius: 19rpx;
          font-size: 24rpx;

          font-weight: 400;
          color: #fc7d09;
          line-height: 33rpx;
          margin-left: 10rpx;
          text-align: center;
          line-height: 38rpx;
        }
        .type-right {
        }
      }
      .line-2 {
        margin: 10rpx 0 23rpx 0;
      }
     
      .line-3 {
        color: #e91331;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        .big {
          font-size: 34rpx;
          font-weight: 500;
        }
        .type-right {
          width: 100rpx;
          height: 55rpx;
          background: $bg-gradient;
          border-radius: 28rpx;
          font-size: 32rpx;
          font-family: AlimamaShuHeiTi-Bold, AlimamaShuHeiTi;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          line-height: 55rpx;
        }
      }
    }
  }
}
</style>
