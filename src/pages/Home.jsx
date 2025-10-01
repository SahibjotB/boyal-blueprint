import React from "react";
import { Link } from "react-router-dom";
import { CalculatorIcon, CalendarIcon, BookIcon } from "../assets/Icons.jsx";

// ✅ Move this OUTSIDE the return statement
const services = [
  {
    to: "/calculator",
    title: "Smart Calculator",
    desc:
      "Personalized rent vs buy insights based on your income, credit score, and current rent.",
    Icon: CalculatorIcon,
  },
  {
    to: "/book",
    title: "Book a Consultation",
    desc:
      "Answer a few questions and connect with a trusted realtor for personalized help.",
    Icon: CalendarIcon,
  },
  {
    to: "/knowledge",
    title: "Knowledge Hub",
    desc:
      "Chat with an AI expert about buying, selling, or investing in real estate in the GTA.",
    Icon: BookIcon,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-gray-100 dark:bg-neutral-900 min-h-[40vh] flex flex-col justify-center items-center text-center px-4 sm:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to The Boyal Blueprint
        </h1>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-2xl">
          A Clear Path to Homeownership — made for first-time home buyers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/calculator"
            className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition text-center"
          >
            Get Started
          </Link>
          <Link
            to="/book"
            className="border border-orange-500 text-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-100 dark:hover:bg-orange-500 dark:hover:text-white transition text-center"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 px-6 sm:px-10 lg:px-20 bg-white dark:bg-black text-center">
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-10 text-gray-900 dark:text-white">
          Our Services
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {services.map(({ to, title, desc, Icon }) => (
            <Link
              key={title}
              to={to}
              className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 shadow-sm transition-all duration-300 transform hover:scale-[1.02] hover:bg-black dark:hover:bg-white group"
            >
              {/* Icon container */}
              <div className="w-16 h-16 mx-auto mb-5 rounded-xl flex items-center justify-center">
                <Icon className="w-12 h-12 text-black dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors">
                {desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
