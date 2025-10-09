// Common types used across the application

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
 logs: unknown[];
 locations: Location[];
}

export interface Alert {
 id: number;
 title: string;
 description: string;
 severity: string;
 status: string;
 timestamp: string;
}

export interface HistoryEvent {
 id: number;
 action: string;
 timestamp: string;
 responsible: string;
 type: string;
}

export interface Location {
 id: string;
 name: string;
 type: string;
 address: string;
 status: string;
}

export interface Cluster {
 id: string;
 nome: string;
 filial: string;
 lider: string;
 supervisor: string;
 atrasos: number;
 faltas: number;
 adesao: number;
 sla: number;
 motoristas: number;
 motoristasNecessarios: number;
 veiculosParados: number;
 carrosAtivos: number;
 carrosNecessarios: number;
 motosAtivas: number;
 motasNecessarias: number;
 celularesAtivos: number;
 celularesNecessarios: number;
 apropriacoesEmAndamento: number;
 apropriacoesFinalizadas: number;
 apropriacoesForaRaio: number;
 apropriacoesMais60Dias: number;
 apropriacoesNaoVisitadas: number;
 produtividadeApropriacao: number;
 status: string;
 d1: {
  atrasos: number;
  faltas: number;
  adesao: number;
  sla: number;
  apropriacoesFinalizadas: number;
 };
}

export interface Leader {
 id: string;
 nome: string;
 clusters: string[];
}

export interface Supervisor {
 id: string;
 nome: string;
 lideres: Leader[];
}
