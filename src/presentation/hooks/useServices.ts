"use client";

import { useState, useEffect, useCallback } from "react";
import { ServiceEntity, ServiceStatus } from "@/core/entities/service.entity";
import { IServiceRepository } from "@/core/interfaces/repositories/service.repository";
import { FilterServicesUseCase } from "@/core/use-cases/services/filter-services.use-case";

interface UseServicesOptions {
 repository: IServiceRepository;
 autoLoad?: boolean;
}

interface UseServicesFilters {
 searchTerm?: string;
 status?: ServiceStatus | "all";
 supervisorBranches?: string[];
 leaderBranch?: string;
}

export function useServices(options: UseServicesOptions) {
 const { repository, autoLoad = true } = options;

 const [services, setServices] = useState<ServiceEntity[]>([]);
 const [filteredServices, setFilteredServices] = useState<ServiceEntity[]>([]);
 const [filters, setFilters] = useState<UseServicesFilters>({
  status: "all",
 });
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<Error | null>(null);

 // Carregar serviços iniciais
 const loadServices = useCallback(async () => {
  setIsLoading(true);
  setError(null);

  try {
   const data = await repository.findAll();
   setServices(data);
   setFilteredServices(data);
  } catch (err) {
   setError(err instanceof Error ? err : new Error("Unknown error"));
  } finally {
   setIsLoading(false);
  }
 }, [repository]);

 // Aplicar filtros (usa Use Case)
 const applyFilters = useCallback(() => {
  const filterUseCase = new FilterServicesUseCase();
  const result = filterUseCase.execute({
   services,
   filters,
  });

  setFilteredServices(result.filteredServices);
 }, [services, filters]); // Atualizar filtros
 const updateFilters = useCallback(
  (newFilters: Partial<UseServicesFilters>) => {
   setFilters((prev) => ({ ...prev, ...newFilters }));
  },
  []
 );

 // Criar serviço
 const createService = useCallback(
  async (service: ServiceEntity) => {
   setIsLoading(true);
   setError(null);

   try {
    const created = await repository.create(service);
    setServices((prev) => [...prev, created]);
    return created;
   } catch (err) {
    setError(
     err instanceof Error ? err : new Error("Failed to create service")
    );
    throw err;
   } finally {
    setIsLoading(false);
   }
  },
  [repository]
 );

 // Atualizar serviço
 const updateService = useCallback(
  async (id: string, data: Partial<ServiceEntity>) => {
   setIsLoading(true);
   setError(null);

   try {
    const updated = await repository.update(id, data);
    setServices((prev) => prev.map((s) => (s.id === id ? updated : s)));
    return updated;
   } catch (err) {
    setError(
     err instanceof Error ? err : new Error("Failed to update service")
    );
    throw err;
   } finally {
    setIsLoading(false);
   }
  },
  [repository]
 );

 // Deletar serviço
 const deleteService = useCallback(
  async (id: string) => {
   setIsLoading(true);
   setError(null);

   try {
    await repository.delete(id);
    setServices((prev) => prev.filter((s) => s.id !== id));
   } catch (err) {
    setError(
     err instanceof Error ? err : new Error("Failed to delete service")
    );
    throw err;
   } finally {
    setIsLoading(false);
   }
  },
  [repository]
 );

 // Buscar serviços críticos
 const loadCriticalServices = useCallback(async () => {
  setIsLoading(true);
  setError(null);

  try {
   const critical = await repository.findCritical();
   setFilteredServices(critical);
  } catch (err) {
   setError(
    err instanceof Error ? err : new Error("Failed to load critical services")
   );
  } finally {
   setIsLoading(false);
  }
 }, [repository]);

 // Auto-load na montagem
 useEffect(() => {
  if (autoLoad) {
   loadServices();
  }
 }, [autoLoad, loadServices]);

 // Aplicar filtros quando mudarem
 useEffect(() => {
  if (services.length > 0) {
   applyFilters();
  }
 }, [filters, services.length, applyFilters]); // Estatísticas computadas
 const stats = {
  total: services.length,
  filtered: filteredServices.length,
  critical: filteredServices.filter(
   (s) => s.status === "critical" || s.hasAlert
  ).length,
  inProgress: filteredServices.filter((s) => s.status === "in_progress").length,
  open: filteredServices.filter((s) => s.status === "open").length,
  completed: filteredServices.filter((s) => s.status === "completed").length,
  needsReview: filteredServices.filter((s) => s.needsReview).length,
 };

 return {
  // Data
  services,
  filteredServices,
  filters,
  stats,

  // State
  isLoading,
  error,

  // Actions
  loadServices,
  applyFilters,
  updateFilters,
  createService,
  updateService,
  deleteService,
  loadCriticalServices,
 };
}
