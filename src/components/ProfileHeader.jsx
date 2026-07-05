import { Globe2 } from 'lucide-react'

// Top-left brand only — the profile card now lives above the stats row
export default function ProfileHeader() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start p-4 sm:p-6">
      <div className="pointer-events-auto flex items-center gap-2">
        <Globe2 className="h-6 w-6 text-glow-400" />
        <span className="font-display text-lg font-semibold tracking-tight text-white">
          GlobeTrax
        </span>
      </div>
    </header>
  )
}
