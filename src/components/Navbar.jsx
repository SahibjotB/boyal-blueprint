import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Already on home → scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Navigate to home
      navigate("/");
    }
  };

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
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center transition-all duration-500 bg-transparent`}
    >
      <nav
        className={`relative flex items-center justify-between h-20 transition-all duration-500 px-6 sm:px-16
          ${
            scrolled
              ? "backdrop-blur-md bg-white/70 dark:bg-black/70 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-md w-[80%]"
              : "bg-transparent border border-transparent w-full"
          }`}
      >
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <a href="/" onClick={handleLogoClick} className="shrink-0 cursor-pointer">
            <img
              src={darkMode ? darklogo : logo}
              alt="Logo"
              className="w-32 sm:w-36 h-auto hover:scale-110 transition-transform"
            />
          </a>
        </div>

        {/* Center: Nav Links */}
        <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10 font-semibold text-lg">
          {[
            { to: "/calculator", label: "Calculator" },
            { to: "/knowledge", label: "Knowledge" },
            { to: "/book", label: "Book a Call" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `${
                    isActive ? "text-orange-500" : "hover:text-orange-500"
                  } whitespace-nowrap`
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
            className="p-2 rounded-full bg-black text-white dark:text-black dark:bg-white hover:invert"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6 md:w-8 md:h-8" />
            ) : (
              <MoonIcon className="w-6 h-6 md:w-8 md:h-8" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className={`md:hidden text-black dark:text-white focus:outline-none transition-transform duration-500 ${
              menuOpen ? "rotate-180" : "rotate-0"
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`absolute right-1 transform top-full md:hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="min-w-[20vh] max-w-sm justify-center backdrop-blur-md bg-white/90 dark:bg-black/90 text-black dark:text-white p-6 shadow-lg rounded-2xl transition-colors duration-500">
          {[
            { to: "/calculator", label: "Calculator" },
            { to: "/book", label: "Book a Call" },
            { to: "/knowledge", label: "Knowledge" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className="flex flex-col w-full px-1 text-center rounded-md text-black dark:text-white hover:text-orange-500 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
