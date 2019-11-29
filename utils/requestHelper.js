class MinRequest {
	 // 默认配置
	config = {
	    baseURL: 'http://rap2api.taobao.org/app/mock/234367/',
	    header: {
	      'content-type': 'application/json'
	    },
	    method: 'GET',
	    dataType: 'json',
	    responseType: 'text'
	}
	
	loadingConfig = {
		loadingTitle: '加载中',
		successTitle: '请求成功',
		failTitle: '请求失败'
	}
	
	// 判断url是否完整
	static isCompleteURL (url) {
	    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}
	
	// 设置配置
	setConfig (func) {
		this.config = func(this.config)
	}
	
	handleRequeustEnd (success, finalLoadingConfig) {
		let _hdler = (title) => {
			uni.hideLoading()
			uni.showToast({
				title,
				duration: 2000
			})
		}
		if (finalLoadingConfig) {
			if (success) {
				_hdler(finalLoadingConfig.successTitle)
			} else {
				_hdler(finalLoadingConfig.failTitle)
			}
		}
	}
	
	request (options = {}, loading = false) {
		options['baseURL'] = options.baseURL || this.config.baseURL
		options['dataType'] = options.dataType || this.config.dataType
		options['url'] = MinRequest.isCompleteURL(options.url) ? options.url : (options.baseURL + options.url)
		console.log(333333333, loading)
		options['header'] = {
			...this.config.header,
			...options.header
		}
		options['method'] = options.method || this.config.method
		
		let loadingConfig = this.loadingConfig
		let finalLoadingConfig = loading && Object.prototype.toString.call(loading) === '[object Object]'
			? {
					loadingTitle: loading.loadingTitle || loadingConfig.loadingTitle,
					successTitle: loading.successTitle || loadingConfig.successTitle,
					failTitle: loading.failTitle || loadingConfig.failTitle
				}
			: ''
		
		let that = this
		
		try {
			return new Promise((resolve, reject) => {
				options['success'] = function (res) {
					that.handleRequeustEnd(true, finalLoadingConfig)
					if (res.statusCode === 200 && res.data && res.data.code === 0) {
						resolve(res.data)
					} else {
						reject((res && res.data) || {
							code: -1,
							err: new Error('网络错误')
						})
					}
				}
				options['fail'] = function (res) {
					that.handleRequeustEnd(false, finalLoadingConfig)
					reject(res)
				}
				finalLoadingConfig && uni.showLoading({
					title: finalLoadingConfig.loadingTitle
				})
				uni.request(options)
			})
		} catch (e) {
			//TODO handle the exception
		}
	}

	get (url, params, options = {}, loading = false) {
		options['url'] = url
		options['data'] = data
		options['method'] = 'GET'
		return this.request(options, loading)
	}
	
	post (url, data, options = {}, loading = false) {
		options['url'] = url
		options['data'] = data
		options['method'] = 'POST'
		return this.request(options, loading)
	}
}

// MinRequest.install = function (Vue) {
// 	Vue.mixin({
// 		beforeCreate: function () {
// 			if (this.$options.minRequest) {
// 				console.log('1111111111111111', this.$options.minRequest)
// 				Vue._minRequest = this.$options.minRequest
// 			} else {
// 				Vue._minRequest = new MinRequest()
// 			}
// 			console.log(22222222222)
// 		}
// 	})
// 	Object.defineProperty(Vue.prototype, '$minApi', {
// 		get: function () {
// 			return Vue._minRequest
// 		}
// 	})
// }

export default MinRequest