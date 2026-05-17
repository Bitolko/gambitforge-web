<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const coaches = [
  {
    slug: 'elena-morris',
    name: 'Elena Morris',
    location: 'Sydney, NSW',
    title: 'Junior development coach',
    rating: '2100+ playing strength',
    description: 'Elena helps junior players build calculation discipline, tournament confidence, and clear study habits.',
    specialties: ['Junior coaching', 'Tournament prep', 'Calculation', 'Confidence building'],
    formats: ['Online one-on-one', 'Junior groups', 'School academy sessions'],
    availability: ['Monday evenings', 'Wednesday online', 'Saturday junior squad'],
    testimonials: ['Patient, structured, and excellent with young players.', 'Clear weekly goals made practice easier.'],
  },
  {
    slug: 'daniel-kovacs',
    name: 'Daniel Kovacs',
    location: 'Melbourne, VIC',
    title: 'Tournament preparation specialist',
    rating: '2250+ playing strength',
    description: 'Daniel works with serious club players on openings, middlegame plans, and practical tournament decisions.',
    specialties: ['Tournament prep', 'Opening repertoire', 'Advanced training', 'Game review'],
    formats: ['One-on-one lessons', 'Tournament prep blocks', 'Game analysis'],
    availability: ['Tuesday evenings', 'Thursday analysis blocks', 'Sunday preparation sessions'],
    testimonials: ['The opening prep felt practical immediately.', 'My post-game review process improved fast.'],
  },
  {
    slug: 'maya-singh',
    name: 'Maya Singh',
    location: 'Brisbane, QLD',
    title: 'Beginner and intermediate mentor',
    rating: '1900+ playing strength',
    description: 'Maya teaches beginner and intermediate players with a calm, structured approach to chess fundamentals.',
    specialties: ['Beginner', 'Intermediate', 'Junior coaching', 'Online'],
    formats: ['Beginner courses', 'Online lessons', 'Family sessions'],
    availability: ['Weekday afternoons', 'Saturday mornings', 'School holiday intensives'],
    testimonials: ['A warm coach who makes chess less intimidating.', 'Great structure for a beginner adult learner.'],
  },
  {
    slug: 'oliver-wright',
    name: 'Oliver Wright',
    location: 'Perth, WA',
    title: 'Club training coach',
    rating: '2000+ playing strength',
    description: 'Oliver supports club players with endgame technique, rapid improvement plans, and consistent training routines.',
    specialties: ['Intermediate', 'Advanced', 'Endgames', 'Tournament prep'],
    formats: ['Club sessions', 'Training plans', 'Endgame workshops'],
    availability: ['Monday club night', 'Friday online', 'Monthly workshop'],
    testimonials: ['The endgame sessions were immediately useful.', 'A very practical coach for busy club players.'],
  },
]

const bookingTools = ['Request lesson', 'Availability calendar', 'Student intake', 'Coaching goals', 'Lesson history']

const currentCoach = computed(() => (
  coaches.find((coach) => coach.slug === route.params.slug) || coaches[0]
))
</script>

<template>
  <main class="coach-detail-page">
    <section
      class="coach-detail-hero"
      aria-labelledby="coach-detail-title"
      itemscope
      itemtype="https://schema.org/Person"
    >
      <aside class="coach-profile-panel" aria-label="Coach profile">
        <div class="coach-avatar coach-avatar-large" aria-hidden="true">
          {{ currentCoach.name.split(' ').map((part) => part[0]).join('') }}
        </div>
        <p class="panel-label">{{ currentCoach.location }}</p>
        <p class="coach-profile-title">{{ currentCoach.title }}</p>
        <p>{{ currentCoach.rating }}</p>
      </aside>

      <div class="coach-detail-copy">
        <RouterLink class="back-link" to="/coaches">Coaches</RouterLink>
        <div class="event-hero-badges">
          <span v-for="specialty in currentCoach.specialties.slice(0, 3)" :key="specialty" class="event-chip">
            {{ specialty }}
          </span>
        </div>
        <h1 id="coach-detail-title" itemprop="name">{{ currentCoach.name }}</h1>
        <p itemprop="description">{{ currentCoach.description }}</p>
        <button class="hero-primary" type="button" disabled>Request Coaching</button>
      </div>
    </section>

    <section class="coach-detail-grid" aria-label="Coach details">
      <article class="coach-detail-card">
        <p class="eyebrow">Specialties</p>
        <h2>Coaching focus</h2>
        <div class="event-tag-row">
          <span v-for="specialty in currentCoach.specialties" :key="specialty">{{ specialty }}</span>
        </div>
      </article>

      <article class="coach-detail-card">
        <p class="eyebrow">Lesson formats</p>
        <h2>How lessons can work</h2>
        <ul>
          <li v-for="format in currentCoach.formats" :key="format">{{ format }}</li>
        </ul>
      </article>

      <article class="coach-detail-card">
        <p class="eyebrow">Availability</p>
        <h2>Typical schedule</h2>
        <ul>
          <li v-for="slot in currentCoach.availability" :key="slot">{{ slot }}</li>
        </ul>
      </article>
    </section>

    <section class="coach-testimonials-section" aria-labelledby="coach-testimonials-title">
      <div class="section-kicker">
        <p class="eyebrow">Testimonials</p>
        <h2 id="coach-testimonials-title">Student and parent feedback style</h2>
      </div>

      <div class="coach-testimonial-grid">
        <article v-for="quote in currentCoach.testimonials" :key="quote" class="coach-testimonial-card">
          <span class="coming-soon-badge">Trust signal</span>
          <p>{{ quote }}</p>
        </article>
      </div>
    </section>

    <section class="coach-booking-preview" aria-labelledby="coach-booking-title">
      <div>
        <p class="eyebrow">Coaching workflow roadmap</p>
        <h2 id="coach-booking-title">A coaching request flow for players, parents, and clubs</h2>
      </div>

      <div class="event-tools-grid">
        <article v-for="tool in bookingTools" :key="tool" class="event-tool-card">
          <span class="coming-soon-badge">Roadmap</span>
          <h3>{{ tool }}</h3>
          <p>Planned workflow for coach discovery, lesson enquiries, and student management.</p>
        </article>
      </div>
    </section>
  </main>
</template>
