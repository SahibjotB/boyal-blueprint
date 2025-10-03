import React from "react";
import WaveDivider from "./WaveDivider";

export default function Hero() {
  return (
    <section id='hero' className="relative w-full min-h-screen flex flex-col justify-start pt-44 items-center text-center px-4 sm:px-8 overflow-hidden">
      <h1 className="text-3xl sm:text-3xl md:text-5xl text-gray-900 dark:text-white font-display font-medium">
        Welcome to
      </h1>
      <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500 font-display mt-2 whitespace-nowrap">
        Boyal Blueprint
      </h2>
      <p className="text-sm sm:text-lg text-neutral-800 dark:text-neutral-50 mt-4 max-w-2xl">
        A Clear Path to Homeownership
      </p>
      <div className="mt-8">
        <a
          href="#services-anchor"
          className="bg-orange-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition"
        >
          Get Started
        </a>
      </div>

      {/* 🔹 Waves stay inside hero */}
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider />
      </div>
    </section>

  );
}
