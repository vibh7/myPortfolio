// src/pages/BlogPage.jsx
import React, { useEffect, useState } from "react";
import { listPublishedBlogs } from "../services/blogService";
import BlogCard from "../components/BlogCard";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
      const b = await listPublishedBlogs({ limitTo: 50 });
      setPosts(b);
    })();
  }, []);

  return (
    <div className="py-12 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6 dark:text-white">Blog</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((p) => <BlogCard key={p.id} blog={p} />)}
      </div>
    </div>
  );
};

export default BlogPage;
