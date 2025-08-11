import { Routes, Route, Outlet } from 'react-router';
import NavBar from './components/NavBar';
import Sidebar from './components/SideBar';
import Home from './pages/Home';
import Popular from './pages/Popular';

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          {/* This is where nested routes render */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="popular" element={<Popular />} />
      </Route>
    </Routes>
  );
}
