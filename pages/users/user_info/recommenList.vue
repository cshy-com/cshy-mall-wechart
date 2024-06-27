<template>
  <view>
    <view
      class="content-box"
      v-for="(item, listIndex) in list"
      :key="item.id"
      @click="($event) => goDetail(item)"
    >
      <view class="content-item">
        <view class="content-item-left">
          <view class="title flex-between-center">
            <text class="title-text font-30-500 over-ellipsis-1">{{
              item.createTime || ''
            }}</text>

            <text v-if="item.replied == 1" class="status1 font-26">已回复</text>
            <text v-if="item.replied == 0" class="status1 font-26 status2"
              >未回复</text
            >
          </view>
          <view class="sub-title over-ellipsis-2 font-26">
            {{ item.content || '' }}
          </view>
          <view class="line"> </view>
          <!-- <view class="createTime font-26">
            <text> 建议时间： {{ item.createTime }} </text>
          </view> -->
          <view class="createTime font-26">
            <text> 联系方式： {{ item.mobile || '' }} </text>
          </view>
          <view class="img-list-box" v-if="item.picture">
            <text class="label font-26"> 建议凭证 </text>
            <view class="img-list-content">
              <image
                class="bachground-def-img"
                :lazy-load="true"
                :lazy-load-margin="0"
                :mode="'aspectFill'"
                v-for="(img, index) in item.picture"
                :key="img.id"
                :src="img || defImg"
                @click.stop="previewImg(listIndex, index)"
                @imageError="imageError($event, index, listIndex)"
              >
              </image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- <noMore v-if="more == 'noMore'"></noMore> -->
  </view>
</template>

<script>
// import noMore from '@/components/noMore.vue'

export default {
  //import引入组件才能使用
  // components: { noMore },
  props: {
    opinionList: {
      type: Array,
      defualt: () => [],
    },
    more: {
      type: String,
      default: 'more',
    },
    isGoDetails: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      list: [],
    }
  },
  // 计算属性
  computed: {
    defImg() {
      return this.$fileUrl + '/sysFile/img_default.png'
    },
  },
  // 监听data中的数据变化
  watch: {
    opinionList: {
      handler(e) {
        if (e && e.length > 0) {
          e.forEach((item) => {
            let { picture } = item
            if (picture && typeof picture == 'string') {
              picture = picture.split(',')
            }
            this.list.push({ ...item, picture })
          })
        }
      },
      deep: true,
      immediate: true,
    },
  },
  // 方法集合
  methods: {
    goDetail(item) {
      if (!this.isGoDetails) {
        return
      }
      uni.navigateTo({
        url: '/pages/users/user_info/feedback_history_detail?id=' + item.id,
      })
    },
    imageError(e, index, indexList) {
      this.list[indexList]['picture'][index] = defImg
    },
    previewImg(listIndex, index) {
      uni.previewImage({
        urls: this.list[listIndex].picture,
        current: index,
        loop: true,
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
.content-item {
  padding: 30rpx;

  display: flex;

  justify-content: space-between;
  position: relative;
  flex-direction: column;
  background: #fff;
  margin-top: 12rpx;
  margin-left: 12rpx;
  margin-right: 12rpx;
  border-radius: 14rpx;
  .content-item-left {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title-text {
        color: #333333;
        line-height: 42rpx;
        width: 80%;

        height: 42rpx;
        display: inline-block;
      }
    }
    .sub-title {
      margin-bottom: 20rpx;
      // max-height: 74rpx;
      margin-top: 18rpx;

      color: #888888;
      line-height: 37rpx;
    }
    .status1 {
      margin-left: auto;

      color: #c0c0c0;
      line-height: 37rpx;
    }
    .status2 {
      color: #75bb44;
    }

    .line {
      margin: 20rpx 0;
      border-top: 2rpx solid #eeeeee;
      width: 100%;
      height: 1rpx;
    }
    .createTime {
      color: #c0c0c0;
      line-height: 37rpx;
      margin-bottom: 10rpx;
    }
  }
  .reply {
  }
}
.img-list-box {
  .label {
    color: #c0c0c0;
    line-height: 37rpx;
    margin-bottom: 15rpx;
    display: inline-block;
  }
  .img-list-content {
    display: flex;

    image {
      width: 163rpx;
      height: 163rpx;
      border-radius: 14rpx;
      margin-right: 12rpx;

      background-color: #f5f5f5;
      border-radius: 15rpx 15rpx 0 0;
    }
  }
}
</style>
