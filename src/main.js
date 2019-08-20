import Vue from 'vue'
Vue.config.productionTip = false

import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import axios from 'axios'
Vue.prototype.$axios = axios

// Intercept HTTP requests
require('./interceptors')

import moment from 'moment'
Vue.prototype.$moment = moment

import VueLodash from 'vue-lodash'
Vue.use(VueLodash)

require('./vue-fontawesome')
require('./keen-ui')

require('./layouts')

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
