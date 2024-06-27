<template>
  <view
    style="
      display: flex;
      justify-content: center;
      width: 100%;
      margin-bottom: 20px;
    "
    v-if="eleValue && eleValue.childConfigList.length > 0"
  >
   
    <swiper
      class="swiper"
      v-if="eleValue.childConfigList && eleValue.childConfigList.length> 1"
      :indicator-dots="false"
      :autoplay="false"
      style="width: 90%; height: 800rpx"
      :duration="500"
    >
      <swiper-item
        v-for="item in eleValue.childConfigList"
        :key="item.id"
        @click="goPage(item.link)"
      >
        <image
          style="width: 100%; height: 800rpx"
          class="swipe-img"
          :src="item.img"
          mode="aspectFill"
        >
        </image>
      </swiper-item>
    </swiper>

    <template v-else>
      <image
        v-for="item in eleValue.childConfigList"
        :key="item.id"
        style="width: 90%; height: 800rpx"
        :src="item.img"
        @click="goPage(item.link)"
      >
      </image>
    </template>
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
        return
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
<style scoped></style>
