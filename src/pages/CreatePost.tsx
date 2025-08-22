import { useState } from 'react';
import { FiImage, FiLink, FiMessageSquare } from 'react-icons/fi';
import { supabase } from '../supabase-client';
import { useMutation } from '@tanstack/react-query';

interface PostInput {
  title: string;
  body: string;
}

const createPost = async (post: PostInput) => {
  const { data, error } = await supabase.from('posts').insert([post]);

  if (error) throw new Error(error.message);

  return data;
};

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { mutate } = useMutation({ mutationFn: createPost });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutate({ title, body });
  };

  return (
    <main className="min-h-screen p-4 sm:p-6 text-neutral-700 bg-primary-light dark:bg-primary-dark dark:text-primary-light">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="card-base flex flex-col gap-4">
          <h2 className="font-semibold text-lg">Create a Post</h2>

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="input-base"
          />

          {/* Body */}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's on your mind?"
            rows={5}
            className="input-base resize-none"
          />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <button type="button" className="action-btn">
                <FiImage /> Image
              </button>
              <button type="button" className="action-btn">
                <FiLink /> Link
              </button>
              <button type="button" className="action-btn">
                <FiMessageSquare /> Text
              </button>
            </div>

            {/* Submit */}
            <button type="submit" className="primary-btn">
              Post
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
