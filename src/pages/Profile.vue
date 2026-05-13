<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const profiles = {
  ellieknight: {
    name: 'Ellie Knight',
    username: 'ellieknight',
    title: 'Junior rapid specialist',
    rating: '1842',
    peak: '1916',
    countryState: 'Australia / NSW',
    club: 'Harbour Chess Academy',
    record: '42W / 18D / 31L',
    openings: ['London System', 'Caro-Kann', 'Catalan structures'],
    stats: [
      { label: 'Games', value: '91' },
      { label: 'Tournaments', value: '12' },
      { label: 'Win rate', value: '56%' },
      { label: 'Study streak', value: '18d' },
    ],
    badges: ['Rapid Climber', 'Junior Finalist', 'Endgame Grinder', 'Team Board 1'],
    recentGames: [
      { result: 'Win', opponent: 'MayaS', format: 'Rapid 15+10', opening: 'London System', moves: '42 moves' },
      { result: 'Draw', opponent: 'NorthbridgeRook', format: 'Classical 60+10', opening: 'Caro-Kann', moves: '58 moves' },
      { result: 'Loss', opponent: 'CanberraKnight', format: 'Blitz 3+2', opening: 'Queen\'s Gambit', moves: '31 moves' },
    ],
    tournaments: [
      { event: 'Sydney Winter Rapid Classic', score: '5/7', section: 'Open', place: '8th' },
      { event: 'NSW Junior League', score: '4.5/6', section: 'U16', place: '2nd' },
      { event: 'Parramatta Club Open', score: '3.5/5', section: 'Under 1800', place: '4th' },
    ],
    activity: [
      'Joined the Sydney Winter Rapid Classic watchlist.',
      'Added Caro-Kann structures to favourite openings.',
      'Completed a 25-puzzle endgame set.',
      'Reviewed a tournament game with coach notes.',
    ],
    role: 'Future student profile',
    roleCopy: 'Coach connections, lesson plans, assignments, and progress reviews will appear here when coaching persistence is connected.',
  },
  danielkovacs: {
    name: 'Daniel Kovacs',
    username: 'danielkovacs',
    title: 'Tournament preparation coach',
    rating: '2257',
    peak: '2314',
    countryState: 'Australia / VIC',
    club: 'Melbourne Chess Club',
    record: '118W / 44D / 69L',
    openings: ['Sicilian Najdorf', 'Ruy Lopez', 'King\'s Indian Defence'],
    stats: [
      { label: 'Games', value: '231' },
      { label: 'Students', value: '24' },
      { label: 'Events', value: '38' },
      { label: 'Analysis', value: '146' },
    ],
    badges: ['Coach Verified', 'Opening Lab', 'Classical Specialist', 'Club Mentor'],
    recentGames: [
      { result: 'Win', opponent: 'SydneyBishop', format: 'Classical 75+10', opening: 'Ruy Lopez', moves: '49 moves' },
      { result: 'Win', opponent: 'PerthBlitzFan', format: 'Rapid 25+10', opening: 'Najdorf', moves: '37 moves' },
      { result: 'Draw', opponent: 'ACTFile', format: 'Classical 60+10', opening: 'King\'s Indian', moves: '64 moves' },
    ],
    tournaments: [
      { event: 'Melbourne Club Teams Weekend', score: 'Board coach', section: 'Premier', place: 'Mentor' },
      { event: 'Victorian Autumn Open', score: '4.5/6', section: 'Open', place: '5th' },
      { event: 'Carlton Rapid Series', score: '6/7', section: 'Open', place: '1st' },
    ],
    activity: [
      'Published a prep note for Melbourne Club Teams.',
      'Reviewed three student games from the weekend.',
      'Added Najdorf model games to the training library.',
      'Followed the Canberra Winter Classical Open.',
    ],
    role: 'Future coach profile',
    roleCopy: 'Public coach pages can later expose availability, student cohorts, lesson packages, testimonials, and verified credentials.',
  },
}

function titleFromUsername(username) {
  return String(username || 'player')
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

const profile = computed(() => {
  const username = String(route.params.username || 'player').toLowerCase()

  return profiles[username] || {
    name: titleFromUsername(username),
    username,
    title: 'GambitForge player profile',
    rating: '1500',
    peak: 'Unrated peak',
    countryState: 'Australia / Community',
    club: 'Independent player',
    record: 'No persisted record yet',
    openings: ['Queen\'s Pawn', 'Italian Game', 'French Defence'],
    stats: [
      { label: 'Games', value: '0' },
      { label: 'Tournaments', value: '0' },
      { label: 'Win rate', value: '-' },
      { label: 'Badges', value: '1' },
    ],
    badges: ['Founding Profile'],
    recentGames: [
      { result: 'Preview', opponent: 'Future opponent', format: 'Rapid 15+10', opening: 'Opening explorer', moves: 'Game history pending' },
      { result: 'Preview', opponent: 'Club player', format: 'Classical 60+10', opening: 'Tournament prep', moves: 'Game history pending' },
    ],
    tournaments: [
      { event: 'Future tournament room', score: 'Pending', section: 'Open', place: 'Profile history' },
      { event: 'Club event listing', score: 'Pending', section: 'Rapid', place: 'Profile history' },
    ],
    activity: [
      'Public profile shell created.',
      'Game, tournament, and coaching history will connect after backend persistence.',
      'Favourite openings and profile badges are ready for future account settings.',
    ],
    role: 'Future player profile',
    roleCopy: 'This public identity surface is ready for persisted games, tournament entries, coach relationships, and student progress.',
  }
})
</script>

<template>
  <main class="public-profile-page">
    <section class="profile-hero" aria-labelledby="profile-title" itemscope itemtype="https://schema.org/Person">
      <div class="profile-identity">
        <div class="profile-avatar" aria-hidden="true">{{ profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2) }}</div>
        <div>
          <p class="eyebrow">Public profile</p>
          <h1 id="profile-title" itemprop="name">{{ profile.name }}</h1>
          <p class="profile-username">@{{ profile.username }}</p>
          <p class="profile-title-line">{{ profile.title }}</p>
        </div>
      </div>

      <aside class="profile-rating-card" aria-label="Player rating snapshot">
        <span class="status-badge badge-active">Public identity</span>
        <strong>{{ profile.rating }}</strong>
        <p>Current rating placeholder</p>
        <small>Peak: {{ profile.peak }}</small>
      </aside>
    </section>

    <section class="profile-stats-grid" aria-label="Player stats">
      <article v-for="stat in profile.stats" :key="stat.label" class="profile-stat-card">
        <span>{{ stat.label }}</span>
        <strong>{{ stat.value }}</strong>
      </article>
    </section>

    <section class="profile-layout">
      <div class="profile-main-column">
        <article class="premium-profile-card">
          <div class="preview-card-heading">
            <p class="panel-label">Player details</p>
            <span class="event-chip">{{ profile.countryState }}</span>
          </div>
          <dl class="profile-detail-list">
            <div>
              <dt>Club</dt>
              <dd>{{ profile.club }}</dd>
            </div>
            <div>
              <dt>Record</dt>
              <dd>{{ profile.record }}</dd>
            </div>
            <div>
              <dt>Favourite openings</dt>
              <dd>{{ profile.openings.join(', ') }}</dd>
            </div>
          </dl>
        </article>

        <article class="premium-profile-card">
          <div class="section-kicker">
            <p class="eyebrow">Recent games</p>
            <h2>Latest board activity</h2>
          </div>
          <div class="profile-game-grid">
            <article v-for="game in profile.recentGames" :key="`${game.opponent}-${game.opening}`" class="profile-game-card">
              <span class="status-badge" :class="game.result === 'Win' ? 'badge-active' : 'badge-coming-soon'">
                {{ game.result }}
              </span>
              <h3>{{ game.opponent }}</h3>
              <p>{{ game.format }} / {{ game.opening }}</p>
              <small>{{ game.moves }}</small>
            </article>
          </div>
        </article>

        <article class="premium-profile-card">
          <div class="section-kicker">
            <p class="eyebrow">Tournament history</p>
            <h2>Events and sections</h2>
          </div>
          <div class="profile-tournament-list">
            <article v-for="event in profile.tournaments" :key="event.event">
              <div>
                <h3>{{ event.event }}</h3>
                <p>{{ event.section }}</p>
              </div>
              <strong>{{ event.score }}</strong>
              <span>{{ event.place }}</span>
            </article>
          </div>
        </article>
      </div>

      <aside class="profile-side-column">
        <article class="premium-profile-card">
          <p class="panel-label">Achievements</p>
          <div class="profile-badge-grid" aria-label="Profile badges">
            <span v-for="badge in profile.badges" :key="badge">{{ badge }}</span>
          </div>
        </article>

        <article class="premium-profile-card">
          <div class="section-kicker">
            <p class="eyebrow">Activity feed</p>
            <h2>Recent signals</h2>
          </div>
          <ol class="profile-activity-list">
            <li v-for="item in profile.activity" :key="item">{{ item }}</li>
          </ol>
        </article>

        <article class="premium-profile-card profile-role-card">
          <span class="coming-soon-badge">Future role layer</span>
          <h2>{{ profile.role }}</h2>
          <p>{{ profile.roleCopy }}</p>
          <RouterLink class="secondary-button" to="/coaching">Explore coaching tools</RouterLink>
        </article>
      </aside>
    </section>
  </main>
</template>
