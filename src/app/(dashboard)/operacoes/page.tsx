"use client";

import React from "react";
import { useRepository } from "@/presentation/contexts";
import { useServices } from "@/presentation/hooks/useServices";
import {
 ServiceGrid,
 ServiceDetailDrawer,
} from "@/presentation/components/features/services";
import { DashboardMenu } from "@/presentation/components/features/dashboard";
import { ActionModal } from "@/presentation/components/common";
import { ServiceEntity } from "@/core/entities/service.entity";

export default function DashboardPage() {
 const { serviceRepository } = useRepository();
 const [selectedService, setSelectedService] =
  React.useState<ServiceEntity | null>(null);
 const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 const [isActionModalOpen, setIsActionModalOpen] = React.useState(false);
 const [searchTerm, setSearchTerm] = React.useState("");

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
   <DashboardMenu activePath="/" onSearch={setSearchTerm} />

   <main className="flex overflow-hidden h-screen">
    <ServiceGrid
     services={filteredServices}
     onServiceSelect={handleServiceSelect}
     isLoading={isLoading}
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
