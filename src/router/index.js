import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import discovery from '../views/discovery.vue'
import test from '../views/test.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/discovery',
        name: 'discovery',
        component: discovery
      }
    ]
  }, {
    path: '/test',
    name: 'test',
    component: test
  }

]

const router = new VueRouter({
  routes
})

export default router
