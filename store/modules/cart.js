// import Vuex from 'vuex'
// import requestHelper from '../../utils/requestHelper.js'
// let min = new requestHelper()
import api from '../../api'

let state = {
	productList: [],
	productMap: {}
}

let _utils = {
	updateProductRecord (prod) {
		let map = state.productMap
		let list = state.productList
		if (map[prod.id]) {
			map[prod.id] = map[prod.id] + 1
		} else {
			map[prod.id] = 1
			list.push(prod)
		}
	}
}
let mutations = {
	ADD_PRODUCT: (state, products) => {
		let _update = _utils.updateProductRecord
		if (products) {
			if (Array.isArray(products)) {
				products.map(v => _update(v))
			} else {
				_update(products)
			}
		}
	}
}

let actions = {
	async addProducts({ commit, state }, products) {
		try {
			let ret = await api.addCart({}, {
				successTitle: '加入购物车成功',
				failTitle: '加入购物车失败'
			})
			// console.log(22222, ret)
			commit('ADD_PRODUCT', products)
		} catch (e) {
			console.log(e)
			uni.showToast({
				title: '加购失败',
				duration: 2000
			})
		}
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}