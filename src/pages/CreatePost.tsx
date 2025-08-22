import { useState } from 'react';
import { FiImage, FiLink, FiMessageSquare } from 'react-icons/fi';

// --- Utility Classes (DRY) ---
const cardBase =
  'rounded-2xl hover:shadow-lg p-4 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700';
const inputBase =
  'w-full p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500';
const actionBtn =
  'flex items-center gap-1 px-2 py-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition';
const primaryBtn =
  'px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    // Post submission logic here
    console.log('New Post:', { title, body });
    setTitle('');
    setBody('');
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 text-neutral-700 bg-primary-light dark:bg-primary-dark dark:text-primary-light">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className={`${cardBase} flex flex-col gap-4`}
        >
          <h2 className="font-semibold text-lg">Create a Post</h2>

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className={inputBase}
          />

          {/* Body */}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's on your mind?"
            rows={5}
            className={`${inputBase} resize-none`}
          />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <button type="button" className={actionBtn}>
                <FiImage /> Image
              </button>
              <button type="button" className={actionBtn}>
                <FiLink /> Link
              </button>
              <button type="button" className={actionBtn}>
                <FiMessageSquare /> Text
              </button>
            </div>

            {/* Submit */}
            <button type="submit" className={primaryBtn}>
              Post
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
