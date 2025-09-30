import React from "react";
import { Link } from "react-router-dom";

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
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10 text-gray-900 dark:text-white">
          Our Services
        </h2>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            {
              to: "/calculator",
              title: "Smart Calculator",
              desc:
                "Personalized rent vs buy insights based on your income, credit score, and current rent.",
            },
            {
              to: "/book",
              title: "Book a Consultation",
              desc:
                "Answer a few questions and connect with a trusted realtor for personalized help.",
            },
            {
              to: "/knowledge",
              title: "Knowledge Hub",
              desc:
                "Explore guides and insights to learn more about real estate and buying your first home.",
            },
          ].map(({ to, title, desc }) => (
            <Link
              key={title}
              to={to}
              className="bg-gray-100 dark:bg-neutral-900 p-5 rounded-xl shadow hover:shadow-lg hover:shadow-orange-300 transition-transform transform hover:scale-105 h-48 flex items-center justify-center group relative overflow-hidden"
            >
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white transition-opacity duration-300 group-hover:opacity-0 absolute">
                {title}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute px-4">
                {desc}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
