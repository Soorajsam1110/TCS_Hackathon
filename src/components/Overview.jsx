import React, { useState } from 'react'

const fmt = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d })

function Kpi({ label, value, unit, delta, period }) {
  return (
    <div className="kpi">
      <div className="k-label">{label}</div>
      <div className="k-value">{value}{unit && <span className="unit">{unit}</span>}</div>
      {delta && <div className="k-delta">{delta} <span className="period">{period}</span></div>}
    </div>
  )
}

function Meter({ name, valueLabel, pct }) {
  return (
    <div className="meter-row">
      <div className="meter-head"><span className="m-name">{name}</span><span className="m-val">{valueLabel}</span></div>
      <div className="meter-track"><div className="meter-fill" style={{ width: `${Math.min(100, pct)}%` }} /></div>
    </div>
  )
}

// Single-series magnitude chart: one hue, direct-labeled (aqua sits under 3:1, so labels are required).
function Breakdown({ rows }) {
  const [table, setTable] = useState(false)
  const max = Math.max(1, ...rows.map((r) => r.available + r.rescued))
  return (
    <div className="card side-card">
      <div className="section-head"><h2 style={{ fontSize: 15 }}>Listings by category</h2></div>
      {table ? (
        <table className="datatable">
          <thead><tr><th>Category</th><th className="num">Available</th><th className="num">Rescued</th></tr></thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}><td>{r.label}</td><td className="num">{r.available}</td><td className="num">{r.rescued}</td></tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="bars">
          {rows.map((r) => {
            const total = r.available + r.rescued
            return (
              <div className="bar-row" key={r.id}>
                <span className="b-name">{r.label}</span>
                <span className="b-track" style={{ display: 'flex', gap: 2 }}>
                  <span className="b-fill" style={{ width: `${(r.available / max) * 100}%`, background: 'var(--series-3)', borderRadius: '0 4px 4px 0' }} />
                  {r.rescued > 0 && (
                    <span className="b-fill" style={{ width: `${(r.rescued / max) * 100}%`, background: 'var(--series-1)', borderRadius: '0 4px 4px 0' }} />
                  )}
                </span>
                <span className="b-val">{total}</span>
              </div>
            )
          })}
        </div>
      )}
      <div className="legend">
        <span><i style={{ background: 'var(--series-3)' }} />Available now</span>
        <span><i style={{ background: 'var(--series-1)' }} />Already rescued</span>
      </div>
      <button className="linkbtn" onClick={() => setTable((v) => !v)}>{table ? 'Show chart' : 'Show as table'}</button>
    </div>
  )
}

export default function Overview({ stats, onTab, onPost }) {
  const sprint = stats.sprint
  return (
    <div className="wrap">
      <section className="hero">
        <div className="card hero-copy">
          <h1>Keep campus stuff in the loop.</h1>
          <p className="lede">
            Pass on what you no longer need, ask the assistant which bin anything belongs in,
            and join the activities that cut campus waste and energy at the source.
          </p>
          <div className="hero-actions">
            <button className="btn" onClick={onPost}>List something</button>
            <button className="btn ghost" onClick={() => onTab('exchange')}>Browse {stats.listed} items</button>
            <button className="btn ghost" onClick={() => onTab('assistant')}>Ask the assistant</button>
          </div>
        </div>
        <div className="card hero-figure">
          <div className="fig">{fmt(stats.co2)}<span className="unit">kg CO₂e</span></div>
          <div className="fig-label">Avoided by reusing instead of buying new</div>
          <div className="fig-note">{stats.exchanges} exchanges · {fmt(stats.kg, 1)} kg kept out of the skips</div>
        </div>
      </section>

      <section style={{ marginBottom: 26 }}>
        <div className="section-head"><h2>This term at a glance</h2></div>
        <div className="kpi-row">
          <Kpi label="Items available" value={fmt(stats.listed)} />
          <Kpi label="Exchanges completed" value={fmt(stats.exchanges)} delta={stats.exchanges ? `+${stats.exchanges}` : null} period="since term start" />
          <Kpi label="Your green points" value={fmt(stats.myPoints)} unit=" pts" />
          <Kpi label="Activities joined" value={fmt(stats.myEvents)} unit={` / ${6}`} />
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 20 }}>
        <div className="card side-card">
          <div className="section-head"><h2 style={{ fontSize: 15 }}>Energy Sprint — hall sign-up</h2></div>
          <div className="meter-list">
            {stats.board.map((r) => (
              <Meter key={r.name} name={r.name} valueLabel={`${fmt(r.points)} pts`} pct={(r.points / stats.board[0].points) * 100} />
            ))}
          </div>
          {sprint && (
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 14 }}>
              {sprint.taken} of {sprint.spots} residents signed up for the metered kWh challenge starting {sprint.date}.
            </p>
          )}
        </div>
        <Breakdown rows={stats.byCategory} />
      </section>
    </div>
  )
}
