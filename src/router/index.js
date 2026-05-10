import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Dashboard from '../pages/Dashboard.vue'
import Game from '../pages/Game.vue'
import Home from '../pages/Home.vue'
import Coaching from '../pages/Coaching.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Tournament from '../pages/Tournament.vue'
import Tournaments from '../pages/Tournaments.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/coaching',
      name: 'coaching',
      component: Coaching,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { guest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { guest: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/games/:id',
      name: 'game',
      component: Game,
      meta: { requiresAuth: true },
    },
    {
      path: '/tournaments',
      name: 'tournaments',
      component: Tournaments,
      meta: { requiresAuth: true },
    },
    {
      path: '/tournaments/:id',
      name: 'tournament',
      component: Tournament,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.token) {
    return { name: 'login' }
  }

  if (to.meta.guest && auth.token) {
    return { name: 'dashboard' }
  }
})

export default router
