import React from "react";
import { AlertEntity } from "@/core/entities/alert.entity";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AlertsTabProps {
 alerts: AlertEntity[];
}

export function AlertsTab({ alerts }: AlertsTabProps) {
 if (!alerts.length) {
  return (
   <div className="text-center py-10">
    <p className="text-text-secondary">Nenhum alerta para este serviço.</p>
   </div>
  );
 }

 const getSeverityClass = (
  severity: "low" | "medium" | "high" | "critical"
 ) => {
  switch (severity) {
   case "critical":
    return "bg-red-500/10 text-red-400";
   case "high":
    return "bg-orange-500/10 text-orange-400";
   case "medium":
    return "bg-yellow-500/10 text-yellow-400";
   case "low":
    return "bg-blue-500/10 text-blue-400";
  }
 };

 return (
  <div className="space-y-4">
   {alerts.map((alert) => (
    <div
     key={alert.id}
     className="bg-dark-tertiary p-4 rounded-lg border border-border-primary"
    >
     <div className="flex justify-between items-start">
      <p className="font-semibold text-text-primary">{alert.title}</p>
      <span
       className={`px-2 py-1 text-xs font-bold rounded-full ${getSeverityClass(
        alert.severity
       )}`}
      >
       {alert.severity}
      </span>
     </div>
     <p className="text-sm text-text-secondary mt-1">{alert.message}</p>
     <p className="text-xs text-text-muted mt-3">
      {format(alert.createdAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
     </p>
    </div>
   ))}
  </div>
 );
}
