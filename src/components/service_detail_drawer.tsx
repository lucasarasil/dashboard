import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ServiceDetailTabs from "./service_detail_table";

const ServiceDetailDrawer = ({ service, isOpen, onClose }) => {
 if (!service) return null;

 const getStatusColor = (status) => {
  switch (status) {
   case "completed":
    return "bg-green-100 text-green-700 border-green-200";
   case "in_progress":
    return "bg-yellow-100 text-yellow-700 border-yellow-200";
   case "critical":
    return "bg-red-100 text-red-700 border-red-200";
   default:
    return "bg-gray-100 text-gray-700 border-gray-200";
  }
 };

 return (
  <>
   {/* Backdrop with blur */}
   {isOpen && (
    <div
     className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm transition-all duration-300 z-40"
     onClick={onClose}
    />
   )}

   {/* Centered Modal */}
   <div
    className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 pointer-events-none ${
     isOpen ? "opacity-100" : "opacity-0"
    }`}
   >
    <div
     className={`bg-slate-950 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] mx-4 flex flex-col transform transition-all duration-300 pointer-events-auto ${
      isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
     }`}
     onClick={(e) => e.stopPropagation()}
    >
     {/* Header */}
     <div className="bg-gray-900 border-b border-gray-700 p-6 flex-shrink-0 rounded-t-2xl">
      <div className="flex items-start justify-between mb-4">
       <div className="flex-1">
        <h2 className="text-2xl font-bold text-gray-300 mb-2">
         Detalhes do Serviço
        </h2>
        <p className="text-sm text-gray-300">
         #{service.id} • {service.serviceName}
        </p>
       </div>

       <button
        onClick={onClose}
        className="ml-4 text-gray-200 hover:text-gray-900 transition-colors p-2 hover:bg-gray-300 rounded-3xl"
        aria-label="Fechar"
       >
        <XMarkIcon className="h-6 w-6" />
       </button>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2">
       <span
        className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(
         service.status
        )}`}
       >
        {service.status.replace("_", " ")}
       </span>
      </div>
     </div>

     {/* Info Cards */}
     <div className="bg-white border-b border-gray-200 p-6 grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
      <div>
       <p className="text-xs text-gray-500 mb-1">Serviço ID</p>
       <p className="font-semibold text-gray-900">#{service.id}</p>
      </div>

      <div>
       <p className="text-xs text-gray-500 mb-1">Status</p>
       <p className="font-semibold text-gray-900 capitalize">
        {service.status.replace("_", " ")}
       </p>
      </div>

      <div>
       <p className="text-xs text-gray-500 mb-1">Placa</p>
       <p className="font-semibold text-gray-900 uppercase">
        {service.vehiclePlate}
       </p>
      </div>

      <div>
       <p className="text-xs text-gray-500 mb-1">Filial</p>
       <p className="font-semibold text-gray-900">{service.branch}</p>
      </div>

      {service.driver && (
       <div>
        <p className="text-xs text-gray-500 mb-1">Motorista</p>
        <p className="font-semibold text-gray-900">{service.driver}</p>
       </div>
      )}
     </div>

     {/* Tabs Content */}
     <div className="flex-1 overflow-y-auto bg-white rounded-b-2xl">
      <ServiceDetailTabs service={service} />
     </div>
    </div>
   </div>
  </>
 );
};

export default ServiceDetailDrawer;
