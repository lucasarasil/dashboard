export interface ActionEntity {
 id: string;
 serviceId: string;
 type: string;
 description: string;
 responsible: string;
 timestamp: Date;
 details?: Record<string, any>;
}
