import React, { useState } from "react";

const questions = [
  {
    key: "status",
    question: "What's your status in Canada?",
    options: ["PR/ Canadian Citizen", "Work Permit", "Student"],
  },
  {
    key: "advice",
    question: "What advice are you looking for today?",
    options: [
      "Buying primary residence",
      "Buying an investment property",
      "Other",
    ],
  },
  {
    key: "employment",
    question: "What is your employment status?",
    options: ["Full-Time", "Contract", "Self-Employed"],
  },
  {
    key: "income",
    question: "What is your annual gross household income?",
    options: ["<$60,000", "$60,000 - $120,000", "$120,000 - $180,000", "$180,000 +"],
  },
  {
    key: "province",
    question: "Which province are you looking at homes in?",
    options: ["Ontario", "British Columbia", "Alberta", "Other"],
  },
  {
    key: "name",
    question: "What's your name?",
    input: true,
  },
  {
    key: "email",
    question: "What's your email address?",
    input: true,
  },
  {
    key: "phone",
    question: "What's your phone number?",
    input: true,
  },
  {
    key: "consent",
    question:
      "Do you accept being contacted by Boyal Blueprint via call, email, and text for real estate services?",
    options: ["I accept", "I don't accept"],
  },
];

export default function BookACall() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);

  const current = questions[step];

  const handleNext = () => {
    if (!answers[current.key] || answers[current.key].trim() === "") return;

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Submitted answers:", answers);
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-black text-4xl font-bold mb-4 text-center">Book a Consultation</h1>
      <p className="text-center text-gray-600 mb-6 max-w-2xl">
        A specialized real estate expert from my team will call you in the next 24 hours.
      </p>

      {submitted ? (
        <div className="text-center p-6">
          <h2 className="text-2xl font-semibold">
            Thanks, {answers.name}. We'll be in touch soon.
          </h2>
        </div>
      ) : !started ? (
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl h-[500px] flex flex-col items-center justify-center text-black">
          <p className="text-lg font-medium mb-6 text-center">
            Answer a few quick questions to help us tailor your consultation. It'll only take 60 seconds.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded hover:scale-105 transition"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-3xl h-[500px] text-black flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-center">{current.question}</h2>

            {current.input ? (
              <input
                type={current.key === "email" ? "email" : "text"}
                className="w-full border border-gray-300 rounded-md p-4 mb-8 text-black"
                value={answers[current.key] || ""}
                onChange={(e) => handleChange(current.key, e.target.value)}
              />
            ) : (
              <div className="flex flex-col gap-4 mb-8 overflow-y-auto">
                {current.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleChange(current.key, opt)}
                    className={`border rounded-md p-4 text-left transition hover:bg-orange-300 ${
                      answers[current.key] === opt ? "bg-orange-300" : "bg-white"
                    } text-black`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between items-end mt-4">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="px-5 py-2 bg-orange-500 text-white font-semibold rounded hover:scale-105 transition"
              >
                Previous 
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!answers[current.key] || answers[current.key].trim() === ""}
              className="px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:scale-105 transition ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}