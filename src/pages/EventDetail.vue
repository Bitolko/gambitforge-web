<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const events = [
  {
    slug: 'sydney-junior-open',
    title: 'Sydney Junior Open',
    date: 'Saturday, 15 June 2026',
    location: 'Sydney, NSW',
    organiser: 'Harbour Chess Academy',
    timeControl: 'Rapid 15+10',
    status: 'Registration soon',
    format: '7-round Swiss tournament with digital pairings and accelerated first-round groups.',
    venue: 'Sydney Community Chess Hall, 88 George Street, Sydney NSW',
    schedule: ['8:30 AM check-in', '9:15 AM player briefing', '9:30 AM round 1', '4:45 PM prize ceremony'],
    divisions: ['Under 8', 'Under 10', 'Under 12', 'Under 16', 'Open Junior'],
    entryFee: '$35 early entry, $45 standard entry',
    arbiter: 'IA Sarah Nguyen and Harbour Chess Academy staff',
    venueInfo: 'Central Sydney venue near Town Hall with parent waiting areas, analysis space, and accessible entry.',
    related: ['NSW Scholastic Teams', 'Canberra Junior Classic', 'Newcastle Club Rapid'],
    tags: ['Junior', 'Rapid', 'School'],
  },
  {
    slug: 'melbourne-rapid-championship',
    title: 'Melbourne Rapid Championship',
    date: 'Sunday, 23 June 2026',
    location: 'Melbourne, VIC',
    organiser: 'Melbourne Chess Centre',
    timeControl: 'Rapid 25+10',
    status: 'Entries opening',
    format: 'Open rapid championship with ACF-rated games, live standings, and class prizes.',
    venue: 'Melbourne Chess Centre, 62 Queens Road, Melbourne VIC',
    schedule: ['9:00 AM registration', '9:45 AM round 1', '1:00 PM lunch break', '5:30 PM final standings'],
    divisions: ['Open', 'Under 1800', 'Under 1400', 'Junior prize'],
    entryFee: '$55 adult, $40 concession, $30 junior',
    arbiter: 'FA Marcus Reid with Melbourne Chess Centre arbiters',
    venueInfo: 'Inner Melbourne venue with tram access, cafe options nearby, and DGT board support planned.',
    related: ['Ballarat Winter Open', 'Geelong Rapid Series', 'Victorian Club Teams'],
    tags: ['Open', 'Rapid', 'Club'],
  },
  {
    slug: 'perth-blitz-arena',
    title: 'Perth Blitz Arena',
    date: 'Friday, 5 July 2026',
    location: 'Perth, WA',
    organiser: 'Perth City Chess Club',
    timeControl: 'Blitz 3+2',
    status: 'Preview',
    format: 'Evening blitz arena with rolling pairings, leaderboards, and social club prizes.',
    venue: 'Perth City Chess Club Rooms, Northbridge WA',
    schedule: ['6:00 PM doors open', '6:30 PM arena starts', '8:45 PM final games', '9:00 PM prizes'],
    divisions: ['Open arena', 'Junior arena', 'Beginner-friendly section'],
    entryFee: '$20 club members, $25 visitors',
    arbiter: 'Perth City Chess Club organising team',
    venueInfo: 'Casual Friday night venue with analysis tables, digital clocks, and public transport nearby.',
    related: ['WA Club Challenge', 'Fremantle Rapid Open', 'Perth Junior League'],
    tags: ['Open', 'Blitz', 'Club'],
  },
  {
    slug: 'gold-coast-open',
    title: 'Gold Coast Open',
    date: 'Saturday, 13 July 2026',
    location: 'Gold Coast, QLD',
    organiser: 'Gold Coast Chess Association',
    timeControl: 'Classical 60+10',
    status: 'Planning',
    format: 'Weekend classical open with live result reporting and organiser announcement tools.',
    venue: 'Gold Coast Sports and Community Centre, Southport QLD',
    schedule: ['Saturday 9:30 AM round 1', 'Saturday 2:00 PM round 2', 'Sunday 9:30 AM round 3', 'Sunday 4:30 PM awards'],
    divisions: ['Open', 'Under 2000', 'Under 1600', 'Junior'],
    entryFee: '$70 adult, $50 concession, $40 junior',
    arbiter: 'CA Elise Morgan and Gold Coast Chess Association',
    venueInfo: 'Large tournament hall with parking, nearby food options, and space for spectators.',
    related: ['Brisbane Rapid Classic', 'Sunshine Coast Open', 'Queensland Junior Teams'],
    tags: ['Open', 'Classical', 'Club'],
  },
  {
    slug: 'nsw-scholastic-teams',
    title: 'NSW Scholastic Teams',
    date: 'Tuesday, 30 July 2026',
    location: 'Parramatta, NSW',
    organiser: 'NSW School Chess Network',
    timeControl: 'Rapid 10+5',
    status: 'School entries soon',
    format: 'School team event with division standings, board-by-board scores, and team pairings.',
    venue: 'Parramatta Education and Events Centre, Parramatta NSW',
    schedule: ['8:45 AM school arrival', '9:20 AM captains meeting', '9:45 AM round 1', '3:15 PM trophies'],
    divisions: ['Primary', 'Secondary', 'Girls teams', 'Beginner teams'],
    entryFee: '$120 per four-player team',
    arbiter: 'NSW School Chess Network tournament desk',
    venueInfo: 'School-friendly venue with supervised lunch areas, bus drop-off access, and teacher check-in desk.',
    related: ['Sydney Junior Open', 'Illawarra School Rapid', 'Canberra Junior Classic'],
    tags: ['Junior', 'School', 'Rapid'],
  },
]

const liveTools = ['Standings', 'Pairings', 'Live results', 'Player list', 'Round progress']

const currentEvent = computed(() => (
  events.find((event) => event.slug === route.params.slug) || events[0]
))

const relatedEvents = computed(() => (
  currentEvent.value.related.map((title, index) => ({
    title,
    location: ['Sydney, NSW', 'Canberra, ACT', 'Melbourne, VIC'][index],
    date: ['August 2026', 'September 2026', 'October 2026'][index],
    timeControl: ['Rapid 15+10', 'Classical 60+10', 'Blitz 3+2'][index],
  }))
))
</script>

<template>
  <main class="event-detail-page">
    <section
      class="event-detail-hero"
      aria-labelledby="event-detail-title"
      itemscope
      itemtype="https://schema.org/Event"
    >
      <div class="event-detail-hero-copy">
        <RouterLink class="back-link" to="/events">Events</RouterLink>
        <div class="event-hero-badges">
          <span class="status-badge badge-active">{{ currentEvent.status }}</span>
          <span class="event-chip">{{ currentEvent.timeControl }}</span>
        </div>
        <h1 id="event-detail-title" itemprop="name">{{ currentEvent.title }}</h1>
        <dl class="event-hero-meta">
          <div>
            <dt>Date</dt>
            <dd itemprop="startDate">{{ currentEvent.date }}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd itemprop="location" itemscope itemtype="https://schema.org/Place">
              <span itemprop="name">{{ currentEvent.location }}</span>
            </dd>
          </div>
          <div>
            <dt>Organiser</dt>
            <dd itemprop="organizer" itemscope itemtype="https://schema.org/Organization">
              <span itemprop="name">{{ currentEvent.organiser }}</span>
            </dd>
          </div>
        </dl>
      </div>

      <aside class="event-registration-panel" aria-label="Event registration">
        <p class="panel-label">Tournament landing page</p>
        <h2>Registration preview</h2>
        <p>
          Player entry, section selection, payment status, and organiser review will live here
          when event registrations are connected.
        </p>
        <button class="hero-primary" type="button" disabled>Register Interest</button>
      </aside>
    </section>

    <section class="event-info-section" aria-labelledby="event-info-title">
      <div class="section-kicker">
        <p class="eyebrow">Event information</p>
        <h2 id="event-info-title">Everything players need before round one</h2>
      </div>

      <div class="event-info-grid">
        <article class="event-info-card">
          <span>Format</span>
          <p>{{ currentEvent.format }}</p>
        </article>
        <article class="event-info-card">
          <span>Venue</span>
          <p>{{ currentEvent.venue }}</p>
        </article>
        <article class="event-info-card event-info-list">
          <span>Schedule</span>
          <ul>
            <li v-for="item in currentEvent.schedule" :key="item">{{ item }}</li>
          </ul>
        </article>
        <article class="event-info-card event-info-list">
          <span>Sections / divisions</span>
          <ul>
            <li v-for="division in currentEvent.divisions" :key="division">{{ division }}</li>
          </ul>
        </article>
        <article class="event-info-card">
          <span>Entry fee</span>
          <p>{{ currentEvent.entryFee }}</p>
        </article>
        <article class="event-info-card">
          <span>Arbiter / organiser</span>
          <p>{{ currentEvent.arbiter }}</p>
        </article>
      </div>
    </section>

    <section class="event-tools-preview" aria-labelledby="event-tools-title">
      <div>
        <p class="eyebrow">Future live tools</p>
        <h2 id="event-tools-title">Live tournament operations, ready when the backend is connected</h2>
      </div>

      <div class="event-tools-grid">
        <article v-for="tool in liveTools" :key="tool" class="event-tool-card">
          <span class="coming-soon-badge">Coming soon</span>
          <h3>{{ tool }}</h3>
          <p>Premium live event module placeholder for organisers, players, and spectators.</p>
        </article>
      </div>
    </section>

    <section class="event-venue-section" aria-labelledby="event-venue-title">
      <div class="event-map-card" aria-hidden="true">
        <span class="map-pin pin-nsw">{{ currentEvent.location.split(',').at(-1).trim() }}</span>
      </div>
      <div class="event-venue-copy">
        <p class="eyebrow">Venue</p>
        <h2 id="event-venue-title">{{ currentEvent.venue }}</h2>
        <p>{{ currentEvent.venueInfo }}</p>
      </div>
    </section>

    <section class="related-events-section" aria-labelledby="related-events-title">
      <div class="section-kicker">
        <p class="eyebrow">Keep playing</p>
        <h2 id="related-events-title">Related Australian chess events</h2>
      </div>

      <div class="related-events-grid">
        <article v-for="event in relatedEvents" :key="event.title" class="event-card">
          <div class="preview-card-heading">
            <p class="panel-label">{{ event.location }}</p>
            <span class="status-badge badge-active">{{ event.timeControl }}</span>
          </div>
          <div class="event-card-main">
            <h2>{{ event.title }}</h2>
            <p>{{ event.date }}</p>
          </div>
          <button class="secondary-button" type="button" disabled>View Details</button>
        </article>
      </div>
    </section>
  </main>
</template>
