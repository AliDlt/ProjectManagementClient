/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "custom-primary-color": "rgb(var(--primary-color) / <alpha-value>)",
        "custom-secondary-color": "rgb(var(--secondary-color) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
