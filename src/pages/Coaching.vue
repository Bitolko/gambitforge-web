<script setup>
const coachingFeatures = [
  {
    title: 'Student Management',
    description: 'Keep player profiles, goals, session notes, and improvement priorities organized in one coaching workspace.',
    metric: '12 students',
  },
  {
    title: 'Training Assignments',
    description: 'Assign calculation drills, opening prep, endgame work, and study tasks that match each student plan.',
    metric: '34 tasks',
  },
  {
    title: 'Game Review',
    description: 'Review games, capture recurring mistakes, and turn analysis into clear next steps for measurable progress.',
    metric: '8 reviews',
  },
]
</script>

<template>
  <main class="platform-page coaching-page">
    <section class="platform-hero coaching-hero" aria-labelledby="coaching-title">
      <div>
        <p class="eyebrow">Coaching suite</p>
        <h1 id="coaching-title">Coaching Tools for Serious Chess Improvement</h1>
        <p>
          Manage students, assign focused training work, review games, and track progress across every stage of a player's development.
        </p>
      </div>
      <aside class="coaching-progress-mockup" aria-label="Coaching progress preview">
        <div class="preview-card-heading">
          <span class="coming-soon-badge">Roadmap</span>
          <span class="status-badge badge-active">Insight panel</span>
        </div>
        <h2>Student Insight</h2>
        <div class="student-insight-grid" aria-label="Student coaching metrics">
          <span><strong>82%</strong> Tactics</span>
          <span><strong>14</strong> Tasks</span>
          <span><strong>3</strong> Reviews</span>
        </div>
        <div class="mastery-track" aria-hidden="true">
          <span class="track-node active"></span>
          <span class="track-node active"></span>
          <span class="track-node current"></span>
          <span class="track-node"></span>
        </div>
        <div class="mock-analysis-card">
          <strong>Game review</strong>
          <p>Convert recurring mistakes into the next assignment block.</p>
        </div>
      </aside>
    </section>

    <section class="platform-feature-grid" aria-label="Coaching features">
      <article v-for="feature in coachingFeatures" :key="feature.title" class="platform-feature-card">
        <div class="preview-card-heading">
          <span class="coming-soon-badge">Roadmap</span>
          <span class="status-badge badge-coming-soon">{{ feature.metric }}</span>
        </div>
        <div class="feature-visual coaching-visual" aria-hidden="true">
          <div class="coach-bars">
            <span style="width: 72%"></span>
            <span style="width: 88%"></span>
            <span style="width: 58%"></span>
          </div>
        </div>
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
        <button class="secondary-button" type="button" disabled>Roadmap Feature</button>
      </article>
    </section>
  </main>
</template>
