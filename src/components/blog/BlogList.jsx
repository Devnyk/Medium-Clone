import BlogCard from "./BlogCard";

const BlogList = ({ posts = [] }) => {
  if (!posts.length) {
    return <p className="text-gray-500 dark:text-gray-400">No posts available.</p>;
  }

  return (
    // ⬆️ Changed to start with 2 columns on mobile instead of 1
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
