<template>
  <view class="city-box">
    <view class="bg-box">
      <image
        class="bg bg-1"
        :src="('https://cshy.store/file/sysFile/wechart/city-bg1.png')"
      ></image>
      <image
        class="bg bg-2"
        :src="('https://cshy.store/file/sysFile/wechart/city-bg2.png')"
      ></image>
      <image
        class="bg bg-3"
        :src="('https://cshy.store/file/sysFile/wechart/city-bg3.png')"
      ></image>
    </view>
    <view class="city-box-content">
      <view
        v-for="(item) in cityCateArr"
        class="city-item" :key="item.id"
        :style="{
          'background-image': 'url(' +  (JSON.parse(item.image)[0].sattDir||'https://cshy.store/file/sysFile/wechart/city-cate-bg-0.png') +')',
        }"
         @click.stop="goPage('/pages/goods/goods_list/active_index?id=' + item.id+'&title='+item.name)"
      >
      <!-- {{item }} -->
        <image class="city-item-img" :src="(JSON.parse(item.sliderImages)[0].sattDir||'https://cshy.store/file/sysFile/wechart/img_home_banner.png')"></image>
        <view class="city-item-btn">
          <image
            class="city-item-btn-img"
            :src="'https://cshy.store/file/sysFile/wechart/city-btn.png'"
          ></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { activityQueryProductList } from '@/api/api.js'

export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      cityCateArr: [
     
      ],
    }
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
    async getList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
      let data = await activityQueryProductList({
        activityCategoryName: '城市特色',
      })
      this.cityCateArr=data.data
    } finally {
        uni.hideLoading()
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.getList()
  },
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
.city-box {
  position: relative;
}

.bg-box {
  position: absolute;
  display: flex;
  flex-direction: column;

  .bg {
    width: 750rpx;
    height: 1355rpx;
  }
}
.city-box-content {
  padding-top: 1001rpx;
  .city-item {
    width: 696rpx;
    height: 594rpx;
    position: relative;
    margin: 0 27rpx;
    background-size: 100% 100%;
    background-position: 0 0;
    background-position: no-repeat;
    margin-bottom: 40rpx;
    .city-item-img {
      margin-top: 165rpx;
      margin-left: 72rpx;
      width: 550rpx;
      height: 290rpx;
      background: #d8d8d8;
      border-radius: 20px;
    }

    .city-item-btn {
      margin-top: 30rpx;
      margin-left: 191rpx;
      .city-item-btn-img {
        width: 313rpx;
        height: 79rpx;
      }
    }
  }
}
</style>
