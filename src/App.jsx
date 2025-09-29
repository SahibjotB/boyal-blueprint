// Vite + React + Tailwind project for Boyal Blueprint
import React from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Calculator from "./pages/Calculator";
import Knowledge from "./pages/Knowledge";
import BookACall from "./pages/BookACall";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col text-black dark:text-white">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/book" element={<BookACall />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
