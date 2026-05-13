<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import api from '../services/api'
import echo from '../services/echo'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const auth = useAuthStore()

const tournament = ref(null)
const loading = ref(false)
const joining = ref(false)
const starting = ref(false)
const generatingRound = ref(false)
const finishing = ref(false)
const savingResultId = ref(null)
const error = ref('')
const copiedInvite = ref(false)
const subscribedTournamentId = ref(null)
const realtimeAction = ref('')

const isOwner = computed(() => tournament.value?.owner_user_id === auth.user?.id)
const isPlayer = computed(() => (
  tournament.value?.players?.some((player) => player.user_id === auth.user?.id)
))
const canJoin = computed(() => tournament.value?.status === 'registration' && !isPlayer.value)
const canStart = computed(() => (
  tournament.value?.status === 'registration'
  && isOwner.value
  && (tournament.value?.players?.length || 0) >= 2
))
const currentRound = computed(() => (
  tournament.value?.rounds?.[tournament.value.rounds.length - 1] || null
))
const hasUnfinishedCurrentRound = computed(() => (
  currentRound.value?.pairings?.some((pairing) => !pairing.result) || false
))
const canGenerateNextRound = computed(() => (
  tournament.value?.status === 'active'
  && isOwner.value
  && tournament.value?.rounds?.length
  && !hasUnfinishedCurrentRound.value
))
const canFinish = computed(() => (
  tournament.value?.status === 'active'
  && isOwner.value
  && tournament.value?.rounds?.length
  && !hasUnfinishedCurrentRound.value
))
const statusLabel = computed(() => {
  const labels = {
    registration: 'Open',
    active: 'Active',
    finished: 'Finished',
  }

  return labels[tournament.value?.status] || tournament.value?.status || ''
})
const statusBadgeClass = computed(() => (
  `badge-${tournament.value?.status === 'registration' ? 'waiting' : tournament.value?.status || 'waiting'}`
))
const standings = computed(() => (
  [...(tournament.value?.players || [])].sort((a, b) => {
    if (Number(b.score) !== Number(a.score)) {
      return Number(b.score) - Number(a.score)
    }

    return a.user.name.localeCompare(b.user.name)
  })
))
const maxStandingScore = computed(() => (
  Math.max(1, ...standings.value.map((player) => Number(player.score) || 0))
))
const inviteLink = computed(() => (
  tournament.value ? `${window.location.origin}/tournaments/${tournament.value.id}` : ''
))
const canSubscribeToTournament = computed(() => isOwner.value || isPlayer.value)

async function loadTournament() {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get(`/tournaments/${route.params.id}`)
    tournament.value = response.data
    subscribeToTournament()
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not load tournament'
  } finally {
    loading.value = false
  }
}

function syncTournamentFromRealtime(updatedTournament, action) {
  if (!tournament.value || updatedTournament.id !== tournament.value.id) {
    return
  }

  tournament.value = updatedTournament
  realtimeAction.value = action
}

function subscribeToTournament() {
  if (
    !tournament.value
    || !canSubscribeToTournament.value
    || subscribedTournamentId.value === tournament.value.id
  ) {
    return
  }

  try {
    echo.connector.pusher.config.auth.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`
    subscribedTournamentId.value = tournament.value.id

    echo.private(`tournament.${tournament.value.id}`)
      .listen('.TournamentUpdated', (event) => {
        syncTournamentFromRealtime(event.tournament, event.action)
      })
  } catch {
    subscribedTournamentId.value = null
  }
}

function leaveTournamentChannel() {
  if (!subscribedTournamentId.value) {
    return
  }

  echo.leave(`tournament.${subscribedTournamentId.value}`)
  subscribedTournamentId.value = null
}

async function joinTournament() {
  joining.value = true
  error.value = ''

  try {
    const response = await api.post(`/tournaments/${tournament.value.id}/join`)
    tournament.value = response.data
    subscribeToTournament()
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not join tournament'
  } finally {
    joining.value = false
  }
}

async function startTournament() {
  starting.value = true
  error.value = ''

  try {
    const response = await api.post(`/tournaments/${tournament.value.id}/start`)
    tournament.value = response.data
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not start tournament'
  } finally {
    starting.value = false
  }
}

async function generateNextRound() {
  generatingRound.value = true
  error.value = ''

  try {
    const response = await api.post(`/tournaments/${tournament.value.id}/rounds/next`)
    tournament.value = response.data
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not generate next round'
  } finally {
    generatingRound.value = false
  }
}

async function finishTournament() {
  finishing.value = true
  error.value = ''

  try {
    const response = await api.post(`/tournaments/${tournament.value.id}/finish`)
    tournament.value = response.data
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not finish tournament'
  } finally {
    finishing.value = false
  }
}

async function setPairingResult(pairing, result) {
  savingResultId.value = pairing.id
  error.value = ''

  try {
    const response = await api.post(`/tournament-pairings/${pairing.id}/result`, { result })
    tournament.value = response.data
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not save result'
  } finally {
    savingResultId.value = null
  }
}

async function copyInviteLink() {
  copiedInvite.value = false

  try {
    await navigator.clipboard.writeText(inviteLink.value)
    copiedInvite.value = true
  } catch {
    window.prompt('Copy tournament invite link', inviteLink.value)
  }
}

function resultLabel(result) {
  const labels = {
    white_win: '1-0',
    black_win: '0-1',
    draw: '1/2-1/2',
    bye: 'Bye',
  }

  return labels[result] || 'Pending'
}

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser()
  }

  await loadTournament()
})

onBeforeUnmount(() => {
  leaveTournamentChannel()
})
</script>

<template>
  <main class="dashboard-page tournament-room-page">
    <header class="app-header">
      <div>
        <p class="eyebrow">Tournament room</p>
        <h1>{{ tournament?.name || 'Tournament' }}</h1>
        <p v-if="tournament" class="app-header-description">
          Pairings, standings, live updates, and organiser controls in one operational view.
        </p>
      </div>

      <RouterLink class="button-link secondary-link" to="/tournaments">Tournaments</RouterLink>
    </header>

    <div v-if="loading" class="state-panel">
      <p class="panel-label">Loading</p>
      <h2>Preparing tournament room</h2>
      <p>Fetching standings, pairings, and organizer controls.</p>
    </div>

    <div v-if="error" class="state-panel error-state">
      <p class="panel-label">Needs attention</p>
      <h2>{{ error }}</h2>
      <button class="secondary-button" type="button" @click="loadTournament">Try again</button>
    </div>

    <template v-if="tournament && !loading">
      <section class="dashboard-grid">
        <article class="profile-panel tournament-status-card">
          <div class="preview-card-heading">
            <p class="panel-label">Status</p>
            <span class="status-badge" :class="statusBadgeClass">{{ statusLabel }}</span>
          </div>
          <h2>{{ statusLabel }}</h2>
          <p>{{ tournament.players.length }} players / {{ tournament.time_control }}</p>
          <p v-if="realtimeAction" class="page-note compact-note">
            Live update: {{ realtimeAction.replace('_', ' ') }}
          </p>

          <button v-if="canJoin" class="gold-button" type="button" :disabled="joining" @click="joinTournament">
            {{ joining ? 'Joining...' : 'Join tournament' }}
          </button>

          <div class="invite-box">
            <span>{{ inviteLink }}</span>
            <button class="secondary-button" type="button" @click="copyInviteLink">
              {{ copiedInvite ? 'Copied' : 'Copy invite' }}
            </button>
          </div>
        </article>

        <article v-if="isOwner" class="organizer-panel tournament-director-panel">
          <p class="panel-label">Organizer Controls</p>
          <h2>Director tools</h2>
          <button v-if="canStart" type="button" :disabled="starting" @click="startTournament">
            {{ starting ? 'Starting...' : 'Start round 1' }}
          </button>

          <button
            v-if="tournament.status === 'active'"
            type="button"
            :disabled="!canGenerateNextRound || generatingRound"
            @click="generateNextRound"
          >
            {{ generatingRound ? 'Generating...' : 'Generate Next Round' }}
          </button>

          <button
            v-if="tournament.status === 'active'"
            class="danger-button"
            type="button"
            :disabled="!canFinish || finishing"
            @click="finishTournament"
          >
            {{ finishing ? 'Finishing...' : 'Finish Tournament' }}
          </button>

          <p v-if="tournament.status === 'registration' && !canStart" class="page-note">
            At least two players are required to start.
          </p>

          <p v-if="tournament.status === 'active' && hasUnfinishedCurrentRound" class="page-note">
            Finish all current round pairings before generating the next round.
          </p>

          <p v-if="tournament.status === 'finished'" class="page-note">
            Tournament is locked as finished.
          </p>
        </article>

        <article class="profile-panel standings-panel">
          <p class="panel-label">Standings</p>
          <p v-if="!standings.length" class="page-note compact-note">
            Players appear here after they join the invite link.
          </p>
          <div v-else class="standings-list">
            <p v-for="(player, index) in standings" :key="player.id" class="standing-row">
              <strong>{{ index + 1 }}. {{ player.user.name }}</strong>
              <span>{{ Number(player.score).toFixed(1) }} pts</span>
              <i :style="{ width: `${Math.max(8, (Number(player.score) / maxStandingScore) * 100)}%` }" aria-hidden="true"></i>
            </p>
          </div>
        </article>
      </section>

      <section class="my-games-section">
        <div class="section-header">
          <div>
            <p class="eyebrow">Pairings</p>
            <h2>Rounds</h2>
          </div>
        </div>

        <div v-if="!tournament.rounds.length" class="state-panel compact-state">
          <p class="panel-label">Waiting</p>
          <h2>No rounds yet</h2>
          <p>Pairings appear after the organizer starts the tournament.</p>
        </div>

        <div v-else class="games-list">
          <template v-for="round in tournament.rounds" :key="round.id">
            <div class="round-heading">
              <h3>Round {{ round.round_number }}</h3>
              <span>{{ round.status }}</span>
            </div>

            <article v-for="pairing in round.pairings" :key="pairing.id" class="pairing-row">
              <div class="pairing-main">
                <span class="tournament-mark" aria-hidden="true">
                  <img src="/gambitforge-logo-web.png" alt="" />
                </span>
                <div class="pairing-copy">
                  <p class="panel-label">
                    {{ pairing.is_bye ? 'Bye' : `Round ${round.round_number}` }}
                  </p>
                  <h3 v-if="pairing.is_bye">{{ pairing.white_user?.name }} gets a bye</h3>
                  <h3 v-else>
                    {{ pairing.white_user?.name }} vs {{ pairing.black_user?.name }}
                  </h3>
                  <p>Result: {{ resultLabel(pairing.result) }}</p>
                </div>
              </div>

              <div class="game-card-actions">
                <RouterLink
                  v-if="pairing.game_id"
                  class="button-link"
                  :to="{ name: 'game', params: { id: pairing.game_id } }"
                >
                  Open game
                </RouterLink>

                <template v-if="isOwner && tournament.status !== 'finished'">
                  <button
                    v-if="pairing.is_bye"
                    class="secondary-button"
                    type="button"
                    :disabled="savingResultId === pairing.id || pairing.result === 'bye'"
                    @click="setPairingResult(pairing, 'bye')"
                  >
                    Mark bye
                  </button>

                  <template v-else>
                    <button
                      class="secondary-button"
                      type="button"
                      :disabled="savingResultId === pairing.id"
                      @click="setPairingResult(pairing, 'white_win')"
                    >
                      White win
                    </button>
                    <button
                      class="secondary-button"
                      type="button"
                      :disabled="savingResultId === pairing.id"
                      @click="setPairingResult(pairing, 'draw')"
                    >
                      Draw
                    </button>
                    <button
                      class="secondary-button"
                      type="button"
                      :disabled="savingResultId === pairing.id"
                      @click="setPairingResult(pairing, 'black_win')"
                    >
                      Black win
                    </button>
                  </template>
                </template>
              </div>
            </article>
          </template>
        </div>
      </section>
    </template>
  </main>
</template>
