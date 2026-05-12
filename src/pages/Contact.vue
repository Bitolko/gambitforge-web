<template>
  <main class="platform-page contact-page">
    <section class="platform-hero contact-hero" aria-labelledby="contact-title">
      <div>
        <p class="eyebrow">Contact</p>
        <h1 id="contact-title">Contact GambitForge</h1>
        <p>
          Interested in using GambitForge for your club, coaching academy, school event, or tournament?
          Get in touch.
        </p>
      </div>
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
        <span class="coming-soon-badge">Frontend only</span>
        <h2>Built for chess clubs, coaches, schools, and tournament organisers.</h2>
        <div class="contact-email-block">
          <span>Email</span>
          <strong>hello@gambitforge.com</strong>
        </div>
      </aside>
    </section>
  </main>
</template>
