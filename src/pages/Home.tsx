import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '../services/posts';
import {
  EmptyState,
  PostSkeleton,
  RecentPostSkeleton,
  PostCard,
  RecentPostsList,
} from '../components/Home';

export default function Home() {
  const queryClient = useQueryClient();

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: postService.getPosts,
  });

  const { data: recentPosts, isLoading: recentPostsLoading } = useQuery({
    queryKey: ['recentPosts'],
    queryFn: postService.getRecentPosts,
  });

  const voteMutation = useMutation({
    mutationFn: async ({ postId, type }: { postId: number; type: 'up' | 'down' }) => {
      const post = posts?.find((p) => p.id === postId);
      if (!post) throw new Error('Post not found');
      return postService.updateVote(postId, post.upvotes, type);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  if (postsLoading || recentPostsLoading) {
    return <LoadingView />;
  }

  return (
    <main className="min-h-screen p-4 sm:p-6 text-neutral-700 bg-primary-light dark:bg-primary-dark dark:text-primary-light">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {!posts?.length ? (
            <EmptyState />
          ) : (
            posts.map((post, index) => (
              <div key={post.id}>
                <PostCard
                  post={post}
                  onVote={(postId, type) => voteMutation.mutate({ postId, type })}
                  isVoting={voteMutation.isPending}
                />
                {index !== posts.length - 1 && <Divider />}
              </div>
            ))
          )}
        </div>

        <aside className="w-full lg:w-80 max-h-[80vh] overflow-y-auto bg-neutral-300/20 dark:bg-primary-light/5 rounded-xl border-primary-dark p-4">
          <h3 className="font-semibold mb-3">Recent Posts</h3>
          {!recentPosts?.length ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No posts available
            </p>
          ) : (
            <RecentPostsList posts={recentPosts} />
          )}
        </aside>
      </div>
    </main>
  );
}

const Divider = () => (
  <div className="max-w-3xl mx-auto border-t border-neutral-300 dark:border-neutral-600 my-3" />
);

const LoadingView = () => (
  <main className="min-h-screen p-4 sm:p-6 text-neutral-700 bg-primary-light dark:bg-primary-dark dark:text-primary-light">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        {[1, 2, 3].map((index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
      <aside className="w-full lg:w-80 max-h-[80vh] bg-neutral-300/20 dark:bg-primary-light/5 rounded-xl border-primary-dark p-4">
        <div className="h-6 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3 mb-4" />
        <RecentPostSkeleton />
      </aside>
    </div>
  </main>
);
