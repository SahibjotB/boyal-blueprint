module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui", "Inter"],
        display: ["Montserrat", "ui-sans-serif", "system-ui", "Inter"],
      },
      keyframes: {
        wave: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        wave: "wave 8s linear infinite", // Adjust 8s → 6s or 4s for faster waves
      },
    },
  },
  plugins: [],
};
