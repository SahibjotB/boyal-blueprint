import React, { useState } from "react";

const Calculator = () => {
  const [income, setIncome] = useState("");
  const [rent, setRent] = useState("");
  const [homePrice, setHomePrice] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const yearlyRent = Number(rent) * 12;
    const buyThreshold = Number(homePrice) / 20;
    const recommendation = yearlyRent > buyThreshold ? "Buy" : "Rent";
    setResult(`Recommendation: You should consider to ${recommendation}`);
  };

  return (
    <>
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-black to-orange-950 -z-10" />
      <div className="min-h-screen w-full text-white flex flex-col items-center justify-start pt-32 px-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 shadow-lg w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">Rent vs. Buy Calculator</h1>

          <div className="space-y-4">
            <div>
              <label className="block mb-1">Monthly Income</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black bg-opacity-20 text-white placeholder-gray-300 focus:outline-none"
                placeholder="e.g., 5000"
              />
            </div>

            <div>
              <label className="block mb-1">Monthly Rent</label>
              <input
                type="number"
                value={rent}
                onChange={(e) => setRent(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black bg-opacity-20 text-white placeholder-gray-300 focus:outline-none"
                placeholder="e.g., 1500"
              />
            </div>

            <div>
              <label className="block mb-1">Estimated Home Price</label>
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-black bg-opacity-20 text-white placeholder-gray-300 focus:outline-none"
                placeholder="e.g., 300000"
              />
            </div>

            <button
              onClick={handleCalculate}
              className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-xl transition"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="mt-6 text-center text-lg font-medium text-orange-400">
              {result}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Calculator;
