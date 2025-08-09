// WritePage.jsx
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
      id: Date.now(), // local unique ID
      title,
      body,
      image: image || "https://via.placeholder.com/600x300",
      userId: "You",
      date: new Date().toLocaleDateString()
    };

    addPost(newPost);
    navigate("/profile");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Write a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Write your content here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border rounded p-2 h-40"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default WritePage;
