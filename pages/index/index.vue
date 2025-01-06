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
	<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="toLower">
		<view class="tab-container">
			<uni-segmented-control :current="current" :values="cateTaps" style-type="text" active-color="#267be0"
				@clickItem="onClickItem" />

		</view>
		<view class="content" >
			<view class="content-box"v-for="(item,index) in shops" :key="index" v-show="current === index">
				<shopCard v-for="(item,index) in item.shops" :key="index" :shop="item" />
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import {BASE_URL,http} from '@/apis/requestAPI.js'
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				current: 0,
				shops: [],
				cateTaps:[]
			}
		},
		onLoad() {
			this.getShops({page:1,pageSize:10})
		},
		computed:{
			...mapGetters({
				totalShopNums:'cart/totalShopNums'
			}),
			
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			handleToSearchPage(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			},
			getShops(payload) {
				http.get('/api/v1/shopGroup',payload).then((res) => {
					if (res.success) {
						if(payload.id ){							
							const data = res.data.shops;
							this.shops = this.shops.map((item)=> item.id === payload.id ? {...item, page:res.data.page,shops:[...item.shops, ...data]}  : item)
						}
						else{
							this.cateTaps = res.data.map((item)=>{
								return item.cate
							})
							this.shops = res.data;
						}
					}
				})
			},
			toLower(e){
				const currentData = this.shops[this.current];
				if(currentData.page * currentData.pageSize < currentData.totals){
					this.getShops({id:currentData.id, page:currentData.page +1, pageSize:currentData.pageSize})
				}
			},
			
		}
	}
</script>

<style lang="scss">
	.scroll-Y {
		// height: 100%;
		height: 100vh;
	}
	.content {
		padding: 25rpx 10rpx 10rpx;
	}
	.content-box {
		display: grid;
		grid-template-columns: 1fr 1fr;
		// grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); /* 列宽自适应 */
		gap: 18rpx;
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