export default function StatsCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title */}
          <div className="h-3 w-24 rounded bg-gray-200 dark:bg-slate-700" />

          {/* Value */}
          <div className="mt-4 h-8 w-32 rounded bg-gray-200 dark:bg-slate-700" />
        </div>

        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}
