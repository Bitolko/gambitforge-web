<template>
  <main class="platform-page contact-page">
    <section class="platform-hero contact-hero" aria-labelledby="contact-title">
      <div>
        <p class="eyebrow">Contact</p>
        <h1 id="contact-title">Bring GambitForge to Your Chess Community</h1>
        <p>
          Interested in using GambitForge for your club, coaching academy, school event, or tournament?
          Get in touch.
        </p>
      </div>
      <aside class="contact-hero-preview" aria-label="GambitForge contact preview">
        <span class="coming-soon-badge">Partnership desk</span>
        <div class="contact-orbit-card">
          <strong>Club onboarding</strong>
          <span>Profiles, calendars, events</span>
        </div>
        <div class="contact-orbit-card">
          <strong>Tournament tools</strong>
          <span>Pairings, standings, live rooms</span>
        </div>
        <div class="contact-orbit-card">
          <strong>Coaching academies</strong>
          <span>Programs, cohorts, progress</span>
        </div>
      </aside>
    </section>

    <section class="contact-layout" aria-label="Contact details">
      <form class="contact-form-panel" aria-label="Contact form" @submit.prevent>
        <label>
          <span>Name</span>
          <input type="text" name="name" autocomplete="name" placeholder="Your name" />
        </label>

        <label>
          <span>Email</span>
          <input type="email" name="email" autocomplete="email" placeholder="you@example.com" />
        </label>

        <label>
          <span>Role</span>
          <select name="role" autocomplete="organization-title">
            <option>Player</option>
            <option>Coach</option>
            <option>Club organiser</option>
            <option>Tournament director</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          <span>Message</span>
          <textarea
            name="message"
            rows="6"
            placeholder="Tell us about your club, academy, school event, or tournament."
          ></textarea>
        </label>

        <button type="submit" disabled>Coming soon</button>
      </form>

      <aside class="contact-info-card">
        <span class="coming-soon-badge">Early access</span>
        <h2>Built for chess clubs, coaches, schools, and tournament organisers.</h2>
        <div class="contact-signal-grid" aria-label="Contact priorities">
          <span>Club setup</span>
          <span>Event migration</span>
          <span>Coach profiles</span>
          <span>School programs</span>
        </div>
        <div class="contact-email-block">
          <span>Email</span>
          <strong>hello@gambitforge.com</strong>
        </div>
      </aside>
    </section>
  </main>
</template>
