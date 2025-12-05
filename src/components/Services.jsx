import React from "react";

export default function Services() {
  return (
    <section
      id="services"
      className="w-full flex flex-col bg-black text-white scroll-mt-[120px]"
    >
      <div className="text-center pt-8 pb-12 bg-black">
        <h2 className="text-4xl font-bold text-white mb-8">Our Services</h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Smart Calculator */}
          <div className="p-8 bg-white text-black rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="text-4xl mb-3">🧮</div>
            <h3 className="text-lg font-semibold mb-2">Smart Calculator</h3>
            <p className="text-gray-600 text-sm mb-4">
              Instantly calculate your mortgage, affordability, and investment potential.
            </p>
            <a
              href="/calculator"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Try Now →
            </a>
          </div>

          {/* Knowledge Hub */}
          <div className="p-8 bg-white text-black rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="text-lg font-semibold mb-2">Knowledge Hub</h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn from our AI-driven tools and expert guides to make smarter decisions.
            </p>
            <a
              href="/knowledge"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Explore →
            </a>
          </div>

          {/* Book a Consultation */}
          <div className="p-8 bg-white text-black rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition">
            <div className="text-4xl mb-3">📅</div>
            <h3 className="text-lg font-semibold mb-2">Book a Consultation</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connect with our experts for a personalized real estate strategy session.
            </p>
            <a
              href="/contact"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Book Now →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
