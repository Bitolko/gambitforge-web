<script setup>
import { computed, reactive, ref } from 'vue'
import { RouterLink } from 'vue-router'

const submitted = ref(false)
const activeStep = ref(0)

const steps = [
  { label: 'Basics', detail: 'Event details' },
  { label: 'Venue', detail: 'Schedule' },
  { label: 'Promote', detail: 'Review' },
]

const form = reactive({
  eventName: 'Sydney Winter Rapid Classic',
  organiser: 'Harbour Chess Academy',
  email: 'events@harbourchess.example',
  state: 'NSW',
  venue: 'Parramatta Town Hall, Centenary Square',
  date: '',
  timeControl: 'Rapid 15+10',
  eventType: 'Rapid',
  divisions: 'Open, Under 1600, Junior U12',
  entryFee: '$35 early entry',
  registrationLink: '',
  description:
    'Seven-round Swiss rapid tournament for juniors and club players, with rating-group prizes, clear schedule, parent waiting area, and future live standings preview.',
})

const benefits = [
  'Reach Australian players, parents, clubs, and coaches searching by state and format.',
  'Show venue notes, sections, time controls, schedule, organiser profile, and registration links.',
  'Prepare future pairings, standings, results, and analytics workflows from one listing.',
]

const featuredExamples = [
  {
    title: 'Queensland Junior Grand Prix',
    meta: 'Brisbane / Rapid 10+5 / Under 8 to Under 16',
  },
  {
    title: 'Melbourne Club Teams Weekend',
    meta: 'Carlton / Classical 60+10 / Premier and Reserve',
  },
  {
    title: 'Perth Friday Night Blitz Arena',
    meta: 'Northbridge / Blitz 3+2 / Open arena',
  },
]

const faqs = [
  {
    question: 'What happens after I submit?',
    answer:
      'For now, this is a frontend preview. The future workflow will send submissions into a moderation queue before publishing.',
  },
  {
    question: 'Can I list school and junior events?',
    answer:
      'Yes. GambitForge is designed for opens, junior tournaments, school carnivals, club nights, coaching programs, and team events.',
  },
  {
    question: 'Will registrations be handled here?',
    answer:
      'The current flow captures a registration link. Later phases can add native entries, waitlists, payment state, and organiser approval.',
  },
]

const previewDivisions = computed(() => (
  form.divisions
    .split(',')
    .map((division) => division.trim())
    .filter(Boolean)
))

function setStep(index) {
  activeStep.value = index
}

function nextStep() {
  activeStep.value = Math.min(activeStep.value + 1, steps.length - 1)
}

function previousStep() {
  activeStep.value = Math.max(activeStep.value - 1, 0)
}

function submitEvent() {
  activeStep.value = steps.length - 1
  submitted.value = true
}
</script>

<template>
  <main class="submit-event-page organiser-onboarding-page">
    <section class="submit-event-hero" aria-labelledby="submit-event-title">
      <div class="submit-event-copy">
        <p class="eyebrow">Organiser onboarding</p>
        <h1 id="submit-event-title">List Your Chess Event on GambitForge</h1>
        <p>
          Build a credible public event room for Australian tournaments, club nights, junior
          circuits, school carnivals, and coaching programs before registrations go live.
        </p>
        <div class="discovery-hero-metrics" aria-label="Submission workflow highlights">
          <span><strong>Review</strong> moderation queue</span>
          <span><strong>Public</strong> event preview</span>
          <span><strong>Future</strong> analytics</span>
        </div>
      </div>

      <aside class="submit-event-panel organiser-hero-panel" aria-label="Organiser portal preview">
        <span class="coming-soon-badge">Frontend onboarding</span>
        <h2>From listing to tournament room</h2>
        <p>
          Event submissions are shaped for discovery now, then registration, pairings, standings,
          and organiser dashboards when backend persistence is connected.
        </p>
        <div class="submit-event-steps">
          <button
            v-for="(step, index) in steps"
            :key="step.label"
            type="button"
            :class="{ active: activeStep === index }"
            @click="setStep(index)"
          >
            <small>Step {{ index + 1 }}</small>
            <span>{{ step.label }}</span>
            <em>{{ step.detail }}</em>
          </button>
        </div>
      </aside>
    </section>

    <section class="organiser-benefits-section" aria-labelledby="why-list-title">
      <div>
        <p class="eyebrow">Why list your event?</p>
        <h2 id="why-list-title">Give players a trusted place to understand, enter, and follow your event</h2>
      </div>

      <div class="organiser-benefits-grid">
        <article v-for="benefit in benefits" :key="benefit">
          <span class="status-badge badge-active">Benefit</span>
          <p>{{ benefit }}</p>
        </article>
      </div>
    </section>

    <section class="submit-event-layout organiser-submit-layout" aria-label="Submit an event">
      <form class="submit-event-form organiser-step-form" aria-label="Submit event form" @submit.prevent="submitEvent">
        <div class="form-step-indicator" aria-label="Submission progress">
          <span
            v-for="(step, index) in steps"
            :key="step.label"
            :class="{ active: activeStep === index, complete: activeStep > index }"
          >
            {{ index + 1 }}
          </span>
        </div>

        <section v-show="activeStep === 0" class="form-step-panel" aria-labelledby="event-basics-title">
          <div class="section-kicker">
            <p class="eyebrow">Step 1</p>
            <h2 id="event-basics-title">Event basics</h2>
          </div>

          <div class="form-grid-two">
            <label>
              <span>Event Name</span>
              <input v-model="form.eventName" type="text" name="eventName" placeholder="Sydney Junior Open" required />
            </label>

            <label>
              <span>Organiser</span>
              <input v-model="form.organiser" type="text" name="organiser" placeholder="Harbour Chess Academy" required />
            </label>

            <label>
              <span>Email</span>
              <input v-model="form.email" type="email" name="email" autocomplete="email" placeholder="organiser@example.com" required />
            </label>

            <label>
              <span>Event type</span>
              <select v-model="form.eventType" name="eventType">
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
        </section>

        <section v-show="activeStep === 1" class="form-step-panel" aria-labelledby="event-schedule-title">
          <div class="section-kicker">
            <p class="eyebrow">Step 2</p>
            <h2 id="event-schedule-title">Venue, divisions, and schedule</h2>
          </div>

          <div class="form-grid-two">
            <label>
              <span>State</span>
              <select v-model="form.state" name="state" required>
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
              <span>Date</span>
              <input v-model="form.date" type="date" name="date" />
            </label>

            <label>
              <span>Venue</span>
              <input v-model="form.venue" type="text" name="venue" placeholder="Club hall, school, library, or venue" />
            </label>

            <label>
              <span>Time control</span>
              <input v-model="form.timeControl" type="text" name="timeControl" placeholder="Rapid 15+10, Blitz 3+2, Classical 60+10" />
            </label>

            <label>
              <span>Tournament divisions</span>
              <input v-model="form.divisions" type="text" name="divisions" placeholder="Open, Under 1600, Junior U12" />
            </label>

            <label>
              <span>Entry fee</span>
              <input v-model="form.entryFee" type="text" name="entryFee" placeholder="$35 early entry" />
            </label>
          </div>
        </section>

        <section v-show="activeStep === 2" class="form-step-panel" aria-labelledby="event-promotion-title">
          <div class="section-kicker">
            <p class="eyebrow">Step 3</p>
            <h2 id="event-promotion-title">Promotion and review</h2>
          </div>

          <label>
            <span>Registration link</span>
            <input v-model="form.registrationLink" type="url" name="registrationLink" placeholder="https://example.com/register" />
          </label>

          <label>
            <span>Description</span>
            <textarea
              v-model="form.description"
              name="description"
              rows="6"
              placeholder="Tell players about the format, sections, prizes, schedule, venue notes, and who the event is for."
            ></textarea>
          </label>

          <div class="flyer-upload-placeholder premium-flyer-uploader">
            <div class="flyer-preview-card" aria-hidden="true">
              <span>{{ form.state || 'AUS' }}</span>
              <strong>{{ form.eventType }}</strong>
              <em>{{ form.timeControl || 'Time control' }}</em>
            </div>
            <div>
              <span class="coming-soon-badge">Flyer placeholder</span>
              <h2>Upload event artwork later</h2>
              <p>PDF and image uploads will connect to backend storage in a future phase.</p>
            </div>
            <button class="secondary-button" type="button" disabled>Upload Flyer</button>
          </div>

          <label class="terms-row">
            <input type="checkbox" name="terms" required />
            <span>I confirm this event information is accurate and suitable for public listing.</span>
          </label>
        </section>

        <div class="submit-event-actions organiser-form-actions">
          <button v-if="activeStep > 0" class="secondary-button" type="button" @click="previousStep">Back</button>
          <button v-if="activeStep < steps.length - 1" class="hero-primary" type="button" @click="nextStep">Continue</button>
          <button v-else class="hero-primary" type="submit">Preview Submission</button>
          <RouterLink class="secondary-button" to="/events">Back to Events</RouterLink>
        </div>
      </form>

      <aside class="submit-event-side-card event-promotion-preview">
        <p class="eyebrow">Event promotion preview</p>
        <div class="event-flyer event-flyer-large" data-tone="Harbour" aria-hidden="true">
          <span>{{ form.state || 'AUS' }}</span>
          <strong>{{ form.timeControl || 'Time control' }}</strong>
        </div>
        <h2>{{ form.eventName || 'Your chess event' }}</h2>
        <p>{{ form.venue || 'Venue to be confirmed' }}</p>
        <div class="event-division-row">
          <span v-for="division in previewDivisions" :key="division">{{ division }}</span>
        </div>
        <div class="analytics-preview">
          <span><strong>Search</strong> State and format filters</span>
          <span><strong>Traffic</strong> Future listing analytics</span>
          <span><strong>Entries</strong> Future conversion view</span>
        </div>
      </aside>
    </section>

    <section class="organiser-review-section" aria-labelledby="review-process-title">
      <div>
        <p class="eyebrow">Moderation and review</p>
        <h2 id="review-process-title">A listing should feel trustworthy before it goes public</h2>
        <p>
          Future submissions can enter a review queue for duplicate checks, venue clarity, organiser
          verification, safe public copy, and category quality before being published.
        </p>
      </div>
      <div class="review-flow-grid">
        <span>Submitted</span>
        <span>Reviewed</span>
        <span>Published</span>
        <span>Promoted</span>
      </div>
    </section>

    <section class="featured-event-examples" aria-labelledby="featured-examples-title">
      <div class="section-kicker">
        <p class="eyebrow">Featured examples</p>
        <h2 id="featured-examples-title">Listings can support the full Australian chess ecosystem</h2>
      </div>
      <div class="event-preview-grid">
        <article v-for="example in featuredExamples" :key="example.title" class="event-preview-card">
          <span class="coming-soon-badge">Example</span>
          <h3>{{ example.title }}</h3>
          <p>{{ example.meta }}</p>
        </article>
      </div>
    </section>

    <section class="organiser-faq-section" aria-labelledby="organiser-faq-title">
      <div class="section-kicker">
        <p class="eyebrow">Organiser FAQ</p>
        <h2 id="organiser-faq-title">Questions before listing</h2>
      </div>
      <div class="organiser-faq-grid">
        <article v-for="item in faqs" :key="item.question">
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </article>
      </div>
    </section>

    <div v-if="submitted" class="submit-success-backdrop" role="presentation" @click.self="submitted = false">
      <section class="submit-success-modal organiser-success-modal" role="dialog" aria-modal="true" aria-labelledby="submit-success-title">
        <span class="status-badge badge-active">Preview ready</span>
        <h2 id="submit-success-title">{{ form.eventName }} is ready for review</h2>
        <p>
          This frontend-only confirmation previews the future submission queue. Backend review,
          storage, email notifications, moderation notes, and publishing controls can be connected later.
        </p>
        <div class="review-flow-grid compact-review-flow">
          <span>Submission captured</span>
          <span>Review pending</span>
          <span>Publish later</span>
        </div>
        <button class="hero-primary" type="button" @click="submitted = false">Close</button>
      </section>
    </div>
  </main>
</template>
