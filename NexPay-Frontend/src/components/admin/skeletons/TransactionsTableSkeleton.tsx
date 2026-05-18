"use client";

export default function TransactionsTableSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse">
      {/* Summary Bar Skeleton */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-32 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-5 w-16 bg-gray-200 dark:bg-slate-700 rounded-full" />
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4">
            <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
            <tr>
              {Array.from({ length: 7 }).map((_, i) => (
                <th key={i} className="px-6 py-4">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {Array.from({ length: 6 }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: 7 }).map((_, colIndex) => (
                  <td key={colIndex} className="px-6 py-4">
                    <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State Skeleton Space (optional visual balance) */}
      <div className="py-10" />
    </div>
  );
}
