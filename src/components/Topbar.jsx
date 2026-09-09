import React from 'react'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'exchange', label: 'Exchange' },
  { id: 'assistant', label: 'Assistant' },
  { id: 'community', label: 'Community' },
]

export default function Topbar({ tab, onTab, points, theme, onTheme }) {
  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <div className="logo">
          <span className="logo-mark" aria-hidden="true">♻</span>
          <span>CampLoop<small>waste · energy · green campus</small></span>
        </div>
        <nav className="tabs" aria-label="Sections">
          {TABS.map((t) => (
            <button key={t.id} className="tab" aria-current={tab === t.id ? 'page' : undefined} onClick={() => onTab(t.id)}>
              {t.label}
            </button>
          ))}
        </nav>
        <div className="pointspill" title="Green points from listing, claiming and joining">
          🌱 {points.toLocaleString('en-US')} <span>pts</span>
        </div>
        <button className="iconbtn" onClick={onTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </header>
  )
}
