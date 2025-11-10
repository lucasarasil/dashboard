import type { Config } from "tailwindcss";

const config: Config = {
 darkMode: "class",
 content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
  extend: {
   colors: {
    "dark-primary": "rgb(var(--color-dark-primary) / <alpha-value>)",
    "dark-secondary": "rgb(var(--color-dark-secondary) / <alpha-value>)",
    "dark-tertiary": "rgb(var(--color-dark-tertiary) / <alpha-value>)",
    "text-primary": "rgb(var(--color-text-primary) / <alpha-value>)",
    "text-secondary": "rgb(var(--color-text-secondary) / <alpha-value>)",
    "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
    "border-primary": "rgb(var(--color-border-primary) / <alpha-value>)",
    "border-secondary": "rgb(var(--color-border-secondary) / <alpha-value>)",
    mottu: {
     50: "#e8f5e9",
     100: "#c8e6c9",
     200: "#a5d6a7",
     300: "#81c784",
     400: "#66bb6a",
     500: "rgb(var(--color-mottu-500) / <alpha-value>)",
     600: "#00b248",
     700: "#009b3d",
     800: "#008532",
     900: "#006e27",
    },
    yellow: {
     50: "#fffde7",
     100: "#fff9c4",
     200: "#fff59d",
     300: "#fff176",
     400: "#ffee58",
     500: "#f9d923",
     600: "#f9c910",
     700: "#f9b900",
     800: "#e6a800",
     900: "#cc9600",
    },
    red: {
     400: "#ff5252",
     500: "#ef4444",
     600: "#dc2626",
    },
    blue: {
     400: "#29b6f6",
     500: "#3b82f6",
     600: "#2563eb",
    },
   },
   boxShadow: {
    "dark-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    "dark-md":
     "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
    "dark-lg":
     "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
    "dark-xl":
     "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)",
    mottu: "0 4px 14px 0 rgba(0, 200, 83, 0.2)",
    "mottu-lg": "0 8px 20px 0 rgba(0, 200, 83, 0.3)",
   },
  },
 },
 plugins: [],
};

export default config;
