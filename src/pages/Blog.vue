<script setup>
const blogFeatures = [
  {
    title: 'Tournament Guides',
    description: 'Publish practical articles for organizers, arbiters, and players preparing for stronger chess events.',
  },
  {
    title: 'Chess Improvement',
    description: 'Share training ideas, game review themes, opening habits, and study plans for serious improvement.',
  },
  {
    title: 'GambitForge Updates',
    description: 'Keep clubs and players informed as new platform tools, tournament workflows, and coaching features ship.',
  },
]
</script>

<template>
  <main class="platform-page">
    <section class="platform-hero" aria-labelledby="blog-title">
      <p class="eyebrow">Blog</p>
      <h1 id="blog-title">Chess Writing, Tournament News, and Platform Updates</h1>
      <p>
        A future home for chess improvement content, tournament guidance, product updates, and stories from the GambitForge community.
      </p>
    </section>

    <section class="platform-feature-grid" aria-label="Blog topics">
      <article v-for="feature in blogFeatures" :key="feature.title" class="platform-feature-card">
        <span class="coming-soon-badge">Coming soon</span>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
        <button class="secondary-button" type="button" disabled>Coming soon</button>
      </article>
    </section>
  </main>
</template>
