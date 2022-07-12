import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/assets/global.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";

Vue.use(ElementUI, {size: 'mini'});

Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
