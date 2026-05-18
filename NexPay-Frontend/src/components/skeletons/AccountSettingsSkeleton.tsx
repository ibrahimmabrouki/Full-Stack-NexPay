export default function AccountSettingsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div className="space-y-2">
        <div className="h-6 w-48 bg-gray-300 dark:bg-slate-700 rounded" />
        <div className="h-4 w-80 bg-gray-200 dark:bg-slate-700 rounded" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
            {/* Card Header */}
            <div className="h-14 bg-gradient-to-r from-indigo-600/40 to-purple-600/40" />

            <div className="p-6 space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gray-300 dark:bg-slate-700" />
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-300 dark:bg-slate-700 rounded" />
                  <div className="h-3 w-40 bg-gray-200 dark:bg-slate-700 rounded" />
                </div>
              </div>

              {/* Inputs */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-32 bg-gray-300 dark:bg-slate-700 rounded" />
                  <div className="h-12 w-full bg-gray-200 dark:bg-slate-700 rounded-xl" />
                </div>
              ))}

              {/* Button */}
              <div className="h-10 w-40 bg-gray-300 dark:bg-slate-700 rounded-xl" />
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* Security Tips */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-indigo-100/40 to-purple-100/40 dark:from-indigo-900/20 dark:to-purple-900/20">
            <div className="h-5 w-32 bg-gray-300 dark:bg-slate-700 rounded mb-4" />

            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-full bg-gray-200 dark:bg-slate-700 rounded"
                />
              ))}
            </div>
          </div>

          {/* Help Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 space-y-4">
            <div className="h-5 w-28 bg-gray-300 dark:bg-slate-700 rounded" />
            <div className="h-3 w-full bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-3 w-5/6 bg-gray-200 dark:bg-slate-700 rounded" />
            <div className="h-10 w-full bg-gray-300 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
