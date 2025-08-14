// import { useEffect, useState } from 'react';
// import {
//   FiSun,
//   FiMoon,
//   FiUser,
//   FiSearch,
//   FiMenu,
//   FiX,
//   FiLogOut,
// } from 'react-icons/fi';
// import { useAuth } from '../../../context/AuthContext';

// export default function NavBar() {
//   const [theme, setTheme] = useState(false);
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const { user, signIn, signOut } = useAuth();

//   // Load theme from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     const isDark = savedTheme === 'dark';
//     setTheme(isDark);
//     document.documentElement.classList.toggle('dark', isDark);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = !theme;
//     setTheme(newTheme);
//     document.documentElement.classList.toggle('dark', newTheme);
//     localStorage.setItem('theme', newTheme ? 'dark' : 'light');
//   };

//   const handleSignOut = async () => {
//     await signOut();
//     setDrawerOpen(false);
//   };

//   const ProfileSection = () => (
//     <div className="relative group">
//       <button className="flex items-center gap-2">
//         <div className="w-8 h-8 rounded-full overflow-hidden">
//           {user?.user_metadata?.avatar_url ? (
//             <img
//               src={user.user_metadata.avatar_url}
//               alt="Profile"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="w-full h-full bg-primary-gradient flex items-center justify-center text-white">
//               {user?.email?.[0]?.toUpperCase() || 'U'}
//             </div>
//           )}
//         </div>
//         <span className="hidden lg:block text-primary-dark dark:text-primary-light">
//           {user?.user_metadata?.name || 'Profile'}
//         </span>
//       </button>

//       {/* Dropdown Menu */}
//       <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-primary-dark rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//         <button
//           onClick={handleSignOut}
//           className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
//         >
//           <FiLogOut size={16} />
//           Sign Out
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <header className="h-14 bg-primary-light dark:bg-primary-dark px-4 flex items-center justify-between z-20 border-b border-stone-400 dark:border-white/20 relative">
//       {/* Left - Logo */}
//       <div className="flex items-center gap-3">
//         {/* Mobile menu button */}
//         <button
//           className="lg:hidden p-2 rounded-lg text-primary-dark dark:text-primary-light hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
//           onClick={() => setDrawerOpen(true)}
//         >
//           <FiMenu size={20} />
//         </button>

//         <img src="/logo.png" alt="Logo" className="w-8" />
//         <span className="text-xl font-bold text-primary-gradient">
//           Hakoverse
//         </span>
//       </div>

//       {/* Center - Search Bar (hidden on mobile) */}
//       <div className="flex-1 justify-center px-4 hidden lg:flex">
//         <div className="relative w-full max-w-lg">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="
//               w-full px-4 py-2 pl-10 rounded-2xl
//               bg-neutral-300/10 dark:bg-neutral-900
//               text-neutral-700 dark:text-neutral-200
//               border border-neutral-300 dark:border-neutral-700
//               focus:outline-none focus:ring-2 focus:ring-primary-gradient
//               transition
//             "
//           />
//           <FiSearch
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
//             size={14}
//           />
//         </div>
//       </div>

//       {/* Right - Login + Theme Button */}
//       <div className="flex items-center gap-4">
//         {user ? (
//           <ProfileSection />
//         ) : (
//           <button
//             onClick={signIn}
//             className="hidden lg:block text-primary-light"
//           >
//             <span
//               className="
//               flex flex-row items-center gap-2 px-5 py-2 rounded-lg 
//               bg-primary-gradient 
//               hover:opacity-90 transition
//             "
//             >
//               Login <FiUser size={16} />
//             </span>
//           </button>
//         )}

//         <button
//           onClick={toggleTheme}
//           className={`
//             p-3 rounded-full transition-colors duration-300 
//             ${
//               theme
//                 ? 'text-neutral-200 hover:bg-neutral-700'
//                 : 'text-neutral-700 hover:bg-neutral-200'
//             }
//           `}
//         >
//           {theme ? <FiSun size={18} /> : <FiMoon size={18} />}
//         </button>
//       </div>

//       {/* Mobile Drawer */}
//       <div
//         className={`fixed inset-0 z-30 bg-primary-dark backdrop-blur-sm transition-opacity duration-300 ${
//           drawerOpen
//             ? 'opacity-100 pointer-events-auto'
//             : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={() => setDrawerOpen(false)}
//       />
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-primary-light dark:bg-primary-dark shadow-lg z-40 transform transition-transform duration-300 ${
//           drawerOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         {/* Drawer header */}
//         <div className="flex items-center justify-between p-4 border-b border-neutral-300 dark:border-neutral-700">
//           <div className="flex items-center gap-3">
//             <img src="/logo.png" alt="Logo" className="w-8" />
//             <span className="text-xl font-bold text-primary-gradient">
//               Hakoverse
//             </span>
//           </div>

//           <button
//             onClick={() => setDrawerOpen(false)}
//             className="text-primary-dark dark:text-primary-light"
//           >
//             <FiX size={20} />
//           </button>
//         </div>

//         {/* Search in drawer */}
//         <div className="p-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="
//                 w-full px-4 py-2 pl-10 rounded-2xl
//                 bg-neutral-300/10 dark:bg-neutral-900
//                 text-neutral-700 dark:text-neutral-200
//                 border border-neutral-300 dark:border-neutral-700
//                 focus:outline-none focus:ring-2 focus:ring-primary-gradient
//                 transition
//               "
//             />
//             <FiSearch
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
//               size={14}
//             />
//           </div>
//         </div>

//         {/* Login/Profile button in drawer */}
//         <div className="p-4">
//           {user ? (
//             <div className="space-y-2">
//               <div className="flex items-center gap-3 px-4 py-2">
//                 <div className="w-10 h-10 rounded-full overflow-hidden">
//                   {user?.user_metadata?.avatar_url ? (
//                     <img
//                       src={user.user_metadata.avatar_url}
//                       alt="Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-primary-gradient flex items-center justify-center text-white">
//                       {user?.email?.[0]?.toUpperCase() || 'U'}
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex-1">
//                   <p className="font-medium text-primary-dark dark:text-primary-light">
//                     {user?.user_metadata?.name || 'User'}
//                   </p>
//                   <p className="text-sm text-neutral-500 dark:text-neutral-400">
//                     {user?.email}
//                   </p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleSignOut}
//                 className="w-full px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-2"
//               >
//                 <FiLogOut size={16} />
//                 Sign Out
//               </button>
//             </div>
//           ) : (
//             <button onClick={signIn} className="w-full text-primary-light">
//               <span
//                 className="
//                 flex justify-center items-center gap-2 px-5 py-2 rounded-lg 
//                 bg-primary-gradient 
//                 hover:opacity-90 transition
//               "
//               >
//                 Login <FiUser size={16} />
//               </span>
//             </button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
