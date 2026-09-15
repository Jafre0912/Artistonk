import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  pageSize: number
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: PaginationProps) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalItems)

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-ink-900/8 px-5 py-3.5 sm:flex-row">
      <p className="text-xs text-ink-400">
        Showing{' '}
        <span className="font-medium text-ink-700">
          {start}-{end}
        </span>{' '}
        of <span className="font-medium text-ink-700">{totalItems}</span> tickets
      </p>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Previous page"
          className="rounded-md p-1.5 text-ink-400 transition-colors hover:bg-paper hover:text-ink-900 disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronLeft size={16} />
        </button>

        <span className="min-w-[52px] px-2 text-center text-xs font-medium text-ink-700">
          {page} / {totalPages}
        </span>

        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
          className="rounded-md p-1.5 text-ink-400 transition-colors hover:bg-paper hover:text-ink-900 disabled:opacity-40 disabled:hover:bg-transparent"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}