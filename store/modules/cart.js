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
	async addProducts({ commit, state }, data) {
		try {
			let ret = await api.addCart(data.product, {
				successTitle: '加入购物车成功',
				failTitle: '加入购物车失败'
			})
			let cb = data.cb
			// console.log(333333333, data, cb)
			commit('ADD_PRODUCT', data.product)
			cb && cb()
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