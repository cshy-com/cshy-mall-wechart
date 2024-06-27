<template>
  <view>
    <form @submit="subRefund" report-submit="true">
      <view class="apply-return">
        <view class="list">
          <view
            class="item acea-row row-between-wrapper"
            @tap="popModelChange('type')"
          >
            <view>申请类型</view>

            <view class="picker acea-row row-between-wrapper">
              <view class="reason">{{
                RefundTypeArr[RefundTypeActive].lable
              }}</view>
              <text class="iconfont icon-jiantou"></text>
            </view>
          </view>
          <view
            class="item acea-row row-between-wrapper"
            @tap="popModelChange('status')"
          >
            <view>收货状态</view>

            <view class="picker acea-row row-between-wrapper">
              <view class="reason">{{
                takeDeliveryStatusArr[takeDeliveryStatusActive].lable
              }}</view>
              <text class="iconfont icon-jiantou"></text>
            </view>
          </view>
          <!-- <view class="item acea-row row-between-wrapper">
            <view>退货件数</view>
            <view class="num">{{ orderInfo.totalNum }}</view>
          </view> -->
          <view
            class="item acea-row row-between-wrapper"
            @tap="popModelChange('region')"
          >
            <view>退款原因</view>

            <view class="picker acea-row row-between-wrapper">
              <!-- {{ ( RefundArray[0].lable)}} {{activeIndex}} {{RefundArray.length}} -->
              <view class="reason"  v-if="RefundArray&&RefundArray.length>0">{{ RefundArray[activeIndex].lable }}</view>
              <text class="iconfont icon-jiantou"></text>
            </view>
          </view>
          <view class="line"></view>
          <view class="item-money">
            <view>申请金额</view>

            <view class="item-money-num">
              ￥<input v-model='returnMoney' @input="onKeyInput" @blur="blueINput"
               
                class="uni-input"
                type="number"
                placeholder="请输入退款金额"
              />
              <text class="right-icon"> <van-icon name="edit" />修改金额 </text>
            </view>
          </view>
          <view class="line"></view>

          <view class="item acea-row row-between" style="border: none">
            <view class="title acea-row row-between-wrapper">
              <view>申请说明</view>
              <view class="tip">( 最多可上传3张 )</view>
            </view>
            <view class="up-remark">
              <textarea
                placeholder="非必填，请您填写申请说明，100字以内"
                auto-height
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
          <view class="item acea-row row-between-wrapper"  >
            <view>联系电话</view>

            <view class="picker acea-row row-between-wrapper">
              <view class="reason">
                <input style="text-align: right;"
                v-model="returnPhone"
                class="uni-input"
                type="number"
                placeholder=""
              />
              </view>
              <text class="iconfont icon-jiantou"></text>
            </view>
          </view>
          <view class="return-footer">
            <button class="returnBnt bg-color" form-type="submit">
              申请退款
            </button>
          </view>
        </view>
      </view>
    </form>
    <popModel
      :popTitle="popTitle"
      :popActive="popActive"
      :popOptions="popOptions"
      ref="popModelRef"
      @savaPop="savaPop"
    ></popModel>
  </view>
</template>
<script>
import {
  ordeRefundReason,
  orderRefundVerify,
  applyRefund,
} from '@/api/order.js'
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
      orderInfo: {},
      RefundArray: [],
      RefundTypeArr: [
        {
          value: '0',
          lable: '我要退款（无需退货）',
        },
        {
          value: '1',
          lable: '我要退款退货',
        },
      ],
      activeIndex: 0,
      RefundTypeActive: 0,
      orderId: 0,
      isAuto: false, //没有授权的不会自动授权
      isShowAuth: false, //是否隐藏授权
      takeDeliveryStatusArr: [
        {
          value: '0',
          lable: '未收到货',
        },
        {
          value: '1',
          lable: '已收到货',
        },
      ],
      takeDeliveryStatusActive: 0,
      returnMoney: 0,
      returnPhone:null,
      popOptions: [],
      popActive: 0,
payPrice:'',
      popTitle: '',
      modeType: '',
      refundPrice:null,
      returnList:[]
    }
  },
  computed: mapGetters(['isLogin','userInfo']),
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
		if(options.type){
			this.RefundTypeActive = Number(options.type)
		}
    if(options.price){
      this.returnMoney=options.price
    }
    if (this.isLogin) {
      this.returnPhone=this.userInfo.phone
      this.getOrderInfo()
      this.getRefundReason()
    } else {
      toLogin()
    }
  },
  methods: {
    blueINput(){
      let that=this
      if(Number(that.returnMoney) >Number( that.payPrice)){
            
      uni.showModal({
	title: '提示',
	content: '退款金额超出支付金额',
	success: function (res) {
		if (res.confirm) {
			console.log('用户点击确定');
		} else if (res.cancel) {
			console.log('用户点击取消');
		}
	}
});

      that.refundPrice=0
      that.returnMoney=0
      }
    
    },
    onKeyInput: (event) =>{
      let  that=this
    
            this.refundPrice = event.target.value
        },
    savaPop(e) {
      this.popActive = e
      if (this.modeType == 'type') {
        this.RefundTypeActive = this.popActive
      }
      if (this.modeType == 'status') {
        this.takeDeliveryStatusActive = this.popActive
      }
      if (this.modeType == 'region') {
        this.activeIndex = this.popActive
      }
    },
    popModelChange(type) {
      this.$refs.popModelRef.ispopModel = true
      this.modeType = type
      if (type == 'type') {
        this.popOptions = this.RefundTypeArr
        this.popActive = Number(this.RefundTypeActive)
        this.popTitle = '请选择申请类型'
        return
      }
      if (type == 'status') {
        this.popOptions = this.takeDeliveryStatusArr
        this.popActive = Number(this.takeDeliveryStatusActive)
        this.popTitle = '请选择收货状态'
        return
      }
      if (type == 'region') {
        this.popOptions = this.RefundArray
        this.popActive = Number(this.activeIndex)
        this.popTitle = '请选择退款原因'
        return
      }
    },
    callPhone() {
      this.$util.makePhoneCall()
    },
    onLoadFun: function () {
      this.getOrderInfo()
      this.getRefundReason()
    },
    /**
     * 获取订单详情
     *
     */
    getOrderInfo: function () {
      let that = this
      applyRefund(that.orderId).then((res) => {
        that.$set(that, 'orderInfo', res.data)
        uni.getStorage({
	key: 'return_key',
	success:  (sto)=> {
  this.returnList=sto.data
	 
	}
});
         that.payPrice=res.data.payPrice
        // that.returnMoney=res.data.payPrice
      })
    },
    /**
     * 获取退款理由
     */
    getRefundReason: function () {
      let that = this
      ordeRefundReason().then((res) => {
				const arr=[]
        res.data.forEach((val, index) => {
          
          let a = {
            value: index+'',
            lable: val,
          }
          arr.push(a)
        })
         
        that.$set(that, 'RefundArray', arr)
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

    /**
     * 申请退货
     */
    subRefund(e)  {
      let that = this,
        value = e.detail.value
      //收集form表单
      // if (!value.refund_reason_wap_explain) return this.$util.Tips({title:'请输入退款原因'});
      if(Number(that.returnMoney) >Number( that.payPrice)){
              uni.showToast({
        title: '退款金额超出支付金额',
        duration: 2000
      });
      }
      let refundOrderInfoRequestList=[]
      this.returnList.forEach(val=>{
        refundOrderInfoRequestList.push({
          orderInfoId:val.id,
          refundNum:val.returnNum
        })
      })
      let params={
        refundPrice:this.returnMoney,
        text: that.RefundArray[that.activeIndex].lable || '',
        refund_reason_wap_explain: value.refund_reason_wap_explain,
        refund_reason_wap_img: that.refund_reason_wap_imgPath.join(','),
        uni: that.orderId,
        refundType:that.RefundTypeArr[that.RefundTypeActive].value,
        mobile:that.returnPhone,
        refundReceivingStatus:that.takeDeliveryStatusArr[that.takeDeliveryStatusActive].value,
        refundOrderInfoRequestList:refundOrderInfoRequestList
      }
       
      orderRefundVerify(params)
        .then((res) => {
          return this.$util.Tips(
            { title: '申请成功', icon: 'success' },
            { tab: 5, url: '/pages/users/user_return_list/index?isT=1' }
          )
        })
        .catch((err) => {
          return this.$util.Tips({ title: err })
        })
    },
   
    PickerChangeType(e) {
      this.$set(this, 'RefundTypeActive', e.detail.value)
    },
    PickerChangeStatus(e) {
      this.$set(this, 'takeDeliveryStatusActive', e.detail.value)
    },
  },
}
</script>

<style scoped lang="scss">
.apply-return {
}
.apply-return .list {
  background-color: #fff;
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
    .item-money-num {
      width: 100%;
      margin-top: 20rpx;
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
