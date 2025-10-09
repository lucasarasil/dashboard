import React, { useState } from "react";
import {
 MagnifyingGlassIcon,
 FunnelIcon,
 ExclamationTriangleIcon,
 BellIcon,
} from "@heroicons/react/24/outline";
import KPICards from "./KPICards";
import HierarchicalFilters from "./HierarchicalFilters";

interface HeaderProps {
 services: any[];
 onSearch: (term: string) => void;
 onFilterChange: (filterKey: string) => void;
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
 onFilterChange,
 onSupervisorChange,
 onLeaderChange,
 onStatusChange,
 criticalAlertsCount,
 streetCallsCount,
 appropriationsCount,
 selectedSupervisor,
 selectedLeader,
}) => {
 const [searchTerm, setSearchTerm] = useState("");
 const [activeFilter, setActiveFilter] = useState("all");

 const handleSearch = (term: string) => {
  setSearchTerm(term);
  onSearch(term);
 };

 const handleFilterClick = (filterKey: string) => {
  setActiveFilter(filterKey);
  onFilterChange(filterKey);
 };

 return (
  <header className="bg-white border-b border-gray-200 px-6 py-4">
   {/* Primeira linha - Título e KPIs */}
   <div className="flex items-center justify-between mb-6">
    <h1 className="text-3xl font-bold text-gray-900">Dashboard Operacional</h1>

    <div className="flex items-center space-x-4">
     {/* Badge de alertas críticos */}
     {criticalAlertsCount > 0 && (
      <div className="relative">
       <BellIcon className="h-6 w-6 text-red-500" />
       <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
        {criticalAlertsCount}
       </span>
      </div>
     )}

     <div className="flex items-center space-x-2 text-sm text-gray-600">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <span>{criticalAlertsCount} críticos</span>
     </div>
    </div>
   </div>

   {/* KPIs */}
   <div className="mb-6">
    <KPICards services={services} />
   </div>

   {/* Filtros hierárquicos */}
   <div className="mb-4">
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
   <div className="flex items-center space-x-6 text-sm">
    <div className="flex items-center space-x-1">
     <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
     <span className="text-gray-600">{streetCallsCount} Chamados de Rua</span>
    </div>
    <div className="flex items-center space-x-1">
     <span className="w-2 h-2 bg-red-500 rounded-full"></span>
     <span className="text-gray-600">{appropriationsCount} Apropriações</span>
    </div>
    <div className="text-gray-400">•</div>
    <div className="text-gray-600">
     Total: {services.length} serviços ativos
    </div>
   </div>
  </header>
 );
};

export default Header;
