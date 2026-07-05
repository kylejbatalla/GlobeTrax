import { X, Heart, Camera, Calendar } from 'lucide-react'

export default function LocationPanel({ location, onClose }) {
  if (!location) return null

  return (
    <aside className="glass pointer-events-auto absolute inset-y-0 right-0 z-30 flex w-full max-w-sm flex-col rounded-l-3xl shadow-2xl">
      {/* Header */}
      <div className="flex items-start justify-between p-5 pb-3">
        <div>
          <h2 className="font-display flex items-center gap-2 text-xl font-semibold text-white">
            {location.city}
            {location.favorite && (
              <Heart className="h-4 w-4 fill-pink-400 text-pink-400" />
            )}
          </h2>
          <p className="text-sm text-slate-400">{location.country}</p>
          <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Camera className="h-3.5 w-3.5 text-glow-400" />
              {location.photoCount} photos
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-glow-400" />
              {location.year}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          aria-label="Close panel"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Photo grid */}
      <div className="panel-scroll flex-1 overflow-y-auto px-5 pb-5">
        <div className="grid grid-cols-2 gap-2">
          {location.photos.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => alert('Photo lightbox coming soon (demo)')}
              className="group overflow-hidden rounded-xl"
            >
              <img
                src={p.thumb}
                alt={`${location.city} photo`}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover transition duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">
          Showing {location.photos.length} of {location.photoCount} photos
        </p>
      </div>
    </aside>
  )
}
