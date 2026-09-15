import type { Status } from '../../types/ticket.types'
import { STATUS_STYLE } from '../../features/tickets/tickets.constants'

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[status]}`}
    >
      {status}
    </span>
  )
}