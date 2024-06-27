<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2024-03-25 11:37:12
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-20 10:01:57
 * @FilePath: \cshy-h5\pages\index\priceGoods.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="price-box">
    <view class="price-title">
      <view class="line"></view>
      <text class="title-font">价格选区</text>
      <text class="title-more" @click="goMore()">查看更多></text>
    </view>
    <view class="price-select-all">
      <view
        class="price-select-item"
        :class="{ 'price-select-item-active': index == activeIndex }"
        @click="changePrice(index)"
        v-for="(item, index) in tabPrices"
        :key="item.id"
        >{{ item.priceText }}
      </view>
    </view>
    <!-- 商品 -->
    <!-- <productGrid :goodScroll="true" :showTip="false" @goDetail="goDetail" :tempArr="tempArr"></productGrid> -->
<!--     -->
    <view class="list-box animated">
      <view class="item"  v-for="(item, index) in tempArr"
      :key="index"
      @click="goDetail(item)">
        <view class="pictrue"> <image :src="item.image" mode=""></image></view>
        <view class="text-info">
          <view class="title van-multi-ellipsis--l2">{{ item.storeName }}</view>
          <view class="price-box">
            <view class="price">
              {{ item.price }}<text>元</text>
              <!-- <view class="txt" v-if="item.checkCoupon">券</view> -->
            </view>
            <!-- <view class="old-price">{{ item.otPrice }}元</view> -->
          </view>
        </view>
      </view>
    </view>
    <view> </view>
  </view>
</template>

<script>
import {
  getCategoryList,
  getProductslist,
  getProductHot,
  getGroomList,
} from '@/api/store.js'
import productGrid from '@/components/productGrid.vue'
export default {
  //import引入组件才能使用
  components: { productGrid },
  props: {},
  data() {
    return {
      tempArr: [],
      activeIndex: 0,
      tabPrices: [
        {
          minPrice: 0,
          maxPrice: 50,
          priceText: '¥0-¥50',
          type: 1,
        },
        {
          priceText: '¥51-¥100',
          type: 2,
          minPrice: 51,
          maxPrice: 100,
        },
        {
          priceText: '¥101-¥150',
          type: 3,
          minPrice: 101,
          maxPrice: 150,
        },
        {
          priceText: '¥151-¥200',
          type: 4,
          minPrice: 151,
          maxPrice: 200,
        },
        {
          priceText: '¥201-¥250',
          type: 5,
          minPrice: 201,
          maxPrice: 250,
        },
        {
          priceText: '¥251-¥300',
          type: 6,
          minPrice: 251,
          maxPrice: 300,
        },
      ],
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    changePrice(index) {
      this.activeIndex = index
      this.getPriceRange()
    },

    
    // 价格区间筛选
    getPriceRange() {
      getProductslist({
        minSalePrice: this.tabPrices[this.activeIndex].minPrice,
        maxSalePrice: this.tabPrices[this.activeIndex].maxPrice,
        page: 1,
        limit: 6,
      }).then((res) => {
        this.tempArr = res.data.list
      })
    },
    goMore(){
        uni.navigateTo({
        url: `/pages/goods/goods_list/index?minSalePrice=${this.tabPrices[this.activeIndex].minPrice}&maxSalePrice=${this.tabPrices[this.activeIndex].maxPrice}`,
      })
    },
    goDetail(item) {
      uni.navigateTo({
        url: `/pages/goods/goods_details/index?id=${item.id}`,
      })
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {
    this.getPriceRange()
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
.price-box {
  background: #fff;
}
.price-title {
  display: flex;
  align-items: center;
  .line {
    background: linear-gradient(270deg, #fe3b7f 0%, #ff7c5c 100%);
    width: 2px;
    height: 17px;
    border-radius: 7px;
    margin-right: 8px;
    margin-left: 10px;
  }
  .title-font {
    font-size: 15px;
    color: #2b2b2b;
    font-weight: 600;
  }
  .title-more {
    margin-left: auto;
    margin-right: 10px;
  }
}
.price-select-all {
  font-size: 13px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2b2b2b;
  line-height: 18px;
  margin: 4px 0 15px 0;
  display: flex;
  flex-wrap: wrap;
  .price-select-item {
    text-align: center;
    margin: 0 20px;
    margin-top: 5px;
    width: 80px;
    border-radius: 30px;
    padding: 2px 5px;
  }
  .price-select-item-active {
    background: linear-gradient(270deg, #fe3b7f 0%, #ff7c5c 100%);

    color: #fff;
  }
}

.list-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
margin: 0 10px;
  .item {
    width: 220rpx;
    margin-bottom: 20rpx;
    background-color: #fff;
    border-radius: 20rpx;
    margin-left: 10px;
    overflow: hidden;

    image {
      width: 100%;
      height: 220rpx;
      background-image: url(https://cshy.store/file/sysFile/wechart/gif/img_donghua.gif);
      background-size: 100% 220rpx;
      background-position: no-repeat;
      background-position: 0;
    }
    .text-info {
      padding: 20rpx;

      .title {
        color: #2b2b2b;
        font-size: 30rpx;
      }
      .price-box {
        display: flex;
        justify-content: space-between;
        margin-top: 10rpx;
      }
      .old-price {
        font-size: 28rpx;
        color: #9a9a9a;
        text-decoration: line-through;

        text {
          margin-right: 2px;
          font-size: 20rpx;
        }
      }

      .price {
        display: flex;
        align-items: flex-end;
          color: #2b2b2b;
        font-size: 34rpx;
        font-weight: 400;

        text {
          padding-bottom: 4rpx;
          font-size: 24rpx;
          font-weight: 800;
        }

        .txt {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28rpx;
          height: 28rpx;
          margin-left: 15rpx;
          margin-bottom: 10rpx;
         
          border-radius: 4rpx;
          font-size: 22rpx;
          font-weight: normal;
        }
      }
    }
    &:nth-child(3n-2){
        margin-left: 0;
    }
  }
}
</style>
