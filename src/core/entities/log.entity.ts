export interface LogEntity {
 id: string;
 serviceId: string;
 level: "info" | "warning" | "error" | "debug";
 message: string;
 timestamp: Date;
 metadata?: Record<string, any>;
}
