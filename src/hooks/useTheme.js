import { useEffect, useState } from "react";

const useTheme = () => {
  // ✅ Default to dark mode if no theme is stored
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "dark";
  });

  // ✅ Toggle between dark and light mode
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // ✅ Apply theme class to the root <html> element
  useEffect(() => {
    const root = window.document.documentElement;

    // Clean up both themes before applying
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Persist theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
