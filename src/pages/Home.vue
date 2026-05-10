<script setup>
import { RouterLink } from 'vue-router'
import FeatureCard from '../components/FeatureCard.vue'

const features = [
  {
    label: 'Director tools',
    title: 'Live Tournament Assistant',
    description: 'Create events, accept players, generate pairings, record results, and keep standings moving round by round.',
  },
  {
    label: 'Training',
    title: 'Coaching Platform',
    description: 'Keep students, game notes, improvement plans, and session workflows in one focused chess workspace.',
  },
  {
    label: 'Play',
    title: 'Live Chess Games',
    description: 'Invite opponents, play legal moves on a real board, sync FEN, track clocks, and follow games in realtime.',
  },
]

const coachingTracks = [
  {
    label: 'Assessment',
    title: 'Find the pattern',
    description: 'Review recent games, tag repeated mistakes, and turn scattered notes into a practical improvement map.',
  },
  {
    label: 'Training plan',
    title: 'Build the next block',
    description: 'Plan openings, calculation drills, endgame themes, and homework around the exact needs of each player.',
  },
  {
    label: 'Review',
    title: 'Measure progress',
    description: 'Keep session notes, assigned games, and next steps attached to the player instead of lost in messages.',
  },
]

const calendarEvents = [
  {
    date: 'May 14',
    type: 'Club night',
    title: 'Rapid Arena',
    time: '7:00 PM',
    detail: 'Four rounds, 10+0, open pairing desk.',
  },
  {
    date: 'May 18',
    type: 'Coaching',
    title: 'Calculation Lab',
    time: '6:30 PM',
    detail: 'Candidate moves, forcing lines, and post-game review.',
  },
  {
    date: 'May 24',
    type: 'Tournament',
    title: 'Weekend Swiss',
    time: '10:00 AM',
    detail: 'Rated classical event with live standings.',
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
          GambitForge brings club tournaments, player development, and live chess infrastructure into one polished workspace for organizers, coaches, and serious players.
        </p>

        <div class="hero-actions">
          <RouterLink class="button-link hero-primary" to="/register">Get Started</RouterLink>
          <RouterLink class="button-link secondary-link" to="/tournaments">View Tournaments</RouterLink>
        </div>
      </div>

      <aside class="hero-board" aria-label="GambitForge platform snapshot">
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

    <section class="features-section" aria-labelledby="platform-features">
      <div class="section-kicker">
        <p class="eyebrow">Platform</p>
        <h2 id="platform-features">Built for the work behind strong chess rooms</h2>
      </div>

      <div class="feature-grid">
        <FeatureCard
          v-for="feature in features"
          :key="feature.title"
          :label="feature.label"
          :title="feature.title"
          :description="feature.description"
        />
      </div>
    </section>

    <section id="calendar" class="calendar-section" aria-labelledby="calendar-heading">
      <div>
        <p class="eyebrow">Calendar</p>
        <h2 id="calendar-heading">Keep club events, coaching sessions, and tournament rounds in one view.</h2>
        <p>
          Plan upcoming chess activity without making players hunt through separate chats, spreadsheets, and sign-up links.
        </p>
      </div>

      <div class="calendar-list" aria-label="Upcoming events">
        <article v-for="event in calendarEvents" :key="event.title" class="calendar-event">
          <div class="calendar-date">
            <span>{{ event.date.split(' ')[0] }}</span>
            <strong>{{ event.date.split(' ')[1] }}</strong>
          </div>
          <div>
            <p class="panel-label">{{ event.type }} / {{ event.time }}</p>
            <h3>{{ event.title }}</h3>
            <p>{{ event.detail }}</p>
          </div>
        </article>
      </div>
    </section>

    <section id="coaching" class="coaching-section" aria-labelledby="coaching-heading">
      <div class="section-kicker">
        <p class="eyebrow">Coaching</p>
        <h2 id="coaching-heading">Coach players with the same system that records their games.</h2>
        <p>
          A focused coaching workspace for turning live games, tournament results, and study sessions into visible progress.
        </p>
      </div>

      <div class="coaching-grid">
        <article v-for="track in coachingTracks" :key="track.title" class="coaching-card">
          <p class="panel-label">{{ track.label }}</p>
          <h3>{{ track.title }}</h3>
          <p>{{ track.description }}</p>
        </article>
      </div>

      <aside class="coach-workbench" aria-label="Coaching workflow preview">
        <div>
          <p class="panel-label">Student focus</p>
          <h3>Improve attacking decisions</h3>
          <p>Current block: king safety, open files, and conversion after material gains.</p>
        </div>
        <div class="coach-checklist">
          <p><span></span> Review last tournament loss</p>
          <p><span></span> Assign 12 calculation puzzles</p>
          <p><span></span> Schedule follow-up game analysis</p>
        </div>
      </aside>
    </section>

    <section id="blog" class="club-section split-section">
      <div>
        <p class="eyebrow">Blog</p>
        <h2>Share tournament notes, training ideas, and club updates.</h2>
      </div>
      <p>
        The blog link is reserved for future club news, coaching articles, release notes, and tournament reports.
      </p>
    </section>
  </main>
</template>
