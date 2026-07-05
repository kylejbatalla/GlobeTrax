import { useEffect, useState } from 'react'
import GlobeView from './components/GlobeView.jsx'
import ProfileHeader from './components/ProfileHeader.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import StatsBar from './components/StatsBar.jsx'
import LocationPanel from './components/LocationPanel.jsx'
import { user, stats, locations } from './data/mockData.js'

export default function App() {
  const [selected, setSelected] = useState(null)
  const [hasDragged, setHasDragged] = useState(false)

  // Fade the hint once the user actually drags (not just clicks)
  useEffect(() => {
    if (hasDragged) return
    let start = null
    const onDown = (e) => {
      start = [e.clientX, e.clientY]
    }
    const onMove = (e) => {
      if (!start) return
      const moved =
        Math.abs(e.clientX - start[0]) + Math.abs(e.clientY - start[1])
      if (moved > 8) setHasDragged(true)
    }
    const onUp = () => {
      start = null
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [hasDragged])

  return (
    <div className="relative h-full overflow-hidden">
      <GlobeView
        locations={locations}
        selected={selected}
        onSelect={setSelected}
      />

      <ProfileHeader />

      {/* Bottom overlay: profile card left, stats right */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-wrap items-end justify-between gap-3 p-4 sm:p-6">
        <ProfileCard user={user} />
        <StatsBar stats={stats} />
      </div>

      <LocationPanel location={selected} onClose={() => setSelected(null)} />

      {/* Hint — fades out after the first drag */}
      <p
        className={`pointer-events-none absolute left-1/2 top-20 z-10 -translate-x-1/2 text-xs text-slate-400/80 transition-opacity duration-700 sm:top-24 ${
          hasDragged || selected ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Drag to explore · Tap a photo to see the collection
      </p>
    </div>
  )
}
