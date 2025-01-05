<template>
	<view class="goods-item" @click="handleToDetail">
		<image :src="BASE_URL+'/'+shop?.coverImage" mode="aspectFill" class="goods-image" />
		<view class="goods-info">
			<view class="goods-name">{{ shop?.title }}</view>
			<view class="goods-price">¥{{ shop?.price }}</view>
		</view>
		<view class="card-actions">
			<view class="action-btn" @click.stop="addShopCount">
				<uni-icons type="plusempty" size="18" color="#ffffff"></uni-icons>
			</view>
			<view class="nums-box" v-show="shopCounts >0 ">
				<text style="color: #ffffff;">{{shopCounts}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex';
	import {
		http,
		BASE_URL
	} from '@/apis/requestAPI.js'

	export default {
		name: "shopMenuCard",
		props: {
			shop: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				BASE_URL,
				shopCounts: null // 用来存储 ShopCounts 的结果
			};
		},
		methods: {
			...mapMutations({
				addShop: 'cart/addShop',
				updateShop: 'cart/updateShop',
				removeShop: 'cart/removeShop'
			}),
			addShopCount() {
				if (this.shop.specification.length > 0) {
					uni.navigateTo({
						url: '/pages/shopDetail/shopDetail?id=' + this.shop._id
					})
				} else {
					if (this.shopCounts > 0) {
						this.updateShop({
							id: this.shop._id,
							details: '',
							actualPrice: this.shop?.price,
							count: 1
						})
					} else {
						const uShop = {
							...this.shop,
							shopID: this.shop._id,
							solidNums: 1,
							details: '',
							actualPrice: this.shop?.price,
							totalPrice: this.shop?.price
						}
						this.addShop(uShop)
					}
				}
			},
			updateShopCounts() {
				let items = this.carts.filter(item => item.id === this.shop?._id);
				this.shopCounts = items.reduce((total, item) => total + item.solidNums, 0);
			},
			handleToDetail() {
				uni.navigateTo({
					url: '/pages/shopDetail/shopDetail?id=' + this.shop._id
				})
			},
		},
		computed: {
			...mapState({
				carts: state => state.cart.carts
			}),
		},
		watch: {
			'carts': {
				handler() {
					this.updateShopCounts();
				},
				deep: true // 深度监听 carts 中的变化
			},
		},
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #eee;
		align-items: flex-end;

		.goods-image {
			width: 160rpx;
			height: 160rpx;
			margin-right: 20rpx;
		}

		.goods-info {
			flex: 1;

			.goods-name {
				font-size: 28rpx;
				margin-bottom: 10rpx;
			}

			.goods-price {
				color: #e4393c;
				font-size: 32rpx;
			}
		}
	}

	.card-actions {
		position: relative;

		.nums-box {
			position: absolute;
			top: -15rpx;
			right: -15rpx;
			width: 36rpx;
			height: 36rpx;
			background-color: #FF0000;
			border-radius: 50%;
			text-align: center;
		}
	}

	.action-btn {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		background-color: #267be0;
		display: grid;
		place-content: center;
	}
</style>