<script setup>
import { ref } from 'vue'

const openIndex = ref(0)

const faqItems = [
  {
    question: 'What is GambitForge?',
    answer:
      'GambitForge is a modern chess platform for live games, tournament management, coaching, calendars, content, and club event workflows.',
  },
  {
    question: 'Who is GambitForge for?',
    answer:
      'GambitForge is built for players, coaches, tournament directors, club organisers, academies, schools, and chess communities that need practical digital tools.',
  },
  {
    question: 'Can I run tournaments on GambitForge?',
    answer:
      'Yes. GambitForge is building tournament tools for creating events, managing players, generating rounds, entering results, and tracking standings.',
  },
  {
    question: 'Does GambitForge support live games?',
    answer:
      'Yes. Live games are part of the platform direction, with game rooms, invite links, legal moves, clocks, and a focused playing experience.',
  },
  {
    question: 'Are coaching tools available?',
    answer:
      'Coaching tools are part of the roadmap, including student management, training assignments, game review, and progress tracking for coaches and academies.',
  },
  {
    question: 'Can clubs use GambitForge?',
    answer:
      'Yes. GambitForge is designed for club nights, school events, coaching programs, local tournaments, and the recurring operations behind chess communities.',
  },
  {
    question: 'Is GambitForge free?',
    answer:
      'GambitForge is still growing. Pricing and access options will become clearer as more club, tournament, and coaching features are released.',
  },
  {
    question: 'How do I contact GambitForge?',
    answer:
      'Use the Contact page to get in touch about clubs, coaching academies, school events, tournaments, or early platform interest.',
  },
]

function toggleItem(index) {
  openIndex.value = openIndex.value === index ? -1 : index
}
</script>

<template>
  <main class="platform-page faq-page">
    <section class="platform-hero faq-hero" aria-labelledby="faq-title">
      <div>
        <p class="eyebrow">FAQ</p>
        <h1 id="faq-title">Answers Before Your First Move</h1>
        <p>Quick guidance for clubs, coaches, organisers, and players exploring GambitForge.</p>
      </div>
      <div class="faq-hero-stack" aria-label="FAQ topics">
        <span>Platform</span>
        <span>Tournaments</span>
        <span>Coaching</span>
        <span>Clubs</span>
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
          <span>{{ item.question }}</span>
          <span class="faq-toggle-mark" aria-hidden="true">{{ openIndex === index ? '-' : '+' }}</span>
        </button>

        <div v-show="openIndex === index" :id="`faq-answer-${index}`" class="faq-answer">
          <p>{{ item.answer }}</p>
        </div>
      </article>
    </section>
  </main>
</template>
