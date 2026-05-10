<script setup>
const calendarFeatures = [
  {
    title: 'Upcoming Tournaments',
    description: 'Surface upcoming events, registration windows, round times, and tournament details in one planning view.',
  },
  {
    title: 'Coaching Sessions',
    description: 'Keep lesson blocks, student reviews, and recurring training sessions visible alongside club activity.',
  },
  {
    title: 'Club Events',
    description: 'Publish club nights, arenas, workshops, and community events before they need full tournament tooling.',
  },
]
</script>

<template>
  <main class="platform-page">
    <section class="platform-hero" aria-labelledby="calendar-title">
      <p class="eyebrow">Calendar</p>
      <h1 id="calendar-title">Plan Every Chess Event in One Place</h1>
      <p>
        Track upcoming tournaments, coaching sessions, and club events so players know what is happening next before the full scheduling tools arrive.
      </p>
    </section>

    <section class="platform-feature-grid" aria-label="Calendar features">
      <article v-for="feature in calendarFeatures" :key="feature.title" class="platform-feature-card">
        <span class="coming-soon-badge">Coming soon</span>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
        <button class="secondary-button" type="button" disabled>Coming soon</button>
      </article>
    </section>
  </main>
</template>
