"use client";
import React, { useState } from "react";
import {
 MapPinIcon,
 TruckIcon,
 BuildingOfficeIcon,
 ClockIcon,
} from "@heroicons/react/24/outline";

const MapTab = ({ service }) => {
 const [selectedLocation, setSelectedLocation] = useState(null);

 const locations = service.locations || [
  {
   id: "branch",
   name: "Filial Central",
   type: "branch",
   address: "Rua das Flores, 123 - Centro",
   coordinates: { lat: -23.5505, lng: -46.6333 },
   status: "base",
  },
  {
   id: "service",
   name: "Local do Serviço",
   type: "service",
   address: "Av. Paulista, 1000 - Bela Vista",
   coordinates: { lat: -23.5613, lng: -46.6565 },
   status: "active",
  },
  {
   id: "vehicle",
   name: "Última Posição do Veículo",
   type: "vehicle",
   address: "Rua Augusta, 500 - Consolação",
   coordinates: { lat: -23.5489, lng: -46.6388 },
   status: "moving",
   lastUpdate: "2024-01-15 11:30:00",
  },
 ];

 const getLocationIcon = (type: string, _status: string) => {
  switch (type) {
   case "branch":
    return <BuildingOfficeIcon className="h-5 w-5 text-blue-500" />;
   case "service":
    return <MapPinIcon className="h-5 w-5 text-red-500" />;
   case "vehicle":
    return <TruckIcon className="h-5 w-5 text-green-500" />;
   default:
    return <MapPinIcon className="h-5 w-5 text-gray-500" />;
  }
 };

 const getStatusColor = (status) => {
  switch (status) {
   case "base":
    return "bg-blue-100 border-blue-200 text-blue-800";
   case "active":
    return "bg-red-100 border-red-200 text-red-800";
   case "moving":
    return "bg-green-100 border-green-200 text-green-800";
   default:
    return "bg-gray-100 border-gray-200 text-gray-800";
  }
 };

 return (
  <div className="h-full overflow-y-auto p-6">
   {/* Mapa simulado */}
   <div className="mb-6">
    <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
     {/* Mapa simulado com marcadores */}
     <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
      {/* Grid simulado */}
      <div className="absolute inset-0 opacity-20">
       <svg className="w-full h-full">
        <defs>
         <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
         >
          <path
           d="M 40 0 L 0 0 0 40"
           fill="none"
           stroke="#374151"
           strokeWidth="1"
          />
         </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
       </svg>
      </div>

      {/* Marcadores */}
      <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
       <div className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
        <BuildingOfficeIcon className="h-4 w-4" />
       </div>
       <div className="text-xs bg-white px-2 py-1 rounded mt-1 shadow">
        Filial
       </div>
      </div>

      <div className="absolute top-1/2 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
       <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
        <MapPinIcon className="h-4 w-4" />
       </div>
       <div className="text-xs bg-white px-2 py-1 rounded mt-1 shadow">
        Serviço
       </div>
      </div>

      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
       <div className="bg-green-500 text-white p-2 rounded-full shadow-lg animate-pulse">
        <TruckIcon className="h-4 w-4" />
       </div>
       <div className="text-xs bg-white px-2 py-1 rounded mt-1 shadow">
        Veículo
       </div>
      </div>
     </div>

     {/* Overlay com informações */}
     <div className="absolute top-4 left-4 bg-white bg-opacity-90 rounded-lg p-3">
      <div className="text-sm font-medium text-gray-900">Mapa da Região</div>
      <div className="text-xs text-gray-600">São Paulo - SP</div>
     </div>

     {/* Controles de zoom simulados */}
     <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-2">
      <div className="space-y-1">
       <button className="block w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded text-gray-600">
        +
       </button>
       <button className="block w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded text-gray-600">
        -
       </button>
      </div>
     </div>
    </div>
   </div>

   {/* Lista de localizações */}
   <div className="space-y-3">
    <h4 className="text-sm font-medium text-gray-900 mb-3">Localizações</h4>

    {locations.map((location) => (
     <div
      key={location.id}
      className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
       selectedLocation === location.id
        ? "bg-primary-50 border-primary-200"
        : "bg-white border-gray-200 hover:bg-gray-50"
      }`}
      onClick={() => setSelectedLocation(location.id)}
     >
      <div className="flex items-start space-x-3">
       {getLocationIcon(location.type, location.status)}

       <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
         <h5 className="font-medium text-gray-900">{location.name}</h5>
         <span
          className={`status-badge ${getStatusColor(location.status)} text-xs`}
         >
          {location.status === "base"
           ? "Base"
           : location.status === "active"
           ? "Ativo"
           : "Em movimento"}
         </span>
        </div>

        <p className="text-sm text-gray-600 mt-1">{location.address}</p>

        {location.lastUpdate && (
         <div className="flex items-center space-x-1 mt-2">
          <ClockIcon className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500">
           Última atualização:{" "}
           {new Date(location.lastUpdate).toLocaleString("pt-BR")}
          </span>
         </div>
        )}
       </div>
      </div>
     </div>
    ))}
   </div>

   {/* Informações adicionais */}
   <div className="mt-6 pt-4 border-t border-gray-200">
    <div className="grid grid-cols-2 gap-4 text-sm">
     <div>
      <span className="text-gray-500">Distância total:</span>
      <span className="font-medium ml-2">12.5 km</span>
     </div>
     <div>
      <span className="text-gray-500">Tempo estimado:</span>
      <span className="font-medium ml-2">25 min</span>
     </div>
    </div>
   </div>
  </div>
 );
};

export default MapTab;
