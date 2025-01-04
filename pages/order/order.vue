<template>
	<view class="order-container">
		<view class="tab-container">
			<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#267be0"
				@clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0" class="content-box">
				<view class="loading-box" v-show="Loading">
					<image :src="LoadingIcon" mode="aspectFill" class="loading-img"></image>
				</view>
				<orderCard v-for="(item,index) in orders" :key="index" :order="item" />
				<view class="empty-toast">再也没有了~</view>
			</view>
			<view v-if="current === 1">
				<orderCard v-for="(item,index) in doingOrders" :key="index" :order="item" />
				<view class="empty-toast">再也没有了~</view>	
			</view>
			<view v-if="current === 2">
				<orderCard v-for="(item,index) in doneOrders" :key="index" :order="item" />
				<view class="empty-toast">再也没有了~</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {BASE_URL,http} from '@/apis/requestAPI.js'
	import LoadingIcon from '../../static/loading.gif'
	export default {
		data() {
			return {
				current: 0,
				items: ['全部', '处理中', '已完成' ],
				orders:[],
				doingOrders:[],
				doneOrders:[],
				Loading:false,
				LoadingIcon
			}
		},
		onLoad() {
			this.getOrders()
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					if(this.current == 0){
						this.getOrders()
					}else if(this.current == 1){
						this.getDoingOrders()
					}else if(this.current == 2){
						this.getDoneOrders()
					}
				}
			},
			getOrders(){
				this.Loading = true
				http.get('/api/v1/orders').then((res)=>{
					if(res.success){
						this.orders = res.data.data
					}
					this.Loading = false
				})
			},
			getDoingOrders(){
				this.Loading = true
				http.get('/api/v1/orders',{status:'0'}).then((res)=>{
					if(res.success){
						this.doingOrders = res.data.data
					}
					this.Loading = false
				})
			},
			getDoneOrders(){
				this.Loading = true
				http.get('/api/v1/orders',{status:'1'}).then((res)=>{
					if(res.success){
						this.doneOrders = res.data.data
					}					
					this.Loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	$theme-color:#267be0;
	
	.order-container{
		height: 100vh;
	}
	.loading-box {
		display: flex;
		justify-content: center;
		align-items: center;
		
		.loading-img{
			width: 120rpx;
			height: 60rpx;
		}
	}
	.empty-toast{
		height: 50px;
		text-align: center;
		padding-top: 20px; 
		color: #A6A6A6;
	}
</style>
