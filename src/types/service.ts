import { LogEntry } from "./log_entry";
import { Alert } from "./alert";
import { HistoryEvent } from "./history_event";

export interface Service {
 id: string;
 serviceName: string;
 status: string;
 vehiclePlate: string;
 branch: string;
 driver: string;
 hasAlert: boolean;
 needsReview: boolean;
 actionTaken: boolean;
 elapsedTime: number;
 slaProgress: number;
 serviceType: string;
 order: number;
 history: HistoryEvent[];
 alerts: Alert[];
 logs: LogEntry[];
 locations: Location[];
}
