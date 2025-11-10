"use client";

import React from "react";
import { useTheme } from "@/contexts/theme_context";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export function ThemeToggle() {
 const { theme, toggleTheme } = useTheme();

 return (
  <button
   onClick={toggleTheme}
   className="p-2 rounded-lg bg-dark-secondary border border-border-primary hover:bg-dark-tertiary transition-all duration-200 group"
   aria-label="Alternar tema"
   title={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
  >
   {theme === "dark" ? (
    <SunIcon className="h-5 w-5 text-text-secondary group-hover:text-amber-400 transition-colors" />
   ) : (
    <MoonIcon className="h-5 w-5 text-text-secondary group-hover:text-mottu-400 transition-colors" />
   )}
  </button>
 );
}
