import React from 'react';
import { 
  HeartIcon, 
  ChartBarIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const DashboardMenu = ({ activeDashboard, onDashboardChange, isOpen }) => {
  const menuItems = [
    {
      id: 'performance-regional',
      label: 'Performance Regional / Cluster',
      icon: ChartBarIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'operacoes-criticas',
      label: 'Operações / Serviços Críticos',
      icon: ExclamationTriangleIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      id: 'saude-geral',
      label: 'Saúde Geral',
      icon: HeartIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    }
  ];

  return (
    <div className={`w-64 bg-white shadow-lg border-r border-gray-200 h-full flex flex-col transition-transform duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } fixed left-0 top-0 z-50`}>
      {/* Header do menu */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Dashboards</h2>
        <p className="text-sm text-gray-500 mt-1">Visão operacional</p>
      </div>

      {/* Itens do menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onDashboardChange(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              activeDashboard === item.id
                ? `${item.bgColor} ${item.borderColor} border-2 ${item.color}`
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`h-5 w-5 ${
              activeDashboard === item.id ? item.color : 'text-gray-400'
            }`} />
            <span className="font-medium">{item.label}</span>
            {item.id === 'saude-geral' && (
              <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                Em breve
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          Sistema Operacional
          <br />
          v1.0.0
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
