import UsersTableSkeleton from "@/components/admin/skeletons/UsersTableSkeleton";

export default function UsersPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6">
        <div className="flex flex-col gap-3">
          <div className="h-3 w-32 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-8 w-48 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-72 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 h-11 rounded-xl bg-gray-200 dark:bg-slate-700" />

          {/* Role Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-4 w-12 rounded bg-gray-200 dark:bg-slate-700" />

            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 rounded-lg bg-gray-200 dark:bg-slate-700"
              />
            ))}
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="h-4 w-14 rounded bg-gray-200 dark:bg-slate-700" />

            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-slate-700"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Table Skeleton */}
      <UsersTableSkeleton />
    </div>
  );
}
