<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-12-20 11:29:22
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-21 15:37:29
 * @FilePath: \cshy-h5\pages\users\user_info\question.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE


-->
<template>
  <view>
    <view class='type-header'>问题类型</view>

    <uni-list :border="true">

      <uni-list-item v-for="item in dataList" :key="item.id" clickable link :title="item" is-link
      :to="'/pages/users/user_info/question?type='+item"  ></uni-list-item>

    </uni-list>



  </view>
</template>

<script>
import { categoryPage } from '@/api/user.js'

export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      dataList: [],

      limit: 99999,
      page: 1,
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},

  // 方法集合
  methods: {
  
    async getPageList(isPage) {
      uni.showLoading({
        title: '加载中',
      })

      try {
        let res = await categoryPage({
          current: this.page,
          size: this.limit,
        })
        this.dataList = res.data.list
      } catch (e) {
        return this.$util.Tips({ title: e })
      } finally {
        uni.hideLoading()
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() { },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() { },
  onShow() {
    this.getPageList()
  },
  beforeCreate() { }, //生命周期：创建之前
  beforeMount() { }, //生命周期：挂载之前
  beforeUpdate() { }, //生命周期：更新之前
  updated() { }, //生命周期：更新之后
  beforeDestroy() { }, //生命周期：销毁之前
  destroyed() { }, //生命周期：销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发执行
}
</script>
<style scoped lang="scss">
.type-header {
  padding: 30rpx;
  font-size: 30rpx;
}
</style>
