import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface DetailModalProps {
  title: string
  onClose: () => void
  children: ReactNode
  maxWidthClass?: string
}

export default function DetailModal({
  title,
  onClose,
  children,
  maxWidthClass = 'max-w-md',
}: DetailModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 px-4">
      <div
        className={`max-h-[85vh] w-full overflow-y-auto rounded-card bg-white shadow-xl scrollbar-thin ${maxWidthClass}`}
      >
        <div className="sticky top-0 flex items-center justify-between bg-white px-6 pb-4 pt-6">
          <h2 className="font-display text-lg font-semibold text-ink-900">
            {title}
          </h2>

          <button
            onClick={onClose}
            aria-label="Close"
            className="text-ink-400 transition-colors hover:text-ink-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  )
}