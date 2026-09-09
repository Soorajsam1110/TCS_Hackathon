import React, { useEffect, useRef, useState } from 'react'
import { askAssistant, STARTERS } from '../lib/assistant.js'
import { rich } from '../lib/rich.jsx'

const GREETING = {
  role: 'bot',
  reply: {
    title: 'Hi — campus sustainability assistant',
    answer: 'I answer three kinds of question, and I check the exchange before ever telling you to recycle something:',
    bullets: [
      '**Which bin?** — name the item: "dead battery", "greasy pizza box", "old lab coat".',
      '**Save energy** — heating, AC, standby load, laundry, kitchen, lighting.',
      '**Find or pass on stuff** — "I need a desk lamp", "what do I do with a broken bike?"',
    ],
    actions: [],
  },
}

export default function Assistant({ ctx, onAction }) {
  const [log, setLog] = useState([GREETING])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [log, busy])

  async function send(text) {
    const q = text.trim()
    if (!q || busy) return
    setDraft('')
    setLog((l) => [...l, { role: 'user', text: q }])
    setBusy(true)
    const reply = await askAssistant(q, ctx)
    setBusy(false)
    setLog((l) => [...l, { role: 'bot', reply }])
  }

  return (
    <div className="wrap">
      <div className="section-head">
        <h2>Sustainability assistant</h2>
        <p>Rule-based over a campus waste &amp; energy knowledge base — works offline, no data leaves the page.</p>
      </div>

      <div className="assistant">
        <div className="card chat">
          <div className="chat-log">
            {log.map((m, i) =>
              m.role === 'user' ? (
                <div className="msg user" key={i}>{m.text}</div>
              ) : (
                <div className="msg bot" key={i}>
                  <div className="bubble">
                    {m.reply.title && <div><strong>{m.reply.title}</strong></div>}
                    <p style={{ marginTop: m.reply.title ? 6 : 0 }}>{rich(m.reply.answer)}</p>
                    {m.reply.bullets?.length > 0 && (
                      <ul>{m.reply.bullets.map((b, j) => <li key={j}>{rich(b)}</li>)}</ul>
                    )}
                  </div>
                  {m.reply.actions?.length > 0 && (
                    <div className="msg-actions">
                      {m.reply.actions.map((a, j) => (
                        <button key={j} className="chip" onClick={() => (a.ask ? send(a.ask) : onAction(a))}>
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
            {busy && <div className="msg bot"><div className="bubble" style={{ color: 'var(--text-muted)' }}>Checking the knowledge base…</div></div>}
            <div ref={endRef} />
          </div>

          <div className="suggests">
            {STARTERS.map((s) => (
              <button key={s} className="chip" onClick={() => send(s)}>{s}</button>
            ))}
          </div>

          <form className="chat-form" onSubmit={(e) => { e.preventDefault(); send(draft) }}>
            <input
              className="input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask about a bin, an appliance, or something you want to pass on…"
              aria-label="Ask the assistant"
            />
            <button className="btn" type="submit" disabled={!draft.trim() || busy}>Ask</button>
          </form>
        </div>

        <div className="side-stack">
          <div className="card side-card">
            <h3>Rule of thumb</h3>
            <ul>
              <li><strong>Refuse</strong> — do not acquire it.</li>
              <li><strong>Reuse</strong> — the exchange, before buying.</li>
              <li><strong>Repair</strong> — Repair Café, Thursdays.</li>
              <li><strong>Recycle</strong> — right bin, clean and dry.</li>
              <li><strong>Rot</strong> — food waste to the brown bin.</li>
            </ul>
          </div>
          <div className="card side-card">
            <h3>Never in a normal bin</h3>
            <ul>
              <li>Batteries, power banks, vapes</li>
              <li>Lab chemicals, sharps, gloves</li>
              <li>CFL and fluorescent tubes</li>
              <li>Medicines — return to a pharmacy</li>
              <li>Cooking oil — used-oil drum</li>
            </ul>
          </div>
          <div className="card side-card">
            <h3>How this works</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Keyword-scored intent routing over {'{'}disposal, energy, live listings, events, impact{'}'}.
              <code style={{ fontSize: 12 }}> askAssistant()</code> is the async seam — point it at a
              server-side model proxy and this stays the offline fallback.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
