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
    <section class="auth-panel">
      <p class="eyebrow">GambitForge</p>
      <h1>Create account</h1>
      <p class="lede">Start tracking games, training work, and tournament progress.</p>

      <form class="auth-form" @submit.prevent="submit">
        <label>
          Name
          <input v-model="name" autocomplete="name" required />
        </label>

        <label>
          Email
          <input v-model="email" type="email" autocomplete="email" required />
        </label>

        <label>
          Password
          <input v-model="password" type="password" autocomplete="new-password" required minlength="8" />
        </label>

        <p v-if="error" class="form-error">{{ error }}</p>

        <button type="submit" :disabled="loading">
          {{ loading ? 'Creating...' : 'Create account' }}
        </button>
      </form>

      <p class="auth-switch">
        Already registered?
        <RouterLink to="/login">Log in</RouterLink>
      </p>
    </section>
  </main>
</template>
