import { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaUser } from 'react-icons/fa6';

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
    <header className="h-16 bg-primary-light dark:bg-primary-dark px-4 flex items-center z-10 border-b border-stone-400 dark:border-white/20">
      <img src="/logo.png" alt="Logo" className="w-8 mr-4" />
      <span className="text-xl font-bold text-primary-gradient">Hakoverse</span>

      <div className="flex flex-row items-center gap-4 ml-auto">
        <button className="text-white">
          <span
            className="
              flex flex-row items-center gap-2 px-5 py-3 rounded-lg 
              bg-primary-gradient 
              hover:opacity-90 transition
            "
          >
            Login <FaUser size={18} />
          </span>
        </button>

        <button
          onClick={toggleTheme}
          className={`
            p-3 rounded-full transition-colors duration-300 
            ${
              theme
                ? 'bg-gray-200 text-gray-900 hover:bg-yellow-400'
                : 'bg-gray-800/80 text-yellow-300 hover:bg-gray-700'
            }
          `}
        >
          {theme ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
      </div>
    </header>
  );
}
