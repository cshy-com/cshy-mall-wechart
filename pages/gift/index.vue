<template>
  <view class="page">
    <view v-if="typeId">
      <view
      class="gift-page"
      v-if="
        cateArr&&cateArr.productList&&cateArr.productList.length > 0
      "
    >
      <view class="banner">
        <image class="banner-image" :src="banner1" fit="cover"></image>
        <view class="gift-title">
       
          <text class="price">
            
            好礼{{ cateArr.productList.length }}选1</text
          >
        </view>
      </view>
      <view class="gift-content">
        <view
          class="content-box"
          :style="{
            'background-image': 'url(' + banner3 + ')',
          }"
        >
          <template
           
          >
            <view
              class="content-gift-box"
              :style="{
                'background-image': 'url(' + banner2 + ')',
              }"
            >
              <view
                class="content-gift-box-grid"
                :class="{
                  'content-gift-box-grid-odd': cateArr.productList.length == 1,
                }"
              >
                <view
                  class="content-gift-box-grid-item"
                  @click="
                    goPage(
                      `/pages/gift/gift_detail?id=${item.productId}&pickupCode=${pickupCode}`
                    )
                  "
                  v-for="item in cateArr.productList"
                >
                  <!-- -->
                  <image
                    class="gift-image"
                    :src="item.image"
                    mode="aspectFill"
                  ></image>

                  <view class="gift-name van-multi-ellipsis--l2">
                    {{ item.productName }}
                  </view>
                </view>
              </view>
              <view
                style="
                  text-align: center;
                  color: rgb(218 48 47);
                  font-size: 14px;
                  opacity: 0.7;
                  margin: 10px 0 8px 0;
                "
              >
                ~ {{ title }}元型 ~
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>
    </view>
    <template v-else>
    <view
      class="gift-page"
      v-if="
        cardInfo && (cardInfo.usingStatus == 1 || cardInfo.usingStatus == 0)
      "
    >
      <view class="banner">
        <image class="banner-image" :src="banner1" fit="cover"></image>
        <view class="gift-title">
       
          <text class="price">
            <template v-if="cardInfo.giftCardType == 368">白银卡-</template>

            <template v-if="cardInfo.giftCardType == 998">铂金卡-</template>

            <template v-if="cardInfo.giftCardType == 1588">钻石卡-</template
            >好礼{{ cardInfo.products.length }}选1</text
          >
        </view>
      </view>
      <view class="gift-content">
        <view
          class="content-box"
          :style="{
            'background-image': 'url(' + banner3 + ')',
          }"
        >
          <template
            v-if="cardInfo.usingStatus == 1 || cardInfo.usingStatus == 0"
          >
            <view
              class="content-gift-box"
              :style="{
                'background-image': 'url(' + banner2 + ')',
              }"
            >
              <view
                class="content-gift-box-grid"
                :class="{
                  'content-gift-box-grid-odd': cardInfo.products.length == 1,
                }"
              >
                <view
                  class="content-gift-box-grid-item"
                  @click="
                    goPage(
                      `/pages/gift/gift_detail?id=${item.id}&pickupCode=${pickupCode}`
                    )
                  "
                  v-for="item in cardInfo.products"
                >
                  <!-- -->
                  <image
                    class="gift-image"
                    :src="item.image"
                    mode="aspectFill"
                  ></image>

                  <view class="gift-name van-multi-ellipsis--l2">
                    {{ item.name }}
                  </view>
                </view>
              </view>
              <view
                style="
                  text-align: center;
                  color: rgb(218 48 47);
                  font-size: 14px;
                  opacity: 0.7;
                  margin: 10px 0 8px 0;
                "
              >
                ~ {{ cardInfo.giftCardType }}元型 ~
              </view>
            </view>
          </template>
        </view>
      </view>
    </view>
    <view class="gift-order" v-if="cardInfo && cardInfo.usingStatus == 2">
      <template v-if="cardInfo.usingStatus == 2">
        <view class="p-30 bgf">
          <view class="content-header">
            <image
              class="header-icon"
              src="https://cshy.store/file/sysFile/wechart/gift/logistics-icon.png"
              mode="aspectFit"
              lazy-load="false"
              binderror=""
              bindload=""
            >
            </image>
            <!-- 如果没发货 -->
            <text v-if="!cardInfo.orderDetails.trackingNo">物流暂未更新</text>
            <!-- 已经发货 -->
            <template v-if="cardInfo.orderDetails.trackingNo">
              <text> 物流信息 </text>
              <view class="logistics-code" @click="goLogisticsPage">
                <text>{{ cardInfo.orderDetails.trackingNo }}</text>
                <image
                  class="header-icon-right"
                  src="https://cshy.store/file/sysFile/wechart/gift/arrow.png"
                  mode="aspectFit"
                  lazy-load="false"
                  binderror=""
                  bindload=""
                >
                </image> </view
            ></template>
          </view>
          <view class="line"></view>
        </view>

        <view class="address acea-row row-between-wrapper">
          <view class="iconfont">
            <image
              class="iconfont-img"
              src="https://cshy.store/file/sysFile/wechart/address-icon.png"
              mode="aspectFill"
              lazy-load="false"
            >
            </image>
          </view>

          <view class="addressCon" v-if="addressInfo.realName">
            <view class="acea-row">
              <text class="line2"
                >{{ addressInfo.province }}{{ addressInfo.city
                }}{{ addressInfo.district }}</text
              >
            </view>
            <view class="acea-row mt-10 address-detail">
              {{ addressInfo.detail }}
            </view>
            <view class="name mt-10">
              {{ addressInfo.realName }}
              <text class="phone">{{ addressInfo.phone }}</text>
            </view>
          </view>
        </view>

        <view class="bgf mt-20">
          <view class="order-goods">
            <orderGoods
              :isShowPrice="false"
              :isShowOrderProNum="false"
              :cartInfo="cartInfo"
              :orderProNum="orderProNum"
            ></orderGoods>
            <view class="wrapper">
              <view class="item order-mark">
                <view>留言备注</view>

                <view class="order-remark-value">
                  {{ cardInfo.orderDetails.remark }}
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="content-box bgf p-30">
          <view class="content-header">
            <image
              class="header-icon"
              src="https://cshy.store/file/sysFile/wechart/gift/gift-icon2.png"
              mode="aspectFit"
              lazy-load="false"
              binderror=""
              bindload=""
            >
            </image>
            <text> 卡券信息 </text>
          </view>
          <view class="content-introduce">
            <view class="introduce-line">
              <text>提货券编码</text>
              <text class="value">{{ cardInfo.pickupCode }}</text>
            </view>
            <view class="introduce-line">
              <text>提货券类型</text>
              <text class="value">多选一</text>
            </view>
            <view class="introduce-line">
              <text>兑换套餐</text>
              <text class="value"
                >雅选尊享礼品自选卡-{{ cardInfo.giftCardType }}元型</text
              >
            </view>
            <view class="introduce-line">
              <text>提货券状态</text>
              <text
                class="value status1"
                v-if="cardInfo.usingStatus == 1 || cardInfo.usingStatus == 0"
                >未使用</text
              >
              <text class="value status2" v-if="cardInfo.usingStatus == 2"
                >已使用</text
              >
            </view>
          </view>
        </view>

        <view class="content-header bgf p-30 mt-20" @click="callPhone">
          <image
            class="header-icon"
            src="https://cshy.store/file/sysFile/wechart/gift/tel-icon.png"
            mode="aspectFit"
            lazy-load="false"
            binderror=""
            bindload=""
          >
          </image>
          <text> 联系客服 </text>
          <image
            class="header-icon-right"
            src="https://cshy.store/file/sysFile/wechart/gift/arrow.png"
            mode="aspectFit"
            lazy-load="false"
            binderror=""
            bindload=""
          >
          </image>
        </view>
      </template>
    </view>
  </template>
  </view>
</template>

<script>
import {giftCardByType } from "@/api/api.js"
import { giftCardGetInfoByPickupCode } from '@/api/activity'
import orderGoods from '@/components/orderGoods'
export default {
  //import引入组件才能使用
  components: { orderGoods },
  props: {},
  data() {
    return {
      cartInfo: [
        {
          productId: '',
          productName: '',
          attrValueId: '',
          image: '',
          sku: '',
          price: '',
          payNum: 1,
          weight: '',
          volume: '',
          tempId: 1,
          giveIntegral: 0,
          isReply: null,
          isSub: false,
          vipPrice: '',
          productType: 0,
        },
      ],
      status: 0,
      addressInfo: {
        id: 3,
        uid: null,
        realName: 'zx',
        phone: '15172480645',
        province: '北京市',
        city: '北京市',
        cityId: null,
        district: '东城区',
        detail: '这里是详细地址',
        postCode: null,
        longitude: null,
        latitude: null,
        isDefault: true,
        isDel: null,
        updateTime: null,
        createTime: null,
      },
      textareaStatus: true,
      orderProNum: 1,
      pickupCode: '',
      cardInfo: {},
      banner1: ('https://cshy.store/file/sysFile/wechart/gift/gift-top-title.png'),
      banner2: ('https://cshy.store/file/sysFile/wechart/gift/gift-top2.png'),
      typeId:null,
      banner3: ('https://cshy.store/file/sysFile/wechart/gift/gift-top3.png'),
   cateArr:[],
   title:''
   
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    async getList(){
let data =await giftCardByType({
  typeId:this.typeId
})
this.cateArr=data.data[0]

    },
    async getInfo() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let { data, code } = await giftCardGetInfoByPickupCode({
          pickupCode: this.pickupCode,
        })
        if (code == 200) {
          this.cardInfo = data
          if (data.usingStatus == 2) {
            this.addressInfo = this.cardInfo.orderDetails.addressinfo

            this.cartInfo[0].productName = data.product.name
            this.cartInfo[0].image = data.product.image
            this.cartInfo[0].sku = data.orderDetails.attrValue.suk
          }
        }
      } catch (e) {
        console.log(e)
        uni.showToast({
          title: e || '接口报错',
          icon: 'none',
        })
      } finally {
        uni.hideLoading()
      }
    },
    goPage(url) {
      if (this.cardInfo.usingStatus == 0) {
        uni.showToast({
          title: '卡片暂未激活，请联系客服',
          icon: 'none',
        })
        return false
      }
      uni.navigateTo({
        url: url,
      })
    },
    callPhone() {
      this.$util.makePhoneCall()
    },
    goLogisticsPage() {
      let address = encodeURIComponent(JSON.stringify(this.addressInfo))
      uni.navigateTo({
        url: `/pages/gift/gift_logistics?trackingNo=${this.cardInfo.orderDetails.trackingNo}&addressInfo=${address}&userMobile=${this.cardInfo.orderDetails.addressinfo.phone}`,
      })
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
   
      
  },
  onLoad(options){
    if (options.typeId) {
      this.typeId=options.typeId
      this.title=options.title
this.getList()
    }else{
      this.$store.commit('LOGOUT')
    let urlParams = this.$getURLParams()
    this.pickupCode = urlParams.pickupCode
    this.getInfo()
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
.page {
  background: rgba(198, 230, 225, 1);
  background-image: url('https://cshy.store/file/sysFile/wechart/gift/gift-top.png');
  background-size: 750rpx 943rpx;
  background-position: top center;
  background-repeat: no-repeat;
  padding-bottom: 45rpx;
}
.p-30 {
  padding: 30rpx;
}
.bgf {
  background: #fff;
}
.mt-10 {
  margin-top: 10rpx;
}
.mt-20 {
  margin-top: 20rpx;
}
.line {
  width: 690rpx;
  height: 1rpx;

  border-bottom: 2rpx solid #eeeeee;
  margin-top: 28rpx;
}
.address {
  padding: 0 18rpx 30rpx 18rpx;
  background-color: #fff;
  box-sizing: border-box;
  background-image: url('https://cshy.store/file/sysFile/wechart/address-bg.png');
  background-size: 750rpx 6rpx;
  background-position: left bottom;
  background-repeat: no-repeat;
  justify-content: flex-start;
  .iconfont-img {
    width: 48rpx;
    height: 48rpx;
  }
  .addressCon {
    width: 610rpx;
    margin-left: 18rpx;

    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 40rpx;
  }
  .set-address {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .addressCon .address-detail {
    font-weight: 600;
    color: #333333;
    font-size: 30rpx;
  }
  .addressCon .name .phone {
    margin-left: 20rpx;
  }
  .addressCon .default {
    margin-right: 12rpx;
  }
  .addressCon .setaddress {
    color: #333;
    font-size: 30rpx;
  }
  .addressCon .setaddress-tip {
    color: #999999;
    font-size: 28rpx;
  }
  .iconfont {
    font-size: 35rpx;
    color: #707070;
  }
}
.content-header {
  display: flex;
  align-items: center;
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 42rpx;
  .header-icon {
    width: 44rpx;
    height: 44rpx;
    margin-right: 10rpx;
  }
  .header-icon-right {
    width: 17rpx;
    height: 30rpx;
    margin-left: auto;
  }
  .remarks {
    font-size: 28rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 40rpx;
    margin-left: auto;
  }
}
.content-introduce {
  margin-top: 22rpx;
  margin-bottom: 3rpx;
  margin-left: 3rpx;
  .introduce-line {
    margin-bottom: 24rpx;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 42rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .value {
      color: #666;
    }
    .status1 {
      color: #4db317;
    }
    .status2 {
      color: #ff6816;
    }
  }
  .introduce-line:last-child {
    margin-bottom: 0;
  }
}
.gift-page {
  .banner {
    padding-top: 734rpx;
    position: relative;
    .banner-image {
      width: 750rpx;
      height: 478rpx;
    }
    .gift-title {
      position: absolute;

      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      top: 746rpx;
      width: 100%;
    }
    .tip {
      line-height: 70rpx;

      font-size: 50rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    .price {
      line-height: 70rpx;

      font-size: 44rpx;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
  .gift-content {
    // border-radius: 30rpx 30rpx 0 0;
    margin-top: -320rpx;
    // background: #fff;
    width: 100%;

    .content-box {
      background-size: 750rpx 232rpx;
      background-position: left bottom;
      background-repeat: no-repeat;
    
      padding-bottom: 26rpx;
      position: relative;
      .content-icon {
        position: absolute;
        right: 51rpx;
        top: -82rpx;
        width: 133rpx;
        height: 133rpx;
      }

      .content-gift-box {
        background-size: 750rpx 100%;
        background-position: left center;
       
        border-radius: 60rpx;
        background-repeat: no-repeat;
        .content-gift-box-grid {
          padding-left: 46rpx ;
          padding-right: 46rpx ;
          display: flex;
          flex-wrap: wrap;
          margin-top: 20rpx;
          .content-gift-box-grid-item {
            margin-right: 20rpx;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            width: 319rpx;
            background: #fff;
            border-radius: 20rpx;
            margin-bottom: 20rpx;
            .gift-image {
              width: 319rpx;
              height: 309rpx;
              border-radius: 20rpx 20rpx 0 0;
              background-image: url(https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif);
              background-size: 319rpx 309rpx;
              background-repeat: no-repeat;
              background-position: center;
              background-color: #f4f4f4;
              img {
                border-radius: 20rpx 20rpx 0 0;
              }
            }
            .gift-name {
              margin: 15rpx 18rpx 30rpx 18rpx;
              font-size: 30rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #333333;
              line-height: 42rpx;
              width: 281rpx;
            }
          }
          .content-gift-box-grid-item:nth-child(2n) {
            margin-right: 0;
          }
        }

        .content-gift-box-grid-odd {
          .content-gift-box-grid-item {
            width: 660rpx;
            margin-right: 0;
            .gift-image {
              width: 100%;
            }
            .gift-name {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
.order-goods {
  margin-bottom: 30rpx;
  /deep/ .orderGoods {
  }

  .order-mark {
    margin: 0 30rpx;
    padding-bottom: 15px;
    margin-top: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .order-remark-value {
    max-width: 500rpx;
  }
}
.logistics-code {
  margin-left: auto;
  display: flex;
  align-items: center;
  font-size: 28rpx;
  // color: #FF6816;
  font-weight: 400;
  color: #999999;
  text {
    margin-right: 10rpx;
  }
}
.address-content {
  background: #f1f1f1;
  padding: 30rpx;
  border-radius: 20rpx;
  margin-top: 25rpx;
  margin-bottom: 25rpx;
  display: flex;
  justify-content: flex-start;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
  .address-lable {
    font-size: 30rpx;
    font-weight: 500;
    margin-right: 34rpx;
  }
  .address-value {
    flex: 1;
  }
  .line {
    margin: 0 10rpx;
  }
}
</style>
