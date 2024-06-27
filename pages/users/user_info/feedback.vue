<template>
  <view>
    <form @submit="subForm" report-submit="true">
      <view class="page-box">
        <view class="list">
          <view class="item acea-row row-between" style="border: none">
            <view class="title acea-row row-between-wrapper">
              <view>意见反馈</view>
              <view class="tip">( 最多可上传3张 )</view>
            </view>
            <view class="up-remark">
              <textarea
                placeholder="请详细描述您的问题，以便我们为您提供更好的帮助"
                auto-height
                class="textarea"
                name="reason_wap_explain"
                placeholder-class="placeholder"
              ></textarea>
              <view class="upload acea-row row-middle">
                <view
                  class="pictrue"
                  v-for="(item, index) in wap_img_arr"
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
                  v-if="wap_img_arr.length < 3"
                >
                  <text class="iconfont icon-icon25201"></text>
                  <view>添加图片</view>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="list">
          <view class="item acea-row row-between-wrapper">
            <view> 联系电话 </view>
            <input
              :value="phone"
              class="uni-input"
              type="text"
              placeholder="请输入手机号"
            />
          </view>
        </view>
        <view class="tip">
          非常感谢您的宝贵意见
          <template
            >，点击查看<text class="history-tip" @click="goHistory"> 历史建议 </text></template
          >
        </view>

        <view class="page-footer">
          <button class="pageBnt bg-color" form-type="submit">提交</button>
        </view>
      </view>
    </form>
  </view>
</template>
<script>
import {
  ordeRefundReason,
  orderRefundVerify,
  applyRefund,
} from '@/api/order.js'
import { advicesAdd } from '@/api/user.js'
import { toLogin } from '@/libs/login.js'
import { mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {
      wap_img_arr: [],
      phone: null,
    }
  },
  computed: mapGetters(['isLogin', 'userInfo']),
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
    if (this.isLogin) {
      this.phone = this.userInfo.phone
    } else {
      toLogin()
    }
  },
  methods: {
    goHistory(){
      uni.navigateTo({
            url: '/pages/users/user_info/feedback_history',
          })
    },
    /**
     * 删除图片
     *
     */
    DelPic: function (e) {
      let index = e,
        that = this
      that.wap_img_arr.splice(index, 1)
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
          that.wap_img_arr.push(res.data.url)
        }
      )
    },

    /**
     * 提交
     */
    subForm: function (e) {
      let that = this,
        value = e.detail.value
      if (!value.reason_wap_explain) {
        return this.$util.Tips({ title: '请填写意见' })
      }
      if (!that.phone) {
        return this.$util.Tips({ title: '请填写您的联系电话' })
      }
      advicesAdd({
        content: value.reason_wap_explain,
        mobile: that.phone,
        picture: that.wap_img_arr.join(','),
      })
        .then((res) => {
          uni.navigateTo({
            url: '/pages/users/user_info/feedback_success',
          })
        })
        .catch((err) => {
          return this.$util.Tips({ title: err })
        })
    },
  },
}
</script>

<style scoped lang="scss">
.page-box .list {
  background-color: #fff;
  margin-bottom: 20rpx;
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

  .up-remark {
    display: flex;
    flex-direction: column;
    width: 100%;
    .textarea {
      min-height: 200rpx;
      width: 100%;
    }
  }
}

.page-box .list .item.textarea {
  padding: 24rpx 0;
}
.page-box .list .item textarea {
  height: 100rpx;
  font-size: 30rpx;
}
.page-box .list .item .placeholder {
  font-size: 30rpx;
  color: #bfbfbf;
}
.page-box .list .item .title {
  height: 95rpx;
  width: 100%;
}
.page-box .tip {
  font-size: 30rpx;
  color: #bbb;
  text-align: center;
}
.history-tip {
  font-size: 30rpx;

  text-align: center;
  color: #5e54ef;
}
.page-box .list .item .upload {
  padding-bottom: 36rpx;
}
.page-box .list .item .upload .pictrue {
  border-radius: 14rpx;
  margin: 22rpx 23rpx 0 0;
  width: 156rpx;
  height: 156rpx;
  position: relative;
  font-size: 24rpx;
  color: #bbb;
}
.page-box .list .item .upload .pictrue:nth-of-type(4n) {
  margin-right: 0;
}
.page-box .list .item .upload .pictrue image {
  width: 100%;
  height: 100%;
  border-radius: 14rpx;
}
.page-box .list .item .upload .pictrue .icon-guanbi1 {
  position: absolute;
  font-size: 45rpx;
  top: -10rpx;
  right: -10rpx;
}
.page-box .list .item .upload .pictrue .icon-icon25201 {
  color: #bfbfbf;
  font-size: 50rpx;
}
.page-box .list .item .upload .pictrue:nth-last-child(1) {
  border: 1rpx solid #ddd;
  box-sizing: border-box;
}
.page-footer {
  width: 100%;
  height: 98rpx;
  background: #ffffff;
  box-shadow: 0px 0px 20rpx 0rpx #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.page-box .pageBnt {
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
