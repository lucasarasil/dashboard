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
   className={`w-64 bg-[#111414] h-full flex flex-col transition-all duration-300 ease-in-out ${
    isOpen ? "translate-x-0" : "-translate-x-full"
   } fixed left-0 top-0 z-50 shadow-2xl shadow-black/50 backdrop-blur-sm border-r border-[#1e3730]`}
  >
   {/* Header */}
   <div className="p-6 border-b border-[#1e3730] bg-gradient-to-b from-[#1A1D1D] to-[#111414]">
    <div className="flex items-center gap-3 mb-2">
     <div className="w-10 h-10 bg-gradient-to-br from-[#00C853] to-[#00E676] rounded-lg flex items-center justify-center shadow-lg shadow-[#00C853]/30">
      <ChartBarIcon className="h-6 w-6 text-[#0B0E0E]" />
     </div>
     <div>
      <h2 className="text-xl font-bold text-[#E6E6E6]">Dashboards</h2>
      <p className="text-xs text-[#A7AFA9]">Visão operacional</p>
     </div>
    </div>
   </div>

   {/* Itens do menu */}
   <nav className="flex-1 p-4 space-y-2">
    {menuItems.map((item) => {
     const isActive = activeDashboard === item.id;
     const isComingSoon = item.id === "saude-geral";

     return (
      <button
       key={item.id}
       onClick={() => onDashboardChange(item.id)}
       className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 group relative overflow-hidden ${
        isActive
         ? "bg-gradient-to-r from-[#00C853]/20 to-[#00E676]/10 border-l-4 border-[#00E676] text-[#E6E6E6] shadow-lg shadow-[#00C853]/10"
         : "text-[#A7AFA9] hover:bg-[#1A1D1D] hover:text-[#00E676] border-l-4 border-transparent hover:border-[#00C853]/50 hover:shadow-md hover:shadow-[#00C853]/5"
       }`}
      >
       {/* Efeito de brilho sutil no hover */}
       <div className="absolute inset-0 bg-gradient-to-r from-[#00C853]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

       <item.icon
        className={`h-5 w-5 transition-all duration-300 relative z-10 ${
         isActive
          ? "text-[#00E676] scale-110"
          : "text-[#6B7570] group-hover:text-[#00E676] group-hover:scale-105"
        }`}
       />
       <span
        className={`font-medium text-sm relative z-10 transition-all duration-300 ${
         isActive ? "text-[#00E676]" : "group-hover:text-[#00E676]"
        }`}
       >
        {item.label}
       </span>

       {isComingSoon && (
        <span className="ml-auto text-[10px] bg-[#1A1D1D] text-[#00C853] px-2 py-1 rounded-full border border-[#00C853]/30 relative z-10 group-hover:bg-[#00C853]/10 group-hover:border-[#00C853]/50 transition-all duration-300">
         Em breve
        </span>
       )}
      </button>
     );
    })}
   </nav>

   {/* Footer */}
   <div className="p-4 border-t border-[#1e3730] bg-[#0B0E0E]/50">
    <div className="flex items-center justify-between">
     <div className="text-xs text-[#6B7570]">
      Sistema Operacional
      <br />
      <span className="text-[#00C853] font-semibold">v1.0.0</span>
     </div>
     <div className="w-8 h-8 bg-gradient-to-br from-[#00C853] to-[#00E676] rounded-lg flex items-center justify-center shadow-md shadow-[#00C853]/30">
      <span className="text-[#0B0E0E] font-bold text-xs">M</span>
     </div>
    </div>
   </div>
  </div>
 );
};

export default DashboardMenu;
