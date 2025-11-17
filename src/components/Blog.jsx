import React, { useEffect, useState, useRef } from "react";
import { subscribeBlogs } from "../services/blogService";
import BlogCard from "./BlogCard";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

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

  const sliderPosts = posts.slice(0, 7);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = 330;
    slider.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">

      {/* HEADER + ARROWS */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold dark:text-white">Blog</h1>

        <div className="flex gap-2">
          <button
            onClick={() => scrollSlider("left")}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 shadow"
          >
            ◀
          </button>

          <button
            onClick={() => scrollSlider("right")}
            className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 shadow"
          >
            ▶
          </button>
        </div>
      </div>

      {/* PREMIUM SLIDER */}
      <div
        ref={sliderRef}
        className="
          flex gap-6 overflow-x-auto pb-4 mt-4
          snap-x snap-mandatory scroll-smooth
          no-scrollbar
        "
      >
        {/* Blog cards */}
        {sliderPosts.map((p) => (
          <div key={p.id} className="snap-start shrink-0 w-[260px]">
            <BlogCard post={p} />
          </div>
        ))}

        {/* Show All Blogs Card */}
        {posts.length > 7 && (
          <div
            onClick={() => navigate("/blogs")}
            className="
              snap-start shrink-0 w-[260px] h-[220px]
              flex items-center justify-center cursor-pointer
              rounded-xl neon-glow
              bg-gradient-to-br from-fuchsia-700 via-purple-600 to-indigo-700
              text-white text-xl font-semibold
              hover:scale-105 transition-all duration-300
            "
          >
            Show All Blogs →
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
