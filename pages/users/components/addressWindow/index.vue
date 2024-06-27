<template>
  <view>
    <view class="address-window" :class="address.address == true ? 'on' : ''">
      <view class="title"
        >收货地址<text class="iconfont icon-guanbi" @tap="close"></text
      ></view>
      <view class="list">
        <view
          class="item acea-row row-between-wrapper"
          :class="active == index ? 'font-color' : ''"
          v-for="(item, index) in addressList"
          @tap="tapAddress(index, item.id)"
          :key="index"
        >
          <view class="address">
            <view class="name"  
              >{{ item.realName
              }}<text class="phone">{{ item.phone }}</text></view
            >
            <view class="line1"
              >{{ item.province }}{{ item.city }}{{ item.district
              }}{{ item.detail }}</view
            >
          </view>
          <view
            class="address-bottom"
            hover-class="none"
            hover-stop-propagation="false"
          >
            <image
              class="img-checked"
              :src="active == index ? defChecked : defCheckedNo"
            />
            <text>已设为当前使用地址</text>
          </view>
          <!-- <radio class="radio" :value="item.id" :checked="item.isDefault">
              <text>已设为当前使用地址 {{ index }} {{ item.isDefault }}</text>
            </radio> -->

          <!-- <text class='iconfont icon-ditu' :class='active==index?"font-color":""'></text>
					
					<text class='iconfont icon-complete' :class='active==index?"font-color":""'></text> -->
        </view>
      </view>
      <!-- 无地址 -->
      <view class="pictrue" v-if="!is_loading && !addressList.length">
        <image src="https://cshy.store/file/sysFile/wechart/noAddress.png"></image>
      </view>
			<view class="footer">      <view class="addressBnt bg-color" @tap="goAddressPages">选择其地址</view>
		</view>

		</view>
    <view
      class="mask"
      catchtouchmove="true"
      :hidden="address.address == false"
      @tap="close"
    ></view>
  </view>
</template>

<script>
import { getAddressList } from '@/api/user.js'
export default {
  props: {
    pagesUrl: {
      type: String,
      default: '',
    },
    address: {
      type: Object,
      default: function () {
        return {
          address: true,
          addressId: 0,
        }
      },
    },
    isLog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: 0,
      is_loading: true,
      addressList: [],
      defChecked: ('https://cshy.store/file/sysFile/wechart/checked.png'),
      defCheckedNo: ('https://cshy.store/file/sysFile/wechart/checked_no.png'),
    }
  },

  methods: {
    tapAddress: function (e, addressid) {
      
      this.active = e
      let a = {}
      for (let i = 0, leng = this.addressList.length; i < leng; i++) {
        if (this.addressList[i].id == addressid) {
          a = this.addressList[i]
        }
      }
      this.$emit('OnChangeAddress', a)
    },
    close: function () {
      
      this.$emit('changeClose')
      this.$emit('changeTextareaStatus')
    },
    goAddressPages: function () {
      this.$emit('changeClose')
      this.$emit('changeTextareaStatus')
      uni.navigateTo({
        url: this.pagesUrl,
      })
    },
    getAddressList: function () {
      
      let that = this
      getAddressList({
        page: 1,
        limit: 5,
      }).then((res) => {
        let addressList = res.data.list
        that.$set(that, 'addressList', addressList)
        that.is_loading = false
        let defaultAddress = {}
        //处理默认选中项
        if (!that.address.addressId) return
        for (let i = 0, leng = addressList.length; i < leng; i++) {
          if (addressList[i].id == that.address.addressId) {
            that.active = i
            defaultAddress = this.addressList[i]
          }
        }
        this.$emit('OnDefaultAddress', defaultAddress)
      })
    },
  },
}
</script>

<style scoped lang="scss">
.address-window {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 101;
  transform: translate3d(0, 100%, 0);
  transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
}

.address-window.on {
  transform: translate3d(0, 0, 0);
}

.address-window .title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  height: 123rpx;
  line-height: 123rpx;
  position: relative;
}

.address-window .title .iconfont {
  position: absolute;
  right: 30rpx;
  color: #8a8a8a;
  font-size: 35rpx;
}
.address-window .list {
  background: #f5f5f5;
	margin-top: -30rpx;
	margin-bottom: 98rpx;
}
.address-window .list .item {
  padding-right: 30rpx;
  // border-bottom: 1px solid #eee;

  font-size: 25rpx;
  color: #333;
  background: #fff;
  padding-left: 30rpx;
  margin-bottom: 20rpx;
  padding-bottom: 27rpx;
  padding-top: 30rpx;
}
.address-window .list .item:last-child{
padding-bottom: 100rpx;
}
.address-window .list .item .iconfont {
  font-size: 37rpx;
  color: #2c2c2c;
}

.address-window .list .item .iconfont.icon-complete {
  font-size: 30rpx;
  color: #fff;
}

.address-window .list .item .address {
  width: 560rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 40rpx;
}
.address-window .list .item .address-bottom {
  margin-top: 20rpx;
  border-top: 2rpx solid #eeeeee;
  padding-top: 20rpx;
  width: 100%;
  display: flex;
  align-items: center;
}
.address-window .list .item .address .name {
  font-size: 30rpx;
  font-weight: 500;
  color: #333333;
  margin-bottom: 10rpx;
}

.address-window .list .item .address .name .phone {
  margin-left: 18rpx;
  font-size: 28rpx;
  font-weight: 400;
}
.footer {
  width: 100%;
  height: 100rpx;
  background-color: #fff;
  padding: 13rpx 35rpx;
  font-size: 28rpx;
  color: #333;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
}

.address-window .addressBnt {
  font-size: 30rpx;
  font-weight: bold;
  color: #fff;
	width: 680rpx;
  height:72rpx;
	background: $bg-gradient;
  border-radius: 36rpx;
  text-align: center;
  line-height:72rpx;
  margin: 0rpx auto;
}

.address-window .pictrue {
  width: 414rpx;
  height: 336rpx;
  margin: 0 auto;
}

.address-window .pictrue image {
  width: 100%;
  height: 100%;
}

.img-checked {
  width: 40rpx;
  height: 40rpx;
	margin-right: 10rpx;
}
</style>
