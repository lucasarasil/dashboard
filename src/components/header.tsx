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
  <header className="bg-[#111414] border-b border-[#2A2D2D] shadow-lg shadow-black/20 flex-shrink-0">
   <div className="px-4 md:px-6 py-3 md:py-4 space-y-3 md:space-y-4">
    {/* Alertas críticos */}
    <div className="flex items-center justify-between">
     <div className="flex items-center gap-3">
      {criticalAlertsCount > 0 && (
       <div className="relative animate-pulse-green">
        <BellIcon className="h-5 w-5 text-[#FF5252]" />
        <span className="absolute -top-1 -right-1 bg-[#FF5252] text-[#0B0E0E] text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold shadow-lg shadow-[#FF5252]/50">
         {criticalAlertsCount}
        </span>
       </div>
      )}

      <div className="flex items-center gap-2 text-sm text-[#A7AFA9]">
       <ExclamationTriangleIcon className="h-4 w-4" />
       <span className="font-semibold text-[#FF5252]">
        {criticalAlertsCount}
       </span>
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
      <span className="w-2 h-2 bg-[#29B6F6] rounded-full shadow-sm shadow-[#29B6F6]/50"></span>
      <span className="text-[#A7AFA9] font-medium">
       {streetCallsCount} Chamados de Rua
      </span>
     </div>
     <div className="flex items-center gap-2">
      <span className="w-2 h-2 bg-[#FF5252] rounded-full shadow-sm shadow-[#FF5252]/50"></span>
      <span className="text-[#A7AFA9] font-medium">
       {appropriationsCount} Apropriações
      </span>
     </div>
     <div className="hidden sm:block text-[#3A3D3D]">•</div>
     <div className="text-[#E6E6E6] font-semibold">
      Total: {services.length} serviços ativos
     </div>
    </div>
   </div>
  </header>
 );
};

export default Header;
