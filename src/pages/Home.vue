<script setup>
import { RouterLink } from 'vue-router'

const productCards = [
  {
    label: 'Play',
    title: 'Live Games',
    description: 'Create invite links, join boards, play legal moves, track clocks, and continue games in one focused space.',
    badge: 'Live',
    meta: ['10:00', '09:42', '24 moves'],
    icon: '/home-icons/chessboard-premium.png',
  },
  {
    label: 'Events',
    title: 'Tournament Assistant',
    description: 'Create tournaments, register players, generate rounds, enter results, and keep standings moving.',
    badge: 'Active',
    meta: ['Round 3', '16 players', '4 boards'],
    icon: '/home-icons/trophy-premium.png',
  },
  {
    label: 'Training',
    title: 'Coaching Tools',
    description: 'Prepare student plans, review games, assign training work, and keep progress visible as the platform grows.',
    badge: 'Coming Soon',
    meta: ['82% tactics', '3 reviews', '5 tasks'],
    icon: '/home-icons/graduation-cap-premium.png',
  },
]

const reasons = [
  {
    icon: 'events',
    title: 'Designed for real chess events',
    description: 'Built around club nights, school tournaments, coaching academies, and the operational work behind them.',
    image: '/home-icons/community-premium.png',
  },
  {
    icon: 'flow',
    title: 'Simple tournament flow',
    description: 'Start with registration, generate pairings, record results, and move from round to round without spreadsheet friction.',
    image: '/home-icons/trophy-premium.png',
  },
  {
    icon: 'growth',
    title: 'Ready for growth',
    description: 'A clean foundation for calendars, content, admin tools, coaching workflows, and richer player histories.',
    image: '/home-icons/growth-premium.png',
  },
]

const userTypes = [
  {
    title: 'For Players',
    description: 'Join games, follow tournament boards, review results, and keep your chess activity in one place.',
  },
  {
    title: 'For Coaches',
    description: 'Organize students, connect training to games, and build structured improvement plans around real play.',
  },
  {
    title: 'For Organisers',
    description: 'Run events, manage participants, publish pairings, enter results, and keep standings transparent.',
  },
]
</script>

<template>
  <main class="home-page">
    <section class="home-hero">
      <div class="hero-copy">
        <p class="eyebrow">Chess operations platform</p>
        <h1>
          Run chess tournaments.<br />
          <span>Coach</span> players.<br />
          Manage live games.
        </h1>
        <p class="hero-description">
          GambitForge is a modern chess platform for clubs, coaches, players, and tournament organisers.
        </p>

        <div class="hero-actions">
          <RouterLink class="button-link hero-primary" to="/register">Get Started</RouterLink>
          <RouterLink class="button-link secondary-link" to="/tournaments">View Tournaments</RouterLink>
        </div>

        <p class="hero-supporting-line">
          Built for local clubs, coaching academies, schools, and tournament directors.
        </p>
      </div>

      <aside class="hero-concept-visual" aria-label="GambitForge product preview">
        <div class="hero-dashboard-card">
          <div class="hero-dashboard-topbar">
            <span class="mockup-brand">
              <img src="/gambitforge-logo-web.png" alt="" width="28" height="28" />
              GambitForge
            </span>
            <span class="hero-concept-badge">Live preview</span>
          </div>

          <div class="hero-dashboard-grid">
            <RouterLink class="hero-dashboard-panel hero-live-panel" to="/games">
              <div class="preview-card-heading">
                <p class="panel-label">Live board</p>
                <span class="status-badge badge-live">Live</span>
              </div>
              <div class="hero-live-content">
                <div class="mini-board hero-mini-board" aria-hidden="true">
                  <span>&#9820;</span><span>&#9823;</span><span>&#9821;</span><span>&#9818;</span>
                  <span>&#9823;</span><span></span><span>&#9823;</span><span></span>
                  <span></span><span>&#9817;</span><span></span><span>&#9816;</span>
                  <span>&#9817;</span><span>&#9812;</span><span></span><span>&#9814;</span>
                </div>
                <div class="hero-move-list">
                  <strong>Board 1</strong>
                  <span>White to move</span>
                  <small>21. Nc3 Nf6</small>
                  <small>22. Bg5 Be7</small>
                  <small>23. O-O O-O</small>
                </div>
              </div>
            </RouterLink>

            <RouterLink class="hero-dashboard-panel hero-standings-panel" to="/tournaments">
              <div class="preview-card-heading">
                <p class="panel-label">Standings</p>
                <span class="status-badge badge-active">Active</span>
              </div>
              <ol class="hero-standings-list">
                <li><span>1. A. Novak</span><strong>3.0</strong></li>
                <li><span>2. M. Petrov</span><strong>2.5</strong></li>
                <li><span>3. S. Chen</span><strong>2.0</strong></li>
                <li><span>4. L. Garcia</span><strong>2.0</strong></li>
              </ol>
              <span class="dashboard-panel-link">Full standings</span>
            </RouterLink>

            <RouterLink class="hero-dashboard-panel hero-activity-panel" to="/tournaments">
              <p class="panel-label">Tournament activity</p>
              <h3>Round 3</h3>
              <p>Pairings generated. 4 results pending.</p>
              <span class="progress-track"><span style="width: 56%"></span></span>
            </RouterLink>

            <RouterLink class="hero-dashboard-panel hero-coaching-panel" to="/coaching">
              <p class="panel-label">Coaching progress</p>
              <div class="hero-progress-row">
                <strong>82%</strong>
                <span class="hero-sparkline" aria-hidden="true"></span>
              </div>
              <p>Endgame review and tactics assigned.</p>
            </RouterLink>
          </div>
        </div>
      </aside>
    </section>

    <section class="landing-section" aria-labelledby="product-snapshot-heading">
      <div class="section-kicker">
        <p class="eyebrow">Product snapshot</p>
        <h2 id="product-snapshot-heading">The core tools your chess room needs first</h2>
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
              <img :src="card.icon" alt="" width="40" height="40" />
            </span>
            <span class="status-badge" :class="`badge-${card.badge.toLowerCase().replace(' ', '-')}`">
              {{ card.badge }}
            </span>
          </div>
          <div class="feature-visual" :class="`feature-visual-${index + 1}`" aria-hidden="true">
            <div v-if="index === 0" class="feature-game-preview">
              <div class="mini-board small-board">
                <span>&#9820;</span><span></span><span>&#9821;</span><span></span>
                <span></span><span>&#9823;</span><span></span><span>&#9822;</span>
                <span>&#9817;</span><span></span><span>&#9816;</span><span></span>
                <span></span><span>&#9812;</span><span></span><span>&#9814;</span>
              </div>
              <div class="feature-clock-list">
                <span>A. Novak <strong>02:45</strong></span>
                <span>M. Petrov <strong>02:31</strong></span>
              </div>
            </div>
            <ol v-else-if="index === 1" class="mock-standings compact">
              <li><span>Round 3</span><strong>View pairings</strong></li>
              <li><span>A. Novak</span><strong>3.0</strong></li>
              <li><span>M. Petrov</span><strong>2.5</strong></li>
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
            <img :src="reason.image" alt="" width="40" height="40" />
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
        <RouterLink class="button-link hero-primary" to="/register">Create Account</RouterLink>
        <RouterLink class="button-link secondary-link" to="/tournaments">Explore Tournaments</RouterLink>
      </div>
    </section>
  </main>
</template>
