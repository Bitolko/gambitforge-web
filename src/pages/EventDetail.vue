<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const events = [
  {
    slug: 'sydney-winter-rapid-classic',
    title: 'Sydney Winter Rapid Classic',
    date: 'Saturday, 20 June 2026',
    dateISO: '2026-06-20',
    location: 'Parramatta, NSW',
    state: 'NSW',
    organiser: 'Harbour Chess Academy',
    organiserType: 'Academy organiser',
    organiserBio: 'A Sydney-based academy running junior pathways, school programs, and weekend rapid tournaments for developing players.',
    contact: 'events@harbourchess.example',
    timeControl: 'Rapid 15+10',
    status: 'Early entries open',
    format: 'Seven-round Swiss tournament with ACF rating submission planned, digital pairings, and separate prize ladders for juniors and rating groups.',
    venue: 'Parramatta Town Hall, Centenary Square',
    address: '182 Church Street, Parramatta NSW',
    venueInfo: 'Central Parramatta venue near rail, bus, and light rail connections, with parent waiting areas, analysis tables, accessible entry, and nearby food options.',
    schedule: [
      { time: '8:30 AM', label: 'Check-in and late entry desk' },
      { time: '9:15 AM', label: 'Player briefing and division confirmation' },
      { time: '9:30 AM', label: 'Round 1 begins' },
      { time: '12:30 PM', label: 'Lunch break and standings check' },
      { time: '4:45 PM', label: 'Final round results and prize ceremony' },
    ],
    divisions: [
      { name: 'Open', detail: 'All ages, main trophy and rating prizes' },
      { name: 'Under 1600', detail: 'Rating-restricted section prizes' },
      { name: 'Junior U12', detail: 'Separate medals and coaching notes' },
    ],
    entryFee: '$35 early entry, $45 standard entry',
    capacity: '96 players',
    entries: '62 interested',
    prize: '$1,200 prize pool',
    arbiter: 'IA Sarah Nguyen with Harbour Chess Academy arbiters',
    posterTone: 'Harbour',
    related: ['queensland-junior-grand-prix', 'canberra-winter-classical-open', 'adelaide-schools-chess-carnival'],
    tags: ['Open', 'Rapid', 'Junior'],
  },
  {
    slug: 'melbourne-club-teams-weekend',
    title: 'Melbourne Club Teams Weekend',
    date: 'Saturday, 27 June 2026',
    dateISO: '2026-06-27',
    location: 'Carlton, VIC',
    state: 'VIC',
    organiser: 'Melbourne Chess Club',
    organiserType: 'Club organiser',
    organiserBio: 'One of Australia\'s long-running chess clubs, hosting rated nights, city leagues, weekend tournaments, and interclub events.',
    contact: 'teams@melbournechess.example',
    timeControl: 'Classical 60+10',
    status: 'Team nominations open',
    format: 'Two-day team event with board order submissions, captain check-in, match points, board prizes, and live standings planned for each division.',
    venue: 'Melbourne Chess Club, Leicester Street',
    address: '66 Leicester Street, Carlton VIC',
    venueInfo: 'Inner-city club venue close to Melbourne Central and university precincts, with analysis rooms, nearby cafes, and a dedicated arbiters table.',
    schedule: [
      { time: '9:10 AM', label: 'Captains meeting and board order lock' },
      { time: '10:00 AM', label: 'Round 1 team matches' },
      { time: '2:30 PM', label: 'Round 2 team matches' },
      { time: 'Sunday 10:00 AM', label: 'Round 3 and division standings' },
      { time: 'Sunday 4:45 PM', label: 'Team trophies and board prizes' },
    ],
    divisions: [
      { name: 'Premier', detail: 'Top club squads and invited teams' },
      { name: 'Reserve', detail: 'Club teams under average rating cap' },
      { name: 'Junior board', detail: 'Youth-board prize across divisions' },
    ],
    entryFee: '$180 per four-player team',
    capacity: '24 teams',
    entries: '14 teams forming',
    prize: 'Team trophies and board prizes',
    arbiter: 'FA Marcus Reid with Melbourne Chess Club arbiters',
    posterTone: 'Metro',
    related: ['canberra-winter-classical-open', 'perth-friday-night-blitz-arena', 'sydney-winter-rapid-classic'],
    tags: ['Teams', 'Classical', 'Club'],
  },
  {
    slug: 'queensland-junior-grand-prix',
    title: 'Queensland Junior Grand Prix',
    date: 'Sunday, 5 July 2026',
    dateISO: '2026-07-05',
    location: 'Brisbane, QLD',
    state: 'QLD',
    organiser: 'Queensland Junior Chess Network',
    organiserType: 'Junior pathway',
    organiserBio: 'A junior development network coordinating school chess, weekend events, and pathway tournaments across South East Queensland.',
    contact: 'juniorgp@qldchess.example',
    timeControl: 'Rapid 10+5',
    status: 'School invitations sent',
    format: 'Six-round junior Grand Prix event with age divisions, school recognition, coaching-friendly score summaries, and parent-facing schedules.',
    venue: 'Queensland Chess Hub, Woolloongabba',
    address: '45 Logan Road, Woolloongabba QLD',
    venueInfo: 'Junior-friendly venue with supervised lunch space, nearby parking, parent waiting zones, and dedicated novice tables.',
    schedule: [
      { time: '8:45 AM', label: 'Arrival and school desk check-in' },
      { time: '9:20 AM', label: 'Round 1 pairings posted' },
      { time: '11:45 AM', label: 'Lunch and coaching corner' },
      { time: '2:45 PM', label: 'Final round' },
      { time: '3:45 PM', label: 'Medals and Grand Prix points' },
    ],
    divisions: [
      { name: 'Under 8', detail: 'Beginner-friendly supervision' },
      { name: 'Under 10', detail: 'Rapid section with medals' },
      { name: 'Under 12', detail: 'Grand Prix points' },
      { name: 'Under 16', detail: 'Advanced junior section' },
    ],
    entryFee: '$28 junior entry',
    capacity: '120 juniors',
    entries: 'Schools invited',
    prize: 'Grand Prix points',
    arbiter: 'Queensland Junior Chess Network tournament desk',
    posterTone: 'Junior',
    related: ['sydney-winter-rapid-classic', 'adelaide-schools-chess-carnival', 'hobart-rapid-by-the-waterfront'],
    tags: ['Junior', 'School', 'Rapid'],
  },
  {
    slug: 'perth-friday-night-blitz-arena',
    title: 'Perth Friday Night Blitz Arena',
    date: 'Friday, 10 July 2026',
    dateISO: '2026-07-10',
    location: 'Northbridge, WA',
    state: 'WA',
    organiser: 'Perth City Chess Club',
    organiserType: 'Club night',
    organiserBio: 'A city club running weekly play, blitz nights, junior tables, and social chess events for Perth players.',
    contact: 'blitz@perthcitychess.example',
    timeControl: 'Blitz 3+2',
    status: 'Walk-ins welcome',
    format: 'Evening blitz arena with rolling pairings, live leaderboards, casual social tables, and separate beginner-friendly pairing pools.',
    venue: 'Perth City Chess Club Rooms',
    address: 'Northbridge Community Building, Perth WA',
    venueInfo: 'Casual Friday venue near public transport, with digital clocks, analysis tables, and a relaxed social playing room.',
    schedule: [
      { time: '6:00 PM', label: 'Doors open and casual warm-up games' },
      { time: '6:30 PM', label: 'Arena starts' },
      { time: '8:15 PM', label: 'Leaderboard check and final sprint' },
      { time: '8:45 PM', label: 'Last pairings' },
      { time: '9:00 PM', label: 'Club prizes and social analysis' },
    ],
    divisions: [
      { name: 'Open arena', detail: 'Main rolling leaderboard' },
      { name: 'Junior arena', detail: 'Youth-friendly blitz pool' },
      { name: 'Beginner table', detail: 'Casual support and pairing help' },
    ],
    entryFee: '$20 members, $25 visitors',
    capacity: '64 players',
    entries: 'Walk-ins likely',
    prize: 'Club prizes',
    arbiter: 'Perth City Chess Club organising team',
    posterTone: 'Blitz',
    related: ['melbourne-club-teams-weekend', 'hobart-rapid-by-the-waterfront', 'canberra-winter-classical-open'],
    tags: ['Open', 'Blitz', 'Club'],
  },
  {
    slug: 'adelaide-schools-chess-carnival',
    title: 'Adelaide Schools Chess Carnival',
    date: 'Tuesday, 21 July 2026',
    dateISO: '2026-07-21',
    location: 'Adelaide, SA',
    state: 'SA',
    organiser: 'South Australian School Chess',
    organiserType: 'School organiser',
    organiserBio: 'A school chess organiser coordinating interschool competitions, beginner events, and teacher-friendly tournament operations.',
    contact: 'schools@sachess.example',
    timeControl: 'Rapid 12+3',
    status: 'Expressions of interest',
    format: 'School team carnival with board-by-board scoring, teacher check-in, team standings, and beginner-friendly divisions.',
    venue: 'Adelaide Convention Centre, Riverbank Rooms',
    address: 'North Terrace, Adelaide SA',
    venueInfo: 'Large school-event space with bus drop-off, teacher registration desk, lunch zones, and room for parents and spectators.',
    schedule: [
      { time: '8:30 AM', label: 'Teacher check-in and team sheets' },
      { time: '9:20 AM', label: 'Round 1 team pairings' },
      { time: '12:00 PM', label: 'Lunch and standings reset' },
      { time: '2:40 PM', label: 'Final round' },
      { time: '3:30 PM', label: 'School shields and medals' },
    ],
    divisions: [
      { name: 'Primary teams', detail: 'Four-board teams' },
      { name: 'Secondary teams', detail: 'Four-board teams' },
      { name: 'Girls teams', detail: 'Dedicated school shield' },
    ],
    entryFee: '$120 per four-player team',
    capacity: '40 teams',
    entries: 'Expression of interest',
    prize: 'School shields',
    arbiter: 'South Australian School Chess tournament desk',
    posterTone: 'Schools',
    related: ['queensland-junior-grand-prix', 'sydney-winter-rapid-classic', 'hobart-rapid-by-the-waterfront'],
    tags: ['School', 'Teams', 'Junior'],
  },
  {
    slug: 'canberra-winter-classical-open',
    title: 'Canberra Winter Classical Open',
    date: 'Saturday, 1 August 2026',
    dateISO: '2026-08-01',
    location: 'Canberra, ACT',
    state: 'ACT',
    organiser: 'ACT Chess Association',
    organiserType: 'Association event',
    organiserBio: 'The ACT association supports rated weekend tournaments, club collaboration, junior development, and regional chess growth.',
    contact: 'open@actchess.example',
    timeControl: 'Classical 75+10',
    status: 'Early bird open',
    format: 'Five-round classical open with ACF rating submission planned, accelerated pairings if required, and rating-group prizes.',
    venue: 'Griffith Community Centre',
    address: '53 Stuart Street, Griffith ACT',
    venueInfo: 'Community hall venue with quiet playing conditions, parking nearby, accessible entry, and analysis space outside the main room.',
    schedule: [
      { time: 'Saturday 9:15 AM', label: 'Check-in and arbiter briefing' },
      { time: 'Saturday 10:00 AM', label: 'Round 1' },
      { time: 'Saturday 3:00 PM', label: 'Round 2' },
      { time: 'Sunday 9:30 AM', label: 'Round 4' },
      { time: 'Sunday 4:30 PM', label: 'Awards and final standings' },
    ],
    divisions: [
      { name: 'Open', detail: 'Main classical section' },
      { name: 'Under 1800', detail: 'Rating prize group' },
      { name: 'Under 1400', detail: 'Developing player prize group' },
    ],
    entryFee: '$70 adult, $50 concession, $40 junior',
    capacity: '72 players',
    entries: 'Early bird open',
    prize: '$900 plus rating prizes',
    arbiter: 'ACT Chess Association arbiting panel',
    posterTone: 'Classical',
    related: ['melbourne-club-teams-weekend', 'sydney-winter-rapid-classic', 'perth-friday-night-blitz-arena'],
    tags: ['Open', 'Classical', 'Club'],
  },
  {
    slug: 'hobart-rapid-by-the-waterfront',
    title: 'Hobart Rapid by the Waterfront',
    date: 'Sunday, 16 August 2026',
    dateISO: '2026-08-16',
    location: 'Hobart, TAS',
    state: 'TAS',
    organiser: 'Tasmanian Chess League',
    organiserType: 'League organiser',
    organiserBio: 'A Tasmanian league group supporting club events, regional rapid tournaments, juniors, and community chess days.',
    contact: 'events@taschess.example',
    timeControl: 'Rapid 20+5',
    status: 'Community listing',
    format: 'Five-round waterfront rapid designed for club players, juniors, and new tournament players, with novice-friendly support.',
    venue: 'Waterside Pavilion, Salamanca',
    address: 'Salamanca Place, Hobart TAS',
    venueInfo: 'Waterfront community venue with scenic surrounds, accessible entry, nearby cafes, and an analysis area after the final round.',
    schedule: [
      { time: '9:00 AM', label: 'Check-in and casual boards' },
      { time: '9:45 AM', label: 'Round 1' },
      { time: '12:30 PM', label: 'Lunch on the waterfront' },
      { time: '3:15 PM', label: 'Final round' },
      { time: '4:00 PM', label: 'Awards and community photos' },
    ],
    divisions: [
      { name: 'Open', detail: 'Main rapid section' },
      { name: 'Junior', detail: 'Youth medals' },
      { name: 'Novice friendly', detail: 'Support for first-time players' },
    ],
    entryFee: '$30 adult, $20 junior',
    capacity: '56 players',
    entries: 'Community listing',
    prize: 'Local sponsor prizes',
    arbiter: 'Tasmanian Chess League volunteer arbiters',
    posterTone: 'Waterfront',
    related: ['perth-friday-night-blitz-arena', 'queensland-junior-grand-prix', 'canberra-winter-classical-open'],
    tags: ['Open', 'Rapid', 'Junior'],
  },
]

const liveTools = [
  { title: 'Standings', detail: 'Section tables, tie-breaks, live rank movement, and rating-group filters.' },
  { title: 'Pairings', detail: 'Round publishing, board numbers, byes, floats, and late-entry handling.' },
  { title: 'Live results', detail: 'Result entry, arbiters desk status, and spectator-friendly round progress.' },
  { title: 'Player list', detail: 'Entries, divisions, ratings, club or school affiliation, and waitlist status.' },
  { title: 'Announcements', detail: 'Venue notes, round delays, prize reminders, and organiser updates.' },
]

const currentEvent = computed(() => (
  events.find((event) => event.slug === route.params.slug) || events[0]
))

const relatedEvents = computed(() => (
  currentEvent.value.related
    .map((slug) => events.find((event) => event.slug === slug))
    .filter(Boolean)
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
          <span class="event-chip">{{ currentEvent.capacity }}</span>
        </div>
        <h1 id="event-detail-title" itemprop="name">{{ currentEvent.title }}</h1>
        <p class="event-detail-summary" itemprop="description">{{ currentEvent.format }}</p>
        <dl class="event-hero-meta">
          <div>
            <dt>Date</dt>
            <dd itemprop="startDate" :datetime="currentEvent.dateISO">{{ currentEvent.date }}</dd>
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
        <div class="event-flyer event-flyer-large" :data-tone="currentEvent.posterTone" aria-hidden="true">
          <span>{{ currentEvent.state }}</span>
          <strong>{{ currentEvent.timeControl }}</strong>
          <em>{{ currentEvent.posterTone }}</em>
        </div>
        <p class="panel-label">Tournament landing page</p>
        <h2>Register interest</h2>
        <p>
          {{ currentEvent.entries }} for {{ currentEvent.capacity }}. Registration, section selection,
          payment status, and organiser approval will connect here in the backend phase.
        </p>
        <dl class="event-registration-facts">
          <div>
            <dt>Entry</dt>
            <dd>{{ currentEvent.entryFee }}</dd>
          </div>
          <div>
            <dt>Prize</dt>
            <dd>{{ currentEvent.prize }}</dd>
          </div>
        </dl>
        <button class="hero-primary" type="button" disabled>Register Interest</button>
      </aside>
    </section>

    <section class="event-info-section" aria-labelledby="event-info-title">
      <div class="section-kicker">
        <p class="eyebrow">Tournament brief</p>
        <h2 id="event-info-title">Everything players need before round one</h2>
      </div>

      <div class="event-info-grid event-info-grid-rich">
        <article class="event-info-card event-schedule-card">
          <span>Schedule</span>
          <ol class="event-schedule-list">
            <li v-for="item in currentEvent.schedule" :key="`${item.time}-${item.label}`">
              <strong>{{ item.time }}</strong>
              <p>{{ item.label }}</p>
            </li>
          </ol>
        </article>

        <article class="event-info-card event-divisions-card">
          <span>Tournament divisions</span>
          <div class="event-division-list">
            <div v-for="division in currentEvent.divisions" :key="division.name">
              <strong>{{ division.name }}</strong>
              <p>{{ division.detail }}</p>
            </div>
          </div>
        </article>

        <article class="event-info-card event-organiser-card">
          <span>Organiser profile</span>
          <div class="organiser-avatar" aria-hidden="true">{{ currentEvent.organiser.slice(0, 2) }}</div>
          <h3>{{ currentEvent.organiser }}</h3>
          <p>{{ currentEvent.organiserBio }}</p>
          <small>{{ currentEvent.organiserType }} / {{ currentEvent.contact }}</small>
        </article>

        <article class="event-info-card">
          <span>Arbiter desk</span>
          <p>{{ currentEvent.arbiter }}</p>
        </article>
        <article class="event-info-card">
          <span>Time control</span>
          <p>{{ currentEvent.timeControl }}</p>
        </article>
        <article class="event-info-card">
          <span>Entry and capacity</span>
          <p>{{ currentEvent.entryFee }} / {{ currentEvent.capacity }}</p>
        </article>
      </div>
    </section>

    <section class="event-tools-preview" aria-labelledby="event-tools-title">
      <div>
        <p class="eyebrow">Future live tools</p>
        <h2 id="event-tools-title">Tournament operations ready for the next backend phase</h2>
      </div>

      <div class="event-tools-grid">
        <article v-for="tool in liveTools" :key="tool.title" class="event-tool-card">
          <span class="coming-soon-badge">Preview</span>
          <h3>{{ tool.title }}</h3>
          <p>{{ tool.detail }}</p>
        </article>
      </div>
    </section>

    <section class="event-venue-section" aria-labelledby="event-venue-title">
      <div class="event-map-card" aria-hidden="true">
        <span class="map-pin pin-nsw">{{ currentEvent.state }}</span>
        <span class="event-map-label">{{ currentEvent.location }}</span>
      </div>
      <div class="event-venue-copy">
        <p class="eyebrow">Venue and arrival</p>
        <h2 id="event-venue-title">{{ currentEvent.venue }}</h2>
        <p>{{ currentEvent.address }}</p>
        <p>{{ currentEvent.venueInfo }}</p>
      </div>
    </section>

    <section class="event-registration-cta" aria-labelledby="event-registration-title">
      <div>
        <p class="eyebrow">Registration workflow</p>
        <h2 id="event-registration-title">Built to turn a listing into a real event room</h2>
        <p>
          GambitForge will connect this public page to entries, section caps, payment state,
          pairing generation, standings, and organiser announcements.
        </p>
      </div>
      <button class="hero-primary" type="button" disabled>Registration Coming Soon</button>
    </section>

    <section class="related-events-section" aria-labelledby="related-events-title">
      <div class="section-kicker">
        <p class="eyebrow">Keep playing</p>
        <h2 id="related-events-title">Related Australian chess events</h2>
      </div>

      <div class="related-events-grid">
        <article
          v-for="event in relatedEvents"
          :key="event.title"
          class="event-card event-card-rich"
          itemscope
          itemtype="https://schema.org/Event"
        >
          <div class="event-card-topline">
            <div class="event-flyer" :data-tone="event.posterTone" aria-hidden="true">
              <span>{{ event.state }}</span>
              <strong>{{ event.timeControl }}</strong>
              <em>{{ event.posterTone }}</em>
            </div>
            <div class="event-card-main">
              <p class="panel-label">{{ event.location }}</p>
              <h2 itemprop="name">{{ event.title }}</h2>
              <p itemprop="startDate" :datetime="event.dateISO">{{ event.date }}</p>
            </div>
          </div>
          <div class="event-card-status-row">
            <span>{{ event.capacity }}</span>
            <span>{{ event.entries }}</span>
          </div>
          <RouterLink class="secondary-button" :to="{ name: 'event-detail', params: { slug: event.slug } }">
            View Details
          </RouterLink>
        </article>
      </div>
    </section>
  </main>
</template>
