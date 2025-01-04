<template>
	<view class="user-box">
		<image :src="userInfo?.avatarUrl || cover" mode="aspectFill" class="user-image" @click="handleToLogin"></image>
		<text> {{userInfo?.nickName || '登录/注册'  }} </text>
		<uni-icons type="right" :size="20" color="#267be0"></uni-icons>
		<uni-icons type="upload" :size="22" color="#267be0" style="rotate: 90deg;" @click="handleLogout" v-show="userInfo"></uni-icons>
	</view>
	<view class="actions-container">
		<view class="action-card" @click="handleToOrder">
			<uni-icons type="shop" :size="20" color="#267be0"></uni-icons>
			<text>订单</text>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
			}
		},
		methods: {
			...mapMutations({
				clearAll:'app/clearAll'
			}),
			handleToOrder(){
				uni.navigateTo({
					url:'/pages/order/order'
				})
			},
			handleToLogin(){
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
			},
			handleLogout(){
				uni.clearStorageSync();
				this.clearAll()
			}
		},
		computed:{
			...mapState({
			      userInfo: (state) => state.app.userInfo,
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
