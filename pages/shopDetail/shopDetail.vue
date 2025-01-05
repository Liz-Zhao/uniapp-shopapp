<template>
	<view class="detail-top-container">
		<image :src="shop?.shopImages" mode="aspectFill" class="detail-img"></image>
		<view style="display: flex; justify-content: space-between;">
			<text>{{shop?.title}}</text>
			<text>￥{{shop?.price}}</text>
		</view>
		<text style="color: #A6A6A6; font-size: 12px;">{{shop?.subtitle}}</text>
		<view class="divider"></view>
	</view>
	<view style="display: flex; justify-content: space-between; margin: 0 20px;">
		<text>数量</text>
		<view class="calculator">
			<view class="action-btn" @click="handleAddShop">
				<uni-icons type="plusempty" size="18" color="#ffffff"></uni-icons>
			</view>
			<text style="min-width: 50rpx;text-align: center;">{{solidNums}}</text>
			<view class="action-btn" @click="handleSubShop">
				<uni-icons fontFamily="CustomFont" :size="18" color="#ffffff">{{'&#xe697'}}</uni-icons>
			</view>
		</view>

	</view>
	<view class="specs-box" v-for="(item,index) in shop?.specification" :key="index">
		<text>{{item.title}}</text>
		<view class="options-box">
			<view class="option" :class="{checked: option.checked}" v-for="(option,pindex) in item.options" :key="pindex" @click="handleSelectOption(index,pindex)">
				{{option.title}}
			</view>
		</view>
	</view>
	<view style="height: 150px;text-align: center; color: #A6A6A6;">再也没有了~</view>
	<view class="action-container">
		<text style="color:#FF0000">￥{{actualPrice}}</text>
		<text style="color:#8f8f8f;">{{details}}</text>
		<view class="action-box">
			<view class="submit-btn" @click="handleAddCart">加入购物车</view>
			<view class="submit-btn" @click="handleAddOrder">结算</view>
		</view>
		
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters } from 'vuex';
	import {http} from '../../apis/requestAPI.js'
	import { BASE_URL } from '../../apis/requestAPI.js';
	
	export default {
		onLoad:function(option){
			this.id = option.id;
			this.getShopDetail(option.id)
		},
		data() {
			return {
				BASE_URL,
				id: '',
				shop:{
					shopImages:[]
				},
				solidNums:1,
			}
		},
		methods: {
			...mapMutations({
				addShop: 'cart/addShop',
			}),
			handleAddCart(){
				const uShop = {...this.shop,
					shopID: this.shop._id+this.details,
					solidNums: this.solidNums, 
					details:this.details, 
					actualPrice:this.actualPrice,
					totalPrice:this.totalPrice}
				this.addShop(uShop)
				uni.navigateBack()
				// uni.switchTab({
				// 	url:'/pages/index/index'
				// })
			},
			handleAddShop(){
				this.solidNums +=1
			},
			handleSubShop(){
				if(this.solidNums ==1){
					return
				}else{
					this.solidNums += -1
				}
			},
			async getShopDetail(id){
				const res = await http.get('/api/v1/shop/'+id);
				if(res.success){
					this.shop = {...res.data, shopImages: this.BASE_URL+'/'+res.data.shopImages[0]};
				}
			},
			handleSelectOption(index,pindex){
				let specs = this.shop.specification;
				specs = specs.map((item, i) => {
				  // 对每个 item 的 options 进行处理
				  item.options = item.options.map((option, p) => {
				    // 判断当前 option 是否是需要修改的选项
				    if (p === pindex && i === index) {
				      return { ...option, checked: true };  // 修改 checked 为 true
				    } else {
				      return { ...option, checked: false };  // 其他的选项设置为 false
				    }
				  });
				  return item;  // 返回修改后的 item
				});
			},
			handleAddOrder(){
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}else{
					const uShop = {...this.shop,
						shopID: this.shop._id+this.details,
						solidNums: this.solidNums, 
						details:this.details, 
						actualPrice:this.actualPrice,
						totalPrice:this.totalPrice}
					this.addShop(uShop)
					uni.navigateTo({
						url:'/pages/addOrder/addOrder'
					})
				}
			}
		},
		computed:{
			details(){
				let details = '';
				// Check if specification is defined and is an array
				  if (Array.isArray(this.shop.specification)) {
				    this.shop.specification.forEach((item) => {
				      details += item.title || ''; // Handle undefined title gracefully
				      let s = "";
				      
				      // Check if options exist and are an array
				      if (Array.isArray(item.options)) {
				        item.options.forEach((option) => {
				          if (option.checked) {
				            s = option.title || ''; // Handle undefined title gracefully
				          }
				        });
				      }
				      details += ":" + s + ";";
				    });
				  }
				return details;
			},
			actualPrice(){
				let actualPrice = 0;
				if (Array.isArray(this.shop.specification)) {
				this.shop.specification.forEach((item)=>{
					 if (Array.isArray(item.options)) {
					item.options.forEach((option) => {
					  if (option.checked) {
						actualPrice+= option.price;
					  }
					});
					}
				})}
				return Math.round((actualPrice + this.shop.price)*100)/100
			},
			totalPrice(){
				return Math.round((this.actualPrice * this.solidNums) * 100) / 100;;
			}
		}
	}
</script>

<style lang="scss">
	.detail-top-container {
		margin: 10px 20px;

		.detail-img {
			width: 100%;
			border-radius: 20px;
			margin-bottom: 15px;
		}

		.divider {
			width: 100%;
			height: 2px;
			background-color: #D8D8D8;
			margin: 9px 0;
		}
	}
	.calculator{
		display: flex;
		gap: 5rpx;

		.action-btn{
			width: 48rpx;
			height: 48rpx;
			border-radius: 50%;
			background-color: #267be0;
			display: grid;
			place-content: center;
			
		}
	}
	.specs-box{
		margin: 0 20px;
		
		.options-box{
			width: 100%;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			column-gap: 3.33%; /* 设置列间距为10% / 3 */
			margin: 10px 0;
		}
		
		.option{
			padding: 10px 15px;
			border-radius: 10px;
			background-color: #ffffff;
			box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.3);
			display: grid;
			place-content: center;
			margin-bottom: 10px;
		}
		.option.checked{
			background-color: #267be0;
			color: #ffffff;
		}
	}
	.action-container{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ffffff;
		padding: 15px 5px;
		box-shadow: 1px 0 4px 0 rgba(0, 0, 0, 0.4);
		display: flex;
		flex-direction: column;
		
		.action-box{
			display: flex;
			justify-content: flex-end;
			gap: 10px;
			align-items: center;
		}
		.submit-btn{
			color: #ffffff;
			background-color: #267be0;
			padding: 10px 15px;
			border-radius: 20px;
		}
	}
</style>