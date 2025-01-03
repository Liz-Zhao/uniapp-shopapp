//index.js 
import {createStore} from 'vuex';
import cart from '/store/modules/cart.js'
import app from '/store/modules/app.js'

const store = createStore({
	modules:{
		cart,
		app
	}
})
export default store;