<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-03-19 14:33:44
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-31 16:25:43
 * @FilePath: \cshy-h5\pages\index\components\cate.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="classification" v-if="eleValue&&eleValue.childConfigList&&eleValue.childConfigList.length>0">
 
    <view
      class="classification-grid"
      v-for="item in eleValue.childConfigList"
      :key="item.id"
      @click="goPage(item.link)"
    >
      <image class="classification-img" :src="item.img"> </image>
      <view class="classification-text">
        {{ item.title }}
      </view>
      <view class="tip" v-if="item.tip">
        {{ item.tip }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    eleValue: {
      type: Object,
      default: () => {},
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
.classification {
  display: flex;
  justify-content: flex-start;

  margin-right: 32rpx;
  margin-left: 32rpx;
  flex-wrap: wrap;
  .classification-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 25rpx;
    width: 118rpx;
    position: relative;
    .tip {
      position: absolute;
      right: -32rpx;
      top: -19rpx;
      background-image: url('https://cshy.store/file/sysFile/wechart/tip.png');
      background-size: 100%;
      background-position: 0;
      width: 97rpx;
      height: 37rpx;
      font-size: 18rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 37rpx;
      text-align: center;
    }
    .classification-img {
      width: 86rpx;
      height: 86rpx;
      border-radius: 50%;
    }
    .classification-text {
      font-size: 26rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #2b2b2b;
      line-height: 37rpx;
      margin: 9rpx 0 30rpx 0;
    }
  }
  .classification-grid:nth-child(5n) {
    margin-right: 0;
  }
}
</style>
