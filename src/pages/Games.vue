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
  games.value.filter((game) => ['waiting', 'active'].includes(game.status))
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
        <p class="eyebrow">Chess</p>
        <h1>Games</h1>
        <p class="app-header-description">Create, join, and continue your live chess games.</p>
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
    </div>

    <template v-else>
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
          <article v-for="game in activeGames" :key="game.id" class="game-card enhanced-game-card">
            <div>
              <p class="panel-label">{{ game.status }}</p>
              <h3>{{ game.title || 'Chess game' }}</h3>
              <p>White: {{ playerName(game.white_user) }}</p>
              <p>Black: {{ blackPlayerLabel(game) }}</p>
              <p>
                {{ moveCount(game) }} moves
                <span v-if="turnLabel(game)"> / {{ turnLabel(game) }}</span>
              </p>
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
          <article v-for="game in completedGames" :key="game.id" class="game-card enhanced-game-card">
            <div>
              <p class="panel-label">{{ game.status }}</p>
              <h3>{{ game.title || 'Chess game' }}</h3>
              <p>White: {{ playerName(game.white_user) }}</p>
              <p>Black: {{ blackPlayerLabel(game) }}</p>
              <p>
                {{ moveCount(game) }} moves
                <span v-if="turnLabel(game)"> / {{ turnLabel(game) }}</span>
              </p>
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
