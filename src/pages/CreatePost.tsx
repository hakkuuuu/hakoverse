import { useState } from 'react';
import { FiImage, FiLink, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { supabase } from '../supabase-client';
import type { PostInput } from '../types';

const sanitizeFileName = (fileName: string): string => {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const createPost = async (post: PostInput, imageFile: File) => {
  // Sanitize the title and file name
  const sanitizedTitle = sanitizeFileName(post.title);
  const sanitizedFileName = sanitizeFileName(imageFile.name);
  const fileExt = imageFile.name.split('.').pop();

  // Create unique file path with sanitized names
  const filePath = `${sanitizedTitle}-${Date.now()}-${sanitizedFileName}.${fileExt}`;

  try {
    const { error: uploadError } = await supabase.storage
      .from('posts-images')
      .upload(filePath, imageFile);

    if (uploadError) throw new Error(uploadError.message);

    const { data: imageData } = supabase.storage
      .from('posts-images')
      .getPublicUrl(filePath);

    const { data, error } = await supabase
      .from('posts')
      .insert({ ...post, image_url: imageData.publicUrl })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Failed to create post'
    );
  }
};

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) =>
      createPost(data.post, data.imageFile),
    onSuccess: () => {
      toast.success('Post created successfully!');
      navigate('/');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create post');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!file) {
      toast.error('Image is required');
      return;
    }

    // Create loading toast
    const loadingToast = toast.loading('Creating post...');

    mutate(
      { post: { title, body }, imageFile: file },
      {
        onSettled: () => {
          toast.dismiss(loadingToast);
        },
      }
    );
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
            disabled={isPending}
          />

          {/* Body */}
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What's on your mind?"
            rows={5}
            className="input-base resize-none"
            disabled={isPending}
          />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              <label
                htmlFor="image"
                className={`action-btn cursor-pointer ${
                  isPending ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <FiImage /> Image
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isPending}
                />
              </label>
              <button type="button" className="action-btn" disabled={isPending}>
                <FiLink /> Link
              </button>
              <button type="button" className="action-btn" disabled={isPending}>
                <FiMessageSquare /> Text
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="primary-btn disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
