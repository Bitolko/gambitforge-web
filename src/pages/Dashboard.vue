<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api from '../services/api'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const creatingGame = ref(false)
const error = ref('')
const games = ref([])
const gamesLoading = ref(false)
const copiedGameId = ref(null)

const hasGames = computed(() => games.value.length > 0)
const activeGameCount = computed(() => games.value.filter((game) => game.status === 'active').length)
const waitingGameCount = computed(() => games.value.filter((game) => game.status === 'waiting').length)
const finishedGameCount = computed(() => games.value.filter((game) => game.status === 'finished').length)

async function loadUser() {
  error.value = ''
  loading.value = true

  try {
    await auth.fetchUser()
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not load your profile'
  } finally {
    loading.value = false
  }
}

async function loadGames() {
  gamesLoading.value = true

  try {
    const response = await api.get('/games')
    games.value = response.data
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not load games'
  } finally {
    gamesLoading.value = false
  }
}

async function logout() {
  await auth.logout()
  router.push({ name: 'login' })
}

async function createGame() {
  error.value = ''
  creatingGame.value = true

  try {
    const response = await api.post('/games', {
      title: 'Multiplayer game',
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    })

    await loadGames()
    router.push({ name: 'game', params: { id: response.data.id } })
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not create game'
  } finally {
    creatingGame.value = false
  }
}

function inviteUrl(game) {
  return `${window.location.origin}/games/${game.id}`
}

async function copyInvite(game) {
  const link = inviteUrl(game)

  try {
    await navigator.clipboard.writeText(link)
    copiedGameId.value = game.id
  } catch {
    window.prompt('Copy invite link', link)
  }
}

function playerSeat(game) {
  if (game.white_user_id === auth.user?.id) {
    return 'White'
  }

  if (game.black_user_id === auth.user?.id) {
    return 'Black'
  }

  return 'Viewer'
}

onMounted(async () => {
  if (!auth.user) {
    await loadUser()
  }

  await loadGames()
})
</script>

<template>
  <main class="dashboard-page">
    <header class="app-header">
      <div>
        <p class="eyebrow">GambitForge</p>
        <h1>Dashboard</h1>
      </div>

      <button class="secondary-button" type="button" @click="logout">Log out</button>
    </header>

    <section class="dashboard-grid">
      <article class="profile-panel">
        <p class="panel-label">Signed in as</p>
        <h2>{{ auth.user?.name || 'Loading player...' }}</h2>
        <p>{{ auth.user?.email || 'Checking authentication...' }}</p>
        <p v-if="error" class="form-error">{{ error }}</p>
        <button class="secondary-button" type="button" :disabled="loading" @click="loadUser">
          {{ loading ? 'Updating...' : 'Refresh profile' }}
        </button>
      </article>

      <article class="next-module">
        <p class="panel-label">Next module</p>
        <h2>Tournament MVP</h2>
        <p>Create events, let players join, and start round 1 with automatic game pairings.</p>
        <RouterLink class="button-link" to="/tournaments">Open tournaments</RouterLink>
      </article>
    </section>

    <section class="product-metrics-grid" aria-label="Dashboard metrics">
      <article class="product-metric-card">
        <span>Active boards</span>
        <strong>{{ activeGameCount }}</strong>
        <div class="metric-sparkline" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      </article>
      <article class="product-metric-card">
        <span>Open invites</span>
        <strong>{{ waitingGameCount }}</strong>
        <div class="metric-sparkline warm" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      </article>
      <article class="product-metric-card">
        <span>Completed</span>
        <strong>{{ finishedGameCount }}</strong>
        <div class="metric-sparkline cool" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      </article>
    </section>

    <section id="games" class="my-games-section">
      <div class="section-header">
        <div>
          <p class="eyebrow">Chess</p>
          <h2>My Games</h2>
        </div>

        <button class="secondary-button" type="button" :disabled="gamesLoading" @click="loadGames">
          {{ gamesLoading ? 'Loading...' : 'Refresh' }}
        </button>
      </div>

      <div v-if="gamesLoading" class="state-panel compact-state">
        <p class="panel-label">Loading</p>
        <h2>Fetching games</h2>
        <p>Checking live games, invites, and tournament boards.</p>
      </div>

      <div v-else-if="!hasGames" class="state-panel compact-state">
        <p class="panel-label">Empty</p>
        <h2>No games yet</h2>
        <p>Create a multiplayer game to generate your first invite link.</p>
      </div>

      <div v-else class="games-list">
        <article v-for="game in games" :key="game.id" class="game-card">
          <div>
            <p class="panel-label">{{ playerSeat(game) }} / {{ game.status }}</p>
            <h3>{{ game.title }}</h3>
            <p>
              White: {{ game.white_user?.name || 'Open' }}
              / Black: {{ game.black_user?.name || 'Open' }}
            </p>
            <p>{{ game.moves_count }} moves / {{ game.turn }} to move</p>
          </div>

          <div class="game-card-actions">
            <RouterLink class="button-link" :to="{ name: 'game', params: { id: game.id } }">
              Open
            </RouterLink>
            <button class="secondary-button" type="button" @click="copyInvite(game)">
              {{ copiedGameId === game.id ? 'Copied' : 'Copy invite link' }}
            </button>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
