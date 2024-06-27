<template>
  <view>

    <view class="brand-container">
          <view
            class="brand-item"
            v-for="(item, index) in list"
            :key="index"  @click="goPage('/pages/goods/goods_details/index?id=' + item.id)"
          >
            <image class="brand-url" :src="item.image" mode=""></image>
            <view class="discount-box">
              <view class="line-1">
                <view class="type-left van-ellipsis">{{ item.title }}型</view>
                <view class="type-right">{{ ( item.price /item.otPrice).toFixed(2)*10}}折</view>
              </view>
              <view class="line-2"> 到手价 </view>
              <view class="line-3"> {{item.price}}元 </view>
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
    list:{
      type:Array,
      default:()=>[]
    }
  },
  data() {
      return {
        brandUrl: ('https://cshy.store/file/sysFile/wechart/active-icon3.png'),
      };
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
  created() {

  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { },//生命周期：创建之前
  beforeMount() { },//生命周期：挂载之前
  beforeUpdate() { },//生命周期：更新之前
  updated() { },//生命周期：更新之后
  beforeDestroy() { },//生命周期：销毁之前
  destroyed() { },//生命周期：销毁完成
  activated() { },//如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style scoped lang="scss">
.brand-container {
    display: flex;
    position: relative;
    width: 690rpx;
    padding: 22rpx 20rpx;
    justify-content: center;
    flex-wrap: wrap;
    .brand-item {
      margin-top: 20rpx;
      background: #ffffff;
      width: 209rpx;
      border-radius: 20rpx;

      margin-right: 12rpx;
      .brand-url {
        width: 100%;
        height: 209rpx;
        border-radius: 20rpx 20rpx 0px 0px;
      }
      .discount-box {
        padding: 13rpx 12rpx;
        .line-1 {
          display: flex;
          font-size: 28rpx;

          font-weight: 400;
          color: #2b2b2b;
          justify-content: space-between;
        }
        .line-2 {
          width: 83rpx;
          height: 31rpx;
          background: linear-gradient(-90deg, #fc7d09 0%, #ffab4a 100%);
          margin: 9rpx 0 13rpx 0;
          border-radius: 10rpx 10rpx 10rpx 0;
          position: relative;
          font-size: 18rpx;
          text-align: center;
          line-height: 31rpx;
          font-weight: 400;
          color: #ffffff;
        }
        .line-2::after {
          position: absolute;
          left: 0;
          bottom: -10rpx;
          content: '';
          width: 14rpx;
          height: 10rpx;
          background-image: url(https://cshy.store/file/sysFile/wechart/sanjiaoxing.png);
          background-position: 0 0;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }
        .line-3 {
          width: 185rpx;
          height: 56rpx;
          font-size: 28rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #e91331;
          background-image: url(https://cshy.store/file/sysFile/wechart/qiang.png);
          background-position: 0 0;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          text-indent: 13rpx;
          padding-top: 7rpx;
        }
        .type-right {
          width: 74rpx;
          height: 33rpx;
          background: rgba(252, 125, 9, 0.2);
          border-radius: 17rpx;
          // opacity: 0.2;
          font-size: 22rpx;
          text-align: center;
          color: #fc7d09;

          color: #fc7d09;
        }
      }
    }
    .brand-item:nth-child(3n) {
      margin-right: 0;
    }
    .brand-item:nth-child(1),
    .brand-item:nth-child(2),
    .brand-item:nth-child(3) {
      margin-top: 0;
    }
  }
</style>