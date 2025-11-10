"use client";

import React from "react";
import { ServiceEntity } from "@/core/entities/service.entity";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ServiceDetailTabs } from "../ServiceDetailTabs";

interface ServiceDetailDrawerProps {
 service: ServiceEntity | null;
 isOpen: boolean;
 onClose: () => void;
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

export function ServiceDetailDrawer({
 service,
 isOpen,
 onClose,
}: ServiceDetailDrawerProps) {
 if (!isOpen || !service) return null;

 return (
  <div className="w-full lg:w-2/5 xl:w-1/3 border-l border-border-primary bg-dark-secondary flex flex-col h-full">
   <div className="flex-shrink-0 flex items-center justify-between p-4 lg:p-6 border-b border-border-primary bg-dark-tertiary">
    <div className="flex-1 min-w-0">
     <h2 className="text-lg lg:text-xl font-bold text-text-primary truncate">
      {service.title}
     </h2>
     <p className="text-sm text-text-muted mt-1">{service.id}</p>
    </div>
    <button
     onClick={onClose}
     className="ml-4 p-2 rounded-lg hover:bg-dark-secondary transition-colors flex-shrink-0"
     aria-label="Fechar"
    >
     <XMarkIcon className="h-6 w-6 text-text-secondary hover:text-text-primary" />
    </button>
   </div>

   <div className="flex-1 overflow-hidden flex flex-col">
    <div className="flex-shrink-0 p-4 lg:p-6 space-y-4 border-b border-border-primary">
     <div className="grid grid-cols-2 gap-4">
      <div>
       <span className="text-sm text-text-muted">Status</span>
       <p className="text-base font-medium text-text-primary mt-1">
        {getStatusText(service.status)}
       </p>
      </div>
      <div>
       <span className="text-sm text-text-muted">Tipo</span>
       <p className="text-base font-medium text-text-primary mt-1">
        {service.type === "appropriation" ? "Apropriação" : "Chamado de Rua"}
       </p>
      </div>
      <div>
       <span className="text-sm text-text-muted">Filial</span>
       <p className="text-base font-medium text-text-primary mt-1">
        {service.branch}
       </p>
      </div>
      <div>
       <span className="text-sm text-text-muted">Prestador</span>
       <p className="text-base font-medium text-text-primary mt-1">
        {service.provider || "Não atribuído"}
       </p>
      </div>
     </div>

     <div>
      <span className="text-sm text-text-muted">Progresso SLA</span>
      <div className="mt-2">
       <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-text-muted">SLA: {service.sla}min</span>
        <span className="text-xs font-medium text-text-primary">
         {service.slaProgress}%
        </span>
       </div>
       <div className="w-full h-2 bg-dark-tertiary rounded-full overflow-hidden">
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
      </div>
     </div>
    </div>

    <div className="flex-1 overflow-hidden">
     <ServiceDetailTabs service={service} />
    </div>
   </div>
  </div>
 );
}
