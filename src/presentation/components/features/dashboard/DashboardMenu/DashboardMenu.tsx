// DashboardMenu refatorado com Hamburger Menu para todos os dispositivos
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
 HomeIcon,
 ChartBarIcon,
 Cog6ToothIcon,
 Bars3Icon,
 XMarkIcon,
} from "@heroicons/react/24/outline";

export interface DashboardMenuProps {
 activePath?: string;
}

export function DashboardMenu({ activePath = "/" }: DashboardMenuProps) {
 const [isOpen, setIsOpen] = useState(false);

 const menuItems = [
  {
   id: "operations",
   label: "Operações",
   icon: HomeIcon,
   path: "/",
   color: "text-mottu-500",
  },
  {
   id: "clusters",
   label: "Clusters",
   icon: ChartBarIcon,
   path: "/clusters",
   color: "text-blue-400",
  },
  {
   id: "settings",
   label: "Configurações",
   icon: Cog6ToothIcon,
   path: "/settings",
   color: "text-gray-400",
  },
 ];

 return (
  <>
   {/* Header Fixo - Para todos os dispositivos */}
   <div className="fixed top-0 left-0 right-0 z-40 p-4 bg-dark-secondary border-b border-border-primary">
    <div className="flex items-center justify-between">
     {/* Logo - Sempre visível */}
     <div className="flex items-center gap-2">
      <h1 className="text-xl font-bold text-mottu-500">Mottu</h1>
      <p className="text-xs text-text-muted">Dashboard</p>
     </div>

     {/* Hamburger Button - Para todos os dispositivos */}
     <button
      onClick={() => setIsOpen(true)}
      className="p-2 rounded-lg bg-dark-tertiary border border-border-primary hover:bg-dark-hover transition-all duration-200"
      aria-label="Abrir menu"
     >
      <Bars3Icon className="h-6 w-6 text-text-primary" />
     </button>
    </div>
   </div>

   {/* Fullscreen Overlay Menu - Para todos os dispositivos */}
   {isOpen && (
    <div className="fixed inset-0 z-50">
     {/* Menu Content */}
     <div className="relative h-full w-full bg-dark-primary flex flex-col">
      {/* Close Button - Top Right */}
      <div className="flex justify-end p-4 border-b border-border-primary">
       <button
        onClick={() => setIsOpen(false)}
        className="p-2 rounded-lg bg-dark-secondary border border-border-primary hover:bg-dark-tertiary transition-all duration-200"
        aria-label="Fechar menu"
       >
        <XMarkIcon className="h-6 w-6 text-text-primary" />
       </button>
      </div>

      {/* Menu Items - Centered in the screen */}
      <nav className="flex-1 flex items-center justify-center">
       <ul className="space-y-8 w-full max-w-md px-4">
        {menuItems.map((item) => {
         const Icon = item.icon;
         const isActive = activePath === item.path;

         return (
          <li key={item.id}>
           <Link
            href={item.path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center justify-center gap-4 px-8 py-6 rounded-xl transition-all duration-200 text-lg font-semibold w-full ${
             isActive
              ? "bg-mottu-500/20 border-2 border-mottu-500 text-mottu-400"
              : "bg-dark-secondary border-2 border-border-primary text-text-secondary hover:border-mottu-500/50 hover:text-text-primary hover:bg-dark-tertiary"
            }`}
           >
            <Icon className="h-8 w-8 flex-shrink-0" />
            <span className="text-xl">{item.label}</span>
           </Link>
          </li>
         );
        })}
       </ul>
      </nav>

      {/* Footer - Bottom */}
      <div className="p-6 border-t border-border-primary text-center">
       <div className="text-sm text-text-muted">
        <p>Versão 1.0.0</p>
        <p className="mt-1">© 2025 Mottu</p>
       </div>
      </div>
     </div>
    </div>
   )}

   {/* Espaço para o conteúdo principal */}
   <div className="pt-16">
    {" "}
    {/* Ajuste para compensar o header fixo */}
    {/* Seu conteúdo da página vai aqui */}
   </div>
  </>
 );
}
