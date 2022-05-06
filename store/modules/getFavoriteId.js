// 上次启动时的用户信息
let favoInfoHistory = uni.getStorageSync('favoriteInfo') || {};
let state = {
		isEdit: Boolean(Object.keys(favoInfoHistory).length),
		//心仪信息
		info: favoInfoHistory
	},
	getters = {
		info(state) {
			return state.info;
		},
        isEdit(state){
            return state.isEdit;
        }
	},
	mutations = {
        changeIsEdit(state){
            state.isEdit=false;
            console.log("state.isEdit",state.isEdit)
        },
		changeFavoInfo(state, info) { 
			//原有的结合传来的参数
			let _info = state.info;
			state.info = Object.assign({}, _info, info);
			
			console.log('state.info',state.info);
			//存储最新的用户数据到本地持久化存储
			uni.setStorageSync('favoriteInfo', state.info);
			if(info.token){
				uni.setStorage({
					key: 'uni_id_token',
					data: state.info.token,
					complete(e){
						// console.log('setStorage-------',e);
					}
				});
				uni.setStorageSync('uni_id_token_expired', state.info.tokenExpired)
			}
		}
	}
export default {
	namespaced: true,
	state,
	getters,
	mutations
}