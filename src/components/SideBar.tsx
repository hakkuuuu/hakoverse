import { useEffect, useState } from 'react';
import {
  FiSettings,
  FiSearch,
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiHome,
  FiTrendingUp,
  FiUsers,
  FiGlobe,
} from 'react-icons/fi';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router';

const SideBar = () => {
  const location = useLocation();
  const [recentExpanded, setRecentExpanded] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('recentExpanded') || 'false');
  });
  const [communityExpanded, setCommunityExpanded] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('communityExpanded') || 'true');
  });

  useEffect(() => {
    localStorage.setItem('recentExpanded', JSON.stringify(recentExpanded));
    localStorage.setItem(
      'communityExpanded',
      JSON.stringify(communityExpanded)
    );
  }, [recentExpanded, communityExpanded]);

  const navItems = [
    { label: 'Home', icon: <FiHome size={20} />, href: '/' },
    { label: 'Popular', icon: <FiTrendingUp size={20} />, href: '/popular' },
    { label: 'Answers', icon: <FiUsers size={20} />, href: '/answers' },
    { label: 'Explore', icon: <FiSearch size={20} />, href: '/explore' },
    { label: 'All', icon: <FiGlobe size={20} />, href: '/all' },
  ];

  return (
    <aside className="bg-primary-light dark:bg-primary-dark text-neutral-700 dark:text-primary-light w-64 h-screen hidden md:block border-r border-neutral-400 dark:border-white/20 overflow-y-auto">
      <nav className="p-4">
        <ul>
          {navItems.map(({ label, icon, href }) => {
            const isActive =
              location.pathname === href ||
              (href === '/' && location.pathname === '/');
            return (
              <li key={label} className="my-2">
                <Link
                  to={href}
                  className={clsx(
                    'flex items-center gap-3 p-3 rounded transition',
                    isActive
                      ? 'bg-primary-gradient text-primary-light font-semibold'
                      : 'hover:bg-neutral-200 dark:hover:bg-white/10'
                  )}
                >
                  {icon}
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Recent */}
        <div>
          <button
            onClick={() => setRecentExpanded(!recentExpanded)}
            className="flex justify-between items-center w-full mt-6 mb-2 text-xs font-semibold tracking-widest uppercase"
          >
            Recent {recentExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {recentExpanded && (
            <ul className="ml-2">
              <li className="text-neutral-400 dark:text-neutral-600 text-sm p-4">
                No recent items
              </li>
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
            {communityExpanded ? <FiChevronUp /> : <FiChevronDown />}
          </button>
          {communityExpanded && (
            <ul className="ml-2">
              <li className="my-2">
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded hover:bg-neutral-200 dark:hover:bg-white/10 transition"
                >
                  <FiPlus /> Create Community
                </a>
              </li>
              <li className="my-2">
                <a
                  href="#"
                  className="flex items-center gap-3 p-3 rounded hover:bg-neutral-200 dark:hover:bg-white/10 transition"
                >
                  <FiSettings /> Manage Communities
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
