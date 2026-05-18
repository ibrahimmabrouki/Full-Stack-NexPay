export default function NotificationsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-2">
          <div className="h-8 w-44 bg-gray-300 dark:bg-slate-700 rounded" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>

        <div className="h-10 w-36 bg-gray-300 dark:bg-slate-700 rounded-lg" />
      </div>

      {/* Stats Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex gap-6">
            <div className="h-4 w-24 bg-gray-300 dark:bg-slate-700 rounded" />
            <div className="h-4 w-20 bg-gray-300 dark:bg-slate-700 rounded" />
          </div>

          <div className="h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-gray-200 dark:border-slate-700 pb-2">
        <div className="h-8 w-16 bg-gray-300 dark:bg-slate-700 rounded" />
        <div className="h-8 w-20 bg-gray-300 dark:bg-slate-700 rounded" />
        <div className="h-8 w-16 bg-gray-300 dark:bg-slate-700 rounded" />
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden shadow-lg">
        <div className="divide-y divide-gray-100 dark:divide-slate-700">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-5 flex gap-4">
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-slate-700 flex-shrink-0" />

              {/* Content */}
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <div className="h-5 w-52 bg-gray-300 dark:bg-slate-700 rounded" />
                  <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-slate-700" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>

                <div className="h-3 w-28 bg-gray-200 dark:bg-slate-700 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Loader */}
        <div className="px-5 py-4 flex justify-center border-t border-gray-100 dark:border-slate-700">
          <div className="h-4 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    </div>
  );
}
