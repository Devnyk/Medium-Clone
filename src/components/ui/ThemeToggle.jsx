import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={toggleTheme}
      className={`px-3 py-1 rounded transition-colors border text-sm ${
        theme === "dark"
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-gray-100 text-gray-800 border-gray-300"
      }`}
      title="Toggle theme"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
