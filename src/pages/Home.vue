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
        <div class="board-preview">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="hero-stat">
          <p class="panel-label">Live round</p>
          <strong>Board 1</strong>
          <span>White to move / 10+0</span>
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

    <section id="clubs" class="club-section">
      <div>
        <p class="eyebrow">For clubs</p>
        <h2>Designed for local chess clubs, academies, schools, and tournament directors.</h2>
      </div>
      <p>
        Use GambitForge to run a club night, keep pairings transparent, give players invite links, track scores, and move from casual games to organized events without changing tools.
      </p>
    </section>

    <section id="coaching" class="club-section split-section">
      <div>
        <p class="eyebrow">Coaching</p>
        <h2>Coach players with the same system that records their games.</h2>
      </div>
      <p>
        The coaching layer is ready for lesson calendars, annotated games, student goals, and academy workflows as the product grows.
      </p>
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
