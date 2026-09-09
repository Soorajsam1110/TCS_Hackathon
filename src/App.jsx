import React, { useEffect, useMemo, useState } from 'react'
import Topbar from './components/Topbar.jsx'
import Overview from './components/Overview.jsx'
import Exchange from './components/Exchange.jsx'
import Assistant from './components/Assistant.jsx'
import Community from './components/Community.jsx'
import PostModal from './components/PostModal.jsx'
import { POINTS, useStore } from './lib/store.js'

export default function App() {
  const store = useStore()
  const [tab, setTab] = useState('overview')
  const [modal, setModal] = useState(null) // null | { wanted: boolean }
  const [toast, setToast] = useState('')
  const [deep, setDeep] = useState(null) // filters pushed in from assistant actions
  const [theme, setTheme] = useState(() => localStorage.getItem('camploop.theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('camploop.theme', theme)
  }, [theme])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(''), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const ctx = useMemo(
    () => ({ items: store.items, events: store.events, stats: store.stats }),
    [store.items, store.events, store.stats]
  )

  // Assistant action chips deep-link into the other tabs.
  function handleAction(a) {
    if (a.tab) setTab(a.tab)
    if (a.query || a.category) setDeep({ query: a.query || '', category: a.category || 'all', k: Date.now() })
    if (a.post) setModal({ wanted: true })
  }

  function claim(item) {
    if (item.wanted) {
      setToast(`Owner notified — arrange handover at ${item.pickup}.`)
      return
    }
    store.claimItem(item.id)
    setToast(`Claimed "${item.title}". +${POINTS.claim} pts · pickup: ${item.pickup}`)
  }

  function publish(draft) {
    const item = store.postItem(draft)
    setModal(null)
    setTab('exchange')
    setDeep({ query: '', category: item.category, k: Date.now() })
    setToast(`${draft.wanted ? 'Request' : 'Listing'} published. +${POINTS.post} pts`)
  }

  return (
    <div className="app">
      <Topbar
        tab={tab}
        onTab={(t) => { setTab(t); setDeep(null) }}
        points={store.stats.myPoints}
        theme={theme}
        onTheme={() => setTheme((v) => (v === 'dark' ? 'light' : 'dark'))}
      />

      <main>
        {tab === 'overview' && (
          <Overview stats={store.stats} onTab={setTab} onPost={() => setModal({ wanted: false })} />
        )}
        {tab === 'exchange' && (
          <Exchange
            key={deep?.k || 'plain'}
            items={store.items}
            deep={deep}
            onClaim={claim}
            onPost={(wanted) => setModal({ wanted })}
          />
        )}
        {tab === 'assistant' && <Assistant ctx={ctx} onAction={handleAction} />}
        {tab === 'community' && (
          <Community
            events={store.events}
            stats={store.stats}
            onToggle={(id) => {
              const ev = store.events.find((e) => e.id === id)
              store.toggleEvent(id)
              setToast(ev.joined ? `Left "${ev.title}".` : `Signed up for "${ev.title}". +${ev.points} pts`)
            }}
          />
        )}
      </main>

      {modal && (
        <PostModal wanted={modal.wanted} onClose={() => setModal(null)} onSubmit={publish} />
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}
