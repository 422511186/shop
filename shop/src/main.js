import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './plugins/element.js'
import './assets/css/global.css'

import axios from 'axios'
import VueAxios from "vue-axios";

Vue.prototype.$http =axios
Vue.config.productionTip = false



Vue.use(VueAxios, axios)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
