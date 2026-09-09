import React, { useMemo, useState } from 'react'
import { CATEGORIES } from '../data/seed.js'

const catOf = (id) => CATEGORIES.find((c) => c.id === id)

function Item({ item, onClaim }) {
  const cat = catOf(item.category)
  const claimed = item.status === 'claimed'
  return (
    <article className="card item">
      <div className="item-thumb" aria-hidden="true">{cat?.emoji || '📦'}</div>
      <div className="item-body">
        <div className="item-tags">
          <span className="tag">{cat?.label}</span>
          {item.wanted && <span className="tag good">Wanted</span>}
          {claimed && <span className="tag claimed">Claimed</span>}
          {item.mine && <span className="tag good">Yours</span>}
        </div>
        <h3>{item.title}</h3>
        <div className="item-meta">{item.condition} · {item.dorm} · {item.owner}</div>
        <p className="item-desc">{item.desc}</p>
        <div className="item-meta">📍 {item.pickup}</div>
        <div className="item-foot">
          <span className="item-meta">~{cat?.co2 ?? 5} kg CO₂e saved</span>
          <span className="spacer" />
          <button className="btn sm" disabled={claimed || item.mine} onClick={() => onClaim(item)}>
            {claimed ? 'Taken' : item.mine ? 'Your listing' : item.wanted ? 'I have one' : 'Claim'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Exchange({ items, deep, onClaim, onPost }) {
  const [q, setQ] = useState(deep?.query || '')
  const [cat, setCat] = useState(deep?.category || 'all')
  const [hideClaimed, setHideClaimed] = useState(true)

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return items.filter((it) => {
      if (cat !== 'all' && it.category !== cat) return false
      if (hideClaimed && it.status === 'claimed') return false
      if (!needle) return true
      return `${it.title} ${it.desc} ${catOf(it.category)?.label} ${it.dorm}`.toLowerCase().includes(needle)
    })
  }, [items, q, cat, hideClaimed])

  return (
    <div className="wrap">
      <div className="section-head">
        <h2>Campus exchange</h2>
        <p>{shown.length} of {items.length} listings</p>
        <span className="spacer" />
        <button className="btn" onClick={() => onPost(false)}>List an item</button>
        <button className="btn ghost" onClick={() => onPost(true)}>Post a request</button>
      </div>

      <div className="filters">
        <input
          className="input search"
          placeholder="Search listings — lamp, textbook, fridge…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search listings"
        />
        <div className="chips">
          <button className="chip" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c.id} className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
              {c.emoji} {c.label}
            </button>
          ))}
        </div>
        <button className="chip" aria-pressed={!hideClaimed} onClick={() => setHideClaimed((v) => !v)}>
          {hideClaimed ? 'Show claimed' : 'Hiding nothing'}
        </button>
      </div>

      {shown.length === 0 ? (
        <div className="empty">
          Nothing matches. <button className="linkbtn" onClick={() => onPost(true)}>Post a wanted listing</button> and campus will find it.
        </div>
      ) : (
        <div className="grid">
          {shown.map((it) => <Item key={it.id} item={it} onClaim={onClaim} />)}
        </div>
      )}
    </div>
  )
}
