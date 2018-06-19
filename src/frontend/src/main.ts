import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueLazyload from "vue-lazyload";

import "./assets/iconfont.js";
Vue.use(VueLazyload, {
  preLoad: 1,
  loading: require("./assets/pic/supermarket.png")
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
