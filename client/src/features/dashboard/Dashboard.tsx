import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Clock, ListTodo, RefreshCw, Ticket as TicketIcon } from 'lucide-react'
import StatCard from '../../components/shared/StatCard'
import StatCardSkeleton from '../../components/shared/StatCardSkeleton'
import TicketsTable from '../../components/shared/DataTable/TicketsTable'
import TicketsTableSkeleton from '../../components/shared/TicketsTableSkeleton'
import EmptyState from '../../components/shared/EmptyState'
import Pagination from '../../components/shared/Pagination'
import { usePagination } from '../../hooks/usePagination'
import { useDashboardStats } from './hooks/useDashboardStats'
import { DASHBOARD_TABLE_PAGE_SIZE } from './dashboard.constants'
import { useTicketContext } from '../../context/TicketContext'

export default function Dashboard() {
  const navigate = useNavigate()
  const stats = useDashboardStats()
  const { tickets, loading, fetchTickets, selectTicket, updateStatus } = useTicketContext()

  useEffect(() => {
    if (tickets.length === 0) fetchTickets()
  }, [])

  const sortedTickets = [...tickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const { page, setPage, totalPages, paginated } = usePagination(
    sortedTickets,
    DASHBOARD_TABLE_PAGE_SIZE,
  )

  const isFirstLoad = loading && tickets.length === 0

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="font-display text-xl font-bold text-brand-700">Support Overview</h1>
          <p className="text-sm text-ink-400">Here's what's happening with your customers today.</p>
        </div>
        <button
          onClick={() => fetchTickets()}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 transition-colors
                     text-white text-sm font-medium px-4 py-2 rounded-md self-start"
        >
          <RefreshCw size={15} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {isFirstLoad ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard label="Total Tickets" value={stats.total} icon={TicketIcon} accent="brand" />
            <StatCard label="Open" value={stats.open} icon={ListTodo} accent="rose" />
            <StatCard label="In Progress" value={stats.inProgress} icon={Clock} accent="amber" />
            <StatCard label="Resolved" value={stats.resolved} icon={CheckCircle2} accent="leaf" />
          </>
        )}
      </div>

      <div className="stat-card !p-0 overflow-hidden">
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <h2 className="font-display font-semibold text-ink-900">Recent Tickets</h2>
          <button
            onClick={() => navigate('/tickets')}
            className="text-xs font-medium text-brand-600 hover:underline"
          >
            View all
          </button>
        </div>

        {isFirstLoad ? (
          <TicketsTableSkeleton rows={DASHBOARD_TABLE_PAGE_SIZE} />
        ) : sortedTickets.length === 0 ? (
          <EmptyState title="No tickets yet" message="New support tickets will show up here." />
        ) : (
          <>
            <div className="overflow-x-auto">
              <TicketsTable
                tickets={paginated}
                onView={(ticket) => {
                  selectTicket(ticket.id)
                  navigate('/tickets')
                }}
                onDelete={() => navigate('/tickets')}
                onStatusChange={updateStatus}
              />
            </div>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalItems={sortedTickets.length}
              pageSize={DASHBOARD_TABLE_PAGE_SIZE}
            />
          </>
        )}
      </div>
    </div>
  )
}
