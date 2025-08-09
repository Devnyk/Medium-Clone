// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = ({ user }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?q=${search}`);
    }
  };

  return (
    <nav className="px-6 py-4 shadow-md flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
      {/* Logo */}
      <div className="font-bold text-2xl text-blue-700 tracking-wide dark:text-purple-200">
        <Link to="/">Medium Clone</Link>
      </div>

      {/* Search + Actions */}
      <div className="flex gap-6 items-center">
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search posts..."
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

        {/* Write Button */}
        <Link
          to="/write"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded font-semibold transition-colors dark:bg-green-700 dark:hover:bg-green-800"
        >
          Write
        </Link>

        {/* Theme Toggle Button */}
        <div className="ml-2">
          <ThemeToggle />
        </div>

        {/* Profile Avatar */}
        <Link to="/profile" className="ml-2">
          <img
            src={user?.dp || "/images/default-avatar.png"}
            alt="Profile"
            className="w-10 h-10 rounded-full border object-cover shadow dark:border-purple-400"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
