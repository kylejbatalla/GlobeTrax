import { Flag, Building2, Trees, Plane, Camera } from 'lucide-react'

const items = (stats) => [
  { icon: Flag, label: 'Countries', value: stats.countries },
  { icon: Building2, label: 'Cities', value: stats.cities },
  { icon: Plane, label: 'Miles traveled', value: stats.milesTraveled.toLocaleString() },
  { icon: Camera, label: 'Photos', value: stats.photos.toLocaleString() },
]

export default function StatsBar({ stats }) {
  return (
    <div className="glass pointer-events-auto flex divide-x divide-white/10 rounded-2xl shadow-xl">
      {items(stats).map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex flex-col items-center px-3 py-2.5 sm:px-5">
          <div className="flex items-center gap-1.5">
            <Icon className="h-3.5 w-3.5 text-glow-400" />
            <span className="font-display text-sm font-semibold text-white sm:text-base">
              {value}
            </span>
          </div>
          <span className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-400 sm:text-xs">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
