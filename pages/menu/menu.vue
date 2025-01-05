<template>
	<view class="menu-container">
		<!-- 左侧分类列表 -->
		<scroll-view class="menu-sidebar" scroll-y :scroll-top="leftScrollTop">
			<view v-for="(item, index) in categories" :key="index" class="sidebar-item"
				:class="{ active: currentIndex === index }" @tap="handleCategoryClick(index)">
				{{ item.cate }}
			</view>
		</scroll-view>

		<!-- 右侧商品列表 -->
		<scroll-view class="menu-content" scroll-y :scroll-into-view="toView" @scroll="handleScroll">
			<view v-for="(category, index) in categories" :key="index" :id="'category-' + index" class="content-group">
				<view class="group-title">{{ category.cate }}</view>
				<view class="goods-list">
					<shopMenuCard v-for="(shop, goodsIndex) in category.shops" :key="goodsIndex" :shop="shop" />
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {http,BASE_URL} from '@/apis/requestAPI.js'
	export default {
		data() {
			return {
				categories:[],
				currentIndex: 0,
				toView: 'category-0',
				leftScrollTop: 0,
				categoryTops: [], // 存储每个分类的位置信息
				BASE_URL,
			}
		},
		onReady() {
			this.calculateCategoryTops()
		},
		onLoad() {
			this.getShops()
		},
		methods: {
			// 点击左侧分类
			handleCategoryClick(index) {
				this.currentIndex = index
				this.toView = 'category-' + index

			},

			// 计算每个分类的位置信息
			calculateCategoryTops() {
				const query = uni.createSelectorQuery().in(this)
				query.selectAll('.content-group').boundingClientRect(rects => {
					this.categoryTops = rects.map(rect => rect.top)
				}).exec()
			},

			// 处理右侧滚动
			handleScroll(e) {
				const scrollTop = e.detail.scrollTop + 20;

				// 根据滚动位置更新当前选中的分类
				for (let i = 0; i < this.categoryTops.length; i++) {
					const currentTop = this.categoryTops[i] - this.categoryTops[0]; // 减去第一个元素的位置，得到相对位置
					const nextTop = this.categoryTops[i + 1] ? this.categoryTops[i + 1] - this.categoryTops[0] : Infinity;

					if (scrollTop >= currentTop && scrollTop < nextTop) {
						// 只在索引真正改变时才更新
						if (this.currentIndex !== i) {
							this.currentIndex = i;
							// 更新左侧滚动位置，使用实际测量的高度
							const ITEM_HEIGHT = 50; // 左侧每个分类的高度，单位rpx
							this.leftScrollTop = i * ITEM_HEIGHT;
						}
						break;
					}
				}
			},
			getShops(){
				http.get('/api/v1/menu').then((res)=>{
					if(res.success){
						this.categories = res.data
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	$theme-color: #267be0;
	
	.menu-container {
		display: flex;
		height: 100vh;

		.menu-sidebar {
			width: 20%;
			background-color: #f7f7f7;

			.sidebar-item {
				padding: 20rpx;
				text-align: center;
				font-size: 28rpx;
				border-bottom: 1rpx solid #eee;

				&.active {
					background-color: #fff;
					color: $theme-color;
					position: relative;

					&::before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						width: 6rpx;
						height: 30rpx;
						background-color: $theme-color;
					}
				}
			}
		}

		.menu-content {
			width: 80%;
			background-color: #fff;

			.content-group {
				padding: 20rpx;

				.group-title {
					font-size: 32rpx;
					font-weight: bold;
					padding: 20rpx 0;
				}

				.goods-list {
					.goods-item {
						display: flex;
						padding: 20rpx 0;
						border-bottom: 1rpx solid #eee;

						.goods-image {
							width: 160rpx;
							height: 160rpx;
							margin-right: 20rpx;
						}

						.goods-info {
							flex: 1;

							.goods-name {
								font-size: 28rpx;
								margin-bottom: 10rpx;
							}

							.goods-price {
								color: #e4393c;
								font-size: 32rpx;
							}
						}
					}
				}
			}
		}
	}
</style>

