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
      <section className="w-full min-h-screen flex flex-col justify-start pt-60 items-center text-center px-4 sm:px-8">
        <h1 className="text-4xl sm:text-4xl md:text-5xl text-gray-900 dark:text-white font-display font-medium">
          Welcome to the
        </h1>
        <h2 className="text-5xl sm:text-5xl md:text-6xl font-bold text-orange-500 font-display mt-2">
          Boyal Blueprint
        </h2>
        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mt-4 max-w-2xl">
          A Clear Path to Homeownership — made for first-time home buyers.
        </p>
        <div className="mt-8">
          <a
            href="#services"
            className="bg-orange-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
          >
            Get Started
          </a>
        </div>
        {/* 🔹 Continuous Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none justify-start pt-0">
          <div className="relative w-[200%] h-24 animate-wave">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              className="absolute top-0 left-0 w-full h-full"
            >
              <path
                className="fill-black dark:fill-white"
                d="M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,170.7C672,181,768,203,864,202.7C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              className="absolute top-0 left-[100%] w-full h-full"
            >
              <path
                className="fill-black dark:fill-white"
                d="M0,192L48,186.7C96,181,192,171,288,165.3C384,160,480,160,576,170.7C672,181,768,203,864,202.7C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="pb-8 px-6 sm:px-10 lg:px-20 bg-white dark:bg-black text-center">
        <h2 className="text-2xl sm:text-3xl font-display font-bold mb-10 text-gray-900 dark:text-white">
          Our Services
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {services.map(({ to, title, desc, Icon }) => (
            <Link
              key={title}
              to={to}
              className="bg-white dark:bg-black border border-gray-200 dark:border-neutral-900 rounded-2xl p-6 shadow-sm transition-all duration-300 transform hover:scale-[1.02] hover:bg-black dark:hover:bg-white group"
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
