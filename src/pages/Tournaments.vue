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

function statusBadgeClass(status) {
  return `badge-${status === 'registration' ? 'waiting' : status || 'waiting'}`
}

function openTournament(tournament) {
  router.push({ name: 'tournament', params: { id: tournament.id } })
}

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser()
  }

  await loadTournaments()
})
</script>

<template>
  <main class="dashboard-page tournaments-page">
    <header class="app-header">
      <div>
        <p class="eyebrow">Control center</p>
        <h1>Tournaments</h1>
        <p class="app-header-description">Create events, track registration, and open the room where pairings and standings move.</p>
      </div>

      <RouterLink class="button-link secondary-link" to="/dashboard">Dashboard</RouterLink>
    </header>

    <div v-if="error" class="state-panel error-state">
      <p class="panel-label">Needs attention</p>
      <h2>{{ error }}</h2>
      <button class="secondary-button" type="button" @click="loadTournaments">Try again</button>
    </div>

    <section class="dashboard-grid">
      <article class="profile-panel tournament-create-card">
        <p class="panel-label">Create</p>
        <h2>New tournament</h2>
        <p>Set up an organiser workspace with registration, pairings, standings, and live result entry.</p>
        <form class="auth-form" @submit.prevent="createTournament">
          <label>
            Name
            <input v-model="name" required maxlength="255" />
          </label>

          <button class="gold-button" type="submit" :disabled="creating">
            {{ creating ? 'Creating...' : 'Create Tournament' }}
          </button>
        </form>
      </article>

      <article class="next-module tournament-control-preview">
        <p class="panel-label">Organizer flow</p>
        <h2>Round control</h2>
        <div class="control-preview-list">
          <span>Registration open</span>
          <span>Pairings generated</span>
          <span>Results entered</span>
          <span>Standings updated</span>
        </div>
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
        <article
          v-for="tournament in tournaments"
          :key="tournament.id"
          class="tournament-card"
          role="link"
          tabindex="0"
          @click="openTournament(tournament)"
          @keydown.enter.prevent="openTournament(tournament)"
          @keydown.space.prevent="openTournament(tournament)"
        >
          <div class="tournament-row-main">
            <span class="tournament-mark" aria-hidden="true">
              <img src="/gambitforge-logo-ui.webp" alt="" width="48" height="48" loading="lazy" decoding="async" />
            </span>

            <div class="tournament-row-copy">
              <div class="tournament-row-kicker">
                <span>{{ playerStatus(tournament) }}</span>
                <span class="status-badge" :class="statusBadgeClass(tournament.status)">
                  {{ tournament.status }}
                </span>
              </div>
              <h3>{{ tournament.name }}</h3>
              <p>{{ tournament.players_count }} players / {{ tournament.time_control }}</p>
            </div>
          </div>

          <div class="tournament-row-metrics" aria-label="Tournament tools">
            <span>Standings</span>
            <span>Pairings</span>
            <span>Results</span>
          </div>

          <RouterLink
            class="button-link hero-primary"
            :to="{ name: 'tournament', params: { id: tournament.id } }"
            @click.stop
          >
            Open
          </RouterLink>
        </article>
      </div>
    </section>
  </main>
</template>
