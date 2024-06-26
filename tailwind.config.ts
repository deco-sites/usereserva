import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      fontFamily: {
        "reserva-sans": ["ReservaSans", "sans-serif"],
        "reserva-serif": ["ReservaSerif", "sans-serif"],
        "reserva-display": ["ReservaDisplay", "sans-serif"],
      },
    },
  },
};
