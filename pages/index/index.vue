<template>
	<!-- search box -->
	<view>
		<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @focus="focus" @clear="clear"
			cancelButton="none" placeholder="请输入名称">
		</uni-search-bar>
	</view>

	<!-- tab box-->
	<view class="">
		<view class="tab-container">
			<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#eea427"
				@clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0" class="content-box">
				<shopCard v-for="(item,index) in shops" :key="index" :shop="item" class="shop-card" />
			</view>
			<view v-if="current === 1"><text class="content-text">选项卡2的内容</text></view>
			<view v-if="current === 2"><text class="content-text">选项卡3的内容</text></view>
		</view>
	</view>

</template>

<script>
	import {
		BASE_URL,
		http
	} from '@/apis/requestAPI.js'
	export default {
		data() {
			return {
				searchValue: '',
				current: 0,
				items: [],
				shops: []
			}
		},
		onLoad() {
			this.getShopcates()
			this.getShops()
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			clear(res) {
				uni.showToast({
					title: 'clear事件，清除值为：' + res.value,
					icon: 'none'
				})
			},
			focus(e) {
				uni.showToast({
					title: 'focus事件，输出值为：' + e.value,
					icon: 'none'
				})
			},
			// get shopcate on
			getShopcates() {
				http.get('/api/v1/shopcates').then((res) => {
					if (res.success) {
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

<style>
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
	.shop-card{
		background-color: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
		overflow: hidden;
	}
</style>