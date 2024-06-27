<template>
  <view>
    <div class="login-wrapper">
      <div class="whiteBg" v-if="formItem === 1">
        <div
          class="list"
          v-if="current !== 0 || appLoginStatus || appleLoginStatus"
        >
          <div class="item">
            <div class="acea-row row-middle">
              <image
                src="https://cshy.store/file/sysFile/wechart/card.png"
                style="width: 48rpx; height: 48rpx"
              ></image>
              <input
                type="text"
                class="texts"
                placeholder="请输入提货编码"
                v-model="pickupCode"
              />
            </div>
          </div>
          <div class="item">
            <div class="acea-row row-middle">
              <image
                src="https://cshy.store/file/sysFile/wechart/password.png"
                style="width: 48rpx; height: 48rpx"
              ></image>
              <input
                type="text"
                class="texts"
                placeholder="请输入提货密码"
                v-model="pickupSecret"
              />
            </div>
          </div>
          <div class="item">
            <div class="acea-row row-middle">
              <image
                src="https://cshy.store/file/sysFile/wechart/phone.png"
                style="width: 48rpx; height: 48rpx"
              ></image>
              <input
                type="text"
                class="texts"
                placeholder="请输入手机号码"
                v-model="account"
              />
            </div>
          </div>
          <view class="item-code">
            <div class="item item-code-row">
              <div class="acea-row row-middle">
                <image
                  src="https://cshy.store/file/sysFile/wechart/code.png"
                  class="code-icon"
                ></image>
                <input
                  type="text"
                  placeholder="请输入验证码"
                  class="codeIput"
                  v-model="captcha"
                />
              </div>
            </div>
            <button
              class="code"
              :disabled="disabled"
              :class="disabled === true ? 'on' : ''"
              @click="code"
            >
              {{ text }}
            </button>
          </view>
          <div class="item item-code-row" v-if="isShowCode">
            <div class="acea-row row-middle">
              <image src="https://cshy.store/file/sysFile/wechart/code.png" class="code-icon"></image>
              <input
                type="text"
                placeholder="请输入验证码"
                class="codeIput"
                v-model="codeVal"
              />
              <div class="code" @click="again"><img :src="codeUrl" /></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom"></div>
    </div>
    <view class="footer" safe-area-inset-bottom>
      <div class="logon" @click="loginMobile" v-if="current !== 0">登录</div>
    </view>
  </view>
</template>
<script>
import dayjs from '@/plugin/dayjs/dayjs.min.js'
import sendVerifyCode from '@/mixins/SendVerifyCode'
import {
  loginH5,
  loginMobile,
  registerVerify,
  register,
  // getCodeApi,
  getUserInfo,
} from '@/api/user'
import attrs, { required, alpha_num, chs_phone } from '@/utils/validate'
import { validatorDefaultCatch } from '@/utils/dialog'
import { getLogo, appAuth, appleLogin } from '@/api/public'
import { VUE_APP_API_URL } from '@/utils'

const BACK_URL = 'login_back_url'

export default {
  name: 'Login',
  mixins: [sendVerifyCode],
  data: function () {
    return {
      navList: ['快速登录'],
      current: 1,
      account: '',
      password: '',
      captcha: '',
      formItem: 1,
      type: 'login',

      keyCode: '',
      codeUrl: '',
      codeVal: '',
      isShowCode: false,
      platform: '',
      appLoginStatus: false, // 微信登录强制绑定手机号码状态

      appleLoginStatus: false, // 苹果登录强制绑定手机号码状态
      appleUserInfo: null,
      appleShow: false, // 苹果登录版本必须要求ios13以上的
      id: '',
      pickupCode: '',
      pickupSecret: '',
    }
  },
  watch: {
    formItem: function (nval, oVal) {
      if (nval == 1) {
        this.type = 'login'
      } else {
        this.type = 'register'
      }
    },
  },
  mounted: function () {},
  onLoad(options) {
    this.id = options.id
    this.pickupCode = options.pickupCode
    let self = this
    uni.getSystemInfo({
      success: function (res) {
        if (
          res.platform.toLowerCase() == 'ios' &&
          res.system.split(' ')[1] >= 13
        ) {
          self.appleShow = true
        }
      },
    })
  },
  methods: {
    again() {
      this.codeUrl =
        VUE_APP_API_URL +
        '/sms_captcha?' +
        'key=' +
        this.keyCode +
        Date.parse(new Date())
    },

    async loginMobile() {
      let that = this
      if (!that.pickupCode) {
        return that.$util.Tips({
          title: '请填写提货编码',
        })
      }
      if (!that.pickupSecret) {
        return that.$util.Tips({
          title: '请填写提货密码',
        })
      }
      if (!that.account)
        return that.$util.Tips({
          title: '请填写手机号码',
        })
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account))
        return that.$util.Tips({
          title: '请输入正确的手机号码',
        })
      if (!that.captcha)
        return that.$util.Tips({
          title: '请填写验证码',
        })
      if (!/^[\w\d]+$/i.test(that.captcha))
        return that.$util.Tips({
          title: '请输入正确的验证码',
        })
      uni.showLoading({
        title: '正在登陆',
      })
      uni.showLoading({
        title: '正在登录',
      })
      try {
        let res = await loginMobile({
          phone: that.account,
          captcha: that.captcha,
          pickupSecret: this.pickupSecret,
          pickupCode: this.pickupCode,
          spread_spid: that.$Cache.get('spread'),
        })

        let data = res.data

        this.$store.commit('LOGIN', {
          token: res.data.token,
        })
        that.getUserInfo(data)
      } catch (e) {
        that.$util.Tips({
          title: e,
        })
      } finally {
        uni.hideLoading()
      }
    },

    async code() {
      let that = this
      if (!that.account)
        return that.$util.Tips({
          title: '请填写手机号码',
        })
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(that.account))
        return that.$util.Tips({
          title: '请输入正确的手机号码',
        })
      if (that.formItem == 2) that.type = 'register'
      await registerVerify(that.account)
        .then((res) => {
          that.$util.Tips({ title: res.message })
          that.sendCode()
        })
        .catch((err) => {
          return that.$util.Tips({
            title: err,
          })
        })
    },

    getUserInfo(data) {
      this.$store.commit('SETUID', data.uid)
      getUserInfo().then((res) => {
        debugger
        this.$store.commit('UPDATE_USERINFO', res.data)
        let backUrl =
          this.$Cache.get(BACK_URL) ||
          `/pages/gift/gift_detail?id=${this.id}&pickupCode=${this.pickupCode}`
        if (backUrl.indexOf('/pages/users/login/gift_index') !== -1) {
          backUrl = `/pages/gift/gift_detail?id=${this.id}&pickupCode=${this.pickupCode}`
        }
        uni.reLaunch({
          url: backUrl,
        })
      })
    },
  },
}
</script>
<style>
page {
  background: #fff;
}
</style>
<style lang="scss" scoped>
.appLogin {
  margin-top: 60rpx;

  .hds {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
    color: #b4b4b4;

    .line {
      width: 68rpx;
      height: 1rpx;
      background: #cccccc;
    }

    p {
      margin: 0 20rpx;
    }
  }

  .btn-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30rpx;

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 68rpx;
      height: 68rpx;
      border-radius: 50%;
    }

    .apple-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 30rpx;
      background: #000;
      border-radius: 34rpx;
      font-size: 40rpx;

      .icon-s-pingguo {
        color: #fff;
        font-size: 40rpx;
      }
    }

    .iconfont {
      font-size: 40rpx;
      color: #fff;
    }

    .wx {
      margin-right: 30rpx;
      background-color: #61c64f;
    }

    .mima {
      background-color: #28b3e9;
    }

    .yanzheng {
      background-color: #f89c23;
    }
  }
}

.code img {
  width: 100%;
  height: 100%;
}

.acea-row.row-middle {
  input {
    margin-left: 20rpx;
    display: block;
  }
}

.login-wrapper {
  padding: 30rpx;

  .shading {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    /* #ifdef APP-VUE */
    margin-top: 50rpx;
    /* #endif */
    /* #ifndef APP-VUE */

    margin-top: 200rpx;
    /* #endif */

    image {
      width: 180rpx;
      height: 180rpx;
    }
  }

  .whiteBg {
    margin-top: 10rpx;

    .list {
      border-radius: 16rpx;
      overflow: hidden;

      .item {
        padding: 24rpx 22rpx;
        width: 690rpx;
        height: 98rpx;
        border-radius: 20rpx;
        border: 2rpx solid #eeeeee;
        margin-bottom: 30rpx;
        .row-middle {
          position: relative;

          .texts {
            flex: 1;
            font-size: 28rpx;
            height: 42rpx;
            line-height: 42rpx;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          input {
            flex: 1;
            font-size: 28rpx;
            height: 80rpx;
            line-height: 80rpx;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .code {
            position: absolute;
            right: 30rpx;
            top: 50%;
            color: $theme-color;
            font-size: 26rpx;
            transform: translateY(-50%);
          }
        }
      }
      .item-code-row {
        padding: 10rpx 22rpx;
      }
      .item-code {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item {
          width: 463rpx;
          margin-bottom: 0;
        }
        .code {
          width: 197rpx;
          height: 98rpx;
          border-radius: 20rpx;
          border: 2rpx solid #ff6615;
          font-size: 30rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ff6615;
          line-height: 98rpx;
        }
        .code-icon {
          width: 48rpx;
          height: 48rpx;
        }
        .codeIput {
          // height: 48rpx !important;
        }
      }
    }

    .tips {
      margin: 30rpx;
      text-align: center;
      color: #999;
    }
  }
}
.footer {
  padding: 13rpx 35rpx;
  position: fixed;
  bottom: 0;

  box-sizing: border-box;

  z-index: 277;

  text-align: center;

  width: 100%;
  height: 98rpx;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
}
.logon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 680rpx;
  height: 72rpx;
  background: linear-gradient(90deg, #ff9846 0%, #ff5e0d 100%);
  border-radius: 36rpx;

  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 72rpx;
}
</style>
