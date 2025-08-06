import { useTheme } from '../context/ThemeContext';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 mt-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:opacity-90 transition-all"
    >
      Switch to {theme === 'dark' ? 'light' : 'dark'} mode
    </button>
  );
};

export default ThemeToggleButton;
