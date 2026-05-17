<script setup>
import { RouterLink } from 'vue-router'

const contactEmail = 'gambitforgeinfo@gmail.com'
const mailtoHref = `mailto:${contactEmail}?subject=GambitForge%20early%20access%20request`
</script>

<template>
  <main class="auth-page">
    <section class="auth-shell" aria-labelledby="register-title">
      <div class="auth-panel">
        <RouterLink class="auth-brand" to="/">
          <span class="auth-brand-logo">
            <img src="/gambitforge-logo-ui.webp" alt="GambitForge logo" width="40" height="40" />
          </span>
          <span>GambitForge</span>
        </RouterLink>

        <div>
          <p class="eyebrow">Early access</p>
          <h1 id="register-title">Public account creation is in beta</h1>
          <p class="lede">
            Registration will open once the production backend, email, moderation, and account
            workflows are ready. For now, use GambitForge as a public Australian chess discovery
            platform and contact us for early access.
          </p>
        </div>

        <div class="auth-beta-panel" role="note">
          <span class="coming-soon-badge">Demo/Beta</span>
          <h2>Join the public MVP without creating an account</h2>
          <p>
            Explore events, read tournament guides, submit event details, or tell us about your club,
            academy, school, or tournament workflow.
          </p>
          <div class="auth-beta-actions">
            <RouterLink class="hero-primary" to="/contact">Contact GambitForge</RouterLink>
            <RouterLink class="secondary-button" to="/events">Browse Events</RouterLink>
            <a class="secondary-button" :href="mailtoHref">Request Early Access</a>
          </div>
        </div>

        <p class="auth-switch">
          Direct email: <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
        </p>
      </div>

      <aside class="auth-visual-panel" aria-label="GambitForge early access preview">
        <p class="eyebrow">Beta roadmap</p>
        <h2>Accounts will unlock private chess operations when backend deployment is ready.</h2>
        <div class="auth-visual-grid">
          <article>
            <span>Public</span>
            <strong>Events</strong>
          </article>
          <article>
            <span>Public</span>
            <strong>Contact</strong>
          </article>
          <article>
            <span>Beta</span>
            <strong>Dashboards</strong>
          </article>
          <article>
            <span>Beta</span>
            <strong>Admin</strong>
          </article>
        </div>
      </aside>
    </section>
  </main>
</template>
