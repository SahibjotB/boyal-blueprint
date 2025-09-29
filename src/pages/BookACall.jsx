import React, { useState } from "react";

const BookACall = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
    ...form,
    [name]: value
    });
    };

  const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      alert("Appointment booked!");
      setForm({ name: '', email: '',phone:'', date: '', message: '' });
  };

  return (
    <>
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-b from-black to-orange-900 -z-10" />
    <div className="flex items-center justify-center min-h-screen px-4">  
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Book a Call</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name" 
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="text-black w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="text-black w-full p-3 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="text-black w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="text-black w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <textarea
            name="message"
            placeholder="What would you like to discuss?"
            rows={3}
            value={form.message}
            onChange={handleChange}
            className="text-black w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default BookACall;
