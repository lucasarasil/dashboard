// KpiCard Component - Refatorado
"use client";

import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface KpiCardProps {
 title: string;
 value: string | number;
 subtitle?: string;
 trend?: "up" | "down" | "neutral";
 trendValue?: string;
 color?: string;
 bgColor?: string;
 borderColor?: string;
 icon?: React.ReactNode;
}

export function KpiCard({
 title,
 value,
 subtitle,
 trend,
 trendValue,
 color = "text-mottu-500",
 bgColor = "bg-mottu-500/10",
 borderColor = "border-mottu-400/20",
 icon,
}: KpiCardProps) {
 return (
  <div
   className={`group flex flex-col sm:flex-row items-start sm:items-center sm:space-x-3 px-3 py-3 lg:px-4 lg:py-3.5 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/20 ${bgColor} ${borderColor} hover:border-emerald-400/30 relative overflow-hidden`}
  >
   {/* Background gradient effect */}
   <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

   {/* Icon */}
   {icon && (
    <div
     className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${bgColor} flex items-center justify-center ${color} relative z-10`}
    >
     {icon}
    </div>
   )}

   {/* Content */}
   <div className="flex-1 min-w-0 mt-2 sm:mt-0 relative z-10">
    <p className="text-xs sm:text-sm text-text-muted truncate font-medium">
     {title}
    </p>
    <div className="flex items-baseline gap-2 mt-1">
     <p className={`text-xl sm:text-2xl lg:text-3xl font-bold ${color}`}>
      {value}
     </p>
     {trend && trendValue && (
      <div
       className={`flex items-center gap-1 text-xs ${
        trend === "up"
         ? "text-rose-400"
         : trend === "down"
         ? "text-emerald-400"
         : "text-text-muted"
       }`}
      >
       {trend === "up" && <ArrowUpIcon className="h-3 w-3" />}
       {trend === "down" && <ArrowDownIcon className="h-3 w-3" />}
       <span>{trendValue}</span>
      </div>
     )}
    </div>
    {subtitle && <p className="text-xs text-text-muted mt-1">{subtitle}</p>}
   </div>
  </div>
 );
}
