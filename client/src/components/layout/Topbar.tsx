import { useLocation } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'

interface TopbarProps {
  onMenuClick: () => void
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/tickets': 'Tickets',
}

export default function Topbar({ onMenuClick }: TopbarProps) {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] ?? 'Dashboard'

  return (
    <header className="h-16 bg-brand-800 border-b border-white/10 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-md text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-display font-semibold text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative p-2 rounded-md text-white hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-rose-500" />
        </button>

        <div className="flex items-center gap-2.5 pl-3 border-l border-white/10">
          <span className="h-8 w-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-semibold">
            SA
          </span>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-medium text-white">Support Agent</p>
            <p className="text-xs text-white/70">Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
