import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderRadius: {
        card: "16px",
        button: "12px",
        modal: "20px"
      }
    }
  },
  plugins: []
};

export default config;
