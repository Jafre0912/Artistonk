import { AlertCircle, Inbox } from 'lucide-react'
import type { Status, Ticket } from '../../../types/ticket.types'
import TicketsTable from '../../../components/shared/DataTable/TicketsTable'
import EmptyState from '../../../components/shared/EmptyState'
import Pagination from '../../../components/shared/Pagination'
import TicketsTableSkeleton from '../../../components/shared/TicketsTableSkeleton'
import { usePagination } from '../../../hooks/usePagination'
import { PAGE_SIZE } from '../tickets.constants'
import TicketCard from './TicketCard'

interface TicketListProps {
  tickets: Ticket[]
  loading: boolean
  error: string | null
  onView: (ticket: Ticket) => void
  onDelete: (ticket: Ticket) => void
  onStatusChange: (id: string, status: Status) => void
}

export default function TicketList({
  tickets,
  loading,
  error,
  onView,
  onDelete,
  onStatusChange,
}: TicketListProps) {
  const { page, setPage, totalPages, paginated } = usePagination(
    tickets,
    PAGE_SIZE,
  )
  if (loading) {
    return <TicketsTableSkeleton rows={PAGE_SIZE} />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <AlertCircle size={22} />
        </span>

        <p className="font-display font-semibold text-ink-900">
          Something went wrong
        </p>

        <p className="mt-1 max-w-sm text-sm text-ink-400">{error}</p>
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No tickets found"
        message="Try adjusting your search or filters, or create a new ticket to get started."
      />
    )
  }

  return (
    <div>
      <div className="hidden overflow-x-auto md:block">
        <TicketsTable
          tickets={paginated}
          onView={onView}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      </div>

      <div className="md:hidden">
        {paginated.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onView={onView}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
        totalItems={tickets.length}
        pageSize={PAGE_SIZE}
      />
    </div>
  )
}