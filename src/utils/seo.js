const siteName = 'GambitForge'
const defaultImage = '/gambitforge-logo-web.png'
const defaultDescription =
  'GambitForge is a modern chess platform for live games, tournaments, events, coaching, clubs, and Australian chess communities.'

const pageMeta = {
  home: {
    title: 'GambitForge | Chess Tournaments, Coaching, Clubs and Live Games',
    description:
      'Run chess tournaments, manage live games, discover events, support coaches, and build stronger chess clubs with GambitForge.',
    type: 'website',
  },
  events: {
    title: 'Chess Events Across Australia | GambitForge',
    description:
      'Discover Australian chess tournaments, junior competitions, club events, school chess activities, and coaching programs.',
    type: 'website',
    structuredType: 'EventDirectory',
  },
  'event-detail': {
    title: ({ params }) => `${titleFromSlug(params.slug)} | Australian Chess Event | GambitForge`,
    description: ({ params }) =>
      `View details, venue information, organiser notes, registration previews, and future live tools for ${titleFromSlug(params.slug)} on GambitForge.`,
    type: 'article',
    structuredType: 'Event',
  },
  'submit-event': {
    title: 'Submit a Chess Event | GambitForge',
    description:
      'Submit an Australian chess tournament, club event, coaching program, junior competition, or school chess activity to GambitForge.',
    type: 'website',
  },
  clubs: {
    title: 'Australian Chess Clubs and Academies | GambitForge',
    description:
      'Find Australian chess clubs, junior academies, school chess programs, coaching hubs, and community chess groups.',
    type: 'website',
    structuredType: 'OrganizationDirectory',
  },
  'club-detail': {
    title: ({ params }) => `${titleFromSlug(params.slug)} | Chess Club Profile | GambitForge`,
    description: ({ params }) =>
      `Explore ${titleFromSlug(params.slug)} on GambitForge, including location, coaching information, upcoming events, contact details, and future member tools.`,
    type: 'profile',
    structuredType: 'Organization',
  },
  coaches: {
    title: 'Chess Coaches Directory | GambitForge',
    description:
      'Discover chess coaches for junior coaching, online lessons, beginner training, advanced improvement, and tournament preparation.',
    type: 'website',
    structuredType: 'PersonDirectory',
  },
  'coach-detail': {
    title: ({ params }) => `${titleFromSlug(params.slug)} | Chess Coach Profile | GambitForge`,
    description: ({ params }) =>
      `View ${titleFromSlug(params.slug)} on GambitForge, including coaching specialties, lesson formats, availability previews, testimonials, and future booking tools.`,
    type: 'profile',
    structuredType: 'Person',
  },
  tournaments: {
    title: 'Chess Tournament Management | GambitForge',
    description:
      'Create chess tournaments, manage registration, pairings, standings, results, and organiser workflows in GambitForge.',
    type: 'website',
  },
  games: {
    title: 'Live Chess Games | GambitForge',
    description:
      'Create chess game invites, manage live boards, track clocks, continue active games, and review completed game records.',
    type: 'website',
  },
  coaching: {
    title: 'Chess Coaching Tools | GambitForge',
    description:
      'Manage chess students, training assignments, game reviews, coaching progress, and improvement plans with GambitForge.',
    type: 'website',
  },
  calendar: {
    title: 'Chess Calendar | GambitForge',
    description:
      'Plan upcoming chess tournaments, coaching sessions, club nights, school events, and community chess activities.',
    type: 'website',
  },
  blog: {
    title: 'Chess Blog, Tournament Guides and Platform Updates | GambitForge',
    description:
      'Read future GambitForge updates, chess improvement articles, tournament guides, organiser notes, and community stories.',
    type: 'website',
  },
  about: {
    title: 'About GambitForge | Modern Chess Platform',
    description:
      'Learn about GambitForge, a modern chess platform built for live games, tournament management, coaching, clubs, and school events.',
    type: 'website',
  },
  faq: {
    title: 'Frequently Asked Questions | GambitForge',
    description:
      'Find answers about GambitForge, tournaments, live games, coaching tools, club features, pricing direction, and contact options.',
    type: 'website',
  },
  contact: {
    title: 'Contact GambitForge | Clubs, Coaches, Schools and Events',
    description:
      'Contact GambitForge about using the platform for your chess club, coaching academy, school event, or tournament.',
    type: 'website',
  },
  login: {
    title: 'Login | GambitForge',
    description: 'Log in to GambitForge to manage chess games, tournaments, coaching tools, and event workflows.',
    type: 'website',
  },
  register: {
    title: 'Create Account | GambitForge',
    description: 'Create a GambitForge account to access chess games, tournaments, coaching tools, and organiser features.',
    type: 'website',
  },
  profile: {
    title: ({ params }) => `${titleFromSlug(params.username)} | Chess Player Profile | GambitForge`,
    description: ({ params }) =>
      `View the public GambitForge chess profile for ${titleFromSlug(params.username)}, including rating, favourite openings, recent games, tournament history, badges, and future coaching roles.`,
    type: 'profile',
    structuredType: 'Person',
  },
  dashboard: {
    title: 'Dashboard | GambitForge',
    description: 'View your GambitForge chess activity, games, tournaments, profile, and next available platform tools.',
    type: 'website',
  },
  admin: {
    title: 'Admin | GambitForge',
    description: 'Manage GambitForge platform administration, users, tournaments, games, and operational activity.',
    type: 'website',
  },
  game: {
    title: 'Chess Game | GambitForge',
    description: 'Open a live GambitForge chess game board with legal moves, clocks, players, and game status.',
    type: 'website',
  },
  tournament: {
    title: 'Tournament Room | GambitForge',
    description: 'Open a GambitForge tournament room with players, pairings, standings, results, and organiser controls.',
    type: 'website',
  },
  'not-found': {
    title: 'Page Not Found | GambitForge',
    description: 'The requested GambitForge page could not be found.',
    type: 'website',
  },
}

function titleFromSlug(slug = '') {
  return String(slug)
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || siteName
}

function routeValue(value, route) {
  return typeof value === 'function' ? value(route) : value
}

function absoluteUrl(path = '/') {
  const origin = window.location.origin || 'https://gambitforge.com'
  return new URL(path, origin).toString()
}

function ensureMeta(selector, attributes) {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

function ensureLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function buildStructuredData(route, meta, title, description, canonicalUrl) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonicalUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: absoluteUrl('/'),
    },
  }

  if (meta.structuredType === 'Event') {
    return {
      ...base,
      mainEntity: {
        '@type': 'Event',
        name: titleFromSlug(route.params.slug),
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
          '@type': 'Place',
          name: 'Australian chess venue placeholder',
          address: 'Australia',
        },
        organizer: {
          '@type': 'Organization',
          name: siteName,
        },
      },
    }
  }

  if (meta.structuredType === 'Organization') {
    return {
      ...base,
      mainEntity: {
        '@type': 'Organization',
        name: titleFromSlug(route.params.slug),
        address: 'Australia',
      },
    }
  }

  if (meta.structuredType === 'Person') {
    return {
      ...base,
      mainEntity: {
        '@type': 'Person',
        name: titleFromSlug(route.params.slug),
        jobTitle: 'Chess coach',
      },
    }
  }

  return base
}

function setStructuredData(data) {
  const id = 'gambitforge-structured-data'
  let element = document.getElementById(id)

  if (!element) {
    element = document.createElement('script')
    element.id = id
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(data)
}

export function applySeo(route) {
  const meta = pageMeta[route.name] || pageMeta['not-found']
  const title = routeValue(meta.title, route)
  const description = routeValue(meta.description, route) || defaultDescription
  const canonicalUrl = absoluteUrl(route.fullPath || '/')
  const imageUrl = absoluteUrl(defaultImage)

  document.title = title

  ensureMeta('meta[name="description"]', { name: 'description', content: description })
  ensureMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow' })
  ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName })
  ensureMeta('meta[property="og:title"]', { property: 'og:title', content: title })
  ensureMeta('meta[property="og:description"]', { property: 'og:description', content: description })
  ensureMeta('meta[property="og:type"]', { property: 'og:type', content: meta.type || 'website' })
  ensureMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
  ensureMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl })
  ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' })
  ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
  ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
  ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl })
  ensureLink('canonical', canonicalUrl)
  setStructuredData(buildStructuredData(route, meta, title, description, canonicalUrl))
}
