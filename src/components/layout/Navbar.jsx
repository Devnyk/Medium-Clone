import { useState } from "react";
import { Link, useNavigate } from "react-router";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = ({ user }) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    setOpen(false);
    if (search.trim()) navigate(`/?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <nav className="sticky top-0 z-40 border-b bg-gradient-to-r from-blue-50 to-purple-100 backdrop-blur dark:from-gray-950 dark:to-gray-900 dark:text-gray-100 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Brand + Hamburger */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden inline-flex items-center justify-center rounded-lg border px-2 py-1 dark:border-gray-700"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            <span className="i">☰</span>
          </button>

          <Link
            to="/"
            className="font-extrabold text-xl tracking-wide text-blue-700 dark:text-purple-200"
            onClick={() => setOpen(false)}
          >
            Medium Clone
          </Link>
        </div>

        {/* Right (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              Search
            </button>
          </form>

          <Link
            to="/write"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded font-semibold transition-colors dark:bg-green-700 dark:hover:bg-green-800"
          >
            Write
          </Link>

          <ThemeToggle />

          <Link to="/profile" className="ml-1">
            <img
              src={user?.dp || "/images/default-avatar.png"}
              alt="Profile"
              className="w-9 h-9 rounded-full border object-cover shadow dark:border-purple-400"
            />
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t bg-white/80 backdrop-blur dark:bg-gray-900/80 dark:border-gray-800">
          <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search posts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-950 dark:text-gray-100 dark:border-gray-800"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded transition-colors"
              >
                Search
              </button>
            </form>

            <div className="flex items-center gap-3">
              <Link
                to="/write"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition-colors"
                onClick={() => setOpen(false)}
              >
                Write
              </Link>
              <ThemeToggle />
              <Link to="/profile" onClick={() => setOpen(false)}>
                <img
                  src={user?.dp || "/images/default-avatar.png"}
                  alt="Profile"
                  className="w-9 h-9 rounded-full border object-cover shadow dark:border-purple-400"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
