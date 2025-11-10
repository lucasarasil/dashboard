// Page de Dashboard com Clean Architecture
"use client";

import React, { useState } from "react";
import { ServiceEntity } from "@/core/entities/service.entity";
import { useServices } from "@/presentation/hooks/useServices";
import { useRepository } from "@/presentation/contexts";
import { ServiceGrid } from "@/presentation/components/features/services";
import {
 Header,
 DashboardMenu,
} from "@/presentation/components/features/dashboard";

export default function DashboardPage() {
 const { serviceRepository } = useRepository();
 const [_selectedService, _setSelectedService] = useState<ServiceEntity | null>(
  null
 );

 const { filteredServices, isLoading, error, updateFilters } = useServices({
  repository: serviceRepository,
 });

 const handleServiceSelect = (service: ServiceEntity) => {
  _setSelectedService(service);
 };

 const handleSearch = (term: string) => {
  updateFilters({ searchTerm: term });
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
  <div className="h-screen flex bg-dark-primary">
   <DashboardMenu activePath="/" />

   <div className="flex-1 flex flex-col overflow-hidden">
    <Header services={filteredServices} onSearch={handleSearch} />

    <main className="flex-1 overflow-hidden">
     <ServiceGrid
      services={filteredServices}
      onServiceSelect={handleServiceSelect}
      isLoading={isLoading}
     />
    </main>
   </div>
  </div>
 );
}
