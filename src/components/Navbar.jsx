import React, { useState, useEffect, useRef } from "react";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import logo from "../assets/logo.png";
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const links = ["home", "about", "experience", "projects", "blog", "contact"];

  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;

  let pressTimer;

  // Detect logged-in admin
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user && user.email === ADMIN_EMAIL) setIsAdmin(true);
      else setIsAdmin(false);
    });
    return unsub;
  }, []);

  // Smooth section scroll — works from ANY route
  const scrollToSection = (id) => {
    if (window.location.pathname !== "/") {
      // Navigate home first
      navigate(`/#${id}`);
      return;
    }

    // Already on home — smooth scroll
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Hidden long-press → Admin Login
  const handleSecretPress = () => {
    if (window.location.pathname === "/admin/login") navigate("/");
    else navigate("/admin/login");
  };

  return (
    <nav className="fixed w-full backdrop-blur-lg bg-gray-950/70 dark:bg-gray-900/70 text-gray-200 py-4 px-6 md:px-8 flex justify-between items-center z-50 shadow-md transition-colors duration-300">

      {/* Logo with Secret Press */}
      <div
        className="flex items-center space-x-2 cursor-pointer select-none"
        onMouseDown={() => (pressTimer = setTimeout(handleSecretPress, 3000))}
        onMouseUp={() => clearTimeout(pressTimer)}
        onMouseLeave={() => clearTimeout(pressTimer)}

        onTouchStart={() => (pressTimer = setTimeout(handleSecretPress, 3000))}
        onTouchEnd={() => clearTimeout(pressTimer)}
      >
        <img
          src={logo}
          alt="VB Logo"
          className="w-10 h-10 object-contain rounded-md shadow-sm hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 items-center">
        {links.map((link) => (
          <li key={link}>
            <button
              onClick={() => scrollToSection(link)}
              className="hover:text-blue-400 capitalize transition-colors duration-200"
            >
              {link}
            </button>
          </li>
        ))}
      </ul>

      {/* Theme toggle + Mobile menu button */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 text-xl"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-2xl text-gray-200 hover:text-blue-300 transition-colors duration-200"
          onClick={() => setMenuOpen((s) => !s)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[64px] left-0 w-full z-40 transform transition-all duration-300 ${
          menuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-5 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-4 mt-2 rounded-lg bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur py-4 shadow-lg border border-gray-200/20 dark:border-gray-700/30">
          <ul className="flex flex-col items-center gap-4">
            {links.map((link) => (
              <li key={link} className="w-full">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    scrollToSection(link);
                  }}
                  className="block w-full text-center py-3 text-gray-800 dark:text-gray-200 hover:text-blue-500 transition-colors duration-200 capitalize"
                >
                  {link}
                </button>
              </li>
            ))}

            {/* Theme Toggle in Mobile */}
            <li className="w-full pt-2 border-t border-gray-200/20 dark:border-gray-700/30">
              <button
                onClick={toggleTheme}
                className="mx-auto mt-2 px-4 py-2 rounded-md flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                {theme === "dark" ? (
                  <>
                    <FaSun /> <span className="text-sm">Light Mode</span>
                  </>
                ) : (
                  <>
                    <FaMoon /> <span className="text-sm">Dark Mode</span>
                  </>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;
