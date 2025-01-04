<template>
	<uni-search-bar v-model="searchValue" @focus="focus" @confirm="search" @clear="clear" cancelButton="none" placeholder="请输入名称">
	</uni-search-bar>
	<view v-show="!isSearch">
		<uni-section title="热门标签" padding>
			<view class="tags-box">
				<!-- <uni-tag text="忠爱" type="primary" @click="handleSearchByTag(text)"></uni-tag> -->
				<uni-tag v-for="(item,index) in tags" @click="handleSearchByTag(item)" :text="item" type="primary" :key="index"></uni-tag>
			</view>
			
		</uni-section>
	</view>
	<view v-show="isSearch && shopsCounts>0">
		<text>共有{{shopsCounts}}件相关商品</text>
		<view class="shops-box">
			<shopCard v-for="(item,index) in shops" :key="index" :shop="item"  />
		</view>
	</view>
	<view v-show="isSearch && shopsCounts==0">
		<text>暂无搜索结果</text>
	</view>
	
</template>

<script>
	import {http} from '@/apis/requestAPI.js'
	export default {
		data() {
			return {
				isSearch: false,
				searchValue: '',
				shops:[],
				shopsCounts: 0,
				tags:['忠爱','推荐1111']
			}
		},
		methods: {
			focus(e) {
				
			},
			search(res) {
				this.isSearch = true
				this.handleTextSearchShops()
			},
			clear(res) {
				this.isSearch = false
				this.shops = []
			},
			handleTextSearchShops(){
				http.get('/api/v1/shops', {'title[regex]': this.searchValue}).then((res) => {
					if (res.success) {
						this.shops = res.data.data.map((item) => {
							return {
								...item,
								id: item._id
							}
						})
						this.shopsCounts = res.data.totals
					}
				})
			},
			handleSearchByTag(text){
				console.log(text)
			}
		}
	}
</script>

<style lang="scss">
	.tags-box{
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	.shops-box{
		margin: 12px;
	}
</style>
