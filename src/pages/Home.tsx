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
      'https://scontent.flgp1-1.fna.fbcdn.net/v/t39.30808-6/528921662_122229982940088505_3615420672165660195_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeE9gqluRjd1P-RQe3xLCHVJBxF6dkD-eqQHEXp2QP56pCrwGmlqMZfMYyaqrLeRWhagQ0AIbp2PO8ENhMOUdyQH&_nc_ohc=oMdvOOpJ1DoQ7kNvwH59Nqj&_nc_oc=Adkw24UsEqg6WJOgYbi31Gcy1r_3SsTmGeEYTF534E4GYevtOU_OV-nfr8udiDMs3E0&_nc_zt=23&_nc_ht=scontent.flgp1-1.fna&_nc_gid=xQPhk2KDOP5NAVYB0uxssQ&oh=00_AfUtvXRs5snABlwUxhPMOPhfy22RKLNIkpkRK6SbJac7cQ&oe=689BD2E2',
    upvotes: 253,
    comments: 12,
  },
];

const recentPosts = [
  {
    id: 1,
    title: 'Post 1',
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
    <main className="min-h-screen p-6 text-neutral-700 bg-primary-light dark:bg-primary-dark dark:text-white">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* LEFT FEED */}
        <div className="flex-1 space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-neutral-100 dark:bg-primary-dark hover:bg-primary-light/5 rounded-2xl shadow p-4 max-w-3xl mx-auto flex flex-col justify-between"
            >
              <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
              <img
                src={post.image}
                alt={post.title}
                className="rounded-xl my-5 max-h-[360px] w-full mx-auto object-cover"
              />

              {/* Actions bottom left */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => handleVote(post.id, 'up')}
                  className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 hover:bg-green-500/10 hover:border-green-500 transition"
                >
                  <FiArrowUp /> {post.upvotes}
                </button>
                <button
                  onClick={() => handleVote(post.id, 'down')}
                  className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 hover:bg-red-500/10 hover:border-red-500 transition"
                >
                  <FiArrowDown />
                </button>
                <button className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 hover:bg-blue-500/10 hover:border-blue-500 transition">
                  <FiMessageSquare /> {post.comments}
                </button>
                <button className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 hover:bg-purple-500/10 hover:border-purple-500 transition">
                  <FiShare2 /> Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-80 max-h-[80vh] overflow-y-auto bg-neutral-100 dark:bg-primary-light/5 rounded-xl shadow p-4">
          <h3 className="font-semibold mb-3">Recent Posts</h3>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="border-b border-gray-300 dark:border-gray-700 pb-3 last:border-none"
              >
                <h4 className="text-sm font-medium hover:underline cursor-pointer">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
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
