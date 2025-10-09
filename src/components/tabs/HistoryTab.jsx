import React from 'react';
import { ClockIcon, UserIcon } from '@heroicons/react/24/outline';

const HistoryTab = ({ service }) => {
  const events = service.history || [
    {
      id: 1,
      action: 'Serviço iniciado',
      timestamp: '2024-01-15 09:00:00',
      responsible: 'Sistema Automático',
      type: 'system'
    },
    {
      id: 2,
      action: 'Checklist aprovado',
      timestamp: '2024-01-15 09:15:00',
      responsible: 'João Silva',
      type: 'approval'
    },
    {
      id: 3,
      action: 'Veículo recolhido',
      timestamp: '2024-01-15 09:45:00',
      responsible: 'Maria Santos',
      type: 'action'
    },
    {
      id: 4,
      action: 'Em trânsito para filial',
      timestamp: '2024-01-15 10:30:00',
      responsible: 'Pedro Costa',
      type: 'status'
    },
    {
      id: 5,
      action: 'Serviço concluído',
      timestamp: '2024-01-15 11:20:00',
      responsible: 'Sistema Automático',
      type: 'system'
    }
  ];

  const getEventIcon = (type) => {
    switch (type) {
      case 'system':
        return <ClockIcon className="h-4 w-4 text-blue-500" />;
      case 'approval':
        return <ClockIcon className="h-4 w-4 text-green-500" />;
      case 'action':
        return <ClockIcon className="h-4 w-4 text-purple-500" />;
      case 'status':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'system':
        return 'bg-blue-100 border-blue-200';
      case 'approval':
        return 'bg-green-100 border-green-200';
      case 'action':
        return 'bg-purple-100 border-purple-200';
      case 'status':
        return 'bg-yellow-100 border-yellow-200';
      default:
        return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="relative">
            {/* Timeline line */}
            {index < events.length - 1 && (
              <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200"></div>
            )}
            
            <div className={`relative flex items-start space-x-4 p-4 rounded-lg border ${getEventColor(event.type)}`}>
              {/* Event icon */}
              <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-current">
                {getEventIcon(event.type)}
              </div>
              
              {/* Event content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">
                    {event.action}
                  </h4>
                  <time className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleString('pt-BR')}
                  </time>
                </div>
                
                <div className="mt-1 flex items-center space-x-2">
                  <UserIcon className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {event.responsible}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Ver histórico completo */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          Ver histórico completo →
        </button>
      </div>
    </div>
  );
};

export default HistoryTab;
