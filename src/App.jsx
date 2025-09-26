// Vite + React + Tailwind project for Boyal Blueprint
import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Calculator from "./pages/Calculator";
import Knowledge from "./pages/Knowledge";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col text-black dark:text-white">
        <Navbar />
        <main className="flex-grow container mx-auto py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/knowledge" element={<Knowledge />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
