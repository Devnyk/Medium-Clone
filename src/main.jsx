import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { BlogProvider } from "./context/BlogContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BlogProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <App />
        </div>
      </BrowserRouter>
    </BlogProvider>
  </ThemeProvider>
);
