import { useState } from 'react'
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

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [subjectError, setSubjectError] = useState('')
  const [descError, setDescError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    let isValid = true

    setNameError('')
    setEmailError('')
    setSubjectError('')
    setDescError('')

    if (!form.customerName.trim()) {
      setNameError('Customer Name is required')
      isValid = false
    }

    if (!form.customerEmail.trim()) {
      setEmailError('Customer Email is required')
      isValid = false
    } else if (!form.customerEmail.includes('@')) {
      setEmailError('Please enter a valid email')
      isValid = false
    }

    if (!form.subject.trim()) {
      setSubjectError('Subject is required')
      isValid = false
    }

    if (!form.description.trim()) {
      setDescError('Description is required')
      isValid = false
    }

    if (isValid) {
      onSave(form)
    }
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
          {/* Customer Name */}
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700">
              Customer Name <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={form.customerName}
              onChange={(e) => {
                setForm({ ...form, customerName: e.target.value })
                setNameError('')
              }}
              placeholder="Enter Name"
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none ${
                nameError
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-ink-900/10 focus:ring-2 focus:ring-brand-300'
              }`}
            />
            {nameError && (
              <p className="mt-1 text-xs text-red-500">{nameError}</p>
            )}
          </div>

          {/* Customer Email */}
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700">
              Customer Email <span className="text-red-500">*</span>
            </label>

            <input
              type="email"
              value={form.customerEmail}
              onChange={(e) => {
                setForm({ ...form, customerEmail: e.target.value })
                setEmailError('')
              }}
              placeholder="Enter Email"
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none ${
                emailError
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-ink-900/10 focus:ring-2 focus:ring-brand-300'
              }`}
            />
            {emailError && (
              <p className="mt-1 text-xs text-red-500">{emailError}</p>
            )}
          </div>

          {/* Subject */}
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700">
              Subject <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              value={form.subject}
              onChange={(e) => {
                setForm({ ...form, subject: e.target.value })
                setSubjectError('')
              }}
              placeholder="Enter Subject"
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none ${
                subjectError
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-ink-900/10 focus:ring-2 focus:ring-brand-300'
              }`}
            />
            {subjectError && (
              <p className="mt-1 text-xs text-red-500">{subjectError}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700">
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value })
                setDescError('')
              }}
              placeholder="Enter Description"
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none ${
                descError
                  ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                  : 'border-ink-900/10 focus:ring-2 focus:ring-brand-300'
              }`}
            />
            {descError && (
              <p className="mt-1 text-xs text-red-500">{descError}</p>
            )}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-ink-700">
              Priority <span className="text-red-500">*</span>
            </label>

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority: e.target.value as NewTicketPayload['priority'],
                })
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