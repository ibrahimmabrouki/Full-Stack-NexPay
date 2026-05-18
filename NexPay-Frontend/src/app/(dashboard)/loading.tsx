export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <div className="loading-spinner"></div>
      <p className="mt-4 text-gray-500 dark:text-gray-400 animate-pulse">
        Loading your dashboard...
      </p>
    </div>
  );
}
