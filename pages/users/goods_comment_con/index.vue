<template>
  <view>
    <form @submit="formSubmit" report-submit="true">
      <view class="evaluate-con">
        <view class="list acea-row row-middle">
          <view class="pictrue" v-for="(item, index) in picsPath" :key="index">
            <image class='pictrue-img' :src="item"></image>
            <text class="iconfont icon-guanbi1" @click="DelPic(index)"></text>
          </view>
          <view
            class="pictrue acea-row row-center-wrapper row-column"
            @click="uploadpic"
            v-if="picsPath.length < 8"
          >
            <text class="iconfont icon-icon25201"></text>
            <view>添加图片</view></view
          >
        </view>
      </view>

      <view class="score borRadius14">
        <view class="score-pictrue">
          <image class="pictrue" :src="productInfo.image"></image>
          <view style="flex: 1">
            <view
              class="item acea-row row-between"
              v-for="(item, indexw) in scoreList"
              :key="indexw"
            >
              <view>{{ item.name }}</view>
              <view class="starsList">
                <text
                  @click="stars(indexn, indexw)"
                  v-for="(itemn, indexn) in item.stars"
                  :key="indexn"
                  class="iconfont"
                  :class="
                    item.index >= indexn ? 'icon-shitixing' : 'icon-kongxinxing'
                  "
                ></text>
              </view>
              <!-- <text class="evaluate">{{
                item.index === -1 ? '' : item.index + 1 + '分'
              }}</text> -->
            </view>
          </view>
        </view>

        <view class="textarea">
          <textarea
            placeholder="描述商品和使用感受，更受欢迎哦~"
            name="comment"
            placeholder-class="placeholder"
          ></textarea>
        </view>
        <view class="footer">
          <button class="evaluateBnt bg-color" formType="submit">
            提交评价
          </button>
        </view>
      </view>
    </form>
 
  </view>
</template>

<script>
import { orderProduct, orderComment } from '@/api/order.js'
import { toLogin } from '@/libs/login.js'
import { mapGetters } from 'vuex'
 
export default {
  components: {
   
  },
  data() {
    return {
      pics: [],
      picsPath: [],
      scoreList: [
        {
          name: '商品质量',
          stars: ['', '', '', '', ''],
          index: -1,
        },
        {
          name: '服务态度',
          stars: ['', '', '', '', ''],
          index: -1,
        },
      ],
      orderId: '',
      productId: 0, //产品id
      evaluateId: 0, //评价id
      unique: '',
      productInfo: {},
      cart_num: 0,
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      id: 0, //订单id
    }
  },
  computed: mapGetters(['isLogin']),
  watch: {
    isLogin: {
      handler: function (newV, oldV) {
        if (newV) {
          this.getOrderProduct()
        }
      },
      deep: true,
    },
  },
  onLoad(options) {
    if (!options.unique || !options.orderId)
      return this.$util.Tips(
        {
          title: '缺少参数',
        },
        {
          tab: 3,
          url: 1,
        }
      )
    this.unique = Number(options.unique) || 0
    this.orderId = options.orderId || 0
    this.evaluateId = Number(options.id) || 0
    if (this.isLogin) {
      this.getOrderProduct()
    } else {
      toLogin()
    }
  },
  methods: {
    onLoadFun() {
      this.getOrderProduct()
    },
    // 授权关闭
    authColse: function (e) {
      this.isShowAuth = e
    },
    /**
     * 获取某个产品详情
     *
     */
    getOrderProduct: function () {
      let that = this
      orderProduct({
        orderId: that.evaluateId,
        uni: that.unique,
      }).then((res) => {
        that.$set(that, 'productInfo', res.data)
        // that.$set(that, 'cart_num', res.data.cartNum);
        // that.$set(that, 'productId', res.data.productId);
      })
    },
    stars: function (indexn, indexw) {
      this.scoreList[indexw].index = indexn
    },
    /**
     * 删除图片
     *
     */
    DelPic: function (index) {
      let that = this,
        pic = this.picsPath[index]
      that.picsPath.splice(index, 1)
      that.pics.splice(index, 1)
    },

    /**
     * 上传文件
     *
     */
    uploadpic: function () {
      debugger
      let that = this
      that.$util.uploadImageOne(
        {
          url: 'user/upload/image',
          name: 'multipart',
          model: 'product',
          pid: 1,
        },
        function (res) {
          that.pics.push(res.data.url)
          that.picsPath.push(res.data.localPath)
          that.$set(that, 'pics', that.pics)
          that.$set(that, 'picsPath', that.picsPath)
        }
      )
    },

    /**
     * 立即评价
     */
    formSubmit: function (e) {
      let formId = e.detail.formId,
        value = e.detail.value,
        that = this,
        product_score =
          that.scoreList[0].index + 1 === 0 ? '' : that.scoreList[0].index + 1,
        service_score =
          that.scoreList[1].index + 1 === 0 ? '' : that.scoreList[1].index + 1
      if (!value.comment)
        return that.$util.Tips({
          title: '请填写你对宝贝的心得！',
        })
      value.productScore = product_score
      value.serviceScore = service_score
      value.pics = that.pics.length > 0 ? JSON.stringify(that.pics) : ''
      value.productId = that.productInfo.productId
      value.orderNo = that.orderId
      value.unique = that.unique
      value.sku = that.productInfo.sku
      uni.showLoading({
        title: '正在发布评论……',
      })
      orderComment(value)
        .then((res) => {
          uni.hideLoading()
          return that.$util.Tips(
            {
              title: '感谢您的评价!',
              icon: 'success',
            },
            '/pages/users/order_details/index?order_id=' + that.orderId
          )
        })
        .catch((err) => {
          uni.hideLoading()
          return that.$util.Tips({
            title: err,
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
page {
  background: #fff;
}
.icon-shitixing {
  color: #fa6400 !important;
}
.evaluate-con {
  background: #fff;
}
.score {
  background-color: #fff;
  // border-top: 1rpx solid #f5f5f5;

  font-size: 30rpx;
  color: #666666;
  padding: 0rpx 30rpx;
  .score-pictrue {
    display: flex;
    align-items: center;
    .pictrue {
      width: 99rpx;
      height: 99rpx;
      border-radius: 20rpx;
      margin-right: 20rpx;
    }
  }
}
.textarea {
  width: 100%;
  background: #f4f4f4;
  border-radius: 20rpx;
  min-height: 380rpx;
  margin-top: 30rpx;
}
.item ~ .item {
  margin-top: 20rpx;
}
.item .starsList {
  // padding: 0 35rpx 0 40rpx;
  .iconfont {
    font-size: 40rpx;
    color: #aaa;
  }
  .iconfont ~ .iconfont {
    margin-left: 20rpx;
  }
  .evaluate {
    color: #aaa;
    font-size: 24rpx;
  }
  .evaluate-con .score .textarea {
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 14rpx;
    margin-top: 55rpx;
  }
}
.textarea textarea {
  font-size: 28rpx;
  padding: 38rpx 30rpx 0 30rpx;
  width: 100%;
  box-sizing: border-box;
  height: 160rpx;
  width: auto !important;
  .placeholder {
    color: #bbb;
  }
}

.list {
  padding-top: 30rpx;

  .pictrue {
    width: 210rpx;
    height: 210rpx;
    margin: 0 0 35rpx 25rpx;
    position: relative;
    font-size: 30rpx;
    color: #333333;
    border-radius: 20rpx;
    background: #f4f4f4;
  }
  .pictrue:nth-last-child(1) {
    border: 1rpx solid #ddd;
    box-sizing: border-box;
    image {
      width: 100%;
      height: 100%;
      border-radius: 14rpx;
    }
  }
	.pictrue-img{
		width: 210rpx;
    height: 210rpx; border-radius: 14rpx;
	}
  .icon-guanbi1 {
    font-size: 45rpx;
    position: absolute;
    top: -20rpx;
    right: -20rpx;
  }
  .icon-icon25201 {
    margin-bottom: 7rpx;
    color: #333333;
    font-size: 50rpx;
  }
}
.footer {
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px #ffffff;
  height: 98rpx;
  left: 0;
  bottom: 0;
  width: 100%;
}
.score .evaluateBnt {
  font-size: 30rpx;
  color: #fff;

  border-radius: 36rpx;
  text-align: center;
  line-height: 72rpx;

  width: 680rpx;
  height: 72rpx;
  margin: 13rpx 35rpx;
}
</style>
