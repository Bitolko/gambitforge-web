<script setup>
import { Chessground } from 'chessground'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'
import { Chess } from 'chess.js'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import api from '../services/api'
import echo from '../services/echo'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const auth = useAuthStore()
const boardElement = ref(null)
const ground = ref(null)
const chess = ref(new Chess())
const game = ref(null)
const subscribedGameId = ref(null)
const loading = ref(false)
const saving = ref(false)
const resigning = ref(false)
const claimingTimeout = ref(false)
const error = ref('')
const inviteCopied = ref(false)
const showFen = ref(false)
const clockNow = ref(Date.now())
const clockInterval = ref(null)
const squares = [
  'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
  'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
  'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
  'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
  'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
  'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
  'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
  'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
]

const statusText = computed(() => {
  if (game.value?.status === 'waiting') {
    return 'Waiting for black to join'
  }

  if (activeClockExpired.value) {
    return `${game.value.turn} is out of time`
  }

  if (chess.value.isCheckmate()) {
    return 'Checkmate'
  }

  if (chess.value.isDraw()) {
    return 'Draw'
  }

  if (chess.value.inCheck()) {
    return `${game.value?.turn || 'Player'} to move, in check`
  }

  return `${game.value?.turn || 'White'} to move`
})

const playerColor = computed(() => {
  if (!auth.user || !game.value) {
    return null
  }

  if (game.value.white_user_id === auth.user.id) {
    return 'white'
  }

  if (game.value.black_user_id === auth.user.id) {
    return 'black'
  }

  return null
})

const canJoin = computed(() => (
  auth.user
  && game.value?.status === 'waiting'
  && game.value.white_user_id !== auth.user.id
  && !game.value.black_user_id
))

const canMove = computed(() => (
  game.value?.status === 'active'
  && playerColor.value
  && game.value.turn === playerColor.value
  && !activeClockExpired.value
  && !saving.value
))

const isWhitePlayer = computed(() => (
  auth.user && game.value?.white_user_id === auth.user.id
))

const inviteLink = computed(() => (
  game.value ? `${window.location.origin}/games/${game.value.id}` : ''
))

const canResign = computed(() => (
  game.value?.status === 'active'
  && playerColor.value
  && !saving.value
  && !resigning.value
))

const elapsedActiveClockMs = computed(() => {
  if (game.value?.status !== 'active' || !game.value?.last_move_at) {
    return 0
  }

  return Math.max(0, clockNow.value - new Date(game.value.last_move_at).getTime())
})

const displayedWhiteTimeMs = computed(() => {
  if (game.value?.status === 'active' && game.value.turn === 'white') {
    return Math.max(0, Number(game.value.white_time_ms || 0) - elapsedActiveClockMs.value)
  }

  return Number(game.value?.white_time_ms || 0)
})

const displayedBlackTimeMs = computed(() => {
  if (game.value?.status === 'active' && game.value.turn === 'black') {
    return Math.max(0, Number(game.value.black_time_ms || 0) - elapsedActiveClockMs.value)
  }

  return Number(game.value?.black_time_ms || 0)
})

const activeClockExpired = computed(() => (
  game.value?.status === 'active'
  && (
    (game.value.turn === 'white' && displayedWhiteTimeMs.value <= 0)
    || (game.value.turn === 'black' && displayedBlackTimeMs.value <= 0)
  )
))

const canClaimTimeout = computed(() => (
  activeClockExpired.value
  && playerColor.value
  && !saving.value
  && !claimingTimeout.value
))

const resultText = computed(() => {
  const labels = {
    white_wins_checkmate: 'White wins by checkmate',
    black_wins_checkmate: 'Black wins by checkmate',
    white_wins_resignation: 'White wins by resignation',
    black_wins_resignation: 'Black wins by resignation',
    white_wins_timeout: 'White wins on time',
    black_wins_timeout: 'Black wins on time',
    draw_stalemate: 'Draw by stalemate',
    draw_insufficient_material: 'Draw by insufficient material',
    draw_threefold_repetition: 'Draw by repetition',
    draw_fifty_move_rule: 'Draw by fifty-move rule',
    draw: 'Draw',
  }

  return labels[game.value?.result] || game.value?.result || ''
})

function legalDests() {
  const dests = new Map()

  squares.forEach((square) => {
    const moves = chess.value.moves({ square, verbose: true })

    if (moves.length) {
      dests.set(square, moves.map((move) => move.to))
    }
  })

  return dests
}

function boardConfig() {
  return {
    fen: chess.value.fen(),
    turnColor: chess.value.turn() === 'w' ? 'white' : 'black',
    check: chess.value.inCheck(),
    lastMove: game.value?.moves?.length
      ? [
          game.value.moves[game.value.moves.length - 1].from,
          game.value.moves[game.value.moves.length - 1].to,
        ]
      : undefined,
    animation: {
      enabled: true,
      duration: 180,
    },
    movable: {
      free: false,
      color: canMove.value ? playerColor.value : undefined,
      dests: canMove.value ? legalDests() : new Map(),
      showDests: true,
      events: {
        after: handleBoardMove,
      },
    },
    draggable: {
      enabled: canMove.value,
      showGhost: true,
    },
    selectable: {
      enabled: true,
    },
  }
}

function formatClock(milliseconds) {
  const safeMs = Math.max(0, milliseconds || 0)
  const totalSeconds = Math.ceil(safeMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

function startClockTicker() {
  if (clockInterval.value) {
    return
  }

  clockInterval.value = window.setInterval(() => {
    clockNow.value = Date.now()
  }, 250)
}

function stopClockTicker() {
  if (!clockInterval.value) {
    return
  }

  window.clearInterval(clockInterval.value)
  clockInterval.value = null
}

function gameEndResult() {
  if (chess.value.isCheckmate()) {
    return chess.value.turn() === 'w' ? 'black_wins_checkmate' : 'white_wins_checkmate'
  }

  if (chess.value.isStalemate()) {
    return 'draw_stalemate'
  }

  if (chess.value.isInsufficientMaterial()) {
    return 'draw_insufficient_material'
  }

  if (chess.value.isThreefoldRepetition()) {
    return 'draw_threefold_repetition'
  }

  if (chess.value.isDrawByFiftyMoves()) {
    return 'draw_fifty_move_rule'
  }

  if (chess.value.isDraw()) {
    return 'draw'
  }
}

function syncBoard() {
  if (!boardElement.value) {
    return
  }

  if (!ground.value) {
    ground.value = Chessground(boardElement.value, boardConfig())
    return
  }

  ground.value.set(boardConfig())
}

function syncGameFromRealtime(updatedGame) {
  if (!game.value || updatedGame.id !== game.value.id) {
    return
  }

  game.value = updatedGame
  chess.value = new Chess(updatedGame.fen)
  clockNow.value = Date.now()
  syncBoard()
}

function subscribeToGame() {
  if (!game.value || !playerColor.value || subscribedGameId.value === game.value.id) {
    return
  }

  try {
    echo.connector.pusher.config.auth.headers.Authorization = `Bearer ${localStorage.getItem('token') || ''}`
    subscribedGameId.value = game.value.id

    echo.private(`game.${game.value.id}`)
      .listen('.GameJoined', (event) => {
        syncGameFromRealtime(event.game)
      })
      .listen('.MovePlayed', (event) => {
        syncGameFromRealtime(event.game)
      })
      .listen('.GameEnded', (event) => {
        syncGameFromRealtime(event.game)
      })
  } catch {
    subscribedGameId.value = null
  }
}

function leaveGameChannel() {
  if (!subscribedGameId.value) {
    return
  }

  echo.leave(`game.${subscribedGameId.value}`)
  subscribedGameId.value = null
}

function promotionFor(from, to) {
  const piece = chess.value.get(from)
  const promotionRank = piece?.color === 'w' ? '8' : '1'

  if (piece?.type === 'p' && to.endsWith(promotionRank)) {
    return 'q'
  }
}

async function loadGame() {
  error.value = ''
  loading.value = true

  try {
    if (!auth.user) {
      await auth.fetchUser()
    }

    const response = await api.get(`/games/${route.params.id}`)
    game.value = response.data
    chess.value = new Chess(response.data.fen)
    clockNow.value = Date.now()
    await nextTick()
    syncBoard()
    subscribeToGame()
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not load game'
  } finally {
    loading.value = false
  }
}

async function handleBoardMove(from, to) {
  if (!canMove.value) {
    error.value = game.value?.status === 'waiting'
      ? 'Black must join before moves can be made.'
      : `Only ${game.value?.turn} can move right now.`
    syncBoard()
    return
  }

  if (saving.value) {
    syncBoard()
    return
  }

  error.value = ''
  const fenBefore = chess.value.fen()
  const promotion = promotionFor(from, to)
  let move = null

  try {
    move = chess.value.move({ from, to, promotion })
  } catch {
    move = null
  }

  if (!move) {
    error.value = 'That move is not legal from the current position.'
    syncBoard()
    return
  }

  saving.value = true
  syncBoard()

  try {
    const result = gameEndResult()
    const response = await api.post(`/games/${game.value.id}/moves`, {
      from: move.from,
      to: move.to,
      promotion: move.promotion || null,
      san: move.san,
      fen_before: fenBefore,
      fen_after: chess.value.fen(),
      game_over: Boolean(result),
      result,
    })

    game.value = response.data.game
    chess.value = new Chess(response.data.game.fen)
    clockNow.value = Date.now()
  } catch (requestError) {
    if (requestError.response?.data?.game) {
      game.value = requestError.response.data.game
      chess.value = new Chess(requestError.response.data.game.fen)
    } else {
      chess.value = new Chess(fenBefore)
    }

    error.value = requestError.response?.data?.message || 'Could not save move'
  } finally {
    saving.value = false
    syncBoard()
  }
}

async function resignGame() {
  if (!canResign.value) {
    return
  }

  error.value = ''
  resigning.value = true

  try {
    const response = await api.post(`/games/${game.value.id}/resign`)
    game.value = response.data
    chess.value = new Chess(response.data.fen)
    clockNow.value = Date.now()
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not resign game'
  } finally {
    resigning.value = false
    syncBoard()
  }
}

async function joinGame() {
  error.value = ''
  saving.value = true

  try {
    const response = await api.post(`/games/${game.value.id}/join`)
    game.value = response.data
    chess.value = new Chess(response.data.fen)
    clockNow.value = Date.now()
    subscribeToGame()
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not join game'
  } finally {
    saving.value = false
    syncBoard()
  }
}

async function copyInvite() {
  try {
    await navigator.clipboard.writeText(inviteLink.value)
    inviteCopied.value = true
  } catch {
    window.prompt('Copy invite link', inviteLink.value)
  }
}

async function claimTimeout() {
  if (!canClaimTimeout.value) {
    return
  }

  error.value = ''
  claimingTimeout.value = true

  try {
    const response = await api.post(`/games/${game.value.id}/claim-timeout`)
    game.value = response.data
    chess.value = new Chess(response.data.fen)
    clockNow.value = Date.now()
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not claim timeout'
  } finally {
    claimingTimeout.value = false
    syncBoard()
  }
}

onMounted(() => {
  startClockTicker()
  loadGame()
})

onBeforeUnmount(() => {
  stopClockTicker()
  leaveGameChannel()
  ground.value?.destroy()
})
</script>

<template>
  <main class="game-page">
    <header class="app-header">
      <div>
        <p class="eyebrow">Game MVP</p>
        <h1>{{ game?.title || 'Chess game' }}</h1>
      </div>

      <RouterLink class="text-link" to="/dashboard">Dashboard</RouterLink>
    </header>

    <p v-if="loading" class="page-note">Loading game...</p>
    <p v-if="error" class="form-error">{{ error }}</p>

    <section v-if="game" class="game-layout">
      <div class="board-shell">
        <div ref="boardElement" class="chessground-board" aria-label="Chess board"></div>
      </div>

      <aside class="move-panel">
        <p class="panel-label">Position</p>
        <h2>{{ statusText }}</h2>
        <p v-if="game.status === 'finished'" class="result-banner">{{ resultText }}</p>

        <button class="fen-toggle secondary-button" type="button" @click="showFen = !showFen">
          {{ showFen ? 'Hide FEN' : 'Show FEN' }}
        </button>

        <code v-if="showFen" class="fen-code">{{ game.fen }}</code>

        <div class="clock-grid">
          <div
            class="clock-card"
            :class="{
              active: game.turn === 'white' && game.status === 'active',
              expired: game.turn === 'white' && activeClockExpired,
            }"
          >
            <span>White</span>
            <strong>{{ formatClock(displayedWhiteTimeMs) }}</strong>
          </div>
          <div
            class="clock-card"
            :class="{
              active: game.turn === 'black' && game.status === 'active',
              expired: game.turn === 'black' && activeClockExpired,
            }"
          >
            <span>Black</span>
            <strong>{{ formatClock(displayedBlackTimeMs) }}</strong>
          </div>
        </div>

        <p class="page-note">
          <template v-if="saving">Saving...</template>
          <template v-else-if="activeClockExpired">{{ game.turn }} is out of time.</template>
          <template v-else-if="canMove">Click or drag a highlighted legal move on the board.</template>
          <template v-else-if="game.status === 'finished'">Game complete.</template>
          <template v-else-if="canJoin">This game is waiting. Join as black to begin.</template>
          <template v-else-if="game.status === 'waiting' && isWhitePlayer">Waiting for opponent. Share the invite link.</template>
          <template v-else-if="game.status === 'waiting'">This waiting game is not available to join.</template>
          <template v-else>You are {{ playerColor || 'viewing' }}. Waiting for {{ game.turn }}.</template>
        </p>

        <button v-if="canJoin" type="button" :disabled="saving" @click="joinGame">
          Join as black
        </button>

        <button v-if="canClaimTimeout" type="button" :disabled="claimingTimeout" @click="claimTimeout">
          {{ claimingTimeout ? 'Claiming...' : 'Claim win on time' }}
        </button>

        <button v-if="canResign" class="danger-button" type="button" :disabled="resigning" @click="resignGame">
          {{ resigning ? 'Resigning...' : 'Resign' }}
        </button>

        <button
          v-if="game.status === 'waiting' && isWhitePlayer"
          class="secondary-button"
          type="button"
          @click="copyInvite"
        >
          {{ inviteCopied ? 'Invite copied' : 'Copy invite link' }}
        </button>

        <div class="seat-list">
          <p><strong>White:</strong> {{ game.white_user?.name || 'Open' }}</p>
          <p><strong>Black:</strong> {{ game.black_user?.name || 'Open' }}</p>
          <p><strong>Status:</strong> {{ game.status }}</p>
        </div>

        <div class="move-list">
          <p class="panel-label">Moves</p>
          <ol>
            <li v-for="move in game.moves" :key="move.id">
              {{ move.move_number }}. {{ move.san }}
              <span>{{ move.from }}-{{ move.to }}</span>
            </li>
          </ol>
        </div>
      </aside>
    </section>
  </main>
</template>
