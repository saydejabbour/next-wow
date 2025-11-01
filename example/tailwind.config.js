/** @type {import('tailwindcss').Config} */
module.exports = {
  // v4 doesn't require content globs, but keeping them is fine:
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/_components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { base: "#0b0f17" },
      fontFamily: { display: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
