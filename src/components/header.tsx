"use client";
import React from "react";
import { ExclamationTriangleIcon, BellIcon } from "@heroicons/react/24/outline";
import KPICards from "./kpi_card_list";
import HierarchicalFilters from "./hierarchical_filters";

interface HeaderProps {
 services: any[];
 onSearch: (term: string) => void;
 onFilterChange?: (filterKey: string) => void;
 onSupervisorChange: (id: string) => void;
 onLeaderChange: (id: string) => void;
 onStatusChange: (status: string) => void;
 criticalAlertsCount: number;
 streetCallsCount: number;
 appropriationsCount: number;
 selectedSupervisor: string;
 selectedLeader: string;
}

const Header: React.FC<HeaderProps> = ({
 services,
 onSearch,
 onSupervisorChange,
 onLeaderChange,
 onStatusChange,
 criticalAlertsCount,
 streetCallsCount,
 appropriationsCount,
 selectedSupervisor,
 selectedLeader,
}) => {
 const handleSearch = (term: string) => {
  onSearch(term);
 };

 return (
  <header className="bg-dark-secondary border-b border-border-primary shadow-lg flex-shrink-0">
   <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
     <div className="flex items-center gap-3">
      {criticalAlertsCount > 0 && (
       <div className="relative animate-pulse-green">
        <BellIcon className="h-5 w-5 text-red-500" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-dark-primary text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-lg shadow-red-500/50">
         {criticalAlertsCount}
        </span>
       </div>
      )}

      <div className="flex items-center gap-2 text-sm text-text-secondary">
       <ExclamationTriangleIcon className="h-4 w-4" />
       <span className="font-semibold text-red-500">{criticalAlertsCount}</span>
       <span>críticos</span>
      </div>
     </div>
    </div>

    {/* KPIs */}
    <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
     <div className="min-w-max md:min-w-0">
      <KPICards services={services} />
     </div>
    </div>

    {/* Filtros */}
    <div>
     <HierarchicalFilters
      onSupervisorChange={onSupervisorChange}
      onLeaderChange={onLeaderChange}
      onStatusChange={onStatusChange}
      onSearch={handleSearch}
      services={services}
      selectedSupervisor={selectedSupervisor}
      selectedLeader={selectedLeader}
     />
    </div>

    {/* Estatísticas */}
    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm pb-1">
     <div className="flex items-center gap-2">
      <span className="w-2 h-2 bg-blue-500 rounded-full shadow-sm shadow-blue-500/50"></span>
      <span className="text-text-secondary font-medium">
       {streetCallsCount} Chamados de Rua
      </span>
     </div>
     <div className="flex items-center gap-2">
      <span className="w-2 h-2 bg-red-500 rounded-full shadow-sm shadow-red-500/50"></span>
      <span className="text-text-secondary font-medium">
       {appropriationsCount} Apropriações
      </span>
     </div>
     <div className="hidden sm:block text-text-muted">•</div>
     <div className="text-text-primary font-semibold">
      Total: {services.length} serviços ativos
     </div>
    </div>
   </div>
  </header>
 );
};

export default Header;
