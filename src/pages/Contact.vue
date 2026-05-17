<script setup>
import { computed, reactive } from 'vue'

const contactEmail = 'gambitforgeinfo@gmail.com'

const form = reactive({
  name: '',
  email: '',
  organization: '',
  role: 'Club onboarding',
  message: '',
})

const enquiryFlows = [
  {
    title: 'Clubs',
    description: 'Set up a public club profile, promote club nights, and prepare for future member and event workflows.',
  },
  {
    title: 'Organisers',
    description: 'Discuss tournament listings, event rooms, registration previews, pairings, standings, and moderation needs.',
  },
  {
    title: 'Coaches',
    description: 'Explore coach profiles, academy pages, student program visibility, and future training workflows.',
  },
  {
    title: 'Schools',
    description: 'Plan school carnivals, junior circuits, team events, parent-facing information, and safe event discovery.',
  },
]

const contactPlaceholders = [
  { label: 'Email', value: contactEmail },
  { label: 'Events desk', value: contactEmail },
  { label: 'LinkedIn', value: 'linkedin.com/company/gambitforge' },
  { label: 'Instagram', value: '@gambitforge' },
]

const flowSteps = [
  'Tell us who you support',
  'Share your event or club goals',
  'Review the best starting workflow',
  'Join early access when ready',
]

const mailtoHref = computed(() => {
  const subject = encodeURIComponent(`GambitForge enquiry: ${form.role || 'Public MVP'}`)
  const body = encodeURIComponent(
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Organisation or club: ${form.organization}`,
      `Enquiry type: ${form.role}`,
      '',
      'Message:',
      form.message,
    ].join('\n'),
  )

  return `mailto:${contactEmail}?subject=${subject}&body=${body}`
})
</script>

<template>
  <main class="platform-page contact-page trust-page">
    <section class="platform-hero contact-hero trust-hero" aria-labelledby="contact-title">
      <div>
        <p class="eyebrow">Contact</p>
        <h1 id="contact-title">Bring GambitForge to your chess community.</h1>
        <p>
          Use this page for club onboarding, tournament organiser enquiries, coaching academy
          interest, school programs, event submissions, and early access conversations.
        </p>
      </div>
      <aside class="contact-hero-preview trust-signal-panel" aria-label="GambitForge contact preview">
        <span class="coming-soon-badge">Enquiry flow</span>
        <div v-for="step in flowSteps" :key="step" class="contact-orbit-card">
          <strong>{{ step }}</strong>
          <span>Clear next step</span>
        </div>
      </aside>
    </section>

    <section class="contact-flow-section" aria-labelledby="enquiry-flow-title">
      <div class="section-kicker">
        <p class="eyebrow">Who should contact us?</p>
        <h2 id="enquiry-flow-title">Choose the path that best matches your chess work.</h2>
      </div>
      <div class="contact-flow-grid">
        <article v-for="flow in enquiryFlows" :key="flow.title" class="trust-card">
          <span class="coming-soon-badge">{{ flow.title }}</span>
          <h3>{{ flow.title }}</h3>
          <p>{{ flow.description }}</p>
        </article>
      </div>
    </section>

    <section class="contact-layout" aria-label="Contact details">
      <form class="contact-form-panel" aria-label="Contact form" @submit.prevent>
        <div class="section-kicker">
          <p class="eyebrow">Enquiry form</p>
          <h2>Tell us what you are building.</h2>
        </div>

        <label>
          <span>Name</span>
          <input v-model="form.name" type="text" name="name" autocomplete="name" placeholder="Your name" />
        </label>

        <label>
          <span>Email</span>
          <input v-model="form.email" type="email" name="email" autocomplete="email" placeholder="organiser@club.org.au" />
        </label>

        <label>
          <span>Organisation or club</span>
          <input v-model="form.organization" type="text" name="organization" autocomplete="organization" placeholder="Club, academy, school, or event name" />
        </label>

        <label>
          <span>Enquiry type</span>
          <select v-model="form.role" name="role" autocomplete="organization-title">
            <option>Club onboarding</option>
            <option>Tournament organiser</option>
            <option>Submit an event</option>
            <option>Coaching academy</option>
            <option>School program</option>
            <option>Early access</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          <span>Message</span>
          <textarea
            v-model="form.message"
            name="message"
            rows="6"
            placeholder="Tell us your location, audience, event format, current workflow, and what you want GambitForge to help with."
          ></textarea>
        </label>

        <a class="button-link hero-primary contact-mail-button" :href="mailtoHref">Email GambitForge</a>
        <p class="contact-form-note">
          This opens your email app and sends the enquiry to {{ contactEmail }} while backend email delivery is not connected.
        </p>
      </form>

      <aside class="contact-info-card">
        <span class="coming-soon-badge">Early access</span>
        <h2>Best for clubs, coaches, schools, and organisers preparing real chess activity.</h2>
        <div class="contact-signal-grid" aria-label="Contact priorities">
          <span>Club setup</span>
          <span>Event migration</span>
          <span>Coach profiles</span>
          <span>School programs</span>
        </div>
        <div class="contact-social-list" aria-label="Contact and social placeholders">
          <div v-for="item in contactPlaceholders" :key="item.label" class="contact-email-block">
            <span>{{ item.label }}</span>
            <strong>
              <a v-if="item.value === contactEmail" :href="`mailto:${contactEmail}`">{{ item.value }}</a>
              <span v-else>{{ item.value }}</span>
            </strong>
          </div>
        </div>
      </aside>
    </section>
  </main>
</template>
