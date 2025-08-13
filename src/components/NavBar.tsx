import { useEffect, useState } from 'react';
import { FiSun, FiMoon, FiUser, FiSearch, FiMenu, FiX } from 'react-icons/fi';

export default function NavBar() {
  const [theme, setTheme] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Load theme from localStorage
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

  return (
    <header className="h-14 bg-primary-light dark:bg-primary-dark px-4 flex items-center justify-between z-20 border-b border-stone-400 dark:border-white/20 relative">
      {/* Left - Logo */}
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
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

      {/* Center - Search Bar (hidden on mobile) */}
      <div className="flex-1 justify-center px-4 hidden lg:flex">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full px-4 py-2 pl-10 rounded-2xl
              bg-neutral-300/10 dark:bg-neutral-900
              text-neutral-700 dark:text-neutral-200
              border border-neutral-300 dark:border-neutral-700
              focus:outline-none focus:ring-2 focus:ring-primary-gradient
              transition
            "
          />
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
            size={14}
          />
        </div>
      </div>

      {/* Right - Login + Theme Button */}
      <div className="flex items-center gap-4">
        <button className="hidden lg:block text-primary-light">
          <span
            className="
              flex flex-row items-center gap-2 px-5 py-2 rounded-lg 
              bg-primary-gradient 
              hover:opacity-90 transition
            "
          >
            Login <FiUser size={16} />
          </span>
        </button>

        <button
          onClick={toggleTheme}
          className={`
            p-3 rounded-full transition-colors duration-300 
            ${
              theme
                ? 'text-neutral-200 hover:bg-neutral-700'
                : 'text-neutral-700 hover:bg-neutral-200'
            }
          `}
        >
          {theme ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
      </div>


      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-primary-dark backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setDrawerOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-primary-light dark:bg-primary-dark shadow-lg z-40 transform transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-300 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="w-8" />
            <span className="text-xl font-bold text-primary-gradient">
              Hakoverse
            </span>
          </div>

          <button
            onClick={() => setDrawerOpen(false)}
            className="text-primary-dark dark:text-primary-light"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Search in drawer */}
        <div className="p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="
                w-full px-4 py-2 pl-10 rounded-2xl
                bg-neutral-300/10 dark:bg-neutral-900
                text-neutral-700 dark:text-neutral-200
                border border-neutral-300 dark:border-neutral-700
                focus:outline-none focus:ring-2 focus:ring-primary-gradient
                transition
              "
            />
            <FiSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
              size={14}
            />
          </div>
        </div>

        {/* Login button in drawer */}
        <div className="p-4">
          <button className="w-full text-primary-light">
            <span
              className="
                flex justify-center items-center gap-2 px-5 py-2 rounded-lg 
                bg-primary-gradient 
                hover:opacity-90 transition
              "
            >
              Login <FiUser size={16} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
