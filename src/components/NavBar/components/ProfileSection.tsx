import { FiLogOut } from 'react-icons/fi';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ProfileSectionProps {
  user: SupabaseUser | null;
  onSignOut: () => void;
}

export const ProfileSection = ({ user, onSignOut }: ProfileSectionProps) => (
  <div className="relative group">
    <button className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        {user?.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary-gradient flex items-center justify-center text-white">
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
        )}
      </div>
      <span className="hidden lg:block text-primary-dark dark:text-primary-light">
        {user?.user_metadata?.name || 'Profile'}
      </span>
    </button>

    <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-primary-dark rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <button
        onClick={onSignOut}
        className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
      >
        <FiLogOut size={16} />
        Sign Out
      </button>
    </div>
  </div>
);
