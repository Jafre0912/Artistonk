import { createContext, useContext, useState, type ReactNode } from 'react'
import type { NewTicketPayload, Priority, Status, Ticket } from '../types/ticket.types'
import {
  createTicketApi,
  deleteTicketApi,
  fetchTicketsApi,
  updateTicketStatusApi,
} from '../api/client'

export type StatusFilter = Status | 'All'
export type PriorityFilter = Priority | 'All'

interface TicketContextValue {
  tickets: Ticket[]
  loading: boolean
  error: string | null

  search: string
  statusFilter: StatusFilter
  priorityFilter: PriorityFilter
  selectedTicketId: string | null

  fetchTickets: () => Promise<void>
  setSearch: (value: string) => void
  setStatusFilter: (value: StatusFilter) => void
  setPriorityFilter: (value: PriorityFilter) => void
  selectTicket: (id: string | null) => void
  updateStatus: (id: string, status: Status) => Promise<void>
  addTicket: (payload: NewTicketPayload) => Promise<void>
  removeTicket: (id: string) => Promise<void>
}

const TicketContext = createContext<TicketContextValue | null>(null)

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('All')
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)

  async function fetchTickets() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchTicketsApi()
      setTickets(data)
    } catch {
      setError('Failed to load tickets. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function selectTicket(id: string | null) {
    setSelectedTicketId(id)
  }

  async function updateStatus(id: string, status: Status) {
    const previousTickets = tickets
    setTickets((current) => current.map((t) => (t.id === id ? { ...t, status } : t)))

    try {
      await updateTicketStatusApi(id, status)
    } catch {
      setTickets(previousTickets)
      setError('Could not update ticket status. Please try again.')
    }
  }

  async function addTicket(payload: NewTicketPayload) {
    try {
      const newTicket = await createTicketApi(payload)
      setTickets((current) => [newTicket, ...current])
    } catch {
      setError('Could not create the ticket. Please try again.')
    }
  }

  async function removeTicket(id: string) {
    const previousTickets = tickets
    setTickets((current) => current.filter((t) => t.id !== id))
    setSelectedTicketId(null)

    try {
      await deleteTicketApi(id)
    } catch {
      setTickets(previousTickets)
      setError('Could not delete the ticket. Please try again.')
    }
  }

  const value: TicketContextValue = {
    tickets,
    loading,
    error,
    search,
    statusFilter,
    priorityFilter,
    selectedTicketId,
    fetchTickets,
    setSearch,
    setStatusFilter,
    setPriorityFilter,
    selectTicket,
    updateStatus,
    addTicket,
    removeTicket,
  }

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}

export function useTicketContext() {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error('useTicketContext must be used inside a <TicketProvider>')
  }
  return context
}
