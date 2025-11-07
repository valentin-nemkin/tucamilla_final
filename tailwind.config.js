/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#f1c528",
          dark: "#152039",
          gray: "#f2f2f2",
          nude: "#f8e6d0",
          rose: "#e6c4b6",
        },
      },
      fontFamily: {
        sans: ['"Manrope"', "sans-serif"],
        heading: ['"Anton SC"', "sans-serif"],
        accent: ['"Barlow Semi Condensed"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
