export default function AdminDepositsPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="bg-gray-100 dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-gray-300 dark:bg-slate-600 rounded-full" />
              <div className="h-3 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
            </div>

            <div className="h-6 w-32 bg-gray-200 dark:bg-slate-700 rounded" />

            <div className="mt-2 h-3 w-80 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="p-5 border-b border-gray-200 dark:border-slate-700 bg-gray-100 dark:bg-slate-800">
          <div className="h-4 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Search */}
          <div className="space-y-2">
            <div className="h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-10 w-full bg-gray-200 dark:bg-slate-700 rounded-xl" />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <div className="h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="flex gap-2">
              <div className="h-10 flex-1 bg-gray-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-10 flex-1 bg-gray-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-10 flex-1 bg-gray-200 dark:bg-slate-700 rounded-lg" />
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="flex gap-2">
              <div className="h-10 flex-1 bg-gray-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-10 flex-1 bg-gray-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-10 flex-1 bg-gray-200 dark:bg-slate-700 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
          <div className="flex justify-between">
            <div className="h-4 w-48 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-slate-700">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="px-6 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-slate-700" />
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-2 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>
              </div>

              <div className="h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-6 w-16 bg-gray-200 dark:bg-slate-700 rounded-full" />
              <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
