import React, { useState } from "react";
import { CalculatorIcon, CalendarIcon, LightbulbIcon } from "../assets/Icons.jsx";
import GlowCard from "./GlowCard";
import RealEstateMap from "./Map.jsx"; 

const services = [
  {
    to: "/calculator",
    title: "Smart Calculator",
    desc: "Personalized rent vs buy insights based on your income, credit score, and current rent.",
    Icon: CalculatorIcon,
  },
  {
    to: "/knowledge",
    title: "Knowledge Hub",
    desc: "Chat with an AI expert about buying, selling, or investing in real estate.",
    Icon: LightbulbIcon,
  },
  {
    to: "/book",
    title: "Book a Consultation",
    desc: "Answer a few questions and connect with a trusted realtor for personalized help.",
    Icon: CalendarIcon,
  },
];

export default function Services() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <>
      <div id="services-anchor" className="h-0 scroll-mt-20" />

      <section
        id="services"
        className="min-h-screen md:min-h-[45vh] flex flex-col justify-start items-center gap-8 pt-8 pb-10 px-4 sm:px-10 lg:px-20 bg-black dark:bg-white text-center"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white dark:text-gray-900">
          Our Services
        </h2>

        {/* 🗺️ Map Section */}
        <RealEstateMap />

        {/* 🔸 Service Cards */}
        <div className="w-[90%] md:w-full max-w-6xl grid grid-cols-1 gap-6 md:gap-10 sm:grid-cols-2 md:grid-cols-3">
          {services.map((service) => (
            <GlowCard key={service.title} {...service} mousePos={mousePos} />
          ))}
        </div>
      </section>
    </>
  );
}
