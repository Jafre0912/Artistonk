import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import type { NewTicketPayload } from '../../types/ticket.types'
import {
  NEW_TICKET_DEFAULTS,
  PRIORITY_OPTIONS,
} from '../../features/tickets/tickets.constants'

interface FormModalProps {
  onClose: () => void
  onSave: (payload: NewTicketPayload) => void
}

export default function FormModal({ onClose, onSave }: FormModalProps) {
  const [form, setForm] = useState<NewTicketPayload>(NEW_TICKET_DEFAULTS)

  function update<K extends keyof NewTicketPayload>(
    key: K,
    value: NewTicketPayload[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave(form)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-card bg-white p-6 shadow-xl scrollbar-thin">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink-900">
            New Ticket
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-ink-400 transition-colors hover:text-ink-900"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700">
              Customer Name
            </label>

            <input
              type="text"
              required
              value={form.customerName}
              onChange={(event) =>
                update('customerName', event.target.value)
              }
              placeholder="e.g. Aarav Sharma"
              className="w-full rounded-md border border-ink-900/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700">
              Customer Email
            </label>

            <input
              type="email"
              required
              value={form.customerEmail}
              onChange={(event) =>
                update('customerEmail', event.target.value)
              }
              placeholder="e.g. aarav@example.com"
              className="w-full rounded-md border border-ink-900/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700">
              Subject
            </label>

            <input
              type="text"
              required
              value={form.subject}
              onChange={(event) => update('subject', event.target.value)}
              placeholder="Short summary of the issue"
              className="w-full rounded-md border border-ink-900/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700">
              Description
            </label>

            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(event) =>
                update('description', event.target.value)
              }
              placeholder="What is the customer experiencing?"
              className="w-full rounded-md border border-ink-900/10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700">
              Priority
            </label>

            <select
              value={form.priority}
              onChange={(event) =>
                update(
                  'priority',
                  event.target.value as NewTicketPayload['priority'],
                )
              }
              className="w-full rounded-md border border-ink-900/10 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand-300"
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-paper"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}