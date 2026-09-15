import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Footer from './Footer'

export default function AdminLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  function toggleSidebar() {
    setSidebarCollapsed((current) => !current)
  }

  return (
    <div className="min-h-screen flex bg-paper">
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenuClick={toggleSidebar} />
        <main className="flex-1 px-4 sm:px-6 py-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
