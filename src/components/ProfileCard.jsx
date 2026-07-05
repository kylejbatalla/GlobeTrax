import { Share2, MapPin } from 'lucide-react'

export default function ProfileCard({ user }) {
  return (
    <div className="glass pointer-events-auto flex items-center gap-3 rounded-2xl p-3 pr-4 shadow-xl sm:gap-4">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-12 w-12 rounded-full ring-2 ring-glow-400/60"
      />
      <div className="min-w-0">
        <h1 className="font-display truncate text-sm font-semibold text-white sm:text-base">
          {user.name}
        </h1>
        <p className="flex items-center gap-1 text-xs text-slate-400">
          <MapPin className="h-3 w-3" />
          globetrax.com/{user.handle}
        </p>
      </div>
      <button
        type="button"
        onClick={() => alert('Share link copied! (demo)')}
        className="ml-2 flex items-center gap-1.5 rounded-xl bg-glow-500 px-3 py-2 text-xs font-medium text-white transition hover:bg-glow-400"
      >
        <Share2 className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Share globe</span>
      </button>
    </div>
  )
}
