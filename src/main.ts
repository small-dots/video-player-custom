/*
 * @Desc: 
 * @Author: 安忠琪
 * @LastEditTime: 2021-07-15 13:54:31
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
