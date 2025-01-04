export default{
	namespaced:true,
	state:{
		token: uni.getStorageSync('token') || null,
		// nickName ,avatarUrl
		userInfo: uni.getAccountInfoSync('userInfo') || null
	},
	getters:{
		
	},
	mutations:{
		updateUserInfo(state, payload){
			state.userInfo = payload
		},
		updateToken(state,token){
			state.token = token;
		},
		clearAll(state){
			state.token = null;
			state.userInfo = null
		}
	},
	actions:{
		
	}
}