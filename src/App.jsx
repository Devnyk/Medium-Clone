import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import WritePage from "./pages/WritePostPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/layout/Navbar";
import axios from "axios";
import { Route, Routes } from "react-router";
import devProfilePic from "./assets/devmy.jpg";

const App = () => {
  const [posts, setPosts] = useState([]);

  const user = {
    name: "Debasish Nayak",
    dp: devProfilePic,
    bio: "Web developer and blogger.",
  };

  useEffect(() => {
    axios
      .get("https://dummyjson.com/posts")
      .then((res) => {
        const images = [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
          "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80",
        ];
        const postsWithImages = res.data.posts.map((post, idx) => ({
          ...post,
          image: images[idx % images.length],
        }));
        setPosts(postsWithImages);
      })
      .catch((err) => console.error(err));
  }, []);

  const addPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<HomePage posts={posts} />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/write" element={<WritePage addPost={addPost} />} />
        <Route
          path="/profile"
          element={
            <ProfilePage
              user={user}
              myPosts={posts.filter((p) => p.userId === "You")}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
