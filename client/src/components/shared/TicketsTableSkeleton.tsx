import Skeleton from './Skeleton'
export default function TicketsTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-ink-900/8 text-left">
              <th className="px-5 py-2.5">
                <Skeleton className="h-3 w-16" />
              </th>
              <th className="px-5 py-2.5">
                <Skeleton className="h-3 w-20" />
              </th>
              <th className="px-5 py-2.5">
                <Skeleton className="h-3 w-14" />
              </th>
              <th className="px-5 py-2.5">
                <Skeleton className="h-3 w-14" />
              </th>
              <th className="px-5 py-2.5">
                <Skeleton className="h-3 w-16" />
              </th>
              <th className="px-5 py-2.5 text-right">
                <Skeleton className="ml-auto h-3 w-14" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index} className="border-b border-ink-900/6 last:border-b-0">
                <td className="px-5 py-3.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="mt-1.5 h-3 w-16" />
                </td>
                <td className="px-5 py-3.5">
                  <Skeleton className="h-4 w-40" />
                </td>
                <td className="px-5 py-3.5">
                  <Skeleton className="h-5 w-16 rounded-full" />
                </td>
                <td className="px-5 py-3.5">
                  <Skeleton className="h-5 w-20 rounded-full" />
                </td>
                <td className="px-5 py-3.5">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Skeleton className="ml-auto h-6 w-6 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="border-b border-ink-900/6 p-4 last:border-b-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <Skeleton className="h-4 w-32" />
                <Skeleton className="mt-1.5 h-3 w-24" />
              </div>
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
            <Skeleton className="mt-3 h-3 w-full" />
            <div className="mt-3 flex items-center justify-between gap-2">
              <Skeleton className="h-5 w-14 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
