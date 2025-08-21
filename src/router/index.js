import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import Auth from '../views/AuthView.vue'
import Todos from '../views/TodosView.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/auth', name: 'Auth', component: Auth },
  { path: '/todos', name: 'Todos', component: Todos, meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
