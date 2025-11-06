"use client";
import React, { useState } from "react";
import {
 ChevronDownIcon,
 MagnifyingGlassIcon,
 FunnelIcon,
} from "@heroicons/react/24/outline";

interface HierarchicalFiltersProps {
 onSupervisorChange: (id: string) => void;
 onLeaderChange: (id: string) => void;
 onStatusChange: (status: string) => void;
 onSearch: (term: string) => void;
 services: any[];
 selectedSupervisor: string;
 selectedLeader: string;
}

const HierarchicalFilters: React.FC<HierarchicalFiltersProps> = ({
 onSupervisorChange,
 onLeaderChange,
 onStatusChange,
 onSearch,
 services,
 selectedSupervisor,
 selectedLeader,
}) => {
 const [selectedStatus, setSelectedStatus] = useState("all");
 const [searchTerm, setSearchTerm] = useState("");

 // Mock data para supervisores e líderes baseados em filiais
 const supervisors = [
  {
   id: "sup1",
   name: "João Silva",
   branches: ["Jandira", "Curitiba", "Jacarepaguá"],
   leaders: [
    { id: "led1", name: "Maria Santos", branch: "Jandira" },
    { id: "led2", name: "Pedro Costa", branch: "Curitiba" },
   ],
  },
  {
   id: "sup2",
   name: "Ana Lima",
   branches: ["Ponta Grossa", "Santos", "Limão-Zona N"],
   leaders: [
    { id: "led3", name: "Carlos Oliveira", branch: "Ponta Grossa" },
    { id: "led4", name: "Lucia Ferreira", branch: "Santos" },
   ],
  },
  {
   id: "sup3",
   name: "Roberto Alves",
   branches: ["Feira de Santa", "Itajai", "Goiânia"],
   leaders: [
    { id: "led5", name: "Fernanda Souza", branch: "Feira de Santa" },
    { id: "led6", name: "Marcos Pereira", branch: "Itajai" },
   ],
  },
 ];

 const statusOptions = [
  { key: "all", label: "Todos", count: services.length },
  {
   key: "open",
   label: "Aberto",
   count: services.filter((s: any) => s.status === "open").length,
  },
  {
   key: "in_progress",
   label: "Em andamento",
   count: services.filter((s: any) => s.status === "in_progress").length,
  },
  {
   key: "critical",
   label: "Crítico",
   count: services.filter((s: any) => s.status === "critical").length,
  },
  {
   key: "not_assigned",
   label: "Não encaminhado",
   count: services.filter((s: any) => !s.driver).length,
  },
  {
   key: "not_accepted",
   label: "Não aceito",
   count: services.filter((s: any) => s.needsReview).length,
  },
  {
   key: "completed_today",
   label: "Finalizado hoje",
   count: services.filter((s: any) => s.status === "completed").length,
  },
 ];

 const selectedSupervisorData = supervisors.find(
  (s: any) => s.id === selectedSupervisor
 );

 const handleSupervisorChange = (supervisorId: string) => {
  onSupervisorChange(supervisorId);
 };

 const handleLeaderChange = (leaderId: string) => {
  onLeaderChange(leaderId);
 };

 const handleStatusChange = (status: string) => {
  setSelectedStatus(status);
  onStatusChange(status);
 };

 const handleSearch = (e: React.FormEvent) => {
  e.preventDefault();
  onSearch(searchTerm);
 };

 return (
  <div className="space-y-3">
   {/* Linha 1: Dropdowns e Busca */}
   <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
    <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
     <FunnelIcon className="h-4 w-4 md:h-5 md:w-5 text-text-muted" />

     {/* Dropdown Supervisor */}
     <div className="relative flex-1 sm:flex-initial">
      <select
       value={selectedSupervisor}
       onChange={(e) => handleSupervisorChange(e.target.value)}
       className="w-full sm:w-auto appearance-none bg-dark-tertiary border border-border-primary text-text-primary rounded-lg px-3 md:px-4 py-1.5 md:py-2 pr-8 text-xs md:text-sm focus:ring-2 focus:ring-mottu-500/50 focus:border-mottu-500 transition-colors"
      >
       <option value="">Supervisor</option>
       {supervisors.map((supervisor) => (
        <option key={supervisor.id} value={supervisor.id}>
         {supervisor.name}
        </option>
       ))}
      </select>
      <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-text-muted pointer-events-none" />
     </div>

     {/* Dropdown Líder */}
     <div className="relative flex-1 sm:flex-initial">
      <select
       value={selectedLeader}
       onChange={(e) => handleLeaderChange(e.target.value)}
       disabled={!selectedSupervisor}
       className={`w-full sm:w-auto appearance-none border rounded-lg px-3 md:px-4 py-1.5 md:py-2 pr-8 text-xs md:text-sm focus:ring-2 focus:ring-mottu-500/50 focus:border-mottu-500 transition-colors ${
        !selectedSupervisor
         ? "bg-dark-primary border-border-primary text-text-muted cursor-not-allowed"
         : "bg-dark-tertiary border-border-primary text-text-primary"
       }`}
      >
       <option value="">Líder</option>
       {selectedSupervisorData?.leaders.map((leader) => (
        <option key={leader.id} value={leader.id}>
         {leader.name}
        </option>
       ))}
      </select>
      <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-text-muted pointer-events-none" />
     </div>
    </div>

    {/* Busca */}
    <form onSubmit={handleSearch} className="relative flex-1 sm:max-w-xs">
     <div className="relative">
      <MagnifyingGlassIcon className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 md:h-4 md:w-4 text-text-muted" />
      <input
       type="text"
       placeholder="Buscar..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 bg-dark-tertiary border border-border-primary text-text-primary placeholder:text-text-muted rounded-lg text-xs md:text-sm focus:ring-2 focus:ring-mottu-500/50 focus:border-mottu-500 transition-colors"
      />
     </div>
    </form>
   </div>

   {/* Linha 2: Status - Scroll horizontal em mobile */}
   <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
    <div className="flex space-x-1 md:space-x-2 min-w-max md:min-w-0">
     {statusOptions.map((status) => (
      <button
       key={status.key}
       onClick={() => handleStatusChange(status.key)}
       className={`px-2 md:px-3 py-1.5 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap border ${
        selectedStatus === status.key
         ? "bg-mottu-500/10 text-mottu-500 border-mottu-500/30 shadow-sm"
         : "bg-dark-tertiary text-text-secondary border-border-primary hover:bg-dark-hover hover:text-text-primary hover:border-border-secondary"
       }`}
      >
       {status.label}
       <span
        className={`ml-1 md:ml-2 px-1.5 md:px-2 py-0.5 rounded-full text-[10px] md:text-xs font-semibold ${
         selectedStatus === status.key
          ? "bg-mottu-500/20 text-mottu-400"
          : "bg-dark-hover text-text-muted"
        }`}
       >
        {status.count}
       </span>
      </button>
     ))}
    </div>
   </div>
  </div>
 );
};

export default HierarchicalFilters;
