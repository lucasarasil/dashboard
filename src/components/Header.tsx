"use client";
import React from "react";
import { ExclamationTriangleIcon, BellIcon } from "@heroicons/react/24/outline";
import KPICards from "./KPICards";
import HierarchicalFilters from "./HierarchicalFilters";
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
 onFilterChange: _onFilterChange,
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
  <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
   <div className="px-3 md:px-6 py-2 md:py-3 space-y-2 md:space-y-3">
    {/* Primeira linha - Título e Alertas */}
    <div className="flex items-center justify-between">
     <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
      Dashboard Operacional
     </h1>

     <div className="flex items-center space-x-2 md:space-x-3">
      {/* Badge de alertas críticos */}
      {criticalAlertsCount > 0 && (
       <div className="relative">
        <BellIcon className="h-4 w-4 md:h-5 md:w-5 text-red-500" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] md:text-xs rounded-full h-3.5 w-3.5 md:h-4 md:w-4 flex items-center justify-center font-medium">
         {criticalAlertsCount}
        </span>
       </div>
      )}

      <div className="flex items-center space-x-1.5 text-[11px] md:text-sm text-gray-600">
       <ExclamationTriangleIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
       <span className="font-medium">{criticalAlertsCount} críticos</span>
      </div>
     </div>
    </div>

    {/* KPIs - Scroll horizontal em telas pequenas */}
    <div className="overflow-x-auto -mx-3 px-3 md:mx-0 md:px-0 scrollbar-hide">
     <div className="min-w-max md:min-w-0">
      <KPICards services={services} />
     </div>
    </div>

    {/* Filtros hierárquicos */}
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

    {/* Estatísticas rápidas */}
    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[11px] md:text-sm pb-1">
     <div className="flex items-center space-x-1.5">
      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
      <span className="text-gray-600 font-medium">
       {streetCallsCount} Chamados de Rua
      </span>
     </div>
     <div className="flex items-center space-x-1.5">
      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
      <span className="text-gray-600 font-medium">
       {appropriationsCount} Apropriações
      </span>
     </div>
     <div className="hidden sm:block text-gray-400">•</div>
     <div className="text-gray-600 font-medium">
      Total: {services.length} serviços ativos
     </div>
    </div>
   </div>
  </header>
 );
};

export default Header;
