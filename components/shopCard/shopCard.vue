<template>
	<view @click="handleToDetail" class="shop-card">
		<image style="width: 100%;height: 320rpx;border-radius: 20rpx 20rpx 0 0;" :src="BASE_URL+'/'+shop?.coverImage"
			mode="aspectFill"></image>
		<view class="shop-content">
			<view class="shopinfo">
				<text class="shop_title">{{shop?.title}}</text>
				<text class="shop_price">￥{{shop?.price}}</text>
			</view>
		</view>
	</view>

</template>

<script>
	import {BASE_URL} from '@/apis/requestAPI.js' 
	export default {
		name: "shopCard",
		props: {
			shop: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				BASE_URL
			};
		},
		methods: {
			handleToDetail() {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + this.shop._id
				})
			},
		},
	}
</script>

<style lang="scss">
	.shop-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 15rpx;
	}

	.shopinfo {
		display: flex;
		flex-direction: column;
		gap: 5rpx;

		.shop_title {
			font-size: 14px;
		}

		.shop_subtitle {
			color: #A6A6A6;
			font-size: 12px;
		}
	}
	.shop-card{
		background-color: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}
</style>