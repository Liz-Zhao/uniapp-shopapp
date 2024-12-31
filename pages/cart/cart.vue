<template>
	<view v-for="(item,index) in shops" :key="index" class="cart-card">
		<image :src="cover" mode="aspectFill" class="cart-image"></image>
		<view class="shop-info">
			<text>iPad mimi 2024</text>
			<text class="shop-subtitle">银色+256</text>
			<text>￥130.00</text>
		</view>
		<uni-icons fontFamily="CustomFont" :size="20" color="#FF0000">{{'&#xe674'}}</uni-icons>
		<!-- calculator -->
		<view class="calculator">
			<view class="action-btn">
				<uni-icons type="plusempty" size="18" color="#ffffff"></uni-icons>
			</view>
			<text style="min-width: 50rpx;text-align: center;">12</text>
			<view class="action-btn" >
				<uni-icons fontFamily="CustomFont" :size="18" color="#ffffff">{{'&#xe697'}}</uni-icons>
			</view>
		</view>
	</view>
	<view style="height: 150px;text-align: center; color: #A6A6A6;">再也没有了~</view>
	<view class="action-container">
		<view class="action-box">
			<view class="">
				<text>总计：<text style="color:#FF0000">￥402.00</text> </text>
			</view>
			<view class="submit-btn">确定提交</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shops:['1','2','3'],
				cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.cart-card{
		background: #ffffff;
		padding: 10px;
		box-shadow: 0px 1px 4px 0 rgba(0, 0, 0, 0.4);
		margin: 10px;
		border-radius: 10px;
		display: flex;
		gap: 15px;
		position: relative;
		
		.cart-image{
			width: 82px;
			height: 102px;
			border-radius: 20px;
		}
		.shop-info{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-top: 5px;
			position: relative;
			
			.shop-subtitle{
				color: #A6A6A6; 
				font-size: 12px;
				margin-top: -20px;
			}
		}
	}
	.action-container{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ffffff;
		padding: 20px 5px;
		box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.4);
		
		.action-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.submit-btn{
			color: #ffffff;
			background-color: #eea427;
			padding: 10px 15px;
			border-radius: 20px;
		}
	}
	.calculator{
		display: flex;
		gap: 5rpx;
		position: absolute;
		bottom: 10px;
		right: 10px;
		
		.action-btn{
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
			background-color: #eea427;
			display: grid;
			place-content: center;
			
		}
	}
</style>
