<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const filters = ['All', 'Junior coaching', 'Online', 'Tournament prep', 'Beginner', 'Intermediate', 'Advanced']

const search = ref('')
const activeFilter = ref('All')

const coaches = [
  {
    slug: 'elena-morris',
    name: 'Elena Morris',
    location: 'Sydney, NSW',
    title: 'FIDE Trainer placeholder',
    rating: '2100+ rating placeholder',
    description: 'Junior development coach focused on calculation habits, confidence, and tournament readiness.',
    specialties: ['Junior coaching', 'Online', 'Tournament prep', 'Beginner', 'Intermediate'],
    formats: ['Online lessons', 'Small groups', 'School programs'],
  },
  {
    slug: 'daniel-kovacs',
    name: 'Daniel Kovacs',
    location: 'Melbourne, VIC',
    title: 'National Master placeholder',
    rating: '2250+ rating placeholder',
    description: 'Practical tournament coach for ambitious club players working on openings, strategy, and game review.',
    specialties: ['Tournament prep', 'Advanced', 'Online'],
    formats: ['One-on-one lessons', 'Game analysis', 'Opening preparation'],
  },
  {
    slug: 'maya-singh',
    name: 'Maya Singh',
    location: 'Brisbane, QLD',
    title: 'Coach profile placeholder',
    rating: '1900+ rating placeholder',
    description: 'Friendly beginner and intermediate coach helping adults and juniors build strong foundations.',
    specialties: ['Beginner', 'Intermediate', 'Junior coaching', 'Online'],
    formats: ['Beginner courses', 'Family sessions', 'Online lessons'],
  },
  {
    slug: 'oliver-wright',
    name: 'Oliver Wright',
    location: 'Perth, WA',
    title: 'Club coach placeholder',
    rating: '2000+ rating placeholder',
    description: 'Club trainer specialising in rapid improvement plans, endgames, and weekly accountability.',
    specialties: ['Intermediate', 'Advanced', 'Tournament prep'],
    formats: ['Club nights', 'Training plans', 'Endgame workshops'],
  },
]

const filteredCoaches = computed(() => {
  const query = search.value.trim().toLowerCase()

  return coaches.filter((coach) => {
    const matchesSearch = !query
      || coach.name.toLowerCase().includes(query)
      || coach.location.toLowerCase().includes(query)
      || coach.description.toLowerCase().includes(query)
      || coach.specialties.some((specialty) => specialty.toLowerCase().includes(query))

    const matchesFilter = activeFilter.value === 'All' || coach.specialties.includes(activeFilter.value)

    return matchesSearch && matchesFilter
  })
})
</script>

<template>
  <main class="coaches-page">
    <section class="coaches-hero" aria-labelledby="coaches-title">
      <div class="coaches-hero-copy">
        <p class="eyebrow">Chess coaching discovery</p>
        <h1 id="coaches-title">Find Chess Coaches for Every Stage of Improvement</h1>
        <p>
          Browse junior coaches, online trainers, tournament preparation specialists, and club
          mentors across the Australian chess community.
        </p>
      </div>

      <aside class="coaches-hero-panel" aria-label="Coaching marketplace preview">
        <span class="coming-soon-badge">Directory preview</span>
        <h2>Coaching profiles built for trust</h2>
        <p>Specialties, formats, availability, testimonials, and future booking tools in one place.</p>
        <div class="coach-signal-row">
          <span>Junior</span>
          <span>Online</span>
          <span>Prep</span>
        </div>
      </aside>
    </section>

    <section class="coaches-filter-section" aria-labelledby="coach-filter-title">
      <div class="section-kicker">
        <p class="eyebrow">Browse coaches</p>
        <h2 id="coach-filter-title">Search by coach, location, level, or specialty</h2>
      </div>

      <label class="club-search-field">
        <span>Search coaches</span>
        <input v-model="search" type="search" placeholder="Search junior, online, tournament prep..." />
      </label>

      <div class="events-filter-group" aria-label="Coach filters">
        <button
          v-for="filter in filters"
          :key="filter"
          class="event-filter-pill"
          :class="{ active: activeFilter === filter }"
          type="button"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
    </section>

    <section class="coaches-grid" aria-label="Chess coaches">
      <article
        v-for="coach in filteredCoaches"
        :key="coach.slug"
        class="coach-card"
        itemscope
        itemtype="https://schema.org/Person"
      >
        <div class="coach-card-main">
          <div class="coach-avatar" aria-hidden="true">{{ coach.name.split(' ').map((part) => part[0]).join('') }}</div>
          <div>
            <p class="panel-label">{{ coach.location }}</p>
            <h2 itemprop="name">{{ coach.name }}</h2>
            <p itemprop="jobTitle">{{ coach.title }}</p>
          </div>
        </div>

        <p class="coach-card-description" itemprop="description">{{ coach.description }}</p>

        <dl class="event-meta-list">
          <div>
            <dt>Rating</dt>
            <dd>{{ coach.rating }}</dd>
          </div>
          <div>
            <dt>Lesson formats</dt>
            <dd>{{ coach.formats.join(', ') }}</dd>
          </div>
        </dl>

        <div class="event-tag-row" aria-label="Coach specialties">
          <span v-for="specialty in coach.specialties" :key="specialty">{{ specialty }}</span>
        </div>

        <RouterLink class="secondary-button club-card-link" :to="{ name: 'coach-detail', params: { slug: coach.slug } }">
          View Coach
        </RouterLink>
      </article>
    </section>
  </main>
</template>
