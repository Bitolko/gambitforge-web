<script setup>
import { RouterLink } from 'vue-router'

const timeControls = [
  { label: 'Blitz', value: '3+2', detail: 'Fast club nights and social events' },
  { label: 'Rapid', value: '10+0', detail: 'Beginner-friendly one-day tournaments' },
  { label: 'Rapid+', value: '15+10', detail: 'Rated weekend and junior events' },
  { label: 'Classical', value: '60+30', detail: 'Serious opens and championship sections' },
]

const workflowCards = [
  {
    title: 'Registration',
    description: 'Collect player details, divisions, waitlists, and organiser review state before round one.',
  },
  {
    title: 'Pairings',
    description: 'Publish board numbers, colours, byes, floats, and round status in a player-friendly room.',
  },
  {
    title: 'Standings',
    description: 'Show scores, tie-breaks, rating groups, teams, and section leaders without spreadsheet chaos.',
  },
]

const audienceCards = [
  'Club rapid nights',
  'Junior school events',
  'Weekend classical opens',
  'State association tournaments',
  'Coaching academy events',
  'Community chess festivals',
]
</script>

<template>
  <main class="platform-page public-tournaments-page trust-page">
    <section class="platform-hero public-tournaments-hero trust-hero" aria-labelledby="tournaments-title">
      <div>
        <p class="eyebrow">Tournament management</p>
        <h1 id="tournaments-title">Run Australian chess tournaments with less friction.</h1>
        <p>
          GambitForge tournament rooms are being shaped for organisers who need clear registration,
          pairings, standings, results, and public event communication. Backend tournament operations
          are currently private beta.
        </p>
        <div class="hero-actions trust-hero-actions">
          <RouterLink class="hero-primary" to="/contact">Request Organiser Access</RouterLink>
          <RouterLink class="secondary-button" to="/events">View Public Events</RouterLink>
        </div>
      </div>

      <aside class="tournament-public-panel trust-signal-panel" aria-label="Tournament room preview">
        <span class="coming-soon-badge">Demo/Beta</span>
        <h2>Round 3 control room</h2>
        <div class="control-preview-list">
          <span>Registrations reviewed</span>
          <span>Pairings generated</span>
          <span>Results pending</span>
          <span>Standings ready</span>
        </div>
      </aside>
    </section>

    <section class="trust-intro-section" aria-labelledby="tournament-mission-title">
      <div>
        <p class="eyebrow">Public MVP status</p>
        <h2 id="tournament-mission-title">Tournament tools are real product direction, not a public account promise yet.</h2>
      </div>
      <p>
        Public visitors can discover events and contact GambitForge now. Organiser dashboards, live tournament
        rooms, player entries, and admin workflows will open through early access once the production backend is deployed.
      </p>
    </section>

    <section class="trust-roadmap-section" aria-labelledby="time-control-title">
      <div class="section-kicker">
        <p class="eyebrow">Supported formats</p>
        <h2 id="time-control-title">Time controls for the way Australian events actually run.</h2>
      </div>
      <div class="time-control-picker public-time-control-grid">
        <article v-for="control in timeControls" :key="control.value" class="time-control-card public-time-control-card">
          <span>{{ control.label }}</span>
          <strong>{{ control.value }}</strong>
          <small>{{ control.detail }}</small>
        </article>
      </div>
    </section>

    <section class="about-section-grid trust-card-grid" aria-label="Tournament workflow preview">
      <article v-for="card in workflowCards" :key="card.title" class="trust-card">
        <span class="coming-soon-badge">Workflow</span>
        <h2>{{ card.title }}</h2>
        <p>{{ card.description }}</p>
      </article>
    </section>

    <section class="trust-users-section" aria-labelledby="tournament-audience-title">
      <div>
        <p class="eyebrow">Built for</p>
        <h2 id="tournament-audience-title">From club rooms to school halls.</h2>
      </div>
      <div class="trust-user-grid">
        <span v-for="audience in audienceCards" :key="audience">{{ audience }}</span>
      </div>
    </section>

    <section class="final-cta-section trust-final-cta" aria-labelledby="tournament-cta-title">
      <div>
        <p class="eyebrow">Early access</p>
        <h2 id="tournament-cta-title">Planning an Australian chess tournament?</h2>
        <p>Tell us about your event, sections, venue, and current workflow so GambitForge can support the right organiser tools first.</p>
      </div>
      <div class="hero-actions final-cta-actions">
        <RouterLink class="hero-primary" to="/contact">Contact GambitForge</RouterLink>
        <RouterLink class="secondary-button" to="/submit-event">Submit Event</RouterLink>
      </div>
    </section>
  </main>
</template>
