import React from "react";
import {
 ClockIcon,
 ExclamationTriangleIcon,
 CheckCircleIcon,
 TruckIcon,
 MapPinIcon,
 UserIcon,
 WrenchIcon,
 ExclamationCircleIcon,
 HomeIcon,
 BuildingOfficeIcon,
 MapIcon,
 SunIcon,
} from "@heroicons/react/24/outline";

const ServiceCard = ({ service, onClick, isListMode = false }) => {
 const getStatusColor = (status) => {
  switch (status) {
   case "completed":
    return "status-success";
   case "in_progress":
    return "status-warning";
   case "critical":
    return "status-error";
   default:
    return "bg-gray-950 text-gray-100";
  }
 };

 const getStatusIcon = (status) => {
  switch (status) {
   case "completed":
    return <CheckCircleIcon className="h-4 w-4" />;
   case "in_progress":
    return <ClockIcon className="h-4 w-4" />;
   case "critical":
    return <ExclamationTriangleIcon className="h-4 w-4" />;
   default:
    return <ClockIcon className="h-4 w-4" />;
  }
 };

 const getAlertIcon = (hasAlert) => {
  if (hasAlert) {
   return (
    <div className="flex items-center space-x-1">
     <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />
     <span className="text-xs text-red-600 font-medium">Alerta</span>
    </div>
   );
  }
  return null;
 };

 const getPendingReviewIcon = (needsReview) => {
  if (needsReview) {
   return (
    <div className="flex items-center space-x-1">
     <ClockIcon className="h-4 w-4 text-yellow-500" />
     <span className="text-xs text-yellow-600 font-medium">Revisão</span>
    </div>
   );
  }
  return null;
 };

 const getActionTakenIcon = (actionTaken) => {
  if (actionTaken) {
   return (
    <div className="flex items-center space-x-1">
     <CheckCircleIcon className="h-4 w-4 text-green-500" />
     <span className="text-xs text-green-600 font-medium">Ação tomada</span>
    </div>
   );
  }
  return null;
 };

 // Função para obter ícone baseado no tipo de serviço
 const getServiceIcon = (serviceName) => {
  if (serviceName.includes("Apropriação")) {
   return <ExclamationCircleIcon className="h-5 w-5" />;
  } else if (
   serviceName.includes("Fusível") ||
   serviceName.includes("Bateria") ||
   serviceName.includes("Motor")
  ) {
   return <WrenchIcon className="h-5 w-5" />;
  } else {
   return <TruckIcon className="h-5 w-5" />;
  }
 };

 // Função para obter tipo de serviço/endereço
 const getServiceAddressType = (serviceName, serviceType) => {
  if (serviceType === "appropriation") {
   return {
    type: "Cadastro",
    icon: BuildingOfficeIcon,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
   };
  }

  // Tipos de serviço baseados no nome
  if (
   serviceName.includes("Fusível") ||
   serviceName.includes("Bateria") ||
   serviceName.includes("Motor")
  ) {
   return {
    type: "Casa",
    icon: HomeIcon,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
   };
  } else if (
   serviceName.includes("Pneu") ||
   serviceName.includes("Freio") ||
   serviceName.includes("Farol")
  ) {
   return {
    type: "Rua",
    icon: MapIcon,
    color: "text-green-600",
    bgColor: "bg-green-100",
   };
  } else if (
   serviceName.includes("Carburador") ||
   serviceName.includes("Acelerador")
  ) {
   return {
    type: "Satélite",
    icon: SunIcon,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
   };
  } else {
   return {
    type: "Pernoite",
    icon: MapPinIcon,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
   };
  }
 };

 // Função para calcular tempo restante para SLA
 const getSlaTimeLeft = (slaProgress) => {
  const remaining = 100 - slaProgress;
  if (remaining <= 0) return "0min";
  if (remaining < 20) return `${Math.round(remaining * 0.5)}min`;
  return `${Math.round(remaining * 0.3)}min`;
 };

 if (isListMode) {
  const addressType = getServiceAddressType(
   service.serviceName,
   service.serviceType
  );
  const slaTimeLeft = getSlaTimeLeft(service.slaProgress);
  const isCritical = service.status === "critical" || service.hasAlert;

  return (
   <div
    onClick={() => onClick(service)}
    className={`card p-3 md:p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group ${
     isCritical
      ? "border-l-4 border-l-red-500 bg-red-50 hover:bg-red-100"
      : "hover:border-primary-300"
    }`}
   >
    <div className="flex items-center justify-between gap-3">
     {/* Lado esquerdo - Informações principais */}
     <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
      {/* Ícone com cor baseada em alerta/ordem e tipo de serviço */}
      <div
       className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
        isCritical
         ? "bg-red-100 border-2 border-red-200"
         : service.status === "in_progress"
         ? "bg-yellow-100 border-2 border-yellow-200"
         : "bg-green-100 border-2 border-green-200"
       }`}
      >
       <div
        className={`${
         isCritical
          ? "text-red-600"
          : service.status === "in_progress"
          ? "text-yellow-600"
          : "text-green-600"
        }`}
       >
        {getServiceIcon(service.serviceName)}
       </div>
      </div>

      {/* Informações do serviço */}
      <div className="flex-1 min-w-0">
       <div className="flex items-center flex-wrap gap-2 mb-1">
        <h3 className="font-bold text-base md:text-lg text-gray-900 group-hover:text-primary-700 transition-colors">
         #{service.id}
        </h3>
        <span
         className={`status-badge ${getStatusColor(
          service.status
         )} flex items-center space-x-1 text-[10px] md:text-xs font-semibold`}
        >
         {getStatusIcon(service.status)}
         <span className="capitalize">{service.status.replace("_", " ")}</span>
        </span>
        {isCritical && (
         <span className="bg-red-100 text-red-800 text-[10px] md:text-xs font-bold px-2 py-0.5 md:py-1 rounded-full">
          CRÍTICO
         </span>
        )}
       </div>
       <p className="text-xs md:text-sm font-medium text-gray-700 mb-1.5 md:mb-2 truncate">
        {service.serviceName}
       </p>

       {/* Tipo de endereço */}
       <div className="flex items-center flex-wrap gap-1.5 md:gap-2 mb-1.5 md:mb-2">
        <div
         className={`flex items-center space-x-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded-full ${addressType.bgColor}`}
        >
         <addressType.icon className={`h-3 w-3 ${addressType.color}`} />
         <span
          className={`text-[10px] md:text-xs font-medium ${addressType.color}`}
         >
          {addressType.type}
         </span>
        </div>
        <span className="text-[10px] md:text-xs text-gray-500">
         {service.vehiclePlate}
        </span>
        <span className="text-[10px] md:text-xs text-gray-500">•</span>
        <span className="text-[10px] md:text-xs text-gray-500 truncate">
         {service.branch}
        </span>
       </div>

       {/* Motorista */}
       {service.driver && (
        <div className="flex items-center space-x-1 text-[10px] md:text-xs text-gray-500">
         <UserIcon className="h-3 w-3" />
         <span className="truncate">{service.driver}</span>
        </div>
       )}
      </div>
     </div>

     {/* Lado direito - Detalhes e indicadores */}
     <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
      {/* Indicadores visuais */}
      <div className="hidden sm:flex items-center space-x-2">
       {getAlertIcon(service.hasAlert)}
       {getPendingReviewIcon(service.needsReview)}
       {getActionTakenIcon(service.actionTaken)}
      </div>

      {/* Tempo restante SLA */}
      <div className="text-center">
       <div className="text-[10px] md:text-xs text-gray-500 mb-0.5 md:mb-1">
        Restante
       </div>
       <div
        className={`text-xs md:text-sm font-bold ${
         service.slaProgress > 80
          ? "text-red-600"
          : service.slaProgress > 60
          ? "text-yellow-600"
          : "text-green-600"
        }`}
       >
        {slaTimeLeft}
       </div>
      </div>

      {/* Barra de progresso SLA */}
      <div className="w-16 md:w-24">
       <div className="flex justify-between text-[10px] md:text-xs text-gray-500 mb-0.5 md:mb-1">
        <span>SLA</span>
        <span>{service.slaProgress}%</span>
       </div>
       <div className="w-full bg-gray-200 rounded-full h-1.5 md:h-2">
        <div
         className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
          service.slaProgress > 80
           ? "bg-red-500"
           : service.slaProgress > 60
           ? "bg-yellow-500"
           : "bg-green-500"
         }`}
         style={{ width: `${Math.min(service.slaProgress, 100)}%` }}
        ></div>
       </div>
      </div>
     </div>
    </div>
   </div>
  );
 }

 // Layout original para grid (mantido para compatibilidade)
 return (
  <div
   onClick={() => onClick(service)}
   className="card p-4 hover:shadow-md hover:border-primary-300 transition-all duration-200 cursor-pointer group"
  >
   <div className="flex items-start justify-between mb-3">
    <div className="flex items-center space-x-3">
     <div className="flex-shrink-0">
      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
       <TruckIcon className="h-5 w-5 text-primary-600" />
      </div>
     </div>
     <div>
      <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
       #{service.id}
      </h3>
      <p className="text-sm text-gray-600">{service.serviceName}</p>
     </div>
    </div>

    <div className="flex flex-col items-end space-y-1">
     <span
      className={`status-badge ${getStatusColor(
       service.status
      )} flex items-center space-x-1`}
     >
      {getStatusIcon(service.status)}
      <span className="capitalize">{service.status.replace("_", " ")}</span>
     </span>
    </div>
   </div>

   {/* Informações principais */}
   <div className="grid grid-cols-2 gap-3 mb-3">
    <div className="flex items-center space-x-2 text-sm">
     <TruckIcon className="h-4 w-4 text-gray-400" />
     <span className="text-gray-600">{service.vehiclePlate}</span>
    </div>
    <div className="flex items-center space-x-2 text-sm">
     <MapPinIcon className="h-4 w-4 text-gray-400" />
     <span className="text-gray-600">{service.branch}</span>
    </div>
    {service.driver && (
     <div className="flex items-center space-x-2 text-sm col-span-2">
      <UserIcon className="h-4 w-4 text-gray-400" />
      <span className="text-gray-600">{service.driver}</span>
     </div>
    )}
   </div>

   {/* Indicadores visuais */}
   <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
     {getAlertIcon(service.hasAlert)}
     {getPendingReviewIcon(service.needsReview)}
     {getActionTakenIcon(service.actionTaken)}
    </div>

    {service.elapsedTime && (
     <div className="flex items-center space-x-1 text-xs text-gray-500">
      <ClockIcon className="h-3 w-3" />
      <span>{service.elapsedTime}min</span>
     </div>
    )}
   </div>

   {/* Barra de progresso SLA */}
   {service.slaProgress && (
    <div className="mt-3">
     <div className="flex justify-between text-xs text-gray-500 mb-1">
      <span>SLA</span>
      <span>{service.slaProgress}%</span>
     </div>
     <div className="w-full bg-gray-200 rounded-full h-1.5">
      <div
       className={`h-1.5 rounded-full transition-all duration-300 ${
        service.slaProgress > 80
         ? "bg-red-500"
         : service.slaProgress > 60
         ? "bg-yellow-500"
         : "bg-green-500"
       }`}
       style={{ width: `${Math.min(service.slaProgress, 100)}%` }}
      ></div>
     </div>
    </div>
   )}
  </div>
 );
};

export default ServiceCard;
