import React from "react";
import { LogEntity } from "@/core/entities/log.entity";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface LogsTabProps {
 logs: LogEntity[];
}

export function LogsTab({ logs }: LogsTabProps) {
 if (!logs.length) {
  return (
   <div className="text-center py-10">
    <p className="text-text-secondary">Nenhum log para este serviço.</p>
   </div>
  );
 }

 return (
  <div className="font-mono text-sm bg-dark-tertiary p-4 rounded-lg border border-border-primary">
   {logs.map((log) => (
    <div key={log.id} className="flex items-start">
     <span className="text-mottu-500 mr-4">
      {format(log.timestamp, "HH:mm:ss", { locale: ptBR })}
     </span>
     <p className="text-text-secondary">{log.message}</p>
    </div>
   ))}
  </div>
 );
}
