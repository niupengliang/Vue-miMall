import Vue from 'vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import store from './store'
import App from './App.vue'
import ElementUI from 'element-ui'
import VueLazyLoad from 'vue-lazyload'
import 'element-ui/lib/theme-chalk/index.css';
// import env from './env'

//mock开关
const mock = false;
if (mock) {
  require('./mock/api')
}
axios.defaults.baseURL='/api';
axios.defaults.timeout=8000;
//根据不同环境变量获取不同的请求地址
// axios.defaults.baseURL =env.baseURL;
//响应拦截器
axios.interceptors.response.use(function(response) {
      let res = response.data;
      let path = location.hash;
      if (res.status == 0) {
        return res.data
      }else if(res.status == 10){
        if(path != '#/index'){
          
          window.location.href='/#/login';
        }
      }else{
        alert(res.msg)
        return Promise.reject(res);
      }
      
      
})
Vue.use(VueAxios,axios)
Vue.use(ElementUI);
Vue.use(VueCookie);
Vue.use(VueLazyLoad,{
  loading:'/imgs/loading-svg/loading-bars.svg',

})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
