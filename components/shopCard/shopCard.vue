<template>
	<view @click="handleToDetail" class="shop-card">
		<image style="width: 100%;height: 200px;border-radius: 20rpx 20rpx 0 0;" :src="url+shop?.coverImage" mode="aspectFill"></image>
		<view class="shop-content">
			<view class="shopinfo">
				<text class="shop_title">{{shop?.title}}</text>
				<text class="shop_subtitle">{{shop?.subtitle}}</text>
				<text class="shop_price">￥{{shop?.price}}</text>
			</view>
			
			<view class="card-actions">
				<view class="calculator" v-if="IsAddCart && shopCounts>0">
					<view class="action-btn" @click.stop="addShopCount">
						<uni-icons type="plusempty" size="18" color="#ffffff"></uni-icons>
					</view>
					<text style="min-width: 50rpx;text-align: center;">{{shopCounts}}</text>
					<view class="action-btn" @click.stop="subShopCount">
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
	import {mapState,mapMutations,mapGetters } from 'vuex';
	export default {
		name: "shopCard",
		props:{
			shop:{
				type:Object,
				default:()=>{}
			}
		},
		data() {
			return {
				// cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				url:"http://127.0.0.1:3000/",
				IsAddCart:false,
				shopCounts: null // 用来存储 ShopCounts 的结果
			};
		},
		methods:{
			...mapMutations({
				addShop: 'cart/addShop',
				updateShop:'cart/updateShop',
				removeShop: 'cart/removeShop'
			}),
			handleToDetail(){
				uni.navigateTo({
					url:'/pages/shopDetail/shopDetail?id='+this.shop?.id
				})
			},
			handleToCart(){
				this.IsAddCart = true
				this.addShop(this.shop)
			},
			addShopCount(){
				this.updateShop({...this.shop, count:1})
			},
			subShopCount(){				
				if(this.shopCounts == 1){
					this.removeShop({...this.shop})
					this.IsAddCart = false
				}else{
					this.updateShop({...this.shop, count:-1})
				}
			},
			updateShopCounts() {
				let item = this.carts.find(item => item.id === this.shop?.id);
				this.shopCounts = item ? item.counts : null;
			}
		},
		computed:{
			...mapState({
				carts: state => state.cart.carts
			}),
		},
		watch: {
		  // 监听 carts 和 shop.id 变化
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