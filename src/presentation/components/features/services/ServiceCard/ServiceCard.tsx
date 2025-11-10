"use client";

import React from "react";
import { ServiceEntity } from "@/core/entities/service.entity";
import {
 ClockIcon,
 ExclamationTriangleIcon,
 CheckCircleIcon,
 MapPinIcon,
} from "@heroicons/react/24/outline";

interface ServiceCardProps {
 service: ServiceEntity;
 onClick?: (service: ServiceEntity) => void;
}

const getStatusText = (status: string) => {
 switch (status) {
  case "completed":
   return "Concluído";
  case "in_progress":
   return "Em Progresso";
  case "critical":
   return "Crítico";
  case "open":
   return "Aberto";
  default:
   return "Pendente";
 }
};

const getStatusColor = (status: string) => {
 switch (status) {
  case "completed":
   return "bg-emerald-500/10 text-emerald-400 border-emerald-400/20";
  case "in_progress":
   return "bg-amber-500/10 text-amber-400 border-amber-400/20";
  case "critical":
   return "bg-rose-500/10 text-rose-400 border-rose-400/20";
  case "open":
   return "bg-blue-500/10 text-blue-400 border-blue-400/20";
  default:
   return "bg-gray-500/10 text-gray-400 border-gray-400/20";
 }
};

export function ServiceCard({ service, onClick }: ServiceCardProps) {
 return (
  <div
   onClick={() => onClick?.(service)}
   className="group relative bg-dark-secondary border border-border-primary rounded-xl p-4 hover:border-mottu-500/50 transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-mottu-500/10"
  >
   {/* Header */}
   <div className="flex items-start justify-between mb-3">
    <div className="flex-1 min-w-0">
     <h3 className="text-sm font-semibold text-text-primary truncate">
      {service.title}
     </h3>
     <p className="text-xs text-text-muted mt-0.5">{service.id}</p>
    </div>

    {/* Status Badge */}
    <span
     className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(
      service.status
     )}`}
    >
     {getStatusText(service.status)}
    </span>
   </div>

   {/* Service Info */}
   <div className="space-y-2 text-sm">
    <div className="flex items-center gap-2 text-text-secondary">
     <MapPinIcon className="h-4 w-4 flex-shrink-0" />
     <span className="truncate">{service.branch}</span>
    </div>

    {service.provider && (
     <div className="flex items-center gap-2 text-text-secondary">
      <svg
       className="h-4 w-4 flex-shrink-0"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
      >
       <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
       />
      </svg>
      <span className="truncate">{service.provider}</span>
     </div>
    )}
   </div>

   {/* Footer with SLA and Indicators */}
   <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-primary">
    {/* SLA Progress */}
    <div className="flex items-center gap-2">
     <ClockIcon className="h-4 w-4 text-text-muted" />
     <div className="flex-1">
      <div className="flex items-center gap-2">
       <div className="w-16 h-1.5 bg-dark-tertiary rounded-full overflow-hidden">
        <div
         className={`h-full transition-all duration-300 ${
          service.slaProgress > 80
           ? "bg-rose-400"
           : service.slaProgress > 60
           ? "bg-amber-400"
           : "bg-mottu-500"
         }`}
         style={{ width: `${Math.min(service.slaProgress, 100)}%` }}
        />
       </div>
       <span className="text-xs text-text-muted">{service.slaProgress}%</span>
      </div>
     </div>
    </div>

    {/* Indicators */}
    <div className="flex items-center gap-2">
     {service.hasAlert && (
      <ExclamationTriangleIcon className="h-5 w-5 text-rose-400" />
     )}
     {service.actionTaken && (
      <CheckCircleIcon className="h-5 w-5 text-emerald-400" />
     )}
    </div>
   </div>

   {/* Hover Effect */}
   <div className="absolute inset-0 border border-mottu-500/0 group-hover:border-mottu-500/50 rounded-xl pointer-events-none transition-all duration-200" />
  </div>
 );
}
