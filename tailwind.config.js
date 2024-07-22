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
        "custom-primary-color-300":
          "rgb(var(--primary-color-300) / <alpha-value>)",
        "custom-secondary-color": "rgb(var(--secondary-color) / <alpha-value>)",
        "white-custom": "#fff",
      },
      boxShadow: {
        custom: "0 4px 16px -1px rgba(12, 12, 13, 0.1)",
      },
      borderRadius: {
        custom: "16px",
      },
      fontSize: {
        32: "32px",
        24: "24px",
        16: "16px",
        14: "14px",
        12: "12px",
        10: "10px",
      },
    },
  },
  plugins: [],
};
