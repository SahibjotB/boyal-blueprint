import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  CalculatorIcon,
  CalendarIcon,
  LightbulbIcon,
} from "../assets/Icons.jsx";
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
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [mapHeight, setMapHeight] = useState(window.innerWidth < 768 ? 600 : 450);

  useEffect(() => {
    const handleResize = () => {
      // Adjust map height dynamically when resizing between mobile/desktop
      setMapHeight(window.innerWidth < 768 ? 600 : 450);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div id="services" className="h-0 scroll-mt-[100px]" />

      <section
        className="min-h-screen md:min-h-[45vh] flex flex-col justify-start items-center gap-8 pt-8 pb-10 px-4 sm:px-10 lg:px-20 bg-black dark:bg-white text-center overflow-hidden"
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
      >
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white dark:text-gray-900">
          Our Services
        </h2>

        {/* ===== Map & Drawer Wrapper ===== */}
        <div className="relative w-full max-w-6xl">
          {/* Map */}
          <div
            className="relative rounded-2xl overflow-hidden sm:shadow-lg transition-all duration-500 ease-in-out"
            style={{ height: `${mapHeight}px` }}
            onClick={() => setDrawerOpen((prev) => !prev)}
          >
            <RealEstateMap onHeightChange={setMapHeight} />
          </div>

          {/* ===== Mobile Side Drawer ===== */}
          <div
            className={`md:hidden absolute top-0 z-40 backdrop-blur-lg bg-black/25 dark:bg-white/25 rounded-l-2xl shadow-lg transition-transform duration-500 ease-in-out w-[45%] max-w-[270px]
              ${drawerOpen ? "translate-x-0 right-0" : "translate-x-full right-0"}`}
            style={{ height: `${mapHeight}px` }}
          >
            {/* Mobile Service Buttons */}
            <div className="flex flex-col justify-center items-center h-full space-y-4 px-4">
              {services.map(({ to, title, Icon }) => (
                <NavLink
                  key={title}
                  to={to}
                  onClick={() => setDrawerOpen(false)}
                  className="w-full rounded-xl dark:bg-white/80 bg-black border/80 dark:border-neutral-100/80 border-neutral-900/80 dark:text-black text-white py-4 flex flex-col items-center justify-center shadow-md transition-colors duration-300"
                >
                  <Icon className="w-6 h-6 text-orange-500 mb-2" />
                  <h3 className="font-semibold text-sm">{title}</h3>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Desktop Service Cards ===== */}
        <div className="hidden md:grid w-[90%] md:w-full max-w-6xl grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {services.map(({ to, title, desc, Icon }) => (
            <GlowCard
              key={title}
              to={to}
              title={title}
              desc={desc}
              Icon={Icon}
              mousePos={mousePos}
            />
          ))}
        </div>
      </section>
    </>
  );
}
