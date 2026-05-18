"use client";

import TransactionsTableSkeleton from "./TransactionsTableSkeleton";

export default function TransactionsPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
        <div className="space-y-3">
          <div className="h-3 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-8 w-56 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-80 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 space-y-5">
        {/* Search */}
        <div className="space-y-2">
          <div className="h-4 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-10 w-full bg-gray-200 dark:bg-slate-700 rounded-xl" />
        </div>

        {/* Filters row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div
                    key={j}
                    className="h-9 flex-1 bg-gray-200 dark:bg-slate-700 rounded-lg"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table Skeleton (reused) */}
      <TransactionsTableSkeleton />
    </div>
  );
}
