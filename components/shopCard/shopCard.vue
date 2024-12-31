<template>
	<view @click="handleToDetail" class="shop-card">
		<image style="width: 100%;height: 200px;border-radius: 20rpx 20rpx 0 0;" :src="cover" mode="aspectFill"></image>
		<view class="shop-content">
			<view class="shopinfo">
				<text class="shop_title">ipad Mini</text>
				<text class="shop_subtitle">2025年新款</text>
				<text class="shop_price">￥34.56</text>
			</view>
			
			<view class="card-actions">
				<view class="calculator" v-if="isOrdered">
					<view class="action-btn" @click.stop="">
						<uni-icons type="plusempty" size="18" color="#ffffff"></uni-icons>
					</view>
					<text style="min-width: 50rpx;text-align: center;">12</text>
					<view class="action-btn" @click.stop="">
						<uni-icons fontFamily="CustomFont" :size="18" color="#ffffff">{{'&#xe697'}}</uni-icons>
					</view>
				</view>
				<view class="" v-else>
					<view class="add-btn" @click.stop="handleToCart">
						<uni-icons type="plusempty" size="18" color="#ffffff"></uni-icons>
					</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name: "shopCard",
		data() {
			return {
				cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				isOrdered:false,
			};
		},
		methods:{
			handleToDetail(){
				uni.navigateTo({
					url:'/pages/shopDetail/shopDetail'
				})
			},
			handleToCart(){
				this.isOrdered = true
			}
		}
	}
</script>

<style lang="scss">
	.shop-card{
		background-color: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
		.shop-content{
			display: flex; 
			justify-content: space-between;
			align-items: center;
			padding:10rpx 15rpx;
		}
	}
	.shopinfo{
		display: flex;
		flex-direction: column;
		gap: 5rpx;
		.shop_subtitle{
			color: #A6A6A6;
			font-size: 12px;
		}
	}
	.add-btn{
		width: 80rpx;
		height: 54rpx;
		border-radius: 20rpx;
		background-color: #eea427;
		display: grid;
		place-content: center;
	}
	.calculator{
		display: flex;
		gap: 5rpx;
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