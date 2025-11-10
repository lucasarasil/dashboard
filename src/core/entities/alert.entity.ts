export type AlertSeverity = "low" | "medium" | "high" | "critical";
export type AlertType = "sla" | "delay" | "vehicle" | "provider" | "system";
export type AlertStatus = "active" | "acknowledged" | "resolved" | "dismissed";

export interface AlertEntity {
 id: string;
 serviceId: string;
 type: AlertType;
 severity: AlertSeverity;
 status: AlertStatus;
 title: string;
 message: string;
 timestamp: Date;
 acknowledgedAt?: Date;
 acknowledgedBy?: string;
 resolvedAt?: Date;
 resolvedBy?: string;
 metadata?: Record<string, unknown>;
 createdAt: Date;
 updatedAt: Date;
}

export class AlertFactory {
 static create(data: Partial<AlertEntity>): AlertEntity {
  const now = new Date();

  return {
   id: data.id ?? this.generateId(),
   serviceId: data.serviceId ?? "",
   type: data.type ?? "system",
   severity: data.severity ?? "medium",
   status: data.status ?? "active",
   title: data.title ?? "",
   message: data.message ?? "",
   timestamp: data.timestamp ?? now,
   acknowledgedAt: data.acknowledgedAt,
   acknowledgedBy: data.acknowledgedBy,
   resolvedAt: data.resolvedAt,
   resolvedBy: data.resolvedBy,
   metadata: data.metadata,
   createdAt: data.createdAt ?? now,
   updatedAt: data.updatedAt ?? now,
  };
 }

 private static generateId(): string {
  return `ALT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
 }
}

export class AlertSeverityLevel {
 constructor(private readonly severity: AlertSeverity) {}

 getValue(): AlertSeverity {
  return this.severity;
 }

 getPriority(): number {
  const priorities = {
   low: 1,
   medium: 2,
   high: 3,
   critical: 4,
  };
  return priorities[this.severity];
 }

 getColorClass(): string {
  const colors = {
   low: "text-blue-400",
   medium: "text-yellow-400",
   high: "text-orange-400",
   critical: "text-red-400",
  };
  return colors[this.severity];
 }

 getBgColorClass(): string {
  const colors = {
   low: "bg-blue-500/10",
   medium: "bg-yellow-500/10",
   high: "bg-orange-500/10",
   critical: "bg-red-500/10",
  };
  return colors[this.severity];
 }

 isCritical(): boolean {
  return this.severity === "critical";
 }

 isHighPriority(): boolean {
  return this.severity === "critical" || this.severity === "high";
 }
}
