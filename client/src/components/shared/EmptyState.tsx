import { Inbox, type LucideIcon } from 'lucide-react'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  message?: string
}

export default function EmptyState({
  icon: Icon = Inbox,
  title,
  message,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-ink-900/5 text-ink-400">
        <Icon size={22} />
      </span>

      <p className="font-display font-semibold text-ink-900">{title}</p>

      {message && (
        <p className="mt-1 max-w-sm text-sm text-ink-400">{message}</p>
      )}
    </div>
  )
}