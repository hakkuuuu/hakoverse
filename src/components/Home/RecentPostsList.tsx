import type { Post } from '../../types';

interface RecentPostsListProps {
  posts: Post[];
}

export const RecentPostsList = ({ posts }: RecentPostsListProps) => (
  <div className="space-y-4">
    {posts.map((post) => (
      <div
        key={post.id}
        className="border-b border-neutral-300 dark:border-neutral-700 pb-3 last:border-none"
      >
        <h4 className="text-sm font-medium hover:underline cursor-pointer">
          {post.title}
        </h4>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {post.upvotes} upvotes • {post.comments_count || 0} comments
        </p>
      </div>
    ))}
  </div>
);