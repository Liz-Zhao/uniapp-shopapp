<template>
	<view class="user-box" @click="handleToLogin">
		<image :src="userInfo?.avatarUrl || cover" mode="aspectFill" class="user-image"></image>
		<text> {{userInfo?.nickName || '登录/注册'  }} </text>
		<uni-icons fontFamily="CustomFont" :size="20" color="#FF0000">{{'&#xe657'}}</uni-icons>
	</view>
	<view class="actions-container">
		<view class="action-card" @click="handleToOrder">
			<uni-icons fontFamily="CustomFont" :size="20" color="#eea427">{{'&#xe685'}}</uni-icons>
			<text>订单</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				token: uni.getStorageSync('token')
			}
		},
		methods: {
			handleToOrder(){
				uni.navigateTo({
					url:'/pages/order/order'
				})
			},
			handleToLogin(){
				if(!this.token){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
			}
			
		},
		computed:{
			...mapState({
				userInfo: state => state.app.userInfo,
			}),
			
		}
	}
</script>

<style lang="scss">
	.user-box{
		display: flex;
		gap: 20rpx;
		align-items: center;
		margin: 20px;
		
		.user-image{
			width: 68px;
			height: 68px;
			border-radius: 50%;
			
		}
	}
	.actions-container{
		display: grid;
		grid-template-columns: repeat(2, 45%);
		margin: 0 20px 20px 20px;
		.action-card{
			background-color: #ffffff;
			box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.4);
			padding: 20px 0;
			border-radius: 10px;
			display: flex;
			gap: 5px;
			align-items: center;
			justify-content: center;
		}
	}
</style>
