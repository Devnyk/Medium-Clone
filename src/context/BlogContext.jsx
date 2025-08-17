import { createContext, useState, useEffect } from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const stored = localStorage.getItem("bookmarks");
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed) ? parsed.filter((b) => b && typeof b === "object" && "id" in b) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (post) => {
    setBookmarks((prev) => {
      const validPrev = prev.filter((b) => b && typeof b === "object" && "id" in b);
      const isBookmarked = validPrev.some((b) => b.id === post.id);
      return isBookmarked
        ? validPrev.filter((b) => b.id !== post.id)
        : [post, ...validPrev];
    });
  };

  return (
    <BlogContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BlogContext.Provider>
  );
};
