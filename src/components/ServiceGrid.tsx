import React from "react";
import ServiceCard from "./ServiceCard";
import { Service } from "../types";

interface ServiceGridProps {
 services: Service[];
 onServiceSelect: (service: Service) => void;
 selectedService?: Service | null;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({
 services,
 onServiceSelect,
 selectedService: _selectedService,
}) => {
 return (
  <div className="h-full overflow-y-auto bg-gray-50">
   <div className="p-3 md:p-4 lg:p-6">
    <div className="space-y-2 md:space-y-3">
     {services.map((service) => (
      <ServiceCard
       key={service.id}
       service={service}
       onClick={onServiceSelect}
       isListMode={true}
      />
     ))}
    </div>

    {services.length === 0 && (
     <div className="text-center py-12">
      <div className="text-gray-400 mb-4">
       <svg
        className="mx-auto h-12 w-12"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
       >
        <path
         strokeLinecap="round"
         strokeLinejoin="round"
         strokeWidth={1}
         d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
       </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
       Nenhum serviço encontrado
      </h3>
      <p className="text-gray-500">
       Tente ajustar os filtros ou termo de busca.
      </p>
     </div>
    )}
   </div>
  </div>
 );
};

export default ServiceGrid;
