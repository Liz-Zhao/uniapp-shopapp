<template>
	<view class="shops-box">
		<text>商品列表（{{totalShopNums()}}）</text>
		<view class="shop-item" v-for="(item,index) in carts" :key="index">
			<image :src="item && BASE_URL+'/'+ item?.coverImage" mode="aspectFill" class="shop-img"></image>
			<view class="col-box">
				<text>{{item.title}}</text>
				<text style="font-size: 14px;">{{item.details}}</text>
				<text>￥{{item.actualPrice}} x {{item.solidNums}}</text>
			</view>
			<text>￥{{item.totalPrice}}</text>
		</view>
		<view class="divider"></view>
		<!-- <view class="row-box">
			<text>运费</text>
			<text>￥0.00</text>
		</view>
		<view class="divider"></view> -->
		<view class="row-box">
			<text>备注</text>
			<input type="text" v-model="message" placeholder="留言在此" />
		</view>
		<view class="divider"></view>
		
	</view>
	<view class="action-container">
		<view class="action-box">
			<view class="">
				<text>总计：<text style="color:#FF0000">￥{{totalPrice()}}</text> </text>
			</view>
			<view class="submit-btn" @click="handleAddOrder">提交订单</view>
		</view>

	</view>
</template>

<script>
	import {mapState,mapGetters,mapMutations} from 'vuex'
	import { BASE_URL,http } from '../../apis/requestAPI.js';
	
	export default {
		data() {
			return {
				message:'',
				BASE_URL
			}
		},
		methods: {
			...mapGetters({
				totalPrice: 'cart/totalPrice',
				totalShopNums: "cart/totalShopNums"
			}),
			...mapMutations({
				emptyCarts:'cart/emptyCarts'
			}),
			async handleAddOrder(){
				const res = await http.post('/api/v1/order',
				{message: this.message, 
				totalSolidNums:this.totalShopNums(),
				 totalMoney:this.totalPrice(),
				 shops: this.carts})
				
				if(res.success){
					uni.showToast({
						title:'成功提交'
					})
					uni.switchTab({
						url:'/pages/index/index'
					})
					this.emptyCarts()
				}else{
					console.log(res)
				}
			}
		},
		computed:{
			...mapState({
				carts: state => state.cart.carts
			})
		}
	}
</script>

<style lang="scss">
	.action-container {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ffffff;
		padding: 20px 5px;
		box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.4);

		.action-box {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.submit-btn {
			color: #ffffff;
			background-color: #eea427;
			padding: 10px 15px;
			border-radius: 20px;
		}
	}
	.shops-box{
		margin: 10px;
		padding: 14px;
		border-radius: 10px;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
	}
	.shop-item{
		display: flex;
		gap: 10px;
		align-items: flex-end;
		margin: 10px 0;
	}
	.col-box{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 60%;
		overflow: hidden;
		height: 68px;
	}
	.row-box{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.shop-img{
		width: 68px;
		height: 68px;
		border-radius: 10px;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
	}
	.divider {
		width: 100%;
		height: 2px;
		background-color: #D8D8D8;
		margin: 9px 0;
	}
</style>