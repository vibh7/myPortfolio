import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogBySlug } from "../services/blogService";
import { generateGradient } from "../utils/gradient";
const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await getBlogBySlug(slug);
      setPost(data);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (loading) {
    return <div className="pt-24 text-center text-xl">Loading…</div>;
  }

  if (!post) {
    return (
      <div className="pt-24 text-center text-xl text-red-500">
        Blog not found
      </div>
    );
  }

  return (
    <div className="pt-24 max-w-4xl mx-auto dark:text-white px-4">

      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-72 object-cover rounded-xl mb-6"
        />
      ) : (
        <div
          className="w-full h-72 rounded-xl mb-6 flex items-center justify-center neon-card"
          style={{ background: generateGradient(post.slug || post.title) }}
        >

          <h1 className="text-white text-4xl font-bold px-4 text-center drop-shadow">
            {post.title}
          </h1>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <p className="text-gray-500 dark:text-gray-300 mb-6">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>

      {/* Render HTML from Tiptap */}
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default BlogDetail;
