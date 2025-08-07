import Home from './components/Home';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <div className="flex h-screen">
      <NavBar /> {/* contains <aside> with fixed width */}
      <main className="flex-1 overflow-y-auto">
        <Home /> {/* actual page content */}
      </main>
    </div>
  );
}
