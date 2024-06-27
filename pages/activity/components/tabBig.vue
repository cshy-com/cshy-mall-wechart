<template>
  <view class="body-view">
    <scroll-view
      class="top-menu-view"
      scroll-x="true"
      scroll-with-animation
      :scroll-into-view="tabCurrent"
    >
      <view
        class="menu-topic-view"
        v-for="(item, index) in navList"
        :id="'tabNum' + item.id"
        :key="item.id"
        @click="swichMenu(item.id - 1, index)"
      >
        <view
          :class="currentTab == item.id - 1 ? 'menu-topic-act' : 'menu-topic'"
        >
          <text class="menu-topic-text">{{ item.label }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      tabCurrent: 'tabNum1',
    }
  },
  props: {
    navList: {
      type: Array,
      default: () => [],
    },
  },
  onLoad() {},
  methods: {
    swichMenu(id, index) {
      this.currentTab = id
      console.log(11, id)
      this.$emit('changeTab', index)
      this.tabCurrent = 'tabNum' + id
    },
  },
}
</script>

<style scoped lang="scss">
.body-view {
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  align-items: flex-start;
  justify-content: center;
}

.top-menu-view {
  display: flex;

  top: 100rpx;
  left: 0;
  white-space: nowrap;
  width: 100%;

  height: 86rpx;
  line-height: 86rpx;

  .menu-topic-view {
    display: inline-block;
    white-space: nowrap;
    height: 86rpx;
    position: relative;

    .menu-topic-text {
      line-height: 42rpx;
      margin-right: 30rpx;
      font-size: 30rpx;
      color: #363737;
      font-weight: 400;
      color: #303133;
      display: inline-block;
      padding: 23rpx 0rpx;
      background-color: #ffc89a;
      border-radius: 44rpx;
      min-width: 200rpx;

      padding: 20rpx 40rpx;
      text-align: center;
    }

    .menu-topic-act {
      .menu-topic-text {
        position: relative;
        color: #f8f8ff;
        font-weight: 600;
        background-image: url('https://cshy.store/file/sysFile/wechart/tab-actived.png');
        background-size:100% 102rpx;
        background-position: 0;
        background-repeat: no-repeat;
      }
    }
  }
}
</style>
