import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: "#f9f9f9",
        main:    "#ffffff",
        surface: "#f4f4f4",
        border:  "#e5e5e5",
        accent:  "#d97706",
      },
    },
  },
  plugins: [],
};
export default config;
