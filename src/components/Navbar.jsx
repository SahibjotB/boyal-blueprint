import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SunIcon, MoonIcon } from "./ThemeIcons";
import logo from "../assets/boyal-blueprint-white.png";
import darklogo from "../assets/boyal-blueprint-black.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Sync dark mode state to HTML and localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-black dark:bg-white dark:text-black text-white shadow-md sticky top-0 z-50">
      <nav className="px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="shrink-0">
          <img
            src={darkMode ? darklogo : logo}
            alt="Logo"
            className="w-36 sm:w-40 h-auto hover:scale-110 transition-transform"
          />
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-10 font-semibold text-lg items-center">
          {[
            { to: "/calculator", label: "Calculator" },
            { to: "/book", label: "Book a Call" },
            { to: "/knowledge", label: "Knowledge" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-orange-500"
                    : "hover:text-orange-500 transition-colors"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full bg-black text-white dark:text-black dark:bg-white hover:invert transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="w-8 h-8" />
            ) : (
              <MoonIcon className="w-8 h-8" />
            )}
          </button>
        </ul>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-2">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full bg-black text-white dark:text-black dark:bg-white hover:invert transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="w-8 h-8" />
            ) : (
              <MoonIcon className="w-8 h-8" />
            )}
          </button>

          <button
            onClick={() => setMenuOpen(true)}
            className="text-white dark:text-black focus:outline-none"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex-1" />
          <div
            className="relative w-64 h-full bg-black dark:bg-white text-white dark:text-black p-6 shadow-lg flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="self-end mb-6"
              aria-label="Close menu"
            >
              <X size={26} />
            </button>

            {[
              { to: "/calculator", label: "Calculator" },
              { to: "/book", label: "Book a Call" },
              { to: "/knowledge", label: "Knowledge" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className="w-full mb-3 px-4 py-2 text-center rounded-md bg-orange-500 text-white hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition duration-200 font-semibold"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
