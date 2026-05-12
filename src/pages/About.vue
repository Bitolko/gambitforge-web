<script setup>
import { RouterLink } from 'vue-router'

const aboutSections = [
  {
    title: 'Why GambitForge',
    description:
      'Local clubs, coaches, schools, and organisers need better digital tools for the real work around chess: pairing players, running events, tracking activity, and keeping communities connected.',
  },
  {
    title: 'Built for real chess communities',
    description:
      'GambitForge is shaped around players, coaches, tournament directors, clubs, academies, and schools that need practical software for regular chess activity.',
  },
  {
    title: 'What we are building',
    description:
      'We are building live games, a tournament assistant, coaching tools, a calendar, a blog, and club features that help chess communities organize and grow.',
  },
]
</script>

<template>
  <main class="platform-page about-page">
    <section class="platform-hero about-hero" aria-labelledby="about-title">
      <p class="eyebrow">About</p>
      <h1 id="about-title">About GambitForge</h1>
      <p>
        GambitForge is a modern chess platform built for live games, tournament management,
        coaching, and club events.
      </p>
    </section>

    <section class="about-section-grid" aria-label="About GambitForge">
      <article v-for="section in aboutSections" :key="section.title" class="about-story-card">
        <span class="coming-soon-badge">GambitForge</span>
        <h2>{{ section.title }}</h2>
        <p>{{ section.description }}</p>
      </article>
    </section>

    <section class="final-cta-section about-cta" aria-labelledby="about-cta-title">
      <div>
        <p class="eyebrow">Start a conversation</p>
        <h2 id="about-cta-title">Want to use GambitForge for your club or event?</h2>
      </div>

      <div class="hero-actions final-cta-actions">
        <RouterLink class="button-link hero-primary" to="/contact">Contact Us</RouterLink>
      </div>
    </section>
  </main>
</template>
