import {
  FiLogOut,
  FiUser,
  FiAward,
  FiSettings,
  FiMoon,
  FiSun,
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface ProfileSectionProps {
  user: SupabaseUser | null;
  onSignOut: () => void;
}

export const ProfileSection = ({ user, onSignOut }: ProfileSectionProps) => {
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';
    setTheme(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  if (!user) return null;

  return (
    <div className="relative group hidden lg:block">
      {/* Trigger */}
      <button className="flex items-center gap-4 p-1 rounded-full hover:ring-2 hover:ring-secondary transition-all duration-150 ease-in-out">
        <span className="text-primary-dark dark:text-primary-light pl-2">
          {user.user_metadata?.name || 'Profile'}
        </span>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          {user.user_metadata?.avatar_url ? (
            <img
              src={user.user_metadata.avatar_url}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-primary-gradient flex items-center justify-center text-white">
              {user.email?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
        </div>
      </button>

      {/* Dropdown */}
      <div className="flex flex-col absolute right-0 mt-2 w-56 bg-neutral-100 dark:bg-primary-dark rounded-lg shadow-xl border border-neutral-100 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {/* View Profile */}
        <button className="dropdown-item">
          <FiUser size={16} />
          View Profile
        </button>

        {/* Achievements */}
        <button className="dropdown-item dropdown-divider">
          <FiAward size={16} />
          Achievements
        </button>

        {/* Settings */}
        <button className="dropdown-item dropdown-divider">
          <FiSettings size={16} />
          Settings
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="dropdown-item dropdown-divider"
        >
          {theme ? <FiSun size={16} /> : <FiMoon size={16} />}
          {theme ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* Sign Out */}
        <button onClick={onSignOut} className="dropdown-item dropdown-divider">
          <FiLogOut size={16} />
          Sign Out
        </button>
      </div>
    </div>
  );
};
