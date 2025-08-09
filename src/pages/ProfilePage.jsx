// pages/ProfilePage.jsx
import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import profilePic from "../assets/devmy.jpg"; // your profile image

const ProfilePage = ({ user, myPosts = [] }) => {
  const { bookmarks = [] } = useContext(BlogContext);

  // Always use fallback if no dp
  const profile = user && user.dp ? user : {
    name: "Debasish Nayak",
    dp: profilePic,
    bio: "Web developer and blogger.",
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white dark:bg-gray-900 dark:text-gray-100">
      {/* Profile Info */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={profile.dp}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{profile.bio}</p>
        </div>
      </div>

      {/* My Posts */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">My Posts</h3>
        {myPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </section>

      {/* Bookmarks */}
      <section>
        <h3 className="text-xl font-semibold mb-2">Bookmarked Posts</h3>
        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarks.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No bookmarks yet.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
