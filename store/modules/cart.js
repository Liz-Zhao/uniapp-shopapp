export default{
	namespaced:true,
	state:{
		carts:[],
		totalPrice: 0
	},
	getters:{
		lens(state){
			return state.carts.length
		}
	},
	mutations:{
		addShop(state, shop){
			state.carts = [{...shop, counts:1}, ...state.carts]
			state.totalPrice = Math.round((state.totalPrice + Number(shop?.price)) * 100) / 100;
		},
		// count -1 1
		updateShop(state, payload){
			state.carts = state.carts.map((item)=> item.id== payload.id ? {...item, counts: item?.counts+payload.count} : item)
			state.totalPrice = Math.round((state.totalPrice + payload.price * payload.count) * 100 ) / 100;
		},
		removeShop(state, payload){
			state.carts = state.carts.filter((item)=> item.id !== payload.id)
			 const lens = state.carts.length; // 计算 carts 的长度
			if(lens == 0){
				state.totalPrice = 0.00
			}else{
				state.totalPrice += payload.counts * payload.price * -1;
			}
		}
	},
	actions:{
		
	}
}