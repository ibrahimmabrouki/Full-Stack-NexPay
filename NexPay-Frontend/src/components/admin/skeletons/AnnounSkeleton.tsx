export default function AdminAnnounSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
        <div className="h-5 w-48 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
        <div className="h-3 w-72 bg-gray-100 dark:bg-slate-700 rounded" />
      </div>

      {/* Items */}
      <div className="divide-y divide-gray-100 dark:divide-slate-700">
        {Array.from({ length: 3}).map((_, i) => (
          <div key={i} className="p-5 flex gap-3">
            {/* Icon */}
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700" />

            {/* Content */}
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 bg-gray-200 dark:bg-slate-700 rounded" />
              <div className="h-3 w-full bg-gray-100 dark:bg-slate-700 rounded" />
              <div className="h-3 w-2/3 bg-gray-100 dark:bg-slate-700 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
