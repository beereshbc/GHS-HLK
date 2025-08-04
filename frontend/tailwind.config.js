/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        party:
          "0 0 0 4px rgba(255, 199, 0, 0.6), 0 0 20px rgba(255, 0, 150, 0.6)",
      },
      animation: {
        confettiLeft: "confettiLeft 1s ease-out forwards",
        confettiRight: "confettiRight 1s ease-out forwards",
      },
      keyframes: {
        confettiLeft: {
          "0%": { transform: "translateX(-50%) translateY(0)", opacity: "1" },
          "100%": {
            transform: "translateX(-200%) translateY(-100%)",
            opacity: "0",
          },
        },
        confettiRight: {
          "0%": { transform: "translateX(50%) translateY(0)", opacity: "1" },
          "100%": {
            transform: "translateX(200%) translateY(-100%)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};
