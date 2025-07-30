import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'leaflet/dist/leaflet.css';
import 'prismjs/themes/prism-okaidia.css'; // or prism-dark.css
import Prism from 'prismjs';

Vue.directive('prism', {
  inserted(el) {
    Prism.highlightAllUnder(el);
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
