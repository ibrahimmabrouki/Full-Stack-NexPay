export default function TransactionsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="space-y-2">
          <div className="h-6 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>

        <div className="h-10 w-44 bg-gray-200 dark:bg-slate-700 rounded-xl" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="space-y-2 w-full">
              <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-6 w-20 bg-gray-300 dark:bg-slate-600 rounded" />
            </div>
            <div className="w-10 h-10 bg-gray-200 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
        <div className="p-4 border-b border-gray-200 dark:border-slate-700">
          <div className="h-4 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>

        <div className="p-4 flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 bg-gray-200 dark:bg-slate-700 rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Transactions Cards*/}
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5 animate-pulse"
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left Section */}
              <div className="flex items-start gap-4 flex-1">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-slate-700 flex-shrink-0" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Title + Status */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-4 w-40 bg-gray-300 dark:bg-slate-600 rounded" />
                    <div className="h-5 w-20 bg-gray-200 dark:bg-slate-700 rounded-full" />
                  </div>

                  {/* Name */}
                  <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded mb-3" />

                  {/* Phone / Description */}
                  <div className="h-4 w-48 bg-gray-200 dark:bg-slate-700 rounded mb-4" />

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-3">
                    <div className="h-3 w-28 bg-gray-200 dark:bg-slate-700 rounded" />
                    <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
                    <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="text-right flex-shrink-0 space-y-2">
                <div className="h-5 w-24 bg-gray-300 dark:bg-slate-600 rounded ml-auto" />
                <div className="h-3 w-14 bg-gray-200 dark:bg-slate-700 rounded ml-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
