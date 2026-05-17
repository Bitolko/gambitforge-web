<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const clubs = [
  {
    slug: 'sydney-academy-of-chess',
    name: 'Sydney Academy of Chess',
    location: 'Sydney, NSW',
    state: 'NSW',
    description: 'A modern junior chess academy supporting school programs, private coaching, weekend competitions, and long-term player development across Sydney.',
    coaching: 'Group classes, private coaching, online training, school term programs, and holiday camps.',
    contact: 'Sydney Academy enquiry via gambitforgeinfo@gmail.com',
    website: 'Public profile through GambitForge',
    events: ['Sydney Junior Open', 'North Shore School Rapid', 'Harbour Academy Training Day'],
    tags: ['Junior', 'School', 'Community'],
  },
  {
    slug: 'melbourne-chess-club',
    name: 'Melbourne Chess Club',
    location: 'Melbourne, VIC',
    state: 'VIC',
    description: 'A central Melbourne chess community for club nights, rated tournaments, adult improvers, coaching sessions, and interclub teams.',
    coaching: 'Adult improvement groups, junior starters, opening workshops, and tournament preparation.',
    contact: 'Melbourne Chess Club enquiry via gambitforgeinfo@gmail.com',
    website: 'Public profile through GambitForge',
    events: ['Melbourne Rapid Championship', 'Victorian Club Teams', 'Friday Blitz Social'],
    tags: ['Adult', 'Community'],
  },
  {
    slug: 'perth-junior-chess-association',
    name: 'Perth Junior Chess Association',
    location: 'Perth, WA',
    state: 'WA',
    description: 'A junior-focused association connecting schools, families, coaches, and organisers through regular training squads and competitions.',
    coaching: 'Junior squads, school coaching, beginner pathways, and representative event preparation.',
    contact: 'Perth junior chess enquiry via gambitforgeinfo@gmail.com',
    website: 'Public profile through GambitForge',
    events: ['Perth Blitz Arena', 'WA School Teams', 'Perth Junior League'],
    tags: ['Junior', 'School'],
  },
  {
    slug: 'gold-coast-chess-academy',
    name: 'Gold Coast Chess Academy',
    location: 'Gold Coast, QLD',
    state: 'QLD',
    description: 'A friendly academy for juniors, families, and club players with coaching groups, club nights, and regional tournament support.',
    coaching: 'Beginner classes, family chess sessions, junior squads, and club training nights.',
    contact: 'Gold Coast academy enquiry via gambitforgeinfo@gmail.com',
    website: 'Public profile through GambitForge',
    events: ['Gold Coast Open', 'Coastal Junior Rapid', 'Queensland Academy Camp'],
    tags: ['Junior', 'Adult', 'Community'],
  },
]

const memberTools = ['Member directory', 'Student groups', 'Attendance', 'Club announcements', 'Coach notes']

const currentClub = computed(() => (
  clubs.find((club) => club.slug === route.params.slug) || clubs[0]
))
</script>

<template>
  <main class="club-detail-page">
    <section
      class="club-detail-hero"
      aria-labelledby="club-detail-title"
      itemscope
      itemtype="https://schema.org/Organization"
    >
      <div class="club-detail-logo" aria-hidden="true">{{ currentClub.name.slice(0, 2) }}</div>
      <div class="club-detail-copy">
        <RouterLink class="back-link" to="/clubs">Clubs</RouterLink>
        <div class="event-hero-badges">
          <span class="status-badge badge-active">{{ currentClub.state }}</span>
          <span v-for="tag in currentClub.tags" :key="tag" class="event-chip">{{ tag }}</span>
        </div>
        <h1 id="club-detail-title" itemprop="name">{{ currentClub.name }}</h1>
        <p itemprop="description">{{ currentClub.description }}</p>
      </div>
    </section>

    <section class="club-profile-grid" aria-label="Club profile">
      <article class="club-profile-card">
        <p class="eyebrow">Location</p>
        <h2>{{ currentClub.location }}</h2>
        <p>Public club location details, venue maps, parking notes, and accessibility information can appear here.</p>
      </article>

      <article class="club-profile-card">
        <p class="eyebrow">Coaching</p>
        <h2>Programs and training</h2>
        <p>{{ currentClub.coaching }}</p>
      </article>

      <article class="club-profile-card">
        <p class="eyebrow">Contact</p>
        <h2>Get in touch</h2>
        <p>{{ currentClub.contact }}</p>
        <button class="hero-primary" type="button" disabled>Visit Website</button>
      </article>
    </section>

    <section class="club-events-section" aria-labelledby="club-events-title">
      <div class="section-kicker">
        <p class="eyebrow">Upcoming events</p>
        <h2 id="club-events-title">Events hosted or supported by {{ currentClub.name }}</h2>
      </div>

      <div class="related-events-grid">
        <article v-for="event in currentClub.events" :key="event" class="event-card">
          <div class="preview-card-heading">
            <p class="panel-label">{{ currentClub.location }}</p>
            <span class="status-badge badge-active">Listed</span>
          </div>
          <div class="event-card-main">
            <h2>{{ event }}</h2>
            <p>Club-supported event profile for public discovery</p>
          </div>
          <RouterLink class="secondary-button club-card-link" to="/events">Browse Events</RouterLink>
        </article>
      </div>
    </section>

    <section class="club-members-preview" aria-labelledby="club-members-title">
      <div>
        <p class="eyebrow">Club operations roadmap</p>
        <h2 id="club-members-title">Members and students, organised for real club life</h2>
      </div>

      <div class="event-tools-grid">
        <article v-for="tool in memberTools" :key="tool" class="event-tool-card">
          <span class="coming-soon-badge">Roadmap</span>
          <h3>{{ tool }}</h3>
          <p>Planned workflow for club administration, coaching, and community communication.</p>
        </article>
      </div>
    </section>
  </main>
</template>
