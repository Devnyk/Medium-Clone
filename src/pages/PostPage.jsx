// src/pages/PostPage.jsx
import React, { useEffect, useState } from "react";

import { useParams } from "react-router";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Try to find post from window.posts (if available), else fetch from API
    let found = null;
    if (window.posts) {
      found = window.posts.find((p) => String(p.id) === String(id));
    }
    if (found) {
      setPost(found);
    } else {
      // fallback: fetch from API
      import("axios").then(({ default: axios }) => {
        axios
          .get(`https://dummyjson.com/posts/${id}`)
          .then((res) => setPost(res.data))
          .catch(() => setPost(null));
      });
    }
  }, [id]);

  if (!post) {
    return <p className="p-4">Loading...</p>;
  }

  // Decorative fallback image
  const defaultImage =
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80";
  const image = post.image || defaultImage;

  // Author info (demo)
  const authorProfiles = {
    You: {
      name: "John Doe",
      dp: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    // Add more demo authors if needed
  };
  const author = authorProfiles[post.userId] || {
    name: post.userId,
    dp: defaultImage,
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100 m-10">
      <img
        src={image}
        alt={post.title}
        className="w-full h-64 object-cover rounded mb-6 border"
      />
      <h1 className="text-4xl font-extrabold mb-4 text-blue-700">
        {post.title}
      </h1>
      <div className="flex items-center gap-4 mb-4">
        <img
          src={author.dp}
          alt={author.name}
          className="w-12 h-12 rounded-full border object-cover"
        />
        <span className="font-semibold text-lg text-gray-800">
          {author.name}
        </span>
        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
          Post ID: {post.id}
        </span>
      </div>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">{post.body}</p>
      {post.tags && post.tags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-md font-bold mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
      {typeof post.reactions === "number" && (
        <div className="mt-4">
          <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
            👍 {post.reactions} Reactions
          </span>
        </div>
      )}
    </div>
  );
};

export default PostPage;
