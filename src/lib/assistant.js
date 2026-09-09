import { DISPOSAL, ENERGY } from '../data/kb.js'
import { CATEGORIES } from '../data/seed.js'

const STOP = new Set([
  'a', 'an', 'the', 'is', 'it', 'i', 'do', 'to', 'of', 'in', 'on', 'for', 'my', 'me',
  'can', 'how', 'what', 'where', 'should', 'with', 'and', 'or', 'this', 'that', 'be',
  'am', 'are', 'you', 'we', 'get', 'got', 'have', 'has', 'any', 'some', 'about', 'at',
  // intent words, not object words: they must not match listing text
  'free', 'cheap', 'need', 'needs', 'want', 'wants', 'looking', 'look', 'borrow',
  'available', 'anyone', 'spare', 'old', 'used', 'second', 'hand', 'there', 'week',
])

// Campus vocabulary vs. listing vocabulary. Keeps the matcher honest without a model.
const SYNONYMS = {
  textbook: ['book'], textbooks: ['book'], coursebook: ['book'], notes: ['book'],
  bicycle: ['bike'], cycle: ['bike'],
  couch: ['sofa', 'furniture'], sofa: ['furniture'], stool: ['chair', 'furniture'],
  wardrobe: ['furniture'], drawer: ['furniture'], shelving: ['bookshelf', 'shelf'],
  screen: ['monitor'], display: ['monitor'], laptop: ['electronics'],
  lamp: ['lamp', 'light'], light: ['lamp'],
  pan: ['kitchen'], pot: ['kitchen'], cutlery: ['kitchen'], plates: ['kitchen'],
  microwave: ['kitchen'], kettle: ['kettle', 'kitchen'], fridge: ['fridge', 'kitchen'],
  coat: ['jacket', 'clothes'], hoodie: ['clothes'], trousers: ['clothes'], shoes: ['clothes'],
  calculator: ['calculator', 'lab'], stationery: ['lab'],
  weights: ['sports'], gym: ['sports'], racket: ['sports'],
}

const expand = (list) => {
  const out = new Set(list)
  for (const w of list) for (const alt of SYNONYMS[w] || []) out.add(alt)
  return [...out]
}

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9\s'-]/g, ' ').replace(/\s+/g, ' ').trim()
const words = (s) => norm(s).split(' ').filter((w) => w && !STOP.has(w))

/** Keyword score: multi-word keywords count more than single tokens. */
function score(query, keywords) {
  const q = norm(query)
  const qw = new Set(words(query))
  let total = 0
  for (const kw of keywords) {
    const k = norm(kw)
    if (k.includes(' ')) {
      if (q.includes(k)) total += 4
    } else if (qw.has(k)) {
      total += 2
    } else if (k.length > 4 && q.includes(k)) {
      total += 1 // catches plurals / suffixes: "batteries" ~ "battery"
    }
  }
  return total
}

function best(query, entries) {
  let top = null
  for (const e of entries) {
    const s = score(query, e.keywords)
    if (s > 0 && (!top || s > top.s)) top = { s, e }
  }
  return top
}

const has = (query, list) => {
  const q = norm(query)
  return list.some((t) => q.includes(t))
}

const LOOKING_FOR = ['looking for', 'need a', 'need an', 'need some', 'want a', 'want an',
  'anyone have', 'is there a', 'is there an', 'can i borrow', 'borrow a', 'find a', 'find an',
  'available', 'second hand', 'secondhand', 'cheap', 'free']

const EVENT_WORDS = ['event', 'events', 'activity', 'activities', 'volunteer', 'happening',
  'this week', 'sign up', 'signup', 'join', 'challenge', 'sprint', 'workshop', 'clean-up',
  'cleanup', 'repair cafe', 'repair café', 'swap market', 'community']

const IMPACT_WORDS = ['impact', 'co2', 'carbon', 'saved', 'savings', 'stats', 'statistics',
  'how much have', 'leaderboard', 'points', 'my score', 'ranking', 'diverted']

const HELP_PHRASES = ['what can you do', 'who are you', 'how does this work', 'what is this']
const HELP_TOKENS = ['help', 'hello', 'hi', 'hey', 'yo', 'start']

/** Greetings must match whole words — "this week" contains "hi". */
const isGreeting = (query) => {
  const q = norm(query)
  if (HELP_PHRASES.some((p) => q.includes(p))) return true
  const w = q.split(' ')
  return w.length <= 3 && w.some((t) => HELP_TOKENS.includes(t))
}

const fmt = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })

/** Search live listings so answers point at real inventory, not generic advice. */
function searchItems(query, items) {
  const qw = expand(words(query))
  if (!qw.length) return []
  return items
    .filter((it) => it.status === 'available')
    .map((it) => {
      const cat = CATEGORIES.find((c) => c.id === it.category)
      const hay = norm(`${it.title} ${it.desc} ${cat ? cat.label : ''} ${it.category}`)
      const hits = qw.filter((w) => hay.includes(w) || (w.length > 3 && hay.includes(w.slice(0, -1))))
      return { it, n: hits.length }
    })
    .filter((r) => r.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, 4)
    .map((r) => r.it)
}

function listingAnswer(query, matches) {
  return {
    title: `${matches.length} listing${matches.length > 1 ? 's' : ''} on campus right now`,
    answer: 'Reuse before buying — this is already on campus, so its footprint is paid for.',
    bullets: matches.map((it) => `**${it.title}** — ${it.condition}, ${it.dorm} (${it.owner}). Pickup: ${it.pickup}.`),
    actions: [
      { label: 'Open in exchange', tab: 'exchange', query: words(query)[0] || '' },
      { label: 'Nothing fits — post a request', tab: 'exchange', post: true },
    ],
  }
}

function noMatchAnswer(query) {
  return {
    title: 'Nothing listed for that yet',
    answer: 'Nobody has posted a match. Two things that usually work:',
    bullets: [
      'Post a **wanted** listing — most items here get offered within a couple of days.',
      'The Move-out Swap Market on Sep 14 is where the volume is; bring nothing, take what you need.',
    ],
    actions: [
      { label: 'Post a wanted listing', tab: 'exchange', post: true },
      { label: 'See swap market', tab: 'community' },
    ],
  }
}

function eventAnswer(events) {
  const next = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 3)
  return {
    title: 'Green campus activities coming up',
    answer: 'Joining earns points for you and your hall. Next three:',
    bullets: next.map((e) => {
      const left = e.spots - e.taken
      return `**${e.title}** — ${new Date(e.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}, ${e.time}, ${e.place}. +${e.points} pts, ${left} spot${left === 1 ? '' : 's'} left.`
    }),
    actions: [{ label: 'Open community board', tab: 'community' }],
  }
}

function impactAnswer(stats) {
  return {
    title: 'Campus impact so far',
    answer: `${fmt(stats.co2)} kg CO₂e avoided and ${fmt(stats.kg)} kg kept out of the skips through ${stats.exchanges} exchange${stats.exchanges === 1 ? '' : 's'}.`,
    bullets: [
      `Your green points: **${fmt(stats.myPoints)}** — ${stats.myClaims} claimed, ${stats.myPosts} listed, ${stats.myEvents} activit${stats.myEvents === 1 ? 'y' : 'ies'} joined.`,
      `Top hall: **${stats.topHall.name}** with ${fmt(stats.topHall.points)} pts.`,
      'Estimates use per-category embodied-carbon averages, so treat them as order-of-magnitude.',
    ],
    actions: [{ label: 'See the numbers', tab: 'overview' }],
  }
}

const HELP = {
  title: 'Sustainability assistant',
  answer: 'Ask about waste, energy or what to do with something you no longer want. Three things I do:',
  bullets: [
    '**Which bin?** — name any item ("dead battery", "greasy pizza box", "old lab coat").',
    '**Save energy** — heating, AC, standby load, laundry, kitchen, lighting.',
    '**Reuse first** — I check live listings before telling you to recycle anything.',
  ],
  actions: [
    { label: 'Where do batteries go?', ask: 'Where do dead batteries go?' },
    { label: 'Cut my dorm energy use', ask: 'How do I cut my dorm energy use?' },
    { label: "What's happening this week?", ask: "What green events are happening this week?" },
  ],
}

const FALLBACK = {
  title: 'Not sure about that one',
  answer: 'I only cover campus waste streams, energy use and the exchange. Nearest useful things:',
  bullets: [
    'Name the material ("carton", "soft plastic", "toner cartridge") and I will give you the bin.',
    'Ask about heating, AC, standby load, laundry, kitchen or lighting for energy savings.',
    'Anything hazardous — chemicals, sharps, swollen batteries — goes through your lab manager or Facilities, not a bin.',
  ],
  actions: [
    { label: 'Show me the exchange', tab: 'exchange' },
    { label: 'Upcoming activities', tab: 'community' },
  ],
}

/**
 * Rule-based intent router.
 * Swap the body of `askAssistant` below for a real model call; this stays the offline fallback.
 */
export function respond(query, ctx) {
  const { items = [], events = [], stats } = ctx || {}
  const q = norm(query)
  if (!q) return HELP
  if (isGreeting(q)) return HELP

  const disposal = best(q, DISPOSAL)
  const energy = best(q, ENERGY)
  const wantsItem = has(q, LOOKING_FOR)
  const matches = searchItems(q, items)

  // "I need a desk lamp" — live inventory beats both advice and event routing.
  if (wantsItem && matches.length) return listingAnswer(q, matches)

  if (wantsItem && !matches.length && !disposal && !energy) return noMatchAnswer(q)

  if (stats && has(q, IMPACT_WORDS)) return impactAnswer(stats)
  if (has(q, EVENT_WORDS)) return eventAnswer(events)

  const kb = !disposal ? energy : !energy ? disposal : energy.s > disposal.s ? energy : disposal
  if (kb) {
    const e = kb.e
    const actions = []
    if (e.reuse) {
      const cat = CATEGORIES.find((c) => c.id === e.reuse)
      const open = items.filter((it) => it.category === e.reuse && it.status === 'available').length
      actions.push({
        label: open ? `${open} in ${cat.label.toLowerCase()} now` : `List it in ${cat.label.toLowerCase()}`,
        tab: 'exchange',
        category: e.reuse,
        post: !open,
      })
    }
    if (matches.length) actions.push({ label: `${matches.length} matching listing${matches.length > 1 ? 's' : ''}`, tab: 'exchange', query: words(q)[0] })
    if (e.id === 'ewaste' || e.id === 'bike' || e.id === 'furniture') actions.push({ label: 'Repair Café details', tab: 'community' })
    return { ...e, actions }
  }

  if (matches.length) return listingAnswer(q, matches)
  return FALLBACK
}

/**
 * Async seam for a hosted model. Keep the signature; to go live, POST to a small
 * server-side proxy (never call a model API from the browser with a key in it)
 * and fall back to `respond` on any failure.
 */
export async function askAssistant(query, ctx) {
  return respond(query, ctx)
}

export const STARTERS = [
  'Where do dead batteries go?',
  'I need a desk lamp',
  'Is a pizza box recyclable?',
  'How do I cut my heating bill?',
  'What can I do with a broken bike?',
  'How much CO₂ have we saved?',
]
