<template>
  <view>
    <form @submit="subRefund" report-submit="true">
      <view class="apply-return">
        <view class="list">
          <view class="return-info">
            <view> 请正确填写快递单号，以免影响退款进度 </view>
            <view class="url" @click="goPage()"> 如何填写快递单号? </view>
          </view>

          <view class="item-money">
            <view class="item-money-num">
              <input
              v-model="trackingNo"
                class="uni-input"
                type="text"
                placeholder="点击填写退货快递单号"
              />
            </view>
          </view>
          <!-- <view class="item acea-row row-between-wrapper">
            <view>自动匹配快递公司</view>

            <view class="picker acea-row row-between-wrapper">
              <view class="reason"> </view>
              <text class="iconfont icon-jiantou"></text>
            </view>
          </view> -->
          <view class="line"></view>

          <view class="item acea-row row-between" style="border: none">
            <view class="title acea-row row-between-wrapper">
              <view>退货留言</view>
              <view class="tip">( 最多可上传3张 )</view>
            </view>
            <view class="up-remark">
              <textarea
                placeholder="非必填，请您填写申请说明，100字以内"
                auto-height
                v-model="returnRemark"
                class="textarea"
                name="refund_reason_wap_explain"
                placeholder-class=""
              ></textarea>
              <view class="upload acea-row row-middle">
                <view
                  class="pictrue"
                  v-for="(item, index) in refund_reason_wap_imgPath"
                  :key="index"
                >
                  <image :src="item"></image>
                  <view
                    class="iconfont icon-guanbi1 font-color"
                    @tap="DelPic(index)"
                  ></view>
                </view>
                <view
                  class="pictrue acea-row row-center-wrapper row-column"
                  @tap="uploadpic"
                  v-if="refund_reason_wap_imgPath.length < 3"
                >
                  <text class="iconfont icon-icon25201"></text>
                  <view>添加图片</view>
                </view>
              </view>
            </view>
          </view>
          <view class="line"></view>

          <view class="return-footer">
            <button class="returnBnt bg-color" form-type="submit">
              确认提交
            </button>
          </view>
        </view>
      </view>
    </form>
  </view>
</template>
<script>
import { refundShipApi } from '@/api/order.js'
import { toLogin } from '@/libs/login.js'
import { mapGetters } from 'vuex'
 
import popModel from './../components/popModel'
export default {
  components: {
  
    popModel,
  },
  data() {
    return {
      refund_reason_wap_img: [],
      refund_reason_wap_imgPath: [],

      index: 0,

      orderId: 0,

      trackingNo: null,

      returnRemark: null,
    }
  },
  computed: mapGetters(['isLogin']),
  watch: {
    isLogin: {
      handler: function (newV, oldV) {
        if (newV) {
        }
      },
      deep: true,
    },
  },
  onLoad: function (options) {
    this.orderId = options.orderId

    if (this.isLogin) {
    } else {
      toLogin()
    }
  },
  methods: {
    goPage() {
      uni.navigateTo({
        url: '/pages/users/goods_return/trackingNumberTip',
      })
    },

    callPhone() {
      this.$util.makePhoneCall()
    },
    onLoadFun: function () {},

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

    /**
     * 申请退货
     */
    subRefund: function (e) {
      let that = this,
        value = e.detail.value
       
      if (!that.trackingNo) {
        return this.$util.Tips({
          title: '请填写快递单号！',
        })
      }
      if(that.trackingNo.length>20){
        return this.$util.Tips({
          title: '快递单号长度不能超过20个字符！',
        })
      }
      refundShipApi({
        trackingNo: that.trackingNo,
        orderId: that.orderId,
        remark: that.returnRemark,
        img: that.refund_reason_wap_imgPath.join(','),
      })
        .then((res) => {
          return this.$util.Tips(
            { title: '提交成功', icon: 'success' },
            { tab: 5, url: '/pages/users/user_return_list/index?isT=1' }
          )
        })
        .catch((err) => {
          return this.$util.Tips({ title: err })
        })
    },
  },
}
</script>

<style scoped lang="scss">
.apply-return {
}
.apply-return .list {
  background-color: #fff;
  .return-info {
    padding: 30rpx 30rpx 30rpx 30rpx;
    font-size: 30rpx;
    border-bottom: 2rpx solid #eeeeee;

    color: #2b2b2b;
    .url {
      font-size: 28rpx;
      margin-top: 10rpx;
      color: #3d60f1;
    }
  }
  .item {
    min-height: 98rpx;
    border-bottom: 1rpx solid #eee;
    font-size: 30rpx;
    color: #333;
    padding: 0 30rpx;
  }
  .item:last-child {
    border-bottom: none;
  }
  .line {
    background: #f4f4f4;
    height: 20rpx;
    width: 100%;
  }
  .item-money {
    padding: 27rpx 30rpx;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 2rpx solid #eeeeee;
    .item-money-num {
      width: 100%;

      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 44rpx;
      position: relative;
      font-weight: 500;
      color: #2b2b2b;
      .right-icon {
        font-size: 30rpx;
        margin-left: auto;
        position: absolute;
        right: 0;
        color: #9a9a9a;
        z-index: 9;
      }
      .uni-input {
        position: relative;
        z-index: 99;
        height: 42rpx;
      }
    }
  }
  .up-remark {
    display: flex;
    flex-direction: column;
    .textarea {
      min-height: 200rpx;
    }
  }
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
.return-footer {
  width: 100%;
  height: 98rpx;
  background: #ffffff;
  box-shadow: 0px 0px 20rpx 0rpx #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.apply-return .returnBnt {
  font-size: 32rpx;
  color: #fff;
  width: 680rpx;
  height: 72rpx;
  border-radius: 36rpx;
  text-align: center;
  line-height: 72rpx;
  margin: 13rpx 35rpx;
}
</style>
