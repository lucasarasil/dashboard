import React from "react";
import {
 ExclamationTriangleIcon,
 ArrowTrendingUpIcon,
 ArrowTrendingDownIcon,
 MinusIcon,
} from "@heroicons/react/24/outline";
import { getStatusColor } from "../utils/clusterData";

interface RankingCardProps {
 clusters: any[];
}

const RankingCard: React.FC<RankingCardProps> = ({ clusters }) => {
 // Função para calcular score crítico (quanto maior, pior)
 const calculateCriticalScore = (cluster: any) => {
  return (
   cluster.atrasos * 1.5 + // Atrasos com peso 1.5
   cluster.faltas * 2 + // Faltas com peso 2
   (100 - cluster.sla) * 1.2 + // SLA invertido com peso 1.2
   (100 - cluster.produtividadeApropriacao) * 0.8 // Produtividade invertida com peso 0.8
  );
 };

 // Top 5 clusters mais críticos
 const topCriticalClusters = [...clusters]
  .sort((a, b) => calculateCriticalScore(b) - calculateCriticalScore(a))
  .slice(0, 5);

 // Função para calcular variação D-1
 const getD1Variation = (cluster: any, metric: string) => {
  const current = cluster[metric];
  const previous = cluster.d1[metric];

  if (!previous) return { value: "0", direction: "neutral" };

  const diff = current - previous;
  const variation = ((diff / previous) * 100).toFixed(1);

  // Para atrasos e faltas, aumento é ruim
  if (metric === "atrasos" || metric === "faltas") {
   return {
    value: variation,
    direction: diff > 0 ? "up" : diff < 0 ? "down" : "neutral",
   };
  }

  // Para SLA, adesão e apropriações, aumento é bom
  return {
   value: variation,
   direction: diff > 0 ? "down" : diff < 0 ? "up" : "neutral",
  };
 };

 const getTrendIcon = (direction: string) => {
  switch (direction) {
   case "up":
    return <ArrowTrendingUpIcon className="h-4 w-4 text-red-500" />;
   case "down":
    return <ArrowTrendingDownIcon className="h-4 w-4 text-green-500" />;
   default:
    return <MinusIcon className="h-4 w-4 text-gray-500" />;
  }
 };

 const getTrendColor = (direction: string) => {
  switch (direction) {
   case "up":
    return "text-red-600";
   case "down":
    return "text-green-600";
   default:
    return "text-gray-600";
  }
 };

 return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
   {/* Top 5 Clusters Críticos */}
   <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center space-x-2 mb-4">
     <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
     <h3 className="text-lg font-semibold text-gray-900">
      Top 5 Clusters Críticos
     </h3>
    </div>
    <p className="text-xs text-gray-500 mb-4">
     Baseado em atrasos, faltas, SLA e produtividade
    </p>

    <div className="space-y-3">
     {topCriticalClusters.map((cluster, index) => {
      const statusColors = getStatusColor(cluster.status);

      return (
       <div
        key={cluster.id}
        className={`p-3 rounded-lg border ${statusColors.bg} ${statusColors.border}`}
       >
        <div className="flex items-start justify-between mb-2">
         <div className="flex items-center space-x-3">
          <div
           className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            index === 0
             ? "bg-red-100 text-red-700"
             : index === 1
             ? "bg-orange-100 text-orange-700"
             : "bg-gray-100 text-gray-700"
           }`}
          >
           {index + 1}
          </div>
          <div>
           <div className="font-medium text-gray-900">{cluster.nome}</div>
           <div className="text-xs text-gray-600">{cluster.filial}</div>
          </div>
         </div>
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-2 gap-2 text-xs mt-2">
         <div>
          <span className="text-gray-500">Atrasos:</span>
          <span
           className={`ml-1 font-medium ${
            cluster.atrasos > 20 ? "text-red-600" : "text-gray-700"
           }`}
          >
           {cluster.atrasos}%
          </span>
         </div>
         <div>
          <span className="text-gray-500">Faltas:</span>
          <span
           className={`ml-1 font-medium ${
            cluster.faltas > 7 ? "text-red-600" : "text-gray-700"
           }`}
          >
           {cluster.faltas}%
          </span>
         </div>
         <div>
          <span className="text-gray-500">SLA:</span>
          <span
           className={`ml-1 font-medium ${
            cluster.sla < 80 ? "text-red-600" : "text-gray-700"
           }`}
          >
           {cluster.sla}%
          </span>
         </div>
         <div>
          <span className="text-gray-500">Produtividade:</span>
          <span
           className={`ml-1 font-medium ${
            cluster.produtividadeApropriacao < 65
             ? "text-red-600"
             : "text-gray-700"
           }`}
          >
           {cluster.produtividadeApropriacao}%
          </span>
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </div>

   {/* Variações D-1 (Dia Anterior) */}
   <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
     Variações D-1 (vs. Dia Anterior)
    </h3>

    <div className="space-y-3">
     {clusters.slice(0, 4).map((cluster) => {
      const atrasosVariation = getD1Variation(cluster, "atrasos");
      const slaVariation = getD1Variation(cluster, "sla");

      return (
       <div key={cluster.id} className="p-3 bg-gray-50 rounded-lg">
        <div className="font-medium text-gray-900 mb-2">{cluster.nome}</div>

        <div className="grid grid-cols-2 gap-2 text-xs">
         <div className="flex items-center justify-between">
          <span className="text-gray-600">Atrasos:</span>
          <div className="flex items-center space-x-1">
           {getTrendIcon(atrasosVariation.direction)}
           <span
            className={`font-medium ${getTrendColor(
             atrasosVariation.direction
            )}`}
           >
            {parseFloat(atrasosVariation.value) > 0 ? "+" : ""}
            {atrasosVariation.value}%
           </span>
          </div>
         </div>

         <div className="flex items-center justify-between">
          <span className="text-gray-600">SLA:</span>
          <div className="flex items-center space-x-1">
           {getTrendIcon(slaVariation.direction)}
           <span
            className={`font-medium ${getTrendColor(slaVariation.direction)}`}
           >
            {parseFloat(slaVariation.value) > 0 ? "+" : ""}
            {slaVariation.value}%
           </span>
          </div>
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </div>
  </div>
 );
};

export default RankingCard;
