import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-black shadow-md">
      <nav className="mx-8 py-6 flex items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-2xl font-bold ${isActive ? "text-orange-500" : "text-white hover:text-orange-500"}`
          }
        >
          The Boyal Blueprint
        </NavLink>
        <ul className="ml-auto flex space-x-6 text-sm sm:text-base font-medium">
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
