import user from '@/store/modules/user.js'
import getFavoriteId from '@/store/modules/getFavoriteId.js'

// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	modules: {
		user,
        getFavoriteId
	},
	strict: true
})
// #endif

// #ifdef VUE3
import {createStore} from 'vuex'
const store = createStore({
	modules: {
		user,
        getFavoriteId
	}
})
// #endif

export default store