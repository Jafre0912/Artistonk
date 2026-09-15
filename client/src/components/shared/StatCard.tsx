import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  accent?: 'brand' | 'leaf' | 'amber' | 'rose'
}

const ICON_BG: Record<string, string> = {
  brand: 'bg-brand-100 text-brand-600',
  leaf: 'bg-leaf-50 text-leaf-600',
  amber: 'bg-amber-50 text-amber-600',
  rose: 'bg-rose-50 text-rose-600',
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  accent = 'brand',
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-card bg-white p-5 border border-ink-900/[0.06] shadow-card transition-all duration-200 hover:-translate-y-[2px] hover:shadow-lg">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13px] font-medium uppercase tracking-wide text-ink-400">
            {label}
          </p>

          <p className="mt-1.5 font-display text-[28px] font-bold leading-none tracking-tight text-ink-900">
            {value}
          </p>
        </div>

        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ring-inset ring-black/[0.03] ${ICON_BG[accent]}`}
        >
          <Icon size={20} strokeWidth={2} />
        </span>
      </div>
    </div>
  )
}