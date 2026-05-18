import UserTableRowSkeleton from "./UserTableRowSkeleton";

export default function UsersTableSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden animate-pulse">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px]">
          {/* Header */}
          <thead className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-700">
            <tr>
              {[
                "User",
                "Phone",
                "Role",
                "Address",
                "Status",
                "Created",
                "Actions",
              ].map((item) => (
                <th key={item} className="px-6 py-4 text-left">
                  <div className="h-3 w-20 rounded bg-gray-200 dark:bg-slate-700" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {Array.from({ length: 4 }).map((_, index) => (
              <UserTableRowSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
