import React from "react";
import {
 ClockIcon,
 UserIcon,
 CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Service } from "../../types/service";

type TimelineEventType = "system" | "manual" | string;

interface TimelineEvent {
 id: string;
 action: string;
 timestamp: string;
 responsible?: string;
 details?: string;
 user?: string;
 type: TimelineEventType;
}

const isTimelineLike = (
 entry: unknown
): entry is Partial<TimelineEvent> & {
 id?: string | number;
 action?: string;
 timestamp?: string;
} => {
 if (typeof entry !== "object" || entry === null) {
  return false;
 }

 const candidate = entry as Record<string, unknown>;
 return (
  typeof candidate.action === "string" &&
  typeof candidate.timestamp === "string"
 );
};

const normalizeId = (id: string | number | undefined, fallback: string) =>
 id !== undefined ? String(id) : fallback;

interface TimelineTabProps {
 service: Service;
}

const TimelineTab: React.FC<TimelineTabProps> = ({ service }) => {
 // Gerar timeline completa com eventos do serviço
 const generateTimelineEvents = (service: Service): TimelineEvent[] => {
  const events: TimelineEvent[] = [];

  // Evento de abertura
  events.push({
   id: "opening",
   action: "Serviço aberto",
   timestamp: new Date(Date.now() - service.elapsedTime * 60000).toISOString(),
   responsible: "Sistema Automático",
   type: "system",
  });

  // Evento de encaminhamento
  if (service.driver) {
   events.push({
    id: "assignment",
    action: "Serviço encaminhado",
    timestamp: new Date(
     Date.now() - (service.elapsedTime - 30) * 60000
    ).toISOString(),
    responsible: "Sistema Automático",
    details: `Encaminhado para ${service.driver}`,
    type: "system",
   });
  }

  // Evento de aceitação (se não está aberto)
  if (service.status !== "open") {
   events.push({
    id: "acceptance",
    action: "Serviço aceito",
    timestamp: new Date(
     Date.now() - (service.elapsedTime - 15) * 60000
    ).toISOString(),
    responsible: service.driver || "Prestador",
    details: "Prestador aceitou o serviço",
    type: "manual",
   });
  }

  // Eventos de histórico existentes
  if (Array.isArray(service.history)) {
   events.push(
    ...service.history.map((event) => ({
     id: normalizeId(event.id, `history-${event.action}-${event.timestamp}`),
     action: event.action,
     timestamp: event.timestamp,
     responsible: event.responsible,
     details:
      "details" in event ? (event as { details?: string }).details : undefined,
     type: "system",
    }))
   );
  }

  // Logs existentes
  if (Array.isArray(service.logs)) {
   events.push(
    ...service.logs.filter(isTimelineLike).map((log) => ({
     id: normalizeId(log.id, `log-${log.action}-${log.timestamp}`),
     action: log.action!,
     timestamp: log.timestamp!,
     responsible: log.responsible,
     details: log.details,
     user: log.user,
     type: (log.type as TimelineEventType) ?? "manual",
    }))
   );
  }

  return events.sort(
   (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
 };

 const timelineEvents = generateTimelineEvents(service);

 const getEventIcon = (type) => {
  switch (type) {
   case "system":
    return <ClockIcon className="h-4 w-4 text-blue-400" />;
   case "manual":
    return <CheckCircleIcon className="h-4 w-4 text-mottu-500" />;
   default:
    return <ClockIcon className="h-4 w-4 text-text-muted" />;
  }
 };

 const getEventColor = (type) => {
  switch (type) {
   case "system":
    return "bg-blue-500/10 border-blue-500/30";
   case "manual":
    return "bg-mottu-500/10 border-mottu-500/30";
   default:
    return "bg-dark-tertiary/50 border-border-primary";
  }
 };

 return (
  <div className="h-full overflow-y-auto p-6">
   <div className="space-y-4">
    {timelineEvents.map((event, index) => (
     <div key={event.id} className="relative">
      {/* Timeline line */}
      {index < timelineEvents.length - 1 && (
       <div className="absolute left-4 top-8 w-0.5 h-16 bg-border-primary"></div>
      )}

      <div
       className={`relative flex items-start space-x-4 p-4 rounded-lg border ${getEventColor(
        event.type
       )}`}
      >
       {/* Event icon */}
       <div className="flex-shrink-0 w-8 h-8 bg-dark-secondary rounded-full flex items-center justify-center border-2 border-current">
        {getEventIcon(event.type)}
       </div>

       {/* Event content */}
       <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
         <h4 className="text-sm font-medium text-text-primary">
          {event.action}
         </h4>
         <time className="text-xs text-text-muted">
          {new Date(event.timestamp).toLocaleString("pt-BR")}
         </time>
        </div>

        {event.details && (
         <p className="text-sm text-text-secondary mt-1">{event.details}</p>
        )}

        <div className="mt-1 flex items-center space-x-2">
         <UserIcon className="h-3 w-3 text-text-muted" />
         <span className="text-xs text-text-secondary">
          {event.responsible || event.user}
         </span>
         <span className="text-xs text-text-muted">
          • {event.type === "system" ? "Sistema" : "Manual"}
         </span>
        </div>
       </div>
      </div>
     </div>
    ))}
   </div>

   {timelineEvents.length === 0 && (
    <div className="text-center py-8">
     <ClockIcon className="mx-auto h-12 w-12 text-text-muted mb-4" />
     <h4 className="text-lg font-medium text-text-primary mb-2">
      Nenhum evento registrado
     </h4>
     <p className="text-text-secondary">
      A timeline aparecerá aqui conforme eventos são registrados.
     </p>
    </div>
   )}
  </div>
 );
};

export default TimelineTab;
