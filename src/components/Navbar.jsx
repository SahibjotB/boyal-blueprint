import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SunIcon, MoonIcon, CalculatorIcon, CalendarIcon, LightbulbIcon } from "../assets/Icons.jsx";
import darklogo from "../assets/boyal-blueprint-white.png";
import logo from "../assets/boyal-blueprint-black.png";
import phoneIconUrl from "../assets/PhoneIcon.svg";

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      if (!menuOpen) {
        setScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen) {
      setScrolled(false);
    } else {
      setScrolled(window.scrollY > 50);
    }
    setMenuOpen((prev) => !prev);
  };

  const mobileLinks = [
    { to: "/calculator", label: "Calculator", Icon: CalculatorIcon },
    { to: "/knowledge", label: "Knowledge", Icon: LightbulbIcon },
    { to: "/book", label: "Book", Icon: CalendarIcon },
    {
      to: "/contact",
      label: "Contact",
      Icon: () => <img src={phoneIconUrl} alt="Phone" className="w-5 h-5 min-w-[20px] dark:invert " />,
    },


  ];

  return (
    <header className={`fixed top-4 left-0 right-0 z-50 flex justify-center bg-transparent`}>
      <nav
        className={`relative flex items-center justify-between h-20 transition-[width,transform] duration-500 px-6 sm:px-16
          ${
            scrolled
              ? "backdrop-blur-md bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-md w-[80%]"
              : menuOpen
              ? "bg-white dark:bg-black border-transparent shadow-md w-full"
              : "bg-transparent border border-transparent w-full"
          }`}
      >
        <div className="flex-shrink-0">
          <a href="/" onClick={handleLogoClick} className="shrink-0 cursor-pointer">
            <img
              src={darkMode ? darklogo : logo}
              alt="Logo"
              className="w-32 sm:w-36 h-auto hover:scale-110 transition-transform"
            />
          </a>
        </div>

        <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10 font-semibold text-lg">
          {[{ to: "/calculator", label: "Calculator" }, { to: "/knowledge", label: "Knowledge" }, { to: "/book", label: "Book a Call" }, { to: "/contact", label: "Contact" }].map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => `${isActive ? "text-orange-500" : "hover:text-orange-500"} whitespace-nowrap`}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full bg-black text-white dark:text-black dark:bg-white hover:invert"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <SunIcon className="w-6 h-6 md:w-8 md:h-8" /> : <MoonIcon className="w-6 h-6 md:w-8 md:h-8" />}
          </button>

          <button
            onClick={toggleMenu}
            className={`md:hidden text-black dark:text-white focus:outline-none transition-transform duration-500 ${menuOpen ? "rotate-180" : "rotate-0"}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <div
        className={`absolute top-full left-0 md:hidden transition-all duration-500 ease-in-out z-40
          ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"}`}
      >
        <div className="min-h-screen w-[45vw] bg-white dark:bg-black text-black dark:text-white p-6 shadow-lg space-y-6">
          {mobileLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="flex items-center space-x-3 text-base font-semibold hover:text-orange-500"
            >
              <Icon className="w-5 h-5 min-w-[20px]" />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}