import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="container mx-auto px-4 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">The Boyal Blueprint</h1>
        <ul className="flex space-x-6 text-sm sm:text-base font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-orange-600" : "text-gray-700 dark:text-gray-300 hover:text-orange-500"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/calculator"
              className={({ isActive }) =>
                isActive ? "text-orange-600" : "text-gray-700 dark:text-gray-300 hover:text-orange-500"
              }
            >
              Calculator
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/knowledge"
              className={({ isActive }) =>
                isActive ? "text-orange-600" : "text-gray-700 dark:text-gray-300 hover:text-orange-500"
              }
            >
              Knowledge
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}