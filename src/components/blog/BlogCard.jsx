import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";
import { Link } from "react-router";

const BlogCard = ({ post }) => {
  const { bookmarks, toggleBookmark } = useContext(BlogContext);
  const isBookmarked = bookmarks.some((b) => b.id === post.id);

  const defaultImage =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
  const image = post.image || defaultImage;
  const excerpt =
    post.excerpt || post.body?.slice(0, 150) || "No excerpt available.";
  const author = post.userId || "Unknown";

  return (
    <article className="group relative rounded-2xl border bg-white/70 backdrop-blur dark:bg-gray-900/60 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition">
      {/* Bookmark */}
      <button
        onClick={() => toggleBookmark(post)}
        className="absolute top-3 right-3 text-xl"
        title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
      >
        {isBookmarked ? "🔖" : "📑"}
      </button>

      <Link to={`/post/${post.id}`} className="block">
        {/* ⬆️ Increased image height on mobile */}
        <div className="w-full h-56 sm:h-52 md:h-48 overflow-hidden">
          <img
            src={image}
            alt={post.title}
            className="h-full w-full object-cover group-hover:scale-105 transition"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/post/${post.id}`}>
          <h2 className="text-xl font-semibold leading-snug group-hover:text-blue-600 transition">
            {post.title}
          </h2>
        </Link>

        <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-3">
          {excerpt}...
        </p>

        {/* Tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Author: {author}
          </span>
          {typeof post.reactions === "number" && (
            <span className="inline-block rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200 px-2 py-0.5">
              👍 {post.reactions}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
