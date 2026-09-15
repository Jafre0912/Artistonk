import { NavLink } from 'react-router-dom'
import { Headset, LayoutDashboard, Ticket } from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
}

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/tickets', label: 'Tickets', icon: Ticket, end: false },
]

export default function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      className={`sticky top-0 h-screen shrink-0 flex flex-col bg-brand-800 text-white
                  transition-[width] duration-200 ease-out overflow-hidden
                  ${collapsed ? 'w-[76px]' : 'w-64'}`}
    >
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
        <span className="h-9 w-9 shrink-0 rounded-lg bg-brand-600 flex items-center justify-center">
          <Headset size={18} />
        </span>
        {!collapsed && (
          <span className="font-display font-bold text-[15px] tracking-tight whitespace-nowrap">
            SupportDesk
          </span>
        )}
      </div>

      <nav className="flex-1 px-3 py-5 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-md text-sm font-medium transition-colors ${
                collapsed ? 'justify-center' : ''
              } ${isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`
            }
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span className="whitespace-nowrap">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {!collapsed && (
        <div className="px-5 py-4 border-t border-white/10 text-xs text-white/50 whitespace-nowrap">
          Customer Support Dashboard v1.0
        </div>
      )}
    </aside>
  )
}
