// DashboardMenu refatorado
"use client";

import React from "react";
import Link from "next/link";
import {
 HomeIcon,
 ChartBarIcon,
 Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export interface DashboardMenuProps {
 activePath?: string;
}

export function DashboardMenu({ activePath = "/" }: DashboardMenuProps) {
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
  <div className="w-56 lg:w-64 bg-dark-secondary border-r border-border-primary flex flex-col">
   {/* Logo */}
   <div className="p-6 border-b border-border-primary">
    <h1 className="text-2xl font-bold text-mottu-500">Mottu</h1>
    <p className="text-xs text-text-muted mt-1">Dashboard</p>
   </div>

   {/* Menu Items */}
   <nav className="flex-1 p-4">
    <ul className="space-y-2">
     {menuItems.map((item) => {
      const Icon = item.icon;
      const isActive = activePath === item.path;

      return (
       <li key={item.id}>
        <Link
         href={item.path}
         className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
           ? "bg-mottu-500/10 border border-mottu-500/30 text-mottu-500"
           : "hover:bg-dark-tertiary text-text-secondary hover:text-text-primary"
         }`}
        >
         <Icon className="h-5 w-5 flex-shrink-0" />
         <span className="font-medium">{item.label}</span>
        </Link>
       </li>
      );
     })}
    </ul>
   </nav>

   {/* Footer */}
   <div className="p-4 border-t border-border-primary">
    <div className="text-xs text-text-muted">
     <p>Versão 1.0.0</p>
     <p className="mt-1">© 2025 Mottu</p>
    </div>
   </div>
  </div>
 );
}
