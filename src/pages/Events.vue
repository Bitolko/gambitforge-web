<script setup>
import { computed, ref } from 'vue'

const stateFilters = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'ACT', 'TAS']
const categoryFilters = ['Junior', 'Open', 'Rapid', 'Blitz', 'Classical', 'School', 'Club']

const activeState = ref('NSW')
const activeCategory = ref('Junior')

const events = [
  {
    title: 'Sydney Junior Open',
    slug: 'sydney-junior-open',
    date: 'Saturday, 15 June 2026',
    location: 'Sydney, NSW',
    state: 'NSW',
    timeControl: 'Rapid 15+10',
    organiser: 'Harbour Chess Academy',
    tags: ['Junior', 'Rapid', 'School'],
  },
  {
    title: 'Melbourne Rapid Championship',
    slug: 'melbourne-rapid-championship',
    date: 'Sunday, 23 June 2026',
    location: 'Melbourne, VIC',
    state: 'VIC',
    timeControl: 'Rapid 25+10',
    organiser: 'Melbourne Chess Centre',
    tags: ['Open', 'Rapid', 'Club'],
  },
  {
    title: 'Perth Blitz Arena',
    slug: 'perth-blitz-arena',
    date: 'Friday, 5 July 2026',
    location: 'Perth, WA',
    state: 'WA',
    timeControl: 'Blitz 3+2',
    organiser: 'Perth City Chess Club',
    tags: ['Open', 'Blitz', 'Club'],
  },
  {
    title: 'Gold Coast Open',
    slug: 'gold-coast-open',
    date: 'Saturday, 13 July 2026',
    location: 'Gold Coast, QLD',
    state: 'QLD',
    timeControl: 'Classical 60+10',
    organiser: 'Gold Coast Chess Association',
    tags: ['Open', 'Classical', 'Club'],
  },
  {
    title: 'NSW Scholastic Teams',
    slug: 'nsw-scholastic-teams',
    date: 'Tuesday, 30 July 2026',
    location: 'Parramatta, NSW',
    state: 'NSW',
    timeControl: 'Rapid 10+5',
    organiser: 'NSW School Chess Network',
    tags: ['Junior', 'School', 'Rapid'],
  },
]

const filteredEvents = computed(() => (
  events.filter((event) => (
    event.state === activeState.value
    || event.tags.includes(activeCategory.value)
  ))
))

const previewItems = [
  'Standings',
  'Pairings',
  'Registration',
  'Organiser details',
  'Live results',
  'Venue map',
  'Schedule',
]
</script>

<template>
  <main class="events-page">
    <section class="events-hero" aria-labelledby="events-title">
      <div class="events-hero-copy">
        <p class="eyebrow">Australian chess events</p>
        <h1 id="events-title">Discover Chess Events Across Australia</h1>
        <p>
          Find tournaments, club events, coaching programs, junior competitions, and chess
          activities across Australia.
        </p>
        <RouterLink class="hero-primary events-submit-button" to="/submit-event">Submit Event</RouterLink>
      </div>

      <aside class="events-hero-panel" aria-label="Events discovery preview">
        <div class="preview-card-heading">
          <p class="panel-label">This week</p>
          <span class="status-badge badge-live">Australia</span>
        </div>
        <div class="events-map-preview" aria-hidden="true">
          <span class="map-pin pin-nsw">NSW</span>
          <span class="map-pin pin-vic">VIC</span>
          <span class="map-pin pin-wa">WA</span>
          <span class="map-pin pin-qld">QLD</span>
        </div>
        <div class="events-hero-stats">
          <span><strong>24</strong> events</span>
          <span><strong>7</strong> states</span>
          <span><strong>5</strong> formats</span>
        </div>
      </aside>
    </section>

    <section class="events-filter-section" aria-labelledby="events-filter-heading">
      <div class="section-kicker">
        <p class="eyebrow">Find your next board</p>
        <h2 id="events-filter-heading">Browse by state and event type</h2>
      </div>

      <div class="events-filter-group" aria-label="State filters">
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

      <div class="events-filter-group" aria-label="Event type filters">
        <button
          v-for="category in categoryFilters"
          :key="category"
          class="event-filter-pill event-filter-soft"
          :class="{ active: activeCategory === category }"
          type="button"
          @click="activeCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <section class="events-grid" aria-label="Featured Australian chess events">
      <article
        v-for="event in filteredEvents"
        :key="event.title"
        class="event-card"
        itemscope
        itemtype="https://schema.org/Event"
      >
        <div class="preview-card-heading">
          <p class="panel-label">{{ event.state }}</p>
          <span class="status-badge badge-active">{{ event.timeControl }}</span>
        </div>

        <div class="event-card-main">
          <h2 itemprop="name">{{ event.title }}</h2>
          <p itemprop="startDate">{{ event.date }}</p>
          <p itemprop="location" itemscope itemtype="https://schema.org/Place">
            <span itemprop="name">{{ event.location }}</span>
          </p>
        </div>

        <dl class="event-meta-list">
          <div>
            <dt>Organiser</dt>
            <dd itemprop="organizer" itemscope itemtype="https://schema.org/Organization">
              <span itemprop="name">{{ event.organiser }}</span>
            </dd>
          </div>
          <div>
            <dt>Time control</dt>
            <dd>{{ event.timeControl }}</dd>
          </div>
        </dl>

        <div class="event-tag-row" aria-label="Event tags">
          <span v-for="tag in event.tags" :key="tag">{{ tag }}</span>
        </div>

        <div class="event-card-actions">
          <button class="hero-primary" type="button" disabled>Register</button>
          <RouterLink class="secondary-button" :to="{ name: 'event-detail', params: { slug: event.slug } }">
            View Details
          </RouterLink>
        </div>
      </article>
    </section>

    <section class="event-detail-preview" aria-labelledby="event-detail-preview-title">
      <div>
        <p class="eyebrow">Future event pages</p>
        <h2 id="event-detail-preview-title">Everything organisers and players expect in one event room</h2>
      </div>

      <div class="event-preview-grid">
        <article v-for="item in previewItems" :key="item" class="event-preview-card">
          <span class="coming-soon-badge">Preview</span>
          <h3>{{ item }}</h3>
        </article>
      </div>
    </section>
  </main>
</template>
