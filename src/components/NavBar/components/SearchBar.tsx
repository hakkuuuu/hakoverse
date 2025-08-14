import { FiSearch } from 'react-icons/fi';

export const SearchBar = () => (
  <div className="flex-1 justify-center px-4 hidden lg:flex">
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder="Search..."
        className="w-full px-4 py-2 pl-10 rounded-2xl bg-neutral-300/10 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-gradient transition"
      />
      <FiSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
        size={14}
      />
    </div>
  </div>
);
