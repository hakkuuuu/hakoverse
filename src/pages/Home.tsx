import { useState } from 'react';
import {
  FiArrowUp,
  FiArrowDown,
  FiMessageSquare,
  FiShare2,
} from 'react-icons/fi';

type Post = {
  id: number;
  title: string;
  image: string;
  upvotes: number;
  comments: number;
};
const initialposts: Post[] = [
  {
    id: 1,
    title: 'Sample feed',
    image:
      'https://i.pinimg.com/736x/b0/e3/3f/b0e33fe99366a29a36394daceafe4ccc.jpg',
    upvotes: 253,
    comments: 12,
  },
  {
    id: 2,
    title: 'Sample feed 2',
    image:
      'https://i.pinimg.com/736x/b0/e3/3f/b0e33fe99366a29a36394daceafe4ccc.jpg',
    upvotes: 1143,
    comments: 192,
  },
];

const recentPosts = [
  {
    id: 1,
    title: 'Post 1',
    upvotes: 3,
    comments: 6,
  },
  {
    id: 2,
    title: 'Post 2',
    upvotes: 3,
    comments: 6,
  },
  {
    id: 3,
    title: 'Post 3',
    upvotes: 3,
    comments: 6,
  },
];

export default function Home() {
  const [posts, setPosts] = useState(initialposts);

  const handleVote = (id: number, type: 'up' | 'down') => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id
          ? {
              ...post,
              upvotes: type === 'up' ? post.upvotes + 1 : post.upvotes - 1,
            }
          : post
      )
    );
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 text-neutral-700 bg-primary-light dark:bg-primary-dark dark:text-primary-light">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* LEFT FEED */}
        <div className="flex-1">
          {posts.map((post, index) => (
            <div key={post.id}>
              <div
                className="rounded-2xl hover:shadow-lg p-4 max-w-3xl mx-auto flex flex-col justify-between
             hover:bg-neutral-100 dark:hover:bg-primary-light/5 transition"
              >
                <h2 className="font-semibold text-lg">{post.title}</h2>
                <img
                  src={post.image}
                  alt={post.title}
                  className="rounded-xl my-5 max-h-[360px] w-full mx-auto object-cover"
                />

                {/* Actions bottom left */}
                <div className="flex flex-wrap gap-3 mt-auto">
                  {/* Vote group */}
                  <div className="flex items-stretch border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleVote(post.id, 'up')}
                      className="flex items-center justify-center px-2 h-full hover:bg-green-500/10 hover:text-green-500 transition"
                    >
                      <FiArrowUp />
                    </button>
                    <div className="w-px bg-neutral-300 dark:bg-neutral-600"></div>
                    <span className="flex items-center justify-center px-2 select-none">
                      {post.upvotes}
                    </span>
                    <div className="w-px bg-neutral-300 dark:bg-neutral-600"></div>
                    <button
                      onClick={() => handleVote(post.id, 'down')}
                      className="flex items-center justify-center px-2 h-full hover:bg-red-500/10 hover:text-red-500 transition"
                    >
                      <FiArrowDown />
                    </button>
                  </div>

                  {/* Comments */}
                  <button className="flex items-center gap-1 border border-neutral-300 dark:border-neutral-600 rounded-lg px-2 py-1 hover:bg-blue-500/10 hover:border-blue-500 transition">
                    <FiMessageSquare /> {post.comments}
                  </button>

                  {/* Share */}
                  <button className="flex items-center gap-1 border border-neutral-300 dark:border-neutral-600 rounded-lg px-2 py-1 hover:bg-purple-500/10 hover:border-purple-500 transition">
                    <FiShare2 /> Share
                  </button>
                </div>
              </div>

              {/* Divider */}
              {index !== posts.length - 1 && (
                <div className="max-w-3xl mx-auto border-t border-neutral-300 dark:border-neutral-600 my-6" />
              )}
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full lg:w-80 max-h-[80vh] overflow-y-auto bg-neutral-300/20 dark:bg-primary-light/5 rounded-xl border-primary-dark p-4">
          <h3 className="font-semibold mb-3">Recent Posts</h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="border-b border-neutral-300 dark:border-neutral-700 pb-3 last:border-none"
              >
                <h4 className="text-sm font-medium hover:underline cursor-pointer">
                  {post.title}
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  {post.upvotes} upvotes • {post.comments} comments
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
