export default function TransactionsTableSkeleton() {
  return (
    <div className="bg-[#f8f7f3] rounded-2xl p-6 border animate-pulse space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="h-5 w-32 bg-gray-300 rounded" />
          <div className="h-3 w-48 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-20 bg-gray-300 rounded" />
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 pb-3 border-b">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-3 w-20 bg-gray-200 rounded" />
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-4 items-center py-4 gap-2">
            {/* Name */}
            <div className="space-y-2">
              <div className="h-4 w-28 bg-gray-300 rounded" />
              <div className="h-3 w-20 bg-gray-200 rounded" />
            </div>

            {/* Date */}
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-300 rounded" />
              <div className="h-3 w-14 bg-gray-200 rounded" />
            </div>

            {/* Status */}
            <div>
              <div className="h-5 w-16 bg-gray-200 rounded-full" />
            </div>

            {/* Amount */}
            <div className="flex justify-end">
              <div className="h-4 w-20 bg-gray-300 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
