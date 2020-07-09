import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import UIkit from 'uikit';
import 'uikit/dist/css/uikit.css'
import Icons from 'uikit/dist/js/uikit-icons';
import './assets/css/style.css'
import Vuelidate from 'vuelidate'
import moment from 'moment'
import 'animate.css'

UIkit.use(Icons);
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')