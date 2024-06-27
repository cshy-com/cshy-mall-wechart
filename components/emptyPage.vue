<template>
  <view class="empty-box">
    <image :src="img"></image>
    <view class="txt">{{ title }}</view>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '暂无记录',
    },
    img: {
      type: String,
      default: ('https://cshy.store/file/sysFile/wechart/empty-box.png'),
    },
  },
}
</script>

<style lang="scss">
.empty-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 200rpx;
  padding-bottom: 60rpx;
  image {
    width: 414rpx;
    height: 240rpx;
  }
  .txt {
    font-size: 30rpx;

    color: #666666;
    margin-top: 14rpx;
  }
}
</style>
