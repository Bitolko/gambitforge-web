<script setup>
import { RouterLink } from 'vue-router'

const productCards = [
  {
    label: 'Discovery',
    title: 'Australian Event Pages',
    description: 'Find real tournaments, club nights, junior events, venues, time controls, organisers, and registration status in one place.',
    badge: 'Active',
    meta: ['Sydney', 'Melbourne', 'Brisbane'],
    icon: '/home-icons/trophy-premium.webp',
  },
  {
    label: 'Organisers',
    title: 'Submit Event Pipeline',
    description: 'Give clubs and tournament directors a polished way to send event information for public discovery.',
    badge: 'Beta',
    meta: ['Venue', 'Divisions', 'Schedule'],
    icon: '/home-icons/community-premium.webp',
  },
  {
    label: 'Ecosystem',
    title: 'Clubs, Coaches and Guides',
    description: 'Support discovery with club profiles, coaching context, beginner guides, and practical tournament education.',
    badge: 'Support',
    meta: ['Clubs', 'Coaches', 'Blog'],
    icon: '/home-icons/graduation-cap-premium.webp',
  },
]

const reasons = [
  {
    icon: 'events',
    title: 'Events are the front door',
    description: 'Players should be able to understand what is happening, where it is, who runs it, and whether it fits them before they enter.',
    image: '/home-icons/community-premium.webp',
  },
  {
    icon: 'flow',
    title: 'Organiser context matters',
    description: 'Venue notes, sections, time control, registration status, and organiser details build trust before backend workflows arrive.',
    image: '/home-icons/trophy-premium.webp',
  },
  {
    icon: 'growth',
    title: 'A platform can grow around discovery',
    description: 'Clubs, coaching, article guides, tournament rooms, standings, and pairings all make more sense once events are easy to find.',
    image: '/home-icons/growth-premium.webp',
  },
]

const userTypes = [
  {
    title: 'For Players and Parents',
    description: 'Find upcoming chess opportunities with clear dates, venues, formats, sections, and preparation guidance.',
  },
  {
    title: 'For Coaches',
    description: 'Connect training advice to actual events, first tournaments, junior pathways, and club opportunities.',
  },
  {
    title: 'For Organisers',
    description: 'Promote events professionally now, then connect registrations, pairings, standings, and dashboards later.',
  },
]
</script>

<template>
  <main class="home-page">
    <section class="home-hero">
      <div class="hero-copy">
        <p class="eyebrow">Australian chess events discovery</p>
        <h1>
          Find Australian chess events worth showing up for.
        </h1>
        <p class="hero-description">
          GambitForge is becoming the premium public calendar for Australian chess tournaments,
          club nights, junior competitions, venues, organisers, and tournament-ready event pages.
        </p>

        <div class="hero-actions home-primary-actions">
          <RouterLink class="button-link hero-primary" to="/events">Browse Events</RouterLink>
          <RouterLink class="button-link secondary-link" to="/submit-event">Submit Event</RouterLink>
        </div>

        <p class="hero-supporting-line">
          Clubs, coaches, schools, and organisers support the ecosystem around the event directory.
        </p>
      </div>

      <aside class="hero-concept-visual" aria-label="GambitForge product preview">
        <div class="hero-dashboard-card">
          <div class="hero-dashboard-topbar">
            <span class="mockup-brand">
              <img src="/gambitforge-logo-ui.webp" alt="" width="28" height="28" />
              GambitForge
            </span>
            <span class="hero-concept-badge">Live preview</span>
          </div>

          <div class="hero-dashboard-grid">
            <RouterLink class="hero-dashboard-panel hero-live-panel" to="/events/sydney-harbour-classical">
              <div class="preview-card-heading">
                <p class="panel-label">Featured event</p>
                <span class="status-badge badge-live">Open</span>
              </div>
              <div class="home-event-feature">
                <span>27-28 Jun</span>
                <strong>Sydney Harbour Classical</strong>
                <small>UTS Building 11, Broadway / Classical 60+30</small>
              </div>
            </RouterLink>

            <RouterLink class="hero-dashboard-panel hero-standings-panel" to="/events">
              <div class="preview-card-heading">
                <p class="panel-label">Event map</p>
                <span class="status-badge badge-active">Active</span>
              </div>
              <ol class="hero-standings-list">
                <li><span>NSW</span><strong>Classical</strong></li>
                <li><span>VIC</span><strong>Rapid</strong></li>
                <li><span>QLD</span><strong>Junior</strong></li>
                <li><span>WA</span><strong>Blitz</strong></li>
              </ol>
              <span class="dashboard-panel-link">View calendar</span>
            </RouterLink>

            <RouterLink class="hero-dashboard-panel hero-activity-panel" to="/submit-event">
              <p class="panel-label">Organiser intake</p>
              <h2>Submit Event</h2>
              <p>Send venue, schedule, divisions, organiser, and registration details.</p>
              <span class="progress-track"><span style="width: 56%"></span></span>
            </RouterLink>

            <RouterLink class="hero-dashboard-panel hero-coaching-panel" to="/blog">
              <p class="panel-label">Editorial support</p>
              <div class="hero-progress-row">
                <strong>Guides</strong>
                <span class="hero-sparkline" aria-hidden="true"></span>
              </div>
              <p>Beginner tournament guides, Swiss pairing explainers, and club discovery advice.</p>
            </RouterLink>
          </div>
        </div>
      </aside>
    </section>

    <section class="landing-section" aria-labelledby="product-snapshot-heading">
      <div class="section-kicker">
        <p class="eyebrow">Product direction</p>
        <h2 id="product-snapshot-heading">Start with the public event page. Grow the platform around it.</h2>
      </div>

      <div class="landing-card-grid">
        <article
          v-for="(card, index) in productCards"
          :key="card.title"
          class="landing-card"
          :class="`stagger-${index + 1}`"
        >
          <div class="preview-card-heading">
            <p class="panel-label">{{ card.label }}</p>
            <span class="feature-icon-pill" :class="`feature-icon-${index + 1}`" aria-hidden="true">
              <img :src="card.icon" alt="" width="40" height="40" loading="lazy" decoding="async" />
            </span>
            <span class="status-badge" :class="`badge-${card.badge.toLowerCase().replace(' ', '-')}`">
              {{ card.badge }}
            </span>
          </div>
          <div class="feature-visual" :class="`feature-visual-${index + 1}`" aria-hidden="true">
            <div v-if="index === 0" class="feature-game-preview home-event-mini">
              <span>Sydney Harbour Classical</span>
              <span>Melbourne Winter Rapid</span>
              <span>Brisbane Scholastic Teams</span>
            </div>
            <ol v-else-if="index === 1" class="mock-standings compact">
              <li><span>Submission</span><strong>Reviewed</strong></li>
              <li><span>NSW Chess Association</span><strong>Open</strong></li>
              <li><span>Melbourne Chess Club</span><strong>Rapid</strong></li>
            </ol>
            <div v-else class="coach-bars">
              <span style="width: 82%"></span>
              <span style="width: 64%"></span>
              <span style="width: 76%"></span>
            </div>
          </div>
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <div class="feature-meta-row">
            <span v-for="item in card.meta" :key="item">{{ item }}</span>
          </div>
        </article>
      </div>
    </section>

    <section class="landing-section landing-band" aria-labelledby="why-heading">
      <div class="section-kicker">
        <p class="eyebrow">Why GambitForge</p>
        <h2 id="why-heading">A practical platform for the work behind better chess events</h2>
      </div>

      <div class="landing-card-grid">
        <article
          v-for="(reason, index) in reasons"
          :key="reason.title"
          class="landing-card subtle-card why-card"
          :class="`stagger-${index + 1}`"
        >
          <span class="why-icon" :class="`why-icon-${reason.icon}`" aria-hidden="true">
            <img :src="reason.image" alt="" width="40" height="40" loading="lazy" decoding="async" />
          </span>
          <h3>{{ reason.title }}</h3>
          <p>{{ reason.description }}</p>
        </article>
      </div>
    </section>

    <section class="landing-section" aria-labelledby="user-types-heading">
      <div class="section-kicker">
        <p class="eyebrow">Who it is for</p>
        <h2 id="user-types-heading">One workspace for the people who make chess happen</h2>
      </div>

      <div class="landing-card-grid">
        <article
          v-for="(type, index) in userTypes"
          :key="type.title"
          class="landing-card audience-card"
          :class="`stagger-${index + 1}`"
        >
          <h3>{{ type.title }}</h3>
          <p>{{ type.description }}</p>
        </article>
      </div>
    </section>

    <section class="final-cta-section" aria-labelledby="final-cta-heading">
      <div>
        <p class="eyebrow">Start building</p>
        <h2 id="final-cta-heading">Ready to forge your next chess event?</h2>
      </div>

      <div class="hero-actions final-cta-actions">
        <RouterLink class="button-link hero-primary" to="/submit-event">Submit Event</RouterLink>
        <RouterLink class="button-link secondary-link" to="/contact">Contact GambitForge</RouterLink>
      </div>
    </section>
  </main>
</template>
