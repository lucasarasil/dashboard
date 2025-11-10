import { ClusterEntity, ClusterFactory } from "@/core/entities/cluster.entity";
import { IClusterRepository } from "@/core/interfaces/repositories/cluster.repository";
import { generateMockClusters } from "@/shared/utils/cluster-mock.utils";

export class MockClusterRepository implements IClusterRepository {
 private clusters: ClusterEntity[] = generateMockClusters(8);

 constructor(initialData?: ClusterEntity[]) {
  if (initialData) {
   this.clusters = initialData;
  } else {
   const legacyData = generateMockClusters();
   this.clusters = legacyData.map((c: any) =>
    ClusterFactory.create({
     id: c.id,
     nome: c.nome,
     status: c.status,
     atrasos: c.atrasos,
     faltas: c.faltas,
     adesao: c.adesao,
     sla: c.sla,
     motoristas: c.motoristas,
     motoristasNecessarios: c.motoristasNecessarios,
     apropriacoes: c.apropriacoes,
     apropriacoesEmAndamento: c.apropriacoesEmAndamento,
     apropriacoesFinalizadas: c.apropriacoesFinalizadas,
     apropriacoesForaRaio: c.apropriacoesForaRaio,
     apropricoesAcima60Dias: c.apropricoesAcima60Dias,
     apropriacoesNaoVisitadas: c.apropriacoesNaoVisitadas,
     veiculosParados: c.veiculosParados,
     healthScore: c.healthScore || 80,
    })
   );
  }
 }

 async findAll(): Promise<ClusterEntity[]> {
  await this.delay(100);
  return [...this.clusters];
 }

 async findById(id: string): Promise<ClusterEntity | null> {
  await this.delay(50);
  return this.clusters.find((c) => c.id === id) ?? null;
 }

 async findByStatus(status: string): Promise<ClusterEntity[]> {
  await this.delay(100);
  return this.clusters.filter((c) => c.status === status);
 }

 async create(cluster: ClusterEntity): Promise<ClusterEntity> {
  await this.delay(200);
  this.clusters.push(cluster);
  return cluster;
 }

 async update(
  id: string,
  data: Partial<ClusterEntity>
 ): Promise<ClusterEntity> {
  await this.delay(200);

  const index = this.clusters.findIndex((c) => c.id === id);
  if (index === -1) {
   throw new Error(`Cluster with id ${id} not found`);
  }

  this.clusters[index] = {
   ...this.clusters[index],
   ...data,
   updatedAt: new Date(),
  };

  return this.clusters[index];
 }

 async delete(id: string): Promise<void> {
  await this.delay(200);
  this.clusters = this.clusters.filter((c) => c.id !== id);
 }

 private delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
 }
}
