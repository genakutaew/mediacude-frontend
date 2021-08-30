import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Multiselect from 'vue-multiselect'
import Toasted from 'vue-toasted';

Vue.config.productionTip = false

Vue.component('Multiselect', Multiselect)
Vue.use(Toasted)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
