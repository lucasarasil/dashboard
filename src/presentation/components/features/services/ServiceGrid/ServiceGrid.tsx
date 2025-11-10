// ServiceGrid refatorado para Clean Architecture
"use client";

import React from "react";
import { ServiceEntity } from "@/core/entities/service.entity";
import { ServiceCard } from "../ServiceCard";

interface ServiceGridProps {
 services: ServiceEntity[];
 onServiceSelect?: (service: ServiceEntity) => void;
 isLoading?: boolean;
}

export function ServiceGrid({
 services,
 onServiceSelect,
 isLoading = false,
}: ServiceGridProps) {
 if (isLoading) {
  return (
   <div className="flex items-center justify-center h-full">
    <div className="text-center">
     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mottu-500 mx-auto mb-4" />
     <p className="text-text-secondary">Carregando serviços...</p>
    </div>
   </div>
  );
 }

 if (services.length === 0) {
  return (
   <div className="flex items-center justify-center h-full">
    <div className="text-center">
     <svg
      className="mx-auto h-12 w-12 text-text-muted"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
     >
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth={2}
       d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
     </svg>
     <h3 className="mt-2 text-sm font-medium text-text-primary">
      Nenhum serviço encontrado
     </h3>
     <p className="mt-1 text-sm text-text-muted">
      Tente ajustar os filtros ou buscar por outro termo
     </p>
    </div>
   </div>
  );
 }

 return (
  <div className="h-full overflow-auto">
   <div className="p-4 lg:p-6 xl:p-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
     {services.map((service) => (
      <ServiceCard
       key={service.id}
       service={service}
       onClick={onServiceSelect}
      />
     ))}
    </div>
   </div>
  </div>
 );
}
