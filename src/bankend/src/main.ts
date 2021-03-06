import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import 'iview/dist/styles/iview.css';
const view = require('iview');

Vue.config.productionTip = false;

Vue.use(view);


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
