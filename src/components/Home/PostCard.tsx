import {
  FiArrowUp,
  FiArrowDown,
  FiMessageSquare,
  FiShare2,
} from 'react-icons/fi';
import type { Post } from '../../types';

interface PostCardProps {
  post: Post;
  onVote: (postId: number, type: 'up' | 'down') => void;
  isVoting: boolean;
}

export const PostCard = ({ post, onVote, isVoting }: PostCardProps) => (
  <div className="rounded-2xl hover:shadow-lg p-4 max-w-3xl mx-auto flex flex-col justify-between hover:bg-neutral-100 dark:hover:bg-primary-light/5 transition">
    <h2 className="font-semibold text-lg">{post.title}</h2>
    {post.image_url && (
      <img
        src={post.image_url}
        alt={post.title}
        className="rounded-xl my-2 max-h-[360px] w-full mx-auto object-cover"
      />
    )}

    <div className="flex flex-wrap gap-3 mt-auto">
      <VoteButtons
        postId={post.id}
        upvotes={post.upvotes}
        onVote={onVote}
        isDisabled={isVoting}
      />
      <ActionButtons commentsCount={post.comments_count} />
    </div>
  </div>
);

const VoteButtons = ({
  postId,
  upvotes,
  onVote,
  isDisabled,
}: {
  postId: number;
  upvotes: number;
  onVote: (postId: number, type: 'up' | 'down') => void;
  isDisabled: boolean;
}) => (
  <div className="flex items-stretch border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden">
    <button
      onClick={() => onVote(postId, 'up')}
      className="flex items-center justify-center px-2 h-full hover:bg-green-500/10 hover:text-green-500 transition"
      disabled={isDisabled}
    >
      <FiArrowUp />
    </button>
    <div className="w-px bg-neutral-300 dark:bg-neutral-600" />
    <span className="flex items-center justify-center px-2 select-none">
      {upvotes}
    </span>
    <div className="w-px bg-neutral-300 dark:bg-neutral-600" />
    <button
      onClick={() => onVote(postId, 'down')}
      className="flex items-center justify-center px-2 h-full hover:bg-red-500/10 hover:text-red-500 transition"
      disabled={isDisabled}
    >
      <FiArrowDown />
    </button>
  </div>
);

const ActionButtons = ({ commentsCount }: { commentsCount: number }) => (
  <>
    <button className="flex items-center gap-1 border border-neutral-300 dark:border-neutral-600 rounded-lg px-2 py-1 hover:bg-blue-500/10 hover:border-blue-500 transition">
      <FiMessageSquare /> {commentsCount || 0}
    </button>
    <button className="flex items-center gap-1 border border-neutral-300 dark:border-neutral-600 rounded-lg px-2 py-1 hover:bg-purple-500/10 hover:border-purple-500 transition">
      <FiShare2 /> Share
    </button>
  </>
);
