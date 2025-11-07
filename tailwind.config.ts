import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#f1c528",   // акцентные кнопки
          dark: "#152039",     // основной текст и фон хедера
          gray: "#f2f2f2",     // фон карточек и блоков
          nude: "#f8e6d0",     // мягкий бежевый акцент
          rose: "#e6c4b6",     // романтический розово-бежевый
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
}

export default config
