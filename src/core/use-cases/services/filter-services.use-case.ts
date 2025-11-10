import { ServiceEntity, ServiceStatus } from "@/core/entities/service.entity";

// Interface do Use Case (Input/Output)
export interface FilterServicesInput {
 services: ServiceEntity[];
 filters: {
  searchTerm?: string;
  status?: ServiceStatus | "all";
  supervisorBranches?: string[];
  leaderBranch?: string;
 };
}

export interface FilterServicesOutput {
 filteredServices: ServiceEntity[];
 totalCount: number;
 criticalCount: number;
}

// Use Case puro - lógica de negócio isolada
export class FilterServicesUseCase {
 execute(input: FilterServicesInput): FilterServicesOutput {
  let filtered = [...input.services];

  // Aplicar filtro de status
  if (input.filters.status && input.filters.status !== "all") {
   filtered = this.filterByStatus(filtered, input.filters.status);
  }

  // Aplicar filtro hierárquico (supervisor)
  if (
   input.filters.supervisorBranches &&
   input.filters.supervisorBranches.length > 0
  ) {
   filtered = this.filterBySupervisorBranches(
    filtered,
    input.filters.supervisorBranches
   );
  }

  // Aplicar filtro hierárquico (líder)
  if (input.filters.leaderBranch) {
   filtered = this.filterByLeaderBranch(filtered, input.filters.leaderBranch);
  }

  // Aplicar busca textual
  if (input.filters.searchTerm) {
   filtered = this.filterBySearchTerm(filtered, input.filters.searchTerm);
  }

  return {
   filteredServices: filtered,
   totalCount: filtered.length,
   criticalCount: this.countCritical(filtered),
  };
 }

 private filterByStatus(
  services: ServiceEntity[],
  status: ServiceStatus
 ): ServiceEntity[] {
  return services.filter((s) => s.status === status);
 }

 private filterBySupervisorBranches(
  services: ServiceEntity[],
  branches: string[]
 ): ServiceEntity[] {
  return services.filter((s) => branches.includes(s.branch));
 }

 private filterByLeaderBranch(
  services: ServiceEntity[],
  branch: string
 ): ServiceEntity[] {
  return services.filter((s) => s.branch === branch);
 }

 private filterBySearchTerm(
  services: ServiceEntity[],
  term: string
 ): ServiceEntity[] {
  const searchLower = term.toLowerCase();

  return services.filter(
   (service) =>
    service.id.toLowerCase().includes(searchLower) ||
    service.title.toLowerCase().includes(searchLower) ||
    service.branch.toLowerCase().includes(searchLower) ||
    (service.provider && service.provider.toLowerCase().includes(searchLower))
  );
 }

 private countCritical(services: ServiceEntity[]): number {
  return services.filter((s) => s.status === "critical" || s.hasAlert).length;
 }
}

// Factory para facilitar uso
export const filterServices = (
 input: FilterServicesInput
): FilterServicesOutput => {
 const useCase = new FilterServicesUseCase();
 return useCase.execute(input);
};
