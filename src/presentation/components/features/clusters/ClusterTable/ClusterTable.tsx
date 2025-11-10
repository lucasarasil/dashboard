"use client";

import React from "react";
import { ClusterEntity } from "@/core/entities/cluster.entity";

interface ClusterTableProps {
 clusters: ClusterEntity[];
 onClusterSelect?: (cluster: ClusterEntity) => void;
}

export function ClusterTable({ clusters, onClusterSelect }: ClusterTableProps) {
 return (
  <div className="overflow-x-auto">
   <table className="w-full">
    <thead className="bg-dark-tertiary border-b border-border-primary">
     <tr>
      <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
       Cluster
      </th>
      <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
       Líder
      </th>
      <th className="px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
       Supervisor
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       Saúde
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       % Atrasos
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       % Faltas
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       % SLA
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       Motoristas
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       Veíc. Parados
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       Carros
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       Motos
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       Celulares
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       Aprop. And.
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       Aprop. Fin.
      </th>
      <th className="px-4 py-3 text-center text-xs font-medium text-text-muted uppercase tracking-wider">
       Ações
      </th>
     </tr>
    </thead>
    <tbody className="divide-y divide-border-primary">
     {clusters.map((cluster) => (
      <tr key={cluster.id} className="hover:bg-dark-tertiary transition-colors">
       <td className="px-4 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-text-primary">
         {cluster.nome}
        </div>
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-sm text-text-secondary">
        {cluster.lider || "-"}
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-sm text-text-secondary">
        {cluster.supervisor || "-"}
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center">
        <span
         className={`text-sm font-bold ${
          cluster.healthScore >= 80
           ? "text-emerald-400"
           : cluster.healthScore >= 60
           ? "text-amber-400"
           : "text-rose-400"
         }`}
        >
         {cluster.healthScore}%
        </span>
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center">
        <span
         className={`text-sm font-semibold ${
          cluster.atrasos > 20
           ? "text-rose-400"
           : cluster.atrasos > 10
           ? "text-amber-400"
           : "text-emerald-400"
         }`}
        >
         {cluster.atrasos}%
        </span>
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center">
        <span
         className={`text-sm font-semibold ${
          cluster.faltas > 10
           ? "text-rose-400"
           : cluster.faltas > 5
           ? "text-amber-400"
           : "text-emerald-400"
         }`}
        >
         {cluster.faltas}%
        </span>
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center">
        <span
         className={`text-sm font-semibold ${
          cluster.sla >= 90
           ? "text-emerald-400"
           : cluster.sla >= 75
           ? "text-amber-400"
           : "text-rose-400"
         }`}
        >
         {cluster.sla}%
        </span>
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-text-secondary">
        {cluster.motoristas} / {cluster.motoristasNecessarios}
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center">
        <span
         className={`text-sm font-semibold ${
          cluster.veiculosParados > 10
           ? "text-rose-400"
           : cluster.veiculosParados > 5
           ? "text-amber-400"
           : "text-emerald-400"
         }`}
        >
         {cluster.veiculosParados}
        </span>
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-text-secondary">
        {cluster.carros || "-"}
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-text-secondary">
        {cluster.motos || "-"}
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-text-secondary">
        {cluster.celulares || "-"}
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-blue-400">
        {cluster.apropriacoesEmAndamento}
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center text-sm text-emerald-400">
        {cluster.apropriacoesFinalizadas}
       </td>
       <td className="px-4 py-4 whitespace-nowrap text-center">
        <button
         onClick={() => onClusterSelect?.(cluster)}
         className="text-xs px-3 py-1.5 bg-mottu-500/10 text-mottu-400 border border-mottu-400/20 rounded-lg hover:bg-mottu-500/20 transition-colors"
        >
         Ver
        </button>
       </td>
      </tr>
     ))}
    </tbody>
   </table>
  </div>
 );
}
