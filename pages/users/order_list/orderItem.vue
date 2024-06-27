<template>
  <view>
    <template v-for="(items, index) in item.orderInfoList" >
      <view  
        :class="{ 'item-info-multiple': index > 0 }"
        class="item-info acea-row row-between row-top"
        @click="goPage('/pages/goods/goods_details/index?id=' + items.productId)"
      >
        <view class="pictrue">
          <image :src="items.image"></image>
        </view>
        <view class="text acea-row row-column-between">
          <view class="acea-row row-between" style="width: 100%">
            <view class="name line1">{{ items.storeName }}</view>
            <view
              class="font-color-status"
              v-if="showorderStatus && index == 0"
              >{{ item | filter_formatStatus }}</view
            >
          </view>
          <view class="money">
            <view>{{items.sku}}</view>
            <view>x{{ items.cartNum }}</view>
            <view v-if='showShip' style="margin-left: 60rpx;">已发货：{{items.shipNum}}</view>
          </view>
          <view class="money">
            <view class="price">{{ items.price }}元</view>
            <view v-if="items.refundNum>0&&item.refundStatus>0" style="margin-left: 60rpx;">退款数量{{ items.refundNum }} </view>
          </view>
        </view>
      </view>
      <view
        class="totalPrice"
        v-if="showTotalPrice && index == item.orderInfoList.length - 1"
      >
        <!-- <view>
        <text class="font-color">{{ items.price }}元</text>
       
      </view> -->
        <view>
          应付
          <text class="money font-color">{{ item.payPrice }}元</text></view
        >
      </view>
    </template>
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    showorderStatus: {
      type: Boolean,
      default: true,
    },
    showTotalPrice: {
      type: Boolean,
      default: true,
    },
    isGoProd: {
      type: Boolean,
      default: true,
    },
  },
  filters:{
    filter_formatStatus(val){
 
     if(val){
      
      let shipNums = val.orderInfoList.map((e) => e.shipNum);
      let payNums = val.orderInfoList.map((e) => e.cartNum);
      const shipNumsTotal = shipNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const payNumsTotal = payNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
 debugger
      if (shipNumsTotal>0&&(shipNumsTotal < payNumsTotal)&&val.refundStatus==0) {
        return "部分发货";
      } else {
        return val.orderStatus;
      }


    }
      
    }
  },
  data() {
    return {
      showShip:false
    }
  },
  // 计算属性
  computed: {
    
  },
  // 监听data中的数据变化
  watch: {
    item: {
      handler(e) {

        let shipNums = e.orderInfoList.map((val) => val.shipNum);
      let payNums = e.orderInfoList.map((val) => val.cartNum);
      const shipNumsTotal = shipNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const payNumsTotal = payNums.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
 
      if (shipNumsTotal>0&&(shipNumsTotal < payNumsTotal)) {
        this.showShip=true
      } else {
        this.showShip=false
      }
  
       
         },
         deep: true,
         immediate: true
        }
    
  },
  // 方法集合
  methods: {
    goPage(url) {
      if (!this.isGoProd) {
        return
      }
      uni.navigateTo({
        url: url,
      })
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
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
.font-color-status {
  color: #fa6400;
}
.item-info {
  .pictrue {
    width: 140rpx;
    height: 140rpx;
    image {
      width: 100%;
      height: 100%;
      border-radius: 20rpx;
    }
  }
  .text {
    flex: 1;
    font-size: 28rpx;

    color: #999;
    align-items: flex-start;
    margin-left: 19rpx;
    .name {
      width: 350rpx;
      flex: 1;
      color: #282828;
    }
    .money {
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 18rpx;
      .org-price {
        text-decoration: line-through;
      }
      .price {
        font-size: 28rpx;

        font-weight: 500;
        color: #2b2b2b;
        margin-right: 10rpx;
      }
    }
  }
}
.item-info-multiple {
  margin-top: 30rpx;

  .text {
    padding-top: 30rpx;
    border-top: 2rpx solid #eeeeee;
  }
  .pictrue {
    margin-top: 30rpx;
  }
}

.totalPrice {
  font-size: 30rpx;
  color: #2b2b2b;
  text-align: right;
  margin: 27rpx 0 0px 0rpx;
  padding-bottom: 17rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1rpx solid #eee;
  justify-content: end;
  align-items: flex-end;

  .font-color {
    font-weight: 500;
    color: #e91331;
    font-size: 34rpx;
  }
}
</style>
