<template>
	<view @click="handleToDetail">
		<image style="width: 100%;height: 320rpx;border-radius: 20rpx 20rpx 0 0;" :src="url+shop?.coverImage"
			mode="aspectFill"></image>
		<view class="shop-content">
			<view class="shopinfo">
				<text class="shop_title">{{shop?.title}}</text>
				<!-- <text class="shop_subtitle">{{shop?.subtitle}}</text> -->
				<text class="shop_price">￥{{shop?.price}}</text>
			</view>

			<view class="card-actions">
				<view class="action-btn" @click.stop="addShopCount">
					<uni-icons type="plusempty" size="18" color="#ffffff"></uni-icons>
				</view>
				<view class="nums-box" v-show="shopCounts >0">
					<text style="color: #ffffff;">{{shopCounts}}</text>
				</view>
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
				// cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				url: "http://127.0.0.1:3000/",
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
						url: '/pages/shopDetail/shopDetail?id='+ this.shop._id
					})
				} else{
					if(this.shopCounts >0){
						this.updateShop({id:this.shop._id,details:'',actualPrice: this.shop?.price,count: 1})
					}else{
						const uShop = {...this.shop,
							shopID: this.shop._id,
							solidNums:1,
							details: '',
							actualPrice: this.shop?.price,
							totalPrice: this.shop?.price 
						}
						this.addShop(uShop)
					}
				} 
			},
			updateShopCounts() {
				let items = this.carts.filter(item => item.id === this.shop?.id);
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

	.card-actions {
		position: relative;
	}

	.nums-box {
		position: absolute;
		top: -15rpx;
		right: -15rpx;
		width: 36rpx;
		height: 36rpx;
		background-color: #FF0000;
		border-radius: 50%;
		display: grid;
		place-content: center;
	}

	.add-btn {
		width: 80rpx;
		height: 54rpx;
		border-radius: 20rpx;
		background-color: #eea427;
		display: grid;
		place-content: center;
	}
	.action-btn {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		background-color: #eea427;
		display: grid;
		place-content: center;

	}
</style>