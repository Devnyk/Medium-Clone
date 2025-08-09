import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";
import { Link } from "react-router";

const BlogCard = ({ post }) => {
  const { bookmarks, toggleBookmark } = useContext(BlogContext);
  const isBookmarked = bookmarks.some((b) => b.id === post.id);

  // Fallbacks for missing fields
  const defaultImage =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80";
  const image = post.image || defaultImage;
  const excerpt =
    post.excerpt || post.body?.slice(0, 120) || "No excerpt available.";
  const author = post.userId || "Unknown";

  return (
    <div className="border rounded-lg p-4 mb-4 relative">
      {/* Bookmark Button */}
      <button
        onClick={() => toggleBookmark(post)}
        className="absolute top-2 right-2 text-xl"
        title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
      >
        {isBookmarked ? "🔖" : "📑"}
      </button>

      <img
        src={image}
        alt={post.title}
        className="w-full h-48 object-cover rounded mb-3"
      />

      <Link to={`/post/${post.id}`}>
        <h2 className="text-xl font-semibold hover:text-blue-600">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600">{excerpt}...</p>
      <p className="text-sm text-gray-500 mt-2">Author: {author}</p>
    </div>
  );
};

export default BlogCard;
