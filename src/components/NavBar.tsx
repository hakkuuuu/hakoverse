import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa6';

export default function NavBar() {
  const [theme, setTheme] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark';

    setTheme(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);

    // Add or remove the dark class on <html>
    document.documentElement.classList.toggle('dark', newTheme);

    // Save to localStorage
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <header className="h-16 bg-primary-light dark:bg-primary-dark px-4 flex items-center z-10 border-b border-stone-400 dark:border-white/20">
      <img src="/logo.png" alt="Logo" className="w-8 mr-4" />
      <span className="text-xl font-bold text-primary-gradient">Hakoverse</span>

      <button
        onClick={toggleTheme}
        className={`ml-auto p-2 transition 
          ${
            theme
              ? 'bg-gray-300 rounded-full text-gray-900'
              : 'bg-gray-900/20 rounded-full text-white'
          }`}
      >
        {theme ? <FaSun size={18} /> : <FaMoon size={18} />}
      </button>
    </header>
  );
}
