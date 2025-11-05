import React, { useState } from 'react';
import { 
  ExclamationTriangleIcon, 
  CheckCircleIcon, 
  ClockIcon
} from '@heroicons/react/24/outline';

const AlertsTab = ({ service }) => {
  const [alerts, setAlerts] = useState(service.alerts || [
    {
      id: 1,
      title: 'Prestador parado há 40min',
      description: 'O prestador de serviço não se moveu nos últimos 40 minutos',
      severity: 'high',
      status: 'open',
      timestamp: '2024-01-15 10:30:00',
      location: 'Av. Paulista, 1000 - São Paulo'
    },
    {
      id: 2,
      title: 'Serviço fora da rota',
      description: 'O veículo está seguindo uma rota diferente da planejada',
      severity: 'medium',
      status: 'resolved',
      timestamp: '2024-01-15 09:45:00',
      resolvedBy: 'João Silva',
      resolvedAt: '2024-01-15 10:15:00'
    },
    {
      id: 3,
      title: 'Tempo limite próximo',
      description: 'O serviço está próximo do tempo limite estabelecido',
      severity: 'low',
      status: 'open',
      timestamp: '2024-01-15 11:00:00'
    }
  ]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-100 border-yellow-200 text-yellow-800';
      case 'low':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-800';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <ClockIcon className="h-4 w-4 text-blue-500" />;
      default:
        return <ClockIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleResolveAlert = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: 'resolved', resolvedBy: 'Usuário Atual', resolvedAt: new Date().toLocaleString('pt-BR') }
        : alert
    ));
  };

  const openAlerts = alerts.filter(alert => alert.status === 'open');
  const resolvedAlerts = alerts.filter(alert => alert.status === 'resolved');

  return (
    <div className="h-full overflow-y-auto p-6">
      {/* Alertas abertos */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Alertas Abertos ({openAlerts.length})
        </h3>
        
        {openAlerts.length > 0 ? (
          <div className="space-y-4">
            {openAlerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{alert.title}</h4>
                      <p className="text-sm opacity-90 mb-2">{alert.description}</p>
                      {alert.location && (
                        <p className="text-xs opacity-75">📍 {alert.location}</p>
                      )}
                      <time className="text-xs opacity-75">
                        {new Date(alert.timestamp).toLocaleString('pt-BR')}
                      </time>
                    </div>
                  </div>
                  <button
                    onClick={() => handleResolveAlert(alert.id)}
                    className="btn-primary text-xs px-3 py-1"
                  >
                    Registrar ação
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum alerta aberto
            </h4>
            <p className="text-gray-500">Todos os alertas foram resolvidos!</p>
          </div>
        )}
      </div>

      {/* Alertas resolvidos */}
      {resolvedAlerts.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Alertas Resolvidos ({resolvedAlerts.length})
          </h3>
          
          <div className="space-y-3">
            {resolvedAlerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium text-green-900 mb-1">{alert.title}</h4>
                    <p className="text-sm text-green-700 mb-2">{alert.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-green-600">
                      <span>Resolvido por: {alert.resolvedBy}</span>
                      <span>Em: {new Date(alert.resolvedAt).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsTab;
