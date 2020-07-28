import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import discovery from '../views/discovery.vue'
import test from '../views/test.vue'
Vue.use(VueRouter)
import leftmenu from '../components/leftmenu'
import playlists from '../views/playlists'
import songs from '../views/songs'
import mvs from '../views/mvs'
import result from '../views/result'
import mv from '../views/mv'
import playlist from '../views/playlist'
import login from '../views/login'
import personalinfo from '../views/personalinfo'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/discovery',
          name: 'discovery',
          component: discovery
        },
        {
          path: '/playlists',
          name: 'playlists',
          component: playlists
        },
        {
          path: '/songs',
          name: 'songs',
          component: songs
        },
        {
          path: '/mvs',
          name: 'mvs',
          component: mvs
        },
        {
          path: '/result',
          name: 'result',
          component: result
        }, {
          path: '/mv',
          name: 'mv',
          component: mv
        }, {
          path: '/playlist',
          name: 'playlist',
          component: playlist
        }, {
          path: '/login',
          name: 'login',
          component: login
        }, {
          path: '/personalinfo',
          name: 'personalinfo',
          component: personalinfo
        }
      ]
    }, {
      path: '/test',
      name: 'test',
      component: test
    }, {
      path: '/leftmenu',
      name: 'leftmenu',
      component: leftmenu
    }
  ]
})

export default router
