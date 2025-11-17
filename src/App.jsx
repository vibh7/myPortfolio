// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Toolkit from "./components/Toolkit";
import Blog from "./components/Blog";

// Admin pages
import Login from "./admin/Login";
import BlogAdmin from "./admin/BlogAdmin"; // Only this, no dashboard
import ProtectedRoute from "./admin/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import BlogDetail from "./pages/BlogDetails";
import AllBlogs from "./pages/AllBlogs";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="scroll-smooth">

          {/* Always visible */}
          <Navbar />

          <Routes>

            {/* 🌟 Main portfolio page */}
            <Route
              path="/"
              element={
                <>
                  <section id="home"><Home /></section>
                  <section id="about"><About /></section>
                  <section id="toolkit"><Toolkit /></section>
                  <section id="experience"><Experience /></section>
                  <section id="projects"><Projects /></section>

                  <section id="blog"><Blog /></section>

                  <section id="contact"><Contact /></section>
                  <Footer />
                </>
              }
            />

            {/* 🌟 Admin login */}
            <Route path="/admin/login" element={<Login />} />

            <Route path="/blog/:slug" element={<BlogDetail />} />

            <Route path="/blogs" element={<AllBlogs />} />
            {/* 🌟 ONLY Blog Admin (no dashboard) */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <BlogAdmin />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
