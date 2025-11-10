import { ClusterEntity } from "@/core/entities/cluster.entity";

export interface CalculateHealthScoreInput {
 cluster: ClusterEntity;
 thresholds: {
  delays: { critical: number; attention: number };
  inactiveProviders: { critical: number; attention: number };
  adherence: { critical: number; attention: number };
  sla: { critical: number; attention: number };
 };
}

export interface CalculateHealthScoreOutput {
 healthScore: number;
 status: "operational" | "warning" | "critical";
 issues: string[];
}

export class CalculateHealthScoreUseCase {
 execute(input: CalculateHealthScoreInput): CalculateHealthScoreOutput {
  const { cluster, thresholds } = input;
  const issues: string[] = [];
  let totalScore = 100;

  // Avaliar atrasos
  if (cluster.atrasos >= thresholds.delays.critical) {
   totalScore -= 25;
   issues.push(`Atrasos críticos: ${cluster.atrasos}`);
  } else if (cluster.atrasos >= thresholds.delays.attention) {
   totalScore -= 10;
   issues.push(`Atrasos em atenção: ${cluster.atrasos}`);
  }

  // Avaliar faltas (prestadores inativos)
  if (cluster.faltas >= thresholds.inactiveProviders.critical) {
   totalScore -= 25;
   issues.push(`Prestadores inativos críticos: ${cluster.faltas}`);
  } else if (cluster.faltas >= thresholds.inactiveProviders.attention) {
   totalScore -= 10;
   issues.push(`Prestadores inativos em atenção: ${cluster.faltas}`);
  }

  // Avaliar adesão
  if (cluster.adesao <= thresholds.adherence.critical) {
   totalScore -= 20;
   issues.push(`Adesão crítica: ${cluster.adesao}%`);
  } else if (cluster.adesao <= thresholds.adherence.attention) {
   totalScore -= 10;
   issues.push(`Adesão em atenção: ${cluster.adesao}%`);
  }

  // Avaliar SLA
  if (cluster.sla <= thresholds.sla.critical) {
   totalScore -= 20;
   issues.push(`SLA crítico: ${cluster.sla}%`);
  } else if (cluster.sla <= thresholds.sla.attention) {
   totalScore -= 10;
   issues.push(`SLA em atenção: ${cluster.sla}%`);
  }

  // Avaliar motoristas
  const driverRatio = cluster.motoristas / cluster.motoristasNecessarios;
  if (driverRatio < 0.7) {
   totalScore -= 10;
   issues.push(
    `Falta de motoristas: ${cluster.motoristas}/${cluster.motoristasNecessarios}`
   );
  }

  // Garantir que o score não seja negativo
  totalScore = Math.max(0, totalScore);

  // Determinar status baseado no score
  let status: "operational" | "warning" | "critical";
  if (totalScore >= 80) {
   status = "operational";
  } else if (totalScore >= 60) {
   status = "warning";
  } else {
   status = "critical";
  }

  return {
   healthScore: totalScore,
   status,
   issues,
  };
 }
}

export const calculateHealthScore = (
 input: CalculateHealthScoreInput
): CalculateHealthScoreOutput => {
 const useCase = new CalculateHealthScoreUseCase();
 return useCase.execute(input);
};
