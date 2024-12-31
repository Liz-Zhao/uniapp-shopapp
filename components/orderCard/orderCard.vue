<template>
	<view class="order-card">
		<text style="text-align: right;">处理中</text>
		<view class="order-row">
			<image :src="cover" mode="aspectFill" class="order-img"></image>
			<text>商品名称</text>
		</view>
		<view class="order-row2">
			<text>2024-10-13 14:14:41</text>
			<text>共1件<text style="color: #000;">￥34.56</text></text>
		</view>
		<view class="more-btn">
			再来一单
		</view>
	</view>
	
</template>

<script>
	export default {
		name:"orderCard",
		data() {
			return {
				cover: 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
				
			};
		}
	}
</script>

<style lang="scss">
	$subtitle-text-color:#BBBBBB;
	
	.order-card{
		background-color: #ffffff;
		margin: 10px;
		padding: 10px;
		border-radius: 5px;
		overflow: auto;
		
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
			border: 1px solid #eea427;
			padding: 2px 5px;
			border-radius: 5px;
			float: right;
			// clear: both;
		}
	}
</style>