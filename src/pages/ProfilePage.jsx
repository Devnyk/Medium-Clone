import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/blog/BlogCard";
import profilePic from "../assets/devmy.jpg";

const ProfilePage = ({ user, myPosts = [] }) => {
  const { bookmarks = [] } = useContext(BlogContext);

  const profile =
    user && user.dp
      ? user
      : {
          name: "Debasish Nayak",
          dp: profilePic,
          bio: "Web developer and blogger.",
        };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Profile header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <img
          src={profile.dp}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border shadow"
        />
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600 dark:text-gray-400">{profile.bio}</p>
        </div>
      </div>

      {/* My posts */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">My Posts</h3>
        {myPosts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {myPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No posts yet.</p>
        )}
      </section>

      {/* Bookmarks */}
      <section>
        <h3 className="text-xl font-semibold mb-4">Bookmarked Posts</h3>
        {bookmarks.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {bookmarks.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No bookmarks yet.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
