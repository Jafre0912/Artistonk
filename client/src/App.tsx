import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './features/dashboard/Dashboard'
import Tickets from './features/tickets/Tickets'
import { TicketProvider } from './context/TicketContext'

export default function App() {
  return (
    <TicketProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="tickets" element={<Tickets />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TicketProvider>
  )
}