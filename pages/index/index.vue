<template>

	<!-- some icons tabs -->
	<view class="actions-box">
		<view @click="handleToSearchPage">
			<uni-icons type="search" size="26" color="#000000"></uni-icons>
		</view>
		<view class="cart-btn">
			<view >
				<uni-icons type="cart" size="26" color="#000000"></uni-icons>
			</view>
			<view class="red-dot" v-if="totalShopNums>0">{{totalShopNums}}</view>
		</view>
	</view>
	<!-- tab box-->
	<view class="">
		<view class="tab-container">
			<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#267be0"
				@clickItem="onClickItem" />
		</view>
		<view class="content">
			<view class="content-box"v-for="(item,index) in items" :key="index" v-show="current === index">
				<shopCard v-for="(item,index) in filterShops" :key="index" :shop="item" />
			</view>
			<!-- <view v-if="current === 1"><text class="content-text">选项卡2的内容</text></view>
			<view v-if="current === 2"><text class="content-text">选项卡3的内容</text></view> -->
		</view>
	</view>

</template>

<script>
	import {BASE_URL,http} from '@/apis/requestAPI.js'
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				searchValue: '',
				current: 0,
				currentTitle:'',
				items: [],
				shops: [],
				tabs:[]
			}
		},
		onLoad() {
			this.getShopcates()
			this.getShops()
		},
		computed:{
			...mapGetters({
				totalShopNums:'cart/totalShopNums'
			}),
			filterShops(){
				if(this.current == 0){
					return this.shops
				}
				const filteredShops = this.shops.filter(shop => 
				  shop.shopcates.some(cate => cate.title === this.currentTitle)
				);
				return filteredShops
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
					this.currentTitle = this.items[this.current];
				}
			},
			handleToSearchPage(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			getShopcates() {
				http.get('/api/v1/shopcates').then((res) => {
					if (res.success) {
						this.tabs = res.data.data
						this.items = res.data.data.map((item) => item.title)
						this.items = ['全部',...this.items]
					}
				})
			},
			getShops() {
				http.get('/api/v1/shops').then((res) => {
					if (res.success) {
						this.shops = res.data.data.map((item) => {
							return {
								...item,
								id: item._id
							}
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.content {
		padding: 25rpx 10rpx 10rpx;
	}
	.content-box {
		display: grid;
		/* grid-template-columns: 1fr 1fr; */
		grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); /* 列宽自适应 */
		gap: 18rpx;
		/* grid-auto-rows: auto; */
	}
	.actions-box{
		margin: 10px;
		display: flex;
		gap: 8px;
		
		.cart-btn{
			position: relative;
		}
		.red-dot{
			position: absolute;
			top: -10rpx;
			right: -8rpx;
			width: 34rpx;
			height: 34rpx;
			background-color: #267be0;
			border-radius: 50%;
			display: grid;
			place-content: center;
			font-size: 12px;
			color: #ffffff;
		}
	}
</style>