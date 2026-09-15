import type { Priority, Status } from '../../types/ticket.types'

export const STATUS_OPTIONS: Status[] = ['Open', 'In Progress', 'Resolved']
export const PRIORITY_OPTIONS: Priority[] = ['Low', 'Medium', 'High']

export const STATUS_STYLE: Record<Status, string> = {
  Open: 'bg-rose-50 text-rose-600',
  'In Progress': 'bg-amber-50 text-amber-600',
  Resolved: 'bg-leaf-50 text-leaf-600',
}

export const PRIORITY_STYLE: Record<Priority, string> = {
  Low: 'bg-ink-900/5 text-ink-700',
  Medium: 'bg-amber-50 text-amber-600',
  High: 'bg-rose-50 text-rose-600',
}

export const PAGE_SIZE = 8

export const NEW_TICKET_DEFAULTS = {
  customerName: '',
  customerEmail: '',
  subject: '',
  description: '',
  priority: 'Medium' as Priority,
  status: 'Open' as Status,
}

