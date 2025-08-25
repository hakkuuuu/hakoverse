import { useState } from 'react';
import { FiImage, FiLink, FiMessageSquare } from 'react-icons/fi';
import { supabase } from '../supabase-client';
import { useMutation } from '@tanstack/react-query';

interface PostInput {
  title: string;
  body: string;
  image_url?: string;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from('posts-images')
    .upload(filePath, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: imageData } = supabase.storage
    .from('posts-images')
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from('posts')
    .insert({ ...post, image_url: imageData.publicUrl });

  if (error) throw new Error(error.message);

  return data;
};

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const { mutate } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (!file) return;
    mutate({ post: { title, body }, imageFile: file! });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
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
              <label htmlFor="image" className="action-btn cursor-pointer">
                <FiImage /> Image
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
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
