export default{
	namespaced:true,
	state:{
		token: uni.getStorageSync('token') || null,
		// nickName ,avatarUrl
		userInfo: {}
	},
	getters:{
		
	},
	mutations:{
		updateUserInfo(state, payload){
			state.userInfo = payload
		},
		updateToken(state,token){
			state.token = token;
		}
	},
	actions:{
		
	}
}