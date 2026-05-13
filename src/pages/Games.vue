<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api from '../services/api'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const games = ref([])
const loading = ref(false)
const creating = ref(false)
const error = ref('')
const copiedGameId = ref(null)

const activeGames = computed(() => (
  games.value.filter((game) => game.status === 'active')
))
const waitingGames = computed(() => (
  games.value.filter((game) => game.status === 'waiting')
))
const completedGames = computed(() => (
  games.value.filter((game) => game.status === 'finished')
))

async function loadGames() {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get('/games')
    games.value = Array.isArray(response.data) ? response.data : response.data.data || []
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not load games'
  } finally {
    loading.value = false
  }
}

async function createGame() {
  creating.value = true
  error.value = ''

  try {
    const response = await api.post('/games', {
      title: 'Multiplayer game',
      fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    })

    router.push({ name: 'game', params: { id: response.data.id } })
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not create game'
  } finally {
    creating.value = false
  }
}

function playerName(player) {
  return player?.name || 'Open'
}

function blackPlayerLabel(game) {
  return game.black_user?.name || 'Waiting for opponent'
}

function moveCount(game) {
  return Number(game.moves_count ?? game.moves?.length ?? 0)
}

function turnLabel(game) {
  if (!game.turn) {
    return ''
  }

  return `${game.turn.charAt(0).toUpperCase()}${game.turn.slice(1)} to move`
}

function statusBadgeClass(status) {
  return `badge-${status || 'waiting'}`
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

onMounted(async () => {
  try {
    if (!auth.user) {
      await auth.fetchUser()
    }
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not load your profile'
  }

  await loadGames()
})
</script>

<template>
  <main class="dashboard-page games-page">
    <header class="app-header">
      <div>
        <p class="eyebrow">Live games hub</p>
        <h1>Games</h1>
        <p class="app-header-description">Create invites, monitor active boards, and return to completed game records.</p>
      </div>

      <button type="button" :disabled="creating" @click="createGame">
        {{ creating ? 'Creating...' : 'Create Game' }}
      </button>
    </header>

    <div v-if="error" class="state-panel error-state">
      <p class="panel-label">Needs attention</p>
      <h2>{{ error }}</h2>
      <button class="secondary-button" type="button" @click="loadGames">Try again</button>
    </div>

    <div v-if="loading" class="state-panel">
      <p class="panel-label">Loading</p>
      <h2>Fetching games</h2>
      <p>Checking active boards, open invites, and completed results.</p>
      <div class="skeleton-stack" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <template v-else>
      <section class="product-metrics-grid" aria-label="Games overview">
        <article class="product-metric-card">
          <span>Active</span>
          <strong>{{ activeGames.length }}</strong>
          <div class="metric-sparkline" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        </article>
        <article class="product-metric-card">
          <span>Waiting</span>
          <strong>{{ waitingGames.length }}</strong>
          <div class="metric-sparkline warm" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        </article>
        <article class="product-metric-card">
          <span>Archive</span>
          <strong>{{ completedGames.length }}</strong>
          <div class="metric-sparkline cool" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
        </article>
      </section>

      <section class="games-section" aria-labelledby="active-games-heading">
        <div class="section-header">
          <div>
            <p class="eyebrow">Live boards</p>
          <h2 id="active-games-heading">Active Games</h2>
        </div>

          <button class="secondary-button" type="button" :disabled="loading" @click="loadGames">
            Refresh
          </button>
        </div>

        <div v-if="!activeGames.length" class="state-panel compact-state">
          <p class="panel-label">Empty</p>
          <h2>No active games</h2>
          <p>Create a game to start a new invite or continue from the dashboard.</p>
        </div>

        <div v-else class="games-list">
          <article v-for="game in activeGames" :key="game.id" class="live-game-row">
            <div class="live-game-main">
              <span class="live-game-mark" aria-hidden="true">
                <img src="/gambitforge-logo-ui.webp" alt="" width="48" height="48" loading="lazy" decoding="async" />
              </span>
              <div class="live-game-copy">
                <div class="live-game-kicker">
                  <span class="status-badge" :class="statusBadgeClass(game.status)">{{ game.status }}</span>
                  <span>{{ moveCount(game) }} moves</span>
                </div>
              <h3>{{ game.title || 'Chess game' }}</h3>
                <p>{{ playerName(game.white_user) }} vs {{ blackPlayerLabel(game) }}</p>
                <p v-if="turnLabel(game)">{{ turnLabel(game) }}</p>
              </div>
            </div>

            <div class="game-card-actions">
              <RouterLink class="button-link" :to="{ name: 'game', params: { id: game.id } }">
                Open Game
              </RouterLink>
              <button
                v-if="game.status === 'waiting'"
                class="secondary-button"
                type="button"
                @click="copyInvite(game)"
              >
                {{ copiedGameId === game.id ? 'Copied' : 'Copy Invite' }}
              </button>
            </div>
          </article>
        </div>
      </section>

      <section class="games-section" aria-labelledby="waiting-games-heading">
        <div class="section-header">
          <div>
            <p class="eyebrow">Invite queue</p>
            <h2 id="waiting-games-heading">Waiting Games</h2>
          </div>
        </div>

        <div v-if="!waitingGames.length" class="state-panel compact-state">
          <p class="panel-label">Clear</p>
          <h2>No open invites</h2>
          <p>Waiting games with shareable links appear here.</p>
        </div>

        <div v-else class="games-list">
          <article v-for="game in waitingGames" :key="game.id" class="live-game-row waiting-card">
            <div class="live-game-main">
              <span class="live-game-mark" aria-hidden="true">
                <img src="/gambitforge-logo-ui.webp" alt="" width="48" height="48" loading="lazy" decoding="async" />
              </span>
              <div class="live-game-copy">
                <div class="live-game-kicker">
                  <span class="status-badge" :class="statusBadgeClass(game.status)">{{ game.status }}</span>
                  <span>Invite ready</span>
                </div>
              <h3>{{ game.title || 'Chess game' }}</h3>
                <p>{{ playerName(game.white_user) }} vs {{ blackPlayerLabel(game) }}</p>
                <p>{{ moveCount(game) }} moves</p>
              </div>
            </div>

            <div class="game-card-actions">
              <RouterLink class="button-link" :to="{ name: 'game', params: { id: game.id } }">
                Open Game
              </RouterLink>
              <button class="secondary-button" type="button" @click="copyInvite(game)">
                {{ copiedGameId === game.id ? 'Copied' : 'Copy Invite' }}
              </button>
            </div>
          </article>
        </div>
      </section>

      <section class="games-section" aria-labelledby="completed-games-heading">
        <div class="section-header">
          <div>
            <p class="eyebrow">Archive</p>
            <h2 id="completed-games-heading">Completed Games</h2>
          </div>
        </div>

        <div v-if="!completedGames.length" class="state-panel compact-state">
          <p class="panel-label">Empty</p>
          <h2>No completed games</h2>
          <p>Finished games will appear here after checkmate, resignation, draw, or timeout.</p>
        </div>

        <div v-else class="games-list">
          <article v-for="game in completedGames" :key="game.id" class="live-game-row">
            <div class="live-game-main">
              <span class="live-game-mark" aria-hidden="true">
                <img src="/gambitforge-logo-ui.webp" alt="" width="48" height="48" loading="lazy" decoding="async" />
              </span>
              <div class="live-game-copy">
                <div class="live-game-kicker">
                  <span class="status-badge" :class="statusBadgeClass(game.status)">{{ game.status }}</span>
                  <span>{{ moveCount(game) }} moves</span>
                </div>
              <h3>{{ game.title || 'Chess game' }}</h3>
                <p>{{ playerName(game.white_user) }} vs {{ blackPlayerLabel(game) }}</p>
                <p v-if="turnLabel(game)">{{ turnLabel(game) }}</p>
              </div>
            </div>

            <div class="game-card-actions">
              <RouterLink class="button-link secondary-link" :to="{ name: 'game', params: { id: game.id } }">
                Open Game
              </RouterLink>
            </div>
          </article>
        </div>
      </section>
    </template>
  </main>
</template>
