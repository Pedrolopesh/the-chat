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
          return import(/* webpackChunkName: "about" */ '../views/private/ChatList.vue')
        }
      },
      {
        path: '/ChatList1',
        name: 'ChatList1',
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
      {
        path: '/Profile',
        name: 'Profile',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/private/Profile.vue')
        }
      },
      {
        path: '/SearchUser',
        name: 'SearchUser',
        component: function () {
          return import(/* webpackChunkName: "about" */ '../views/private/SearchUser.vue')
        }
      },
    ]
  }



  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // }
]

const router = new VueRouter({
  routes
})

export default router
