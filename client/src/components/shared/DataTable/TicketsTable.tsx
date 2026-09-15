import type { Status, Ticket } from '../../../types/ticket.types'
import {
  STATUS_OPTIONS,
  STATUS_STYLE,
} from '../../../features/tickets/tickets.constants'
import { formatDate } from '../../../utils/formatDate'
import ActionMenu from '../ActionMenu'
import PriorityBadge from '../PriorityBadge'

interface TicketsTableProps {
  tickets: Ticket[]
  onView: (ticket: Ticket) => void
  onDelete: (ticket: Ticket) => void
  onStatusChange: (id: string, status: Status) => void
}

export default function TicketsTable({
  tickets,
  onView,
  onDelete,
  onStatusChange,
}: TicketsTableProps) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-y border-ink-900/8 text-left text-ink-400">
          <th className="px-5 py-2.5 text-xs font-medium uppercase tracking-wide">
            Customer
          </th>
          <th className="px-5 py-2.5 text-xs font-medium uppercase tracking-wide">
            Subject
          </th>
          <th className="px-5 py-2.5 text-xs font-medium uppercase tracking-wide">
            Priority
          </th>
          <th className="px-5 py-2.5 text-xs font-medium uppercase tracking-wide">
            Status
          </th>
          <th className="px-5 py-2.5 text-xs font-medium uppercase tracking-wide">
            Created
          </th>
          <th className="px-5 py-2.5 text-right text-xs font-medium uppercase tracking-wide">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {tickets.map((ticket) => (
          <tr
            key={ticket.id}
            onClick={() => onView(ticket)}
            className="cursor-pointer border-b border-ink-900/6 transition-colors last:border-b-0 hover:bg-paper/60"
          >
            <td className="px-5 py-3.5">
              <p className="font-medium text-ink-900">
                {ticket.customerName}
              </p>
              <p className="text-xs text-ink-400">{ticket.id}</p>
            </td>

            <td className="max-w-xs px-5 py-3.5 text-ink-700">
              <p className="truncate">{ticket.subject}</p>
            </td>

            <td className="px-5 py-3.5">
              <PriorityBadge priority={ticket.priority} />
            </td>

            <td
              className="px-5 py-3.5"
              onClick={(event) => event.stopPropagation()}
            >
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
            </td>

            <td className="whitespace-nowrap px-5 py-3.5 text-ink-700">
              {formatDate(ticket.createdAt)}
            </td>

            <td
              className="px-5 py-3.5 text-right"
              onClick={(event) => event.stopPropagation()}
            >
              <ActionMenu
                onView={() => onView(ticket)}
                onDelete={() => onDelete(ticket)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}