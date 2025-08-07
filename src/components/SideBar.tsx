// components/SideBar.tsx
import { useEffect, useState } from 'react';
import {
  FaCog,
  FaSearch,
  FaPlus,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { FaHouse, FaChartSimple, FaUsers } from 'react-icons/fa6';
import clsx from 'clsx';
import { useLocation } from 'react-router';

const SideBar = () => {
  const location = useLocation();
  const [customExpanded, setCustomExpanded] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('customExpanded') || 'true');
  });
  const [recentExpanded, setRecentExpanded] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('recentExpanded') || 'false');
  });
  const [communityExpanded, setCommunityExpanded] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('communityExpanded') || 'true');
  });

  useEffect(() => {
    localStorage.setItem('customExpanded', JSON.stringify(customExpanded));
    localStorage.setItem('recentExpanded', JSON.stringify(recentExpanded));
    localStorage.setItem(
      'communityExpanded',
      JSON.stringify(communityExpanded)
    );
  }, [customExpanded, recentExpanded, communityExpanded]);

  const navItems = [
    { label: 'Home', icon: <FaHouse size={20} />, href: '/' },
    { label: 'Popular', icon: <FaChartSimple size={20} />, href: '/popular' },
    { label: 'Answers', icon: <FaUsers size={20} />, href: '/answers' },
    { label: 'Explore', icon: <FaSearch size={20} />, href: '/explore' },
    { label: 'All', icon: <FaChartSimple size={20} />, href: '/all' },
  ];

  return (
    <aside className="bg-primary-light dark:bg-primary-dark text-stone-700 dark:text-white w-64 h-screen hidden md:block border-r border-stone-400 dark:border-white/20 overflow-y-auto">
      <nav className="p-4">
        <ul>
          {navItems.map(({ label, icon, href }) => {
            const isActive = location.pathname === href;
            return (
              <li key={label} className="my-2">
                <a
                  href={href}
                  className={clsx(
                    'flex items-center gap-3 p-3 rounded transition',
                    isActive
                      ? 'bg-primary-gradient text-white font-semibold'
                      : 'hover:bg-stone-200 dark:hover:bg-white/10'
                  )}
                >
                  {icon}
                  <span>{label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Custom Feeds */}
        <div>
          <button
            onClick={() => setCustomExpanded(!customExpanded)}
            className="flex justify-between items-center w-full mt-6 mb-2 text-xs font-semibold tracking-widest uppercase"
          >
            Custom Feeds {customExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {customExpanded && (
            <ul className="ml-2">
              <li className="my-2">
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded hover:bg-stone-200 dark:hover:bg-white/10 transition"
                >
                  <FaPlus /> Create Custom Feed
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* Recent */}
        <div>
          <button
            onClick={() => setRecentExpanded(!recentExpanded)}
            className="flex justify-between items-center w-full mt-6 mb-2 text-xs font-semibold tracking-widest uppercase"
          >
            Recent {recentExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {recentExpanded && (
            <ul className="ml-2">
              {/* Placeholder for recent items */}
              <li className="text-stone-500 text-sm italic">No recent items</li>
            </ul>
          )}
        </div>

        {/* Communities */}
        <div>
          <button
            onClick={() => setCommunityExpanded(!communityExpanded)}
            className="flex justify-between items-center w-full mt-6 mb-2 text-xs font-semibold tracking-widest uppercase"
          >
            Communities{' '}
            {communityExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {communityExpanded && (
            <ul className="ml-2">
              <li className="my-2">
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded hover:bg-stone-200 dark:hover:bg-white/10 transition"
                >
                  <FaPlus /> Create Community
                </a>
              </li>
              <li className="my-2">
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded hover:bg-stone-200 dark:hover:bg-white/10 transition"
                >
                  <FaCog /> Manage Communities
                </a>
              </li>
              <li className="my-2">
                <a
                  href="/r/frontend"
                  className="flex items-center gap-3 p-3 rounded hover:bg-stone-200 dark:hover:bg-white/10 transition"
                >
                  <img
                    src="/icons/frontend.png"
                    className="w-5 h-5 rounded-full"
                  />{' '}
                  r/Frontend
                </a>
              </li>
              <li className="my-2">
                <a
                  href="/r/laravel"
                  className="flex items-center gap-3 p-3 rounded hover:bg-stone-200 dark:hover:bg-white/10 transition"
                >
                  <img
                    src="/icons/laravel.png"
                    className="w-5 h-5 rounded-full"
                  />{' '}
                  r/laravel
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
