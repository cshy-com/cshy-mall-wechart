<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-11-22 11:03:32
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-21 10:21:52
 * @FilePath: \cshy-h5\pages\users\goods_return\negotiationRecord.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="card-page">
    <view class="card-item p-28 bgf m-b-20" v-for="item in orderLog" :key="item.id">
     
     
      <view class="card-head">
        <image class="avatar" v-if="item.isSysUser==1"  src="https://cshy.store/file/sysFile/wechart/admin-avatar.png"></image>
        <image class="avatar" v-else :src="item.avatar"></image>
        <view class="card-name">
          <view class="text"> {{item.changeType}} </view>
          <view class="time"> {{item.createTime}}</view>
        </view>
      </view>
      <view class="card-remark" v-if="item.isSysUser==1" > 备注：{{item.changeMessage}} </view>
      <view class="card-remark" v-else>
        <view class="card-remark-line m-b-20" v-if="item.mobile"> 退款金额：{{item.refundPrice}}元 </view>
        <view class="card-remark-line m-b-20"> 申请原因：{{item.changeMessage}} </view>
        <view class="card-remark-line m-b-20"  v-if="item.mobile"> 联系方式：{{item.mobile}} </view>
        <view class="card-remark-line m-b-20"  v-if="item.desc"> 问题描述：{{item.desc}} </view>
      </view>
    </view>
 
  </view>
</template>

<script>
import { mapGetters } from 'vuex'
import {operationList} from '@/api/order.js'
import { toLogin } from '@/libs/login.js'
export default {
  //import引入组件才能使用
  components: {},
  props: {},
  data() {
    return {
      order_id: null,
      orderLog:null
    }
  },
  // 计算属性
  computed: mapGetters(['isLogin', 'chatUrl', 'userInfo']),
  onLoad: function (options) {
    if (!options.order_id)
      return this.$util.Tips(
        {
          title: '缺少参数',
        },
        {
          tab: 3,
          url: 1,
        }
      )
    this.$set(this, 'order_id', options.order_id)
  },
  onShow() {
    if (this.isLogin) {
      this.getLog()
    } else {
      toLogin()
    }
  },
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    getLog() {
      let that = this
      uni.showLoading({
        title: '正在加载中',
      })
      operationList({id:that.order_id})
        .then((res) => {
          uni.hideLoading()
          that.$set(that, 'orderLog', res.data)
          // that.$set(that, 'evaluate', res.data.status == 2 ? 2 : 0)
          // that.$set(that, 'system_store', res.data.systemStore)
          // that.$set(that, 'id', res.data.id)
          // that.$set(that, 'cartInfo', res.data.orderInfoList)
          // if (res.data.refundStatus != 0) {
          //   that.isGoodsReturn = true
          // }
          // //退货
          // if (res.data.refundType == 0) {
          //   that.stepsOptions = that.returnTypeArr
          //   if(res.data.refundStatus==2){
          //     that.returnActive=2

          //   }
          // } else {
          //   that.stepsOptions = that.returnGoodsTypeArr
          // }
          // if (that.orderInfo.shippingType == 2 && that.orderInfo.paid)
          //   that.markCode(res.data.verifyCode)
          // if (that.orderInfo.refundStatus > 0) {
          //   uni.setNavigationBarColor({
          //     frontColor: '#ffffff',
          //     backgroundColor: '#666666',
          //   })
          // }
        })
        .catch((err) => {
          uni.hideLoading()
          // that.$util.Tips(
          //   {
          //     title: err,
          //   },
          //   '/pages/users/order_list/index'
          // )
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
.p-28 {
  padding: 28rpx;
}
.bgf {
  background: #fff;
}
.m-b-20 {
  margin-bottom: 20rpx;
}
.card-page {
  .card-item {
    font-size: 28rpx;

    font-weight: 400;
    color: #9a9a9a;
    .card-head {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 2rpx solid #eeeeee;
      padding-bottom: 27rpx;
      .avatar {
        width: 104rpx;
        height: 104rpx;
        margin-right: 18rpx;
        border-radius: 50%;
      }
      .card-name {
        .text {
          font-size: 30rpx;

          font-weight: 500;
          color: #2b2b2b;
          margin-bottom: 18rpx;
        }
      }
      .time {
      }
    }
    .card-remark {
      margin-top: 30rpx;
    }
  }
}
</style>
