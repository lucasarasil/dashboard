export type ClusterStatus = "operational" | "warning" | "critical";

export interface ClusterEntity {
 id: string;
 nome: string;
 lider?: string;
 supervisor?: string;
 status: ClusterStatus;
 atrasos: number;
 faltas: number;
 adesao: number;
 sla: number;
 motoristas: number;
 motoristasNecessarios: number;
 apropriacoes: number;
 apropriacoesEmAndamento: number;
 apropriacoesFinalizadas: number;
 apropriacoesForaRaio: number;
 apropricoesAcima60Dias: number;
 apropriacoesNaoVisitadas: number;
 veiculosParados: number;
 carros?: number;
 motos?: number;
 celulares?: number;
 healthScore: number;
 createdAt: Date;
 updatedAt: Date;
}

export class ClusterFactory {
 static create(data: Partial<ClusterEntity>): ClusterEntity {
  const now = new Date();

  return {
   id: data.id ?? this.generateId(),
   nome: data.nome ?? "",
   status: data.status ?? "operational",
   atrasos: data.atrasos ?? 0,
   faltas: data.faltas ?? 0,
   adesao: data.adesao ?? 100,
   sla: data.sla ?? 100,
   motoristas: data.motoristas ?? 0,
   motoristasNecessarios: data.motoristasNecessarios ?? 0,
   apropriacoes: data.apropriacoes ?? 0,
   apropriacoesEmAndamento: data.apropriacoesEmAndamento ?? 0,
   apropriacoesFinalizadas: data.apropriacoesFinalizadas ?? 0,
   apropriacoesForaRaio: data.apropriacoesForaRaio ?? 0,
   apropricoesAcima60Dias: data.apropricoesAcima60Dias ?? 0,
   apropriacoesNaoVisitadas: data.apropriacoesNaoVisitadas ?? 0,
   veiculosParados: data.veiculosParados ?? 0,
   healthScore: data.healthScore ?? 100,
   createdAt: data.createdAt ?? now,
   updatedAt: data.updatedAt ?? now,
  };
 }

 private static generateId(): string {
  return `CLU-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
 }
}

// Value Object para Health Score
export class HealthScore {
 constructor(private readonly value: number) {
  if (value < 0 || value > 100) {
   throw new Error("Health score must be between 0 and 100");
  }
 }

 getValue(): number {
  return this.value;
 }

 getStatus(): ClusterStatus {
  if (this.value >= 80) return "operational";
  if (this.value >= 60) return "warning";
  return "critical";
 }

 getColorClass(): string {
  if (this.value >= 80) return "text-emerald-400";
  if (this.value >= 60) return "text-amber-400";
  return "text-rose-400";
 }

 getBgColorClass(): string {
  if (this.value >= 80) return "bg-emerald-500/10";
  if (this.value >= 60) return "bg-amber-500/10";
  return "bg-rose-500/10";
 }
}
