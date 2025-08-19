import { FiLogIn } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FiGithub } from 'react-icons/fi';
import type { Provider } from '@supabase/supabase-js';

interface LoginButtonProps {
  onSignIn: (provider: Provider) => Promise<void>;
}

export const LoginButton = ({ onSignIn }: LoginButtonProps) => (
  <div className="relative group hidden lg:block">
    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-gradient text-white hover:opacity-90 transition">
      <FiLogIn size={16} />
      Login
    </button>

    {/* Dropdown menu */}
    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-primary-dark rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <button
        onClick={() => onSignIn('github')}
        className="flex items-center gap-2 w-full px-4 py-2 text-left text-primary-dark dark:text-primary-light hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        <FiGithub size={20} />
        Continue with GitHub
      </button>
      <button
        onClick={() => onSignIn('google')}
        className="flex items-center gap-2 w-full px-4 py-2 text-left text-primary-dark dark:text-primary-light hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors border-t border-neutral-200 dark:border-neutral-700"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>
    </div>
  </div>
);
