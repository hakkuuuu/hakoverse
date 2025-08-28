import type { User, Provider } from '@supabase/supabase-js';

// Props for MobileDrawer component, authentication and user related types
export interface MobileDrawerProps {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSignIn: (provider: Provider) => Promise<void>;
  onSignOut: () => void;
}

// Post type definition for posts fetched from the database
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

// Input type for creating a new post
export interface PostInput {
  title: string;
  body: string;
  image_url?: string;
}
