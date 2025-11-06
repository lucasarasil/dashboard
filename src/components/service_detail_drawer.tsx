import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ServiceDetailTabs from "./service_detail_table";

const ServiceDetailDrawer = ({ service, isOpen, onClose }) => {
 if (!service) return null;

 const getStatusColor = (status) => {
  switch (status) {
   case "completed":
    return "bg-mottu-500/10 text-mottu-500 border-mottu-500/20";
   case "in_progress":
    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
   case "critical":
    return "bg-red-500/10 text-red-400 border-red-500/20";
   default:
    return "bg-dark-tertiary text-text-secondary border-border-primary";
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
     className={`bg-dark-secondary rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] mx-4 flex flex-col transform transition-all duration-300 pointer-events-auto border border-border-primary ${
      isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
     }`}
     onClick={(e) => e.stopPropagation()}
    >
     {/* Header */}
     <div className="bg-dark-tertiary border-b border-border-primary p-6 flex-shrink-0 rounded-t-2xl">
      <div className="flex items-start justify-between mb-4">
       <div className="flex-1">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
         Detalhes do Serviço
        </h2>
        <p className="text-sm text-text-secondary">
         #{service.id} • {service.serviceName}
        </p>
       </div>

       <button
        onClick={onClose}
        className="ml-4 text-text-muted hover:text-text-primary transition-colors p-2 hover:bg-dark-hover rounded-lg"
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
     <div className="bg-dark-secondary border-b border-border-primary p-6 grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
      <div>
       <p className="text-xs text-text-muted mb-1">Serviço ID</p>
       <p className="font-semibold text-text-primary">#{service.id}</p>
      </div>

      <div>
       <p className="text-xs text-text-muted mb-1">Status</p>
       <p className="font-semibold text-text-primary capitalize">
        {service.status.replace("_", " ")}
       </p>
      </div>

      <div>
       <p className="text-xs text-text-muted mb-1">Placa</p>
       <p className="font-semibold text-text-primary uppercase">
        {service.vehiclePlate}
       </p>
      </div>

      <div>
       <p className="text-xs text-text-muted mb-1">Filial</p>
       <p className="font-semibold text-text-primary">{service.branch}</p>
      </div>

      {service.driver && (
       <div>
        <p className="text-xs text-text-muted mb-1">Motorista</p>
        <p className="font-semibold text-text-primary">{service.driver}</p>
       </div>
      )}
     </div>

     {/* Tabs Content */}
     <div className="flex-1 overflow-y-auto bg-dark-secondary rounded-b-2xl">
      <ServiceDetailTabs service={service} />
     </div>
    </div>
   </div>
  </>
 );
};

export default ServiceDetailDrawer;
