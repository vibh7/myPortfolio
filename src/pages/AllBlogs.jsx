import React, { useEffect, useState } from "react";
import { subscribeBlogs } from "../services/blogService";
import BlogCard from "../components/BlogCard";

const AllBlogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = subscribeBlogs({
      callback: (items) => {
        const publishedPosts = items.filter((p) => p.published === true);
        setPosts(publishedPosts);
      },
      onlyPublished: true,
    });

    return () => unsub();
  }, []);

  return (
    <div className="pt-28 max-w-6xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">
        All Blogs
      </h1>

      {/* Tight, consistent grid */}
      <div
        className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          gap-5 
        "
      >
        {posts.map((p) => (
          <BlogCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
