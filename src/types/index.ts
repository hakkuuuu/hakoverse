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
