import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import BootstrapVue from 'bootstrap-vue'
import moment from 'moment'

Vue.use(BootstrapVue);
Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.filter('date', (value) => {
  // if there is no value, return empty string
  if (!value) {
    return '';
  }
  // format the date value with moment
  return moment(value).format('MMM DD, YYYY');
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
