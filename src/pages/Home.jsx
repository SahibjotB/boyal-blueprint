import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
return (
  <>
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-black to-orange-950 -z-10" />

    <section className="w-full min-h-screen flex flex-col justify-start pt-60 items-center text-center px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 mb-6">
        A Clear Path to Homeownership
      </h1>

      <p className="text-gray-700 dark:text-gray-200 max-w-xl mb-8 text-lg">
        The Boyal Blueprint is your personalized tool for deciding whether to rent or buy.
        We simplify your first step toward homeownership with clarity, care, and confidence.
      </p>

      <Link
        to="/calculator"
        className="bg-orange-600 text-black px-6 py-3 rounded-xl text-lg font-bold hover:bg-orange-700 transition"
      >
        Calculator
      </Link>
    </section>
  </>
);

}