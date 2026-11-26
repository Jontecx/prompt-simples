import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        foreground: "#111827",
        brand: {
          blue: "#2563EB",
          blueDark: "#1D4ED8",
          emerald: "#10B981",
          emeraldDark: "#059669",
        },
      },
      fontFamily: {
        sans: ["Efrom", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Efrom", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [typography],
};

export default config;
