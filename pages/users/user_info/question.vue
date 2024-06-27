<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-12-20 11:29:22
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-21 15:30:14
 * @FilePath: \cshy-h5\pages\users\user_info\question.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE


-->
<template>
  <view>
    <!-- <van-cell
      v-for="item in dataList"
      :key="item.id"
      :title="item.title" is-link 
      @click="goPage(item)"
    /> -->
    <uni-list :border="true">

      <uni-list-item
        v-for="item in dataList"
        :key="item.id"
        clickable
        link
        :title="item.title"
        is-link
        @click="goPage(item)"
      ></uni-list-item>

    </uni-list>

  </view>
</template>

<script>
import { faqPage } from '@/api/user.js'

export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      dataList: [],

      queType: null
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  onLoad(options) {
    if (options.type) {
      this.queType = options.type
    }
  },
  // 方法集合
  methods: {
    goPage(item) {
      uni.navigateTo({
        url: '/pages/users/user_info/question_details?id=' + item.id
      })
    },
    async getPageList() {
      uni.showLoading({
        title: '加载中'
      })
      let that = this

      try {
        let res = await faqPage({
          questionType: this.queType
        })

        that.$set(that, 'dataList', res.data)
      } catch (e) {
        return this.$util.Tips({ title: e })
      } finally {
        uni.hideLoading()
      }
    }
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {},
  onShow() {
    this.getPageList()
  },
  beforeCreate() {}, //生命周期：创建之前
  beforeMount() {}, //生命周期：挂载之前
  beforeUpdate() {}, //生命周期：更新之前
  updated() {}, //生命周期：更新之后
  beforeDestroy() {}, //生命周期：销毁之前
  destroyed() {}, //生命周期：销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style scoped></style>
