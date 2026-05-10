<script setup>
import { computed, onMounted, ref } from 'vue'
import api from '../services/api'

const loading = ref(false)
const error = ref('')
const stats = ref(null)
const latestUsers = ref([])
const latestTournaments = ref([])

const statCards = computed(() => [
  { label: 'Total users', value: stats.value?.total_users ?? 0 },
  { label: 'Total games', value: stats.value?.total_games ?? 0 },
  { label: 'Active games', value: stats.value?.active_games ?? 0 },
  { label: 'Total tournaments', value: stats.value?.total_tournaments ?? 0 },
  { label: 'Active tournaments', value: stats.value?.active_tournaments ?? 0 },
  { label: 'Finished tournaments', value: stats.value?.finished_tournaments ?? 0 },
])

async function loadAdminStats() {
  loading.value = true
  error.value = ''

  try {
    const response = await api.get('/admin/stats')
    stats.value = response.data.stats
    latestUsers.value = response.data.latest_users || []
    latestTournaments.value = response.data.latest_tournaments || []
  } catch (requestError) {
    error.value = requestError.response?.data?.message || 'Could not load admin dashboard'
  } finally {
    loading.value = false
  }
}

function formatDate(value) {
  if (!value) {
    return 'Unknown'
  }

  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

onMounted(loadAdminStats)
</script>

<template>
  <main class="dashboard-page admin-page">
    <header class="app-header">
      <div>
        <p class="eyebrow">Owner</p>
        <h1>Admin</h1>
        <p class="app-header-description">
          Monitor core GambitForge activity without adding full platform operations yet.
        </p>
      </div>

      <button class="secondary-button" type="button" :disabled="loading" @click="loadAdminStats">
        {{ loading ? 'Updating...' : 'Refresh' }}
      </button>
    </header>

    <div v-if="error" class="state-panel error-state">
      <p class="panel-label">Needs attention</p>
      <h2>{{ error }}</h2>
      <p>Only platform admins can view this page.</p>
    </div>

    <div v-if="loading && !stats" class="state-panel">
      <p class="panel-label">Loading</p>
      <h2>Preparing admin overview</h2>
      <p>Checking users, games, tournaments, and recent activity.</p>
    </div>

    <template v-if="stats">
      <section class="admin-stats-grid" aria-label="Platform stats">
        <article v-for="card in statCards" :key="card.label" class="admin-stat-card">
          <p class="panel-label">{{ card.label }}</p>
          <strong>{{ card.value }}</strong>
        </article>
      </section>

      <section class="admin-table-grid">
        <article class="admin-table-panel">
          <div class="section-header">
            <div>
              <p class="eyebrow">Accounts</p>
              <h2>Latest users</h2>
            </div>
          </div>

          <div class="admin-list">
            <p v-for="user in latestUsers" :key="user.id">
              <span>
                <strong>{{ user.name }}</strong>
                <small>{{ user.email }}</small>
              </span>
              <em>{{ user.role }}</em>
            </p>
          </div>
        </article>

        <article class="admin-table-panel">
          <div class="section-header">
            <div>
              <p class="eyebrow">Events</p>
              <h2>Latest tournaments</h2>
            </div>
          </div>

          <div class="admin-list">
            <p v-for="tournament in latestTournaments" :key="tournament.id">
              <span>
                <strong>{{ tournament.name }}</strong>
                <small>{{ tournament.owner?.name || 'Unknown owner' }}</small>
              </span>
              <em>{{ tournament.status }}</em>
            </p>
          </div>
        </article>
      </section>
    </template>
  </main>
</template>
