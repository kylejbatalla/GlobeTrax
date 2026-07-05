import { CalendarRange } from 'lucide-react'

export default function TimelineSlider({ min, max, value, onChange }) {
  return (
    <div className="glass pointer-events-auto flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl">
      <CalendarRange className="h-4 w-4 shrink-0 text-glow-400" />
      <span className="shrink-0 text-xs text-slate-400">{min}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-40 sm:w-56"
        aria-label="Show travels through year"
      />
      <span className="shrink-0 font-display text-sm font-semibold text-white">
        {value === max ? 'Now' : value}
      </span>
    </div>
  )
}
