<script setup>
import { RouterLink } from 'vue-router'

const missionPillars = [
  {
    title: 'Make chess operations calmer',
    description:
      'Clubs and organisers should not need scattered spreadsheets, message threads, and manual updates to run a credible chess event.',
  },
  {
    title: 'Help players find real opportunities',
    description:
      'GambitForge is designed around practical discovery: events, clubs, coaches, formats, venues, and the next good reason to sit at a board.',
  },
  {
    title: 'Respect local chess communities',
    description:
      'The product is shaped for Australian clubs, schools, academies, tournament directors, parents, juniors, and adult improvers.',
  },
]

const targetUsers = [
  'Tournament organisers',
  'Chess clubs',
  'Coaching academies',
  'School coordinators',
  'Junior players and parents',
  'Adult club players',
  'Arbiters and volunteers',
  'Community partners',
]

const roadmap = [
  {
    phase: 'Now',
    title: 'Public discovery layer',
    items: ['Events directory', 'Club and coach profiles', 'Trust pages', 'Submission previews'],
  },
  {
    phase: 'Next',
    title: 'Event operations',
    items: ['Entries and waitlists', 'Tournament rooms', 'Pairings and standings', 'Organizer moderation'],
  },
  {
    phase: 'Later',
    title: 'Community platform',
    items: ['Coaching workflows', 'Club dashboards', 'Player history', 'Live results and analytics'],
  },
]
</script>

<template>
  <main class="platform-page about-page trust-page">
    <section class="platform-hero about-hero trust-hero" aria-labelledby="about-title">
      <div>
        <p class="eyebrow">About GambitForge</p>
        <h1 id="about-title">A trusted operating layer for Australian chess communities.</h1>
        <p>
          GambitForge helps players discover events, clubs, and coaches while giving organisers
          a clearer path toward registrations, tournament rooms, pairings, standings, and community workflows.
        </p>
        <div class="hero-actions trust-hero-actions">
          <RouterLink class="hero-primary" to="/events">Explore Events</RouterLink>
          <RouterLink class="secondary-button" to="/contact">Contact Us</RouterLink>
        </div>
      </div>
      <aside class="about-hero-board trust-signal-panel" aria-label="GambitForge platform map">
        <span>Events</span>
        <span>Tournaments</span>
        <span>Clubs</span>
        <span>Coaching</span>
        <span>Players</span>
        <span>Schools</span>
      </aside>
    </section>

    <section class="trust-intro-section" aria-labelledby="mission-title">
      <div>
        <p class="eyebrow">Mission</p>
        <h2 id="mission-title">Make the chess ecosystem easier to discover, run, and grow.</h2>
      </div>
      <p>
        Australian chess is full of excellent local energy: weekend opens, junior circuits, club nights,
        school teams, coaching groups, volunteers, and arbiters. GambitForge is being built to give that
        ecosystem a more polished public front door and a stronger operational backbone.
      </p>
    </section>

    <section class="about-section-grid trust-card-grid" aria-label="Mission pillars">
      <article v-for="pillar in missionPillars" :key="pillar.title" class="about-story-card trust-card">
        <span class="coming-soon-badge">Mission</span>
        <h2>{{ pillar.title }}</h2>
        <p>{{ pillar.description }}</p>
      </article>
    </section>

    <section class="trust-users-section" aria-labelledby="target-users-title">
      <div>
        <p class="eyebrow">Who it is for</p>
        <h2 id="target-users-title">Built for the people doing the work around the board.</h2>
      </div>
      <div class="trust-user-grid">
        <span v-for="user in targetUsers" :key="user">{{ user }}</span>
      </div>
    </section>

    <section class="trust-roadmap-section" aria-labelledby="roadmap-title">
      <div class="section-kicker">
        <p class="eyebrow">Platform roadmap</p>
        <h2 id="roadmap-title">A practical path from public discovery to live operations.</h2>
      </div>

      <div class="trust-roadmap-grid">
        <article v-for="step in roadmap" :key="step.phase" class="trust-roadmap-card">
          <span>{{ step.phase }}</span>
          <h3>{{ step.title }}</h3>
          <ul>
            <li v-for="item in step.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="final-cta-section about-cta trust-final-cta" aria-labelledby="about-cta-title">
      <div>
        <p class="eyebrow">Start a conversation</p>
        <h2 id="about-cta-title">Want GambitForge to support your club, event, or coaching program?</h2>
      </div>

      <div class="hero-actions final-cta-actions">
        <RouterLink class="button-link hero-primary" to="/contact">Contact Us</RouterLink>
        <RouterLink class="button-link secondary-button" to="/submit-event">Submit Event</RouterLink>
      </div>
    </section>
  </main>
</template>
