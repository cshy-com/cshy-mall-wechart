<template>
  <div>
    <text class="info-text" v-if="isUsed">已经被领取了</text>
    <button
      size="default"
      class="btn m-100"
      v-if="!isUsed"
      type="default"
      @click="getTicket"
    >
      点击领取
    </button>
    <button size="default" class="btn" type="default" @click="goHome">
      去首页逛逛
    </button>
  </div>
</template>

<script>
import { couponStatus, couponAdd } from '@/api/user'
import { toLogin, checkLogin } from '@/libs/login'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      tickCode: '',
      isUsed: null,
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    getTicket() {
      couponAdd({
        code: this.tickCode,
      })
        .then((res) => {
          uni.showModal({
            title: '提示',
            content: '领取成功',
            success: function (res) {
              if (res.confirm) {
                uni.switchTab({ url: '/pages/index/index' })
              } else if (res.cancel) {
                uni.switchTab({ url: '/pages/index/index' })
              }
            },
          })
        })
        .catch((err) => {
          uni.showModal({
            title: '提示',
            content: err,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            },
          })
        })
        .finally((e) => {})
    },
    getcouponStatus() {
      couponStatus({
        code: this.tickCode,
      })
        .then((res) => {
          this.isUsed = res.data
          if (!checkLogin() && !this.isUsed) {
            uni.navigateTo({
              url: `/pages/users/login/index?code=${this.tickCode}`,
            })
          }
        })
        .catch((e) => {
          uni.switchTab({ url: '/pages/index/index' })
        })
    },
    goHome() {
      uni.switchTab({ url: '/pages/index/index' })
    },
    getUrlParams(url) {
      let o = {}
      if (url.indexOf('?') != -1) {
        let str = url.substr(url.indexOf('?') + 1).replace(/[#/|/#/]/g, '')
        // console.log(str);
        let strs = str.split('&')
        // console.log(strs);
        for (let i = 0; i < strs.length; i++) {
          o[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1])
        }
      }
      return o
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onLoad(options) {
    const { q } = options
    if (q) {
      let urlStr = decodeURIComponent(q)

      let urlParams = this.getUrlParams(urlStr)
      this.tickCode = urlParams.code

   
      this.getcouponStatus()
    }
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
.info-text {
  text-align: center;
  margin: 100px 0;
  display: inline-block;
  width: 100%;
}
.btn {
  background: #e9a41f;
  color: #fff;
  width: 100px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  text-align: center;
  font-size: 14px;
  justify-content: center;
  padding: 3px 5px;
}
.m-100 {
  margin: 100px auto;
}
</style>
