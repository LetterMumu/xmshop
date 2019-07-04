// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Pubsub from 'pubsub-js'
import apiConfig from '../config/api.config'
import '../static/css/index.css'

Vue.config.productionTip = false

Vue.use(VueLazyLoad, {
  loading: '/static/img/loading.png'
})
Vue.use(VueAxios, Axios)
Vue.use(Pubsub)
Axios.defaults.baseURL = apiConfig.baseUrl
Vue.use(infiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
