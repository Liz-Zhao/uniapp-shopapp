<template>
	<view class="order-container">
		<view class="tab-container">
			<uni-segmented-control :current="current" :values="items" style-type="text" active-color="#eea427"
				@clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0" class="content-box">
				<orderCard v-for="(item,index) in orders" :key="index" />
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
				current: 0,
				items: ['全部', '处理中', '已完成', ],
				orders:['1','2','3','4','5']
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
		}
	}
</script>

<style>
	.order-container{
		background-color: #f8f8f8;
		height: 100vh;
	}
</style>
