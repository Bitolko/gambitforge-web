<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const submitted = ref(false)

function submitEvent() {
  submitted.value = true
}
</script>

<template>
  <main class="submit-event-page">
    <section class="submit-event-hero" aria-labelledby="submit-event-title">
      <div class="submit-event-copy">
        <p class="eyebrow">Event submission portal</p>
        <h1 id="submit-event-title">Submit a Chess Event to GambitForge</h1>
        <p>
          Share tournaments, club events, coaching programs, junior competitions, and school chess
          activities with players across Australia.
        </p>
      </div>

      <aside class="submit-event-panel" aria-label="Organiser portal preview">
        <span class="coming-soon-badge">Frontend first</span>
        <h2>Built for organisers</h2>
        <p>
          Event submissions will later connect to review workflows, public listings, organiser
          dashboards, and registration tools.
        </p>
        <div class="submit-event-steps">
          <span>Submit</span>
          <span>Review</span>
          <span>Publish</span>
        </div>
      </aside>
    </section>

    <section class="submit-event-layout" aria-label="Submit an event">
      <form class="submit-event-form" aria-label="Submit event form" @submit.prevent="submitEvent">
        <div class="form-grid-two">
          <label>
            <span>Event Name</span>
            <input type="text" name="eventName" placeholder="Sydney Junior Open" required />
          </label>

          <label>
            <span>Organiser</span>
            <input type="text" name="organiser" placeholder="Harbour Chess Academy" required />
          </label>

          <label>
            <span>Email</span>
            <input type="email" name="email" autocomplete="email" placeholder="organiser@example.com" required />
          </label>

          <label>
            <span>State</span>
            <select name="state" required>
              <option value="">Select state</option>
              <option>NSW</option>
              <option>VIC</option>
              <option>QLD</option>
              <option>WA</option>
              <option>SA</option>
              <option>ACT</option>
              <option>TAS</option>
              <option>NT</option>
            </select>
          </label>

          <label>
            <span>Venue</span>
            <input type="text" name="venue" placeholder="Club hall, school, library, or venue" />
          </label>

          <label>
            <span>Date</span>
            <input type="date" name="date" />
          </label>

          <label>
            <span>Time control</span>
            <input type="text" name="timeControl" placeholder="Rapid 15+10, Blitz 3+2, Classical 60+10" />
          </label>

          <label>
            <span>Event type</span>
            <select name="eventType">
              <option>Junior</option>
              <option>Open</option>
              <option>Rapid</option>
              <option>Blitz</option>
              <option>Classical</option>
              <option>School</option>
              <option>Club</option>
              <option>Coaching program</option>
            </select>
          </label>
        </div>

        <label>
          <span>Registration link</span>
          <input type="url" name="registrationLink" placeholder="https://example.com/register" />
        </label>

        <label>
          <span>Description</span>
          <textarea
            name="description"
            rows="6"
            placeholder="Tell players about the format, sections, prizes, schedule, venue notes, and who the event is for."
          ></textarea>
        </label>

        <div class="flyer-upload-placeholder">
          <div>
            <span class="coming-soon-badge">Placeholder</span>
            <h2>Flyer upload</h2>
            <p>PDF and image uploads will be added when event submissions connect to backend storage.</p>
          </div>
          <button class="secondary-button" type="button" disabled>Upload Flyer</button>
        </div>

        <label class="terms-row">
          <input type="checkbox" name="terms" required />
          <span>I confirm this event information is accurate and suitable for public listing.</span>
        </label>

        <div class="submit-event-actions">
          <button class="hero-primary" type="submit">Preview Submission</button>
          <RouterLink class="secondary-button" to="/events">Back to Events</RouterLink>
        </div>
      </form>

      <aside class="submit-event-side-card">
        <p class="eyebrow">What listings can include</p>
        <h2>Designed for Australian chess discovery</h2>
        <ul>
          <li>Public event cards and detail pages</li>
          <li>Registration links and organiser contact</li>
          <li>State, format, school, junior, and club filters</li>
          <li>Future pairings, standings, and live results</li>
        </ul>
      </aside>
    </section>

    <div v-if="submitted" class="submit-success-backdrop" role="presentation" @click.self="submitted = false">
      <section class="submit-success-modal" role="dialog" aria-modal="true" aria-labelledby="submit-success-title">
        <span class="status-badge badge-active">Preview saved</span>
        <h2 id="submit-success-title">Event submission preview ready</h2>
        <p>
          This is a frontend-only confirmation for now. Backend review, storage, email, and publishing
          workflows can be connected later.
        </p>
        <button class="hero-primary" type="button" @click="submitted = false">Close</button>
      </section>
    </div>
  </main>
</template>
