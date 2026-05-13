import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { applySeo } from '../utils/seo'
import Admin from '../pages/Admin.vue'
import About from '../pages/About.vue'
import Blog from '../pages/Blog.vue'
import BlogDetail from '../pages/BlogDetail.vue'
import Calendar from '../pages/Calendar.vue'
import ClubDetail from '../pages/ClubDetail.vue'
import Clubs from '../pages/Clubs.vue'
import CoachDetail from '../pages/CoachDetail.vue'
import Coaches from '../pages/Coaches.vue'
import Contact from '../pages/Contact.vue'
import Dashboard from '../pages/Dashboard.vue'
import EventDetail from '../pages/EventDetail.vue'
import Events from '../pages/Events.vue'
import Faq from '../pages/Faq.vue'
import Game from '../pages/Game.vue'
import Games from '../pages/Games.vue'
import Home from '../pages/Home.vue'
import Coaching from '../pages/Coaching.vue'
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFound.vue'
import Profile from '../pages/Profile.vue'
import Register from '../pages/Register.vue'
import SubmitEvent from '../pages/SubmitEvent.vue'
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
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/coaching',
      name: 'coaching',
      component: Coaching,
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
    },
    {
      path: '/events/:slug',
      name: 'event-detail',
      component: EventDetail,
    },
    {
      path: '/submit-event',
      name: 'submit-event',
      component: SubmitEvent,
    },
    {
      path: '/clubs',
      name: 'clubs',
      component: Clubs,
    },
    {
      path: '/clubs/:slug',
      name: 'club-detail',
      component: ClubDetail,
    },
    {
      path: '/coaches',
      name: 'coaches',
      component: Coaches,
    },
    {
      path: '/coaches/:slug',
      name: 'coach-detail',
      component: CoachDetail,
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog,
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: BlogDetail,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq,
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
      path: '/u/:username',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
      path: '/games',
      name: 'games',
      component: Games,
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
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
    },
  ],
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.token) {
    return { name: 'login' }
  }

  if (to.meta.requiresAdmin) {
    try {
      await auth.fetchUser()
    } catch {
      return { name: 'login' }
    }

    if (auth.user?.role !== 'admin') {
      return { name: 'dashboard' }
    }
  }

  if (to.meta.guest && auth.token) {
    return { name: 'dashboard' }
  }
})

router.afterEach((to) => {
  applySeo(to)
})

export default router
