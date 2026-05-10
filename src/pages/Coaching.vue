<script setup>
const coachingFeatures = [
  {
    title: 'Student Management',
    description: 'Keep player profiles, goals, session notes, and improvement priorities organized in one coaching workspace.',
  },
  {
    title: 'Training Assignments',
    description: 'Assign calculation drills, opening prep, endgame work, and study tasks that match each student plan.',
  },
  {
    title: 'Game Review',
    description: 'Review games, capture recurring mistakes, and turn analysis into clear next steps for measurable progress.',
  },
]
</script>

<template>
  <main class="platform-page">
    <section class="platform-hero" aria-labelledby="coaching-title">
      <p class="eyebrow">Coaching</p>
      <h1 id="coaching-title">Coaching Tools for Serious Chess Improvement</h1>
      <p>
        Manage students, assign focused training work, review games, and track progress across every stage of a player&apos;s development.
      </p>
    </section>

    <section class="platform-feature-grid" aria-label="Coaching features">
      <article v-for="feature in coachingFeatures" :key="feature.title" class="platform-feature-card">
        <span class="coming-soon-badge">Coming soon</span>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
        <button class="secondary-button" type="button" disabled>Coming soon</button>
      </article>
    </section>
  </main>
</template>
