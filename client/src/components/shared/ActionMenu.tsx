import { useEffect, useRef, useState } from 'react'
import { Eye, MoreVertical, Trash2 } from 'lucide-react'

interface ActionMenuProps {
  onView?: () => void
  onDelete?: () => void
}

export default function ActionMenu({
  onView,
  onDelete,
}: ActionMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  function handleAction(action?: () => void) {
    setOpen(false)
    action?.()
  }

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        onClick={() => setOpen((current) => !current)}
        aria-label="More actions"
        className="rounded-md p-1.5 text-ink-400 transition-colors hover:bg-paper hover:text-ink-900"
      >
        <MoreVertical size={17} />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-md border border-ink-900/10 bg-white text-sm shadow-xl">
          {onView && (
            <button
              onClick={() => handleAction(onView)}
              className="flex w-full items-center gap-2 px-3 py-2 text-ink-700 transition-colors hover:bg-paper"
            >
              <Eye size={14} />
              View Details
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => handleAction(onDelete)}
              className="flex w-full items-center gap-2 px-3 py-2 text-rose-600 transition-colors hover:bg-rose-50"
            >
              <Trash2 size={14} />
              Delete Ticket
            </button>
          )}
        </div>
      )}
    </div>
  )
}