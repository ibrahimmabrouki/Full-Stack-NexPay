export default function UserTableRowSkeleton() {
  return (
    <tr className="border-t border-gray-100 dark:border-slate-700 animate-pulse">
      {/* User */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-slate-700" />

            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-800 bg-gray-300 dark:bg-slate-600" />
          </div>

          <div>
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-700 mb-2" />
            <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-700" />
          </div>
        </div>
      </td>

      {/* Phone */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-32 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-7 w-20 rounded-full bg-gray-200 dark:bg-slate-700" />
        </div>
      </td>

      {/* Address */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200 dark:bg-slate-700 flex-shrink-0" />
          <div className="h-4 w-40 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <div className="h-7 w-24 rounded-full bg-gray-200 dark:bg-slate-700" />
      </td>

      {/* Created At */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200 dark:bg-slate-700" />
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700" />
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-slate-700" />
          <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-slate-700" />
        </div>
      </td>
    </tr>
  );
}
