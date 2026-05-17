<script setup>
import { RouterLink } from 'vue-router'

const contactEmail = 'gambitforgeinfo@gmail.com'
const mailtoHref = `mailto:${contactEmail}?subject=GambitForge%20beta%20access`
</script>

<template>
  <main class="auth-page">
    <section class="auth-shell" aria-labelledby="login-title">
      <div class="auth-panel">
        <RouterLink class="auth-brand" to="/">
          <span class="auth-brand-logo">
            <img src="/gambitforge-logo-ui.webp" alt="GambitForge logo" width="40" height="40" />
          </span>
          <span>GambitForge</span>
        </RouterLink>

        <div>
          <p class="eyebrow">Beta access</p>
          <h1 id="login-title">Account login is not public yet</h1>
          <p class="lede">
            GambitForge is currently open for public event discovery, articles, contact enquiries,
            and event submissions. Games, tournaments, dashboards, and admin tools are private beta
            until the production backend is connected.
          </p>
        </div>

        <div class="auth-beta-panel" role="note">
          <span class="coming-soon-badge">Demo/Beta</span>
          <h2>No account required for the public MVP</h2>
          <p>Use the public pages below while authenticated features are being prepared for production.</p>
          <div class="auth-beta-actions">
            <RouterLink class="hero-primary" to="/events">Browse Events</RouterLink>
            <RouterLink class="secondary-button" to="/submit-event">Submit Event</RouterLink>
            <a class="secondary-button" :href="mailtoHref">Request Beta Access</a>
          </div>
        </div>

        <p class="auth-switch">
          Questions? Email <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
        </p>
      </div>

      <aside class="auth-visual-panel" aria-label="GambitForge beta preview">
        <p class="eyebrow">Public MVP</p>
        <h2>Discover Australian chess now. Accounts arrive with the backend.</h2>
        <div class="auth-visual-grid">
          <article>
            <span>Live now</span>
            <strong>Events</strong>
          </article>
          <article>
            <span>Live now</span>
            <strong>Articles</strong>
          </article>
          <article>
            <span>Beta</span>
            <strong>Games</strong>
          </article>
          <article>
            <span>Beta</span>
            <strong>Tournaments</strong>
          </article>
        </div>
      </aside>
    </section>
  </main>
</template>
