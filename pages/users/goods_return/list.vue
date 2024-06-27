<template>
  <view>
    <form report-submit="true">
      <view class="apply-return">
        <view
          class="goodsStyle acea-row row-between"
          v-for="(item, index) in orderInfo.orderInfoList"
          :key="index"
        >
          <view class="pictrue"><image :src="item.image"></image></view>
          <view class="text acea-row row-between">
            <view class="text-row">
              <view class="name line2">{{ item.storeName }}</view>
              <view class="money">
                <view>￥{{ item.price }}</view>
              </view>
            </view>
            <view class="text-row">
              <view class="line2">{{ item.sku }}x{{ item.cartNum }}</view>
              <view class="money return-number">
                <text>退款退货数量</text>
                <input
                  class="uni-input"
                  placeholder-class="placeholderClass"
                  style="
                    width: 40px;
                    border: 1px solid #ece4e4;
                    border-radius: 15rpx;
                    text-align: center;
                  "
                  v-model="item.returnNum"
                />
              </view>
            </view>
          </view>
        </view>
        <view class="return-info">
          <text class="return-tag"> 退货保障 </text>
          <text>
            请输入您要退款退货的数量，退货完成后，退货金额原路退回到你账户,请注意查收
          </text>
        </view>
        <view class="return-type">
          <view class="return-item" @click="goPage('0')">
            <image
              class="return-icon"
              src="https://cshy.store/file/sysFile/wechart/tuikuan.png"
              error=""
            >
            </image>
            <view>
              <view class="title">我要退款（无需退货）</view>
              <view class="tip">未收到货，或与商家协商之后申请</view>
            </view>
            <text class="iconfont icon-jiantou"></text>
          </view>
        </view>
        <view class="return-type">
          <view class="return-item" @click="goPage('1')">
            <image
              class="return-icon"
              src="https://cshy.store/file/sysFile/wechart/tuihuo.png"
              error=""
            >
            </image>
            <view>
              <view class="title">已收到货，我要退货退款</view>
              <view class="tip">需要你寄回已收到的货物</view>
            </view>
            <text class="iconfont icon-jiantou"></text>
          </view>
        </view>
      </view>
    </form>
  </view>
</template>
<script>
import {
  ordeRefundReason,
  orderRefundCompute,
  applyRefund,
} from '@/api/order.js'
import { toLogin } from '@/libs/login.js'
import { mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {
      refund_reason_wap_img: [],
      refund_reason_wap_imgPath: [],
      orderInfo: {},
      RefundArray: [],
      index: 0,
      orderId: 0,
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
    }
  },
  computed: mapGetters(['isLogin']),
  watch: {
    isLogin: {
      handler: function (newV, oldV) {
        if (newV) {
          this.getOrderInfo()
          this.getRefundReason()
        }
      },
      deep: true,
    },
  },
  onLoad: function (options) {
    if (!options.orderId)
      return this.$util.Tips(
        { title: '缺少订单id,无法退款' },
        { tab: 3, url: 1 }
      )
    this.orderId = options.orderId
    if (this.isLogin) {
      this.getOrderInfo()
      this.getRefundReason()
    } else {
      toLogin()
    }
  },
  methods: {
    goPage(index) {
      let arr = []
      if (
        this.orderInfo.orderInfoList.every((val) =>
          [0, '0', '', null, undefined, 'null', 'undefined'].includes(
            val.returnNum
          )
        )
      ) {
        uni.showModal({
          title: '提示',
          content: '请至少输入一个退款个数',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          },
        })
        debugger
        return
      }
      this.orderInfo.orderInfoList.forEach((val) => {
        arr.push({
          cartNum: val.cartNum,
          returnNum: val.returnNum,
          price: val.price,
          id: val.id,
          payPrice: this.orderInfo.payPrice,
        })
      })
      uni.setStorage({
        key: 'return_key',
        data: arr,
        success: function () {
          console.log('success')
        },
      })
      let refundOrderInfoRequestList = arr.map((val) => {
        return {
          orderInfoId: val.id,
          refundNum: val.returnNum,
        }
      })
      let params = {
        refundOrderInfoRequestList: refundOrderInfoRequestList,
        id: this.orderInfo.id,
      }

      orderRefundCompute(params).then((res) => {
        let price = res.data
        uni.navigateTo({
          url: `/pages/users/goods_return/index?orderId=${this.orderId}&type=${index}&price=${price}`,
        })
      })
    },
    onLoadFun: function () {
      this.getOrderInfo()
      this.getRefundReason()
    },
    /**
     * 获取订单详情
     *
     */
    getOrderInfo() {
      applyRefund(this.orderId).then((res) => {
        res.data.orderInfoList.forEach((val) => {
          val['returnNum'] = val.shipNum
            ? val.cartNum - val.shipNum
            : val.cartNum
        })
        this.orderInfo = res.data
      })
    },
    /**
     * 获取退款理由
     */
    getRefundReason: function () {
      let that = this
      ordeRefundReason().then((res) => {
        that.$set(that, 'RefundArray', res.data)
      })
    },

    /**
     * 删除图片
     *
     */
    DelPic: function (e) {
      let index = e,
        that = this
      that.refund_reason_wap_imgPath.splice(index, 1)
    },
    /**
     * 上传文件
     *
     */
    uploadpic: function () {
      let that = this
      that.$util.uploadImageOne(
        {
          url: 'user/upload/image',
          name: 'multipart',
          model: 'product',
          pid: 1,
        },
        function (res) {
          that.refund_reason_wap_imgPath.push(res.data.url)
        }
      )
    },

    bindPickerChange: function (e) {
      this.$set(this, 'index', e.detail.value)
    },
  },
}
</script>

<style scoped lang="scss">
.goodsStyle {
  .text {
    flex: 1;
    margin-left: 30rpx;
  }
}
.return-info {
  border-top: 2rpx solid #eeeeee;
  border-top: 1px solid #eeeeee;
  background: #fff;
  padding: 30rpx;
  font-size: 30rpx;

  font-weight: 400;
  color: #666666;
  line-height: 52rpx;
  .return-tag {
    width: 124rpx;
    height: 40rpx;
    background: linear-gradient(270deg, #fe3b7f 0%, #ff7c5c 100%);
    border-radius: 10rpx;
    font-size: 26rpx;

    font-weight: 400;
    color: #ffffff;
    margin-right: 14rpx;
    display: inline-block;
    text-align: center;
    line-height: 40rpx;
  }
}
.return-type {
  margin-top: 20rpx;
  padding: 40rpx 30rpx;
  background: #fff;
  .return-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #9a9a9a;
    .return-icon {
      width: 52rpx;
      height: 52rpx;
      margin-right: 30rpx;
    }
    .title {
      font-size: 34rpx;

      color: #333333;
      line-height: 48rpx;
    }
    .tip {
      font-size: 28rpx;

      margin-top: 9rpx;
    }
    .iconfont {
      margin-left: auto;
    }
  }
}
.apply-return {
  /deep/ .goodsStyle {
    margin-top: 0;
  }
  // padding: 20rpx 30rpx 70rpx 30rpx;
}
.apply-return .list {
  background-color: #fff;
  margin-top: 18rpx;
  padding: 0 24rpx 70rpx 24rpx;
}
.apply-return .list .item {
  min-height: 90rpx;
  border-bottom: 1rpx solid #eee;
  font-size: 30rpx;
  color: #333;
}
.apply-return .list .item .num {
  color: #282828;
  width: 427rpx;
  text-align: right;
}
.apply-return .list .item .num .picker .reason {
  width: 385rpx;
}
.apply-return .list .item .num .picker .iconfont {
  color: #666;
  font-size: 30rpx;
  margin-top: 2rpx;
}
.apply-return .list .item.textarea {
  padding: 24rpx 0;
}
.apply-return .list .item textarea {
  height: 100rpx;
  font-size: 30rpx;
}
.apply-return .return-number {
  width: 400rpx;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .placeholderClass {
    font-size: 24rpx;
  }
}
.apply-return .list .item .placeholder {
  color: #bbb;
}
.apply-return .list .item .title {
  height: 95rpx;
  width: 100%;
}
.apply-return .list .item .title .tip {
  font-size: 30rpx;
  color: #bbb;
}
.apply-return .list .item .upload {
  padding-bottom: 36rpx;
}
.apply-return .list .item .upload .pictrue {
  border-radius: 14rpx;
  margin: 22rpx 23rpx 0 0;
  width: 156rpx;
  height: 156rpx;
  position: relative;
  font-size: 24rpx;
  color: #bbb;
}
.apply-return .text-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  width: auto;
}
.apply-return .list .item .upload .pictrue:nth-of-type(4n) {
  margin-right: 0;
}
.apply-return .list .item .upload .pictrue image {
  width: 100%;
  height: 100%;
  border-radius: 14rpx;
}
.apply-return .list .item .upload .pictrue .icon-guanbi1 {
  position: absolute;
  font-size: 45rpx;
  top: -10rpx;
  right: -10rpx;
}
.apply-return .list .item .upload .pictrue .icon-icon25201 {
  color: #bfbfbf;
  font-size: 50rpx;
}
.apply-return .list .item .upload .pictrue:nth-last-child(1) {
  border: 1rpx solid #ddd;
  box-sizing: border-box;
}
.apply-return .returnBnt {
  font-size: 32rpx;
  color: #fff;
  width: 100%;
  height: 86rpx;
  border-radius: 50rpx;
  text-align: center;
  line-height: 86rpx;
  margin: 43rpx auto;
}
</style>
