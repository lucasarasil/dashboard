"use client";
import React, { useState } from "react";
import {
 ClockIcon,
 UserGroupIcon,
 CheckCircleIcon,
 ExclamationTriangleIcon,
 TruckIcon,
 BellIcon,
 FunnelIcon,
 HeartIcon,
 MapPinIcon,
 CalendarIcon,
 EyeSlashIcon,
 StopIcon,
} from "@heroicons/react/24/outline";
import KpiCard from "./kpi_card";
import ClusterTable from "./cluster_table";
import RankingCard from "./ranking_card";
import {
 clusters,
 calculateHealthScore,
 supervisores,
} from "../utils/cluster_data";

interface Cluster {
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

interface KPIThresholds {
 critical: number;
 attention: number;
}

interface KPIColors {
 text: string;
 bg: string;
 border: string;
}

interface Leader {
 id: string;
 nome: string;
 clusters: string[];
}

interface Supervisor {
 id: string;
 nome: string;
 lideres: Leader[];
}

const Dashboard2_Cluster = () => {
 const [filteredClusters, setFilteredClusters] = useState<Cluster[]>(
  clusters as Cluster[]
 );
 const [selectedCluster, setSelectedCluster] = useState<Cluster | null>(null);
 const [showClusterModal, setShowClusterModal] = useState(false);
 const [selectedSupervisor, setSelectedSupervisor] = useState("");
 const [selectedLeader, setSelectedLeader] = useState("");

 // Calcular KPIs principais
 const totalClusters = filteredClusters.length;
 const averageDelays =
  Math.round(
   filteredClusters.reduce((sum, c) => sum + c.atrasos, 0) / totalClusters
  ) || 0;
 const averageInactiveProviders =
  Math.round(
   filteredClusters.reduce((sum, c) => sum + c.faltas, 0) / totalClusters
  ) || 0;
 const averageAdherence =
  Math.round(
   filteredClusters.reduce((sum, c) => sum + c.adesao, 0) / totalClusters
  ) || 0;
 const averageSLA =
  Math.round(
   filteredClusters.reduce((sum, c) => sum + c.sla, 0) / totalClusters
  ) || 0;
 const totalDrivers = filteredClusters.reduce(
  (sum, c) => sum + c.motoristas,
  0
 );
 const totalAppropriationsInProgress = filteredClusters.reduce(
  (sum, c) => sum + c.apropriacoesEmAndamento,
  0
 );
 const totalAppropriationsFinalized = filteredClusters.reduce(
  (sum, c) => sum + c.apropriacoesFinalizadas,
  0
 );
 const totalAppropriationsOutOfRadius = filteredClusters.reduce(
  (sum, c) => sum + c.apropriacoesForaRaio,
  0
 );
 const totalAppropriationsOver60Days = filteredClusters.reduce(
  (sum, c) => sum + c.apropriacoesMais60Dias,
  0
 );
 const totalAppropriationsNotVisited = filteredClusters.reduce(
  (sum, c) => sum + c.apropriacoesNaoVisitadas,
  0
 );

 // Veículos e recursos
 const totalVehiclesStopped = filteredClusters.reduce(
  (sum, c) => sum + c.veiculosParados,
  0
 );

 // Calcular saúde geral
 const healthScore = calculateHealthScore(filteredClusters);

 // Função para obter cores dos KPIs (quanto maior, pior)
 const getKPIColorsHigherIsBad = (
  value: number,
  thresholds: KPIThresholds
 ): KPIColors => {
  if (value >= thresholds.critical) {
   return { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
  } else if (value >= thresholds.attention) {
   return {
    text: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
   };
  } else {
   return {
    text: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
   };
  }
 };

 // Função para obter cores dos KPIs (quanto menor, pior)
 const getKPIColorsLowerIsBad = (
  value: number,
  thresholds: KPIThresholds
 ): KPIColors => {
  if (value <= thresholds.critical) {
   return { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
  } else if (value <= thresholds.attention) {
   return {
    text: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
   };
  } else {
   return {
    text: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
   };
  }
 };

 // Thresholds para cada KPI
 const kpiThresholds = {
  delays: { critical: 25, attention: 15 },
  inactiveProviders: { critical: 8, attention: 5 },
  adherence: { critical: 70, attention: 80 },
  sla: { critical: 75, attention: 85 },
  appropriations: { critical: 50, attention: 60 },
 };

 // Função para filtrar clusters
 const filterClusters = (
  supervisorId = selectedSupervisor,
  leaderId = selectedLeader
 ) => {
  let filtered = [...clusters] as Cluster[];

  if (supervisorId) {
   const supervisor = (supervisores as Supervisor[]).find(
    (s) => s.id === supervisorId
   );
   if (supervisor) {
    const clusterIds = supervisor.lideres.flatMap((l) => l.clusters);
    filtered = filtered.filter((c) => clusterIds.includes(c.id));
   }
  }

  if (leaderId) {
   const allLeaders = (supervisores as Supervisor[]).flatMap((s) => s.lideres);
   const leader = allLeaders.find((l) => l.id === leaderId);
   if (leader) {
    filtered = filtered.filter((c) => leader.clusters.includes(c.id));
   }
  }

  setFilteredClusters(filtered);
 };

 // Handler para seleção de cluster
 const handleClusterSelect = (cluster: Cluster) => {
  setSelectedCluster(cluster);
  setShowClusterModal(true);
 };

 // Handler para supervisor
 const handleSupervisorChange = (supervisorId: string) => {
  setSelectedSupervisor(supervisorId);
  setSelectedLeader(""); // Reset líder
  filterClusters(supervisorId, "");
 };

 // Handler para líder
 const handleLeaderChange = (leaderId: string) => {
  setSelectedLeader(leaderId);
  filterClusters(selectedSupervisor, leaderId);
 };

 // Obter líderes disponíveis baseado no supervisor
 const availableLeaders = selectedSupervisor
  ? (supervisores as Supervisor[]).find((s) => s.id === selectedSupervisor)
     ?.lideres || []
  : [];

 // Cores para saúde geral
 const getHealthColors = (score: number): KPIColors => {
  if (score >= 80)
   return {
    text: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
   };
  if (score >= 60)
   return {
    text: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
   };
  return { text: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
 };

 return (
  <div className="h-full overflow-y-auto bg-gray-50">
   {/* Header */}
   <div className="bg-white border-b border-gray-200 px-6 py-6">
    <div className="flex items-center justify-between">
     <div>
      <h1 className="text-3xl font-bold text-gray-900">
       Performance Regional / Cluster
      </h1>
      <p className="text-gray-600 mt-1">
       Visão macro de capacidade operacional
      </p>
     </div>
     <div className="text-sm text-gray-500">
      Última atualização: {new Date().toLocaleString("pt-BR")}
     </div>
    </div>
   </div>

   <div className="p-6 space-y-6">
    {/* KPIs Principais */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
     <KpiCard
      title="Saúde Geral"
      value={`${healthScore}%`}
      icon={HeartIcon}
      {...getHealthColors(healthScore)}
     />
     <KpiCard
      title="% Atrasos"
      value={`${averageDelays}%`}
      icon={ClockIcon}
      {...getKPIColorsHigherIsBad(averageDelays, kpiThresholds.delays)}
     />
     <KpiCard
      title="% Faltas"
      value={`${averageInactiveProviders}%`}
      icon={UserGroupIcon}
      {...getKPIColorsHigherIsBad(
       averageInactiveProviders,
       kpiThresholds.inactiveProviders
      )}
     />
     <KpiCard
      title="% Adesão"
      value={`${averageAdherence}%`}
      icon={CheckCircleIcon}
      {...getKPIColorsLowerIsBad(averageAdherence, kpiThresholds.adherence)}
     />
     <KpiCard
      title="% SLA"
      value={`${averageSLA}%`}
      icon={ExclamationTriangleIcon}
      {...getKPIColorsLowerIsBad(averageSLA, kpiThresholds.sla)}
     />
     <KpiCard
      title="Motoristas"
      value={totalDrivers.toLocaleString()}
      icon={TruckIcon}
      text="text-blue-600"
      bg="bg-blue-50"
      border="border-blue-200"
     />
     <KpiCard
      title="Veículos Parados"
      value={totalVehiclesStopped.toLocaleString()}
      icon={StopIcon}
      text="text-red-600"
      bg="bg-red-50"
      border="border-red-200"
     />
     <KpiCard
      title="Aprop. Andamento"
      value={totalAppropriationsInProgress.toLocaleString()}
      icon={BellIcon}
      text="text-purple-600"
      bg="bg-purple-50"
      border="border-purple-200"
     />
     <KpiCard
      title="Aprop. Finalizadas"
      value={totalAppropriationsFinalized.toLocaleString()}
      icon={CheckCircleIcon}
      text="text-green-600"
      bg="bg-green-50"
      border="border-green-200"
     />
     <KpiCard
      title="Fora do Raio"
      value={totalAppropriationsOutOfRadius.toLocaleString()}
      icon={MapPinIcon}
      text="text-orange-600"
      bg="bg-orange-50"
      border="border-orange-200"
     />
     <KpiCard
      title="> 60 Dias"
      value={totalAppropriationsOver60Days.toLocaleString()}
      icon={CalendarIcon}
      text="text-red-600"
      bg="bg-red-50"
      border="border-red-200"
     />
     <KpiCard
      title="Não Visitadas"
      value={totalAppropriationsNotVisited.toLocaleString()}
      icon={EyeSlashIcon}
      text="text-yellow-600"
      bg="bg-yellow-50"
      border="border-yellow-200"
     />
    </div>

    {/* Filtros */}
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
     <div className="flex items-center space-x-4">
      <FunnelIcon className="h-5 w-5 text-gray-400" />
      <span className="text-sm font-medium text-gray-700">Filtros:</span>

      {/* Filtro Supervisor */}
      <select
       value={selectedSupervisor}
       onChange={(e) => handleSupervisorChange(e.target.value)}
       className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
       <option value="">Todos os Supervisores</option>
       {supervisores.map((sup) => (
        <option key={sup.id} value={sup.id}>
         {sup.nome}
        </option>
       ))}
      </select>

      {/* Filtro Líder */}
      <select
       value={selectedLeader}
       onChange={(e) => handleLeaderChange(e.target.value)}
       disabled={!selectedSupervisor}
       className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
       <option value="">Todos os Líderes</option>
       {availableLeaders.map((leader) => (
        <option key={leader.id} value={leader.id}>
         {leader.nome}
        </option>
       ))}
      </select>

      <div className="flex-1"></div>

      {/* Info de resultados */}
      <span className="text-sm text-gray-600">
       {filteredClusters.length} cluster
       {filteredClusters.length !== 1 ? "s" : ""} exibido
       {filteredClusters.length !== 1 ? "s" : ""}
      </span>
     </div>
    </div>

    {/* Tabela de clusters - Full width */}
    <div>
     <ClusterTable
      clusters={filteredClusters}
      onClusterSelect={handleClusterSelect}
     />
    </div>

    {/* Ranking e tendências - Full width */}
    <div>
     <RankingCard clusters={filteredClusters} />
    </div>
   </div>

   {/* Modal de detalhes do cluster */}
   {showClusterModal && selectedCluster && (
    <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex items-center justify-center p-4">
     <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
       <h3 className="text-xl font-bold text-gray-900">Detalhes do Cluster</h3>
       <button
        onClick={() => setShowClusterModal(false)}
        className="text-gray-400 hover:text-gray-600"
       >
        ✕
       </button>
      </div>

      <div className="space-y-4">
       <div>
        <h4 className="font-semibold text-gray-900">{selectedCluster.nome}</h4>
        <p className="text-gray-600">{selectedCluster.filial}</p>
       </div>

       <div className="grid grid-cols-2 gap-4">
        <div>
         <span className="text-sm text-gray-500">Líder:</span>
         <p className="font-medium">{selectedCluster.lider}</p>
        </div>
        <div>
         <span className="text-sm text-gray-500">Supervisor:</span>
         <p className="font-medium">{selectedCluster.supervisor}</p>
        </div>
        <div>
         <span className="text-sm text-gray-500">Motoristas:</span>
         <p className="font-medium">
          {selectedCluster.motoristas} / {selectedCluster.motoristasNecessarios}
         </p>
        </div>
        <div>
         <span className="text-sm text-gray-500">Status:</span>
         <p className="font-medium capitalize">{selectedCluster.status}</p>
        </div>
       </div>

       {/* Comparação D-1 */}
       <div className="pt-4 border-t">
        <h5 className="font-semibold text-gray-900 mb-3">
         Comparação D-1 (Dia Anterior)
        </h5>
        <div className="grid grid-cols-2 gap-3 text-sm">
         <div>
          <span className="text-gray-500">Atrasos:</span>
          <span
           className={`ml-2 font-medium ${
            selectedCluster.atrasos < selectedCluster.d1.atrasos
             ? "text-green-600"
             : "text-red-600"
           }`}
          >
           {selectedCluster.d1.atrasos}% → {selectedCluster.atrasos}%
          </span>
         </div>
         <div>
          <span className="text-gray-500">SLA:</span>
          <span
           className={`ml-2 font-medium ${
            selectedCluster.sla > selectedCluster.d1.sla
             ? "text-green-600"
             : "text-red-600"
           }`}
          >
           {selectedCluster.d1.sla}% → {selectedCluster.sla}%
          </span>
         </div>
        </div>
       </div>

       <div className="pt-4 border-t">
        <p className="text-sm text-gray-500">
         Detalhes completos e ações serão implementados em breve.
        </p>
       </div>
      </div>
     </div>
    </div>
   )}
  </div>
 );
};

export default Dashboard2_Cluster;
