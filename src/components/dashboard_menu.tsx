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
   color: "text-orange-600",
   bgColor: "bg-orange-50",
   borderColor: "border-orange-200",
   shadowColor: "shadow-orange-200/50",
  },
  {
   id: "operacoes-criticas",
   label: "Operações / Serviços Críticos",
   icon: ExclamationTriangleIcon,
   color: "text-red-600",
   bgColor: "bg-red-50",
   borderColor: "border-red-200",
   shadowColor: "shadow-red-200/50",
  },
  {
   id: "saude-geral",
   label: "Saúde Geral",
   icon: HeartIcon,
   color: "text-green-600",
   bgColor: "bg-green-50",
   borderColor: "border-green-200",
   shadowColor: "shadow-green-200/50",
  },
 ];

 return (
  <div
   className={`w-64 bg-zinc-900 h-full flex flex-col transition-all duration-300 ease-in-out ${
    isOpen ? "translate-x-0" : "-translate-x-full"
   } fixed left-0 top-0 z-50 shadow-2xl shadow-black/50 backdrop-blur-sm bg-zinc-900/95 border-r border-zinc-700`}
  >
   {/* Header do menu */}
   <div className="p-6 border-b border-zinc-700 bg-gradient-to-b from-zinc-800 to-zinc-900">
    <h2 className="text-xl font-bold text-gray-100">Dashboards</h2>
    <p className="text-sm text-gray-400 mt-1">Visão operacional</p>
   </div>

   {/* Itens do menu */}
   <nav className="flex-1 p-4 space-y-3">
    {menuItems.map((item) => (
     <button
      key={item.id}
      onClick={() => onDashboardChange(item.id)}
      className={`cursor-pointer w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
       activeDashboard === item.id
        ? `${item.bgColor} ${item.borderColor} border-2 ${item.color} shadow-lg ${item.shadowColor} transform scale-[1.02]`
        : "text-gray-400 hover:bg-zinc-800 hover:text-gray-200 hover:shadow-lg hover:shadow-black/20 border border-transparent hover:border-zinc-600"
      }`}
     >
      <item.icon
       className={`h-5 w-5 transition-all duration-200 ${
        activeDashboard === item.id
         ? item.color
         : "text-gray-500 group-hover:text-gray-300"
       }`}
      />
      <span className="font-medium transition-all duration-200">
       {item.label}
      </span>
      {item.id === "saude-geral" && (
       <span className="ml-auto text-xs bg-zinc-700 text-gray-300 px-2 py-1 rounded-full border border-zinc-600">
        Em breve
       </span>
      )}
     </button>
    ))}
   </nav>

   {/* Footer */}
   <div className="p-4 border-t border-zinc-700 bg-zinc-800/50">
    <div className="text-xs text-gray-500 text-center">
     Sistema Operacional
     <br />
     <span className="text-gray-400 font-medium">v1.0.0</span>
    </div>
   </div>
  </div>
 );
};

export default DashboardMenu;
