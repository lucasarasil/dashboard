import React, { useState } from 'react';
import { 
  MapPinIcon, 
  TruckIcon, 
  PlusIcon,
  DevicePhoneMobileIcon,
  HomeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const InteractiveMapTab = ({ service }) => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Mock data para prestadores disponíveis com informações detalhadas
  const availableProviders = [
    { 
      id: 'prov1', 
      name: 'João Silva', 
      status: 'available', 
      distance: 2.5,
      modal: 'Carro',
      shiftEnd: '18:00',
      location: 'na base',
      icon: TruckIcon
    },
    { 
      id: 'prov2', 
      name: 'Maria Santos', 
      status: 'busy', 
      distance: 5.2,
      modal: 'Moto',
      shiftEnd: '17:30',
      location: 'em rota',
      icon: DevicePhoneMobileIcon
    },
    { 
      id: 'prov3', 
      name: 'Pedro Costa', 
      status: 'available', 
      distance: 8.1,
      modal: 'Guincho',
      shiftEnd: null, // Guinchos não têm horário fixo
      location: 'em casa',
      icon: TruckIcon
    },
    { 
      id: 'prov4', 
      name: 'Ana Lima', 
      status: 'available', 
      distance: 12.3,
      modal: 'Carro',
      shiftEnd: '19:00',
      location: 'na base',
      icon: TruckIcon
    },
    { 
      id: 'prov5', 
      name: 'Carlos Oliveira', 
      status: 'available', 
      distance: 15.7,
      modal: 'Moto',
      shiftEnd: '18:30',
      location: 'em casa',
      icon: DevicePhoneMobileIcon
    },
    { 
      id: 'prov6', 
      name: 'Lucia Ferreira', 
      status: 'busy', 
      distance: 7.8,
      modal: 'Guincho',
      shiftEnd: null,
      location: 'em rota',
      icon: TruckIcon
    }
  ];

  const handleAssignProvider = () => {
    if (selectedProvider) {
      console.log('Atribuindo prestador:', selectedProvider, 'para serviço:', service.id);
      setShowAssignModal(false);
      setSelectedProvider('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header fixo */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
        <h3 className="text-lg font-medium text-gray-900">Atrelar Prestador</h3>
        <button
          onClick={() => setShowAssignModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Atrelar Primeiro Disponível</span>
        </button>
      </div>

      {/* Conteúdo com scroll */}
      <div className="flex-1 overflow-y-auto p-6">

      {/* Mapa simulado */}
      <div className="mb-6">
        <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
          {/* Mapa simulado com marcadores */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
            {/* Grid simulado */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
            
            {/* Marcador do serviço */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-red-500 text-white p-3 rounded-full shadow-lg">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <div className="text-xs bg-white px-2 py-1 rounded mt-1 shadow text-center">
                <div className="font-medium">Serviço</div>
                <div>#{service.id}</div>
              </div>
            </div>
            
            {/* Marcadores dos prestadores */}
            {availableProviders.map((provider, index) => (
              <div 
                key={provider.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  index === 0 ? 'top-1/4 left-1/4' :
                  index === 1 ? 'top-1/3 right-1/4' :
                  index === 2 ? 'bottom-1/4 left-1/3' :
                  'bottom-1/3 right-1/3'
                }`}
              >
                <div className={`text-white p-2 rounded-full shadow-lg ${
                  provider.status === 'available' ? 'bg-green-500' : 'bg-gray-400'
                }`}>
                  <TruckIcon className="h-4 w-4" />
                </div>
                <div className="text-xs bg-white px-2 py-1 rounded mt-1 shadow text-center">
                  <div className="font-medium">{provider.name}</div>
                  <div>{provider.distance}km</div>
                  <div className={provider.status === 'available' ? 'text-green-600' : 'text-gray-600'}>
                    {provider.status === 'available' ? 'Disponível' : 'Ocupado'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Overlay com informações */}
          <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
            <div className="text-sm font-medium text-gray-900">Mapa da Região</div>
            <div className="text-xs text-gray-600">São Paulo - SP</div>
            <div className="text-xs text-gray-600 mt-1">
              {availableProviders.filter(p => p.status === 'available').length} prestadores disponíveis
            </div>
          </div>
        </div>
      </div>

      {/* Lista de prestadores disponíveis */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 mb-3">Prestadores Disponíveis</h4>
        {availableProviders.map((provider) => (
          <div 
            key={provider.id}
            className={`p-4 rounded-lg border ${
              provider.status === 'available' 
                ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                : 'bg-gray-50 border-gray-200'
            } transition-colors duration-200`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`p-2 rounded-full ${
                  provider.status === 'available' ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <provider.icon className={`h-4 w-4 ${
                    provider.status === 'available' ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="font-medium text-gray-900">{provider.name}</div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      provider.status === 'available' 
                        ? 'bg-green-200 text-green-800' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {provider.status === 'available' ? 'Disponível' : 'Ocupado'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <provider.icon className="h-3 w-3" />
                      <span>{provider.modal}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPinIcon className="h-3 w-3" />
                      <span>{provider.distance}km</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <HomeIcon className="h-3 w-3" />
                      <span className="capitalize">{provider.location}</span>
                    </div>
                    {provider.shiftEnd && (
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-3 w-3" />
                        <span>Até {provider.shiftEnd}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {provider.status === 'available' && (
                <button
                  onClick={() => {
                    setSelectedProvider(provider.id);
                    setShowAssignModal(true);
                  }}
                  className="ml-4 px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Atrelar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* Modal de confirmação */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Confirmar Atribuição
            </h4>
            <p className="text-gray-600 mb-4">
              Deseja atribuir o prestador selecionado ao serviço #{service.id}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleAssignProvider}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMapTab;
