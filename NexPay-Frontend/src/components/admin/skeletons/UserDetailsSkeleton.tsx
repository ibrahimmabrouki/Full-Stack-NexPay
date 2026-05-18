"use client";

export default function UserDetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-3">
            <div className="h-3 w-32 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-8 w-56 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-72 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>

          <div className="flex gap-3">
            <div className="h-8 w-28 bg-gray-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-8 w-36 bg-gray-200 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Main Card Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Card header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="h-5 w-48 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-8 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-10 w-full bg-gray-200 dark:bg-slate-700 rounded-xl" />
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}>
                  <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
                  <div className="h-10 w-full bg-gray-200 dark:bg-slate-700 rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
