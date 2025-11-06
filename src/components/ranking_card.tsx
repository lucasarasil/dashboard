import React from "react";
import {
 ExclamationTriangleIcon,
 ArrowTrendingUpIcon,
 ArrowTrendingDownIcon,
 MinusIcon,
} from "@heroicons/react/24/outline";

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

  if (!previous)
   return { value: "0", direction: "neutral", previous: current, current };

  const diff = current - previous;
  const variation = ((diff / previous) * 100).toFixed(1);

  // Para atrasos e faltas, aumento é ruim
  if (metric === "atrasos" || metric === "faltas") {
   return {
    value: variation,
    direction: diff > 0 ? "up" : diff < 0 ? "down" : "neutral",
    previous,
    current,
   };
  }

  // Para SLA, adesão e apropriações, aumento é bom
  return {
   value: variation,
   direction: diff > 0 ? "down" : diff < 0 ? "up" : "neutral",
   previous,
   current,
  };
 };

 // Psicologia das cores para dark mode
 const getTrendIcon = (direction: string, metric?: string) => {
  switch (direction) {
   case "up":
    // Para métricas negativas (atrasos, faltas), aumento é ruim
    if (metric === "atrasos" || metric === "faltas") {
     return <ArrowTrendingUpIcon className="h-4 w-4 text-red-400" />;
    }
    // Para métricas positivas (SLA), aumento é bom
    return <ArrowTrendingUpIcon className="h-4 w-4 text-mottu-500" />;
   case "down":
    // Para métricas negativas, diminuição é boa
    if (metric === "atrasos" || metric === "faltas") {
     return <ArrowTrendingDownIcon className="h-4 w-4 text-mottu-500" />;
    }
    // Para métricas positivas, diminuição é ruim
    return <ArrowTrendingDownIcon className="h-4 w-4 text-red-400" />;
   default:
    return <MinusIcon className="h-4 w-4 text-text-muted" />;
  }
 };

 const getTrendColor = (direction: string, metric?: string) => {
  switch (direction) {
   case "up":
    if (metric === "atrasos" || metric === "faltas") {
     return "text-red-400"; // Aumento em métricas negativas = ruim
    }
    return "text-mottu-500"; // Aumento em métricas positivas = bom
   case "down":
    if (metric === "atrasos" || metric === "faltas") {
     return "text-mottu-500"; // Diminuição em métricas negativas = bom
    }
    return "text-red-400"; // Diminuição em métricas positivas = ruim
   default:
    return "text-text-muted";
  }
 };

 const getMetricColor = (
  value: number,
  type: "negative" | "positive" | "neutral" = "negative"
 ) => {
  if (type === "negative") {
   // Para atrasos, faltas - valores mais altos são piores
   // Thresholds padronizados: <5% verde, <10% amarelo, <20% laranja, >=20% vermelho
   if (value >= 20) return "text-red-400";
   if (value >= 10) return "text-yellow-400";
   if (value >= 5) return "text-mottu-500";
   return "text-mottu-500";
  } else if (type === "positive") {
   // Para SLA, produtividade - valores mais altos são melhores
   // Thresholds padronizados: >=90% verde escuro, >=80% verde, >=70% amarelo, <70% vermelho
   if (value >= 90) return "text-mottu-600";
   if (value >= 80) return "text-mottu-500";
   if (value >= 70) return "text-yellow-400";
   return "text-red-400";
  }
  return "text-text-secondary";
 };

 const getRankBackground = (index: number) => {
  switch (index) {
   case 0:
    return "bg-red-500/20 text-red-300 border border-red-500/40";
   case 1:
    return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/40";
   case 2:
    return "bg-orange-500/20 text-orange-300 border border-orange-500/40";
   default:
    return "bg-dark-tertiary text-text-secondary border border-border-primary";
  }
 };

 return (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
   {/* Top 5 Clusters Críticos */}
   <div className="bg-dark-secondary rounded-2xl shadow-dark-lg border border-border-primary p-6">
    <div className="flex items-center space-x-2 mb-4">
     <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
     <h3 className="text-lg font-semibold text-text-primary">
      Top 5 Clusters Críticos
     </h3>
    </div>
    <p className="text-xs text-text-muted mb-4">
     Baseado em atrasos, faltas, SLA e produtividade
    </p>

    <div className="space-y-3">
     {topCriticalClusters.map((cluster, index) => {
      return (
       <div
        key={cluster.id}
        className={`p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-lg ${
         index === 0
          ? "bg-red-500/10 border-red-500/30 hover:bg-red-500/15"
          : index === 1
          ? "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/15"
          : "bg-dark-tertiary border-border-primary hover:bg-dark-hover"
        }`}
       >
        <div className="flex items-start justify-between mb-3">
         <div className="flex items-center space-x-3">
          <div
           className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankBackground(
            index
           )}`}
          >
           {index + 1}
          </div>
          <div>
           <div className="font-medium text-text-primary">{cluster.nome}</div>
           <div className="text-xs text-text-muted">{cluster.filial}</div>
          </div>
         </div>
        </div>

        {/* Métricas principais */}
        <div className="grid grid-cols-2 gap-3 text-sm">
         <div className="flex flex-col">
          <span className="text-text-muted text-xs mb-1">Atrasos:</span>
          <span
           className={`font-semibold ${getMetricColor(
            cluster.atrasos,
            "negative"
           )}`}
          >
           {cluster.atrasos}%
          </span>
         </div>
         <div className="flex flex-col">
          <span className="text-text-muted text-xs mb-1">Faltas:</span>
          <span
           className={`font-semibold ${getMetricColor(
            cluster.faltas,
            "negative"
           )}`}
          >
           {cluster.faltas}%
          </span>
         </div>
         <div className="flex flex-col">
          <span className="text-text-muted text-xs mb-1">SLA:</span>
          <span
           className={`font-semibold ${getMetricColor(
            cluster.sla,
            "positive"
           )}`}
          >
           {cluster.sla}%
          </span>
         </div>
         <div className="flex flex-col">
          <span className="text-text-muted text-xs mb-1">Produtividade:</span>
          <span
           className={`font-semibold ${getMetricColor(
            cluster.produtividadeApropriacao,
            "positive"
           )}`}
          >
           {cluster.produtividadeApropriacao}%
          </span>
         </div>
        </div>

        {/* Score crítico */}
        <div className="mt-3 pt-3 border-t border-border-primary">
         <div className="flex justify-between items-center text-xs">
          <span className="text-text-muted">Score Crítico:</span>
          <span className="font-medium text-red-400">
           {calculateCriticalScore(cluster).toFixed(1)}
          </span>
         </div>
        </div>
       </div>
      );
     })}
    </div>
   </div>

   {/* Variações D-1 (Dia Anterior) */}
   <div className="bg-dark-secondary rounded-2xl shadow-dark-xl border border-border-primary p-6 backdrop-blur-sm">
    <div className="flex items-center space-x-2 mb-4">
     <ArrowTrendingUpIcon className="h-5 w-5 text-cyan-400" />
     <h3 className="text-lg font-semibold text-text-primary">
      Variações D-1 (vs. Dia Anterior)
     </h3>
    </div>
    <p className="text-xs text-text-muted mb-4">
     Comparativo com o desempenho do dia anterior
    </p>

    <div className="space-y-4">
     {clusters.slice(0, 4).map((cluster) => {
      const atrasosVariation = getD1Variation(cluster, "atrasos");
      const faltasVariation = getD1Variation(cluster, "faltas");
      const slaVariation = getD1Variation(cluster, "sla");
      const produtividadeVariation = getD1Variation(
       cluster,
       "produtividadeApropriacao"
      );

      return (
       <div
        key={cluster.id}
        className="p-4 bg-dark-tertiary/50 rounded-xl border border-border-primary hover:bg-dark-tertiary/70 transition-all duration-200 hover:scale-[1.02]"
       >
        <div className="font-medium text-text-primary mb-3">{cluster.nome}</div>

        <div className="grid grid-cols-2 gap-4 text-sm">
         {/* Atrasos */}
         <div className="flex flex-col p-2 bg-dark-tertiary/30 rounded-lg space-y-1">
          <span className="text-text-muted text-xs">Atrasos</span>
          <div className="flex items-center justify-between">
           <span className="text-xs text-text-secondary">
            {atrasosVariation.previous.toFixed(1)}% →{" "}
            {atrasosVariation.current.toFixed(1)}%
           </span>
           <div className="flex items-center space-x-1">
            {getTrendIcon(atrasosVariation.direction, "atrasos")}
            <span
             className={`text-xs font-semibold ${getTrendColor(
              atrasosVariation.direction,
              "atrasos"
             )}`}
            >
             {parseFloat(atrasosVariation.value) > 0 ? "+" : ""}
             {atrasosVariation.value}%
            </span>
           </div>
          </div>
         </div>

         {/* Faltas */}
         <div className="flex flex-col p-2 bg-dark-tertiary/30 rounded-lg space-y-1">
          <span className="text-text-muted text-xs">Faltas</span>
          <div className="flex items-center justify-between">
           <span className="text-xs text-text-secondary">
            {faltasVariation.previous.toFixed(1)}% →{" "}
            {faltasVariation.current.toFixed(1)}%
           </span>
           <div className="flex items-center space-x-1">
            {getTrendIcon(faltasVariation.direction, "faltas")}
            <span
             className={`text-xs font-semibold ${getTrendColor(
              faltasVariation.direction,
              "faltas"
             )}`}
            >
             {parseFloat(faltasVariation.value) > 0 ? "+" : ""}
             {faltasVariation.value}%
            </span>
           </div>
          </div>
         </div>

         {/* SLA */}
         <div className="flex flex-col p-2 bg-dark-tertiary/30 rounded-lg space-y-1">
          <span className="text-text-muted text-xs">SLA</span>
          <div className="flex items-center justify-between">
           <span className="text-xs text-text-secondary">
            {slaVariation.previous.toFixed(1)}% →{" "}
            {slaVariation.current.toFixed(1)}%
           </span>
           <div className="flex items-center space-x-1">
            {getTrendIcon(slaVariation.direction, "sla")}
            <span
             className={`text-xs font-semibold ${getTrendColor(
              slaVariation.direction,
              "sla"
             )}`}
            >
             {parseFloat(slaVariation.value) > 0 ? "+" : ""}
             {slaVariation.value}%
            </span>
           </div>
          </div>
         </div>

         {/* Produtividade */}
         <div className="flex flex-col p-2 bg-dark-tertiary/30 rounded-lg space-y-1">
          <span className="text-text-muted text-xs">Produtividade</span>
          <div className="flex items-center justify-between">
           <span className="text-xs text-text-secondary">
            {produtividadeVariation.previous.toFixed(1)}% →{" "}
            {produtividadeVariation.current.toFixed(1)}%
           </span>
           <div className="flex items-center space-x-1">
            {getTrendIcon(produtividadeVariation.direction, "produtividade")}
            <span
             className={`text-xs font-semibold ${getTrendColor(
              produtividadeVariation.direction,
              "produtividade"
             )}`}
            >
             {parseFloat(produtividadeVariation.value) > 0 ? "+" : ""}
             {produtividadeVariation.value}%
            </span>
           </div>
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
