import { useTicketContext } from '../../../context/TicketContext'

export interface DashboardStats {
  total: number
  open: number
  inProgress: number
  resolved: number
}

export function useDashboardStats(): DashboardStats {
  const { tickets } = useTicketContext()

  return {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'Open').length,
    inProgress: tickets.filter((t) => t.status === 'In Progress').length,
    resolved: tickets.filter((t) => t.status === 'Resolved').length,
  }
}
