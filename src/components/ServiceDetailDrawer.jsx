import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ServiceDetailTabs from './ServiceDetailTabs';

const ServiceDetailDrawer = ({ service, isOpen, onClose }) => {
  if (!service) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'status-success';
      case 'in_progress':
        return 'status-warning';
      case 'critical':
        return 'status-error';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header fixo */}
        <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Detalhes do Serviço
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                #{service.id} • {service.serviceName}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          {/* Status badge */}
          <div className="mt-3">
            <span className={`status-badge ${getStatusColor(service.status)}`}>
              {service.status.replace('_', ' ')}
            </span>
          </div>
        </div>

        {/* Campos principais fixos */}
        <div className="flex-shrink-0 px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Serviço ID
              </label>
              <p className="text-sm font-medium text-gray-900 mt-1">
                #{service.id}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Status
              </label>
              <p className="text-sm font-medium text-gray-900 mt-1 capitalize">
                {service.status.replace('_', ' ')}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Placa
              </label>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {service.vehiclePlate}
              </p>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Filial
              </label>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {service.branch}
              </p>
            </div>
            {service.driver && (
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Motorista
                </label>
                <p className="text-sm font-medium text-gray-900 mt-1">
                  {service.driver}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Conteúdo das abas */}
        <div className="flex-1 overflow-hidden">
          <ServiceDetailTabs service={service} />
        </div>
      </div>
    </>
  );
};

export default ServiceDetailDrawer;
