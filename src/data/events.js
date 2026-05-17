export const events = [
  {
    slug: 'sydney-harbour-classical',
    title: 'Sydney Harbour Classical',
    date: 'Saturday 27 - Sunday 28 June 2026',
    dateISO: '2026-06-27',
    endDateISO: '2026-06-28',
    location: 'Ultimo, NSW',
    state: 'NSW',
    city: 'Sydney',
    organiser: 'NSW Chess Association',
    organiserType: 'Association event',
    organiserBio:
      'A state association coordinating rated tournaments, junior pathways, interclub events, and major weekenders across New South Wales.',
    contact: 'NSWCA event desk via gambitforgeinfo@gmail.com',
    timeControl: 'Classical 60+30',
    registrationStatus: 'Early bird closing soon',
    registrationTone: 'urgent',
    format:
      'Six-round classical Swiss with ACF and FIDE rating submission planned, separate rating groups, and a polished central Sydney venue.',
    venue: 'UTS Building 11, Broadway',
    address: '81 Broadway, Ultimo NSW 2007',
    venueInfo:
      'University venue near Central Station, Railway Square, light rail, food courts, accessible entry, and quiet analysis spaces outside the playing hall.',
    schedule: [
      { time: 'Saturday 9:30 AM', label: 'Opening briefing and section confirmation' },
      { time: 'Saturday 10:00 AM', label: 'Rounds 1-3' },
      { time: 'Sunday 9:30 AM', label: 'Rounds 4-6' },
      { time: 'Sunday 5:45 PM', label: 'Awards and final standings' },
    ],
    divisions: [
      { name: 'Championship', detail: 'FIDE-rated open section' },
      { name: 'Reserve', detail: 'ACF-rated section for developing players' },
      { name: 'Under 1200', detail: 'Friendly rating-restricted division' },
    ],
    entryFee: '$95 adult / $65 concession',
    capacity: '128 players',
    entries: '38 spots left',
    prize: '$4,000 projected prize fund',
    arbiter: 'IA Sarah Nguyen with NSWCA arbiters',
    posterTone: 'Harbour',
    featured: true,
    related: ['melbourne-winter-rapid', 'canberra-winter-classical-open', 'brisbane-scholastic-teams'],
    tags: ['Open', 'Classical'],
  },
  {
    slug: 'melbourne-winter-rapid',
    title: 'Melbourne Winter Rapid',
    date: 'Saturday 13 June 2026',
    dateISO: '2026-06-13',
    endDateISO: '2026-06-13',
    location: 'Fitzroy, VIC',
    state: 'VIC',
    city: 'Melbourne',
    organiser: 'Melbourne Chess Club',
    organiserType: 'Club organiser',
    organiserBio:
      'One of Australia\'s long-running chess clubs, hosting rated nights, city leagues, weekend tournaments, and interclub events.',
    contact: 'Melbourne Chess Club organiser via gambitforgeinfo@gmail.com',
    timeControl: 'Rapid 15+10',
    registrationStatus: 'Registrations open',
    registrationTone: 'open',
    format:
      'Seven-round one-day rapid tournament for club players, juniors, and weekend competitors who want serious games without giving up the whole weekend.',
    venue: 'Melbourne Chess Club',
    address: '66 Leicester Street, Fitzroy VIC 3065',
    venueInfo:
      'Inner-city club venue near Melbourne Central and the university precinct, with analysis rooms, digital clocks, nearby cafes, and a dedicated arbiter desk.',
    schedule: [
      { time: '9:15 AM', label: 'Player check-in' },
      { time: '10:00 AM', label: 'Round 1 begins' },
      { time: '1:00 PM', label: 'Lunch break' },
      { time: '5:10 PM', label: 'Prize presentation' },
    ],
    divisions: [
      { name: 'Open', detail: 'Main rapid section' },
      { name: 'Under 1800', detail: 'Rating-restricted prizes' },
      { name: 'Junior', detail: 'Youth medals and coaching notes' },
    ],
    entryFee: '$45 adult / $30 junior',
    capacity: '84 players',
    entries: '21 spots left',
    prize: '$1,200 guaranteed',
    arbiter: 'FA Marcus Reid with Melbourne Chess Club arbiters',
    posterTone: 'Metro',
    related: ['sydney-harbour-classical', 'adelaide-blitz-night', 'canberra-winter-classical-open'],
    tags: ['Open', 'Rapid', 'Junior'],
  },
  {
    slug: 'brisbane-scholastic-teams',
    title: 'Brisbane Scholastic Teams',
    date: 'Sunday 5 July 2026',
    dateISO: '2026-07-05',
    endDateISO: '2026-07-05',
    location: 'Spring Hill, QLD',
    state: 'QLD',
    city: 'Brisbane',
    organiser: 'Queensland Junior Chess',
    organiserType: 'Junior pathway',
    organiserBio:
      'A junior development network coordinating school chess, weekend events, and pathway tournaments across South East Queensland.',
    contact: 'Queensland junior teams desk via gambitforgeinfo@gmail.com',
    timeControl: 'Rapid 10+5',
    registrationStatus: 'Waitlist active',
    registrationTone: 'waitlist',
    format:
      'School-team tournament with clear divisions, short rounds, board medals, and a friendly format for new and experienced juniors.',
    venue: 'Brisbane Grammar School Hall',
    address: '24 Gregory Terrace, Spring Hill QLD 4000',
    venueInfo:
      'School hall venue with supervised lunch space, bus drop-off, parent waiting areas, spectator zones, and a separate coordinator desk.',
    schedule: [
      { time: '8:30 AM', label: 'Team check-in and board order lock' },
      { time: '9:15 AM', label: 'Round 1 pairings posted' },
      { time: '12:15 PM', label: 'Lunch break' },
      { time: '3:30 PM', label: 'Medal presentation' },
    ],
    divisions: [
      { name: 'Primary', detail: 'Four-player school teams' },
      { name: 'Secondary', detail: 'Four-player school teams' },
      { name: 'Girls', detail: 'Dedicated school shield' },
    ],
    entryFee: '$120 per team',
    capacity: '48 teams',
    entries: 'Waitlist active',
    prize: 'Trophies and board medals',
    arbiter: 'Queensland Junior Chess tournament desk',
    posterTone: 'Junior',
    related: ['sydney-harbour-classical', 'adelaide-blitz-night', 'hobart-rapid-by-the-waterfront'],
    tags: ['Junior', 'School', 'Teams'],
  },
  {
    slug: 'adelaide-blitz-night',
    title: 'Adelaide Blitz Night',
    date: 'Friday 17 July 2026',
    dateISO: '2026-07-17',
    endDateISO: '2026-07-17',
    location: 'Adelaide, SA',
    state: 'SA',
    city: 'Adelaide',
    organiser: 'South Australian Chess Centre',
    organiserType: 'Club night',
    organiserBio:
      'A city chess centre running weekly play, blitz nights, junior tables, and social chess events for Adelaide players.',
    contact: 'South Australian Chess Centre via gambitforgeinfo@gmail.com',
    timeControl: 'Blitz 3+2',
    registrationStatus: 'Registrations open',
    registrationTone: 'open',
    format:
      'Fast games, strong coffee, and a compact Friday night Swiss for players who like their tactics sharp and their evenings social.',
    venue: 'The Joinery, Adelaide CBD',
    address: '111 Franklin Street, Adelaide SA 5000',
    venueInfo:
      'CBD venue a short walk from Adelaide Railway Station, with digital clocks, social analysis tables, and nearby food options.',
    schedule: [
      { time: '6:00 PM', label: 'Doors open and casual warm-up games' },
      { time: '6:30 PM', label: 'Round 1 begins' },
      { time: '9:50 PM', label: 'Final round' },
      { time: '10:10 PM', label: 'Prizes and social analysis' },
    ],
    divisions: [
      { name: 'Open', detail: 'Main blitz section' },
      { name: 'Under 1600', detail: 'Rating-restricted prizes' },
    ],
    entryFee: '$25 flat entry',
    capacity: '64 players',
    entries: '29 spots left',
    prize: '$600 plus performance prizes',
    arbiter: 'South Australian Chess Centre organising team',
    posterTone: 'Blitz',
    related: ['melbourne-winter-rapid', 'perth-friday-night-blitz-arena', 'hobart-rapid-by-the-waterfront'],
    tags: ['Open', 'Blitz'],
  },
  {
    slug: 'perth-friday-night-blitz-arena',
    title: 'Perth Friday Night Blitz Arena',
    date: 'Friday 10 July 2026',
    dateISO: '2026-07-10',
    endDateISO: '2026-07-10',
    location: 'Northbridge, WA',
    state: 'WA',
    city: 'Perth',
    organiser: 'Perth City Chess Club',
    organiserType: 'Club night',
    organiserBio:
      'A city club running weekly play, blitz nights, junior tables, and social chess events for Perth players.',
    contact: 'Perth City Chess Club via gambitforgeinfo@gmail.com',
    timeControl: 'Blitz 3+2',
    registrationStatus: 'Walk-ins welcome',
    registrationTone: 'open',
    format:
      'Evening blitz arena with rolling pairings, live leaderboard previews, casual social tables, and beginner-friendly pairing pools.',
    venue: 'Perth City Chess Club Rooms',
    address: 'Northbridge Community Building, Perth WA',
    venueInfo:
      'Casual Friday venue near public transport, with digital clocks, analysis tables, and a relaxed social playing room.',
    schedule: [
      { time: '6:00 PM', label: 'Doors open and casual warm-up games' },
      { time: '6:30 PM', label: 'Arena starts' },
      { time: '8:15 PM', label: 'Leaderboard check and final sprint' },
      { time: '9:00 PM', label: 'Club prizes' },
    ],
    divisions: [
      { name: 'Open arena', detail: 'Main rolling leaderboard' },
      { name: 'Junior arena', detail: 'Youth-friendly blitz pool' },
      { name: 'Beginner table', detail: 'Casual pairing support' },
    ],
    entryFee: '$20 members / $25 visitors',
    capacity: '64 players',
    entries: 'Walk-ins likely',
    prize: 'Club prizes',
    arbiter: 'Perth City Chess Club organising team',
    posterTone: 'Blitz',
    related: ['adelaide-blitz-night', 'hobart-rapid-by-the-waterfront', 'melbourne-winter-rapid'],
    tags: ['Open', 'Blitz'],
  },
  {
    slug: 'canberra-winter-classical-open',
    title: 'Canberra Winter Classical Open',
    date: 'Saturday 1 - Sunday 2 August 2026',
    dateISO: '2026-08-01',
    endDateISO: '2026-08-02',
    location: 'Griffith, ACT',
    state: 'ACT',
    city: 'Canberra',
    organiser: 'ACT Chess Association',
    organiserType: 'Association event',
    organiserBio:
      'The ACT association supports rated weekend tournaments, club collaboration, junior development, and regional chess growth.',
    contact: 'ACT Chess Association event desk via gambitforgeinfo@gmail.com',
    timeControl: 'Classical 75+10',
    registrationStatus: 'Early bird open',
    registrationTone: 'open',
    format:
      'Five-round classical open with ACF rating submission planned, accelerated pairings if required, and rating-group prizes.',
    venue: 'Griffith Community Centre',
    address: '53 Stuart Street, Griffith ACT 2603',
    venueInfo:
      'Community hall venue with quiet playing conditions, nearby parking, accessible entry, and analysis space outside the main room.',
    schedule: [
      { time: 'Saturday 9:15 AM', label: 'Check-in and arbiter briefing' },
      { time: 'Saturday 10:00 AM', label: 'Round 1' },
      { time: 'Saturday 3:00 PM', label: 'Round 2' },
      { time: 'Sunday 9:30 AM', label: 'Round 4' },
      { time: 'Sunday 4:30 PM', label: 'Awards and final standings' },
    ],
    divisions: [
      { name: 'Open', detail: 'Main classical section' },
      { name: 'Under 1800', detail: 'Rating prize group' },
      { name: 'Under 1400', detail: 'Developing player prize group' },
    ],
    entryFee: '$70 adult / $50 concession / $40 junior',
    capacity: '72 players',
    entries: 'Early bird open',
    prize: '$900 plus rating prizes',
    arbiter: 'ACT Chess Association arbiting panel',
    posterTone: 'Classical',
    related: ['sydney-harbour-classical', 'melbourne-winter-rapid', 'perth-friday-night-blitz-arena'],
    tags: ['Open', 'Classical'],
  },
  {
    slug: 'hobart-rapid-by-the-waterfront',
    title: 'Hobart Rapid by the Waterfront',
    date: 'Sunday 16 August 2026',
    dateISO: '2026-08-16',
    endDateISO: '2026-08-16',
    location: 'Hobart, TAS',
    state: 'TAS',
    city: 'Hobart',
    organiser: 'Tasmanian Chess League',
    organiserType: 'League organiser',
    organiserBio:
      'A Tasmanian league group supporting club events, regional rapid tournaments, juniors, and community chess days.',
    contact: 'Tasmanian Chess League via gambitforgeinfo@gmail.com',
    timeControl: 'Rapid 20+5',
    registrationStatus: 'Community listing',
    registrationTone: 'listed',
    format:
      'Five-round waterfront rapid designed for club players, juniors, and new tournament players, with novice-friendly support.',
    venue: 'Waterside Pavilion, Salamanca',
    address: 'Salamanca Place, Hobart TAS 7000',
    venueInfo:
      'Waterfront community venue with scenic surrounds, accessible entry, nearby cafes, and an analysis area after the final round.',
    schedule: [
      { time: '9:00 AM', label: 'Check-in and casual boards' },
      { time: '9:45 AM', label: 'Round 1' },
      { time: '12:30 PM', label: 'Lunch on the waterfront' },
      { time: '3:15 PM', label: 'Final round' },
      { time: '4:00 PM', label: 'Awards and community photos' },
    ],
    divisions: [
      { name: 'Open', detail: 'Main rapid section' },
      { name: 'Junior', detail: 'Youth medals' },
      { name: 'Novice friendly', detail: 'Support for first-time players' },
    ],
    entryFee: '$30 adult / $20 junior',
    capacity: '56 players',
    entries: 'Community listing',
    prize: 'Local sponsor prizes',
    arbiter: 'Tasmanian Chess League volunteer arbiters',
    posterTone: 'Waterfront',
    related: ['adelaide-blitz-night', 'perth-friday-night-blitz-arena', 'brisbane-scholastic-teams'],
    tags: ['Open', 'Rapid', 'Junior'],
  },
]

const defaultEventFaqs = [
  {
    question: 'Is registration handled inside GambitForge yet?',
    answer:
      'Not yet. These pages are public MVP event rooms. Native entries, payments, waitlists, and organiser approval can connect when the production backend is deployed.',
  },
  {
    question: 'Should players bring a chess set or clock?',
    answer:
      'The sample event information notes whether equipment is expected. For most club and association events, organisers provide clocks and boards for the main playing room.',
  },
  {
    question: 'Are pairings and standings live?',
    answer:
      'The pairings and standings shown here are previews of the tournament experience GambitForge is designed to support.',
  },
]

const cityTravelNotes = {
  NSW: 'Central Sydney public transport access with nearby food, parent waiting areas, and accessible building entry.',
  VIC: 'Inner-city Melbourne location close to tram routes, cafes, university precincts, and club analysis rooms.',
  QLD: 'School-friendly Brisbane venue with drop-off guidance, parent areas, and supervised junior flow.',
  SA: 'CBD Adelaide venue near public transport, evening food options, and social post-game analysis space.',
  WA: 'Central Perth club-room setting with casual analysis tables and public transport nearby.',
  ACT: 'Quiet Canberra community venue with parking, accessible entry, and separate analysis space.',
  TAS: 'Hobart waterfront location with nearby cafes, accessible entry, and a relaxed community playing room.',
}

function buildPreview(event) {
  const standingsNames = {
    NSW: ['Norths Chess Club', 'Sydney Academy Squad', 'St George Chess Club', 'Canterbury Juniors'],
    VIC: ['Melbourne Chess Club', 'Box Hill Chess Club', 'Hobsons Bay Chess Club', 'Dandenong Junior Squad'],
    QLD: ['Brisbane Grammar A', 'St Peters A', 'Somerville House', 'Churchie B'],
    SA: ['Adelaide Chess Centre', 'Norwood Chess Club', 'Modbury Junior Squad', 'Flinders University Chess'],
    WA: ['Perth City Chess Club', 'Kingsley Chess Club', 'UWA Chess Association', 'Fremantle Junior Squad'],
    ACT: ['Canberra Chess Club', 'ANU Chess Society', 'Telopea Park Juniors', 'Belconnen Chess Group'],
    TAS: ['Hobart Chess Club', 'Launceston Chess Club', 'Tasmanian Junior Squad', 'Kingston Community Chess'],
  }

  const players = standingsNames[event.state] || standingsNames.NSW

  return {
    ...event,
    venueAmenities: [
      cityTravelNotes[event.state] || 'Venue notes, access details, and player guidance will be published before round one.',
      'Digital clocks and boards noted by organiser before event day.',
      'Pairings, standings, and announcements designed to be visible from the public event room.',
    ],
    organiserHighlights: [
      event.organiserType,
      event.arbiter,
      `${event.divisions.length} tournament divisions`,
    ],
    standingsPreview: players.map((name, index) => ({
      rank: index + 1,
      name,
      score: ['3.0', '2.5', '2.0', '2.0'][index],
      section: event.divisions[Math.min(index, event.divisions.length - 1)]?.name || 'Open',
    })),
    pairingsPreview: [
      { board: 1, white: players[0], black: players[1], result: 'Pending' },
      { board: 2, white: players[2], black: players[3], result: 'Pending' },
      { board: 3, white: event.divisions[0]?.name || 'Open', black: event.divisions[1]?.name || 'Reserve', result: 'Scheduled' },
    ],
    faqs: defaultEventFaqs,
  }
}

export const eventExperiences = events.map(buildPreview)

export function findEventBySlug(slug) {
  return eventExperiences.find((event) => event.slug === slug)
}
