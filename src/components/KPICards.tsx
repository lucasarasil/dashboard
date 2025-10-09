import React from "react";
import {
 ExclamationTriangleIcon,
 UserGroupIcon,
 CheckCircleIcon,
 BellIcon,
} from "@heroicons/react/24/outline";

interface KPICardsProps {
 services: any[];
}

const KPICards: React.FC<KPICardsProps> = ({ services }) => {
 const totalActive = services.length;
 const criticalCount = services.filter(
  (s: any) => s.status === "critical" || s.hasAlert
 ).length;
 const criticalPercentage =
  totalActive > 0 ? Math.round((criticalCount / totalActive) * 100) : 0;

 const slaMet = services.filter((s: any) => s.slaProgress < 80).length;
 const slaPercentage =
  totalActive > 0 ? Math.round((slaMet / totalActive) * 100) : 0;

 // KPIs adicionais
 const appropriationsFinished = services.filter(
  (s: any) => s.serviceType === "appropriation" && s.status === "completed"
 ).length;
 const streetCallsOpen = services.filter(
  (s: any) => s.serviceType === "street_call" && s.status === "open"
 ).length;
 const alertsNotTreated = services.filter(
  (s: any) => s.hasAlert && !s.actionTaken
 ).length;
 const idleProviders = Math.floor(Math.random() * 5) + 1; // Mock: 1-5 prestadores ociosos
 const offlineProviders = Math.floor(Math.random() * 8) + 2; // Mock: 2-10 prestadores offline

 const kpis = [
  {
   title: "% Críticos",
   value: `${criticalPercentage}%`,
   icon: ExclamationTriangleIcon,
   color: criticalPercentage > 20 ? "text-red-600" : "text-orange-600",
   bgColor: criticalPercentage > 20 ? "bg-red-50" : "bg-orange-50",
   borderColor:
    criticalPercentage > 20 ? "border-red-200" : "border-orange-200",
  },
  {
   title: "% SLA Cumprido",
   value: `${slaPercentage}%`,
   icon: CheckCircleIcon,
   color: slaPercentage > 80 ? "text-green-600" : "text-yellow-600",
   bgColor: slaPercentage > 80 ? "bg-green-50" : "bg-yellow-50",
   borderColor: slaPercentage > 80 ? "border-green-200" : "border-yellow-200",
  },
  {
   title: "Apropriações Finalizadas",
   value: appropriationsFinished,
   icon: CheckCircleIcon,
   color: "text-green-600",
   bgColor: "bg-green-50",
   borderColor: "border-green-200",
  },
  {
   title: "Chamados Abertos",
   value: streetCallsOpen,
   icon: ExclamationTriangleIcon,
   color: streetCallsOpen > 10 ? "text-red-600" : "text-orange-600",
   bgColor: streetCallsOpen > 10 ? "bg-red-50" : "bg-orange-50",
   borderColor: streetCallsOpen > 10 ? "border-red-200" : "border-orange-200",
  },
  {
   title: "Alertas Não Tratados",
   value: alertsNotTreated,
   icon: BellIcon,
   color: alertsNotTreated > 5 ? "text-red-600" : "text-yellow-600",
   bgColor: alertsNotTreated > 5 ? "bg-red-50" : "bg-yellow-50",
   borderColor: alertsNotTreated > 5 ? "border-red-200" : "border-yellow-200",
  },
  {
   title: "Prestadores Offline",
   value: offlineProviders,
   icon: UserGroupIcon,
   color:
    offlineProviders > 5
     ? "text-red-600"
     : offlineProviders > 3
     ? "text-yellow-600"
     : "text-green-600",
   bgColor:
    offlineProviders > 5
     ? "bg-red-50"
     : offlineProviders > 3
     ? "bg-yellow-50"
     : "bg-green-50",
   borderColor:
    offlineProviders > 5
     ? "border-red-200"
     : offlineProviders > 3
     ? "border-yellow-200"
     : "border-green-200",
  },
  {
   title: "Prestadores Ociosos",
   value: idleProviders,
   icon: UserGroupIcon,
   color: idleProviders > 3 ? "text-red-600" : "text-blue-600",
   bgColor: idleProviders > 3 ? "bg-red-50" : "bg-blue-50",
   borderColor: idleProviders > 3 ? "border-red-200" : "border-blue-200",
  },
 ];

 return (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
   {kpis.map((kpi, index) => (
    <div
     key={index}
     className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${kpi.bgColor} ${kpi.borderColor}`}
    >
     <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
     <div className="flex flex-col min-w-0">
      <div className={`text-lg font-bold ${kpi.color}`}>{kpi.value}</div>
      <div className="text-xs text-gray-600 truncate">{kpi.title}</div>
     </div>
    </div>
   ))}
  </div>
 );
};

export default KPICards;
