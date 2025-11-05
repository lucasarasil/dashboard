export interface HistoryEvent {
 id: string | number;
 action: string;
 timestamp: string;
 responsible?: string;
 details?: string;
 type: string;
}
