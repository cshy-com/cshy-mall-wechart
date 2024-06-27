<template>
  <view class="active-box" v-if="eleValue && eleValue.childConfigList && eleValue.childConfigList.length > 0">
    <view class="active-box-tiitle" v-if="activeGoods && activeGoods.length > 0">
      <view class="active-box-tiitle-left">
        <text class="" style="margin-right: 9rpx; margin-left: 40rpx">限时秒杀倒计</text>
        <!-- <van-count-down :time="time">
              <template #default="timeData">
                <text class="skill-min">{{ timeData.hours }}</text
                ><text class="">:</text
                ><text class="skill-min">{{ timeData.minutes }}</text
                ><text class="">:</text
                ><text class="skill-min">{{ timeData.seconds }}</text>
              </template>
</van-count-down> -->
      </view>
      <view class="active-box-tiitle-right">
        <image @click="
          goPage(
            '/pages/goods/goods_list/active_index?id=' +
            activeGoods[0].id +
            '&title=' +
            activeGoods[0].name
          )
          " class="active-box-tiitle-right-img" src="https://cshy.store/file/slill-btn.png" mode="aspectFill">
        </image>
      </view>
    </view>
    <view v-if="
      eleValue.childConfigList && eleValue.childConfigList.length > 0
    " class="active-row">
      <view class="active-grid" v-for="item in eleValue.childConfigList.slice(0, 3)" :key="item.id"
        @click.stop="goPage(item.link)">
        <image class="active-img" :src="item.img" mode="aspectFill">
        </image>


        <view class="active-price">
          <text>{{ item.title }}</text>
        </view>
        <!-- <view class="active-price-org"> {{ item.tip }} </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import { activityQueryProductList } from '@/api/api.js'
export default {
  //import引入组件才能使用
  components: {},
  props: {
    eleValue: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      time:
        new Date(new Date().toLocaleDateString()).getTime() +
        1000 * 60 * 60 * 24 -
        Date.parse(new Date()),
      activeGoods: []
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
    async getList() {
      let data = await activityQueryProductList({
        activityCategoryName: '好货集结',
      })
      this.activeGoods = data.data
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.getList()
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
.active-box {
  .active-box-tiitle {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .active-box-tiitle-left {
      width: 424rpx;
      height: 54rpx;
      background: rgba(255, 229, 222, 1);
      border-radius: 0px 100px 100px 0px;

      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 28rpx;
      color: #e91331;
      line-height: 54rpx;
      text-align: left;
      font-style: normal;
      display: flex;
      align-items: center;

      .skill-min {
        width: 42rpx;
        height: 34rpx;
        line-height: 34rpx;
        background: #e91331;
        border-radius: 4px;
        color: #fff;
        font-weight: 400;
        display: inline-block;

        text-align: center;
      }

      text {
        color: #e91331;
      }
    }

    .active-box-tiitle-right {
      margin-right: 30rpx;

      .active-box-tiitle-right-img {
        width: 216rpx;
        height: 52rpx;
      }
    }
  }

  .active-row {
    margin: 0 30rpx;
    width: 690rpx;
    padding-bottom: 30rpx;
    background-size: 100%;
    background-position: 0;
    padding-top: 23rpx;

    display: flex;
    justify-content: flex-start;

    .active-grid {
      display: flex;
      justify-content: flex-start;
      width: 217rpx;
      font-size: 28rpx;
      margin-right: 20rpx;
      flex-direction: column;

      background: #f5f5f5;
      border-radius: 20rpx;

      .active-img {
        width: 217rpx;
        height: 198rpx;
        border-radius: 20rpx 20rpx 0 0;
        background-image: url(https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif);
        background-size: 100%;
        background-position: no-repeat;
        background-position: 0;
      }

      .active-text {
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #2b2b2b;
        line-height: 40rpx;
        margin: 10rpx 0 6rpx 0;
      }

      .active-price {
        background: linear-gradient(270deg, #ff7c5c 0%, #fe3b7f 100%);
        border-radius: 18rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #fff;
        line-height: 35rpx;
        text-align: center;

        width: 178rpx;
        height: 35rpx;
        margin-left: 19rpx;
        margin-top: 15rpx;
        margin-bottom: 9rpx;
      }

      .font-34 {
        font-size: 34rpx;
      }

      .active-price-org {
        text-align: center;
        font-size: 24rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #9a9a9a;
        line-height: 40rpx;
        text-decoration: line-through;
      }
    }

    .active-grid:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>