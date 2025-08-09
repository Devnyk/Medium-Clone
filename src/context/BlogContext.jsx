import { createContext, useState, useEffect } from "react";

export const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState(() => {
    const stored = localStorage.getItem("bookmarks");
    let parsed = stored ? JSON.parse(stored) : [];
    if (Array.isArray(parsed)) {
      parsed = parsed.filter(
        (b) => typeof b === "object" && b !== null && "id" in b
      );
    }
    return parsed;
  });

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (post) => {
    setBookmarks((prev) => {
      const validPrev = prev.filter(
        (b) => typeof b === "object" && b !== null && "id" in b
      );
      const isBookmarked = validPrev.find((b) => b.id === post.id);
      return isBookmarked
        ? validPrev.filter((b) => b.id !== post.id)
        : [...validPrev, post];
    });
  };

  return (
    <BlogContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BlogContext.Provider>
  );
};
