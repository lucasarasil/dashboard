"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
 theme: Theme;
 toggleTheme: () => void;
 setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "mottu-dashboard-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
 const [theme, setThemeState] = useState<Theme>("dark");

 // Carrega tema do localStorage na inicialização
 useEffect(() => {
  // 1. Verifica localStorage
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

  // 2. Se não houver tema salvo, verifica preferência do sistema
  const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
   .matches
   ? "dark"
   : "light";

  const initialTheme = savedTheme || systemPreference;
  setThemeState(initialTheme);
  applyTheme(initialTheme);
 }, []);

 // Aplica classe no HTML e salva no localStorage
 const applyTheme = (newTheme: Theme) => {
  const root = document.documentElement;

  // Remove classe antiga e adiciona nova
  root.classList.remove("light", "dark");
  root.classList.add(newTheme);

  // Persiste no localStorage
  localStorage.setItem(THEME_STORAGE_KEY, newTheme);
 };

 const setTheme = (newTheme: Theme) => {
  setThemeState(newTheme);
  applyTheme(newTheme);
 };

 const toggleTheme = () => {
  const newTheme = theme === "dark" ? "light" : "dark";
  setTheme(newTheme);
 };

 return (
  <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
   {children}
  </ThemeContext.Provider>
 );
}

export function useTheme() {
 const context = useContext(ThemeContext);
 if (context === undefined) {
  throw new Error("useTheme must be used within a ThemeProvider");
 }
 return context;
}
