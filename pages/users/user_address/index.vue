<template>
  <view>
    <form @submit="formSubmit" report-submit="true">
      <view class="addAddress">
        <view class="list">
          <view class="item acea-row row-between-wrapper text-right" style="border: none">
            <view class="name">姓名</view>
            <input
              type="text"
              placeholder="请填写"
              placeholder-style="color:#ccc;"
              name="realName"
              :value="userAddress.realName"
              placeholder-class="placeholder"
              maxlength="8"
            />
          </view>
          <view class="item acea-row row-between-wrapper text-right">
            <view class="name">电话</view>
            <input
              type="number"
              placeholder="请填写"
              placeholder-style="color:#ccc;"
              name="phone"
              :value="userAddress.phone"
              placeholder-class="placeholder"
              maxlength="11"
            />
          </view>
          <view class="item acea-row row-between-wrapper relative text-right">
            <view class="name">地区</view>
            <view class="address">
              <picker
                mode="multiSelector"
                @change="bindRegionChange"
                @columnchange="bindMultiPickerColumnChange"
                :value="valueRegion"
                :range="multiArray"
              >
                <view class="acea-row">
                  <view class="picker line1"
                    >{{ region[0] }}，{{ region[1] }}，{{ region[2] }}</view
                  >
                  <view class="iconfont">
                    <image
                      class="iconfont-img"
                      src="https://cshy.store/file/sysFile/wechart/address-icon.png"
                      mode="aspectFill"
                      lazy-load="false"
                    >
                    </image>
                  </view>
                </view>
              </picker>
            </view>
          </view>
          <view
            class="item acea-row row-between-wrapper relative item-textarea"
          >
            <!-- <view class='name'>详细地址</view> -->
            <textarea 
              type="text"
              placeholder="请填写详细地址"
              placeholder-style="color:#ccc;"
              name="detail"
              
              placeholder-class="placeholder"
              v-model="userAddress.detail"
              maxlength="20"
            />
            <!-- <view class='iconfont icon-dizhi font-color abs_right' @tap="chooseLocation"></view> -->
          </view>
        </view>
        <view class="default acea-row row-middle">


          <!-- <radio
              class="radio"  @change="ChangeIsDefault"
              :value="userAddress.isDefault"
              :checked="userAddress.isDefault"
            >
              <text :class="{ 'checked-text': userAddress.isDefault }">设置为默认地址</text>
            </radio> -->
         


          <!-- <van-checkbox
            v-model="userAddress.isDefault"
            @change="ChangeIsDefault"
          >
            设置为默认地址
            <template #icon="props">
              <image
                class="img-checked"
                :src="props.checked ? defChecked : defCheckedNo"
              />
            </template>
          </van-checkbox> -->

          <checkbox-group @change='ChangeIsDefault'>
						<checkbox :checked="userAddress.isDefault" />设置为默认地址
					</checkbox-group>
        </view>
        <view class="footer acea-row row-between-wrapper">
          <!-- <view class="settlement" style="z-index: 100" @tap="formSubmit"
            >立即保存</view
          > -->
					<button  class="settlement" form-type="submit">立即保存</button>
        </view>

     
      
      </view>
    </form>
  </view>
</template>

<script>
import { editAddress, getAddressDetail } from '@/api/user.js'
import { getCity } from '@/api/api.js'
import { toLogin } from '@/libs/login.js'
import { mapGetters } from 'vuex'
 
import home from '@/components/home'
// import city from '@/utils/cityData';
let app = getApp()
export default {
  components: {
    
    home,
  },
  data() {
    return {
      regionDval: ['浙江省', '杭州市', '滨江区'],
      cartId: '', //购物车id
      pinkId: 0, //拼团id
      couponId: 0, //优惠券id
      id: 0, //地址id
      userAddress: {
        isDefault: false,
      }, //地址详情
      region: ['省', '市', '区'],
      valueRegion: [0, 0, 0],
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      district: [],
      multiArray: [],
      multiIndex: [0, 0, 0],
      cityId: 0,
      defaultRegion: ['广东省', '广州市', '番禺区'],
      defaultRegionCode: '440113',
      bargain: false, //是否是砍价
      combination: false, //是否是拼团
      secKill: false, //是否是秒杀
      defChecked: ('https://cshy.store/file/sysFile/wechart/checked.png'),
      defCheckedNo: ('https://cshy.store/file/sysFile/wechart/checked_no.png'),
      orderType:null
    }
  },
  computed: mapGetters(['isLogin']),
  watch: {
    isLogin: {
      handler: function (newV, oldV) {
        if (newV) {
          this.getUserAddress()
          this.getCityList()
        }
      },
      deep: true,
    },
  },
  onLoad(options) {

    if (this.isLogin) {
      this.preOrderNo = options.preOrderNo || 0
      this.orderType = options.orderType || null
      this.id = options.id || 0
      uni.setNavigationBarTitle({
        title: options.id ? '修改地址' : '添加地址',
      })
      this.getUserAddress()
      // if (this.$Cache.has('cityList')) {
      //   //检测城市数据是否存在缓存，有的话从缓存取，没有的话请求接口
      //   this.district = this.$Cache.getItem('cityList')
      //   this.initialize()
      // } else {
        this.getCityList()
      // }
    } else {
      toLogin()
    }
  },
  methods: {
    // #ifdef APP-PLUS
    // 获取选择的地区
    handleGetRegion(region) {
      this.region = region
    },
    // #endif
    // 获取地址数据
    getCityList: function () {
      let that = this
      uni.showLoading({
        title: '加载中',
      })
      getCity().then((res) => {
        this.district = res.data
        console.log("1")
        let oneDay = 24 * 3600 * 1000
        this.$Cache.set('cityList', JSON.stringify(res.data)); //设置不过期时间的方法
        // this.$Cache.setItem({
        //   name: 'cityList',
        //   value: res.data,
        //   expires: oneDay * 7,
        // }) //设置七天过期时间
        that.initialize()
      }).finally(() => {
          uni.hideLoading()
        })
    },
    initialize: function () {
      let that = this,
        province = [],
        city = [],
        area = []
      if (that.district.length) {
        console.log("2")
        let cityChildren = that.district[0].child || []
        let areaChildren = cityChildren.length
          ? cityChildren[0].child || []
          : []
        that.district.forEach(function (item) {
          province.push(item.name)
        })
        cityChildren.forEach(function (item) {
          city.push(item.name)
        })
        areaChildren.forEach(function (item) {
          area.push(item.name)
        })
        this.multiArray = [province, city, area]
      }
    },
    bindRegionChange: function (e) {
      let multiIndex = this.multiIndex,
        province = this.district[multiIndex[0]] || {
          child: [],
        },
        city = province.child[multiIndex[1]] || {
          cityId: 0,
        },
        multiArray = this.multiArray,
        value = e.detail.value

      this.region = [
        multiArray[0][value[0]],
        multiArray[1][value[1]],
        multiArray[2][value[2]],
      ]
      this.cityId = city.cityId
      this.valueRegion = [0, 0, 0]
      this.initialize()
    },
    bindMultiPickerColumnChange: function (e) {
      let that = this,
        column = e.detail.column,
        value = e.detail.value,
        currentCity = this.district[value] || {
          child: [],
        },
        multiArray = that.multiArray,
        multiIndex = that.multiIndex
      multiIndex[column] = value
      switch (column) {
        case 0:
          let areaList = currentCity.child[0] || {
            child: [],
          }
          multiArray[1] = currentCity.child.map((item) => {
            return item.name
          })
          multiArray[2] = areaList.child.map((item) => {
            return item.name
          })
          break
        case 1:
          let cityList =
            that.district[multiIndex[0]].child[multiIndex[1]].child || []
          multiArray[2] = cityList.map((item) => {
            return item.name
          })
          break
        case 2:
          break
      }
      // #ifdef MP || APP-PLUS
      this.$set(this.multiArray, 0, multiArray[0])
      this.$set(this.multiArray, 1, multiArray[1])
      this.$set(this.multiArray, 2, multiArray[2])
      // #endif
      // #ifdef H5
      this.multiArray = multiArray
      // #endif
      this.multiIndex = multiIndex
      // this.setData({ multiArray: multiArray, multiIndex: multiIndex});
    },
    // 授权回调
    onLoadFun: function () {
      this.getUserAddress()
    },
    // 授权关闭
    authColse: function (e) {
      this.isShowAuth = e
    },
    toggleTab(str) {
      this.$refs[str].show()
    },
    onConfirm(val) {
      this.region =
        val.checkArr[0] + '-' + val.checkArr[1] + '-' + val.checkArr[2]
    },
    getUserAddress: function () {
      if (!this.id) return false
      let that = this
      getAddressDetail(this.id).then((res) => {
        let region = [res.data.province, res.data.city, res.data.district]
        that.$set(that, 'userAddress', res.data)
        that.$set(that, 'region', region)
        that.city_id = res.data.cityId
      })
    },
    chooseLocation: function () {
      uni.chooseLocation({
        success: (res) => {
          this.$set(
            this.userAddress,
            'detail',
            res.address.replace(/.+?(省|市|自治区|自治州|县|区)/g, '')
          )
        },
      })
    },
   
    /**
     * 提交用户添加地址
     *
     */
    formSubmit: function (e) {
      let that = this,
        value = e.detail.value
      if (!value.realName)
        return that.$util.Tips({
          title: '请填写收货人姓名',
        })
      if (!value.phone)
        return that.$util.Tips({
          title: '请填写联系电话',
        })
      if (!/^1(3|4|5|7|8|9|6)\d{9}$/i.test(value.phone))
        return that.$util.Tips({
          title: '请输入正确的手机号码',
        })
      if (that.region == '省-市-区')
        return that.$util.Tips({
          title: '请选择所在地区',
        })
      if (!value.detail)
        return that.$util.Tips({
          title: '请填写详细地址',
        })
      value.id = that.id
      let regionArray = that.region
      value.address = {
        province: regionArray[0],
        city: regionArray[1],
        district: regionArray[2],
        cityId: that.cityId,
      }
      value.isDefault = that.userAddress.isDefault

      uni.showLoading({
        title: '保存中',
        mask: true,
      })
      editAddress(value)
        .then((res) => {
          if (that.id)
            that.$util.Tips({
              title: '修改成功',
              icon: 'success',
            })
          else
            that.$util.Tips({
              title: '添加成功',
              icon: 'success',
            })
          setTimeout(function () {
            if (that.preOrderNo > 0) {
              if(this.orderType=='order'){
                uni.redirectTo({
                url:
                  '/pages/users/order_confirm/index?preOrderNo=' +
                  that.preOrderNo +
                  '&addressId=' +
                  (that.id ? that.id : res.data.id),
              })
              }else{
                
              uni.redirectTo({
                url:
                  '/pages/users/order_confirm/gift_index?preOrderNo=' +
                  that.preOrderNo +
                  '&addressId=' +
                  (that.id ? that.id : res.data.id),
              })
              }
            } else {
              // #ifdef H5
              return history.back()
              // #endif
              // #ifndef H5
              return uni.navigateBack({
                delta: 1,
              })
              // #endif
            }
          }, 1000)
        })
        .catch((err) => {
          return that.$util.Tips({
            title: err,
          })
        })
    },
    ChangeIsDefault: function (e) {
      this.$set(this.userAddress, e)
    },
  },
}
</script>

<style scoped lang="scss">
.addAddress {
}
.addAddress .list {
  background-color: #fff;
  padding: 0 24rpx;
}

.addAddress .list .item {
  border-top: 1rpx solid #eee;
  height: 102rpx;
  margin-left: 6rpx;
  line-height: 102rpx;
}

.addAddress .list .item .name {
  // width: 195rpx;
  font-size: 30rpx;
  color: #333;
}

.addAddress .list .item .address {
  flex: 1;
  margin-left: 50rpx;
  .iconfont-img {
    width: 48rpx;
    height: 48rpx;
  }
}
.img-checked {
  width: 40rpx;
  height: 40rpx;
}
 
.addAddress .list .text-right input {
	width: 475rpx;
  font-size: 30rpx;
  font-weight: 400;
  text-align: right;
height: 100rpx;
}
.addAddress .list  .item-textarea {
  height: 181rpx;
  align-items: flex-start;
  padding-top: 30rpx;
	text-align: left;
  textarea  {
    height: 181rpx;line-height:30px;
  }
  .placeholder {
    color: #ccc;
    text-align: left;
  }
}
.addAddress .list .item picker .picker {
  width: 520rpx;
  text-align: right;
  font-size: 30rpx;
  margin-right: 10rpx;
}
.acea-row {
  .iconfont {
    display: flex;
    align-items: center;
    justify-content: center;
    // margin-left: 10rpx;
  }
}

.addAddress .default {
  padding: 0 30rpx;
  height: 90rpx;
  background-color: #fff;
  margin-top: 23rpx;
}

.addAddress .default checkbox {
  margin-right: 15rpx;
}

.addAddress .keepBnt {
  width: 690rpx;
  height: 86rpx;
  border-radius: 50rpx;
  text-align: center;
  line-height: 86rpx;
  margin: 80rpx auto 24rpx auto;
  font-size: 32rpx;
  color: #fff;
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
  left: 0;
}

.footer .settlement {
  font-size: 30rpx;
  color: #fff;
  font-weight: 500;
  text-align: center;
  width: 680rpx;
  height: 72rpx;
  background: $bg-gradient;
  border-radius: 36rpx;
  line-height: 72rpx;
}
.addAddress .wechatAddress {
  width: 690rpx;
  height: 86rpx;
  border-radius: 50rpx;
  text-align: center;
  line-height: 86rpx;
  margin: 0 auto;
  font-size: 32rpx;
  color: #e93323;
  border: 1px solid #e93323;
}
.relative {
  position: relative;
}
.icon-dizhi {
  font-size: 44rpx;
  z-index: 100;
}
.abs_right {
  position: absolute;
  right: 0;
}
</style>
