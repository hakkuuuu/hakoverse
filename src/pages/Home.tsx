import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  FiArrowUp,
  FiArrowDown,
  FiMessageSquare,
  FiShare2,
  FiPlusCircle,
} from 'react-icons/fi';
import { Link } from 'react-router';
import { supabase } from '../supabase-client';

export interface Post {
  id: number;
  title: string;
  body: string;
  image_url?: string;
  created_at: string;
  user_id: string;
  upvotes: number;
  comments_count: number;
}

// Fetch functions
const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((post) => ({
    ...post,
    upvotes: post.upvotes || 0,
    comments_count: post.comments_count || 0,
  }));
};

const getRecentPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;

  // Ensure upvotes is always a number
  return (data || []).map((post) => ({
    ...post,
    upvotes: post.upvotes || 0,
    comments_count: post.comments_count || 0,
  }));
};

const EmptyState = () => (
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

export default function Home() {
  const queryClient = useQueryClient();

  // Main posts query
  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  // Recent posts query
  const { data: recentPosts, isLoading: recentPostsLoading } = useQuery({
    queryKey: ['recentPosts'],
    queryFn: getRecentPosts,
  });

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: async ({
      postId,
      type,
    }: {
      postId: number;
      type: 'up' | 'down';
    }) => {
      // Fetch current upvotes
      const { data: postData, error: fetchError } = await supabase
        .from('posts')
        .select('upvotes')
        .eq('id', postId)
        .single();

      if (fetchError) throw fetchError;

      const currentUpvotes = postData?.upvotes || 0;
      const newUpvotes =
        type === 'up' ? currentUpvotes + 1 : currentUpvotes - 1;

      const { data, error } = await supabase
        .from('posts')
        .update({
          upvotes: newUpvotes,
        })
        .eq('id', postId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  if (postsLoading || recentPostsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-dark"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-6 text-neutral-700 bg-primary-light dark:bg-primary-dark dark:text-primary-light">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* LEFT FEED */}
        <div className="flex-1">
          {!posts?.length ? (
            <EmptyState />
          ) : (
            posts.map((post, index) => (
              <div key={post.id}>
                <div className="rounded-2xl hover:shadow-lg p-4 max-w-3xl mx-auto flex flex-col justify-between hover:bg-neutral-100 dark:hover:bg-primary-light/5 transition">
                  <h2 className="font-semibold text-lg">{post.title}</h2>
                  {post.image_url && (
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="rounded-xl my-5 max-h-[360px] w-full mx-auto object-cover"
                    />
                  )}

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {/* Vote group */}
                    <div className="flex items-stretch border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          voteMutation.mutate({ postId: post.id, type: 'up' })
                        }
                        className="flex items-center justify-center px-2 h-full hover:bg-green-500/10 hover:text-green-500 transition"
                        disabled={voteMutation.isPending}
                      >
                        <FiArrowUp />
                      </button>
                      <div className="w-px bg-neutral-300 dark:bg-neutral-600"></div>
                      <span className="flex items-center justify-center px-2 select-none">
                        {post.upvotes}
                      </span>
                      <div className="w-px bg-neutral-300 dark:bg-neutral-600"></div>
                      <button
                        onClick={() =>
                          voteMutation.mutate({ postId: post.id, type: 'down' })
                        }
                        className="flex items-center justify-center px-2 h-full hover:bg-red-500/10 hover:text-red-500 transition"
                        disabled={voteMutation.isPending}
                      >
                        <FiArrowDown />
                      </button>
                    </div>

                    {/* Comments */}
                    <button className="flex items-center gap-1 border border-neutral-300 dark:border-neutral-600 rounded-lg px-2 py-1 hover:bg-blue-500/10 hover:border-blue-500 transition">
                      <FiMessageSquare /> {post.comments_count || 0}
                    </button>

                    {/* Share */}
                    <button className="flex items-center gap-1 border border-neutral-300 dark:border-neutral-600 rounded-lg px-2 py-1 hover:bg-purple-500/10 hover:border-purple-500 transition">
                      <FiShare2 /> Share
                    </button>
                  </div>
                </div>

                {/* Divider */}
                {index !== (posts?.length || 0) - 1 && (
                  <div className="max-w-3xl mx-auto border-t border-neutral-300 dark:border-neutral-600 my-6" />
                )}
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full lg:w-80 max-h-[80vh] overflow-y-auto bg-neutral-300/20 dark:bg-primary-light/5 rounded-xl border-primary-dark p-4">
          <h3 className="font-semibold mb-3">Recent Posts</h3>
          {!recentPosts?.length ? (
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              No posts available
            </p>
          ) : (
            <div className="space-y-4">
              {recentPosts?.map((post) => (
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
          )}
        </aside>
      </div>
    </main>
  );
}
