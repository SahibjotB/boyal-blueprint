import React, { useState } from "react";

export default function Calculator() {
  const [income, setIncome] = useState(60000);
  const [creditScore, setCreditScore] = useState("good");
  const [rent, setRent] = useState(2000);
  const [downPayment, setDownPayment] = useState(10000);
  const [years, setYears] = useState(5);

  // Estimate mortgage rate based on credit score
  const getMortgageRate = () => {
    switch (creditScore) {
      case "excellent":
        return 0.045;
      case "good":
        return 0.05;
      case "fair":
        return 0.06;
      default:
        return 0.07;
    }
  };

  const homePrice = income * 4; // Simplified affordability logic
  const loanAmount = homePrice - downPayment;
  const annualRate = getMortgageRate();
  const monthlyRate = annualRate / 12;
  const numberOfPayments = years * 12;

  const monthlyMortgage =
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -numberOfPayments));

  const rentTotal = rent * 12 * years;
  const mortgageTotal = monthlyMortgage * 12 * years;

  const recommendation = mortgageTotal < rentTotal ? "Buying" : "Renting";

  return (
    <>
      <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-black to-orange-950 -z-10" />

      <div className="min-h-screen w-full text-white flex flex-col items-center px-4 py-10">
        <h1 className="text-3xl font-bold text-orange-600 mb-8">
          Rent vs Buy Calculator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-6xl">
          {/* Inputs */}
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl space-y-6">
            <div>
              <label className="block mb-1">Annual Income</label>
              <input
                type="range"
                min="20000"
                max="200000"
                step="1000"
                value={income}
                onChange={(e) => setIncome(+e.target.value)}
                className="w-full"
              />
              <p>${income.toLocaleString()}</p>
            </div>

            <div>
              <label className="block mb-1">Credit Score</label>
              <select
                value={creditScore}
                onChange={(e) => setCreditScore(e.target.value)}
                className="w-full p-2 rounded bg-zinc-900 border border-zinc-700 text-white"
              >
                <option value="excellent">Excellent (760+)</option>
                <option value="good">Good (700-759)</option>
                <option value="fair">Fair (650-699)</option>
                <option value="poor">Poor (&lt;650)</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">Current Rent (Monthly)</label>
              <input
                type="range"
                min="500"
                max="5000"
                step="50"
                value={rent}
                onChange={(e) => setRent(+e.target.value)}
                className="w-full"
              />
              <p>${rent.toLocaleString()}</p>
            </div>

            <div>
              <label className="block mb-1">Down Payment</label>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={downPayment}
                onChange={(e) => setDownPayment(+e.target.value)}
                className="w-full"
              />
              <p>${downPayment.toLocaleString()}</p>
            </div>

            <div>
              <label className="block mb-1">Years of Ownership</label>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={years}
                onChange={(e) => setYears(+e.target.value)}
                className="w-full"
              />
              <p>{years} years</p>
            </div>
          </div>

          {/* Results */}
          <div className="bg-zinc-900 p-6 rounded-2xl shadow-xl space-y-4">
            <h2 className="text-2xl font-bold text-center text-white mb-4">
              Your Results
            </h2>
            <div className="flex justify-between">
              <span>Estimated Home Price</span>
              <span>${homePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Monthly Mortgage</span>
              <span>${monthlyMortgage.toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Cost of Renting</span>
              <span>${rentTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Cost of Buying</span>
              <span>${mortgageTotal.toLocaleString()}</span>
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg">
                <span className="font-bold text-orange-500">{recommendation}</span> is more cost-effective over {years} years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}