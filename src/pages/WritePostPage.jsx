import { useState } from "react";
import { useNavigate } from "react-router";

const WritePage = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      title,
      body,
      image: image || "https://via.placeholder.com/1200x600",
      userId: "You",
      date: new Date().toISOString(),
      tags: [],
      reactions: 0,
    };
    addPost(newPost);
    navigate("/profile");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Write a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-3 dark:bg-gray-900 dark:border-gray-800"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded p-3 dark:bg-gray-900 dark:border-gray-800"
        />
        <textarea
          placeholder="Write your content here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border rounded p-3 h-52 dark:bg-gray-900 dark:border-gray-800"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default WritePage;
