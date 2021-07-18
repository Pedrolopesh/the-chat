import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/public/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  {
    path: '/Public',
    component: () => import('../views/viewsPublic.vue'),

    children:[
      {
        path: '/Home',
        name: 'Home',
        component: Home
      },
    ]
  },
  {
    path: '/Private',
    component: () => import('../views/viewPrivate.vue'),

    children:[
      {
        path: '/ChatList',
        name: 'ChatList',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/private/ChatList/ChatList.vue')
        }
      },
      {
        path: '/Introduction',
        name: 'Introduction',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/private/Introduction.vue')
        }
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
