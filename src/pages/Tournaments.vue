<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api from '../services/api'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const tournaments = ref([])
const name = ref('GambitForge Arena')
const loading = ref(false)
const creating = ref(false)
const error = ref('')

const hasTournaments = computed(() => tournaments.value.length > 0)

async function loadTournaments() {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get('/tournaments')
    tournaments.value = response.data
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not load tournaments'
  } finally {
    loading.value = false
  }
}

async function createTournament() {
  creating.value = true
  error.value = ''

  try {
    const response = await api.post('/tournaments', {
      name: name.value,
      time_control: '10+0',
    })

    router.push({ name: 'tournament', params: { id: response.data.id } })
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not create tournament'
  } finally {
    creating.value = false
  }
}

function playerStatus(tournament) {
  return tournament.players?.some((player) => player.user_id === auth.user?.id)
    ? 'Joined'
    : 'Open'
}

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser()
  }

  await loadTournaments()
})
</script>

<template>
  <main class="dashboard-page">
    <header class="app-header">
      <div>
        <p class="eyebrow">GambitForge</p>
        <h1>Tournaments</h1>
      </div>

      <RouterLink class="text-link" to="/dashboard">Dashboard</RouterLink>
    </header>

    <div v-if="error" class="state-panel error-state">
      <p class="panel-label">Needs attention</p>
      <h2>{{ error }}</h2>
      <button class="secondary-button" type="button" @click="loadTournaments">Try again</button>
    </div>

    <section class="dashboard-grid">
      <article class="profile-panel">
        <p class="panel-label">Create</p>
        <h2>New tournament</h2>
        <form class="auth-form" @submit.prevent="createTournament">
          <label>
            Name
            <input v-model="name" required maxlength="255" />
          </label>

          <button type="submit" :disabled="creating">
            {{ creating ? 'Creating...' : 'Create tournament' }}
          </button>
        </form>
      </article>

      <article class="next-module">
        <p class="panel-label">Format</p>
        <h2>Round 1 MVP</h2>
        <p>Players join, the organizer starts round 1, and pairings create live chess games.</p>
      </article>
    </section>

    <section class="my-games-section">
      <div class="section-header">
        <div>
          <p class="eyebrow">Events</p>
          <h2>Open tournaments</h2>
        </div>

        <button class="secondary-button" type="button" :disabled="loading" @click="loadTournaments">
          {{ loading ? 'Loading...' : 'Refresh' }}
        </button>
      </div>

      <div v-if="loading" class="state-panel compact-state">
        <p class="panel-label">Loading</p>
        <h2>Finding tournaments</h2>
        <p>Checking active, open, and finished events.</p>
      </div>

      <div v-else-if="!hasTournaments" class="state-panel compact-state">
        <p class="panel-label">Empty</p>
        <h2>No tournaments yet</h2>
        <p>Create the first event to generate invite links, standings, and pairings.</p>
      </div>

      <div v-else class="games-list">
        <article v-for="tournament in tournaments" :key="tournament.id" class="game-card">
          <div>
            <p class="panel-label">{{ playerStatus(tournament) }} / {{ tournament.status }}</p>
            <h3>{{ tournament.name }}</h3>
            <p>{{ tournament.players_count }} players / {{ tournament.time_control }}</p>
          </div>

          <RouterLink class="button-link" :to="{ name: 'tournament', params: { id: tournament.id } }">
            Open
          </RouterLink>
        </article>
      </div>
    </section>
  </main>
</template>
