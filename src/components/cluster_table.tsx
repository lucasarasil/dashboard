"use client";
import React, { useState } from "react";
import {
 ChevronUpIcon,
 ChevronDownIcon,
 EyeIcon,
} from "@heroicons/react/24/outline";
import { calculateHealthScore } from "../utils/cluster_data";

interface ClusterTableProps {
 clusters: any[];
 onClusterSelect: (cluster: any) => void;
}

const ClusterTable: React.FC<ClusterTableProps> = ({
 clusters,
 onClusterSelect,
}) => {
 const [sortField, setSortField] = useState("healthScore");
 const [sortDirection, setSortDirection] = useState("asc");

 const handleSort = (field: string) => {
  if (sortField === field) {
   setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  } else {
   setSortField(field);
   setSortDirection(field === "healthScore" ? "asc" : "desc");
  }
 };

 // Adicionar health score calculado para cada cluster
 const clustersWithHealth = clusters.map((cluster: any) => ({
  ...cluster,
  healthScore: calculateHealthScore([cluster]),
 }));

 const sortedClusters = [...clustersWithHealth].sort((a: any, b: any) => {
  const aValue = a[sortField];
  const bValue = b[sortField];

  if (sortDirection === "asc") {
   return aValue - bValue;
  } else {
   return bValue - aValue;
  }
 });

 // Psicologia das cores para dark mode
 const getHealthColor = (score: number) => {
  if (score >= 80) return "text-emerald-400"; // Verde esmeralda - sucesso, confiança
  if (score >= 60) return "text-amber-400"; // Âmbar - atenção, cautela
  return "text-rose-400"; // Rosa suave - urgência, mas não agressivo
 };

 const getStatusColor = (
  value: number,
  thresholds: { good: number; warning: number }
 ) => {
  if (value <= thresholds.good) return "text-emerald-400"; // Bom
  if (value <= thresholds.warning) return "text-amber-400"; // Atenção
  return "text-rose-400"; // Crítico
 };

 // Função para determinar o background baseado no health score
 const getRowBackground = (score: number, isOdd: boolean) => {
  const baseColor = isOdd ? "bg-dark-tertiary/30" : "bg-dark-tertiary/10";

  if (score < 60)
   return `${baseColor} bg-rose-950/10 border-l-2 border-l-rose-500/50`; // Crítico
  if (score < 80)
   return `${baseColor} bg-amber-950/10 border-l-2 border-l-amber-500/50`; // Atenção
  return `${baseColor} border-l-2 border-l-emerald-500/30`; // Saudável
 };

 return (
  <div className="bg-dark-secondary rounded-xl shadow-dark-xl border border-border-primary overflow-hidden backdrop-blur-sm">
   {/* Header da tabela */}
   <div className="bg-dark-tertiary/80 px-6 py-4 border-b border-border-primary">
    <h3 className="text-lg font-semibold text-text-primary">
     Clusters Regionais
    </h3>
    <p className="text-sm text-text-muted mt-1">
     Visão consolidada de {clusters.length} clusters
    </p>
   </div>

   {/* Tabela */}
   <div className="overflow-x-auto">
    <table className="w-full" role="table">
     <caption className="sr-only">
      Tabela de clusters com indicadores de saúde e capacidade
     </caption>
     <thead className="bg-dark-tertiary/60 border-b border-border-primary">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
        Cluster
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
        Líder
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
        Supervisor
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("healthScore")}
        aria-sort={
         sortField === "healthScore"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("healthScore");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>Saúde</span>
         {sortField === "healthScore" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("atrasos")}
        aria-sort={
         sortField === "atrasos"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("atrasos");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>% Atrasos</span>
         {sortField === "atrasos" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("faltas")}
        aria-sort={
         sortField === "faltas"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("faltas");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>% Faltas</span>
         {sortField === "faltas" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("sla")}
        aria-sort={
         sortField === "sla"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("sla");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>% SLA</span>
         {sortField === "sla" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("motoristas")}
        aria-sort={
         sortField === "motoristas"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("motoristas");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>Motoristas</span>
         {sortField === "motoristas" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("veiculosParados")}
        aria-sort={
         sortField === "veiculosParados"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("veiculosParados");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>Veíc. Parados</span>
         {sortField === "veiculosParados" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("carrosAtivos")}
        aria-sort={
         sortField === "carrosAtivos"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("carrosAtivos");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>Carros</span>
         {sortField === "carrosAtivos" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("motosAtivas")}
        aria-sort={
         sortField === "motosAtivas"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("motosAtivas");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>Motos</span>
         {sortField === "motosAtivas" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("celularesAtivos")}
        aria-sort={
         sortField === "celularesAtivos"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("celularesAtivos");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>Celulares</span>
         {sortField === "celularesAtivos" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("apropriacoesEmAndamento")}
        aria-sort={
         sortField === "apropriacoesEmAndamento"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("apropriacoesEmAndamento");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>Aprop. And.</span>
         {sortField === "apropriacoesEmAndamento" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
        onClick={() => handleSort("apropriacoesFinalizadas")}
        aria-sort={
         sortField === "apropriacoesFinalizadas"
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
        }
        tabIndex={0}
        onKeyDown={(e) => {
         if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleSort("apropriacoesFinalizadas");
         }
        }}
       >
        <div className="flex items-center space-x-1 group">
         <span>Aprop. Fin.</span>
         {sortField === "apropriacoesFinalizadas" ? (
          sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4 text-emerald-400" />
          ) : (
           <ChevronDownIcon className="h-4 w-4 text-rose-400" />
          )
         ) : (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
           <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
          </div>
         )}
        </div>
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
        Ações
       </th>
      </tr>
     </thead>
     <tbody className="divide-y divide-border-secondary">
      {sortedClusters.map((cluster, index) => {
       const isOdd = index % 2 === 0;

       return (
        <tr
         key={cluster.id}
         className={`transition-all duration-200 cursor-pointer hover:bg-dark-tertiary/40 focus-visible:ring-2 focus-visible:ring-mottu-500 ${getRowBackground(
          cluster.healthScore,
          isOdd
         )}`}
         onClick={() => onClusterSelect(cluster)}
         tabIndex={0}
         onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
           e.preventDefault();
           onClusterSelect(cluster);
          }
         }}
        >
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="font-medium text-text-primary">{cluster.nome}</div>
          <div className="text-xs text-text-muted">{cluster.filial}</div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
          {cluster.lider}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
          {cluster.supervisor}
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`text-lg font-bold ${getHealthColor(
            cluster.healthScore
           )}`}
          >
           {cluster.healthScore}%
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`text-sm font-medium ${getStatusColor(cluster.atrasos, {
            good: 15,
            warning: 25,
           })}`}
          >
           {cluster.atrasos}%
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`text-sm font-medium ${getStatusColor(cluster.faltas, {
            good: 5,
            warning: 8,
           })}`}
          >
           {cluster.faltas}%
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`text-sm font-medium ${getStatusColor(cluster.sla, {
            good: 85,
            warning: 75,
           })}`}
          >
           {cluster.sla}%
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
          {cluster.motoristas} / {cluster.motoristasNecessarios}
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`text-sm font-medium ${getStatusColor(
            cluster.veiculosParados,
            { good: 5, warning: 10 }
           )}`}
          >
           {cluster.veiculosParados}
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
          {cluster.carrosAtivos} / {cluster.carrosNecessarios}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
          {cluster.motosAtivas} / {cluster.motasNecessarias}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
          {cluster.celularesAtivos} / {cluster.celularesNecessarios}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
          {cluster.apropriacoesEmAndamento}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
          {cluster.apropriacoesFinalizadas}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button
           onClick={(e) => {
            e.stopPropagation();
            onClusterSelect(cluster);
           }}
           className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 transition-colors duration-200 bg-cyan-950/20 hover:bg-cyan-950/40 px-3 py-2 rounded-lg border border-cyan-800/30"
          >
           <EyeIcon className="h-4 w-4" />
           <span>Ver</span>
          </button>
         </td>
        </tr>
       );
      })}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default ClusterTable;
