<template>
  <view>
    <van-popup
      v-model="show"
      round
      close-on-popstate="true"
      overlay-class="order-success"
    >
      <view class="mode-content">
        <view class="icon">
          <image
            class="order-success-icon"
            src="https://cshy.store/file/sysFile/wechart/order-success.png"
          >
          </image>
        </view>
        <view class="content-box">
          <view class="tip"> 恭喜你！兑换成功 </view>
          <view class="tip-center"
            >温馨提示：商品将在登记后7-15个工作日寄出，请注意查收</view
          >
          <view class="footer-btn">
            <view class="btn left-btn" @click="callPhone">联系客服</view>
            <view class="btn right-btn" @click="confirm">确定</view>
          </view>
        </view>
      </view>
    </van-popup>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    show:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      phone:'15172480645'
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    callPhone(){
      this.$util.makePhoneCall()

    },
    confirm(){
      this.$emit('confirm')
    }
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
/deep/ .van-popup {
  background: transparent;
}
.mode-content {
  width: 631rpx;
  position: relative;
  height: 543rpx;
  display: flex;
  align-items: center;
  flex-direction: column;
  .icon {
    .order-success-icon {
      width: 181rpx;
      height: 181rpx;
    }
  }
  .content-box {
    margin-top: -91rpx;
    padding: 112rpx 43rpx 41rpx 43rpx;
    background: #fff;
    border-radius: 20rpx;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 42rpx;
    text-align: center;
    .tip {
      font-weight: 500;
      margin-bottom: 30rpx;
    }
    .footer-btn {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 40rpx;
      .btn {
        width: 251rpx;
        height: 72rpx;
        border-radius: 36rpx;
        border: 2rpx solid #ff6615;

        color: #ff6413;
        line-height: 72rpx;
      }
      .right-btn {
        background: linear-gradient(90deg, #ff9846 0%, #ff5e0d 100%);
        border: none;
        color: #fafafa;
      }
    }
  }
}
</style>
