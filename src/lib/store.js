import { useCallback, useEffect, useMemo, useState } from 'react'
import { BADGES, CATEGORIES, ME, SEED_EVENTS, SEED_ITEMS, SEED_LEADERBOARD } from '../data/seed.js'

const KEY = 'camploop.v1'

// Points are the gamification currency; kept here so every surface agrees.
export const POINTS = { post: 25, claim: 20 }

const initial = () => ({
  items: SEED_ITEMS,
  events: SEED_EVENTS.map((e) => ({ ...e, joined: false })),
  myPosts: [],
  myClaims: [],
})

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return initial()
    const saved = JSON.parse(raw)
    const base = initial()
    // Merge so new seed content shows up for returning visitors.
    const seen = new Set(saved.items?.map((i) => i.id) || [])
    return {
      items: [...(saved.items || []), ...base.items.filter((i) => !seen.has(i.id))],
      events: base.events.map((e) => ({ ...e, ...(saved.events || []).find((s) => s.id === e.id) })),
      myPosts: saved.myPosts || [],
      myClaims: saved.myClaims || [],
    }
  } catch {
    return initial()
  }
}

const co2For = (categoryId) => CATEGORIES.find((c) => c.id === categoryId)?.co2 ?? 5
// Rough mass proxy per category, used only for the "kept out of the skip" figure.
const KG = { books: 1.2, furniture: 14, electronics: 3.5, kitchen: 2.5, clothes: 0.8, lab: 0.5, sports: 9 }

export function useStore() {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const postItem = useCallback((draft) => {
    const id = `u${Date.now()}`
    const item = {
      id,
      title: draft.title.trim(),
      category: draft.category,
      condition: draft.condition,
      desc: draft.desc.trim(),
      owner: ME.name,
      dorm: draft.dorm,
      pickup: draft.pickup.trim() || 'Message to arrange',
      status: 'available',
      posted: new Date().toISOString().slice(0, 10),
      mine: true,
      wanted: draft.wanted || false,
    }
    setState((s) => ({ ...s, items: [item, ...s.items], myPosts: [...s.myPosts, id] }))
    return item
  }, [])

  const claimItem = useCallback((id) => {
    setState((s) => ({
      ...s,
      items: s.items.map((i) => (i.id === id ? { ...i, status: 'claimed', claimedByMe: true } : i)),
      myClaims: s.myClaims.includes(id) ? s.myClaims : [...s.myClaims, id],
    }))
  }, [])

  const toggleEvent = useCallback((id) => {
    setState((s) => ({
      ...s,
      events: s.events.map((e) =>
        e.id === id ? { ...e, joined: !e.joined, taken: e.taken + (e.joined ? -1 : 1) } : e
      ),
    }))
  }, [])

  const reset = useCallback(() => setState(initial()), [])

  const stats = useMemo(() => {
    const claimed = state.items.filter((i) => i.status === 'claimed')
    const co2 = claimed.reduce((n, i) => n + co2For(i.category), 0)
    const kg = claimed.reduce((n, i) => n + (KG[i.category] ?? 2), 0)

    const joined = state.events.filter((e) => e.joined)
    const eventPoints = joined.reduce((n, e) => n + e.points, 0)
    const myPoints = state.myPosts.length * POINTS.post + state.myClaims.length * POINTS.claim + eventPoints

    // My contribution lands on my own hall's tally.
    const board = SEED_LEADERBOARD
      .map((r) => (r.name === ME.dorm ? { ...r, points: r.points + myPoints, me: true } : r))
      .sort((a, b) => b.points - a.points)

    const byCategory = CATEGORIES
      .map((c) => ({
        id: c.id,
        label: c.label,
        available: state.items.filter((i) => i.category === c.id && i.status === 'available').length,
        rescued: claimed.filter((i) => i.category === c.id).length,
        co2: claimed.filter((i) => i.category === c.id).reduce((n, i) => n + co2For(i.category), 0),
      }))
      .filter((c) => c.available || c.rescued)

    const earned = new Set()
    if (state.myPosts.length) earned.add('first-post')
    if (state.myClaims.length) earned.add('rescuer')
    if (joined.length) earned.add('joiner')
    if (state.myPosts.length && state.myClaims.length && joined.length) earned.add('streak')

    return {
      co2,
      kg,
      exchanges: claimed.length,
      listed: state.items.filter((i) => i.status === 'available').length,
      myPoints,
      myPosts: state.myPosts.length,
      myClaims: state.myClaims.length,
      myEvents: joined.length,
      board,
      topHall: board[0],
      byCategory,
      badges: BADGES.map((b) => ({ ...b, earned: earned.has(b.id) })),
      // Energy Sprint participation across halls — the one live campus-wide campaign.
      sprint: state.events.find((e) => e.id === 'e3'),
    }
  }, [state])

  return { ...state, stats, postItem, claimItem, toggleEvent, reset }
}
