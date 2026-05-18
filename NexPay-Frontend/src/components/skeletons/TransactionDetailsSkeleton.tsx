export default function TransactionDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 bg-gray-300 dark:bg-slate-700 rounded-lg" />
        <div className="space-y-2">
          <div className="h-6 w-56 bg-gray-300 dark:bg-slate-700 rounded" />
          <div className="h-4 w-72 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-indigo-600/40 to-purple-600/40 px-6 py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            {/* Left */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/40 rounded-2xl" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-white/50 rounded" />
                <div className="h-4 w-24 bg-white/30 rounded" />
              </div>
            </div>

            {/* Right */}
            <div className="space-y-2 sm:text-right">
              <div className="h-6 w-28 bg-white/50 rounded ml-auto" />
              <div className="h-5 w-20 bg-white/30 rounded ml-auto" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Breakdown */}
          <div className="space-y-4">
            <div className="h-5 w-48 bg-gray-300 dark:bg-slate-700 rounded" />

            <div className="bg-gray-100 dark:bg-slate-700/30 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-32 bg-gray-300 dark:bg-slate-700 rounded" />
                <div className="h-4 w-20 bg-gray-300 dark:bg-slate-700 rounded" />
              </div>

              <div className="border-t pt-3 flex justify-between">
                <div className="h-4 w-28 bg-gray-300 dark:bg-slate-700 rounded" />
                <div className="h-5 w-24 bg-gray-400 dark:bg-slate-600 rounded" />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-4">
            <div className="h-5 w-44 bg-gray-300 dark:bg-slate-700 rounded" />

            <div className="space-y-4 pl-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-40 bg-gray-300 dark:bg-slate-700 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <div className="h-10 w-40 bg-gray-300 dark:bg-slate-700 rounded-lg" />
          </div>

          {/* Optional Receipt Block */}
          <div className="mt-4 p-4 bg-gray-100 dark:bg-slate-700/50 rounded-xl space-y-3">
            <div className="h-4 w-40 bg-gray-300 dark:bg-slate-700 rounded" />

            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                <div className="h-3 w-20 bg-gray-300 dark:bg-slate-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
