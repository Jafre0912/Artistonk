import Skeleton from './Skeleton'

export default function StatCardSkeleton() {
  return (
    <div className="rounded-card border border-ink-900/[0.06] bg-white p-5 shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div>
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2.5 h-7 w-14" />
        </div>
        <Skeleton className="h-11 w-11 shrink-0 rounded-xl" />
      </div>
    </div>
  )
}
