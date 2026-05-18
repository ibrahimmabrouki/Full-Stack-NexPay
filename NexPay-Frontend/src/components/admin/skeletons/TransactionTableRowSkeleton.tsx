"use client";

export default function TransactionTableRowSkeleton() {
  return (
    <tr className="border-t border-gray-100 dark:border-slate-700 animate-pulse">
      {/* Transaction ID */}
      <td className="px-6 py-4">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-3 w-32 bg-gray-200 dark:bg-slate-700 rounded" />
          </div>
        </div>
      </td>

      {/* Sender */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </td>

      {/* Receiver */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </td>

      {/* Amount */}
      <td className="px-6 py-4">
        <div className="space-y-2">
          <div className="h-4 w-28 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-3 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </td>

      {/* Description */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="h-6 w-20 bg-gray-200 dark:bg-slate-700 rounded-full" />
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-200 dark:bg-slate-700 rounded-lg" />
          <div className="w-8 h-8 bg-gray-200 dark:bg-slate-700 rounded-lg" />
        </div>
      </td>
    </tr>
  );
}
