import React, { useMemo } from "react";
import {
 ExclamationTriangleIcon,
 UserGroupIcon,
 CheckCircleIcon,
 BellIcon,
 ArrowTrendingUpIcon,
 ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";

interface KPICardsProps {
 services: any[];
}

const KPICards: React.FC<KPICardsProps> = ({ services }) => {
 const kpis = useMemo(() => {
  const totalActive = services.length;
  const criticalCount = services.filter(
   (s: any) => s.status === "critical" || s.hasAlert
  ).length;
  const criticalPercentage =
   totalActive > 0 ? Math.round((criticalCount / totalActive) * 100) : 0;

  const slaMet = services.filter((s: any) => s.slaProgress >= 80).length;
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

  const idleProviders = Math.min(
   services.filter((s: any) => s.status === "open").length,
   10
  );
  const offlineProviders = Math.min(
   services.filter((s: any) => !s.driver).length,
   10
  );

  // Psicologia das cores para dark mode
  const kpis = [
   {
    title: "% Críticos",
    value: `${criticalPercentage}%`,
    icon: ExclamationTriangleIcon,
    color: criticalPercentage > 20 ? "text-rose-400" : "text-amber-400",
    bgColor: criticalPercentage > 20 ? "bg-rose-500/10" : "bg-amber-500/10",
    borderColor:
     criticalPercentage > 20 ? "border-rose-400/20" : "border-amber-400/20",
    trend: criticalPercentage > 20 ? ("up" as const) : ("down" as const),
   },
   {
    title: "% SLA Cumprido",
    value: `${slaPercentage}%`,
    icon: CheckCircleIcon,
    color: slaPercentage >= 80 ? "text-emerald-400" : "text-amber-400",
    bgColor: slaPercentage >= 80 ? "bg-emerald-500/10" : "bg-amber-500/10",
    borderColor:
     slaPercentage >= 80 ? "border-emerald-400/20" : "border-amber-400/20",
    trend: slaPercentage >= 80 ? ("up" as const) : ("down" as const),
   },
   {
    title: "Apropriações Finalizadas",
    value: appropriationsFinished,
    icon: CheckCircleIcon,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-400/20",
    trend: "up" as const,
   },
   {
    title: "Chamados Abertos",
    value: streetCallsOpen,
    icon: ExclamationTriangleIcon,
    color: streetCallsOpen > 10 ? "text-rose-400" : "text-amber-400",
    bgColor: streetCallsOpen > 10 ? "bg-rose-500/10" : "bg-amber-500/10",
    borderColor:
     streetCallsOpen > 10 ? "border-rose-400/20" : "border-amber-400/20",
    trend: streetCallsOpen > 10 ? ("up" as const) : ("neutral" as const),
   },
   {
    title: "Alertas Não Tratados",
    value: alertsNotTreated,
    icon: BellIcon,
    color: alertsNotTreated > 5 ? "text-rose-400" : "text-amber-400",
    bgColor: alertsNotTreated > 5 ? "bg-rose-500/10" : "bg-amber-500/10",
    borderColor:
     alertsNotTreated > 5 ? "border-rose-400/20" : "border-amber-400/20",
    trend: alertsNotTreated > 5 ? ("up" as const) : ("down" as const),
   },
   {
    title: "Prestadores Offline",
    value: offlineProviders,
    icon: UserGroupIcon,
    color:
     offlineProviders > 5
      ? "text-rose-400"
      : offlineProviders > 3
      ? "text-amber-400"
      : "text-emerald-400",
    bgColor:
     offlineProviders > 5
      ? "bg-rose-500/10"
      : offlineProviders > 3
      ? "bg-amber-500/10"
      : "bg-emerald-500/10",
    borderColor:
     offlineProviders > 5
      ? "border-rose-400/20"
      : offlineProviders > 3
      ? "border-amber-400/20"
      : "border-emerald-400/20",
    trend:
     offlineProviders > 5
      ? ("up" as const)
      : offlineProviders > 3
      ? ("neutral" as const)
      : ("down" as const),
   },
   {
    title: "Prestadores Ociosos",
    value: idleProviders,
    icon: UserGroupIcon,
    color: idleProviders > 3 ? "text-rose-400" : "text-blue-400",
    bgColor: idleProviders > 3 ? "bg-rose-500/10" : "bg-blue-500/10",
    borderColor:
     idleProviders > 3 ? "border-rose-400/20" : "border-blue-400/20",
    trend: idleProviders > 3 ? ("up" as const) : ("down" as const),
   },
  ];

  return kpis;
 }, [services]);

 const getTrendIcon = (trend: "up" | "down" | "neutral") => {
  switch (trend) {
   case "up":
    return ArrowTrendingUpIcon;
   case "down":
    return ArrowTrendingDownIcon;
   default:
    return null;
  }
 };

 return (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
   {kpis.map((kpi, index) => {
    const TrendIcon = getTrendIcon(kpi.trend);

    return (
     <div
      key={index}
      className={`group flex items-center space-x-3 px-3 py-3 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/20 ${kpi.bgColor} ${kpi.borderColor} hover:border-emerald-400/30 relative overflow-hidden`}
     >
      {/* Efeito de gradiente sutil no hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="flex items-center space-x-3 relative z-10 flex-1 min-w-0">
       <div
        className={`p-2 rounded-lg bg-black/20 border border-[#2A2D2D] group-hover:border-emerald-400/20 transition-colors duration-300`}
       >
        <kpi.icon
         className={`h-4 w-4 ${kpi.color} transition-colors duration-300`}
        />
       </div>

       <div className="flex flex-col min-w-0 flex-1">
        <div
         className={`text-lg font-bold ${kpi.color} leading-tight transition-colors duration-300`}
        >
         {kpi.value}
        </div>
        <div className="text-xs text-slate-400 truncate leading-tight group-hover:text-slate-300 transition-colors duration-300">
         {kpi.title}
        </div>
       </div>

       {/* Ícone de tendência */}
       {TrendIcon && (
        <TrendIcon className={`h-3 w-3 ${kpi.color} opacity-70`} />
       )}
      </div>
     </div>
    );
   })}
  </div>
 );
};

export default KPICards;
