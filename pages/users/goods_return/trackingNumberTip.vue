<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-11-22 11:24:45
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2023-11-23 10:46:38
 * @FilePath: \cshy-h5\pages\users\goods_return\trackingNumberTip.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view>
      <view class="page-tip p-30">
        寄出快递后，您可通过以下方式获取快递单号
      </view>
      <image
        class="page-line-img"
        src="/https://cshy.store/file/sysFile/wechart/address-bg.png"
      ></image>

      <view class="page-line"></view>
      <view class="page-box">
        <view class="page-box-header"> 方式1：前往APP/小程序复制快递单号 </view>
        <view class="page-box-content border-bottom">
          如果您已通过APP/小程序等线上方式预约
        </view>
      </view>
      <view class="page-box">
        <view class="page-box-header"> 方式2：对照填写快递单号 </view>
        <view class="page-box-content">
          若您保留了快递单，可通过手动输入快递单号
        </view>
        <view class="page-box-content-gry">
          <view> 点击“填写退货快递单号，手动输入快递单号” </view>
          <image
            class="page-box-content-img"
            src="/https://cshy.store/file/sysFile/wechart/cede.png"
          ></image>
        </view>
      </view>
      <view class="page-box">
        <view class="page-box-header"> 方式3：联系快递员获取快递单号 </view>
        <view class="page-box-content">
          若您未保留或找不到快递单，可联系取件的快递员询问单号。
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {}
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
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
page {
  background: #fff;
}
.p-30 {
  padding: 30rpx;
}
.page-tip {
  font-size: 44rpx;

  color: #2b2b2b;
  padding-bottom: 28rpx;
}
.page-line-img {
  width: 750rpx;
  height: 6rpx;
}
.page-line {
  height: 14rpx;
  width: 750rpx;
  background: #f4f4f4;
}
.page-box {
  padding: 30rpx 30rpx 0 30rpx;
  color: #666666;
  font-size: 30rpx;
  .page-box-header {
    font-size: 32rpx;
    font-weight: 500;
    color: #2b2b2b;
    text-indent: 20rpx;
    position: relative;
  }
  .page-box-header:after {
    position: absolute;
    content: '';
    width: 6rpx;
    height: 32rpx;
    background: #fe4d75;
    border-radius: 50rpx;
    left: 0;
    top: 7rpx;
    display: inline-block;
  }
  .page-box-content {
    padding-bottom: 30rpx;

    margin-top: 20rpx;
  }
  .page-box-content-gry {
    width: 690rpx;
    height: 288rpx;
    background: #f4f4f4;
    border-radius: 20px;
    font-size: 28rpx;
    padding: 32rpx 30rpx;
    .page-box-content-img {
      margin-top: 20rpx;
      width: 629rpx;
      height: 166rpx;
    }
  }
}
.border-bottom {
  border-bottom: 2rpx solid #eeeeee;
}
</style>
