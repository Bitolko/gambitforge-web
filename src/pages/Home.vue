<script setup>
import { RouterLink } from 'vue-router'

const productCards = [
  {
    label: 'Play',
    title: 'Live Games',
    description: 'Create invite links, join boards, play legal moves, track clocks, and continue games in one focused space.',
  },
  {
    label: 'Events',
    title: 'Tournament Assistant',
    description: 'Create tournaments, register players, generate rounds, enter results, and keep standings moving.',
  },
  {
    label: 'Training',
    title: 'Coaching Tools',
    description: 'Prepare student plans, review games, assign training work, and keep progress visible as the platform grows.',
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

      <aside class="hero-board" aria-label="GambitForge product snapshot">
        <div class="hero-logo-panel">
          <span class="hero-logo-frame">
            <img src="/gambitforge-logo-web.png" alt="GambitForge logo" />
          </span>
          <div>
            <p class="panel-label">GambitForge</p>
            <strong>Chess command center</strong>
            <span>Tournaments / coaching / live games</span>
          </div>
        </div>

        <div class="hero-snapshot-grid">
          <article>
            <p class="panel-label">Tournament</p>
            <strong>Round 1</strong>
            <span>Pairings ready</span>
          </article>
          <article>
            <p class="panel-label">Game</p>
            <strong>Board 1</strong>
            <span>White to move / 10+0</span>
          </article>
          <article>
            <p class="panel-label">Coaching</p>
            <strong>Training block</strong>
            <span>Review and assign work</span>
          </article>
        </div>
      </aside>
    </section>

    <section class="landing-section" aria-labelledby="product-snapshot-heading">
      <div class="section-kicker">
        <p class="eyebrow">Product snapshot</p>
        <h2 id="product-snapshot-heading">The core tools your chess room needs first</h2>
      </div>

      <div class="landing-card-grid">
        <article v-for="card in productCards" :key="card.title" class="landing-card">
          <p class="panel-label">{{ card.label }}</p>
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </article>
      </div>
    </section>

    <section class="landing-section landing-band" aria-labelledby="why-heading">
      <div class="section-kicker">
        <p class="eyebrow">Why GambitForge</p>
        <h2 id="why-heading">A practical platform for the work behind better chess events</h2>
      </div>

      <div class="landing-card-grid">
        <article v-for="reason in reasons" :key="reason.title" class="landing-card subtle-card">
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
        <article v-for="type in userTypes" :key="type.title" class="landing-card audience-card">
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
