import requestHelper from '../utils/requestHelper.js'
let myRequest = new requestHelper()


export default {
	addCart (data, loading = false) {
		// return myRequest.post({
		// 	url: 'addCart',
		// 	data
		// }, loading)
		return myRequest.post('addCart', data, {}, loading)
	}
}