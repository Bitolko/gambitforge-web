<script setup>
import { computed, ref } from 'vue'
import { events } from '../data/events'

const stateFilters = ['All', 'NSW', 'VIC', 'QLD', 'WA', 'SA', 'ACT', 'TAS', 'NT']
const categoryFilters = ['All', 'Junior', 'Open', 'Rapid', 'Blitz', 'Classical', 'School', 'Teams']

const activeState = ref('All')
const activeCategory = ref('All')
const isLoading = ref(false)

const radarMarkers = [
  { state: 'WA', label: 'Perth', style: { left: '24%', top: '54%' } },
  { state: 'SA', label: 'Adelaide', style: { left: '54%', top: '64%' } },
  { state: 'QLD', label: 'Brisbane', style: { left: '75%', top: '34%' } },
  { state: 'NSW', label: 'Sydney', style: { left: '74%', top: '62%' } },
  { state: 'VIC', label: 'Melbourne', style: { left: '69%', top: '76%' } },
  { state: 'ACT', label: 'Canberra', style: { left: '71%', top: '68%' } },
  { state: 'TAS', label: 'Hobart', style: { left: '72%', top: '88%' } },
]

const filteredEvents = computed(() => (
  events.filter((event) => {
    const matchesState = activeState.value === 'All' || event.state === activeState.value
    const matchesCategory = activeCategory.value === 'All' || event.tags.includes(activeCategory.value)

    return matchesState && matchesCategory
  })
))

const featuredEvent = computed(() => events.find((event) => event.featured) || events[0])
const hasFilteredEvents = computed(() => filteredEvents.value.length > 0)

const previewModules = [
  { title: 'Standings', copy: 'Section tables, tie-breaks, and rating group ladders for live event rooms.' },
  { title: 'Pairings', copy: 'Board numbers, byes, floats, and late-entry workflows shaped around Swiss events.' },
  { title: 'Registration', copy: 'Entry status, divisions, waitlists, organiser review, and future payment state.' },
  { title: 'Venue Notes', copy: 'Arrival instructions, accessibility, parking, public transport, and parent areas.' },
]

function resetFilters() {
  activeState.value = 'All'
  activeCategory.value = 'All'
}
</script>

<template>
  <main class="events-page discovery-page">
    <section class="events-hero" aria-labelledby="events-title">
      <div class="events-hero-copy">
        <p class="eyebrow">Australian chess event discovery</p>
        <h1 id="events-title">Find the right tournament before you pack the clock.</h1>
        <p>
          Browse realistic Australian chess events with the details players actually need:
          venue, date, time control, organiser, divisions, entry signal, and registration status.
        </p>
        <div class="discovery-hero-metrics" aria-label="Event discovery highlights">
          <span><strong>{{ events.length }}</strong> sample events</span>
          <span><strong>7</strong> states and territories</span>
          <span><strong>{{ filteredEvents.length }}</strong> matching now</span>
        </div>
        <div class="hero-actions events-hero-actions">
          <RouterLink class="hero-primary events-submit-button" to="/submit-event">Submit Event</RouterLink>
          <a class="secondary-button" href="#featured-events">Browse Events</a>
        </div>
      </div>

      <aside class="events-hero-panel" aria-label="Events discovery preview">
        <div class="preview-card-heading">
          <p class="panel-label">National event radar</p>
          <span class="status-badge badge-live">Australia</span>
        </div>

        <div class="events-map-preview australia-map-preview territory-map-preview" aria-label="Australian chess event map preview">
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
            <p>{{ featuredEvent.date }} / {{ featuredEvent.timeControl }} / {{ featuredEvent.registrationStatus }}</p>
          </div>
        </div>

        <div class="events-hero-stats event-module-row">
          <span>
            <small>Venue</small>
            <strong>{{ featuredEvent.city }}</strong>
            <em>{{ featuredEvent.state }}</em>
          </span>
          <span>
            <small>Format</small>
            <strong>{{ featuredEvent.timeControl }}</strong>
            <em>{{ featuredEvent.divisions.length }} divisions</em>
          </span>
          <span>
            <small>Entries</small>
            <strong>{{ featuredEvent.entries }}</strong>
            <em>{{ featuredEvent.capacity }}</em>
          </span>
        </div>
      </aside>
    </section>

    <section class="events-featured-section" aria-labelledby="featured-event-title">
      <div class="event-flyer event-flyer-large" :data-tone="featuredEvent.posterTone" aria-hidden="true">
        <span>{{ featuredEvent.state }}</span>
        <strong>{{ featuredEvent.timeControl }}</strong>
      </div>

      <div class="events-featured-copy" itemscope itemtype="https://schema.org/Event">
        <p class="eyebrow">Featured event</p>
        <h2 id="featured-event-title" itemprop="name">{{ featuredEvent.title }}</h2>
        <p itemprop="description">{{ featuredEvent.format }}</p>
        <dl class="event-featured-meta">
          <div>
            <dt>Date</dt>
            <dd itemprop="startDate" :datetime="featuredEvent.dateISO">{{ featuredEvent.date }}</dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd itemprop="location">{{ featuredEvent.venue }}, {{ featuredEvent.location }}</dd>
          </div>
          <div>
            <dt>Registration</dt>
            <dd>{{ featuredEvent.registrationStatus }}</dd>
          </div>
        </dl>
        <RouterLink class="hero-primary events-submit-button" :to="{ name: 'event-detail', params: { slug: featuredEvent.slug } }">
          View Event Details
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

    <section id="featured-events" class="events-grid" aria-label="Featured Australian chess events">
      <template v-if="isLoading">
        <article v-for="index in 6" :key="index" class="event-card event-card-rich event-card-skeleton" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </article>
      </template>

      <article v-else-if="!hasFilteredEvents" class="event-empty-state">
        <span class="coming-soon-badge">No matches</span>
        <h2>No events match those filters yet</h2>
        <p>
          Try another state or format, or submit a tournament so Australian players can find it here.
        </p>
        <div class="event-card-actions">
          <button class="hero-primary" type="button" @click="resetFilters">Reset Filters</button>
          <RouterLink class="secondary-button" to="/submit-event">Submit Event</RouterLink>
        </div>
      </article>

      <template v-else>
        <article
          v-for="event in filteredEvents"
          :key="event.slug"
          class="event-card event-card-rich"
          itemscope
          itemtype="https://schema.org/Event"
        >
          <div class="event-card-topline">
            <div class="event-flyer" :data-tone="event.posterTone" aria-hidden="true">
              <span>{{ event.state }}</span>
              <strong>{{ event.timeControl }}</strong>
            </div>
            <div class="event-card-main">
              <div class="event-card-title-row">
                <p class="panel-label">{{ event.location }}</p>
                <span class="event-registration-status" :data-status="event.registrationTone">
                  {{ event.registrationStatus }}
                </span>
              </div>
              <h2 itemprop="name">{{ event.title }}</h2>
              <p itemprop="startDate" :datetime="event.dateISO">{{ event.date }}</p>
            </div>
          </div>

          <p class="event-card-summary" itemprop="description">{{ event.format }}</p>

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
              <dt>Entry</dt>
              <dd>{{ event.entryFee }}</dd>
            </div>
            <div>
              <dt>Prize</dt>
              <dd>{{ event.prize }}</dd>
            </div>
          </dl>

          <div class="event-division-row" aria-label="Tournament divisions">
            <span v-for="division in event.divisions" :key="division.name">{{ division.name }}</span>
          </div>

          <div class="event-card-status-row">
            <span>{{ event.capacity }}</span>
            <span>{{ event.entries }}</span>
            <span>{{ event.timeControl }}</span>
          </div>

          <div class="event-tag-row" aria-label="Event tags">
            <span v-for="tag in event.tags" :key="tag">{{ tag }}</span>
          </div>

          <div class="event-card-actions">
            <RouterLink class="hero-primary" :to="{ name: 'event-detail', params: { slug: event.slug } }">
              View Details
            </RouterLink>
            <RouterLink class="secondary-button" to="/submit-event">
              Submit Event
            </RouterLink>
          </div>
        </article>
      </template>
    </section>

    <section class="event-detail-preview" aria-labelledby="event-detail-preview-title">
      <div>
        <p class="eyebrow">Event rooms roadmap</p>
        <h2 id="event-detail-preview-title">The operating layer behind every public listing</h2>
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
