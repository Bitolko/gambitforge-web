<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const stateFilters = ['All', 'NSW', 'VIC', 'WA', 'QLD']
const tagFilters = ['All', 'Junior', 'Adult', 'School', 'Community']

const search = ref('')
const activeState = ref('All')
const activeTag = ref('All')

const clubs = [
  {
    slug: 'sydney-academy-of-chess',
    name: 'Sydney Academy of Chess',
    state: 'NSW',
    location: 'Sydney, NSW',
    description: 'Junior coaching, school programs, weekend tournaments, and academy pathways for ambitious players.',
    coaching: 'Group classes, private coaching, holiday camps',
    tags: ['Junior', 'School', 'Community'],
  },
  {
    slug: 'melbourne-chess-club',
    name: 'Melbourne Chess Club',
    state: 'VIC',
    location: 'Melbourne, VIC',
    description: 'Historic city club with rated events, social nights, league teams, and coaching for adult improvers.',
    coaching: 'Adult improvement groups and masterclasses',
    tags: ['Adult', 'Community'],
  },
  {
    slug: 'perth-junior-chess-association',
    name: 'Perth Junior Chess Association',
    state: 'WA',
    location: 'Perth, WA',
    description: 'Junior chess association supporting school leagues, weekend rapid events, and development squads.',
    coaching: 'Junior squads, school coaching, tournament preparation',
    tags: ['Junior', 'School'],
  },
  {
    slug: 'gold-coast-chess-academy',
    name: 'Gold Coast Chess Academy',
    state: 'QLD',
    location: 'Gold Coast, QLD',
    description: 'Coastal academy for juniors, families, and club players with coaching programs and local events.',
    coaching: 'Beginner pathways, junior coaching, club training nights',
    tags: ['Junior', 'Adult', 'Community'],
  },
]

const filteredClubs = computed(() => {
  const query = search.value.trim().toLowerCase()

  return clubs.filter((club) => {
    const matchesSearch = !query
      || club.name.toLowerCase().includes(query)
      || club.location.toLowerCase().includes(query)
      || club.description.toLowerCase().includes(query)

    const matchesState = activeState.value === 'All' || club.state === activeState.value
    const matchesTag = activeTag.value === 'All' || club.tags.includes(activeTag.value)

    return matchesSearch && matchesState && matchesTag
  })
})
</script>

<template>
  <main class="clubs-page discovery-page">
    <section class="clubs-hero" aria-labelledby="clubs-title">
      <div class="clubs-hero-copy">
        <p class="eyebrow">Australian chess clubs</p>
        <h1 id="clubs-title">Find Chess Clubs and Academies Across Australia</h1>
        <p>
          Discover local clubs, junior academies, school programs, coaching hubs, and community
          chess groups building the next generation of Australian chess.
        </p>
        <div class="discovery-hero-metrics" aria-label="Club directory highlights">
          <span><strong>Clubs</strong> profiles</span>
          <span><strong>Coaching</strong> programs</span>
          <span><strong>Events</strong> connected</span>
        </div>
      </div>

      <aside class="clubs-hero-panel" aria-label="Club directory preview">
        <div class="preview-card-heading">
          <p class="panel-label">Club command center</p>
          <span class="status-badge badge-active">Directory</span>
        </div>

        <div class="club-network-preview">
          <div class="club-node node-nsw">NSW</div>
          <div class="club-node node-vic">VIC</div>
          <div class="club-node node-wa">WA</div>
          <div class="club-node node-qld">QLD</div>
        </div>

        <div class="club-preview-list">
          <span><strong>Sydney Academy</strong> Junior squads</span>
          <span><strong>Melbourne Club</strong> Rated nights</span>
          <span><strong>Gold Coast</strong> Coaching hub</span>
        </div>
      </aside>
    </section>

    <section class="clubs-filter-section" aria-labelledby="club-filter-title">
      <div class="section-kicker">
        <p class="eyebrow">Browse clubs</p>
        <h2 id="club-filter-title">Search by name, state, or community focus</h2>
      </div>

      <label class="club-search-field">
        <span>Search clubs</span>
        <input v-model="search" type="search" placeholder="Search Sydney, junior, academy..." />
      </label>

      <div class="events-filter-group" aria-label="Club state filters">
        <button
          v-for="state in stateFilters"
          :key="state"
          class="event-filter-pill"
          :class="{ active: activeState === state }"
          type="button"
          @click="activeState = state"
        >
          {{ state }}
        </button>
      </div>

      <div class="events-filter-group" aria-label="Club tag filters">
        <button
          v-for="tag in tagFilters"
          :key="tag"
          class="event-filter-pill event-filter-soft"
          :class="{ active: activeTag === tag }"
          type="button"
          @click="activeTag = tag"
        >
          {{ tag }}
        </button>
      </div>
    </section>

    <section class="clubs-grid" aria-label="Australian chess clubs">
      <article
        v-for="club in filteredClubs"
        :key="club.slug"
        class="club-card"
        itemscope
        itemtype="https://schema.org/Organization"
      >
        <div class="preview-card-heading">
          <p class="panel-label">{{ club.state }}</p>
          <span class="status-badge badge-active">Club profile</span>
        </div>

        <div class="club-card-main">
          <div class="club-logo-placeholder" aria-hidden="true">{{ club.name.slice(0, 2) }}</div>
          <div>
            <h2 itemprop="name">{{ club.name }}</h2>
            <p itemprop="address">{{ club.location }}</p>
          </div>
        </div>

        <p class="club-card-description" itemprop="description">{{ club.description }}</p>

        <dl class="event-meta-list">
          <div>
            <dt>Coaching</dt>
            <dd>{{ club.coaching }}</dd>
          </div>
        </dl>

        <div class="event-tag-row" aria-label="Club tags">
          <span v-for="tag in club.tags" :key="tag">{{ tag }}</span>
        </div>

        <RouterLink class="secondary-button club-card-link" :to="{ name: 'club-detail', params: { slug: club.slug } }">
          View Club
        </RouterLink>
      </article>
    </section>
  </main>
</template>
