<template>
	<view class="detail-top-container">
		<image :src="cover" mode="aspectFill" class="detail-img"></image>
		<view style="display: flex; justify-content: space-between;">
			<text>iPad mini</text>
			<text>￥34.75</text>
		</view>
		<text style="color: #A6A6A6; font-size: 12px;">2024新款</text>
		<view class="divider"></view>
	</view>
	<view style="display: flex; justify-content: space-between; margin: 0 20px;">
		<text>数量</text>
		<view class="calculator" v-if="getCounts">
			<view class="action-btn" @click="handleAddShop">
				<uni-icons type="plusempty" size="18" color="#ffffff"></uni-icons>
			</view>
			<text style="min-width: 50rpx;text-align: center;">{{getCounts}}</text>
			<view class="action-btn" @click="handleSubShop">
				<uni-icons fontFamily="CustomFont" :size="18" color="#ffffff">{{'&#xe697'}}</uni-icons>
			</view>
		</view>
		<text v-else>0</text>
	</view>
	<view class="specs-box" v-for="(item,index) in specs" :key="index">
		<text>{{item.title}}</text>
		<view class="options-box">
			<view class="option" v-for="(option,index) in item.options" :key="index">
				{{option.title}}
			</view>
		</view>
	</view>
	<view style="height: 150px;text-align: center; color: #A6A6A6;">再也没有了~</view>
	<view class="action-container">
		<text>总计：<text style="color:#FF0000">￥{{totalPrice}}</text> </text>
		<view class="action-box">
			<view class="submit-btn" @click="handleAddCart">加入购物车</view>
			<view class="submit-btn">结算</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters } from 'vuex';
	
	export default {
		onLoad:function(option){
			console.log(option.id)
			this.id = option.id
		},
		data() {
			return {
				cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				specs:[{title:"颜色", options:[{title:"白色"},{title:"银色"},{title:"灰色"},{title:"黑色"},{title:"灰色"}]},
				{title:"型号", options:[{title:"白色"},{title:"银色"},{title:"灰色"},{title:"黑色"},{title:"灰色"}]},
				{title:"型号", options:[{title:"白色"},{title:"银色"},{title:"灰色"},{title:"黑色"},{title:"灰色"}]}
					],
				id: '',
				shop:{price:9.9,id:'1'}
			}
		},
		methods: {
			...mapMutations({
				addShop: 'cart/addShop',
				updateShop:'cart/updateShop',
				removeShop:'cart/removeShop'
			}),
			handleAddCart(){
				this.addShop(this.shop)
			},
			handleAddShop(){
				this.updateShop({...this.shop, count:1})
			},
			handleSubShop(){
				if(this.getCounts && this.getCounts ==1){
					this.removeShop({...this.shop})
				}else{
					this.updateShop({...this.shop, count:-1})
				}
			}
		},
		computed:{
			...mapState({
				carts: state=>state.cart.carts,
				totalPrice: state =>state.cart.totalPrice
			}),
			getCounts(){
				let item= this.carts.find(item=> item.id === this.id)
				return item ? item.counts : null;
			}
		}
	}
</script>

<style lang="scss">
	.detail-top-container {
		margin: 10px 20px;

		.detail-img {
			width: 100%;
			border-radius: 20px;
			margin-bottom: 15px;
		}

		.divider {
			width: 100%;
			height: 2px;
			background-color: #D8D8D8;
			margin: 9px 0;
		}
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
	.specs-box{
		margin: 0 20px;
		
		.options-box{
			width: 100%;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			column-gap: 3.33%; /* 设置列间距为10% / 3 */
			margin: 10px 0;
		}
		
		.option{
			padding: 10px 15px;
			border-radius: 10px;
			background-color: #ffffff;
			box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
			display: grid;
			place-content: center;
			margin-bottom: 10px;
		}
	}
	.action-container{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ffffff;
		padding: 15px 5px;
		box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.4);
		
		.action-box{
			display: flex;
			justify-content: flex-end;
			gap: 10px;
			align-items: center;
		}
		.submit-btn{
			color: #ffffff;
			background-color: #eea427;
			padding: 10px 15px;
			border-radius: 20px;
		}
	}
</style>