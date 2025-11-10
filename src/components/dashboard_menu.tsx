import React from "react";
import {
 HeartIcon,
 ChartBarIcon,
 ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface DashboardMenuProps {
 activeDashboard: string;
 onDashboardChange: (dashboardId: string) => void;
 isOpen: boolean;
}

const DashboardMenu: React.FC<DashboardMenuProps> = ({
 activeDashboard,
 onDashboardChange,
 isOpen,
}) => {
 const menuItems = [
  {
   id: "performance-regional",
   label: "Performance Regional / Cluster",
   icon: ChartBarIcon,
  },
  {
   id: "operacoes-criticas",
   label: "Operações / Serviços Críticos",
   icon: ExclamationTriangleIcon,
  },
  {
   id: "saude-geral",
   label: "Saúde Geral",
   icon: HeartIcon,
  },
 ];

 return (
  <div
   className={`w-56 lg:w-64 bg-dark-secondary h-full flex flex-col transition-all duration-300 ease-in-out ${
    isOpen ? "translate-x-0" : "-translate-x-full"
   } md:translate-x-0 md:relative md:border-r md:border-border-primary`}
  >
   <div className="flex items-center justify-between h-14 lg:h-16 px-3 lg:px-4 border-b border-border-primary flex-shrink-0">
    <div className="flex items-center gap-2 lg:gap-3">
     <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-mottu-500 to-mottu-400 rounded-lg flex items-center justify-center shadow-lg shadow-mottu-500/30">
      <ChartBarIcon className="h-5 w-5 lg:h-6 lg:w-6 text-dark-primary" />
     </div>
     <div>
      <h2 className="text-lg lg:text-xl font-bold text-text-primary">
       Dashboards
      </h2>
      <p className="text-xs text-text-secondary">Visão operacional</p>
     </div>
    </div>
   </div>

   {/* Itens do menu */}
   <nav className="flex-1 p-3 lg:p-4 space-y-2" aria-label="Menu de dashboards">
    {menuItems.map((item) => {
     const isActive = activeDashboard === item.id;
     const isComingSoon = item.id === "saude-geral";

     return (
      <button
       key={item.id}
       onClick={() => onDashboardChange(item.id)}
       disabled={isComingSoon}
       aria-current={isActive ? "page" : undefined}
       aria-label={`${item.label}${isComingSoon ? " - Em breve" : ""}${
        isActive ? " - Ativo" : ""
       }`}
       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden
        focus-visible:ring-2 focus-visible:ring-mottu-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-primary light:focus-visible:ring-offset-light-primary
        ${isComingSoon ? "cursor-not-allowed opacity-60" : ""}
        ${
         isActive
          ? "bg-gradient-to-r from-mottu-500/20 to-mottu-400/10 border-l-4 border-mottu-400 text-text-primary shadow-lg shadow-mottu-500/10"
          : "text-text-secondary hover:bg-dark-tertiary light:hover:bg-light-tertiary hover:text-mottu-400 border-l-4 border-transparent hover:border-mottu-500/50 hover:shadow-md hover:shadow-mottu-500/5"
        }`}
      >
       {/* Efeito de brilho sutil no hover */}
       <div className="absolute inset-0 bg-gradient-to-r from-mottu-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

       <item.icon
        className={`h-5 w-5 transition-all duration-300 relative z-10 ${
         isActive
          ? "text-mottu-400 scale-110"
          : "text-text-muted group-hover:text-mottu-400 group-hover:scale-105"
        }`}
        aria-hidden="true"
       />
       <span
        className={`font-medium text-sm relative z-10 transition-all duration-300 ${
         isActive ? "text-mottu-400" : "group-hover:text-mottu-400"
        }`}
       >
        {item.label}
       </span>

       {isComingSoon && (
        <span
         className="ml-auto text-[10px] bg-dark-tertiary light:bg-light-tertiary text-mottu-500 px-2 py-1 rounded-full border border-mottu-500/30 relative z-10 group-hover:bg-mottu-500/10 group-hover:border-mottu-500/50 transition-all duration-300"
         aria-hidden="true"
        >
         Em breve
        </span>
       )}
      </button>
     );
    })}
   </nav>

   {/* Footer */}
   <div className="p-4 border-t border-border-primary bg-dark-primary/50 light:bg-light-primary/50">
    <div className="flex items-center justify-between">
     <div className="text-xs text-text-muted">
      Sistema Operacional
      <br />
      <span className="text-mottu-500 font-semibold">v1.0.0</span>
     </div>
     <div className="w-8 h-8 bg-gradient-to-br from-mottu-500 to-mottu-400 rounded-lg flex items-center justify-center shadow-md shadow-mottu-500/30">
      <span className="text-dark-primary font-bold text-xs">M</span>
     </div>
    </div>
   </div>
  </div>
 );
};

export default DashboardMenu;
