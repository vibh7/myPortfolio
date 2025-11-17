import React from "react";
import { useNavigate } from "react-router-dom";

import { generateGradient } from "../utils/gradient";

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  const goToBlog = () => {
    navigate(`/blog/${post.slug || post.id}`);
  };

  const bgStyle = post.imageUrl
    ? {
        backgroundImage: `url(${post.imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { background: generateGradient() };

  return (
    <div
      onClick={goToBlog}
      className="
        cursor-pointer 
        group 
        relative 
        rounded-xl 
        overflow-hidden 
        p-[2px] 
        transition 
        hover:scale-[1.02] 
        neon-glow
      "
    >
      {/* Neon border */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-60 blur-lg group-hover:opacity-90 transition"></div>

      {/* Inner content */}
      <div
        className="
          relative 
          rounded-xl 
          bg-gray-900/90 
          dark:bg-gray-900/90 
          p-4 
          min-h-[220px]
          flex 
          flex-col
          justify-between
        "
        style={bgStyle}
      >
        <div>
          <h3 className="text-xl font-bold text-white drop-shadow">
            {post.title}
          </h3>

          <p className="text-gray-300 mt-2 line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <button className="mt-4 text-sm font-semibold text-pink-400 group-hover:text-pink-300">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
