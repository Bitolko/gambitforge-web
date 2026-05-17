<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const openIndex = ref(0)

const faqItems = [
  {
    category: 'Platform',
    question: 'What is GambitForge?',
    answer:
      'GambitForge is a modern chess platform for Australian chess communities. It brings together public discovery pages, event listings, club and coach profiles, live games, tournament workflows, and future organiser tools.',
  },
  {
    category: 'Events',
    question: 'Can I list a chess event on GambitForge?',
    answer:
      'Yes. The Submit Event page currently previews the listing workflow for tournaments, club nights, school carnivals, junior events, rapid tournaments, blitz nights, and coaching programs. Backend moderation and persistence can be connected later.',
  },
  {
    category: 'Events',
    question: 'What information should an event listing include?',
    answer:
      'A useful listing should include the venue, suburb and state, date, time control, organiser, divisions, entry fee, prize information, registration status, schedule, capacity, and any arrival notes players or parents need before round one.',
  },
  {
    category: 'Tournaments',
    question: 'Can GambitForge run tournaments?',
    answer:
      'Tournament rooms are part of the platform direction. The goal is to support entries, player lists, divisions, pairings, results, standings, byes, organiser announcements, and live public pages from one workflow.',
  },
  {
    category: 'Coaching',
    question: 'What coaching features are planned?',
    answer:
      'GambitForge is designed to support coach profiles now and future workflows such as student groups, training assignments, game review, progress notes, program pages, and academy-level visibility.',
  },
  {
    category: 'Clubs',
    question: 'How can a chess club use GambitForge?',
    answer:
      'A club can use GambitForge to build a stronger public presence, promote events and club nights, connect players with coaches, and prepare for future member, calendar, event, and tournament operations.',
  },
  {
    category: 'Pricing',
    question: 'Is GambitForge free?',
    answer:
      'GambitForge is still in an early product stage. Public discovery pages and previews are being shaped first. Pricing for clubs, organisers, coaches, and advanced tournament tools will be clarified as those workflows become production-ready.',
  },
  {
    category: 'Early access',
    question: 'How do I request early access?',
    answer:
      'Use the Contact page and describe your club, academy, school, tournament, or organiser workflow. Early access is best suited to groups with real events, recurring chess activity, or a clear operational need.',
  },
  {
    category: 'Trust',
    question: 'Is backend registration active yet?',
    answer:
      'Not yet for these public trust and discovery flows. Current event submission and registration surfaces are frontend previews, so backend storage, payments, moderation, and email notifications are intentionally not changed in this phase.',
  },
]

function toggleItem(index) {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<template>
  <main class="platform-page faq-page trust-page">
    <section class="platform-hero faq-hero trust-hero" aria-labelledby="faq-title">
      <div>
        <p class="eyebrow">FAQ</p>
        <h1 id="faq-title">Straight answers for clubs, coaches, organisers, and players.</h1>
        <p>
          Learn how GambitForge handles events, tournaments, coaching, pricing direction,
          and early access while the platform grows.
        </p>
        <div class="hero-actions trust-hero-actions">
          <RouterLink class="hero-primary" to="/contact">Request Early Access</RouterLink>
          <RouterLink class="secondary-button" to="/events">View Events</RouterLink>
        </div>
      </div>
      <div class="faq-hero-stack trust-signal-panel" aria-label="FAQ topics">
        <span>Events</span>
        <span>Tournaments</span>
        <span>Coaching</span>
        <span>Pricing</span>
        <span>Early access</span>
      </div>
    </section>

    <section class="faq-list" aria-label="Frequently asked questions">
      <article v-for="(item, index) in faqItems" :key="item.question" class="faq-card">
        <button
          class="faq-question"
          type="button"
          :aria-expanded="openIndex === index"
          :aria-controls="`faq-answer-${index}`"
          @click="toggleItem(index)"
        >
          <span>
            <small>{{ item.category }}</small>
            {{ item.question }}
          </span>
          <span class="faq-toggle-mark" aria-hidden="true">{{ openIndex === index ? '-' : '+' }}</span>
        </button>

        <div v-show="openIndex === index" :id="`faq-answer-${index}`" class="faq-answer">
          <p>{{ item.answer }}</p>
        </div>
      </article>
    </section>
  </main>
</template>
