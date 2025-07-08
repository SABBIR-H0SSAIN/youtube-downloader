/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      colors:{
        dark: {
          1: "#1C1F2E",
          2: "#161925",
          3: "#252A41",
          4: "#1E2757",
        }
      }
    },

  },
  plugins: [require("tailwindcss-animate")],
};
