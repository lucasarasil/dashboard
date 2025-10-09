import React from 'react';
import { ClockIcon, UserIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const TimelineTab = ({ service }) => {
  // Gerar timeline completa com eventos do serviço
  const generateTimelineEvents = (service) => {
    const events = [];
    
    // Evento de abertura
    events.push({
      id: 'opening',
      action: 'Serviço aberto',
      timestamp: new Date(Date.now() - service.elapsedTime * 60000).toISOString(),
      responsible: 'Sistema Automático',
      type: 'system'
    });
    
    // Evento de encaminhamento
    if (service.driver) {
      events.push({
        id: 'assignment',
        action: 'Serviço encaminhado',
        timestamp: new Date(Date.now() - (service.elapsedTime - 30) * 60000).toISOString(),
        responsible: 'Sistema Automático',
        details: `Encaminhado para ${service.driver}`,
        type: 'system'
      });
    }
    
    // Evento de aceitação (se não está aberto)
    if (service.status !== 'open') {
      events.push({
        id: 'acceptance',
        action: 'Serviço aceito',
        timestamp: new Date(Date.now() - (service.elapsedTime - 15) * 60000).toISOString(),
        responsible: service.driver || 'Prestador',
        details: 'Prestador aceitou o serviço',
        type: 'manual'
      });
    }
    
    // Eventos de histórico existentes
    if (service.history) {
      events.push(...service.history.map(event => ({ ...event, type: 'system' })));
    }
    
    // Logs existentes
    if (service.logs) {
      events.push(...service.logs.map(log => ({ ...log, type: 'manual' })));
    }
    
    return events.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  };

  const timelineEvents = generateTimelineEvents(service);

  const getEventIcon = (type) => {
    switch (type) {
      case 'system':
        return <ClockIcon className="h-4 w-4 text-blue-500" />;
      case 'manual':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'system':
        return 'bg-blue-50 border-blue-200';
      case 'manual':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="space-y-4">
        {timelineEvents.map((event, index) => (
          <div key={event.id} className="relative">
            {/* Timeline line */}
            {index < timelineEvents.length - 1 && (
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
                
                {event.details && (
                  <p className="text-sm text-gray-700 mt-1">
                    {event.details}
                  </p>
                )}
                
                <div className="mt-1 flex items-center space-x-2">
                  <UserIcon className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {event.responsible || event.user}
                  </span>
                  <span className="text-xs text-gray-400">
                    • {event.type === 'system' ? 'Sistema' : 'Manual'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {timelineEvents.length === 0 && (
        <div className="text-center py-8">
          <ClockIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum evento registrado
          </h4>
          <p className="text-gray-500">A timeline aparecerá aqui conforme eventos são registrados.</p>
        </div>
      )}
    </div>
  );
};

export default TimelineTab;
