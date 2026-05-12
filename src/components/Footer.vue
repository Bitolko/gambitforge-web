<script setup>
import { RouterLink } from 'vue-router'

const platformLinks = [
  { label: 'Games', to: '/games' },
  { label: 'Tournaments', to: '/tournaments' },
  { label: 'Coaching', to: '/coaching' },
  { label: 'Calendar', to: '/calendar' },
]

const resourceLinks = [
  { label: 'Blog', to: '/blog' },
  { label: 'Tournament Guide', to: '/blog' },
  { label: 'Coaching Tools', to: '/coaching' },
  { label: 'Support' },
]

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy' },
  { label: 'Terms' },
]
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <section class="footer-brand" aria-label="GambitForge">
        <RouterLink class="footer-brand-link" to="/">
          <span class="footer-logo">
            <img src="/gambitforge-logo-web.png" alt="" />
          </span>
          <span>GambitForge</span>
        </RouterLink>
        <p>Modern chess platform for live games, coaching, tournaments, and club management.</p>
      </section>

      <nav class="footer-columns" aria-label="Footer navigation">
        <div class="footer-column">
          <h2>Platform</h2>
          <RouterLink v-for="link in platformLinks" :key="link.label" :to="link.to">
            {{ link.label }}
          </RouterLink>
        </div>

        <div class="footer-column">
          <h2>Resources</h2>
          <template v-for="link in resourceLinks" :key="link.label">
            <RouterLink v-if="link.to" :to="link.to">{{ link.label }}</RouterLink>
            <span v-else class="footer-disabled-link" aria-disabled="true">{{ link.label }}</span>
          </template>
        </div>

        <div class="footer-column">
          <h2>Company</h2>
          <template v-for="link in companyLinks" :key="link.label">
            <RouterLink v-if="link.to" :to="link.to">{{ link.label }}</RouterLink>
            <span v-else class="footer-disabled-link" aria-disabled="true">{{ link.label }}</span>
          </template>
        </div>
      </nav>
    </div>

    <div class="footer-bottom">
      <span>&copy; 2026 GambitForge. All rights reserved.</span>
      <span>Built for players, coaches, clubs, and tournament organisers.</span>
    </div>
  </footer>
</template>
