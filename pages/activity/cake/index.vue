<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-10-25 10:46:08
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-03-14 17:29:32
 * @FilePath: \cshy-h5\pages\activity\crab\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="mainer-container">
      <image class="xieli--logo-img" :src="logoUrl" mode=""></image>

      <view class="page-con">
        <view class="cake-box">
          <view class="cake-item">
            <image
              class="cake-item-icon"
              :src="('https://cshy.store/file/sysFile/wechart/cake-icon-2.png')"
            ></image>
            <view
              class="cake-item-box"
              v-if="activeGoods && activeGoods.length > 0"
            >
              <view
                class="cake-header-title"
                @click.stop="
                  goPage(
                    '/pages/goods_list/active_index?id=' +
                      activeGoods[0].id +
                      '&title=' +
                      activeGoods[0].name
                  )
                "
                >{{ activeGoods[0].name }}</view
              >
              <view
                class="line-1-cake"
                v-if="
                  activeGoods[0].productList &&
                  activeGoods[0].productList.length > 0
                "
              >
                <image
                mode="aspectFill"
                  class="cake-prod-img"
                  :src="activeGoods[0].productList[0].image"
                  @click.stop="
                    goPage(
                      '/pages/goods/goods_details/index?id=' +
                        activeGoods[0].productList[0].id
                    )
                  "
                ></image>
                <view
                  class="cake-prod"
                  @click.stop="
                    goPage(
                      '/pages/goods/goods_details/index?id=' +
                        activeGoods[0].productList[0].id
                    )
                  "
                >
                  <view class="cake-prod-title">{{
                    activeGoods[0].productList[0].title
                  }}</view>
                  <view class="cake-prod-intro">
                    <view class=""
                      ><text class="red"
                        ><text class="big">{{
                          activeGoods[0].productList[0].price
                        }}</text
                        >元</text
                      ></view
                    >
                    <view class="cake-prod-btn">
                      <image
                        class="cake-prod-btn-icon"
                        :src="('https://cshy.store/file/sysFile/wechart/qiang-2.png')"
                      ></image>
                    </view>
                  </view>
                </view>
              </view>
              <view
                class="flex-cake"
                v-if="
                  activeGoods[0].productList &&
                  activeGoods[0].productList.length > 0
                "
              >
                <view
                  class="flex-cake-item"
                  @click.stop="
                    goPage('/pages/goods/goods_details/index?id=' + item.id)
                  "
                  v-for="item in activeGoods[0].productList.slice(1)" :key="item.id"
                >
                  <view class="line-1-cake">
                    <image class="cake-prod-img" :src="item.image"></image>
                    <view class="cake-prod">
                      <view class="cake-prod-title">{{ item.name }}</view>
                      <view class="cake-prod-intro">
                        <view
                          ><text class="red"
                            ><text class="big">{{ item.price }}</text
                            >元</text
                          ></view
                        >
                        <view class="cake-prod-btn">
                          <image
                            class="cake-prod-btn-icon"
                            :src="('https://cshy.store/file/sysFile/wechart/qiang-icon.png')"
                          ></image>
                        </view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="cake-item cake-item-2">
            <image
              class="cake-item-icon cake-item-icon-right"
              :src="('https://cshy.store/file/sysFile/wechart/cake-icon-1.png')"
            ></image>
            <view
              class="cake-item-box"
              v-if="activeGoods && activeGoods.length > 1"
            >
              <view
                class="cake-header-title"
                @click.stop="
                  goPage(
                    '/pages/goods_list/active_index?id=' +
                      activeGoods[1].id +
                      '&title=' +
                      activeGoods[1].name
                  )
                "
                >{{ activeGoods[1].name }}</view
              >
              <view
                class="cake-prod-wrap"
                v-if="
                  activeGoods[1].productList &&
                  activeGoods[1].productList.length > 0
                "
              >
                <view
                  class="cake-prod-wrap-item"
                  @click.stop="
                    goPage('/pages/goods/goods_details/index?id=' + item.id)
                  "
                  v-for="item in activeGoods[1].productList" :key="item.id"
                >
                  <image class="cake-prod-img" :src="item.image"></image>
                  <view class="cake-prod">
                    <view class="">
                      <view class="cake-prod-title van-multi-ellipsis--l2">{{
                        item.title
                      }}</view>
                      <view class="cake-prod-intro">
                        <view class="">{{ item.price }}元</view>
                      </view>
                    </view>
                  </view>
                </view></view
              >
            </view>
          </view>
        </view>
      </view>

      <view class="superior borRadius14" id="past2">
        <view class="title acea-row row-center-wrapper">
          <image
            class="title-line"
            src="https://cshy.store/file/sysFile/wechart/title-line-1.png"
          ></image>
          <view class="titleTxt">更多推荐</view>
        </view>
        <productGrid
          :iSshowH="iSshowH"
          @goDetail="goDetail"
          :loading="loading"
          :goodScroll="goodScroll"
          :tempArr="good_list"
        ></productGrid>
      </view>
    </view>
  </view>
</template>

<script>
import { activityQueryProductList } from '@/api/api.js'
import { getProductGood } from '@/api/store.js'
import productGrid from '@/components/productGrid.vue'
export default {
  //import引入组件才能使用
  components: { productGrid },
  props: {},
  data() {
    return {
      brandUrl: ('https://cshy.store/file/sysFile/wechart/active-icon3.png'),
      bottomUrl: ('https://cshy.store/file/sysFile/wechart/bottom-img.png'),
      navUrl: ('https://cshy.store/file/sysFile/wechart/card-bg.png'),
      itemUrl: ('https://cshy.store/file/sysFile/wechart/tab-actived.png'),
      logoUrl: ('https://cshy.store/file/sysFile/wechart/cake-banner.png'),
      tabActivedUrl: ('https://cshy.store/file/sysFile/wechart/tab-actived.png'),
      rightIcon: ('https://cshy.store/file/sysFile/wechart/card-icon.png'),
      good_list: [],
      iSshowH: false,
      loading: false,
      goodScroll: false,
      activeGoods: [],
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    goPage(url) {
      console.log(url)
      if (!url) {
        return this.$util.Tips({
          title: '即将开放，敬请期待！',
        })
      }
      uni.navigateTo({
        url: url,
      })
    },
    async getList() {
      uni.showLoading({
        title: '加载中',
      })
      try {
        let data = await activityQueryProductList({
          activityCategoryName: '甜蜜蛋糕',
        })

        this.activeGoods = data.data
      } finally {
        uni.hideLoading()
      }
    },
    getGoods() {
      getProductGood().then((res) => {
        let good_list = res.data.list || []
        this.iSshowH = false
        this.loading = false
        this.goodScroll = true
        this.$set(this, 'good_list', good_list)
      })
    },
  },
  // 生命周期，创建完成时（可以访问当前this实例）
  created() {},
  onShow() {
    this.getList()
    this.getGoods()
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
page {
  background: #edddd0;
}

.mainer-container {
  .xieli--logo-img {
    width: 750rpx;
    height: 838rpx;
  }
  .page-con {
    .cake-box {
      margin: 30rpx;
      margin-top: 55rpx;
      .cake-item {
        position: relative;
        padding: 30rpx;
        background: #faf1ea;
        border-radius: 20rpx;
        margin-bottom: 88rpx;
        .cake-item-icon {
          position: absolute;
          left: -15rpx;
          top: -100rpx;
          width: 243rpx;
          height: 199rpx;
        }
        .cake-item-icon-right {
          right: -15rpx;
          left: auto;
        }
        .cake-item-box {
          .cake-header-title {
            font-size: 38rpx;
            text-align: center;
            font-weight: 500;
            color: #ae643a;
          }
          .cake-prod-img {
            width: 100%;
            height: 300rpx;
            border-radius: 20rpx;
          }
          .cake-prod {
          }
          .cake-prod-title {
            margin-top: 30rpx;
            font-size: 32rpx;
            margin-bottom: 10rpx;
            font-weight: 500;
            color: #2b2b2b;
          }
          .cake-prod-intro {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 28rpx;

            color: #9a9a9a;
            .red {
              color: #eb2d47;
            }
            .big {
              font-size: 46rpx;
              font-weight: 500;
            }
          }
          .cake-prod-btn {
            width: 182rpx;
            height: 55rpx;
            background: $bg-gradient;
            border-radius: 28rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            .cake-prod-btn-icon {
              width: 64rpx;
              height: 34rpx;
            }
          }
          .line-1-cake {
            margin-top: 27rpx;
          }
          .flex-cake {
            display: flex;
            justify-content: space-between;
            .flex-cake-item {
              width: 300rpx;
              .cake-prod-btn {
                width: 100rpx;
                height: 55rpx;
                background: $bg-gradient;
                border-radius: 28rpx;
                .cake-prod-btn-icon {
                  width: 34rpx;
                  height: 34rpx;
                }
              }
            }
          }
        }
      }
      .cake-item-2 {
        padding: 20rpx;
        margin-bottom: 0;
        .cake-prod-wrap {
          margin-top: 27rpx;
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;

          .cake-prod-wrap-item {
            width: 202rpx;
            margin-right: 20rpx;
            background: #fff;
            border-radius: 20rpx;
            margin-bottom: 20rpx;
          }
          .cake-prod-wrap-item:nth-child(3n) {
            margin-right: 0;
          }

          .cake-prod-img {
            width: 202rpx;
            height: 203rpx;
            border-radius: 20rpx 20rpx 0 0;
          }
          .cake-prod {
            background-color: #fff;
            border-radius: 0 0 20rpx 20rpx;
            .cake-prod-title {
              padding: 10rpx 12rpx 0rpx 12rpx;
              margin-bottom: 12rpx;
              margin-top: 0;
              font-size: 28rpx;

              font-weight: 400;
              color: #2b2b2b;
            }
            .cake-prod-intro {
              font-size: 32rpx;
              padding-left: 12rpx;
              padding-bottom: 12rpx;
              font-weight: 500;
              color: #eb2d47;
            }
          }
          .cake-prod {
          }
        }
      }
    }
  }
}
.superior .title {
  height: 98rpx;
  .title-line {
    width: 448rpx;
    height: 16rpx;
    position: absolute;
  }
  .titleTxt {
    margin: 0 5px;
    font-size: 15px;

    font-size: 38rpx;

    font-weight: 500;
    color: #ae643a;
  }
}
</style>
