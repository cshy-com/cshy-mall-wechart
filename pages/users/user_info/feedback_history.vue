<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-07-27 10:20:46
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2023-12-22 11:47:50
 * @FilePath: \mall-admind:\work\mall-applet\pages\article\recommendationList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="content">
    <recommenList :opinionList="opinionList"></recommenList>
    <view
      class="loadingicon acea-row row-center-wrapper"
      v-if="opinionList.length > 0"
    >
      <text
        class="loading iconfont icon-jiazai"
        :hidden="loading == false"
      ></text
      >{{ loadTitle }}
    </view>
    <view v-if="opinionList.length == 0">
      <emptyPage
        title="暂无数据~"
        :img="('https://cshy.store/file/sysFile/wechart/noOrder.png')"
      ></emptyPage>
    </view>
  </view>
</template>

<script>
import emptyPage from '@/components/emptyPage.vue'
import recommenList from './recommenList'

import { advicesList } from '@/api/user.js'
export default {
  //import引入组件才能使用
  components: { recommenList, emptyPage },
  props: {},
  data() {
    return {
      opinionList: [],
      more: 'noMore',
      limit: 10,
      page: 1,
      total: 0,
      noDate: false,
      loading: false, //是否加载中
      loadend: false, //是否加载完毕
      loadTitle: '加载更多', //提示语
    }
  },
  // 计算属性
  computed: {
    defaultImg() {
      return '' //this.$fileUrl + '/sysFile/img_zanwu_tuijian.png'
    },
  },
  // 监听data中的数据变化
  watch: {},
  onPullDownRefresh() {
    this.current = 1
    this.getPageList()
    setTimeout(function () {
      uni.stopPullDownRefresh()
    }, 1000)
  },
  // 上拉触底事件
  onReachBottom: function () {
    if (this.more == 'more') {
      this.current++
      this.getPageList()
    }
  },
  onLoad: function () {
    this.getPageList()
  },

  // 方法集合
  methods: {
    async getPageList(isPage) {
      uni.showLoading({
        title: '加载中',
      })
      let that = this
      if (isPage) {
        that.loadend = false
        that.page = 1
        that.$set(that, 'opinionList', [])
      }
      if (that.loading) return
      if (that.loadend) return
      that.loading = true
      that.loadTitle = ''
      try {
        let res = await advicesList({
          current: this.page,
          size: this.limit,
        })
        let list = res.data.list || []
        let loadend = list.length < that.limit
        that.opinionList = that.$util.SplitArray(list, that.opinionList)
        that.$set(that, 'opinionList', that.opinionList)
        that.loadend = loadend
        that.loading = false
        that.loadTitle = loadend ? '我也是有底线的' : '加载更多'
        that.page = that.page + 1
        
      } catch (e) {
        return this.$util.Tips({ title: e })
      } finally {
        uni.hideLoading()
      }
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onShow() {},
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
.content-box {
  position: relative;
}
.content-box::before {
  display: block;
  position: absolute;
  border-top: 1px solid #eee;
  width: 100%;
  bottom: 0;
  left: 0;
}
.content {
  padding-bottom: 20rpx;
}
</style>
