import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewTodo from '@/components/NewTodo'
import ViewTodo from '@/components/ViewTodo'
import EditTodo from '@/components/EditTodo'
import Login from '@/components/Login'
import firebase from 'firebase'

import Register from '@/components/Register'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    
    {
      path: '/new',
      name: 'new-todo',
      component: NewTodo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/todo_id',
      name: 'edit-todo',
      component: EditTodo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:todo_id',
      name: 'view-todo',
      component: ViewTodo,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

//Nav Gaurd
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;