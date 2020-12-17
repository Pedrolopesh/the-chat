import Vue from 'vue';
import App from './App.vue';
import './assets/index.scss';
import './registerServiceWorker';
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router';
import store from './store';
import Vuesax from 'vuesax';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import axios from './util/axios';
Vue.prototype.$http = axios
Vue.prototype.$url = process.env.VUE_APP_PROD_URL

// Install BootstrapVue
Vue.use(BootstrapVue)

// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// Vuesax
Vue.use(Vuesax)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

export { axios }