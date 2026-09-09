import React from 'react'

const fmt = (n) => n.toLocaleString('en-US')

const dayParts = (iso) => {
  const d = new Date(iso + 'T00:00:00')
  return { d: d.getDate(), m: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase() }
}

function Event({ ev, onToggle }) {
  const { d, m } = dayParts(ev.date)
  const left = ev.spots - ev.taken
  const pct = Math.min(100, (ev.taken / ev.spots) * 100)
  return (
    <article className="card event">
      <div className="event-top">
        <div className="event-date"><div className="d">{d}</div><div className="m">{m}</div></div>
        <div style={{ minWidth: 0 }}>
          <h3>{ev.title}</h3>
          <div className="e-meta">{ev.time} · {ev.place} · hosted by {ev.host}</div>
        </div>
      </div>
      <p className="e-desc">{ev.desc}</p>
      <div className="meter-row">
        <div className="meter-head">
          <span className="m-name">{fmt(ev.taken)} signed up</span>
          <span className="m-val">{left > 0 ? `${fmt(left)} spots left` : 'Full'}</span>
        </div>
        <div className="meter-track"><div className="meter-fill" style={{ width: `${pct}%` }} /></div>
      </div>
      <div className="event-foot">
        <span className="tag">{ev.kind}</span>
        <span className="tag good">+{ev.points} pts</span>
        <span className="spacer" />
        <button className={ev.joined ? 'btn ghost sm' : 'btn sm'} onClick={() => onToggle(ev.id)} disabled={!ev.joined && left <= 0}>
          {ev.joined ? 'Joined ✓ — leave' : left > 0 ? 'Join' : 'Full'}
        </button>
      </div>
    </article>
  )
}

export default function Community({ events, stats, onToggle }) {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date))
  const max = stats.board[0].points
  return (
    <div className="wrap">
      <div className="section-head">
        <h2>Green campus activities</h2>
        <p>Show up, fix things, cut the load at the source. {stats.myEvents} joined by you.</p>
      </div>

      <div className="community">
        <div className="event-list">
          {sorted.map((ev) => <Event key={ev.id} ev={ev} onToggle={onToggle} />)}
        </div>

        <div className="side-stack">
          <div className="card side-card">
            <h3>Hall leaderboard</h3>
            <ol className="lb">
              {stats.board.map((r, i) => (
                <React.Fragment key={r.name}>
                  <li className={r.me ? 'me' : undefined}>
                    <span className="rank">{i + 1}</span>
                    <span className="who">{r.name}{r.me ? ' (yours)' : ''}</span>
                    <span className="pts">{fmt(r.points)}</span>
                  </li>
                  <li aria-hidden="true" style={{ display: 'block' }}>
                    <div className="meter-track lb-bar"><div className="meter-fill" style={{ width: `${(r.points / max) * 100}%` }} /></div>
                  </li>
                </React.Fragment>
              ))}
            </ol>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
              Points come from listings, claims and activity sign-ups. Your {fmt(stats.myPoints)} pts count toward your hall.
            </p>
          </div>

          <div className="card side-card">
            <h3>Your badges</h3>
            <div className="badges">
              {stats.badges.map((b) => (
                <span key={b.id} className={b.earned ? 'badge' : 'badge locked'} title={b.need}>
                  <span aria-hidden="true">{b.emoji}</span> {b.label}
                </span>
              ))}
            </div>
          </div>

          <div className="card side-card">
            <h3>Start something</h3>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Any student can propose an activity — clean-up, swap, repair session, energy audit of your own hall.
              Green Campus Society covers tools and permits.
            </p>
            <button className="btn ghost sm" style={{ marginTop: 12 }} onClick={() => alert('Demo: proposal form would open here.')}>
              Propose an activity
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
