import { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaComment, FaShare } from 'react-icons/fa';

type MemePost = {
  id: number;
  title: string;
  image: string;
  upvotes: number;
  comments: number;
};

const initialMemes: MemePost[] = [
  {
    id: 1,
    title: ':Lorem',
    image: 'https://i.redd.it/3q1x5j0k2zv81.jpg',
    upvotes: 253,
    comments: 12,
  },
];

const recentPosts = [
  {
    id: 1,
    title: 'Lorem',
    upvotes: 3,
    comments: 6,
  },
];

export default function Home() {
  const [memes, setMemes] = useState(initialMemes);

  const handleVote = (id: number, type: 'up' | 'down') => {
    setMemes((prev) =>
      prev.map((meme) =>
        meme.id === id
          ? {
              ...meme,
              upvotes: type === 'up' ? meme.upvotes + 1 : meme.upvotes - 1,
            }
          : meme
      )
    );
  };

  return (
    <main className="min-h-screen p-6 text-stone-700 bg-primary-dark dark:text-white">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* LEFT FEED */}
        <div className="flex-1 space-y-6">
          {memes.map((meme) => (
            <div
              key={meme.id}
              className="hover:bg-primary-light/5 rounded-3xl shadow p-4 max-w-3xl mx-auto"
            >
              <h2 className="font-semibold text-lg mb-2">{meme.title}</h2>
              <img
                src={meme.image}
                alt={meme.title}
                className="rounded-2xl my-5 max-h-[360px] w-full mx-auto object-cover"
              />

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleVote(meme.id, 'up')}
                    className="flex items-center gap-1 hover:text-green-500"
                  >
                    <FaArrowUp /> {meme.upvotes}
                  </button>
                  <button
                    onClick={() => handleVote(meme.id, 'down')}
                    className="flex items-center gap-1 hover:text-red-500"
                  >
                    <FaArrowDown />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 hover:text-blue-500">
                    <FaComment /> {meme.comments} Comments
                  </button>
                  <button className="flex items-center gap-1 hover:text-yellow-500">
                    <FaShare /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-80 max-h-[80vh] overflow-y-auto bg-white dark:bg-primary-light/5 rounded-xl shadow p-4">
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
