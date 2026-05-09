<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const menuOpen = ref(false)
const loggingOut = ref(false)

const logoUrl = 'http://127.0.0.1:8000/ChatGPT%20Image%20May%2010%2C%202026%2C%2002_47_31%20AM%20(1).png'
const isAuthenticated = computed(() => Boolean(auth.token))

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
      <img :src="logoUrl" alt="GambitForge logo" />
      <span>GambitForge</span>
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
        <RouterLink to="/#coaching" @click="closeMenu">Coaching</RouterLink>
        <RouterLink to="/#clubs" @click="closeMenu">Calendar</RouterLink>
        <button class="nav-button secondary-button" type="button" :disabled="loggingOut" @click="logout">
          {{ loggingOut ? 'Logging out...' : 'Logout' }}
        </button>
      </template>

      <template v-else>
        <RouterLink to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/tournaments" @click="closeMenu">Tournaments</RouterLink>
        <RouterLink to="/#coaching" @click="closeMenu">Coaching</RouterLink>
        <RouterLink to="/#blog" @click="closeMenu">Blog</RouterLink>
        <RouterLink to="/login" @click="closeMenu">Login</RouterLink>
        <RouterLink class="nav-cta" to="/register" @click="closeMenu">Get Started</RouterLink>
      </template>
    </nav>
  </header>
</template>
