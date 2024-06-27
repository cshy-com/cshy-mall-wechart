<!--
 * @Author: zhang00001 774004514@qq.com
 * @Date: 2023-11-21 10:47:11
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-21 11:50:53
 * @FilePath: \cshy-h5\components\popModel.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
   
    <uni-popup @maskClick="maskClick" @change='changePop'
      background-color="#fff"
      ref="popup"
      type="bottom"
      border-radius="10px 10px 0 0"
      :style="{ height: '60vh' }"
    >

      <view class="pop-model">
        <view class="model-title">
          <text>{{ popTitle }}</text>
        </view>
        <view class="model-content">
          <radio-group @change="radioChange">
            <label
              class="uni-list-cell uni-list-cell-pd"
              v-for="(item, index) in popOptions"
              :key="index"
            >
              <view>{{ item.lable }}</view>
              <view>
                <radio :value="String(item.value)" :checked="index == popActive" />
              </view>
            </label>
          </radio-group>
        </view>
        <view class="mdoel-footer">
          <view class="model-btn bg-color" @click="savaPop"> 确定 </view>
        </view>
      </view>
      </uni-popup>
 
  </view>
</template>

<script>
export default {
  //import引入组件才能使用
  components: {},
  props: {
    popOptions: {
      type: Array,
      default: () => [],
    },

    popActive: {
      type: Number,
      default: 0,
    },
    popTitle: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activeIndex: 0,
      ispopModel: false,
    }
  },
  // 计算属性
  computed: {},
  // 监听data中的数据变化
  watch: {
    ispopModel(n,o){
   if(n){
    this.$refs.popup.open()
   }else{
    this.$refs.popup.close()
   }
    }
  },
  // 生命周期，创建完成时执行
  created() {
   
  },
  // 方法集合
  methods: {
    maskClick(e){
      debugger
    },
    changePop(e){
this.ispopModel=e
    },
    radioChange: function (evt) {
      for (let i = 0; i < this.popOptions.length; i++) {
        if (this.popOptions[i].value == evt.detail.value) {
          this.activeIndex = i
          break
        }
      }
    },
    savaPop() {
      this.ispopModel = false

      this.$emit('savaPop', this.activeIndex)
    },
    closed() {
      this.ispopModel = false
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
.pop-model {
  .model-title {
    font-size: 30rpx;

    font-weight: 500;
    color: #333333;
    text-align: center;
    padding: 33rpx 0;
  }
  .uni-list-cell {
    display: flex;
    padding: 30rpx 30rpx 0 30rpx;
    justify-content: space-between;
    align-items: center;
  }
}
.mdoel-footer {
  width: 100%;
  height: 98rpx;
  background: #ffffff;
  box-shadow: 0px 0px 20rpx 0rpx #ffffff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.model-content{
  padding-bottom: 120rpx;
}
.model-btn {
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
