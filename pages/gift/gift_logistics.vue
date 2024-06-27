import alpha_num from '@/utils/validate';
<!--
 * @Author: zxs 774004514@qq.com
 * @Date: 2023-10-19 14:13:44
 * @LastEditors: zhang00001 774004514@qq.com
 * @LastEditTime: 2024-05-30 20:43:13
 * @FilePath: \app\pages\gift\gift_page.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
	<view>
		<!-- 商家配送 -->
		<view v-if="info" style="    text-align: center;
    margin-top: 30vh;">{{info}}</view>
		<view v-else-if="trackingList.length>1">
			<uni-section title="查看物流详情" type="line">
				<uni-collapse accordion v-model="accordionVal" @change="changeCollapse" ref='collapseHeight'>
					<uni-collapse-item  :title="'物流单号:'+item" v-for="item in trackingList"
						:key="item.id">
						<view class="content" style='padding: 30rpx;'>
							<van-steps inactive-color="#999999" direction="vertical" :active="activeIndex"
								active-color="#FF6817">
								<van-step v-for="(item, index) in logisticsInfo.list" :key="item.id">
									<h3 class="time" :class="{ 'active-time': index == 0 }">
										{{ item.time }}
									</h3>
									<p class="status">{{ item.status }}</p>
								</van-step>
							</van-steps>
						</view>
					</uni-collapse-item>

				</uni-collapse>
			</uni-section>
		</view>

		<view v-else>


			<!-- 只有一个物流 -->
			<view class="logistics-header">
				<view>{{ logisticsInfo.expName }}:{{ logisticsInfo.number }}</view>
				<view class="header-right" @click="copyCode">
					<image class="header-icon" src="https://cshy.store/file/sysFile/wechart/gift/copy.png"
						mode="aspectFit" lazy-load="false" binderror="" bindload="">
					</image>
					<text>复制</text>
				</view>
			</view>
			<view class="address-box" v-if="addressInfo&&addressInfo.realName">
				<view class="address-content">
					<view class="address-lable"> 收货地址 </view>
					<view class="address-value">
						<text>
							{{ addressInfo.province }} {{ addressInfo.city
            }}{{ addressInfo.district }} {{ addressInfo.detail }}
						</text>
						<text class="line">|</text>
						<text>{{ addressInfo.realName }}{{ addressInfo.phone }}</text>
					</view>
				</view>
			</view>
			<view class="steps">
				<van-steps inactive-color="#999999" direction="vertical" :active="activeIndex" active-color="#FF6817">
					<van-step v-for="(item, index) in logisticsInfo.list" :key="item.id">
						<h3 class="time" :class="{ 'active-time': index == 0 }">
							{{ item.time }}
						</h3>
						<p class="status">{{ item.status }}</p>
					</van-step>
				</van-steps>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		expressFindExpressDetail
	} from '@/api/activity'
	export default {
		//import引入组件才能使用
		components: {},
		props: {},
		data() {
			return {
				activeIndex: 0,
				addressInfo: {
					id: '',
					uid: null,
					realName: '',
					phone: '',
					province: '',
					city: '',
					cityId: null,
					district: '',
					detail: '',
					postCode: null,
					longitude: null,
					latitude: null,
					isDefault: true,
					isDel: null,
					updateTime: null,
					createTime: null,
				},
				logisticsInfo: {},
				trackingNo: '',
				userMobile: null,
				info: null,
				trackingList: [],
				accordionVal: 0
			}
		},
		// 计算属性
		computed: {},
		// 监听data中的数据变化
		watch: {},
		// 方法集合
		methods: {

			changeCollapse(e) {
				this.trackingNo = this.trackingList[e]



				this.getInfo()


			},
			copyCode() {
				uni.setClipboardData({
					data: this.logisticsInfo.number
				})
			},
			async getInfo() {
				uni.showLoading({
					title: '加载中',
				})
				try {
					let {
						code,
						data
					} = await expressFindExpressDetail({
						trackingNo: this.trackingNo,
						type: 1, // 1 礼品卡 0 商城
						userMobile: this.userMobile
					})
					this.logisticsInfo = data
					if (this.trackingList&& this.trackingList.length > 0) {
            this.$nextTick(() => {
					this.$refs.collapseHeight.resize()
				}) 
					 

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
		},
		// 生命周期，创建完成时（可以访问当前this实例）
		created() {
			let urlParams = this.$getURLParams()
			this.trackingNo = urlParams.trackingNo
			this.userMobile = urlParams.userMobile
			if (urlParams.addressInfo) {
				this.addressInfo = JSON.parse(decodeURIComponent(urlParams.addressInfo))
			}

			this.getInfo()
		},
		onLoad: function(options) {
			if (!options) {
				this.info = '单号异常,请联系客服'
				return
			}
			this.trackingNo = options.trackingNo


			let trackingList = options.trackingNo.split(",")
			if (trackingList.length > 1) {
				this.trackingList = trackingList
				this.trackingNo = trackingList[0]
				this.getInfo()
				return
			}

			if (this.trackingNo == 'zp666') {
				this.info = '商家配送中,敬请期待'
				return
			}


			this.userMobile = options.userMobile
			this.getInfo()
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

<style>
	page {
		background: #fff;
	}
</style>
<style scoped lang="scss">
	.logistics-header {
		margin: 0 30rpx 30rpx 30rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		padding-top: 30rpx;
		color: #000000;
		justify-content: space-between;

		.header-icon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}

		.header-right {
			display: flex;
			align-items: center;
		}
	}

	.time {
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;

		color: #666666;
		margin-bottom: 10rpx;
	}

	.active-time {
		color: #ff6817;
	}

	.status {
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 37rpx;
	}

	/deep/ .van-step--vertical::after {
		border: none;
	}

	.address-content {
		background: #f1f1f1;
		padding: 30rpx;
		border-radius: 20rpx;

		width: 690rpx;
		margin: 0 auto;
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

	.steps {
		margin-top: 30rpx;
		margin-left: 10rpx;
	}
</style>