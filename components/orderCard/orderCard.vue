<template>
	<view class="order-card">
		<text class="order-status">{{formatStatus(order?.status)}}</text>
		<view class="order-row">
			<image :src="BASE_URL+'/'+order?.shops[0].coverImage" mode="aspectFill" class="order-img"></image>
			<text v-if="shopCounts">{{order?.shops[0]?.title}} 等商品</text>
			<text v-else>{{order?.shops[0]?.title}}</text>
		</view>
		<view class="order-row2">
			<text>{{formatData(order.createdAt)}}</text>
			<text>共{{order?.totalSolidNums}}件<text style="color: #000;">￥{{order?.totalMoney}}</text></text>
		</view>
		<view class="more-btn">
			再来一单
		</view>
	</view>
	
</template>

<script>
	import {BASE_URL} from '@/apis/requestAPI.js'
	export default {
		name:"orderCard",
		props: {
			order: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				BASE_URL,
			};
		},
		methods:{
			formatData(timestamp){
				const inputDate = new Date(timestamp);
				const formattedDate = inputDate.toLocaleString("zh-cn", {dateStyle:'long'});
				return formattedDate;
			},
			formatStatus(s){
				if(s== '0'){
					return '进行中'
				}else if(s=='1'){
					return '已完成'
				}else{
					return '已取消'
				}
			},
		},
		computed:{
			shopCounts(){
				return this.order.shops.length >=2 ;
			}
		}
	}
</script>

<style lang="scss">
	$subtitle-text-color:#8f8f8f;
	$theme-color:#267be0;
	
	.order-card{
		background-color: #ffffff;
		margin: 10px;
		padding: 10px;
		border-radius: 5px;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
		overflow: auto;
		
		.order-status{
			float: right;
			color: $theme-color;
		}
		
		.order-row{
			display: flex;
			align-items: flex-end;
			gap: 10px;
			
			.order-img{
				width: 46px;
				height: 46px;
				border-radius: 5px;
			}
		}
		.order-row2{
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			color: $subtitle-text-color;
			margin-bottom: 5px;
			
		}
		.more-btn{
			border: 1px solid $theme-color;
			padding: 2px 5px;
			border-radius: 5px;
			float: right;
		}
	}
</style>