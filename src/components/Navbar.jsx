import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-black shadow-md">
      <nav className="container mx-auto px-4 py-5 flex justify-between items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-2xl font-bold ${isActive ? "text-orange-500" : "text-white hover:text-orange-500"}`
          }
        >
          The Boyal Blueprint
        </NavLink>
        <ul className="flex space-x-6 text-sm sm:text-base font-medium">
          <li>
            <NavLink
              to="/calculator"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white hover:text-orange-500"
              }
            >
              Calculator
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/knowledge"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white hover:text-orange-500"
              }
            >
              Knowledge
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/book"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white hover:text-orange-500"
              }
            >
              Book
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-orange-500" : "text-white hover:text-orange-500"
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
