
<template>
  <view>
    <view class="searchGood">
       

      <view class="search-sort" v-if="bastList && bastList.length > 0">
        <view class="search-sort-box">
          <view
            class="search-sort-item"
            :class="{ 'search-sort-item-active': searchActive == 0 }"
            @click="changeTabSearch(0)"
          >
            综合排序
          </view>
          <view
            @click="changePriceSearch()"
            class="search-sort-item search-price"
            :class="{ 'search-sort-item-active': searchActive == 1 }"
          >
            <text>价格</text>
          
            <view class="search-price-font">
              <image v-if="priceOrder == 'desc' && searchActive == 1" src='https://cshy.store/file/sysFile/wechart/up.png'></image>
					<image v-else-if="priceOrder == 'asc' && searchActive == 1" src='https://cshy.store/file/sysFile/wechart/down.png'></image>
					<image v-else src='https://cshy.store/file/sysFile/wechart/horn.png'></image>

              
            </view>
          </view>
          <view
            @click="changeSaleSearch()"
            class="search-sort-item search-price"
            :class="{ 'search-sort-item-active': searchActive ==2  }"
          >
            <text>销量</text>
          
            <view class="search-price-font">
              <image v-if="saleOrder == 'desc' && searchActive == 2" src='https://cshy.store/file/sysFile/wechart/up.png'></image>
					<image v-else-if="saleOrder == 'asc' && searchActive == 2" src='https://cshy.store/file/sysFile/wechart/down.png'></image>
					<image v-else src='https://cshy.store/file/sysFile/wechart/horn.png'></image>

              
            </view>
          </view>
       
          <view
            class="search-sort-item"
            @click="changeShowType()"
            :class="{ 'search-sort-item-active': searchActive == 3 }"
          >
            <image
              class="search-sort-icon"
              :src="('https://cshy.store/file/sysFile/wechart/grid.png')"
              mode="aspectFit"
              v-if="defType == 'row'"
              lazy-load="false"
            >
            </image>
            <image
              v-if="defType == 'grid'"
              class="search-sort-icon"
              :src="('https://cshy.store/file/sysFile/wechart/seach-1.png')"
              mode="aspectFit"
              lazy-load="false"
            >
            </image>
          </view>
        </view>
      </view>
      <view class="search-goods" v-if="bastList.length > 0">
        <productGrid
          v-if="defType == 'grid'"
          :iSshowH="iSshowH"
          :tempArr="bastList"  @goDetail="goDetail"
        ></productGrid>
        <goodList v-if="defType == 'row'" :bastList="bastList"></goodList>
      </view>

      <view
        class="loadingicon acea-row row-center-wrapper"
        v-if="bastList.length > 0"
      >
        <text
          class="loading iconfont icon-jiazai"
          :hidden="loading == false"
        ></text
        >{{ loadTitle }}
      </view>
    </view>
   
    <commonUserTabBar :currentTab="'/pages/goodsAll/index'"></commonUserTabBar>
  </view>
</template>

<script>
import {
  getSearchKeyword,
  getProductslist,
  getProductHot,
} from '@/api/store.js'
import goodList from '@/components/goodList'
import recommend from '@/components/recommend'
import { mapGetters } from 'vuex'
import productGrid from '@/components/productGrid.vue'
export default {
  components: {
    goodList,
    recommend,
    productGrid,
  },
  data() {
    return {
      hostProduct: [],
      searchValue: '',
      focus: false,
      bastList: [],
      hotSearchList: [],
      first: 0,
      limit: 8,
      page: 1,
      loading: false,
      loadend: false,
      loadTitle: '加载更多',
      hotPage: 1,
      isScroll: true,
      isbastList: false,
      logoUrl: ('https://cshy.store/file/sysFile/wechart/0.jpg'),
      searchActive: 0,
      // searchHistory:[]
      searchHistory: ['好吃的', '好喝的', '好玩的'],
      defType: 'row', //row grid
      priceOrder: 'asc', // asc 升序  desc 降序
      saleOrder:''
    }
  },
  computed: {
    ...mapGetters([  'uid']),
  },
  onShow: function () {
    
    this.getProductList()
    
  },
  onReachBottom: function () {
    if (this.bastList.length > 0) {
      this.getProductList()
    } else {
    
    }
  },
  methods: {
       // 首发新品详情
       goDetail(item) {
      
      
          uni.navigateTo({
            url: `/pages/goods/goods_details/index?id=${item.id}`,
          })
      
   
    },
   
   
    changeShowType() {
      this.defType = this.defType == 'row' ? 'grid' : 'row'
    },
    changeTabSearch(index) {
      this.searchActive = index
      this.page = 1
      this.loadend = false
      this.loading = false
      this.$set(this, 'bastList', [])
      this.priceOrder = null
      this.getProductList()
    },
    changePriceSearch() {
      this.searchActive = 1
      this.saleOrder =''
      this.priceOrder = this.priceOrder == 'asc' ? 'desc' : 'asc'
      this.page = 1
      this.loadend = false
      this.loading = false
      this.$set(this, 'bastList', [])
      this.getProductList()
    },
    changeSaleSearch(){
      this.searchActive = 2
      this.priceOrder=''
      this.saleOrder = this.saleOrder == 'asc' ? 'desc' : 'asc'
      this.page = 1
      this.loadend = false
      this.loading = false
      this.$set(this, 'bastList', [])
  
      this.getProductList()
    },
   
    
    
    
    getProductList: function () {
       

      let that = this
      if (that.loadend) return
      if (that.loading) return
      that.loading = true
      that.loadTitle = ''
      getProductslist({
        keyword: '',
        page: that.page,
        limit: that.limit,
        priceOrder: that.priceOrder,
        salesOrder:that.saleOrder
      })
        .then((res) => {
          let list = res.data.list,
            loadend = list.length < that.limit
          that.bastList = that.$util.SplitArray(list, that.bastList)
          that.$set(that, 'bastList', that.bastList)
          that.loading = false
          that.loadend = loadend
          that.loadTitle = loadend ? '😕人家是有底线的~~' : '加载更多'
          that.page = that.page + 1
          that.isbastList = true
        })
        .catch((err) => {
          ;(that.loading = false), (that.loadTitle = '加载更多')
        })
    },
     
   
  
   
   
  },
}
</script>

<style lang="scss">
page {
  background-color: #f4f4f4 !important;
}
.index-product-wrapper{
  padding: 0!important
}
.noCommodity {
  padding-bottom: 100rpx;
  /deep/ .recommend {
    background: transparent;
  }
  .title {
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    .titleTxt {
      margin: 0 10rpx;
      font-size: 28rpx;
      color: #666666;
    }
    .sp {
      margin: 0 20rpx;
    }
  }
  .title-line {
    position: absolute;
    width: 448rpx;
    height: 16rpx;
    // border: 2rpx solid #e5e5e5;
  }
}
.search-hot-keyword {
  padding: 23rpx 26rpx 23rpx 26rpx;
  background: #fff;
  margin: 20rpx 30rpx;

  border-radius: 20rpx;
}
.search-goods {
  margin: 0 30rpx;
  /deep/ .index-product-wrapper {
    padding: 0;
  }
}
.search-sort {
  padding: 23rpx 0rpx 23rpx 0rpx;
  background: #fff;
  margin: 20rpx 30rpx;
  font-size: 30rpx;
  border-radius: 20rpx;
  font-weight: 400;
  color: #2b2b2b;
  .search-sort-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-sort-icon {
      width: 44rpx;
      height: 44rpx;
      margin-left: 3rpx;
    }
    .search-sort-item {
      position: relative;
      width: 25%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .search-sort-item-active {
      font-weight: 500;
      color: $base-color-1;
    }
    .search-sort-item::after {
      position: absolute;
      right: 0;
      content: '';
      width: 2rpx;
      height: 30rpx;
      background: #e5e5e5;
    }
    .search-sort-item:last-child::after {
      width: 0;
    }
    .search-price {
      display: flex;
      justify-content: center;
      align-items: center;
      .search-sort-icon {
        width: 24rpx;
        height: 13rpx;
        margin-bottom: 5rpx;
      }
      .search-sort-icon:last-child {
        margin-bottom: 0;
      }
    }
    .search-price-font {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 40rpx;
      margin-left: 10rpx;
      color: #2b2b2b;
      display: flex;
   
   align-items: center;
   justify-content: center;
   image{
  width: 15rpx;
    height: 19rpx;
    margin-left: 10rpx;
}
      .arrow-down {
        position: relative;
        top: -14rpx;
      }
      .search-price-font-active {
        color: $base-color-1;
      }
    }
    .search-price-icon {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
.search-history {
  padding: 30rpx 26rpx 30rpx 26rpx;
  background: #fff;
  margin: 20rpx 30rpx;
  font-size: 28rpx;
  border-radius: 20rpx;
  font-weight: 400;
  color: #2b2b2b;
  .history-title {
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20rpx;
    margin-bottom: 20rpx;
    .text{
      flex:1
    }
  }
  .search-close-icon {
    width: 34rpx;
    height: 34rpx;
  }
  .history-tip {
    color: #999999;
    font-size: 26rpx;
    text-align: center;
  }
  .search-history-no-data {
    height: 593rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .nodata-icon {
      width: 277rpx;
      height: 190rpx;
      margin-top: 149rpx;
      margin-bottom: 20rpx;
    }
    font-size: 26rpx;
    color: #999999;
    text-align: center;
  }
}
.searchGood .title {
  font-size: 28rpx;
  color: #999;
  margin-bottom: 25rpx;
}

.searchGood .list {
  // padding-left: 10rpx;
}

.searchGood .list .item {
  font-size: 26rpx;
  color: #454545;
  padding: 0 21rpx;
  height: 60rpx;
  border-radius: 30rpx;
  line-height: 60rpx;
  border: 1rpx solid #aaa;
  margin: 0 0 20rpx 20rpx;
}
.searchGood .list .item:nth-child(1) {
  margin-left: 0;
}
.searchGood .line {
  border-bottom: 1rpx solid #eee;
  margin: 20rpx 30rpx 0 30rpx;
}

</style>
 