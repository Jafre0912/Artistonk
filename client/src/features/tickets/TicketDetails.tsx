import type { Status, Ticket } from '../../types/ticket.types'
import { STATUS_OPTIONS } from './tickets.constants'
import DetailModal from '../../components/shared/DetailModal'
import PriorityBadge from '../../components/shared/PriorityBadge'
import StatusBadge from '../../components/shared/StatusBadge'
import { formatDateTime, timeAgo } from '../../utils/formatDate'

interface TicketDetailsProps {
  ticket: Ticket
  onClose: () => void
  onStatusChange: (id: string, status: Status) => void
  onDelete: (ticket: Ticket) => void
}

export default function TicketDetails({
  ticket,
  onClose,
  onStatusChange,
  onDelete,
}: TicketDetailsProps) {
  return (
    <DetailModal title={ticket.subject} onClose={onClose} maxWidthClass="max-w-lg">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={ticket.status} />
          <PriorityBadge priority={ticket.priority} />
          <span className="text-xs text-ink-400">
            {ticket.id} · Opened {formatDateTime(ticket.createdAt)}
          </span>
        </div>

        <div>
          <p className="font-medium text-ink-900">{ticket.customerName}</p>
          <p className="text-xs text-ink-400">{ticket.customerEmail}</p>
        </div>

        <div>
          <h3 className="mb-1 text-xs font-medium uppercase tracking-wide text-ink-400">
            Description
          </h3>
          <p className="text-sm text-ink-700">{ticket.description}</p>
        </div>

        {ticket.messages.length > 0 && (
          <div>
            <h3 className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-400">
              Conversation
            </h3>

            <div className="space-y-3">
              {ticket.messages.map((message) => (
                <div
                  key={message.id}
                  className={`rounded-md p-3 text-sm ${
                    message.role === 'agent' ? 'bg-brand-100/60' : 'bg-paper'
                  }`}
                >
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="font-medium text-ink-900">{message.author}</span>
                    <span className="text-xs text-ink-400">{timeAgo(message.timestamp)}</span>
                  </div>
                  <p className="text-ink-700">{message.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 border-t border-ink-900/6 pt-4">
          <select
            value={ticket.status}
            onChange={(event) => onStatusChange(ticket.id, event.target.value as Status)}
            className="rounded-md border border-ink-900/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => onDelete(ticket)}
            className="rounded-md px-4 py-2 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50"
          >
            Delete Ticket
          </button>
        </div>
      </div>
    </DetailModal>
  )
}
