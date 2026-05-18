export default function DepositsTableSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-sm animate-pulse">
      {/* Summary Bar */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-5 w-40 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-5 w-16 rounded-full bg-gray-200 dark:bg-slate-700" />
          </div>

          <div className="flex items-center gap-4">
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-4 w-40 rounded bg-gray-200 dark:bg-slate-700" />
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
        <div className="grid grid-cols-6 gap-4">
          <div className="h-4 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100 dark:divide-slate-700">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="px-6 py-5">
            <div className="grid grid-cols-6 gap-4 items-center">
              {/* User */}
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-slate-700" />
                <div className="space-y-2">
                  <div className="h-3 w-24 rounded bg-gray-200 dark:bg-slate-700" />
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-700" />
                </div>
              </div>

              <div className="h-4 w-20 rounded bg-gray-200 dark:bg-slate-700" />
              <div className="h-4 w-10 rounded bg-gray-200 dark:bg-slate-700" />
              <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-slate-700" />
              <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700" />

              {/* Actions */}
              <div className="flex gap-2">
                <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-slate-700" />
                <div className="h-8 w-8 rounded-lg bg-gray-200 dark:bg-slate-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
