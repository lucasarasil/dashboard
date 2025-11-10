"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { ClusterEntity } from "@/core/entities/cluster.entity";
import { CalculateHealthScoreUseCase } from "@/core/use-cases/clusters";

interface UseClustersOptions {
 autoLoad?: boolean;
 thresholds?: {
  delays: { critical: number; attention: number };
  inactiveProviders: { critical: number; attention: number };
  adherence: { critical: number; attention: number };
  sla: { critical: number; attention: number };
 };
}

export function useClusters(options: UseClustersOptions = {}) {
 const { autoLoad = true, thresholds } = options;

 const [clusters, setClusters] = useState<ClusterEntity[]>([]);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState<Error | null>(null);

 const defaultThresholds = useMemo(
  () => ({
   delays: { critical: 25, attention: 15 },
   inactiveProviders: { critical: 8, attention: 5 },
   adherence: { critical: 70, attention: 80 },
   sla: { critical: 75, attention: 85 },
  }),
  []
 );

 const healthScoreUseCase = useMemo(
  () => new CalculateHealthScoreUseCase(),
  []
 );

 const loadClusters = useCallback(async () => {
  setIsLoading(true);
  setError(null);

  try {
   await new Promise((resolve) => setTimeout(resolve, 500));
   setClusters([]);
  } catch (err) {
   setError(err instanceof Error ? err : new Error("Unknown error"));
  } finally {
   setIsLoading(false);
  }
 }, []);

 const calculateClusterHealth = useCallback(
  (cluster: ClusterEntity) => {
   return healthScoreUseCase.execute({
    cluster,
    thresholds: thresholds || defaultThresholds,
   });
  },
  [healthScoreUseCase, thresholds, defaultThresholds]
 );

 useEffect(() => {
  if (autoLoad) {
   loadClusters();
  }
 }, [autoLoad, loadClusters]);

 const stats = {
  total: clusters.length,
  operational: clusters.filter((c) => c.status === "operational").length,
  warning: clusters.filter((c) => c.status === "warning").length,
  critical: clusters.filter((c) => c.status === "critical").length,
 };

 return {
  clusters,
  stats,
  isLoading,
  error,
  loadClusters,
  calculateClusterHealth,
 };
}
