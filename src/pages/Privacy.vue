<script setup>
import { RouterLink } from 'vue-router'

const sections = [
  {
    title: 'Information we collect',
    body:
      'During the public MVP, GambitForge mainly collects information you choose to send through enquiry emails, event submissions, and early access requests. This may include your name, email address, club or organisation, event details, and message content.',
  },
  {
    title: 'How we use information',
    body:
      'We use submitted information to respond to enquiries, understand Australian chess community needs, review event listings, plan early access, and improve public platform content.',
  },
  {
    title: 'Backend beta features',
    body:
      'Account, games, tournament room, dashboard, and admin features are marked as beta until production backend services are connected. When those services launch publicly, this policy should be reviewed for account data, game records, and organiser workflows.',
  },
  {
    title: 'Sharing and storage',
    body:
      'We do not sell personal information. Information may be handled through standard email and hosting providers needed to operate the website and respond to enquiries.',
  },
  {
    title: 'Contact',
    body:
      'For privacy questions or correction requests, contact gambitforgeinfo@gmail.com.',
  },
]
</script>

<template>
  <main class="platform-page legal-page trust-page">
    <section class="platform-hero trust-hero legal-hero" aria-labelledby="privacy-title">
      <div>
        <p class="eyebrow">Privacy Policy</p>
        <h1 id="privacy-title">Privacy for the GambitForge public MVP.</h1>
        <p>
          This policy explains how GambitForge handles information while the public website focuses on
          Australian chess discovery, event submissions, articles, and early access enquiries.
        </p>
      </div>
      <aside class="trust-signal-panel legal-summary-card">
        <span class="coming-soon-badge">MVP policy</span>
        <h2>Plain-language summary</h2>
        <p>We use submitted details to respond, review event information, and improve GambitForge. Public account features remain beta.</p>
      </aside>
    </section>

    <section class="legal-content" aria-label="Privacy policy sections">
      <article v-for="section in sections" :key="section.title" class="trust-card legal-card">
        <h2>{{ section.title }}</h2>
        <p>{{ section.body }}</p>
      </article>
    </section>

    <section class="final-cta-section trust-final-cta" aria-labelledby="privacy-cta-title">
      <div>
        <p class="eyebrow">Questions</p>
        <h2 id="privacy-cta-title">Need to ask about data or event information?</h2>
      </div>
      <RouterLink class="hero-primary" to="/contact">Contact GambitForge</RouterLink>
    </section>
  </main>
</template>
