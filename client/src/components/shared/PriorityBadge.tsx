import type { Priority } from '../../types/ticket.types'
import { PRIORITY_STYLE } from '../../features/tickets/tickets.constants'

export default function PriorityBadge({
  priority,
}: {
  priority: Priority
}) {
  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${PRIORITY_STYLE[priority]}`}
    >
      {priority}
    </span>
  )
}