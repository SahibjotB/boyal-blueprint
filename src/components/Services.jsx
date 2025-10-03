import React, { useState } from "react";
import { CalculatorIcon, CalendarIcon, LightbulbIcon } from "../assets/Icons.jsx";
import GlowCard from "./GlowCard";

const services = [
  {
    to: "/calculator",
    title: "Smart Calculator",
    desc: "Personalized rent vs buy insights based on your income, credit score, and current rent.",
    Icon: CalculatorIcon,
  },
  {
    to: "/book",
    title: "Book a Consultation",
    desc: "Answer a few questions and connect with a trusted realtor for personalized help.",
    Icon: CalendarIcon,
  },
  {
    to: "/knowledge",
    title: "Knowledge Hub",
    desc: "Chat with an AI expert about buying, selling, or investing in real estate.",
    Icon: LightbulbIcon,
  },
];

export default function Services() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <section
      id="services"
      className="pt-10 pb-8 px-6 sm:px-10 lg:px-20 bg-black dark:bg-white text-center"
      onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
    >
      <h2 className="text-2xl sm:text-3xl font-display font-bold mb-10 text-white dark:text-gray-900">
        Our Services
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {services.map((service) => (
          <GlowCard key={service.title} {...service} mousePos={mousePos} />
        ))}

      </div>
    </section>
  );
}
