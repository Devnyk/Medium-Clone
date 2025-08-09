import { useLocation } from "react-router";
import BlogList from "../components/blog/BlogList";
import { useState } from "react";
import BlogCard from "../components/blog/BlogCard";

const HomePage = ({ posts }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q");

  const [layout, setLayout] = useState("grid"); // grid or list

  // Collect all tags from posts
  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags || [])));
  const [selectedTag, setSelectedTag] = useState("");

  let filteredPosts = posts;
  if (searchTerm) {
    filteredPosts = filteredPosts.filter((p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  if (selectedTag) {
    filteredPosts = filteredPosts.filter((p) =>
      (p.tags || []).includes(selectedTag)
    );
  }

  // Featured post (latest)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const otherPosts = featuredPost ? filteredPosts.slice(1) : [];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 dark:text-gray-100">
      {/* Layout Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Latest Posts</h1>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded ${
              layout === "grid" ? "bg-blue-500 text-white dark:bg-blue-500 dark:text-white"
            : "bg-black text-white dark:bg-gray-200 dark:text-gray-900"
            }`}
            onClick={() => setLayout("grid")}
          >
            Grid
          </button>
          <button
            className={`px-3 py-1 rounded ${
              layout === "list" ? "bg-blue-500 text-white dark:bg-blue-500 dark:text-white"
            : "bg-black text-white dark:bg-gray-200 dark:text-gray-900"
            }`}
            onClick={() => setLayout("list")}
          >
            List
          </button>
        </div>
      </div>

      {/* Tags List */}
      {allTags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="font-semibold">Tags:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`px-2 py-1 rounded text-xs ${
                selectedTag === tag
                  ? "bg-purple-500 text-white"
                  : "bg-purple-100 text-purple-800"
              }`}
              onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Featured Post */}
      {featuredPost && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2 text-blue-700">
            Featured Post
          </h2>
          <BlogCard post={featuredPost} />
        </div>
      )}

      {/* Posts List/Grid */}
      {otherPosts.length > 0 ? (
        <div
          className={
            layout === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 gap-4"
              : "flex flex-col gap-4"
          }
        >
          {otherPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default HomePage;
