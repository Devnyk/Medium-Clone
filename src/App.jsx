import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import axios from "axios";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import WritePage from "./pages/WritePostPage";
import ProfilePage from "./pages/ProfilePage";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import { ThemeProvider } from "./context/ThemeContext";
import { BlogProvider } from "./context/BlogContext";

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
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80",
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80",
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1600&q=80",
          "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1600&q=80",
        ];
        const postsWithImages = res.data.posts.map((post, idx) => ({
          ...post,
          image: images[idx % images.length],
        }));
        setPosts(postsWithImages);
        window.posts = postsWithImages; // for PostPage fallback lookup
      })
      .catch((err) => console.error(err));
  }, []);

  const addPost = (post) => {
    setPosts((prev) => {
      const updated = [post, ...prev];
      window.posts = updated;
      return updated;
    });
  };

  return (
    <ThemeProvider>
      <BlogProvider>
        <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
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
          <Footer />
        </div>
      </BlogProvider>
    </ThemeProvider>
  );
};

export default App;
