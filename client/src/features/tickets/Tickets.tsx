import { useState } from 'react'
import type { Ticket } from '../../types/ticket.types'
import { useTickets } from './hooks/useTickets'
import TicketFilters from './components/TicketFilters'
import TicketList from './components/TicketList'
import TicketDetails from './TicketDetails'
import FormModal from '../../components/shared/FormModal'
import ConfirmDialog from '../../components/shared/ConfirmDialog'

export default function Tickets() {
  const {
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
  } = useTickets()

  const [showNewTicket, setShowNewTicket] = useState(false)
  const [deletingTicket, setDeletingTicket] = useState<Ticket | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-xl font-bold text-brand-700">
          Support Tickets
        </h1>

        <p className="text-sm text-ink-400">
          Search, filter and manage every customer support ticket.
        </p>
      </div>

      <div className="stat-card overflow-hidden !p-0">
        <TicketFilters
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={setPriorityFilter}
          onNewTicket={() => setShowNewTicket(true)}
        />

        <TicketList
          tickets={filteredTickets}
          loading={loading}
          error={error}
          onView={(ticket) => selectTicket(ticket.id)}
          onDelete={(ticket) => setDeletingTicket(ticket)}
          onStatusChange={updateStatus}
        />
      </div>

      {selectedTicket && (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => selectTicket(null)}
          onStatusChange={updateStatus}
          onDelete={(ticket) => setDeletingTicket(ticket)}
        />
      )}

      {showNewTicket && (
        <FormModal
          onClose={() => setShowNewTicket(false)}
          onSave={(payload) => {
            addTicket(payload)
            setShowNewTicket(false)
          }}
        />
      )}

      {deletingTicket && (
        <ConfirmDialog
          title="Delete Ticket"
          message={`Are you sure you want to delete "${deletingTicket.subject}"? This cannot be undone.`}
          onCancel={() => setDeletingTicket(null)}
          onConfirm={() => {
            removeTicket(deletingTicket.id)
            setDeletingTicket(null)
          }}
        />
      )}
    </div>
  )
}