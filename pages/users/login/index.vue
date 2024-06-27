<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-25 10:08:18
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-06-19 11:13:33
 * @FilePath: \cshy-h5\pages\users\login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login-wrapper">
    <div class="whiteBg">
      <div class="list">
        <div class="item">
          <view class="lable">手机号</view>
          <div class="acea-row row-middle">
            <input
              type="number"
              class="texts"
              placeholder="输入手机号码"
              v-model="account"
            />
          </div>
        </div>
        <div class="item">
          <view class="lable">验证码</view>
          <div class="acea-row row-middle">
            <input
              type="text"
              placeholder="填写验证码"
              class="codeIput"
              v-model="captcha"
            />
            <button
              class="code"
              :disabled="disabled"
              :class="disabled === true ? 'on' : ''"
              @click="code"
            >
              {{ text }}
            </button>
          </div>
        </div>
        <div class="item" v-if="isShowCode">
          <div class="acea-row row-middle">
            <image
              src="https://cshy.store/file/sysFile/wechart/code_2.png"
              style="width: 28rpx; height: 32rpx"
            ></image>
            <input
              type="text"
              placeholder="填写验证码"
              class="codeIput"
              v-model="codeVal"
            />
            <div class="code" @click="again"><img :src="codeUrl" /></div>
          </div>
        </div>
        <div class="logon" @click="loginMobile" v-if="current !== 0">登录</div>
        <!-- <button type="default"     @click="getuserinfoEvent">用户信息</button> -->

        <div class="tips">
          <div>未注册手机，验证后自动登录</div>
          <div class="checkbox-tip">
            <!-- <van-checkbox
              style="position: relative; top: 4px"
              icon-size="12"
              checked-color="#FE3B7F"
              v-model="checked"
              shape="round"
            /> -->
            <checkbox-group @change="changeCheckbox">
              <checkbox
                color="#fe3b7f"
                style="transform: scale(0.7)"
                value="checked"
                :checked="checked"
              />
            </checkbox-group>
            <div class="checkbox-tip-text">
              我已阅读并同意<text
                class="checkbox-tip-text-color"
                @click="goPage('/pages/users/login/protocol')"
                >《便利驿站隐私政策》</text
              >和<text
                class="checkbox-tip-text-color"
                @click="goPage('/pages/users/login/protocol2')"
                >《便利驿站用户服务条款》</text
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      登录遇到问题？点此<text class="on" @click="callPhone">联系客服</text>
    </div>
    <!-- <view class="filing-box">
      <Filing></Filing>
    </view> -->
  </div>
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
  userGetToken,
  userToken,
  couponAdd,
} from '@/api/user'

import attrs, { required, alpha_num, chs_phone } from '@/utils/validate'
import { validatorDefaultCatch } from '@/utils/dialog'
import { getLogo, appAuth, appleLogin } from '@/api/public'
import { VUE_APP_API_URL } from '@/utils'
// import Filing from '@/components/Filing'
const BACK_URL = 'login_back_url'

export default {
  name: 'Login',
  mixins: [sendVerifyCode],
  data: function () {
    return {
      current: 1,
      account: '',
      password: '',
      captcha: '',
      formItem: 1,
      type: 'login',
      logoUrl: '',
      keyCode: '',
      codeUrl: '',
      codeVal: '',
      isShowCode: false,
      platform: '',
      appLoginStatus: false, // 微信登录强制绑定手机号码状态
      appUserInfo: null, // 微信登录保存的用户信息
      appleLoginStatus: false, // 苹果登录强制绑定手机号码状态
      appleUserInfo: null,
      appleShow: false, // 苹果登录版本必须要求ios13以上的
      checked: false,
      tickCode: '',
    }
  },
  components: {
    // Filing,
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
    let self = this
    const { q } = options
    if (q) {
      // #ifdef MP-WEIXIN
      let urlStr = decodeURIComponent(q)

      let urlParams = this.getUrlParams(urlStr)
      this.tickCode = urlParams.code
      // #endif
    }

    // #ifdef H5
    let urlParams = this.getUrlParams(window.location.href)

    this.tickCode = urlParams.code
    // #endif

    if (options.code) {
      this.tickCode = options.code
    }

    if (options.tickCode) {
      this.tickCode = options.tickCode
    }
  },
  methods: {
    getuserinfoEvent(e) {
      uni.login({
        provider: 'weixin',
        onlyAuthorize: true, // 微信登录仅请求授权认证
        success: function (event) {
          const { code } = event
          //客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。

          userGetToken({
            code: event.code,
            type: 2,
          }).then((res) => {
            uni.setStorageSync('token', res.data)
          })
        },
        fail: function (err) {
          // 登录授权失败
          // err.code是错误码
        },
      })
    },
    changeCheckbox(e) {
      this.checked = e.detail.value[0]
    },
    goPage(url) {
      if (!url) {
        return this.$util.Tips({
          title: '即将开放，敬请期待！',
        })
      }
      uni.navigateTo({
        url: url,
      })
    },
    callPhone() {
      this.$util.makePhoneCall()
    },

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
      if (!this.checked) {
        return that.$util.Tips({
          title: '请先阅读并同意协议',
        })
      }
      uni.showLoading({
        title: '正在登录中',
      })

      loginMobile({
        phone: that.account,
        captcha: that.captcha,
        spread_spid: that.$Cache.get('spread'),
      })
        .then((res) => {
          let data = res.data
          let newTime = Math.round(new Date() / 1000)

          this.$store.commit('LOGIN', {
            token: res.data.token,
          })
          that.getCouponAdd(data)
          that.getUserInfo(data)
        })
        .catch((res) => {
          that.$util.Tips({
            title: res,
          })
        })
        .finally(() => {
          uni.hideLoading()
        })
    },
    decryptPhoneNumber(e) {
      const appid = 'wx3ac1f72118da0ff7'
      const redirect = encodeURIComponent(`https://cshy.store/front/#/`)

      const openUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}
			&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`

      window.location.href = openUrl
    },
    getCouponAdd() {
      if (!this.tickCode) {
        return
      }
      couponAdd({
        code: this.tickCode,
      })
        .then((res) => {
          uni.showModal({
            title: '提示',
            content: '领取成功',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
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
    navTap: function (index) {
      this.current = index
    },

    getUserInfo(data) {
      let _this = this
      this.$store.commit('SETUID', data.uid)
      getUserInfo().then(async (res) => {
        this.$store.commit('UPDATE_USERINFO', res.data)
        let backUrl = this.$Cache.get(BACK_URL) || '/pages/index/index'
        if (backUrl.indexOf('/pages/users/login/index') !== -1) {
          backUrl = '/pages/index/index'
        }
        let type
        // #ifdef H5
        type = 1
        // #endif

        // #ifdef MP-WEIXIN
        type = 2
        // #endif
        let res1 = await userToken({ type: type })
        if ([null, undefined, ''].includes(res1.message)) {
          uni.setStorage({
            key: 'userToken',
            data: null,
          })
          // #ifdef H5
          if (_this.$wechat.isWeixin()) {
            _this.decryptPhoneNumber()
            returun
          }
          // #endif

          // #ifdef MP-WEIXIN
          this.getuserinfoEvent()
          // #endif
        }
        uni.setStorage({
          key: 'userToken',
          data: res1.message,
        })

        uni.reLaunch({
          url: backUrl,
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.filing-box {
  padding-bottom: 30rpx;
}

/deep/ .uni-input-input {
  height: 80rpx;
    line-height: 80rpx;
}

/deep/ .uni-input-placeholder {
  height: 80rpx;
   line-height: 80rpx;
       font-size: 24rpx;
}

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
  // padding: 30rpx;
  background-image: url(https://cshy.store/file/sysFile/wechart/login-background.png);
  background-size: 750rpx 728rpx;
  background-position: 0 0;
  background-repeat: no-repeat;

  .whiteBg {
    padding-top: 458rpx;

    .list {
      border-radius: 16rpx;
      overflow: hidden;
      margin: 0 30rpx;
      background: #fff;
      padding: 0 40rpx 40rpx 40rpx;

      .item {
        background: #fff;
        font-size: 30rpx;

        color: #2b2b2b;
        line-height: 42rpx;

        .lable {
          font-weight: 500;
        }

        .row-middle {
          position: relative;

          .texts {
            flex: 1;
            font-size: 28rpx;
            height: 30rpx;
            line-height: 30rpx;
            display: flex;
            justify-content: flex-start;
            align-items: center;
			// #ifdef H5
			height: 80rpx;
			line-height: 80rpx;
			// #endif
          }
		.codeIput{	// #ifdef H5
			height: 80rpx;
			line-height: 80rpx;
			// #endif}
          input {
            margin-left: 0;
            flex: 1;
            font-size: 30rpx;
            height: 30rpx;
            line-height: 30rpx;
            display: flex;
            padding: 23rpx 40rpx;
            justify-content: center;
            align-items: center;
            background: #f8f8f9;
            border-radius: 44rpx;
            margin: 30rpx 0 40rpx 0;
          }

          .code {
            background: $bg-gradient;
            width: 220rpx;
            height: 88rpx;

            border-radius: 44rpx;
            font-size: 30rpx;
            line-height: 88rpx;
            text-align: center;
            font-weight: 500;
            color: $base-f;
            margin: 30rpx 0 40rpx 30rpx;
          }
        }
      }
    }

    .logon {
      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 80rpx;
      width: 610rpx;
      height: 98rpx;
      background: #3d403f;
      border-radius: 49rpx;

      color: #ffffff;
      font-size: 32rpx;
    }

    .tips {
      margin: 30rpx;
      font-size: 30rpx;
      text-align: center;
      color: #9a9a9a;

      .checkbox-tip {
        margin-top: 20rpx;
        display: flex;
        align-items: flex-start;

        .checkbox-tip-text {
          font-size: 24rpx;
          margin-left: 20rpx;
          text-align: left;
          width: 500rpx;

          .checkbox-tip-text-color {
            color: #5e54ef;
          }
        }
      }
    }
  }
}

.bottom {
  margin-top: 80rpx;
  font-size: 28rpx;
  padding-bottom: 40rpx;
  font-weight: 400;
  color: #9a9a9a;
  line-height: 40rpx;
  text-align: center;

  .on {
    color: #5e54ef;
  }
}
</style>
