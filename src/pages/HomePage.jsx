import { useLocation, Link } from "react-router";
import { useMemo, useState } from "react";
import BlogCard from "../components/blog/BlogCard";

const HomePage = ({ posts = [] }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q") || "";

  const [layout, setLayout] = useState("grid"); // "grid" | "list"
  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags || []))),
    [posts]
  );
  const [selectedTag, setSelectedTag] = useState("");

  const filteredPosts = useMemo(() => {
    let fp = posts;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      fp = fp.filter((p) => p.title.toLowerCase().includes(q));
    }
    if (selectedTag) {
      fp = fp.filter((p) => (p.tags || []).includes(selectedTag));
    }
    return fp;
  }, [posts, searchTerm, selectedTag]);

  const featuredPost = filteredPosts[0] || null;
  const otherPosts = featuredPost ? filteredPosts.slice(1) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Controls */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold">Latest Posts</h1>
        <div className="flex items-center gap-2">
          <button
            className={`px-3 py-1 rounded ${
              layout === "grid"
                ? "bg-blue-500 text-white"
                : "bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900"
            }`}
            onClick={() => setLayout("grid")}
          >
            Grid
          </button>
          <button
            className={`px-3 py-1 rounded ${
              layout === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900"
            }`}
            onClick={() => setLayout("list")}
          >
            List
          </button>
        </div>
      </div>

      {/* Tags filter */}
      {allTags.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="font-semibold">Tags:</span>
          <button
            className={`px-2 py-1 rounded text-xs ${
              !selectedTag
                ? "bg-purple-600 text-white"
                : "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200"
            }`}
            onClick={() => setSelectedTag("")}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`px-2 py-1 rounded text-xs ${
                selectedTag === tag
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200"
              }`}
              onClick={() =>
                setSelectedTag((t) => (t === tag ? "" : tag))
              }
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Featured banner */}
      {featuredPost && (
        <div className="mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-stretch rounded-2xl overflow-hidden border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-md">
            {/* Image */}
            <Link to={`/post/${featuredPost.id}`} className="md:w-1/2">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-64 md:h-full object-cover"
                loading="lazy"
              />
            </Link>

            {/* Info */}
            <div className="p-6 flex flex-col justify-between md:w-1/2">
              <div>
                <Link to={`/post/${featuredPost.id}`}>
                  <h3 className="text-3xl font-extrabold leading-tight hover:text-blue-600 transition">
                    {featuredPost.title}
                  </h3>
                </Link>
                <p className="mt-3 text-gray-700 dark:text-gray-300">
                  {(featuredPost.excerpt ||
                    featuredPost.body?.slice(0, 180) ||
                    "No excerpt available.") + "..."}
                </p>

                {Array.isArray(featuredPost.tags) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Author: {featuredPost.userId || "Unknown"}
                </span>
                <Link
                  to={`/post/${featuredPost.id}`}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other posts */}
      {otherPosts.length ? (
        layout === "grid" ? (
          // ⬆️ grid starts with 2 columns on mobile
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {otherPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No posts available.</p>
      )}
    </div>
  );
};

export default HomePage;
