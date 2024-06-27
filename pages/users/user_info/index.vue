<template>
	<view>
		<form @submit="formSubmit" report-submit='true'>
			<view class='personal-data'>
				<view class='list '>
					<view class="item acea-row row-between-wrapper">
						<view>头像</view>
						<view class="pictrue" @click.stop='uploadpic'>
							<image class='pictrue-img' :src='newAvatar ? newAvatar : userInfo.avatar'></image>
							<text class="iconfont icon-xiangyou " ></text>
							<!-- <image src='https://cshy.store/file/sysFile/wechart/alter.png' class="alter"></image> -->
						</view>
					</view>
					<view class='item acea-row row-between-wrapper'>
						<view>昵称</view>
						<view class='input'><input type='text' name='nickname' :value='userInfo.nickname'></input>
							<text class="iconfont icon-xiangyou " ></text>
						</view>
					</view>
					</view>
					<view class='list '> 
					<view class='item acea-row row-between-wrapper'>
						<view>已绑定手机号</view>
						<navigator url="/pages/users/app_login/index" hover-class="none" class="input"
							v-if="!userInfo.phone">
							点击绑定手机号<text class="iconfont icon-xiangyou"></text>
						</navigator>
						<navigator url="/pages/users/user_phone/index" hover-class="none" class="input" v-else>
							<view class='input acea-row row-between-wrapper'>
								<input type='text' disabled='true' name='phone' :value='userInfo.phone'
									class='id'></input>
								<!-- <text class='iconfont icon-xiangyou'></text> -->
							</view>
						</navigator>
						<!-- <navigator url="/pages/users/user_phone/index" hover-class="none" class="input" v-if="!memberInfo.phone">
							点击绑定手机号<text class="iconfont icon-xiangyou"></text>
						</navigator>
						<view class='input acea-row row-between-wrapper' v-else>
							<input type='text' disabled='true' name='phone' :value='memberInfo.phone' class='id'></input>
							<text class='iconfont icon-suozi'></text>
						</view> -->
					</view>
					<!-- <view class='item acea-row row-between-wrapper'>
						<view>ID号</view>
						<view class='input acea-row row-between-wrapper'>
							<input type='text' :value='uid' disabled='true' class='id'></input>
							<text class='iconfont icon-suozi'></text>
						</view>
					</view> -->
					<!-- #ifdef MP -->
					<view class='item acea-row row-between-wrapper'>
						<view>权限设置</view>
						<view class="input" @click="Setting">
							点击管理<text class="iconfont icon-xiangyou"></text>
						</view>
					</view>
					<!-- #endif -->
					<!-- <view class="item acea-row row-between-wrapper" v-if="userInfo.phone">
						<view>密码</view>
						<navigator url="/pages/users/user_pwd_edit/index" hover-class="none" class="input">
							点击修改密码<text class="iconfont icon-xiangyou"></text>
						</navigator>
					</view> -->
				</view>
				<button class='modifyBnt bg-color' formType="submit">保存修改</button>
			 
				<view class="logOut cart-color acea-row row-center-wrapper" @click="outLogin"
					>退出登录</view>
					<!-- v-if="!this.$wechat.isWeixin()" -->
			 
			</view>
		</form>
	 
	</view>
</template>

<script>
	import {
		userEdit,
		getLogout
	} from '@/api/user.js';
	import {
		switchH5Login
	} from '@/api/api.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from "vuex";
	import dayjs from "@/plugin/dayjs/dayjs.min.js";
 
	export default {
		components: {
	 
		},
		data() {
			return {
				memberInfo: {},
				loginType: 'h5', //app.globalData.loginType
				userIndex: 0,
				newAvatar: '',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false //是否隐藏授权
			};
		},
		computed: mapGetters(['isLogin', 'uid', 'userInfo']),
		onLoad() {
			if (!this.isLogin) {
				toLogin();
			}
		},
		methods: {
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e
			},
			/**
			 * 小程序设置
			 */
			Setting: function() {
				uni.openSetting({
					success: function(res) {
						console.log(res.authSetting)
					}
				});
			},
			/**
			 * 退出登录
			 * 
			 */
			outLogin: function() {
				let that = this;
				if (that.loginType == 'h5') {
					uni.showModal({
						title: '提示',
						content: '确认退出登录?',
						success: function(res) {
							if (res.confirm) {
								getLogout()
									.then(res => {
										that.$store.commit("LOGOUT");
										uni.reLaunch({
											url: '/pages/index/index'
										});
									})
									.catch(err => {
										console.log(err);
									});
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			/**
			 * 上传文件
			 * 
			 */
			uploadpic: function() {
				let that = this;
				that.$util.uploadImageOne({
					url: 'user/upload/image',
					name: 'multipart',
					model: "maintain",
					pid: 0
				}, function(res) {
					that.newAvatar = res.data.url;
				});
			},

			/**
			 * 提交修改
			 */
			formSubmit: function(e) {
				let that = this,
					value = e.detail.value
				if (!value.nickname) return that.$util.Tips({
					title: '用户姓名不能为空'
				});
				value.avatar = that.newAvatar?that.newAvatar:that.userInfo.avatar;
				userEdit(value).then(res => {
					that.$store.commit("changInfo", {
						amount1: 'avatar',
						amount2: that.newAvatar||value.avatar
					});
					that.$store.commit("changInfo", {
						amount1: 'nickname',
						amount2: value.nickname
					});
					
					return that.$util.Tips({
						title: '更换成功',
						icon: 'success'
					}, {
						tab: 3,
						url: 1
					});

				}).catch(msg => {
					return that.$util.Tips({
						title: msg || '保存失败，您并没有修改'
					}, {
						tab: 3,
						url: 1
					});
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.personal-data .wrapper {
		margin: 10rpx 0;
		background-color: #fff;
		padding: 36rpx 30rpx 13rpx 30rpx;
	}

	.personal-data .wrapper .title {
		margin-bottom: 30rpx;
		font-size: 32rpx;
		color: #282828;
	}

	.personal-data .list{
		background-color: #fff;
		margin-bottom: 20rpx;
	}
	.personal-data .list .item {
		border-bottom: 1rpx solid #f2f2f2;
		margin:0  30rpx;
		font-size: 30rpx;
		color: #333333;		
		padding:30rpx 0;
	}
	.personal-data .list .item:last-child{
		border-bottom: none;
	}
	.personal-data .list .item .phone {
		width: 160rpx;
		height: 56rpx;
		font-size: 24rpx;
		color: #fff;
		line-height: 56rpx;
		border-radius: 32rpx
	}

	.personal-data .list .item .pictrue {
		position: relative;display: flex;
    align-items: center;
    justify-content: center;.iconfont {
		font-size: 35rpx;
		margin-left:20rpx;color: #868686;
	}

	}

	.personal-data .list .item .pictrue .pictrue-img {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
	}



	.personal-data .list .item .input {
		width: 415rpx;
		text-align: right;
		color: #868686;display: flex;
    align-items: flex-end;
    justify-content: flex-end;
	}

	.personal-data .list .item .input .id {
		width: 365rpx;
	}

	.personal-data .list .item .input .iconfont {
		font-size: 35rpx;
		margin-left:20rpx;
	}

	.personal-data .modifyBnt {
		font-size: 32rpx;
		color: #fff;
		width: 690rpx;
		height: 90rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 90rpx;
		margin: 76rpx auto 0 auto;
	}

	.personal-data .logOut {
		font-size: 32rpx;
		text-align: center;
		width: 690rpx;
		height: 90rpx;
		border-radius: 45rpx;
		margin: 30rpx auto 0 auto;
	}
</style>
