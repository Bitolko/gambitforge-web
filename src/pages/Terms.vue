<script setup>
import { RouterLink } from 'vue-router'

const sections = [
  {
    title: 'Public MVP status',
    body:
      'GambitForge is currently presented as a public MVP with content, event discovery, club and coach profiles, contact flows, and submission previews. Backend account, game, tournament, and admin features are beta unless explicitly provided through early access.',
  },
  {
    title: 'Event and directory information',
    body:
      'Event, club, coach, and article content may include realistic placeholder or preview information while the platform is being prepared for public use. Organisers should verify details before relying on any listing.',
  },
  {
    title: 'User submissions',
    body:
      'If you submit an event or enquiry, you confirm the information is appropriate to share with GambitForge and may be used to review, prepare, or publish public-facing chess content.',
  },
  {
    title: 'No tournament guarantee',
    body:
      'GambitForge may describe planned workflows for pairings, standings, registrations, live results, and coaching tools. These features should not be treated as production guarantees until formally released.',
  },
  {
    title: 'Contact',
    body:
      'For terms, event listings, or early access questions, contact gambitforgeinfo@gmail.com.',
  },
]
</script>

<template>
  <main class="platform-page legal-page trust-page">
    <section class="platform-hero trust-hero legal-hero" aria-labelledby="terms-title">
      <div>
        <p class="eyebrow">Terms of Service</p>
        <h1 id="terms-title">Terms for using GambitForge during public MVP.</h1>
        <p>
          These terms clarify how to understand GambitForge while it is being launched as a public
          Australian chess platform with beta backend features.
        </p>
      </div>
      <aside class="trust-signal-panel legal-summary-card">
        <span class="coming-soon-badge">Beta clarity</span>
        <h2>Use public pages confidently</h2>
        <p>Events, articles, clubs, coaches, contact, and submissions are the public surface. Authenticated operations remain beta.</p>
      </aside>
    </section>

    <section class="legal-content" aria-label="Terms sections">
      <article v-for="section in sections" :key="section.title" class="trust-card legal-card">
        <h2>{{ section.title }}</h2>
        <p>{{ section.body }}</p>
      </article>
    </section>

    <section class="final-cta-section trust-final-cta" aria-labelledby="terms-cta-title">
      <div>
        <p class="eyebrow">Public platform</p>
        <h2 id="terms-cta-title">Explore the finished public MVP surface.</h2>
      </div>
      <div class="hero-actions final-cta-actions">
        <RouterLink class="hero-primary" to="/events">Browse Events</RouterLink>
        <RouterLink class="secondary-button" to="/contact">Contact GambitForge</RouterLink>
      </div>
    </section>
  </main>
</template>
