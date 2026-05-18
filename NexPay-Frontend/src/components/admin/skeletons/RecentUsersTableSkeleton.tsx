export default function RecentUsersTableSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-gray-200 dark:bg-slate-700" />
            <div className="h-5 w-36 rounded bg-gray-200 dark:bg-slate-700" />
          </div>

          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Head */}
          <thead className="bg-gray-50 dark:bg-slate-900/50">
            <tr>
              {Array.from({ length: 4 }).map((_, index) => (
                <th key={index} className="px-5 py-3">
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-700" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                {/* User */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-slate-700" />

                    <div>
                      <div className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-700 mb-2" />
                      <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-700" />
                    </div>
                  </div>
                </td>

                {/* Contact */}
                <td className="px-5 py-4">
                  <div>
                    <div className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-700 mb-2" />
                    <div className="h-3 w-24 rounded bg-gray-200 dark:bg-slate-700" />
                  </div>
                </td>

                {/* Role */}
                <td className="px-5 py-4">
                  <div className="h-7 w-20 rounded-full bg-gray-200 dark:bg-slate-700" />
                </td>

                {/* Status */}
                <td className="px-5 py-4">
                  <div className="h-7 w-24 rounded-full bg-gray-200 dark:bg-slate-700" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
