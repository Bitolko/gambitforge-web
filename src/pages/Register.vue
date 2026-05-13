<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const name = ref('GambitForge Tester')
const email = ref('tester3@example.com')
const password = ref('password123')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true

  try {
    await auth.register({
      name: name.value,
      email: email.value,
      password: password.value,
    })

    router.push({ name: 'dashboard' })
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="auth-page">
    <section class="auth-shell" aria-labelledby="register-title">
      <div class="auth-panel">
        <RouterLink class="auth-brand" to="/">
          <span class="auth-brand-logo">
            <img src="/gambitforge-logo-web.png" alt="GambitForge logo" width="40" height="40" />
          </span>
          <span>GambitForge</span>
        </RouterLink>

        <div>
          <p class="eyebrow">Join the platform</p>
          <h1 id="register-title">Create your GambitForge account</h1>
          <p class="lede">Join the platform for chess events, live games, clubs, coaches, and tournaments.</p>
        </div>

        <form class="auth-form" @submit.prevent="submit">
          <label>
            <span>Name</span>
            <input v-model="name" autocomplete="name" required />
          </label>

          <label>
            <span>Email</span>
            <input v-model="email" type="email" autocomplete="email" required />
          </label>

          <label>
            <span>Password</span>
            <input v-model="password" type="password" autocomplete="new-password" required minlength="8" />
          </label>

          <p v-if="error" class="form-error">{{ error }}</p>

          <button class="auth-submit-button" type="submit" :disabled="loading">
            {{ loading ? 'Creating account...' : 'Create account' }}
          </button>
        </form>

        <p class="auth-switch">
          Already registered?
          <RouterLink to="/login">Login</RouterLink>
        </p>
      </div>

      <aside class="auth-visual-panel" aria-label="GambitForge platform preview">
        <p class="eyebrow">Australian chess network</p>
        <h2>Build your profile across play, events, and coaching</h2>
        <div class="auth-visual-grid">
          <article>
            <span>Live Games</span>
            <strong>Legal moves</strong>
          </article>
          <article>
            <span>Tournaments</span>
            <strong>Pairings</strong>
          </article>
          <article>
            <span>Events</span>
            <strong>Listings</strong>
          </article>
          <article>
            <span>Coaching</span>
            <strong>Pathways</strong>
          </article>
        </div>
      </aside>
    </section>
  </main>
</template>
