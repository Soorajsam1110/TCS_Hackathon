import React, { useState } from 'react'
import { CATEGORIES, CONDITIONS, DORMS, ME } from '../data/seed.js'

export default function PostModal({ onClose, onSubmit, wanted = false }) {
  const [form, setForm] = useState({
    title: '', category: 'books', condition: CONDITIONS[1],
    desc: '', dorm: ME.dorm, pickup: '', wanted,
  })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const valid = form.title.trim().length > 2

  return (
    <div className="backdrop" onClick={onClose} role="presentation">
      <div className="card modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={form.wanted ? 'Post a wanted listing' : 'List an item'}>
        <h2>{form.wanted ? 'Post a wanted listing' : 'List something you no longer need'}</h2>
        <p className="sub">
          {form.wanted
            ? 'Tell campus what you are after — most requests get an offer within a couple of days.'
            : 'Someone on campus needs it. Listing takes 20 seconds and earns 25 green points.'}
        </p>
        <form onSubmit={(e) => { e.preventDefault(); if (valid) onSubmit(form) }}>
          <div className="field">
            <label htmlFor="p-title">What is it?</label>
            <input id="p-title" className="input" value={form.title} onChange={set('title')} placeholder="Desk lamp, textbook, mini fridge…" autoFocus />
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="p-cat">Category</label>
              <select id="p-cat" className="select" value={form.category} onChange={set('category')}>
                {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="p-cond">Condition</label>
              <select id="p-cond" className="select" value={form.condition} onChange={set('condition')} disabled={form.wanted}>
                {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="p-desc">Details</label>
            <textarea id="p-desc" className="textarea" value={form.desc} onChange={set('desc')} placeholder="Anything a taker should know — faults, size, what it came with." />
          </div>
          <div className="row2">
            <div className="field">
              <label htmlFor="p-dorm">Where you are</label>
              <select id="p-dorm" className="select" value={form.dorm} onChange={set('dorm')}>
                {DORMS.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="p-pick">Pickup</label>
              <input id="p-pick" className="input" value={form.pickup} onChange={set('pickup')} placeholder="Lobby, evenings" />
            </div>
          </div>
          <div className="modal-foot">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn" disabled={!valid}>{form.wanted ? 'Post request' : 'Publish listing'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
