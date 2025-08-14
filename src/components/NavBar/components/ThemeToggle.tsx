import { FiSun, FiMoon } from 'react-icons/fi';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const ThemeToggle = ({ isDark, onToggle }: ThemeToggleProps) => (
  <button
    onClick={onToggle}
    className={`p-3 rounded-full transition-colors duration-300 ${
      isDark
        ? 'text-neutral-200 hover:bg-neutral-700'
        : 'text-neutral-700 hover:bg-neutral-200'
    }`}
  >
    {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
  </button>
);
