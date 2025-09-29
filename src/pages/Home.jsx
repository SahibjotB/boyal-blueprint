import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      {/* Hero Section - adjusted width and height */}
      <section className="w-full bg-gray-100 min-h-[40vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Welcome to The Boyal Blueprint
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          A Clear Path to Homeownership — made for first-time home buyers.
        </p>
        <div className="space-x-4">
          <Link
            to="/calculator"
            className="bg-orange-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
          >
            Get Started
          </Link>
          <Link
            to="/book"
            className="border border-orange-500 text-orange-500 px-6 py-3 rounded-md font-semibold hover:bg-orange-100 transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Services Section - slightly offset from hero */}
      <section className="py-8 px-60 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-10 text-gray-900">Our Services</h2>

        <div className="grid gap-0 grid-cols-1 md:grid-cols-3">
        {/* Service Card Template */}
        {[
          {
            to: "/calculator",
            title: "Smart Calculator",
            desc:
              "Personalized rent vs buy insights based on your income, credit score, and current rent.",
            pos: "ml-auto",
          },
          {
            to: "/book",
            title: "Book a Consultation",
            desc:
              "Answer a few questions and connect with a trusted realtor for personalized help.",
            pos: "mx-auto",
          },
          {
            to: "/knowledge",
            title: "Knowledge Hub",
            desc:
              "Explore guides and insights to learn more about real estate and buying your first home.",
            pos: "mr-auto",
          },
        ].map(({ to, title, desc, pos }) => (
          <Link
            key={title}
            to={to}
            className={`relative bg-gray-100 p-5 rounded-xl shadow hover:shadow-lg hover:shadow-orange-300 transition-transform transform hover:scale-105 ${pos} w-[55%] h-48 flex items-center justify-center group overflow-hidden`}
          >
            {/* Title (default) */}
            <h3 className="text-xl font-bold text-gray-900 transition-opacity duration-300 group-hover:opacity-0 absolute">
              {title}
            </h3>

            {/* Description (hover) */}
            <p className="text-1xl text-gray-700 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 absolute px-4">
              {desc}
            </p>
          </Link>
        ))}
      </div>

      </section>
    </>
  );
}
