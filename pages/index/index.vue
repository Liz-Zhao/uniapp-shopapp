<template>
	<!-- search box -->
	<view >
		<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" 
			 @focus="focus" @clear="clear" cancelButton="none" placeholder="请输入名称">
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
				<shopCard v-for="(item,index) in shops" :key="index"/>
			</view>
			<view v-if="current === 1"><text class="content-text">选项卡2的内容</text></view>
			<view v-if="current === 2"><text class="content-text">选项卡3的内容</text></view>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				current: 0,
				items: ['全部', '经典', '装饰画', ],
				shops:['1','2','3','4','5']
			}
		},
		onLoad() {

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
			
		}
	}
</script>

<style>
	.content{
		padding: 25rpx 10rpx 10rpx;
		
	}
	.content-box{
		display: grid;
		grid-template-columns: repeat(2, 49%);
		gap: 10rpx;
	}
</style>