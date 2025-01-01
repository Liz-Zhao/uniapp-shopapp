//index.js 
import {createStore} from 'vuex';
import cart from '/store/modules/cart.js'

const store = createStore({
	modules:{
		cart
	}
})
export default store;