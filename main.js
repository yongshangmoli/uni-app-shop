import Vue from 'vue'
import App from './App'
import store from './store'
// import minApi from './utils/requestHelper.js'

Vue.config.productionTip = false
Vue.prototype.$store = store
// Vue.use(minApi)
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
