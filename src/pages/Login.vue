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
    <section class="auth-panel">
      <p class="eyebrow">GambitForge</p>
      <h1>Log in</h1>
      <p class="lede">Enter the arena and continue building your chess record.</p>

      <form class="auth-form" @submit.prevent="submit">
        <label>
          Email
          <input v-model="email" type="email" autocomplete="email" required />
        </label>

        <label>
          Password
          <input v-model="password" type="password" autocomplete="current-password" required />
        </label>

        <p v-if="error" class="form-error">{{ error }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Log in' }}
        </button>
      </form>

      <p class="auth-switch">
        New to GambitForge?
        <RouterLink to="/register">Create an account</RouterLink>
      </p>
    </section>
  </main>
</template>
