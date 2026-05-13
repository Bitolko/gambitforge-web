<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('tester@example.com')
const password = ref('password123')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true

  try {
    await auth.login({
      email: email.value,
      password: password.value,
    })

    router.push({ name: 'dashboard' })
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-shell" aria-labelledby="login-title">
      <div class="auth-panel">
        <RouterLink class="auth-brand" to="/">
          <span class="auth-brand-logo">
            <img src="/gambitforge-logo-ui.webp" alt="GambitForge logo" width="40" height="40" />
          </span>
          <span>GambitForge</span>
        </RouterLink>

        <div>
          <p class="eyebrow">Secure platform access</p>
          <h1 id="login-title">Welcome back</h1>
          <p class="lede">Sign in to manage games, tournaments, events, and coaching tools.</p>
        </div>

        <form class="auth-form" @submit.prevent="submit">
          <label>
            <span>Email</span>
            <input v-model="email" type="email" autocomplete="email" required />
          </label>

          <label>
            <span>Password</span>
            <input v-model="password" type="password" autocomplete="current-password" required />
          </label>

          <p v-if="error" class="form-error">{{ error }}</p>

          <button class="auth-submit-button" type="submit" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <p class="auth-switch">
          New to GambitForge?
          <RouterLink to="/register">Create an account</RouterLink>
        </p>
      </div>

      <aside class="auth-visual-panel" aria-label="GambitForge platform preview">
        <p class="eyebrow">Premium chess operations</p>
        <h2>One command room for your chess ecosystem</h2>
        <div class="auth-visual-grid">
          <article>
            <span>Live Games</span>
            <strong>12 boards</strong>
          </article>
          <article>
            <span>Tournaments</span>
            <strong>Swiss rooms</strong>
          </article>
          <article>
            <span>Events</span>
            <strong>NSW rapid</strong>
          </article>
          <article>
            <span>Coaching</span>
            <strong>Junior plans</strong>
          </article>
        </div>
      </aside>
    </section>
  </main>
</template>
