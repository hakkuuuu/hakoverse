import { supabase } from '../supabase-client';
import type { Post } from '../types';

export const getPosts = async (): Promise<Post[]> => {
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

export const getRecentPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;

  return (data || []).map((post) => ({
    ...post,
    upvotes: post.upvotes || 0,
    comments_count: post.comments_count || 0,
  }));
};

export const updateVote = async (
  postId: number,
  currentUpvotes: number,
  type: 'up' | 'down'
) => {
  const { data, error } = await supabase
    .from('posts')
    .update({
      upvotes: type === 'up' ? currentUpvotes + 1 : currentUpvotes - 1,
    })
    .eq('id', postId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const postService = {
  getPosts,
  getRecentPosts,
  updateVote,
};
