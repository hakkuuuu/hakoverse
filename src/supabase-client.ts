import { createClient } from '@supabase/supabase-js';

const supabaseURL = import.meta.env.VITE_API_URL as string;
const supabaseAnonKey = import.meta.env.VITE_API_KEY as string;

if (!supabaseURL || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL and Anon Key must be defined in environment variables.'
  );
}

export const supabase = createClient(supabaseURL, supabaseAnonKey);
