import BlogCard from "./BlogCard";

const BlogList = ({ posts }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Latest Posts</h1>
      {posts?.length > 0 ? (
        posts.map((post) => <BlogCard key={post.id} post={post} />)
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
};

export default BlogList;
