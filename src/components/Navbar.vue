<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const menuOpen = ref(false)
const loggingOut = ref(false)
const theme = ref(document.documentElement.dataset.theme || 'dark')

const logoUrl = '/gambitforge-logo.png'
const isAuthenticated = computed(() => Boolean(auth.token))
const isLightTheme = computed(() => theme.value === 'light')

function setTheme(nextTheme) {
  theme.value = nextTheme
  document.documentElement.dataset.theme = nextTheme
  localStorage.setItem('gambitforge-theme', nextTheme)
}

function toggleTheme() {
  setTheme(isLightTheme.value ? 'dark' : 'light')
}

async function logout() {
  loggingOut.value = true

  try {
    await auth.logout()
    router.push({ name: 'login' })
  } finally {
    loggingOut.value = false
    menuOpen.value = false
  }
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="site-navbar">
    <RouterLink class="brand-link" to="/" @click="closeMenu">
      <span class="brand-logo">
        <img :src="logoUrl" alt="GambitForge logo" />
      </span>
      <span class="brand-name">GambitForge</span>
    </RouterLink>

    <button
      class="nav-toggle"
      type="button"
      :aria-expanded="menuOpen"
      aria-label="Toggle navigation"
      @click="menuOpen = !menuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="nav-links" :class="{ open: menuOpen }" aria-label="Primary navigation">
      <template v-if="isAuthenticated">
        <RouterLink to="/dashboard" @click="closeMenu">Dashboard</RouterLink>
        <RouterLink to="/dashboard#games" @click="closeMenu">Games</RouterLink>
        <RouterLink to="/tournaments" @click="closeMenu">Tournaments</RouterLink>
        <RouterLink to="/coaching" @click="closeMenu">Coaching</RouterLink>
        <RouterLink to="/calendar" @click="closeMenu">Calendar</RouterLink>
        <RouterLink to="/blog" @click="closeMenu">Blog</RouterLink>
        <button class="nav-button secondary-button" type="button" :disabled="loggingOut" @click="logout">
          {{ loggingOut ? 'Logging out...' : 'Logout' }}
        </button>
      </template>

      <template v-else>
        <RouterLink to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/tournaments" @click="closeMenu">Tournaments</RouterLink>
        <RouterLink to="/coaching" @click="closeMenu">Coaching</RouterLink>
        <RouterLink to="/calendar" @click="closeMenu">Calendar</RouterLink>
        <RouterLink to="/blog" @click="closeMenu">Blog</RouterLink>
        <RouterLink to="/login" @click="closeMenu">Login</RouterLink>
        <RouterLink class="nav-cta" to="/register" @click="closeMenu">Get Started</RouterLink>
      </template>

      <button
        class="theme-toggle"
        type="button"
        :aria-label="isLightTheme ? 'Switch to dark mode' : 'Switch to light mode'"
        :title="isLightTheme ? 'Dark mode' : 'Light mode'"
        @click="toggleTheme"
      >
        <span aria-hidden="true">{{ isLightTheme ? '☾' : '☀' }}</span>
      </button>
    </nav>
  </header>
</template>
