"use client";

import React, { useMemo } from "react";
import { useClusters } from "@/presentation/hooks/useClusters";
import {
 ClusterTable,
 CriticalClusterCard,
 ClusterVariationCard,
} from "@/presentation/components/features/clusters";
import {
 DashboardMenu,
 Header,
} from "@/presentation/components/features/dashboard";
import { KpiCard } from "@/presentation/components/common";
import {
 UserGroupIcon,
 TruckIcon,
 DocumentTextIcon,
 MapPinIcon,
 ClockIcon,
 ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function ClustersPage() {
 const { clusters, isLoading, error } = useClusters();

 // Calcular KPIs agregados
 const kpis = useMemo(() => {
  const totalMotoristas = clusters.reduce((acc, c) => acc + c.motoristas, 0);
  const totalVeiculosParados = clusters.reduce(
   (acc, c) => acc + c.veiculosParados,
   0
  );
  const totalApropriacoesAndamento = clusters.reduce(
   (acc, c) => acc + c.apropriacoesEmAndamento,
   0
  );
  const totalApropriacoesFinalizadas = clusters.reduce(
   (acc, c) => acc + c.apropriacoesFinalizadas,
   0
  );
  const totalForaRaio = clusters.reduce(
   (acc, c) => acc + c.apropriacoesForaRaio,
   0
  );
  const totalAcima60Dias = clusters.reduce(
   (acc, c) => acc + c.apropricoesAcima60Dias,
   0
  );
  const totalNaoVisitadas = clusters.reduce(
   (acc, c) => acc + c.apropriacoesNaoVisitadas,
   0
  );

  // Calcular médias ponderadas
  const saudeGeralMedia =
   clusters.length > 0
    ? Math.round(
       clusters.reduce((acc, c) => acc + c.healthScore, 0) / clusters.length
      )
    : 0;

  const atrasosMedio =
   clusters.length > 0
    ? Math.round(
       clusters.reduce((acc, c) => acc + c.atrasos, 0) / clusters.length
      )
    : 0;

  const faltasMedio =
   clusters.length > 0
    ? Math.round(
       clusters.reduce((acc, c) => acc + c.faltas, 0) / clusters.length
      )
    : 0;

  const adesaoMedia =
   clusters.length > 0
    ? Math.round(
       clusters.reduce((acc, c) => acc + c.adesao, 0) / clusters.length
      )
    : 0;

  const slaMedia =
   clusters.length > 0
    ? Math.round(clusters.reduce((acc, c) => acc + c.sla, 0) / clusters.length)
    : 0;

  return [
   {
    title: "Saúde Geral",
    value: `${saudeGeralMedia}%`,
    color:
     saudeGeralMedia >= 80
      ? "text-emerald-400"
      : saudeGeralMedia >= 60
      ? "text-amber-400"
      : "text-rose-400",
    bgColor:
     saudeGeralMedia >= 80
      ? "bg-emerald-500/10"
      : saudeGeralMedia >= 60
      ? "bg-amber-500/10"
      : "bg-rose-500/10",
    borderColor:
     saudeGeralMedia >= 80
      ? "border-emerald-400/20"
      : saudeGeralMedia >= 60
      ? "border-amber-400/20"
      : "border-rose-400/20",
    icon: <ExclamationTriangleIcon className="h-6 w-6" />,
   },
   {
    title: "% Atrasos",
    value: `${atrasosMedio}%`,
    color:
     atrasosMedio > 20
      ? "text-rose-400"
      : atrasosMedio > 10
      ? "text-amber-400"
      : "text-emerald-400",
    bgColor:
     atrasosMedio > 20
      ? "bg-rose-500/10"
      : atrasosMedio > 10
      ? "bg-amber-500/10"
      : "bg-emerald-500/10",
    borderColor:
     atrasosMedio > 20
      ? "border-rose-400/20"
      : atrasosMedio > 10
      ? "border-amber-400/20"
      : "border-emerald-400/20",
    icon: <ClockIcon className="h-6 w-6" />,
   },
   {
    title: "% Faltas",
    value: `${faltasMedio}%`,
    color:
     faltasMedio > 10
      ? "text-rose-400"
      : faltasMedio > 5
      ? "text-amber-400"
      : "text-emerald-400",
    bgColor:
     faltasMedio > 10
      ? "bg-rose-500/10"
      : faltasMedio > 5
      ? "bg-amber-500/10"
      : "bg-emerald-500/10",
    borderColor:
     faltasMedio > 10
      ? "border-rose-400/20"
      : faltasMedio > 5
      ? "border-amber-400/20"
      : "border-emerald-400/20",
    icon: <ExclamationTriangleIcon className="h-6 w-6" />,
   },
   {
    title: "% Adesão",
    value: `${adesaoMedia}%`,
    color:
     adesaoMedia >= 90
      ? "text-emerald-400"
      : adesaoMedia >= 75
      ? "text-amber-400"
      : "text-rose-400",
    bgColor:
     adesaoMedia >= 90
      ? "bg-emerald-500/10"
      : adesaoMedia >= 75
      ? "bg-amber-500/10"
      : "bg-rose-500/10",
    borderColor:
     adesaoMedia >= 90
      ? "border-emerald-400/20"
      : adesaoMedia >= 75
      ? "border-amber-400/20"
      : "border-rose-400/20",
    icon: <UserGroupIcon className="h-6 w-6" />,
   },
   {
    title: "% SLA",
    value: `${slaMedia}%`,
    color:
     slaMedia >= 90
      ? "text-emerald-400"
      : slaMedia >= 75
      ? "text-amber-400"
      : "text-rose-400",
    bgColor:
     slaMedia >= 90
      ? "bg-emerald-500/10"
      : slaMedia >= 75
      ? "bg-amber-500/10"
      : "bg-rose-500/10",
    borderColor:
     slaMedia >= 90
      ? "border-emerald-400/20"
      : slaMedia >= 75
      ? "border-amber-400/20"
      : "border-rose-400/20",
    icon: <ClockIcon className="h-6 w-6" />,
   },
   {
    title: "Motoristas",
    value: totalMotoristas,
    color: "text-mottu-400",
    bgColor: "bg-mottu-500/10",
    borderColor: "border-mottu-400/20",
    icon: <UserGroupIcon className="h-6 w-6" />,
   },
   {
    title: "Veículos Parados",
    value: totalVeiculosParados,
    color:
     totalVeiculosParados > 50
      ? "text-rose-400"
      : totalVeiculosParados > 20
      ? "text-amber-400"
      : "text-emerald-400",
    bgColor:
     totalVeiculosParados > 50
      ? "bg-rose-500/10"
      : totalVeiculosParados > 20
      ? "bg-amber-500/10"
      : "bg-emerald-500/10",
    borderColor:
     totalVeiculosParados > 50
      ? "border-rose-400/20"
      : totalVeiculosParados > 20
      ? "border-amber-400/20"
      : "border-emerald-400/20",
    icon: <TruckIcon className="h-6 w-6" />,
   },
   {
    title: "Aprop. Andamento",
    value: totalApropriacoesAndamento,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-400/20",
    icon: <DocumentTextIcon className="h-6 w-6" />,
   },
   {
    title: "Aprop. Finalizadas",
    value: totalApropriacoesFinalizadas,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-400/20",
    icon: <DocumentTextIcon className="h-6 w-6" />,
   },
   {
    title: "Fora do Raio",
    value: totalForaRaio,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-400/20",
    icon: <MapPinIcon className="h-6 w-6" />,
   },
   {
    title: "> 60 Dias",
    value: totalAcima60Dias,
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-400/20",
    icon: <ClockIcon className="h-6 w-6" />,
   },
   {
    title: "Não Visitadas",
    value: totalNaoVisitadas,
    color: "text-amber-400",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-400/20",
    icon: <MapPinIcon className="h-6 w-6" />,
   },
  ];
 }, [clusters]);

 // Top 5 clusters críticos (ordenados por score de criticidade)
 const criticalClusters = useMemo(() => {
  return [...clusters]
   .sort((a, b) => a.healthScore - b.healthScore)
   .slice(0, 5);
 }, [clusters]);

 // Variações D-1 (mock de variações diárias)
 const variations = useMemo(() => {
  const selectedClusters = clusters.slice(0, 4);
  return selectedClusters.map((cluster) => ({
   cluster,
   atrasoVariation:
    Math.random() > 0.5 ? -(Math.random() * 15) : Math.random() * 10,
   slaVariation: Math.random() > 0.5 ? Math.random() * 3 : -(Math.random() * 5),
  }));
 }, [clusters]);

 const currentDate = new Date().toLocaleString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
 });

 if (error) {
  return (
   <div className="flex h-screen items-center justify-center bg-dark-primary">
    <div className="text-center">
     <p className="text-red-400 mb-4">Erro ao carregar clusters</p>
     <p className="text-text-muted text-sm">{error.message}</p>
    </div>
   </div>
  );
 }

 return (
  <div className="h-screen flex bg-dark-primary">
   <DashboardMenu activePath="/clusters" />

   <div className="flex-1 flex flex-col overflow-hidden">
    <Header services={[]} onSearch={() => {}} />

    <main className="flex-1 overflow-auto p-6 space-y-6">
     {/* Título e Info */}
     <div className="flex items-center justify-between">
      <div>
       <h1 className="text-2xl font-bold text-text-primary mb-1">
        Performance Regional / Cluster
       </h1>
       <p className="text-text-muted text-sm">
        Visão macro de capacidade operacional
       </p>
      </div>
      <div className="text-right">
       <p className="text-text-muted text-xs">Última atualização:</p>
       <p className="text-text-secondary text-sm font-medium">{currentDate}</p>
      </div>
     </div>

     {/* KPIs Grid */}
     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2 lg:gap-3">
      {kpis.map((kpi, index) => (
       <KpiCard key={index} {...kpi} />
      ))}
     </div>

     {/* Tabela de Clusters */}
     <div className="bg-dark-secondary rounded-xl border border-border-primary overflow-hidden">
      <div className="p-3 lg:p-4 border-b border-border-primary">
       <h2 className="text-base lg:text-lg font-semibold text-text-primary">
        Clusters Regionais
       </h2>
       <p className="text-text-muted text-xs lg:text-sm">
        Visão consolidada de {clusters.length} clusters
       </p>
      </div>{" "}
      {isLoading ? (
       <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mottu-500" />
       </div>
      ) : (
       <ClusterTable clusters={clusters} />
      )}
     </div>

     {/* Grid: Críticos + Variações */}
     <div className="grid lg:grid-cols-2 gap-6">
      {/* Top 5 Clusters Críticos */}
      <div className="bg-dark-secondary rounded-xl border border-border-primary p-6">
       <h2 className="text-lg font-semibold text-text-primary mb-2">
        Top 5 Clusters Críticos
       </h2>
       <p className="text-text-muted text-sm mb-6">
        Baseado em atrasos, faltas, SLA e produtividade
       </p>

       <div className="space-y-4">
        {criticalClusters.map((cluster, index) => (
         <CriticalClusterCard
          key={cluster.id}
          cluster={cluster}
          rank={index + 1}
         />
        ))}
       </div>
      </div>

      {/* Variações D-1 */}
      <div className="bg-dark-secondary rounded-xl border border-border-primary p-6">
       <h2 className="text-lg font-semibold text-text-primary mb-2">
        Variações D-1 (vs. Dia Anterior)
       </h2>
       <p className="text-text-muted text-sm mb-6">
        Comparação com o dia anterior
       </p>

       <div className="grid sm:grid-cols-2 gap-4">
        {variations.map((v, index) => (
         <ClusterVariationCard
          key={index}
          cluster={v.cluster}
          atrasoVariation={v.atrasoVariation}
          slaVariation={v.slaVariation}
         />
        ))}
       </div>
      </div>
     </div>
    </main>
   </div>
  </div>
 );
}
