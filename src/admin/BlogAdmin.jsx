import React, { useEffect, useState, useRef } from "react";
import {
  createBlog,
  updateBlog,
  deleteBlog,
  getBlog,
  subscribeBlogs,
} from "../services/blogService";

import { signOutAdmin } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../services/firebaseConfig";
import TiptapEditor from "../components/TiptapEditor";

// Generate URL-friendly slug
const makeSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const BlogAdmin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    published: false,
    imageFile: null,

    slug: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });

  // Load blogs only after auth ready
  useEffect(() => {
    if (loading) return;

    if (!user || user.email !== import.meta.env.VITE_ADMIN_EMAIL) {
      navigate("/admin/login");
      return;
    }

    const unsub = subscribeBlogs({
      callback: (items) => setPosts(items),
      onlyPublished: false,
    });

    return () => unsub();
  }, [loading, user]);

  const handleLogout = async () => {
    await signOutAdmin();
    navigate("/");
  };

  // Reset form after save / clear
  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      excerpt: "",
      content: "",
      published: false,
      imageFile: null,
      slug: "",
      seoTitle: "",
      seoDescription: "",
      seoKeywords: "",
    });

    if (fileRef.current) fileRef.current.value = "";
  };

  // Edit mode: load blog data
  const startEdit = async (id) => {
    const b = await getBlog(id);

    setEditingId(id);
    setForm({
      title: b.title || "",
      excerpt: b.excerpt || "",
      content: b.content || "",
      published: b.published ?? false,

      slug: b.slug || "",
      seoTitle: b.seoTitle || "",
      seoDescription: b.seoDescription || "",
      seoKeywords: b.seoKeywords || "",

      imageFile: null,
    });

    if (fileRef.current) fileRef.current.value = "";
  };

  // Save (create or update)
  const handleSave = async () => {
    if (!form.title.trim()) return alert("Title is required");

    setLoadingSave(true);

    try {
      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        published: form.published,
        imageFile: form.imageFile,

        slug: form.slug || makeSlug(form.title),
        seoTitle: form.seoTitle || form.title,
        seoDescription: form.seoDescription || form.excerpt,
        seoKeywords: form.seoKeywords,
      };

      if (editingId) {
        await updateBlog(editingId, payload);
      } else {
        await createBlog(payload);
      }

      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save blog");
    }

    setLoadingSave(false);
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;
    await deleteBlog(id);
  };

  return (
    <div className="pt-24 p-6 max-w-6xl mx-auto dark:text-white">
      <button
        onClick={handleLogout}
        className="mb-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>

      {/* FORM */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Blog" : "Add New Blog"}
        </h2>

        <input
          placeholder="Title"
          className="w-full p-3 rounded mb-3 bg-gray-100 dark:bg-gray-900"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value, slug: makeSlug(e.target.value) })
          }
        />

        <input
          placeholder="Slug (auto)"
          className="w-full p-3 rounded mb-3 bg-gray-100 dark:bg-gray-900"
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: makeSlug(e.target.value) })}
        />

        <input
          placeholder="SEO Title"
          className="w-full p-3 rounded mb-3 bg-gray-100 dark:bg-gray-900"
          value={form.seoTitle}
          onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
        />

        <textarea
          placeholder="SEO Description"
          className="w-full p-3 rounded mb-3 bg-gray-100 dark:bg-gray-900"
          value={form.seoDescription}
          onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
        />

        <input
          placeholder="SEO Keywords (comma-separated)"
          className="w-full p-3 rounded mb-3 bg-gray-100 dark:bg-gray-900"
          value={form.seoKeywords}
          onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })}
        />

        <TiptapEditor
          value={form.content}
          onChange={(html) => setForm({ ...form, content: html })}
        />

        <label className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published
        </label>

        <label className="block mb-4">
          <span className="text-sm px-2">Blog Image</span>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="mt-1"
            onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
          />
        </label>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loadingSave}
          >
            {loadingSave ? "Saving..." : "Save"}
          </button>

          <button
            onClick={resetForm}
            className="bg-gray-400 text-black px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>

      {/* BLOG LIST */}
      <h2 className="text-2xl font-semibold mb-3">Existing Blogs</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4"
          >
            {p.imageUrl && (
              <img
                src={p.imageUrl}
                alt={p.title}
                className="rounded mb-3 h-48 w-full object-cover"
              />
            )}

            <h3 className="text-xl font-bold">{p.title}</h3>
            <p className="text-gray-500 dark:text-gray-300">{p.excerpt}</p>

            <div className="flex gap-4 mt-4">
              <button onClick={() => startEdit(p.id)} className="text-blue-600">
                Edit
              </button>

              <button onClick={() => handleDelete(p.id)} className="text-red-600">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogAdmin;
