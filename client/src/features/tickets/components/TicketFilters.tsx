import { Plus } from 'lucide-react'
import type { PriorityFilter, StatusFilter } from '../../../context/TicketContext'
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../tickets.constants'
import SearchBar from '../../../components/shared/SearchBar'
import FilterBar from '../../../components/shared/FilterBar'

interface TicketFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  statusFilter: StatusFilter
  onStatusFilterChange: (value: StatusFilter) => void
  priorityFilter: PriorityFilter
  onPriorityFilterChange: (value: PriorityFilter) => void
  onNewTicket: () => void
}

export default function TicketFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  onNewTicket,
}: TicketFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 pt-5 pb-4">
      <SearchBar value={search} onChange={onSearchChange} placeholder="Search by customer, subject or ticket ID…" />

      <div className="flex items-center gap-2 flex-wrap">
        <FilterBar
          label="Statuses"
          value={statusFilter}
          options={STATUS_OPTIONS}
          onChange={(value) => onStatusFilterChange(value as StatusFilter)}
        />
        <FilterBar
          label="Priorities"
          value={priorityFilter}
          options={PRIORITY_OPTIONS}
          onChange={(value) => onPriorityFilterChange(value as PriorityFilter)}
        />

        <button
          onClick={onNewTicket}
          className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 transition-colors
                     text-white text-sm font-medium px-4 py-2 rounded-md whitespace-nowrap"
        >
          <Plus size={15} /> New Ticket
        </button>
      </div>
    </div>
  )
}