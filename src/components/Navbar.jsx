import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/boyal-blueprint-white.png";

export default function Navbar() {
  return (
    <header className="bg-black shadow-md">
      <nav className="mx-16 py-4 flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-2xl font-bold ${isActive ? "text-orange-500" : "text-white hover:text-orange-500"}`
          }
        >
          <img src={logo} alt="The Boyal Blueprint Logo" className="w-40 h-20 hover:scale-110 ml-8" />

        </NavLink>
        <ul className="ml-auto flex space-x-6 text-xl font-semibold">
          <li>
            <NavLink
              to="/calculator"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white hover:text-orange-500 font-semibold"
              }
            >
              Calculator
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/book"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white hover:text-orange-500 font-semibold"
              }
            >
              Book a Call
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/knowledge"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white hover:text-orange-500 font-semibold"
              }
            >
              Knowledge
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white hover:text-orange-500 font-semibold"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
