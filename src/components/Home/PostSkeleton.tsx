export const PostSkeleton = () => (
  <div className="animate-pulse">
    <div className="rounded-2xl p-4 max-w-3xl mx-auto flex flex-col justify-between bg-neutral-100 dark:bg-primary-light/5">
      <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded-lg w-3/4 mb-4" />
      <div className="h-[240px] bg-neutral-200 dark:bg-neutral-700 rounded-xl mb-4" />
      <div className="flex gap-3">
        <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
        <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
        <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-700 rounded-lg" />
      </div>
    </div>
    <div className="max-w-3xl mx-auto border-t border-neutral-300 dark:border-neutral-600 my-6" />
  </div>
);
