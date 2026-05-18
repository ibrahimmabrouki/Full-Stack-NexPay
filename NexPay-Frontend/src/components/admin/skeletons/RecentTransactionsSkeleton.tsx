export default function RecentTransactionsSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-5 w-40 rounded bg-gray-200 dark:bg-slate-700" />
          </div>

          <div className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Transactions */}
      <div className="divide-y divide-gray-100 dark:divide-slate-700">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="p-5 flex items-center justify-between gap-4"
          >
            {/* Left Section */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 flex-shrink-0" />

              {/* Transaction Info */}
              <div className="flex-1 min-w-0">
                {/* Names */}
                <div className="flex items-center gap-2">
                  <div className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-700" />

                  <div className="w-4 h-4 rounded bg-gray-200 dark:bg-slate-700" />

                  <div className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-700" />
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="h-3 w-24 rounded bg-gray-200 dark:bg-slate-700" />
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-700" />
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="text-right flex-shrink-0">
              <div className="h-5 w-24 rounded bg-gray-200 dark:bg-slate-700 ml-auto" />

              <div className="h-7 w-20 rounded-full bg-gray-200 dark:bg-slate-700 mt-3 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
