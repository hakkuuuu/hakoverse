import { useEffect, useState } from 'react';
// import { FaUser, FaMagnifyingGlass } from 'react-icons/fa6';
import { FiSun, FiMoon, FiUser, FiSearch } from 'react-icons/fi';

export default function NavBar() {
  const [theme, setTheme] = useState(false);

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
    <header className="h-14 bg-primary-light dark:bg-primary-dark px-4 flex items-center justify-between z-10 border-b border-stone-400 dark:border-white/20">
      {/* Left - Logo */}
      <div className="flex items-center">
        <img src="/logo.png" alt="Logo" className="w-8 mr-4" />
        <span className="text-xl font-bold text-primary-gradient">
          Hakoverse
        </span>
      </div>

      {/* Center - Search Bar */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full px-4 py-2 pl-10 rounded-2xl
              bg-gray-100 dark:bg-neutral-900
              text-neutral-700 dark:text-gray-200
              border border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-primary-gradient
              transition
            "
          />
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"
            size={14}
          />
        </div>
      </div>

      {/* Right - Login + Theme Button */}
      <div className="flex items-center gap-4">
        <button className="text-white">
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
                : ' text-neutral-700 hover:bg-neutral-200'
            }
          `}
        >
          {theme ? <FiSun size={18} /> : <FiMoon size={18} />}
        </button>
      </div>
    </header>
  );
}
