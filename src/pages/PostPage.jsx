import { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    let found = null;
    if (window.posts) {
      found = window.posts.find((p) => String(p.id) === String(id));
    }
    if (found) {
      setPost(found);
    } else {
      import("axios").then(({ default: axios }) => {
        axios
          .get(`https://dummyjson.com/posts/${id}`)
          .then((res) => setPost(res.data))
          .catch(() => setPost(null));
      });
    }
  }, [id]);

  if (!post) return <p className="p-4">Loading...</p>;

  const defaultImage =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80";
  const image = post.image || defaultImage;

  const authorProfiles = {
    You: {
      name: "John Doe",
      dp: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  };
  const author = authorProfiles[post.userId] || {
    name: post.userId,
    dp: "https://randomuser.me/api/portraits/lego/1.jpg",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="rounded-2xl overflow-hidden border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-md">
        <img
          src={image}
          alt={post.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4">
            <img
              src={author.dp}
              alt={author.name}
              className="w-12 h-12 rounded-full border object-cover"
            />
            <div className="text-sm">
              <div className="font-semibold">{author.name}</div>
              <div className="text-gray-500 dark:text-gray-400">
                Post ID: {post.id}
              </div>
            </div>
          </div>

          <p className="mt-6 text-lg text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line">
            {post.body}
          </p>

          {post.tags?.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
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

          {typeof post.reactions === "number" && (
            <div className="mt-6">
              <span className="inline-block rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200 px-3 py-1 text-sm font-semibold">
                👍 {post.reactions} Reactions
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
