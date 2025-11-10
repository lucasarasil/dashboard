import { ServiceEntity } from "@/core/entities/service.entity";

export interface IServiceRepository {
 findAll(): Promise<ServiceEntity[]>;
 findById(id: string): Promise<ServiceEntity | null>;
 findByBranch(branch: string): Promise<ServiceEntity[]>;
 findCritical(): Promise<ServiceEntity[]>;

 create(service: ServiceEntity): Promise<ServiceEntity>;
 update(id: string, data: Partial<ServiceEntity>): Promise<ServiceEntity>;
 delete(id: string): Promise<void>;

 countByStatus(status: string): Promise<number>;
 findPendingReview(): Promise<ServiceEntity[]>;
}

export function isServiceEntity(obj: unknown): obj is ServiceEntity {
 if (typeof obj !== "object" || obj === null) return false;

 const service = obj as Record<string, unknown>;

 return (
  typeof service.id === "string" &&
  typeof service.serviceName === "string" &&
  typeof service.status === "string" &&
  typeof service.vehiclePlate === "string"
 );
}
