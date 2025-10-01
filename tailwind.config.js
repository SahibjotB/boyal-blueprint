module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui","Inter"],
        display: ["Montserrat", "ui-sans-serif", "system-ui", "Inter"],
      },
    },
  },
  plugins: [],
};
