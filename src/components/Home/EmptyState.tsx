import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router';

export const EmptyState = () => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full mb-4">
      <FiPlusCircle size={48} className="text-neutral-400" />
    </div>
    <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
    <p className="text-neutral-500 dark:text-neutral-400 mb-4">
      Be the first one to create a post!
    </p>
    <Link
      to="/create-post"
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-gradient text-white hover:opacity-90 transition"
    >
      <FiPlusCircle size={16} />
      Create Post
    </Link>
  </div>
);
