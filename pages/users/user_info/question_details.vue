<template>
  <view>
    <view class="question-title">
      {{ queInfo.title }}
    </view>

    <view class="conter">
      <jyf-parser
        :html="queInfo.answer"
        ref="article"
        :tag-style="tagStyle"
      ></jyf-parser>
    
    </view>
    <view class="contact">
      <text @click="callPhone" class="contact-text"> 联系客服 </text>
    </view>
  </view>
</template>

<script>
import { faqDateil } from '@/api/user.js'

export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      queId: null,
      queInfo: {},
      tagStyle: {
        img: 'width:100%;display:block;',
        table: 'width:100%',
        video: 'width:100%',
      },
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  onLoad(options) {
    if (options.id) {
      this.queId = options.id
    }
  },
  // 方法集合
  methods: {
    callPhone() {
      this.$util.makePhoneCall()
    },
    async getInfo() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let res = await faqDateil(this.queId)
        this.queInfo = res.data
      } catch (e) {
        return this.$util.Tips({ title: e })
      } finally {
        uni.hideLoading()
      }
    },
  },
  onShow() {
    this.getInfo()
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
page {
  background: #fff;
}
.question-title {
  padding: 30rpx;
  font-size: 30rpx;

  font-weight: 500;
  color: #333333;
  line-height: 42rpx;
  border-bottom: 2rpx solid #eeeeee;
}
.conter {
  padding: 30rpx;
  padding-bottom: 120rpx;
}
.contact {
  position: fixed;
  text-align: center;
  bottom: 0;
  height: 90rpx;
  color: #3b6dbb;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  background: #fff;
}
</style>
