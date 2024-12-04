/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Inter: ["Inter"],
      },
      colors: {
        primary: "#0D0714",
        secondary: "#1D1825",
        light: "#9E78CF",
      },
    },
  },
  plugins: [],
};
