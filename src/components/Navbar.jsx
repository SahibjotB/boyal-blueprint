import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SunIcon, MoonIcon } from "../assets/Icons.jsx";
import darklogo from "../assets/boyal-blueprint-white.png";
import logo from "../assets/boyal-blueprint-black.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [scrolled, setScrolled] = useState(false);

  // Sync dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 flex justify-center transition-all duration-500 ${
        scrolled ? "mt-0" : "mt-4"
      }`}
    >
      <nav
        className={`relative flex items-center justify-between h-20 transition-all duration-500 px-6 sm:px-16
          ${
            scrolled
              ? "bg-white dark:bg-black border border-gray-200 dark:border-neutral-800 rounded-xl shadow-md w-[90%]"
              : "bg-transparent w-full"
          }`}
      >
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <NavLink to="/" className="shrink-0">
            <img
              src={darkMode ? darklogo : logo}
              alt="Logo"
              className="w-32 sm:w-36 h-auto hover:scale-110 transition-all "
            />
          </NavLink>
        </div>

        {/* Center: Nav Links */}
        <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10 font-semibold text-lg">
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
                  `${isActive ? "text-orange-500" : "hover:text-orange-500"} whitespace-nowrap`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right: Dark Mode + Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full bg-black text-white dark:text-black dark:bg-white hover:invert "
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6" />
            ) : (
              <MoonIcon className="w-6 h-6" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-black dark:text-white focus:outline-none"
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
            className="relative w-64 h-full bg-white dark:bg-black text-black dark:text-white p-6 shadow-lg flex flex-col"
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
