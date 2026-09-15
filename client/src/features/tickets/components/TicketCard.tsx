import type { Status, Ticket } from '../../../types/ticket.types'
import {
  STATUS_OPTIONS,
  STATUS_STYLE,
} from '../tickets.constants'
import { formatDate } from '../../../utils/formatDate'
import PriorityBadge from '../../../components/shared/PriorityBadge'
import ActionMenu from '../../../components/shared/ActionMenu'

interface TicketCardProps {
  ticket: Ticket
  onView: (ticket: Ticket) => void
  onDelete: (ticket: Ticket) => void
  onStatusChange: (id: string, status: Status) => void
}

export default function TicketCard({
  ticket,
  onView,
  onDelete,
  onStatusChange,
}: TicketCardProps) {
  return (
    <div
      onClick={() => onView(ticket)}
      className="cursor-pointer border-b border-ink-900/6 p-4 transition-colors last:border-b-0 active:bg-paper/60"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-medium text-ink-900">
            {ticket.customerName}
          </p>
          <p className="text-xs text-ink-400">
            {ticket.id} · {formatDate(ticket.createdAt)}
          </p>
        </div>

        <div onClick={(event) => event.stopPropagation()}>
          <ActionMenu
            onView={() => onView(ticket)}
            onDelete={() => onDelete(ticket)}
          />
        </div>
      </div>

      <p className="mt-2 line-clamp-2 text-sm text-ink-700">
        {ticket.subject}
      </p>

      <div
        className="mt-3 flex items-center justify-between gap-2"
        onClick={(event) => event.stopPropagation()}
      >
        <PriorityBadge priority={ticket.priority} />

        <select
          value={ticket.status}
          onChange={(event) =>
            onStatusChange(ticket.id, event.target.value as Status)
          }
          className={`cursor-pointer rounded-full border-0 px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-300 ${STATUS_STYLE[ticket.status]}`}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}