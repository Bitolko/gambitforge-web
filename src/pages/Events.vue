<script setup>
import { computed, ref } from 'vue'
import australiaRadarUrl from '../assets/australia-event-radar.svg'

const stateFilters = ['All', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'ACT', 'TAS']
const categoryFilters = ['All', 'Junior', 'Open', 'Rapid', 'Blitz', 'Classical', 'School', 'Teams']

const activeState = ref('All')
const activeCategory = ref('All')

const radarMarkers = [
  { state: 'WA', label: 'Perth', style: { left: '25%', top: '52%' } },
  { state: 'SA', label: 'Adelaide', style: { left: '54%', top: '63%' } },
  { state: 'QLD', label: 'Brisbane', style: { left: '72%', top: '34%' } },
  { state: 'NSW', label: 'Sydney', style: { left: '72%', top: '62%' } },
  { state: 'VIC', label: 'Melbourne', style: { left: '68%', top: '75%' } },
  { state: 'ACT', label: 'Canberra', style: { left: '70%', top: '67%' } },
]

const events = [
  {
    title: 'Sydney Winter Rapid Classic',
    slug: 'sydney-winter-rapid-classic',
    date: 'Saturday, 20 June 2026',
    dateISO: '2026-06-20',
    location: 'Parramatta, NSW',
    venue: 'Parramatta Town Hall, Centenary Square',
    state: 'NSW',
    timeControl: 'Rapid 15+10',
    organiser: 'Harbour Chess Academy',
    organiserType: 'Academy organiser',
    divisions: ['Open', 'Under 1600', 'Junior U12'],
    schedule: 'Check-in 8:30 AM / Round 1 9:30 AM / Awards 5:10 PM',
    capacity: '96 players',
    entries: '62 interested',
    prize: '$1,200 prize pool',
    posterTone: 'Harbour',
    tags: ['Open', 'Rapid', 'Junior'],
    featured: true,
  },
  {
    title: 'Melbourne Club Teams Weekend',
    slug: 'melbourne-club-teams-weekend',
    date: 'Saturday, 27 June 2026',
    dateISO: '2026-06-27',
    location: 'Carlton, VIC',
    venue: 'Melbourne Chess Club, Leicester Street',
    state: 'VIC',
    timeControl: 'Classical 60+10',
    organiser: 'Melbourne Chess Club',
    organiserType: 'Club organiser',
    divisions: ['Premier', 'Reserve', 'Junior board'],
    schedule: 'Captains meeting 9:10 AM / Two rounds daily',
    capacity: '24 teams',
    entries: '14 teams forming',
    prize: 'Team trophies and board prizes',
    posterTone: 'Metro',
    tags: ['Teams', 'Classical', 'Club'],
  },
  {
    title: 'Queensland Junior Grand Prix',
    slug: 'queensland-junior-grand-prix',
    date: 'Sunday, 5 July 2026',
    dateISO: '2026-07-05',
    location: 'Brisbane, QLD',
    venue: 'Queensland Chess Hub, Woolloongabba',
    state: 'QLD',
    timeControl: 'Rapid 10+5',
    organiser: 'Queensland Junior Chess Network',
    organiserType: 'Junior pathway',
    divisions: ['Under 8', 'Under 10', 'Under 12', 'Under 16'],
    schedule: 'Arrival 8:45 AM / Six rounds / Medal ceremony 3:45 PM',
    capacity: '120 juniors',
    entries: 'Schools invited',
    prize: 'Grand Prix points',
    posterTone: 'Junior',
    tags: ['Junior', 'School', 'Rapid'],
  },
  {
    title: 'Perth Friday Night Blitz Arena',
    slug: 'perth-friday-night-blitz-arena',
    date: 'Friday, 10 July 2026',
    dateISO: '2026-07-10',
    location: 'Northbridge, WA',
    venue: 'Perth City Chess Club Rooms',
    state: 'WA',
    timeControl: 'Blitz 3+2',
    organiser: 'Perth City Chess Club',
    organiserType: 'Club night',
    divisions: ['Open arena', 'Junior arena', 'Beginner table'],
    schedule: 'Doors 6:00 PM / Arena 6:30 PM / Prizes 9:00 PM',
    capacity: '64 players',
    entries: 'Walk-ins likely',
    prize: 'Club prizes',
    posterTone: 'Blitz',
    tags: ['Open', 'Blitz', 'Club'],
  },
  {
    title: 'Adelaide Schools Chess Carnival',
    slug: 'adelaide-schools-chess-carnival',
    date: 'Tuesday, 21 July 2026',
    dateISO: '2026-07-21',
    location: 'Adelaide, SA',
    venue: 'Adelaide Convention Centre, Riverbank Rooms',
    state: 'SA',
    timeControl: 'Rapid 12+3',
    organiser: 'South Australian School Chess',
    organiserType: 'School organiser',
    divisions: ['Primary teams', 'Secondary teams', 'Girls teams'],
    schedule: 'Teacher check-in 8:30 AM / Round 1 9:20 AM / Trophies 3:30 PM',
    capacity: '40 teams',
    entries: 'Expression of interest',
    prize: 'School shields',
    posterTone: 'Schools',
    tags: ['School', 'Teams', 'Junior'],
  },
  {
    title: 'Canberra Winter Classical Open',
    slug: 'canberra-winter-classical-open',
    date: 'Saturday, 1 August 2026',
    dateISO: '2026-08-01',
    location: 'Canberra, ACT',
    venue: 'Griffith Community Centre',
    state: 'ACT',
    timeControl: 'Classical 75+10',
    organiser: 'ACT Chess Association',
    organiserType: 'Association event',
    divisions: ['Open', 'Under 1800', 'Under 1400'],
    schedule: 'Round 1 Saturday 10:00 AM / Round 5 Sunday 2:30 PM',
    capacity: '72 players',
    entries: 'Early bird open',
    prize: '$900 plus rating prizes',
    posterTone: 'Classical',
    tags: ['Open', 'Classical', 'Club'],
  },
  {
    title: 'Hobart Rapid by the Waterfront',
    slug: 'hobart-rapid-by-the-waterfront',
    date: 'Sunday, 16 August 2026',
    dateISO: '2026-08-16',
    location: 'Hobart, TAS',
    venue: 'Waterside Pavilion, Salamanca',
    state: 'TAS',
    timeControl: 'Rapid 20+5',
    organiser: 'Tasmanian Chess League',
    organiserType: 'League organiser',
    divisions: ['Open', 'Junior', 'Novice friendly'],
    schedule: 'Check-in 9:00 AM / Five rounds / Casual analysis after awards',
    capacity: '56 players',
    entries: 'Community listing',
    prize: 'Local sponsor prizes',
    posterTone: 'Waterfront',
    tags: ['Open', 'Rapid', 'Junior'],
  },
]

const filteredEvents = computed(() => (
  events.filter((event) => {
    const matchesState = activeState.value === 'All' || event.state === activeState.value
    const matchesCategory = activeCategory.value === 'All' || event.tags.includes(activeCategory.value)

    return matchesState && matchesCategory
  })
))

const featuredEvent = computed(() => events.find((event) => event.featured) || events[0])

const previewModules = [
  { title: 'Standings', copy: 'Rankings, tie-breaks, and section tables prepared for live event rooms.' },
  { title: 'Pairings', copy: 'Round publishing, board numbers, byes, and late-entry workflows.' },
  { title: 'Registration', copy: 'Player entries, division selection, waitlists, and organiser review.' },
  { title: 'Venue map', copy: 'Arrival notes, parking, accessibility, and board-room directions.' },
]
</script>

<template>
  <main class="events-page discovery-page">
    <section class="events-hero" aria-labelledby="events-title">
      <div class="events-hero-copy">
        <p class="eyebrow">Australian chess events</p>
        <h1 id="events-title">A National Calendar for Real Chess Communities</h1>
        <p>
          Discover rated opens, junior circuits, school carnivals, club nights, and team events
          across Australia, with future-ready tools for registration, pairings, standings, and live results.
        </p>
        <div class="discovery-hero-metrics" aria-label="Event discovery highlights">
          <span><strong>{{ events.length }}</strong> curated events</span>
          <span><strong>7</strong> states and territories</span>
          <span><strong>Live</strong> operations previews</span>
        </div>
        <RouterLink class="hero-primary events-submit-button" to="/submit-event">Submit Event</RouterLink>
      </div>

      <aside class="events-hero-panel" aria-label="Events discovery preview">
        <div class="preview-card-heading">
          <p class="panel-label">National event radar</p>
          <span class="status-badge badge-live">Australia</span>
        </div>

        <div class="events-map-preview australia-map-preview" aria-label="Australian chess event radar preview">
          <img class="australia-radar-asset" :src="australiaRadarUrl" alt="" width="920" height="620" decoding="async" />
          <span
            v-for="marker in radarMarkers"
            :key="marker.state"
            class="radar-marker"
            :style="marker.style"
          >
            <span class="radar-marker-dot" aria-hidden="true"></span>
            <span class="radar-marker-label">
              <strong>{{ marker.state }}</strong>
              <small>{{ marker.label }}</small>
            </span>
          </span>
        </div>

        <div class="event-feature-strip">
          <span class="coming-soon-badge">Featured</span>
          <div>
            <h2>{{ featuredEvent.title }}</h2>
            <p>{{ featuredEvent.timeControl }} / {{ featuredEvent.venue }} / {{ featuredEvent.prize }}</p>
          </div>
        </div>

        <div class="events-hero-stats radar-module-row">
          <span>
            <small>Next phase</small>
            <strong>Pairings</strong>
            <em>Swiss tools</em>
          </span>
          <span>
            <small>Next phase</small>
            <strong>Standings</strong>
            <em>Live tables</em>
          </span>
          <span>
            <small>Next phase</small>
            <strong>Entries</strong>
            <em>Player flow</em>
          </span>
        </div>
      </aside>
    </section>

    <section class="events-featured-section" aria-labelledby="featured-event-title">
      <div class="event-flyer event-flyer-large" :data-tone="featuredEvent.posterTone" aria-hidden="true">
        <span>{{ featuredEvent.state }}</span>
        <strong>{{ featuredEvent.timeControl }}</strong>
        <em>{{ featuredEvent.posterTone }}</em>
      </div>

      <div class="events-featured-copy" itemscope itemtype="https://schema.org/Event">
        <p class="eyebrow">Featured tournament</p>
        <h2 id="featured-event-title" itemprop="name">{{ featuredEvent.title }}</h2>
        <p itemprop="description">
          {{ featuredEvent.organiser }} is preparing {{ featuredEvent.divisions.join(', ') }} divisions at
          {{ featuredEvent.venue }} with {{ featuredEvent.capacity }} capacity.
        </p>
        <dl class="event-featured-meta">
          <div>
            <dt>Date</dt>
            <dd itemprop="startDate" :datetime="featuredEvent.dateISO">{{ featuredEvent.date }}</dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd itemprop="location">{{ featuredEvent.location }}</dd>
          </div>
          <div>
            <dt>Entry signal</dt>
            <dd>{{ featuredEvent.entries }}</dd>
          </div>
        </dl>
        <RouterLink class="hero-primary events-submit-button" :to="{ name: 'event-detail', params: { slug: featuredEvent.slug } }">
          View Event Room
        </RouterLink>
      </div>
    </section>

    <section class="events-filter-section" aria-labelledby="events-filter-heading">
      <div class="section-kicker">
        <p class="eyebrow">Find your next board</p>
        <h2 id="events-filter-heading">Filter by state and event type</h2>
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
        class="event-card event-card-rich"
        itemscope
        itemtype="https://schema.org/Event"
      >
        <div class="event-card-topline">
          <div class="event-flyer" :data-tone="event.posterTone" aria-hidden="true">
            <span>{{ event.state }}</span>
            <strong>{{ event.timeControl }}</strong>
            <em>{{ event.posterTone }}</em>
          </div>
          <div class="event-card-main">
            <p class="panel-label">{{ event.location }}</p>
            <h2 itemprop="name">{{ event.title }}</h2>
            <p itemprop="startDate" :datetime="event.dateISO">{{ event.date }}</p>
          </div>
        </div>

        <dl class="event-meta-list event-meta-list-rich">
          <div>
            <dt>Venue</dt>
            <dd itemprop="location" itemscope itemtype="https://schema.org/Place">
              <span itemprop="name">{{ event.venue }}</span>
            </dd>
          </div>
          <div>
            <dt>Organiser</dt>
            <dd itemprop="organizer" itemscope itemtype="https://schema.org/Organization">
              <span itemprop="name">{{ event.organiser }}</span>
            </dd>
          </div>
          <div>
            <dt>Schedule</dt>
            <dd>{{ event.schedule }}</dd>
          </div>
        </dl>

        <div class="event-division-row" aria-label="Tournament divisions">
          <span v-for="division in event.divisions" :key="division">{{ division }}</span>
        </div>

        <div class="event-card-status-row">
          <span>{{ event.capacity }}</span>
          <span>{{ event.entries }}</span>
          <span>{{ event.prize }}</span>
        </div>

        <div class="event-tag-row" aria-label="Event tags">
          <span v-for="tag in event.tags" :key="tag">{{ tag }}</span>
        </div>

        <div class="event-card-actions">
          <button class="hero-primary" type="button" disabled>Register Interest</button>
          <RouterLink class="secondary-button" :to="{ name: 'event-detail', params: { slug: event.slug } }">
            View Details
          </RouterLink>
        </div>
      </article>
    </section>

    <section class="event-detail-preview" aria-labelledby="event-detail-preview-title">
      <div>
        <p class="eyebrow">Event rooms roadmap</p>
        <h2 id="event-detail-preview-title">The operating layer behind every tournament listing</h2>
      </div>

      <div class="event-preview-grid event-preview-grid-rich">
        <article v-for="item in previewModules" :key="item.title" class="event-preview-card">
          <span class="coming-soon-badge">Preview</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.copy }}</p>
        </article>
      </div>
    </section>
  </main>
</template>
