export default function ExchangeRatesTableSkeleton() {
  return (
    <div className="overflow-x-auto animate-pulse">
      <table className="w-full">
        {/* Header */}
        <thead className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
          <tr>
            <th className="px-6 py-4 text-left">
              <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
            </th>
            <th className="px-6 py-4 text-left">
              <div className="h-3 w-10 bg-gray-200 dark:bg-slate-700 rounded" />
            </th>
            <th className="px-6 py-4 text-left">
              <div className="h-3 w-28 bg-gray-200 dark:bg-slate-700 rounded" />
            </th>
            <th className="px-6 py-4 text-right">
              <div className="h-3 w-16 ml-auto bg-gray-200 dark:bg-slate-700 rounded" />
            </th>
          </tr>
        </thead>

        {/* Body */}
        <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
          {Array.from({ length: 6 }).map((_, i) => (
            <tr key={i}>
              {/* From */}
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="h-3 w-12 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-2 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>
              </td>

              {/* To */}
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className="h-3 w-12 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-2 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>
              </td>

              {/* Exchange Rate */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-20 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-3 w-6 bg-gray-200 dark:bg-slate-700 rounded" />
                  <div className="h-3 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <div className="h-8 w-16 bg-gray-200 dark:bg-slate-700 rounded-xl" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
