import React from "react";
import { ActionEntity } from "@/core/entities/action.entity";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface HistoryTabProps {
 history: ActionEntity[];
}

export function HistoryTab({ history }: HistoryTabProps) {
 if (!history.length) {
  return (
   <div className="text-center py-10">
    <p className="text-text-secondary">
     Nenhum evento de histórico para este serviço.
    </p>
   </div>
  );
 }

 return (
  <ul className="space-y-4">
   {history.map((event) => (
    <li key={event.id} className="border-l-2 border-mottu-500 pl-4">
     <p className="font-semibold text-text-primary">{event.type}</p>
     <p className="text-sm text-text-secondary">{event.description}</p>
     <p className="text-xs text-text-muted mt-1">
      {format(event.timestamp, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })} por{" "}
      {event.responsible}
     </p>
    </li>
   ))}
  </ul>
 );
}
