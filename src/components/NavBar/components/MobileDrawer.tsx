import { FiX, FiGithub, FiLogOut } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import type { MobileDrawerProps } from '../../../types';

export const MobileDrawer = ({
  isOpen,
  user,
  onClose,
  onSignIn,
  onSignOut,
}: MobileDrawerProps) => (
  <>
    <div
      className={`fixed inset-0 z-30 bg-primary-dark backdrop-blur-sm transition-opacity duration-300 ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    />

    <div
      className={`fixed top-0 left-0 h-full w-64 bg-primary-light dark:bg-primary-dark shadow-lg z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-neutral-300 dark:border-neutral-700">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8" />
          <span className="text-xl font-bold text-primary-gradient">
            Hakoverse
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-primary-dark dark:text-primary-light"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="p-4">
        {user ? (
          <div className="space-y-2">
            <div className="flex items-center gap-3 py-4">
              <div className="w-12 rounded-full overflow-hidden">
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    className="rounded-full w-10 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-primary-gradient flex items-center justify-center text-white">
                    {user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-primary-dark dark:text-primary-light">
                  {user?.user_metadata?.name || 'User'}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={onSignOut}
              className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
            >
              <FiLogOut size={16} />
              Sign Out
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <button
              onClick={() => onSignIn('github')}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-neutral-900 text-primary-dark dark:text-primary-light hover:bg-neutral-800 transition"
            >
              <FiGithub size={20} />
              Continue with GitHub
            </button>
            <button
              onClick={() => onSignIn('google')}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-white text-primary-light dark:text-primary-dark border border-neutral-300 hover:bg-gray-50 transition"
            >
              <FcGoogle size={20} />
              Continue with Google
            </button>
          </div>
        )}
      </div>
    </div>
  </>
);
