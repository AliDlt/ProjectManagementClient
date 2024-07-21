/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./layout/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-primary-color": "rgb(var(--primary-color) / <alpha-value>)",
        "custom-secondary-color": "rgb(var(--secondary-color) / <alpha-value>)",
      },
      boxShadow: {
        custom: "0 4px 16px -1px rgba(12, 12, 13, 0.1)",
      },
      borderRadius: {
        custom: "16px",
      },
    },
  },
  plugins: [],
};
