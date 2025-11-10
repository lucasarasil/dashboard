"use client";

import React from "react";
import { useRepository } from "@/presentation/contexts";
import { useServices } from "@/presentation/hooks/useServices";
import {
 ServiceGrid,
 ServiceDetailDrawer,
} from "@/presentation/components/features/services";
import { DashboardMenu } from "@/presentation/components/features/dashboard";
import { ActionModal, KpiCard } from "@/presentation/components/common";
import { ServiceEntity } from "@/core/entities/service.entity";
import {
 ExclamationTriangleIcon,
 CheckCircleIcon,
 ClockIcon,
 XCircleIcon,
 BellAlertIcon,
 UserGroupIcon,
} from "@heroicons/react/24/solid";
import {
 Bars3Icon,
 Squares2X2Icon,
 ViewColumnsIcon,
} from "@heroicons/react/24/outline";

type ItemsPerRow = 1 | 2 | 4;

export default function OperacoesPage() {
 const { serviceRepository } = useRepository();
 const [selectedService, setSelectedService] =
  React.useState<ServiceEntity | null>(null);
 const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 const [isActionModalOpen, setIsActionModalOpen] = React.useState(false);
 const [searchTerm, setSearchTerm] = React.useState("");
 const [itemsPerRow, setItemsPerRow] = React.useState<ItemsPerRow>(4);

 const { filteredServices, isLoading, error, updateFilters } = useServices({
  repository: serviceRepository,
 });

 React.useEffect(() => {
  updateFilters({ searchTerm });
 }, [searchTerm, updateFilters]);

 const handleServiceSelect = (service: ServiceEntity) => {
  setSelectedService(service);
  setIsDrawerOpen(true);
 };

 const handleCloseDrawer = () => {
  setIsDrawerOpen(false);
  setTimeout(() => setSelectedService(null), 300);
 };

 // Calcular KPIs
 const kpis = React.useMemo(() => {
  const total = filteredServices.length;
  const critical = filteredServices.filter(
   (s) => s.status === "critical"
  ).length;
  const completed = filteredServices.filter(
   (s) => s.status === "completed"
  ).length;
  const open = filteredServices.filter((s) => s.status === "open").length;
  const pending = filteredServices.filter((s) => s.status === "pending").length;
  const alerts = filteredServices.filter((s) => s.hasAlert).length;
  const needsReview = filteredServices.filter((s) => s.needsReview).length;

  // Calcular % de SLA cumprido (serviços com slaProgress < 80%)
  const slaMet = filteredServices.filter((s) => s.slaProgress < 80).length;
  const slaPercentage = total > 0 ? Math.round((slaMet / total) * 100) : 0;

  // % Críticos
  const criticalPercentage =
   total > 0 ? Math.round((critical / total) * 100) : 0;

  return {
   total,
   critical,
   criticalPercentage,
   completed,
   open,
   pending,
   alerts,
   needsReview,
   slaPercentage,
  };
 }, [filteredServices]);

 if (error) {
  return (
   <div className="flex h-screen items-center justify-center bg-dark-primary">
    <div className="text-center">
     <p className="text-red-400 mb-4">Erro ao carregar dados</p>
     <p className="text-text-muted text-sm">{error.message}</p>
    </div>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-dark-primary">
   <DashboardMenu activePath="/operacoes" onSearch={setSearchTerm} />

   <main className="flex-1 p-4 lg:p-6 overflow-auto">
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
     <h1 className="text-2xl lg:text-3xl font-bold text-white">
      Dashboard Operacional
     </h1>

     {/* View Selector - Only affects Service Grid */}
     <div className="flex items-center gap-3">
      <span className="text-sm text-text-muted hidden sm:block">
       Visualização dos Serviços:
      </span>
      <div className="flex items-center gap-2 bg-dark-secondary rounded-lg p-1">
      <button
       onClick={() => setItemsPerRow(4)}
       className={`p-2 rounded transition-all ${
        itemsPerRow === 4
         ? "bg-mottu-500 text-white"
         : "text-text-muted hover:text-white hover:bg-dark-tertiary"
       }`}
       title="4 colunas"
      >
       <Squares2X2Icon className="h-5 w-5" />
      </button>
      <button
       onClick={() => setItemsPerRow(2)}
       className={`p-2 rounded transition-all ${
        itemsPerRow === 2
         ? "bg-mottu-500 text-white"
         : "text-text-muted hover:text-white hover:bg-dark-tertiary"
       }`}
       title="2 colunas"
      >
       <ViewColumnsIcon className="h-5 w-5" />
      </button>
      <button
       onClick={() => setItemsPerRow(1)}
       className={`p-2 rounded transition-all ${
        itemsPerRow === 1
         ? "bg-mottu-500 text-white"
         : "text-text-muted hover:text-white hover:bg-dark-tertiary"
       }`}
       title="1 coluna"
      >
       <Bars3Icon className="h-5 w-5" />
      </button>
     </div>
    </div>
    </div>

    {/* KPIs Grid - Always fixed layout */}
    <div className="grid gap-4 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
     <KpiCard
      title="% Críticos"
      value={`${kpis.criticalPercentage}%`}
      subtitle={`${kpis.critical} serviços`}
      color="text-rose-500"
      bgColor="bg-rose-500/10"
      borderColor="border-rose-400/20"
      icon={<ExclamationTriangleIcon className="h-6 w-6" />}
     />

     <KpiCard
      title="% SLA Cumprido"
      value={`${kpis.slaPercentage}%`}
      subtitle="Dentro do prazo"
      color="text-emerald-500"
      bgColor="bg-emerald-500/10"
      borderColor="border-emerald-400/20"
      icon={<CheckCircleIcon className="h-6 w-6" />}
     />

     <KpiCard
      title="Apropriações Finalizadas"
      value={kpis.completed}
      subtitle="Serviços completos"
      color="text-blue-500"
      bgColor="bg-blue-500/10"
      borderColor="border-blue-400/20"
      icon={<CheckCircleIcon className="h-6 w-6" />}
     />

     <KpiCard
      title="Chamados Abertos"
      value={kpis.open}
      subtitle="Aguardando atendimento"
      color="text-orange-500"
      bgColor="bg-orange-500/10"
      borderColor="border-orange-400/20"
      icon={<ClockIcon className="h-6 w-6" />}
     />

     <KpiCard
      title="Alertas Não Tratados"
      value={kpis.alerts}
      subtitle="Requerem atenção"
      color="text-red-500"
      bgColor="bg-red-500/10"
      borderColor="border-red-400/20"
      icon={<BellAlertIcon className="h-6 w-6" />}
     />

     <KpiCard
      title="Prestadores Ociosos"
      value={kpis.needsReview}
      subtitle="Sem atribuição"
      color="text-purple-500"
      bgColor="bg-purple-500/10"
      borderColor="border-purple-400/20"
      icon={<UserGroupIcon className="h-6 w-6" />}
     />

     <KpiCard
      title="Prestadores Offline"
      value="0"
      subtitle="Sem conexão"
      color="text-gray-500"
      bgColor="bg-gray-500/10"
      borderColor="border-gray-400/20"
      icon={<XCircleIcon className="h-6 w-6" />}
     />

     <KpiCard
      title="Total de Serviços"
      value={kpis.total}
      subtitle={`${kpis.critical} em rua • ${kpis.completed} apropriações`}
      color="text-mottu-500"
      bgColor="bg-mottu-500/10"
      borderColor="border-mottu-400/20"
      icon={<Squares2X2Icon className="h-6 w-6" />}
     />
    </div>

    {/* Services Grid */}
    <ServiceGrid
     services={filteredServices}
     onServiceSelect={handleServiceSelect}
     isLoading={isLoading}
     itemsPerRow={itemsPerRow}
    />

    <ServiceDetailDrawer
     service={selectedService}
     isOpen={isDrawerOpen}
     onClose={handleCloseDrawer}
    />
   </main>

   <ActionModal
    isOpen={isActionModalOpen}
    onClose={() => setIsActionModalOpen(false)}
    onSubmit={() => {}}
   />
  </div>
 );
}
