import { useEffect, useMemo } from 'react'
import { useTicketContext } from '../../../context/TicketContext'

export function useTickets() {
  const {
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
  } = useTicketContext()

  useEffect(() => {
    fetchTickets()
  }, [])

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase()

    return tickets.filter((ticket) => {
      const matchesSearch =
        !query ||
        ticket.customerName.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.id.toLowerCase().includes(query)

      const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter
      const matchesPriority = priorityFilter === 'All' || ticket.priority === priorityFilter

      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tickets, search, statusFilter, priorityFilter])

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) ?? null

  return {
    tickets,
    filteredTickets,
    loading,
    error,
    search,
    statusFilter,
    priorityFilter,
    selectedTicket,
    setSearch,
    setStatusFilter,
    setPriorityFilter,
    selectTicket,
    updateStatus,
    addTicket,
    removeTicket,
  }
}
