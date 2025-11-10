// DashboardMenu - Header Fixo com Busca + Theme Toggle + Menu Overlay
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
 HomeIcon,
 ChartBarIcon,
 Cog6ToothIcon,
 Bars3Icon,
 XMarkIcon,
 MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/presentation/components/common/ThemeToggle";

export interface DashboardMenuProps {
 activePath?: string;
 onSearch?: (term: string) => void;
}

interface MenuItem {
 id: string;
 label: string;
 icon: React.ComponentType<{ className?: string }>;
 path: string;
}

const MENU_ITEMS: MenuItem[] = [
 {
  id: "operations",
  label: "Operações",
  icon: HomeIcon,
  path: "/",
 },
 {
  id: "clusters",
  label: "Clusters",
  icon: ChartBarIcon,
  path: "/clusters",
 },
 {
  id: "settings",
  label: "Configurações",
  icon: Cog6ToothIcon,
  path: "/settings",
 },
];

export function DashboardMenu({
 activePath = "/",
 onSearch,
}: DashboardMenuProps) {
 const [isOpen, setIsOpen] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");

 // Bloquear scroll quando menu aberto
 useEffect(() => {
  if (isOpen) {
   document.body.style.overflow = "hidden";
  } else {
   document.body.style.overflow = "unset";
  }

  return () => {
   document.body.style.overflow = "unset";
  };
 }, [isOpen]);

 const handleCloseMenu = () => setIsOpen(false);

 const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearchTerm(value);
  onSearch?.(value);
 };

 return (
  <>
   {/* Header Fixo com Busca + Theme Toggle */}
   <header className="fixed top-0 left-0 right-0 z-40 bg-dark-secondary/95 backdrop-blur-md border-b border-border-primary shadow-lg">
    <div className="flex items-center justify-between gap-3 px-4 py-3">
     {/* Logo + Hamburger */}
     <div className="flex items-center gap-3">
      <button
       onClick={() => setIsOpen(true)}
       className="p-2 rounded-lg bg-dark-tertiary border border-border-primary hover:bg-mottu-500/10 hover:border-mottu-500/50 transition-all duration-200 group"
       aria-label="Abrir menu de navegação"
      >
       <Bars3Icon className="h-6 w-6 text-text-secondary group-hover:text-mottu-500 transition-colors" />
      </button>

      <div className="hidden sm:flex items-center gap-2">
       <div className="w-8 h-8 rounded-lg bg-mottu-500 flex items-center justify-center">
        <span className="text-white font-bold text-lg">M</span>
       </div>
       <div>
        <h1 className="text-base font-bold text-text-primary leading-tight">
         Mottu
        </h1>
        <p className="text-xs text-text-muted leading-none">Dashboard</p>
       </div>
      </div>
     </div>

     {/* Busca + Theme Toggle */}
     <div className="flex items-center gap-2 flex-1 max-w-2xl">
      {/* Barra de Busca */}
      <div className="relative flex-1">
       <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted pointer-events-none" />
       <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full pl-10 pr-4 py-2 bg-dark-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-mottu-500/50 focus:border-mottu-500 transition-all"
       />
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />
     </div>
    </div>
   </header>

   {/* Spacer para não sobrepor conteúdo */}
   <div className="h-[60px]" />

   {/* Fullscreen Overlay Menu */}
   {isOpen && (
    <>
     {/* Backdrop com animação */}
     <div
      className="fixed inset-0 z-50 bg-dark-primary/95 backdrop-blur-sm animate-fade-in"
      onClick={handleCloseMenu}
     />

     {/* Menu Content */}
     <div className="fixed inset-0 z-50 flex flex-col pointer-events-none">
      {/* Close Button - Top Right */}
      <div className="flex justify-end p-4 pointer-events-auto">
       <button
        onClick={handleCloseMenu}
        className="p-3 rounded-xl bg-dark-secondary border border-border-primary hover:bg-rose-500/10 hover:border-rose-500/50 transition-all duration-200 group shadow-lg"
        aria-label="Fechar menu"
       >
        <XMarkIcon className="h-6 w-6 text-text-secondary group-hover:text-rose-400 transition-colors" />
       </button>
      </div>

      {/* Menu Items - PERFEITA CENTRALIZAÇÃO */}
      <nav className="flex-1 flex items-center justify-center pointer-events-auto px-4">
       <ul className="space-y-6 w-full max-w-md">
        {MENU_ITEMS.map((item, index) => {
         const Icon = item.icon;
         const isActive = activePath === item.path;

         return (
          <li
           key={item.id}
           className="animate-slide-in"
           style={{ animationDelay: `${index * 0.1}s` }}
          >
           <Link
            href={item.path}
            onClick={handleCloseMenu}
            className={`
              group flex items-center justify-center gap-4 
              px-8 py-5 rounded-2xl 
              transition-all duration-300 
              text-lg font-semibold w-full
              transform hover:scale-105
              ${
               isActive
                ? "bg-mottu-500/20 border-2 border-mottu-500 text-mottu-400 shadow-lg shadow-mottu-500/20"
                : "bg-dark-secondary border-2 border-border-primary text-text-secondary hover:border-mottu-500/50 hover:text-mottu-400 hover:bg-dark-tertiary hover:shadow-lg"
              }
            `}
           >
            <Icon
             className={`h-7 w-7 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${
              isActive
               ? "text-mottu-400"
               : "text-text-muted group-hover:text-mottu-400"
             }`}
            />
            <span className="text-xl">{item.label}</span>
           </Link>
          </li>
         );
        })}
       </ul>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-border-primary text-center pointer-events-auto bg-dark-secondary/80 backdrop-blur-sm">
       <div className="text-sm text-text-muted space-y-1">
        <p className="font-medium">Versão 1.0.0</p>
        <p>© 2025 Mottu. Todos os direitos reservados.</p>
       </div>
      </div>
     </div>
    </>
   )}
  </>
 );
}
