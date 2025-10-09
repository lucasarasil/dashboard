"use client";
import React, { useState } from "react";
import {
 ChevronUpIcon,
 ChevronDownIcon,
 EyeIcon,
} from "@heroicons/react/24/outline";
import { calculateHealthScore } from "../utils/clusterData";

interface ClusterTableProps {
 clusters: any[];
 onClusterSelect: (cluster: any) => void;
}

const ClusterTable: React.FC<ClusterTableProps> = ({
 clusters,
 onClusterSelect,
}) => {
 const [sortField, setSortField] = useState("healthScore");
 const [sortDirection, setSortDirection] = useState("asc"); // ASC para mostrar piores primeiro

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

 const getHealthColor = (score: number) => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-orange-600";
  return "text-red-600";
 };

 return (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
   {/* Header da tabela */}
   <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900">Clusters Regionais</h3>
    <p className="text-sm text-gray-500 mt-1">
     Visão consolidada de {clusters.length} clusters
    </p>
   </div>

   {/* Tabela */}
   <div className="overflow-x-auto">
    <table className="w-full">
     <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Cluster
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Líder
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Supervisor
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("healthScore")}
       >
        <div className="flex items-center space-x-1">
         <span>Saúde</span>
         {sortField === "healthScore" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("atrasos")}
       >
        <div className="flex items-center space-x-1">
         <span>% Atrasos</span>
         {sortField === "atrasos" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("faltas")}
       >
        <div className="flex items-center space-x-1">
         <span>% Faltas</span>
         {sortField === "faltas" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("sla")}
       >
        <div className="flex items-center space-x-1">
         <span>% SLA</span>
         {sortField === "sla" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("motoristas")}
       >
        <div className="flex items-center space-x-1">
         <span>Motoristas</span>
         {sortField === "motoristas" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("veiculosParados")}
       >
        <div className="flex items-center space-x-1">
         <span>Veíc. Parados</span>
         {sortField === "veiculosParados" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("carrosAtivos")}
       >
        <div className="flex items-center space-x-1">
         <span>Carros</span>
         {sortField === "carrosAtivos" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("motosAtivas")}
       >
        <div className="flex items-center space-x-1">
         <span>Motos</span>
         {sortField === "motosAtivas" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("celularesAtivos")}
       >
        <div className="flex items-center space-x-1">
         <span>Celulares</span>
         {sortField === "celularesAtivos" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("apropriacoesEmAndamento")}
       >
        <div className="flex items-center space-x-1">
         <span>Aprop. And.</span>
         {sortField === "apropriacoesEmAndamento" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
        onClick={() => handleSort("apropriacoesFinalizadas")}
       >
        <div className="flex items-center space-x-1">
         <span>Aprop. Fin.</span>
         {sortField === "apropriacoesFinalizadas" &&
          (sortDirection === "asc" ? (
           <ChevronUpIcon className="h-4 w-4" />
          ) : (
           <ChevronDownIcon className="h-4 w-4" />
          ))}
        </div>
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Ações
       </th>
      </tr>
     </thead>
     <tbody className="bg-white divide-y divide-gray-200">
      {sortedClusters.map((cluster) => {
       const isCritical = cluster.healthScore < 60;
       const isAttention =
        cluster.healthScore >= 60 && cluster.healthScore < 80;

       return (
        <tr
         key={cluster.id}
         className={`hover:bg-gray-50 transition-colors duration-150 cursor-pointer ${
          isCritical ? "bg-red-50" : isAttention ? "bg-orange-50" : ""
         }`}
         onClick={() => onClusterSelect(cluster)}
        >
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="font-medium text-gray-900">{cluster.nome}</div>
          <div className="text-xs text-gray-500">{cluster.filial}</div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {cluster.lider}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
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
           className={`text-sm font-medium ${
            cluster.atrasos > 25
             ? "text-red-600"
             : cluster.atrasos > 15
             ? "text-orange-600"
             : "text-green-600"
           }`}
          >
           {cluster.atrasos}%
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`text-sm font-medium ${
            cluster.faltas > 8
             ? "text-red-600"
             : cluster.faltas > 5
             ? "text-orange-600"
             : "text-green-600"
           }`}
          >
           {cluster.faltas}%
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`text-sm font-medium ${
            cluster.sla < 75
             ? "text-red-600"
             : cluster.sla < 85
             ? "text-orange-600"
             : "text-green-600"
           }`}
          >
           {cluster.sla}%
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {cluster.motoristas} / {cluster.motoristasNecessarios}
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`text-sm font-medium ${
            cluster.veiculosParados > 10
             ? "text-red-600"
             : cluster.veiculosParados > 5
             ? "text-orange-600"
             : "text-green-600"
           }`}
          >
           {cluster.veiculosParados}
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {cluster.carrosAtivos} / {cluster.carrosNecessarios}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {cluster.motosAtivas} / {cluster.motasNecessarias}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {cluster.celularesAtivos} / {cluster.celularesNecessarios}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {cluster.apropriacoesEmAndamento}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {cluster.apropriacoesFinalizadas}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <button
           onClick={(e) => {
            e.stopPropagation();
            onClusterSelect(cluster);
           }}
           className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
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
