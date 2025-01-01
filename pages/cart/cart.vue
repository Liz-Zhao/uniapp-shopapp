<template>
	<view v-for="(item,index) in carts" :key="index" class="cart-card">
		<image :src="url+item?.coverImage" mode="aspectFill" class="cart-image"></image>
		<view class="shop-info">
			<text>{{item.title}}</text>
			<text class="shop-subtitle">{{item.subtitle}}</text>
			<text>￥{{item.price}}</text>
		</view>
		<uni-icons fontFamily="CustomFont" :size="20" color="#FF0000" @click="handleRemoveShop(item)">{{'&#xe674'}}</uni-icons>
		<!-- calculator -->
		<view class="calculator">
			<view class="action-btn" @click="handleAddShop(item)">
				<uni-icons type="plusempty" size="18" color="#ffffff" ></uni-icons>
			</view>
			<text style="min-width: 50rpx;text-align: center;">{{item.counts}}</text>
			<view class="action-btn" @click="handleSubShop(item)">
				<uni-icons fontFamily="CustomFont" :size="18" color="#ffffff">{{'&#xe697'}}</uni-icons>
			</view>
		</view>
	</view>
	<view style="height: 150px;text-align: center; color: #A6A6A6; margin-top: 20px;">再也没有了~</view>
	<view class="action-container">
		<view class="action-box">
			<view class="">
				<text>总计：<text style="color:#FF0000">￥{{totalPrice}}</text> </text>
			</view>
			<view class="submit-btn">确定提交</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapMutations } from 'vuex';
	
	export default {
		data() {
			return {
				shops:['1','2','3'],
				// cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				url:"http://127.0.0.1:3000/",
			}
		},
		methods: {
			...mapMutations({
				removeShop: 'cart/removeShop',
				updateShop:'cart/updateShop'
			}),
			handleRemoveShop(shop){
				this.removeShop(shop)
			},
			handleAddShop(shop){
				this.updateShop({...shop, count:1})
			},
			handleSubShop(shop){
				if(shop.counts == 1){
					this.removeShop(shop)
				}else{
					this.updateShop({...shop, count:-1})
				}
			}
		},
		computed:{
			...mapState({
				carts: state=>state.cart.carts,
				totalPrice: state => state.cart.totalPrice
			})
			
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
