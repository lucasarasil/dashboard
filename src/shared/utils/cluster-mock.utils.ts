// Utility functions para gerar mock clusters
import { ClusterEntity, ClusterStatus } from "@/core/entities/cluster.entity";

const branches = [
 "Fortaleza",
 "Butantã",
 "São Paulo Centro",
 "Rio de Janeiro",
 "Belo Horizonte",
 "Porto Alegre",
 "Curitiba",
 "Salvador",
];

const leaders = [
 "Wandrerson",
 "Bruno DE.",
 "Carlos Silva",
 "Maria Santos",
 "Pedro Oliveira",
 "Fernando Costa",
 "Patricia Lima",
 "Fernanda Souza",
];

const supervisors = [
 "Rodrigo",
 "Evandro",
 "Ana Lima",
 "João Costa",
 "Lucia Ferreira",
 "Marcos Silva",
 "Juliana Souza",
 "Roberto Alves",
];

function randomInt(min: number, max: number): number {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomStatus(): ClusterStatus {
 const rand = Math.random();
 if (rand < 0.7) return "operational";
 if (rand < 0.9) return "warning";
 return "critical";
}
export function generateMockClusters(count: number = 8): ClusterEntity[] {
 const clusters: ClusterEntity[] = [];

 for (let i = 0; i < count; i++) {
  const id = `cluster-${i + 1}`;
  const branch = branches[i % branches.length];
  const status = randomStatus();

  const delays =
   status === "critical"
    ? randomInt(20, 40)
    : status === "warning"
    ? randomInt(10, 20)
    : randomInt(0, 10);
  const absences =
   status === "critical"
    ? randomInt(8, 15)
    : status === "warning"
    ? randomInt(4, 8)
    : randomInt(0, 4);
  const adhesion =
   status === "critical"
    ? randomInt(60, 75)
    : status === "warning"
    ? randomInt(75, 85)
    : randomInt(85, 98);
  const sla =
   status === "critical"
    ? randomInt(70, 80)
    : status === "warning"
    ? randomInt(80, 90)
    : randomInt(90, 98);

  const drivers = randomInt(150, 220);
  const requiredDrivers = randomInt(drivers - 10, drivers + 15);
  const stoppedVehicles =
   status === "critical"
    ? randomInt(10, 20)
    : status === "warning"
    ? randomInt(5, 10)
    : randomInt(0, 5);

  const ongoingAllocations = randomInt(10, 30);
  const completedAllocations = randomInt(100, 200);
  const outOfRadiusAllocations = randomInt(0, 5);
  const over60DaysAllocations = randomInt(0, 3);
  const notVisitedAllocations = randomInt(0, 8);

  const carros = randomInt(
   Math.floor(drivers * 0.5),
   Math.floor(drivers * 0.7)
  );
  const motos = drivers - carros;
  const celulares = drivers;

  clusters.push({
   id,
   nome: `Mottu ${branch}`,
   lider: leaders[i % leaders.length],
   supervisor: supervisors[i % supervisors.length],
   status,
   atrasos: delays,
   faltas: absences,
   adesao: adhesion,
   sla,
   motoristas: drivers,
   motoristasNecessarios: requiredDrivers,
   apropriacoes: completedAllocations + ongoingAllocations,
   apropriacoesEmAndamento: ongoingAllocations,
   apropriacoesFinalizadas: completedAllocations,
   apropriacoesForaRaio: outOfRadiusAllocations,
   apropricoesAcima60Dias: over60DaysAllocations,
   apropriacoesNaoVisitadas: notVisitedAllocations,
   veiculosParados: stoppedVehicles,
   carros,
   motos,
   celulares,
   healthScore: adhesion, // Using adhesion as a proxy for health score
   createdAt: new Date(),
   updatedAt: new Date(),
  });
 }

 return clusters;
}
