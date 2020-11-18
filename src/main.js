import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false;
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';

// Vuex Store
import store from './store/store'
Vue.component('v-select', vSelect)
 
// Vue Router
import router from './router.js';
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
