<template>
  <view class="swipper-active" v-if="eleValue&&eleValue.childConfigList&&eleValue.childConfigList.length>0">
        <view class="swipper-box">
      

          <swiper class="swiper" indicator-color="#ebedf0" indicator-active-color="rgb(255, 255, 255)"  circular :indicator-dots="true" :autoplay="false"    style="height: 335rpx; height: 420rpx"
				:duration="500">
				<swiper-item   @click="goPage(item.link)" v-for="(item,index) in eleValue.childConfigList.slice(0, eleValue.childConfigList.length-2)" :key="index">
          <image
               
                class="swipe-img"
                :src="item.img"
                mode="aspectFill"
              >
              </image
            >
				</swiper-item>
				 
			</swiper>


        </view>
        <view class="swipper-right">
          <image v-for="item in eleValue.childConfigList.slice( eleValue.childConfigList.length-2)" :key="item.id"
            @click="goPage(item.link)"
            class="swipper-right-img"
            :src="item.img"
            mode="aspectFill"
          >
          </image>
        
        </view>
      </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: { eleValue: {
      type: Object,
      default: () => {},
    },},
  data() {
      return {

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
  .swipper-active {
    display: flex;
    padding: 30rpx;
    
    .swipper-box{
      width: 335rpx;
      height: 420rpx;
      /deep/ .wx-swiper-dot {
				 width: 6rpx;
				 height: 6rpx;
				 background: #FFFFFF;
				 border-radius: 50%;
			}
      /deep/ .van-swipe__indicator {
        width: 8rpx;
        height: 8rpx;
      }
      /deep/ .van-swipe__indicator--active {
        width: 10rpx;
        height: 10rpx;
      }
     
    }
    .swipe-img {
        width: 335rpx;
        height: 420rpx;
		border-radius: 30rpx;
      }
    .swipper-right {
      margin-left: 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      .swipper-right-img {
        width: 335rpx;
        height: 200rpx;
      }
      .swipper-right-img:first-child {
        margin-bottom: 20rpx;
      }
    }
  }
</style>