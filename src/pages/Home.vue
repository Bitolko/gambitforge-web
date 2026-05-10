<script setup>
import { RouterLink } from 'vue-router'

const productCards = [
  {
    label: 'Play',
    title: 'Live Games',
    description: 'Create invite links, join boards, play legal moves, track clocks, and continue games in one focused space.',
    badge: 'Live',
    meta: ['10:00', '09:42', '24 moves'],
  },
  {
    label: 'Events',
    title: 'Tournament Assistant',
    description: 'Create tournaments, register players, generate rounds, enter results, and keep standings moving.',
    badge: 'Active',
    meta: ['Round 3', '16 players', '4 boards'],
  },
  {
    label: 'Training',
    title: 'Coaching Tools',
    description: 'Prepare student plans, review games, assign training work, and keep progress visible as the platform grows.',
    badge: 'Coming Soon',
    meta: ['82% tactics', '3 reviews', '5 tasks'],
  },
]

const reasons = [
  {
    title: 'Designed for real chess events',
    description: 'Built around club nights, school tournaments, coaching academies, and the operational work behind them.',
  },
  {
    title: 'Simple tournament flow',
    description: 'Start with registration, generate pairings, record results, and move from round to round without spreadsheet friction.',
  },
  {
    title: 'Ready for growth',
    description: 'A clean foundation for calendars, content, admin tools, coaching workflows, and richer player histories.',
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
        <h1>Run chess tournaments. Coach players. Manage live games.</h1>
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

      <aside class="hero-board premium-mockup-card" aria-label="GambitForge product snapshot">
        <div class="mockup-topbar">
          <span class="mockup-brand">
            <img src="/gambitforge-logo-web.png" alt="" />
            GambitForge
          </span>
          <span class="status-badge badge-live">Live preview</span>
        </div>

        <div class="mockup-sidebar" aria-hidden="true">
          <span class="active">Tournaments</span>
          <span>Players</span>
          <span>Pairings</span>
          <span>Standings</span>
          <span>Analytics</span>
        </div>

        <div class="hero-logo-panel">
          <div>
            <p class="panel-label">GambitForge</p>
            <strong>Chess command center</strong>
            <span>Tournaments / coaching / live games</span>
          </div>
        </div>

        <div class="hero-snapshot-grid">
          <article class="hero-preview-card board-preview-card">
            <div class="preview-card-heading">
              <p class="panel-label">Live board</p>
              <span class="status-badge badge-live">Live</span>
            </div>
            <div class="mini-board" aria-hidden="true">
              <span>&#9820;</span><span></span><span>&#9821;</span><span>&#9819;</span>
              <span></span><span>&#9823;</span><span></span><span>&#9822;</span>
              <span>&#9817;</span><span></span><span>&#9816;</span><span></span>
              <span></span><span>&#9812;</span><span></span><span>&#9814;</span>
            </div>
            <strong>Board 1 / 10+0</strong>
            <span>White to move after 24 moves</span>
          </article>
          <article class="hero-preview-card standings-preview">
            <div class="preview-card-heading">
              <p class="panel-label">Standings</p>
              <span class="status-badge badge-active">Active</span>
            </div>
            <ol class="mock-standings">
              <li><span>1. A. Novak</span><strong>3.0</strong></li>
              <li><span>2. M. Petrov</span><strong>2.5</strong></li>
              <li><span>3. S. Chen</span><strong>2.0</strong></li>
            </ol>
          </article>
          <article class="hero-preview-card">
            <p class="panel-label">Activity</p>
            <strong>Round 3</strong>
            <span>Pairings generated / 4 results pending</span>
            <div class="progress-track"><span style="width: 68%"></span></div>
          </article>
          <article class="hero-preview-card">
            <p class="panel-label">Coaching</p>
            <strong>82% progress</strong>
            <span>Endgame review and tactics assigned</span>
            <div class="progress-track blue"><span style="width: 82%"></span></div>
          </article>
        </div>

        <div class="mockup-activity-strip">
          <span><strong>Pairings published</strong><small>Round 6</small></span>
          <span><strong>Game finished</strong><small>Board 7</small></span>
          <span><strong>Result submitted</strong><small>Board 2</small></span>
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
            <span class="status-badge" :class="`badge-${card.badge.toLowerCase().replace(' ', '-')}`">
              {{ card.badge }}
            </span>
          </div>
          <div class="feature-visual" :class="`feature-visual-${index + 1}`" aria-hidden="true">
            <div v-if="index === 0" class="mini-board small-board">
              <span>&#9820;</span><span></span><span>&#9821;</span><span></span>
              <span></span><span>&#9823;</span><span></span><span>&#9822;</span>
              <span>&#9817;</span><span></span><span>&#9816;</span><span></span>
              <span></span><span>&#9812;</span><span></span><span>&#9814;</span>
            </div>
            <ol v-else-if="index === 1" class="mock-standings compact">
              <li><span>Board 1</span><strong>1-0</strong></li>
              <li><span>Board 2</span><strong>Live</strong></li>
              <li><span>Board 3</span><strong>Draw</strong></li>
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
          class="landing-card subtle-card"
          :class="`stagger-${index + 1}`"
        >
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
