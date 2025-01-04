export default{
	namespaced:true,
	state:{
		carts:[],
	},
	getters:{
		lens(state){
			return state.carts.length
		},
		totalPrice(state){
			let totalP = 0
			state.carts.forEach((item)=>{
				totalP = item.totalPrice + totalP;
			})
			return Math.round((totalP)*100) / 100;
		},
		totalShopNums(state){
			let totalN = 0
			state.carts.forEach((item)=>{
				totalN += item.solidNums
			})
			return totalN
		}
	},
	mutations:{
		addShop(state, shop){
			let id = shop._id
			delete shop._id
			const existed = state.carts.find((item)=> item.shopID== id+shop.details)
			if(existed){
				this.commit('cart/updateShop', {id:id,details: shop.details,actualPrice: shop.actualPrice,count: 1 });
			}else{
				state.carts = [{...shop,id:id}, ...state.carts]
			}
		},
		// count -1 1
		updateShop(state, payload){
			state.carts = state.carts.map((item)=> item.shopID== payload.id+payload.details ? {...item, 
				solidNums: item?.solidNums+payload.count, 
				totalPrice: item?.totalPrice + payload.actualPrice * payload.count} : item)
		},
		removeShop(state, payload){
			state.carts = state.carts.filter((item)=> item.shopID !== payload.id+payload.details )
		},
		emptyCarts(state){
			state.carts = []
		}
	},
	actions:{
		
	}
}