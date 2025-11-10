"use client";

import React from "react";
import { ClusterEntity } from "@/core/entities/cluster.entity";

export interface CriticalClusterCardProps {
 cluster: ClusterEntity;
 rank: number;
}

export function CriticalClusterCard({
 cluster,
 rank,
}: CriticalClusterCardProps) {
 const produtividade =
  cluster.motoristas > 0
   ? Math.round((cluster.apropriacoesFinalizadas / cluster.motoristas) * 100)
   : 0;

 return (
  <div className="bg-dark-tertiary border border-border-primary rounded-lg p-4 hover:border-mottu-500/50 transition-all">
   <div className="flex items-start justify-between mb-3">
    <div className="flex items-center gap-3">
     <div className="flex items-center justify-center w-8 h-8 rounded-full bg-mottu-500/20 text-mottu-400 font-bold text-sm">
      {rank}
     </div>
     <div>
      <h3 className="text-text-primary font-semibold">
       {cluster.nome.replace("Mottu ", "")}
      </h3>
      <p className="text-text-muted text-xs">
       {cluster.nome.split("\n")[1] || cluster.nome}
      </p>
     </div>
    </div>
   </div>

   <div className="grid grid-cols-2 gap-3">
    <div className="bg-dark-secondary rounded p-2">
     <p className="text-text-muted text-xs mb-1">Atrasos:</p>
     <p
      className={`text-lg font-bold ${
       cluster.atrasos > 20
        ? "text-rose-400"
        : cluster.atrasos > 10
        ? "text-amber-400"
        : "text-emerald-400"
      }`}
     >
      {cluster.atrasos}%
     </p>
    </div>

    <div className="bg-dark-secondary rounded p-2">
     <p className="text-text-muted text-xs mb-1">Faltas:</p>
     <p
      className={`text-lg font-bold ${
       cluster.faltas > 10
        ? "text-rose-400"
        : cluster.faltas > 5
        ? "text-amber-400"
        : "text-emerald-400"
      }`}
     >
      {cluster.faltas}%
     </p>
    </div>

    <div className="bg-dark-secondary rounded p-2">
     <p className="text-text-muted text-xs mb-1">SLA:</p>
     <p
      className={`text-lg font-bold ${
       cluster.sla >= 90
        ? "text-emerald-400"
        : cluster.sla >= 75
        ? "text-amber-400"
        : "text-rose-400"
      }`}
     >
      {cluster.sla}%
     </p>
    </div>

    <div className="bg-dark-secondary rounded p-2">
     <p className="text-text-muted text-xs mb-1">Produtividade:</p>
     <p
      className={`text-lg font-bold ${
       produtividade >= 80
        ? "text-emerald-400"
        : produtividade >= 60
        ? "text-amber-400"
        : "text-rose-400"
      }`}
     >
      {produtividade}%
     </p>
    </div>
   </div>
  </div>
 );
}
