import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TasksAll from '../views/tasks/TasksAll.vue'
import TasksCreate from '../views/tasks/TasksCreate.vue'
import TasksEdit from '../views/tasks/TasksEdit.vue'
import Login from '../views/authentication/Login.vue'
import Register from '../views/authentication/Register.vue'

Vue.use(VueRouter)

const isLoggedIn = false;

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tasks',
    name: 'tasks-all',
    component: TasksAll,
    beforeEnter: (toolbar, from, next) => {
      if(isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/tasks/new',
    name: 'tasks-create',
    component: TasksCreate,
    beforeEnter: (toolbar, from, next) => {
      if(isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/tasks/:id',
    name: 'tasks-edit',
    component: TasksEdit,
    beforeEnter: (toolbar, from, next) => {
      if(isLoggedIn) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (toolbar, from, next) => {
      if(!isLoggedIn) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (toolbar, from, next) => {
      if(!isLoggedIn) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
