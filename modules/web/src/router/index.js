import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Store from '../store'

Vue.use(VueRouter)

const routes = [
  // Un Authed Routes
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      noAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      noAuth: true
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signup" */ '../views/SignUp.vue'),
    meta: {
      noAuth: true
    }
  },
  {
    path: '/notauthorized',
    name: 'NotAuthorized',
    component: () => import(/* webpackChunkName: "notAuthorized" */ '../views/NotAuthorized.vue'),
    meta: {
      noAuth: true
    }
  },
  // Authed Routes
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  },
  // {
  //   path: '/kitchen',
  //   name: 'Kitchen',
  //   component: () => import(/* webpackChunkName: "kitchen" */ '../views/Kitchen.vue'),
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: '/kitchen/:id?',
    name: 'KitchenDetails',
    component: () => import(/* webpackChunkName: "kitchenDetails" */ '../views/KitchenDetails.vue'),
    meta: {
      requiresAuth: true,
      hasParent: true
    }
  },
  {
    path: '/carton/:id?',
    name: 'CartonDetails',
    component: () => import(/* webpackChunkName: "cartonDetails" */ '../views/CartonDetails.vue'),
    meta: {
      requiresAuth: true,
      hasParent: true
    }
  },
  {
    path: '/category/:id?',
    name: 'CategoryDetails',
    component: () => import(/* webpackChunkName: "categoryDetails" */ '../views/CategoryDetails.vue'),
    meta: {
      requiresAuth: true,
      hasParent: true
    }
  },
  {
    path: '/membership/:id?',
    name: 'MembershipDetails',
    component: () => import(/* webpackChunkName: "membershipDetails" */ '../views/MembershipDetails.vue'),
    meta: {
      requiresAuth: true,
      hasParent: true
    }
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  //     meta: {
  //       requiresAuth: true
  //     }
  // }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('activeSession') && !Store.state.activeSession) {
    recoverSession()
  }
  if (to.matched.some(record => record.meta.requiresAuth) && Store.state.activeSession) {
    if (to.matched.some(record => record.meta.hasParent)) {
      next()
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.noAuth)) {
    next()
  } else {
    next({
      path: '/notauthorized'
    })
  }
  // next()
})

export default router

function recoverSession () {
  Store.commit('setActiveSession', true)
  Store.commit('setToken', localStorage.getItem('token'))
  Store.commit('setName', {
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName')
  })
  Store.commit('setUsername', localStorage.getItem('username'))
  Store.commit('setUserId', localStorage.getItem('userId'))
  Store.commit('setEmail', localStorage.getItem('email'))
  try {
    Store.commit('setKitchenIds', JSON.parse(localStorage.getItem('kitchenIds')))
  } catch (err) {
    console.dir(err)
  }
}
