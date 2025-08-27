export const RecentPostSkeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3, 4, 5].map((index) => (
      <div
        key={index}
        className="border-b border-neutral-300 dark:border-neutral-700 pb-3 last:border-none"
      >
        <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2" />
        <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2" />
      </div>
    ))}
  </div>
);
