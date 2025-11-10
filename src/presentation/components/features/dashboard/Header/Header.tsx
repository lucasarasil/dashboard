// Header refatorado com Clean Architecture
"use client";

import React, { useState } from "react";
import { ServiceEntity } from "@/core/entities/service.entity";
import { KpiCard } from "@/presentation/components/common/KpiCard";
import { ThemeToggle } from "@/presentation/components/common/ThemeToggle";
import {
 MagnifyingGlassIcon,
 ExclamationTriangleIcon,
 ClockIcon,
 DocumentTextIcon,
 BellIcon,
 UserGroupIcon,
 TruckIcon,
} from "@heroicons/react/24/outline";

export interface HeaderProps {
 services: ServiceEntity[];
 onSearch?: (term: string) => void;
}

export function Header({ services, onSearch }: HeaderProps) {
 const [searchTerm, setSearchTerm] = useState("");

 const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  setSearchTerm(value);
  onSearch?.(value);
 };

 // Calcular KPIs
 const totalActive = services.length;
 const criticalCount = services.filter(
  (s) => s.status === "critical" || s.hasAlert
 ).length;
 const criticalPercentage =
  totalActive > 0 ? Math.round((criticalCount / totalActive) * 100) : 0;

 const slaMet = services.filter((s) => s.slaProgress >= 80).length;
 const slaPercentage =
  totalActive > 0 ? Math.round((slaMet / totalActive) * 100) : 0;

 const appropriationsFinished = services.filter(
  (s) => s.type === "appropriation" && s.status === "completed"
 ).length;

 const streetCallsOpen = services.filter(
  (s) => s.type === "street_call" && s.status === "open"
 ).length;

 const alertsNotTreated = services.filter((s) => s.hasAlert).length;

 const servicesOpen = services.filter((s) => s.status === "open").length;

 const offlineProviders = Math.min(
  services.filter((s) => !s.provider).length,
  15
 );

 const kpis = [
  {
   title: "Criticidade",
   value: `${criticalPercentage}%`,
   subtitle: `${criticalCount} críticos`,
   color: criticalPercentage > 20 ? "text-rose-400" : "text-amber-400",
   bgColor: criticalPercentage > 20 ? "bg-rose-500/10" : "bg-amber-500/10",
   borderColor:
    criticalPercentage > 20 ? "border-rose-400/20" : "border-amber-400/20",
   trend: criticalPercentage > 20 ? ("up" as const) : ("down" as const),
   trendValue: `${criticalCount}`,
   icon: <ExclamationTriangleIcon className="h-6 w-6" />,
  },
  {
   title: "Cumprimento SLA",
   value: `${slaPercentage}%`,
   subtitle: `${slaMet}/${totalActive}`,
   color: slaPercentage >= 85 ? "text-emerald-400" : "text-amber-400",
   bgColor: slaPercentage >= 85 ? "bg-emerald-500/10" : "bg-amber-500/10",
   borderColor:
    slaPercentage >= 85 ? "border-emerald-400/20" : "border-amber-400/20",
   trend: slaPercentage >= 85 ? ("up" as const) : ("neutral" as const),
   icon: <ClockIcon className="h-6 w-6" />,
  },
  {
   title: "Apropriações Finalizadas",
   value: appropriationsFinished,
   color: "text-mottu-500",
   bgColor: "bg-mottu-500/10",
   borderColor: "border-mottu-400/20",
   icon: <DocumentTextIcon className="h-6 w-6" />,
  },
  {
   title: "Chamados de Rua",
   value: streetCallsOpen,
   color: streetCallsOpen > 10 ? "text-rose-400" : "text-amber-400",
   bgColor: streetCallsOpen > 10 ? "bg-rose-500/10" : "bg-amber-500/10",
   borderColor:
    streetCallsOpen > 10 ? "border-rose-400/20" : "border-amber-400/20",
   trend: streetCallsOpen > 10 ? ("up" as const) : ("neutral" as const),
   icon: <TruckIcon className="h-6 w-6" />,
  },
  {
   title: "Alertas Não Tratados",
   value: alertsNotTreated,
   color: "text-amber-400",
   bgColor: "bg-amber-500/10",
   borderColor: "border-amber-400/20",
   icon: <BellIcon className="h-6 w-6" />,
  },
  {
   title: "Abertos",
   value: servicesOpen,
   color: "text-blue-400",
   bgColor: "bg-blue-500/10",
   borderColor: "border-blue-400/20",
   icon: <DocumentTextIcon className="h-6 w-6" />,
  },
  {
   title: "Prestadores Offline",
   value: offlineProviders,
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
   icon: <UserGroupIcon className="h-6 w-6" />,
  },
 ];

 return (
  <div className="bg-dark-secondary border-b border-border-primary">
   <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-5 space-y-4 lg:space-y-5">
    {/* Search Bar with Theme Toggle */}
    <div className="flex items-center gap-4">
     <div className="flex-1 relative">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
      <input
       type="text"
       placeholder="Buscar por ID, placa, filial ou motorista..."
       value={searchTerm}
       onChange={handleSearchChange}
       className="w-full pl-10 pr-4 py-2.5 bg-dark-tertiary border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-mottu-500 focus:border-transparent"
      />
     </div>
     <ThemeToggle />
    </div>

    {/* KPIs */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 lg:gap-4">
     {kpis.map((kpi, index) => (
      <KpiCard key={index} {...kpi} />
     ))}
    </div>
   </div>
  </div>
 );
}
