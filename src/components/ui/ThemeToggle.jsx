import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      className={`px-3 py-1 rounded transition-colors duration-200 border ${
        theme === "dark"
          ? "bg-gray-800 text-white border-gray-600"
          : "bg-gray-100 text-gray-800 border-gray-300"
      }`}
      title="Toggle theme"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
