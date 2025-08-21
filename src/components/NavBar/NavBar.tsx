import { useState } from 'react';
import { FiMenu, FiPlusCircle } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { ProfileSection } from './components/ProfileSection';
import { MobileDrawer } from './components/MobileDrawer';
import { SearchBar } from './components/SearchBar';
// import { ThemeToggle } from './components/ThemeToggle';
import { LoginButton } from './components/LoginButton';
import { Link } from 'react-router';

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, signInWithProvider, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setDrawerOpen(false);
  };

  return (
    <header className="h-14 bg-primary-light dark:bg-primary-dark px-4 flex items-center justify-between z-20 border-b border-stone-400 dark:border-white/20 relative">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden p-2 rounded-lg text-primary-dark dark:text-primary-light hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
          onClick={() => setDrawerOpen(true)}
        >
          <FiMenu size={20} />
        </button>
        <img src="/logo.png" alt="Logo" className="w-8" />
        <span className="text-xl font-bold text-primary-gradient">
          Hakoverse
        </span>
      </div>

      <SearchBar />

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Link
              to="/create-post"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-3xl text-primary-light hover:bg-neutral-800 bg-primary-dark"
            >
              <FiPlusCircle size={16} />
              <span>Create Post</span>
            </Link>
            <ProfileSection user={user} onSignOut={handleSignOut} />
          </>
        ) : (
          <LoginButton onSignIn={signInWithProvider} />
        )}
      </div>

      <MobileDrawer
        isOpen={drawerOpen}
        user={user}
        onClose={() => setDrawerOpen(false)}
        onSignIn={signInWithProvider}
        onSignOut={handleSignOut}
      />
    </header>
  );
}
