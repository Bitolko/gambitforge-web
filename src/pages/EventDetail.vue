<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { eventExperiences, findEventBySlug } from '../data/events'

const route = useRoute()

const liveTools = [
  { title: 'Standings', detail: 'Section tables, tie-breaks, live rank movement, and rating-group filters.' },
  { title: 'Pairings', detail: 'Round publishing, board numbers, byes, floats, and late-entry handling.' },
  { title: 'Live results', detail: 'Result entry, arbiter desk status, and spectator-friendly round progress.' },
  { title: 'Player list', detail: 'Entries, divisions, ratings, club or school affiliation, and waitlist status.' },
  { title: 'Announcements', detail: 'Venue notes, round delays, prize reminders, and organiser updates.' },
]

const currentEvent = computed(() => findEventBySlug(route.params.slug))

const relatedEvents = computed(() => (
  currentEvent.value?.related
    .map((slug) => eventExperiences.find((event) => event.slug === slug))
    .filter(Boolean) || []
))
</script>

<template>
  <main class="event-detail-page">
    <template v-if="currentEvent">
      <section
        class="event-detail-hero"
        aria-labelledby="event-detail-title"
        itemscope
        itemtype="https://schema.org/Event"
      >
        <div class="event-detail-hero-copy">
          <RouterLink class="back-link" to="/events">Events</RouterLink>
          <div class="event-hero-badges">
            <span class="event-registration-status" :data-status="currentEvent.registrationTone">
              {{ currentEvent.registrationStatus }}
            </span>
            <span class="event-chip">{{ currentEvent.timeControl }}</span>
            <span class="event-chip">{{ currentEvent.capacity }}</span>
          </div>
          <h1 id="event-detail-title" itemprop="name">{{ currentEvent.title }}</h1>
          <p class="event-detail-summary" itemprop="description">{{ currentEvent.format }}</p>
          <dl class="event-hero-meta">
            <div>
              <dt>Date</dt>
              <dd itemprop="startDate" :datetime="currentEvent.dateISO">{{ currentEvent.date }}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd itemprop="location" itemscope itemtype="https://schema.org/Place">
                <span itemprop="name">{{ currentEvent.venue }}</span>
              </dd>
            </div>
            <div>
              <dt>Organiser</dt>
              <dd itemprop="organizer" itemscope itemtype="https://schema.org/Organization">
                <span itemprop="name">{{ currentEvent.organiser }}</span>
              </dd>
            </div>
          </dl>
        </div>

        <aside class="event-registration-panel" aria-label="Event registration">
          <div class="event-flyer event-flyer-large" :data-tone="currentEvent.posterTone" aria-hidden="true">
            <span>{{ currentEvent.state }}</span>
            <strong>{{ currentEvent.timeControl }}</strong>
          </div>
          <p class="panel-label">Registration status</p>
          <h2>{{ currentEvent.registrationStatus }}</h2>
          <p>{{ currentEvent.entries }} for {{ currentEvent.capacity }}. Choose this event room as your model for organiser-ready public listings.</p>
          <dl class="event-registration-facts">
            <div>
              <dt>Entry</dt>
              <dd>{{ currentEvent.entryFee }}</dd>
            </div>
            <div>
              <dt>Prize</dt>
              <dd>{{ currentEvent.prize }}</dd>
            </div>
          </dl>
          <RouterLink class="hero-primary" to="/submit-event">Submit Similar Event</RouterLink>
        </aside>
      </section>

      <section class="event-info-section" aria-labelledby="event-info-title">
        <div class="section-kicker">
          <p class="eyebrow">Tournament brief</p>
          <h2 id="event-info-title">Everything players need before round one</h2>
        </div>

        <div class="event-info-grid event-info-grid-rich">
          <article class="event-info-card event-schedule-card">
            <span>Tournament schedule</span>
            <ol class="event-schedule-list">
              <li v-for="item in currentEvent.schedule" :key="`${item.time}-${item.label}`">
                <strong>{{ item.time }}</strong>
                <p>{{ item.label }}</p>
              </li>
            </ol>
          </article>

          <article class="event-info-card event-divisions-card">
            <span>Divisions</span>
            <div class="event-division-list">
              <div v-for="division in currentEvent.divisions" :key="division.name">
                <strong>{{ division.name }}</strong>
                <p>{{ division.detail }}</p>
              </div>
            </div>
          </article>

          <article class="event-info-card event-organiser-card">
            <span>Organiser</span>
            <div class="organiser-avatar" aria-hidden="true">{{ currentEvent.organiser.slice(0, 2) }}</div>
            <h3>{{ currentEvent.organiser }}</h3>
            <p>{{ currentEvent.organiserBio }}</p>
            <small>{{ currentEvent.organiserType }} / {{ currentEvent.contact }}</small>
            <div class="event-mini-list">
              <span v-for="item in currentEvent.organiserHighlights" :key="item">{{ item }}</span>
            </div>
          </article>

          <article class="event-info-card">
            <span>Arbiter desk</span>
            <p>{{ currentEvent.arbiter }}</p>
          </article>
          <article class="event-info-card">
            <span>Time control</span>
            <p>{{ currentEvent.timeControl }}</p>
          </article>
          <article class="event-info-card">
            <span>Entry and capacity</span>
            <p>{{ currentEvent.entryFee }} / {{ currentEvent.capacity }}</p>
          </article>
        </div>
      </section>

      <section class="event-live-preview-section" aria-labelledby="event-live-preview-title">
        <div>
          <p class="eyebrow">Tournament room preview</p>
          <h2 id="event-live-preview-title">Standings and pairings, ready for players to follow.</h2>
        </div>

        <div class="event-live-preview-grid">
          <article class="event-live-card">
            <div class="preview-card-heading">
              <span class="coming-soon-badge">Standings preview</span>
              <small>{{ currentEvent.divisions[0]?.name || 'Open' }}</small>
            </div>
            <ol class="event-standings-preview">
              <li v-for="row in currentEvent.standingsPreview" :key="`${row.rank}-${row.name}`">
                <span>{{ row.rank }}</span>
                <strong>{{ row.name }}</strong>
                <em>{{ row.section }}</em>
                <b>{{ row.score }}</b>
              </li>
            </ol>
          </article>

          <article class="event-live-card">
            <div class="preview-card-heading">
              <span class="coming-soon-badge">Pairings preview</span>
              <small>Next round</small>
            </div>
            <div class="event-pairings-preview">
              <div v-for="pairing in currentEvent.pairingsPreview" :key="`${pairing.board}-${pairing.white}`">
                <span>Board {{ pairing.board }}</span>
                <strong>{{ pairing.white }} vs {{ pairing.black }}</strong>
                <em>{{ pairing.result }}</em>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section class="event-venue-section" aria-labelledby="event-venue-title">
        <div class="event-venue-copy">
          <p class="eyebrow">Venue and arrival</p>
          <h2 id="event-venue-title">{{ currentEvent.venue }}</h2>
          <p>{{ currentEvent.address }}</p>
          <p>{{ currentEvent.venueInfo }}</p>
          <div class="event-mini-list">
            <span v-for="item in currentEvent.venueAmenities" :key="item">{{ item }}</span>
          </div>
        </div>
      </section>

      <section class="event-tools-preview" aria-labelledby="event-tools-title">
        <div>
          <p class="eyebrow">Event operations</p>
          <h2 id="event-tools-title">A complete tournament experience around the listing</h2>
        </div>

        <div class="event-tools-grid">
          <article v-for="tool in liveTools" :key="tool.title" class="event-tool-card">
            <span class="coming-soon-badge">Preview</span>
            <h3>{{ tool.title }}</h3>
            <p>{{ tool.detail }}</p>
          </article>
        </div>
      </section>

      <section class="event-faq-section" aria-labelledby="event-faq-title">
        <div class="section-kicker">
          <p class="eyebrow">Event FAQ</p>
          <h2 id="event-faq-title">Questions players and organisers usually ask</h2>
        </div>
        <div class="event-faq-grid">
          <article v-for="item in currentEvent.faqs" :key="item.question" class="event-faq-card">
            <h3>{{ item.question }}</h3>
            <p>{{ item.answer }}</p>
          </article>
        </div>
      </section>

      <section class="event-registration-cta" aria-labelledby="event-registration-title">
        <div>
          <p class="eyebrow">Public event product</p>
          <h2 id="event-registration-title">Built to turn a listing into a real event room</h2>
          <p>
            GambitForge can connect this public page to entries, divisions, payment state,
            pairings, standings, organiser announcements, and post-event records later.
          </p>
        </div>
        <RouterLink class="hero-primary" to="/submit-event">Submit Similar Event</RouterLink>
      </section>

      <section class="related-events-section" aria-labelledby="related-events-title">
        <div class="section-kicker">
          <p class="eyebrow">Keep playing</p>
          <h2 id="related-events-title">Related Australian chess events</h2>
        </div>

        <div class="related-events-grid">
          <article
            v-for="event in relatedEvents"
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
                <p class="panel-label">{{ event.location }}</p>
                <h2 itemprop="name">{{ event.title }}</h2>
                <p itemprop="startDate" :datetime="event.dateISO">{{ event.date }}</p>
              </div>
            </div>
            <div class="event-card-status-row">
              <span>{{ event.registrationStatus }}</span>
              <span>{{ event.entries }}</span>
            </div>
            <RouterLink class="secondary-button" :to="{ name: 'event-detail', params: { slug: event.slug } }">
              View Details
            </RouterLink>
          </article>
        </div>
      </section>
    </template>

    <section v-else class="event-empty-state event-detail-missing">
      <span class="coming-soon-badge">Event not found</span>
      <h1>That event is not listed yet</h1>
      <p>Browse the Australian chess calendar or submit a new tournament for review.</p>
      <div class="event-card-actions">
        <RouterLink class="hero-primary" to="/events">Browse Events</RouterLink>
        <RouterLink class="secondary-button" to="/submit-event">Submit Event</RouterLink>
      </div>
    </section>
  </main>
</template>
