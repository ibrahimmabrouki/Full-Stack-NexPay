export default function BalanceCardSkeleton() {
  return (
    <div className="bg-gradient-to-r from-indigo-600/40 to-purple-600/40 rounded-2xl p-8 animate-pulse text-white">
      <div className="flex justify-between items-start">
        {/* Left */}
        <div className="space-y-3">
          <div className="h-5 w-40 bg-white/40 rounded" />

          <div className="h-10 w-48 bg-white/50 rounded mt-4" />

          <div className="h-4 w-32 bg-white/30 rounded" />
          <div className="h-4 w-40 bg-white/30 rounded" />
        </div>

        {/* Right */}
        <div className="text-right space-y-3">
          <div className="h-8 w-32 bg-white/40 rounded-lg ml-auto" />
          <div className="h-6 w-28 bg-white/50 rounded ml-auto" />
          <div className="h-4 w-16 bg-white/30 rounded ml-auto" />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-6">
        <div className="h-10 w-36 bg-white/50 rounded-lg" />
        <div className="h-10 w-28 bg-white/30 rounded-lg" />
      </div>
    </div>
  );
}
