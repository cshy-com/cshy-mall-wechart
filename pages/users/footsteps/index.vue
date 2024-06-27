<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-11-17 15:43:17
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-20 10:21:03
 * @FilePath: \cshy-h5\pages\users\footsteps\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="nav bg">

      <view @click="changeDay(index)" class="nav-item" :class="{ 'nav-active-item': activeIndex == index }"
        v-for="(item, index) in dayArr" :key="index">
        {{ item.split("-")[2] }}日
      </view>
    </view>
    <view class="bg page-content">
      <view class="line"></view>
      <view class="page-list-box" v-if="dataList && dataList.length">
        <view class="page-list-item" v-for="item in dataList" :key="item.id" @click="goDetail(item)">
          <image class="page-list-item-img" :src="item.productInfo.image">
          </image>
          <view class="page-list-item-close" @click.stop="delRow(item, index)">
            <image src="https://cshy.store/file/sysFile/wechart/close.png" class="page-list-item-close-img">
            </image>
          </view>

          <view class="page-list-item-price">
            <view> {{ item.productInfo.price }}元 </view>
            <view class="page-list-item-star">
              <image v-if="item.productInfo.collect" class="page-list-item-star-img"
                src="https://cshy.store/file/sysFile/wechart/shoucang-active.png"></image>
              <image v-else class="page-list-item-star-img" src="https://cshy.store/file/sysFile/wechart/shoucang-2.png"></image>
            </view>
          </view>
        </view>
      </view>
      <view v-if="dataList.length == 0 && loading == false">
        <view class="empty-box">
          <image class="empty-box-img" src="https://cshy.store/file/sysFile/wechart/empty.png"></image>
          <view class="txt">暂无浏览记录</view>
        </view>
      </view>
    </view>
    <view class="noCommodity">
      <recommend :hostProduct="hostProduct">
        <template v-slot:header>
          <view class="title acea-row row-center-wrapper">
            <image class="title-line" src="https://cshy.store/file/sysFile/wechart/user/tuijian.png"></image>
            <view class="titleTxt">精选推荐</view>
          </view>
        </template>
      </recommend>
    </view>
  </view>
</template>

<script>
import {
  getSearchKeyword,
  getProductslist,
  getProductHot,
} from '@/api/store.js'
import { goShopDetail } from '@/libs/order.js'
import { mapGetters } from 'vuex'
import recommend from '@/components/recommend'
import { historyPage, delHistory } from '@/api/user.js'
// import { Dialog } from 'vant'
export default {
  //import引入组件才能使用
  components: {
    recommend,
    // [Dialog.Component.name]: Dialog.Component

  },
  props: {},
  data() {
    return {
      where: {
        current: 1,
        size: 20,
      },
      dataList: [],
      loadend: false,
      loading: false,
      loadTitle: '加载更多',

      dayArr: [],
      activeIndex: 0,
      hostProduct: [],
      isScroll: true,
      hotPage: 1,
      limit: 8,
    }
  },
  // 计算属性
  computed: mapGetters(['uid']),
  // 监听data中的数据变化
  watch: {},
  onReachBottom: function () {
    this.getHostProduct()
  },
  // 方法集合
  methods: {
    goDetail(item) {
      goShopDetail(item, this.uid).then((res) => {
        uni.navigateTo({
          url: `/pages/goods/goods_details/index?id=${item.productInfo.productId}`,
        })
      })
    },
    getHostProduct: function () {
      let that = this
      if (!this.isScroll) return
      getProductHot(that.hotPage, that.limit).then((res) => {
        that.isScroll = res.data.list.length >= that.limit
        that.hostProduct = that.hostProduct.concat(res.data.list)
        that.hotPage += 1
      })
    },
    // 删除历史记录
    delRow(item, index) {

      uni.showModal({
        title: '提示',
        content: '确认删除该浏览记录吗',
        success: (res) => {
          if (res.confirm) {
            delHistory([item.id]).then((res) => {
              this.dataList.splice(index, 1)
            })
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });



    },
    changeDay(index) {
      this.activeIndex = index
      this.where.current = 1
      this.loadend = false
      this.get_list(true)
    },
    getDays() {
      const days = 7
      const week = ['日', '一', '二', '三', '四', '五', '六']
      const dateList = Array.from({ length: days }, (v, i) => i).map((day) => {
        const date = new Date()
        date.setDate(date.getDate() - day)
        return (
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate()
          // '星期'+week[date.getDay()]
        )
      })
      return dateList
    },
    //时间格式化
    formatterDate(date, fmt) {
      let nowDate = {
        yyyy: date.getFullYear(), // 年
        MM: date.getMonth() + 1, // 月份
        dd: date.getDate(), //日
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      for (var k in nowDate) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? nowDate[k]
              : ('00' + nowDate[k]).substr(('' + nowDate[k]).length)
          )
        }
      }
      return fmt
    },
    get_list: function (isPage) {
      uni.showLoading({
        title: '加载中',
        mask: true,
      })

      let that = this

      if (that.loadend) return
      if (that.loading) return
      if (isPage === true) that.$set(that, 'dataList', [])
      that.loading = true
      that.loadTitle = ''
      that.where.date = that.dayArr[that.activeIndex]
      historyPage(that.where)
        .then((res) => {
          let list = res.data.list
          let dataList = that.$util.SplitArray(list, that.dataList)
          let loadend = list.length < that.where.size
          that.loadend = loadend
          that.loading = false
          that.loadTitle = loadend ? '已全部加载' : '加载更多'
          that.$set(that, 'dataList', dataList)
          that.$set(that.where, 'current', that.where.current + 1)
          uni.hideLoading()
        })
        .catch((err) => {
          that.loading = false
          that.loadTitle = '加载更多'
        })
    },
  },
  onShow() {
    this.getHostProduct()
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.dayArr = this.getDays()
  },
  // 生命周期：挂载完成时（可以访问DOM元素）
  mounted() {
    this.get_list(true)
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
.bg {
  background: #fff;
}

.nav {
  padding: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30rpx;

  font-weight: 400;
  color: #2b2b2b;

  .nav-item {
    width: 89rpx;
    height: 46rpx;
    text-align: center;
    line-height: 46rpx;
  }

  .nav-active-item {
    background: #fa6400;
    border-radius: 23rpx;

    color: #ffffff;
  }
}

.page-content {
  min-height: 300rpx;
}

.line {
  border-bottom: 2rpx solid #eeeeee;
  width: 698rpx;
  margin: 0 30rpx;
}

.page-list-box {
  background: #fff;
  padding-top: 30rpx;
  padding-left: 30rpx;
  padding-right: 30rpx;
  display: flex;
  flex-wrap: wrap;

  .page-list-item {
    position: relative;
    width: 220rpx;
    margin-right: 15rpx;

    .page-list-item-img {
      width: 100%;
      height: 220rpx;
      border-radius: 20rpx;
    }

    .page-list-item-close {
      position: absolute;
      right: 10rpx;
      top: 10rpx;

      .page-list-item-close-img {
        width: 40rpx;
        height: 40rpx;
      }
    }

    .page-list-item-price {
      font-size: 30rpx;
      margin-left: 10rpx;
      margin-top: 20rpx;
      font-weight: 500;
      padding-bottom: 20rpx;
      color: #eb2d47;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .page-list-item-star-img {
        width: 42rpx;
        height: 42rpx;
      }
    }
  }

  .page-list-item:nth-child(3n) {
    margin-right: 0;
  }
}

.noCommodity {
  margin-top: 38rpx;
  padding-bottom: 100rpx;

  /deep/ .recommend {
    background: transparent;
  }

  .title {
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;

    .titleTxt {
      margin: 0 10rpx;
      font-size: 28rpx;
      color: #666666;
    }

    .sp {
      margin: 0 20rpx;
    }
  }

  .title-line {
    position: absolute;
    width: 448rpx;
    height: 16rpx;
    // border: 2rpx solid #e5e5e5;
  }
}

.empty-box {
  display: flex;
  align-items: center;
  flex-direction: column;

  .empty-box-img {
    width: 277rpx;
    height: 190rpx;
    margin-top: 60rpx;
  }

  .txt {
    font-size: 30rpx;
    padding-bottom: 60rpx;
    font-weight: 400;
    color: #999999;
  }
}
</style>
