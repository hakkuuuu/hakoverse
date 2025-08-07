import NavBar from './components/NavBar';
import Sidebar from './components/SideBar';
import Home from './components/Home';

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <Home />
        </main>
      </div>
    </div>
  );
}
