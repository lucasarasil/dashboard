import React from 'react';
import { 
  UserIcon, 
  ClockIcon, 
  PencilIcon,
  CogIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const LogsTab = ({ service }) => {
  const logs = service.logs || [
    {
      id: 1,
      action: 'Status alterado',
      details: 'Status alterado de "Aberto" para "Em Andamento"',
      user: 'Supervisor João Silva',
      timestamp: '2024-01-15 09:23:00',
      type: 'status_change'
    },
    {
      id: 2,
      action: 'Comentário adicionado',
      details: 'Veículo em perfeito estado, pronto para recolhimento',
      user: 'Técnico Maria Santos',
      timestamp: '2024-01-15 09:45:00',
      type: 'comment'
    },
    {
      id: 3,
      action: 'Prioridade ajustada',
      details: 'Prioridade aumentada para ALTA devido à urgência',
      user: 'Gerente Pedro Costa',
      timestamp: '2024-01-15 10:15:00',
      type: 'priority_change'
    },
    {
      id: 4,
      action: 'Motorista atribuído',
      details: 'Motorista Carlos Oliveira atribuído ao serviço',
      user: 'Sistema Automático',
      timestamp: '2024-01-15 10:30:00',
      type: 'assignment'
    },
    {
      id: 5,
      action: 'Checklist atualizado',
      details: 'Checklist de segurança preenchido e validado',
      user: 'Inspetor Ana Lima',
      timestamp: '2024-01-15 11:00:00',
      type: 'checklist'
    }
  ];

  const getActionIcon = (type) => {
    switch (type) {
      case 'status_change':
        return <CogIcon className="h-4 w-4 text-blue-500" />;
      case 'comment':
        return <PencilIcon className="h-4 w-4 text-green-500" />;
      case 'priority_change':
        return <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />;
      case 'assignment':
        return <UserIcon className="h-4 w-4 text-purple-500" />;
      case 'checklist':
        return <DocumentTextIcon className="h-4 w-4 text-indigo-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'status_change':
        return 'bg-blue-50 border-blue-200';
      case 'comment':
        return 'bg-green-50 border-green-200';
      case 'priority_change':
        return 'bg-yellow-50 border-yellow-200';
      case 'assignment':
        return 'bg-purple-50 border-purple-200';
      case 'checklist':
        return 'bg-indigo-50 border-indigo-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div key={log.id} className="relative">
            {/* Timeline line */}
            {index < logs.length - 1 && (
              <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200"></div>
            )}
            
            <div className={`relative flex items-start space-x-4 p-4 rounded-lg border ${getActionColor(log.type)}`}>
              {/* Action icon */}
              <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-current">
                {getActionIcon(log.type)}
              </div>
              
              {/* Log content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">
                    {log.action}
                  </h4>
                  <time className="text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleString('pt-BR')}
                  </time>
                </div>
                
                <p className="text-sm text-gray-700 mt-1 mb-2">
                  {log.details}
                </p>
                
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {log.user}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Estatísticas */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-900 mb-4">Resumo de Atividades</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {logs.filter(log => log.type === 'status_change').length}
            </div>
            <div className="text-sm text-blue-700">Mudanças de Status</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {logs.filter(log => log.type === 'comment').length}
            </div>
            <div className="text-sm text-green-700">Comentários</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogsTab;
