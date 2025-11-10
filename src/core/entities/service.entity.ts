import { AlertEntity } from "./alert.entity";
import { ActionEntity } from "./action.entity";
import { LogEntity } from "./log.entity";
import { LocationEntity } from "./location.entity";

export type ServiceStatus =
 | "open"
 | "in_progress"
 | "critical"
 | "completed"
 | "pending";
export type ServiceType = "street_call" | "appropriation";

export interface ServiceEntity {
 id: string;
 title: string;
 status: ServiceStatus;
 type: ServiceType;
 sla: number;
 slaProgress: number;
 branch: string;
 provider?: string;
 hasAlert: boolean;
 needsReview: boolean;
 actionTaken: boolean;
 createdAt: Date;
 updatedAt: Date;
 alerts: AlertEntity[];
 history: ActionEntity[];
 logs: LogEntity[];
 location: LocationEntity;
}

export class SLAProgress {
 constructor(private readonly value: number) {
  if (value < 0 || value > 100) {
   throw new Error("SLA progress must be between 0 and 100");
  }
 }

 getValue(): number {
  return this.value;
 }

 isCritical(): boolean {
  return this.value > 80;
 }

 isWarning(): boolean {
  return this.value > 60 && this.value <= 80;
 }

 isNormal(): boolean {
  return this.value <= 60;
 }

 getColorClass(): string {
  if (this.isCritical()) return "text-red-400";
  if (this.isWarning()) return "text-yellow-400";
  return "text-mottu-500";
 }
}

export class ServiceFactory {
 static create(data: Partial<ServiceEntity>): ServiceEntity {
  const now = new Date();

  return {
   id: data.id ?? this.generateId(),
   title: data.title ?? "",
   status: data.status ?? "open",
   type: data.type ?? "street_call",
   sla: data.sla ?? 0,
   slaProgress: data.slaProgress ?? 0,
   branch: data.branch ?? "",
   provider: data.provider ?? undefined,
   hasAlert: data.hasAlert ?? false,
   needsReview: data.needsReview ?? false,
   actionTaken: data.actionTaken ?? false,
   createdAt: data.createdAt ?? now,
   updatedAt: data.updatedAt ?? now,
   alerts: data.alerts ?? [],
   history: data.history ?? [],
   logs: data.logs ?? [],
   location: data.location!,
  };
 }

 private static generateId(): string {
  return `SRV-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
 }

 static fromLegacy(legacyService: any): ServiceEntity {
  return this.create({
   id: legacyService.id,
   title: legacyService.serviceName || legacyService.name,
   status: legacyService.status,
   type: legacyService.serviceType,
   sla: legacyService.sla,
   slaProgress: legacyService.slaProgress,
   branch: legacyService.branch,
   provider: legacyService.provider,
   hasAlert: legacyService.hasAlert,
   needsReview: legacyService.needsReview,
   actionTaken: legacyService.actionTaken,
   createdAt: legacyService.createdAt
    ? new Date(legacyService.createdAt)
    : new Date(),
   updatedAt: legacyService.updatedAt
    ? new Date(legacyService.updatedAt)
    : new Date(),
   alerts: legacyService.alerts,
   history: legacyService.history,
   logs: legacyService.logs,
   location: legacyService.location,
  });
 }
}
