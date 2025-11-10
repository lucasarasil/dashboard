"use client";

import React from "react";
import { ClusterEntity } from "@/core/entities/cluster.entity";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

export interface ClusterVariationCardProps {
 cluster: ClusterEntity;
 atrasoVariation: number;
 slaVariation: number;
}

export function ClusterVariationCard({
 cluster,
 atrasoVariation,
 slaVariation,
}: ClusterVariationCardProps) {
 return (
  <div className="bg-dark-tertiary border border-border-primary rounded-lg p-4">
   <h3 className="text-text-primary font-semibold mb-3">
    {cluster.nome.replace("Mottu ", "")}
   </h3>

   <div className="space-y-2">
    <div className="flex items-center justify-between">
     <span className="text-text-muted text-sm">Atrasos:</span>
     <div
      className={`flex items-center gap-1 ${
       atrasoVariation < 0 ? "text-emerald-400" : "text-rose-400"
      }`}
     >
      {atrasoVariation < 0 ? (
       <ArrowDownIcon className="h-4 w-4" />
      ) : (
       <ArrowUpIcon className="h-4 w-4" />
      )}
      <span className="font-bold">{Math.abs(atrasoVariation).toFixed(1)}%</span>
     </div>
    </div>

    <div className="flex items-center justify-between">
     <span className="text-text-muted text-sm">SLA:</span>
     <div
      className={`flex items-center gap-1 ${
       slaVariation > 0 ? "text-emerald-400" : "text-rose-400"
      }`}
     >
      {slaVariation > 0 ? (
       <ArrowUpIcon className="h-4 w-4" />
      ) : (
       <ArrowDownIcon className="h-4 w-4" />
      )}
      <span className="font-bold">
       {slaVariation > 0 ? "+" : ""}
       {slaVariation.toFixed(1)}%
      </span>
     </div>
    </div>
   </div>
  </div>
 );
}
