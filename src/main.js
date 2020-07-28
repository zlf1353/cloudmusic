import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import PubSub from 'pubsub-js'
import './assets/index.css'
//引入阿里矢量图库
import './assets/font/iconfont.css'

import mymethod from './network/request';
Vue.prototype.$mymethod = mymethod;

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.prototype.$pubSub = PubSub

import axios from 'axios'
axios.defaults.baseURL = 'http://musicapi.leanapp.cn/'
// 每个组件都可以使用$http
Vue.prototype.$http = axios

// 注册全局过滤器 名字 函数（需要处理的数据）
Vue.filter('dateFormat', function (originval) {
  const dt = new Date(originval)
  // padStart不足两位补0
  const y = dt.getFullYear()
  const m = (dt.getMonth() + '' + 1).padStart(2, '0')
  const d = (dt.getDay() + '').padStart(2, '0')
  const h = (dt.getHours() + '').padStart(2, '0')
  const min = (dt.getMinutes() + '').padStart(2, '0')
  const sec = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${min}:${sec}`
})
// 分秒过滤器
Vue.filter('playTimeFormat', function (originval) {
  let duration = originval
  let min = parseInt(duration / 1000 / 60) + ''
  //padStart 不足两位补0
  min = min.padStart(2, '0')
  let sec = parseInt(duration / 1000 % 60) + ''
  sec = sec.padStart(2, '0')
  return `${min}:${sec}`
})
// 播放量过滤器
Vue.filter('playcountFormat', function (originval) {
  let count = originval
  if (count > 10000) {
    count = Math.floor(count / 10000)
    return `${count}万`
  } else {
    return `${count}`
  }
})
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
