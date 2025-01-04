<template>
	<view class="login-container">
		<view class="logo">
			<image src="/static/logo.png" mode="aspectFit"></image>
		</view>
		<view class="btn-group">
			<button class="login-btn" @click="handleAuth">一键登录</button>
			<button>再看看</button>
		</view>
	</view>
</template>

<script>
	import {http } from '../../apis/requestAPI.js'
	import {mapState,mapMutations,mapGetters } from 'vuex';

	export default {
		data() {
			return {
				loading: false
			}
		},
		methods: {
			...mapMutations({
				updateUserInfo: 'app/updateUserInfo',
				updateToken: 'app/updateToken'
			}),
			async handleAuth() {
				try {
					// 微信登录
					const loginRes = await uni.login({ provider: 'weixin' });
					
					if (loginRes.errMsg === "login:ok") {
						// 获取用户信息
						const infoRes = await uni.getUserInfo({ provider: 'weixin' });
						this.updateUserInfo(infoRes.userInfo);
						uni.setStorageSync('userInfo', infoRes.userInfo)
						
						// 获取token
						const res = await http.post('/api/v1/signin', { code: loginRes.code,username:infoRes.userInfo?.nickName });
						if (res.success) {
							this.updateToken(res.data.token);
							
							uni.setStorageSync('token', res.data.token);
							uni.showToast({
								title: '授权成功',
								icon: 'success'
							});
							uni.reLaunch({
								url: '/pages/my/my'
							});
						}
					}
				} catch (e) {
					uni.showToast({
						title: '授权失败',
						icon: 'none'
					});
				}
			}
		}
	}
</script>

<style>
	.login-container {
		padding: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.logo {
		margin-bottom: 100rpx;
	}

	.logo image {
		width: 200rpx;
		height: 200rpx;
	}

	.btn-group {
		width: 100%;
	}

	.login-btn,
	.auth-btn {
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		border-radius: 44rpx;
		margin-bottom: 30rpx;
		font-size: 32rpx;
	}

	.login-btn {
		background: #007AFF;
		color: #fff;
	}

	.auth-btn {
		background: #f8f8f8;
		color: #333;
	}
</style>