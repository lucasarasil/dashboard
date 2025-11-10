"use client";

import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "@/contexts/theme_context";

export default function ThemeToggle() {
 const { theme, toggleTheme } = useTheme();
 const isDark = theme === "dark";

 return (
  <button
   onClick={toggleTheme}
   className="relative p-2 rounded-lg bg-dark-tertiary hover:bg-dark-tertiary/80 border border-border-primary transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-mottu-500 group"
   aria-label={`Alternar para modo ${isDark ? "claro" : "escuro"}`}
   title={`Alternar para modo ${isDark ? "claro" : "escuro"}`}
  >
   <div className="relative w-5 h-5">
    <MoonIcon
     className={`absolute inset-0 w-5 h-5 text-text-primary transition-all duration-300 ${
      isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
     }`}
     aria-hidden="true"
    />

    <SunIcon
     className={`absolute inset-0 w-5 h-5 text-text-primary transition-all duration-300 ${
      !isDark
       ? "opacity-100 rotate-0 scale-100"
       : "opacity-0 -rotate-90 scale-0"
     }`}
     aria-hidden="true"
    />
   </div>

   <div
    className="absolute inset-0 rounded-lg bg-mottu-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    aria-hidden="true"
   />
  </button>
 );
}
