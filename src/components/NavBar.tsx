import { FaSun, FaMoon, FaCog, FaSearch } from 'react-icons/fa';
import { FaHouse } from 'react-icons/fa6';

export default function NavBar() {
  const navItems = [
    { label: 'Home', icon: <FaHouse size={26} />, href: '/' },
    { label: 'Search', icon: <FaSearch size={26} />, href: '/search' },
    { label: 'Settings', icon: <FaCog size={26} />, href: '/settings' },
  ];

  return (
    <aside className="dark bg-primary-light dark:bg-primary-dark hidden md:block w-64 text-white border-r border-white/10 dark:border-white/20 h-screen">
      <div className="p-4">
        <div className="flex items-center mt-6 mb-12">
          <img src="/logo.png" alt="Logo" className="w-6 mr-2" />
          <span className="text-xl font-medium">Hakoverse</span>
        </div>

        <nav>
          <ul>
            {navItems.map(({ label, icon, href }, i) => (
              <li key={i} className="my-6">
                <a
                  href={href}
                  className="flex items-center gap-4 px-2 py-1 rounded hover:bg-gray-700 transition"
                >
                  {icon}
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button></button>
      </div>
    </aside>
  );
}
