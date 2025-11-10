export interface LogEntry {
 id: string;
 timestamp: Date;
 level: "info" | "warning" | "error" | "debug";
 message: string;
 service?: string;
 metadata?: Record<string, unknown>;
}
