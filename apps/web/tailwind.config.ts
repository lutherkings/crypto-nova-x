import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#080B12", navy: "#101827", gold: "#D6B56D", gold2: "#A88A4A",
        ink: "#F5F5F5", muted: "#A7AFBD", ok: "#20B981", bad: "#EF5350",
      },
      fontFamily: { sans: ["var(--font-manrope)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
