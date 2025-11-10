import { ServiceEntity, ServiceFactory } from "@/core/entities/service.entity";
import { IServiceRepository } from "@/core/interfaces/repositories/service.repository";
import { generateMockServices } from "@/shared/utils/service-mock.utils";

// Implementação MOCK do repository (para desenvolvimento)
// Em produção, trocar por implementação com API HTTP

export class MockServiceRepository implements IServiceRepository {
 private services: ServiceEntity[] = [];

 constructor(initialData?: ServiceEntity[]) {
  if (initialData) {
   this.services = initialData;
  } else {
   // Usar dados mock existentes e converter para entities
   const legacyData = generateMockServices();
   this.services = legacyData.map((s) => ServiceFactory.fromLegacy(s));
  }
 }

 async findAll(): Promise<ServiceEntity[]> {
  // Simula delay de rede
  await this.delay(100);
  return [...this.services];
 }

 async findById(id: string): Promise<ServiceEntity | null> {
  await this.delay(50);
  return this.services.find((s) => s.id === id) ?? null;
 }

 async findByBranch(branch: string): Promise<ServiceEntity[]> {
  await this.delay(100);
  return this.services.filter((s) => s.branch === branch);
 }

 async findCritical(): Promise<ServiceEntity[]> {
  await this.delay(100);
  return this.services.filter((s) => s.status === "critical" || s.hasAlert);
 }

 async create(service: ServiceEntity): Promise<ServiceEntity> {
  await this.delay(200);
  this.services.push(service);
  return service;
 }

 async update(
  id: string,
  data: Partial<ServiceEntity>
 ): Promise<ServiceEntity> {
  await this.delay(200);

  const index = this.services.findIndex((s) => s.id === id);
  if (index === -1) {
   throw new Error(`Service with id ${id} not found`);
  }

  this.services[index] = {
   ...this.services[index],
   ...data,
   updatedAt: new Date(),
  };

  return this.services[index];
 }

 async delete(id: string): Promise<void> {
  await this.delay(200);
  this.services = this.services.filter((s) => s.id !== id);
 }

 async countByStatus(status: string): Promise<number> {
  await this.delay(50);
  return this.services.filter((s) => s.status === status).length;
 }

 async findPendingReview(): Promise<ServiceEntity[]> {
  await this.delay(100);
  return this.services.filter((s) => s.needsReview);
 }

 private delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
 }
}

// Implementação HTTP (exemplo para quando integrar com API)
export class HttpServiceRepository implements IServiceRepository {
 constructor(private readonly baseUrl: string) {}

 async findAll(): Promise<ServiceEntity[]> {
  const response = await fetch(`${this.baseUrl}/services`);
  if (!response.ok) throw new Error("Failed to fetch services");
  const data = await response.json();
  return data.map((s: any) => ServiceFactory.fromLegacy(s));
 }

 async findById(id: string): Promise<ServiceEntity | null> {
  const response = await fetch(`${this.baseUrl}/services/${id}`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Failed to fetch service");
  const data = await response.json();
  return ServiceFactory.fromLegacy(data);
 }

 async findByBranch(branch: string): Promise<ServiceEntity[]> {
  const response = await fetch(
   `${this.baseUrl}/services?branch=${encodeURIComponent(branch)}`
  );
  if (!response.ok) throw new Error("Failed to fetch services");
  const data = await response.json();
  return data.map((s: any) => ServiceFactory.fromLegacy(s));
 }

 async findCritical(): Promise<ServiceEntity[]> {
  const response = await fetch(`${this.baseUrl}/services?status=critical`);
  if (!response.ok) throw new Error("Failed to fetch critical services");
  const data = await response.json();
  return data.map((s: any) => ServiceFactory.fromLegacy(s));
 }

 async create(service: ServiceEntity): Promise<ServiceEntity> {
  const response = await fetch(`${this.baseUrl}/services`, {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(service),
  });
  if (!response.ok) throw new Error("Failed to create service");
  const data = await response.json();
  return ServiceFactory.fromLegacy(data);
 }

 async update(
  id: string,
  data: Partial<ServiceEntity>
 ): Promise<ServiceEntity> {
  const response = await fetch(`${this.baseUrl}/services/${id}`, {
   method: "PATCH",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update service");
  const responseData = await response.json();
  return ServiceFactory.fromLegacy(responseData);
 }

 async delete(id: string): Promise<void> {
  const response = await fetch(`${this.baseUrl}/services/${id}`, {
   method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete service");
 }

 async countByStatus(status: string): Promise<number> {
  const response = await fetch(
   `${this.baseUrl}/services/count?status=${status}`
  );
  if (!response.ok) throw new Error("Failed to count services");
  const data = await response.json();
  return data.count;
 }

 async findPendingReview(): Promise<ServiceEntity[]> {
  const response = await fetch(`${this.baseUrl}/services?needsReview=true`);
  if (!response.ok) throw new Error("Failed to fetch pending review services");
  const data = await response.json();
  return data.map((s: any) => ServiceFactory.fromLegacy(s));
 }
}
