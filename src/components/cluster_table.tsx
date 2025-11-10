import React from "react";
import {
 ChevronUpIcon,
 ChevronDownIcon,
 EyeIcon,
} from "@heroicons/react/24/outline";

interface ClusterTableProps {
 clusters: ClusterDTO[];
 onClusterSelect: (cluster: ClusterDTO) => void;
}

interface ClusterDTO {
 id: string;
 nome: string;
 filial: string;
 lider: string;
 supervisor: string;
 saude: {
  score: number;
  status: string;
  cores: {
   text: string;
   bg: string;
   border: string;
  };
 };
 metricas: {
  atrasos: number;
  faltas: number;
  sla: number;
 };
 recursos: {
  motoristas: { atual: number; necessario: number };
  veiculosParados: number;
 };
}

function useClusterTable(initialClusters: ClusterDTO[]) {
 const [sortField, setSortField] = React.useState<
  keyof ClusterDTO["saude"] | keyof ClusterDTO["metricas"]
 >("score");
 const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
  "asc"
 );
 const [clusters, setClusters] = React.useState(initialClusters);

 const handleSort = React.useCallback(
  (field: typeof sortField) => {
   setSortDirection((prev) =>
    sortField === field ? (prev === "asc" ? "desc" : "asc") : "desc"
   );
   setSortField(field);
  },
  [sortField]
 );

 React.useEffect(() => {
  const sorted = [...initialClusters].sort((a, b) => {
   let aValue: number;
   let bValue: number;

   if (sortField === "score") {
    aValue = a.saude.score;
    bValue = b.saude.score;
   } else {
    aValue = a.metricas[sortField as keyof typeof a.metricas];
    bValue = b.metricas[sortField as keyof typeof b.metricas];
   }

   return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
  });

  setClusters(sorted);
 }, [initialClusters, sortField, sortDirection]);

 return {
  clusters,
  sortField,
  sortDirection,
  handleSort,
 };
}

interface SortableHeaderProps {
 field: "score" | "atrasos" | "faltas" | "sla";
 label: string;
 currentField: string;
 direction: "asc" | "desc";
 onSort: (field: "score" | "atrasos" | "faltas" | "sla") => void;
}

function SortableHeader({
 field,
 label,
 currentField,
 direction,
 onSort,
}: SortableHeaderProps) {
 const isActive = currentField === field;
 const Icon = direction === "asc" ? ChevronUpIcon : ChevronDownIcon;

 return (
  <th
   className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider cursor-pointer hover:bg-dark-tertiary/50 transition-colors"
   onClick={() => onSort(field)}
  >
   <div className="flex items-center space-x-1 group">
    <span>{label}</span>
    {isActive ? (
     <Icon className="h-4 w-4 text-emerald-400" />
    ) : (
     <div className="opacity-0 group-hover:opacity-100 transition-opacity">
      <ChevronUpIcon className="h-4 w-4 text-text-secondary" />
     </div>
    )}
   </div>
  </th>
 );
}

interface ClusterRowProps {
 cluster: ClusterDTO;
 index: number;
 onSelect: (cluster: ClusterDTO) => void;
}

function ClusterRow({ cluster, index, onSelect }: ClusterRowProps) {
 const isOdd = index % 2 === 0;
 const { saude, metricas, recursos } = cluster;

 const getRowBackground = (score: number, isOdd: boolean) => {
  const baseColor = isOdd ? "bg-dark-tertiary/30" : "bg-dark-tertiary/10";

  if (score < 70) {
   return `${baseColor} bg-rose-950/10 border-l-2 border-l-rose-500/50`;
  }
  if (score < 80) {
   return `${baseColor} bg-amber-950/10 border-l-2 border-l-amber-500/50`;
  }
  return `${baseColor} border-l-2 border-l-emerald-500/30`;
 };

 const getMetricColor = (value: number, type: "negative" | "positive") => {
  if (type === "negative") {
   if (value >= 20) return "text-rose-400";
   if (value >= 10) return "text-amber-400";
   return "text-emerald-400";
  } else {
   if (value >= 90) return "text-emerald-600";
   if (value >= 80) return "text-emerald-400";
   if (value >= 70) return "text-amber-400";
   return "text-rose-400";
  }
 };

 return (
  <tr
   className={`transition-all duration-200 cursor-pointer hover:bg-dark-tertiary/40 ${getRowBackground(
    saude.score,
    isOdd
   )}`}
   onClick={() => onSelect(cluster)}
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
    <span className={`text-lg font-bold ${saude.cores.text}`}>
     {saude.score}%
    </span>
   </td>
   <td className="px-6 py-4 whitespace-nowrap">
    <span
     className={`text-sm font-medium ${getMetricColor(
      metricas.atrasos,
      "negative"
     )}`}
    >
     {metricas.atrasos}%
    </span>
   </td>
   <td className="px-6 py-4 whitespace-nowrap">
    <span
     className={`text-sm font-medium ${getMetricColor(
      metricas.faltas,
      "negative"
     )}`}
    >
     {metricas.faltas}%
    </span>
   </td>
   <td className="px-6 py-4 whitespace-nowrap">
    <span
     className={`text-sm font-medium ${getMetricColor(
      metricas.sla,
      "positive"
     )}`}
    >
     {metricas.sla}%
    </span>
   </td>
   <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
    {recursos.motoristas.atual} / {recursos.motoristas.necessario}
   </td>
   <td className="px-6 py-4 whitespace-nowrap">
    <span
     className={`text-sm font-medium ${getMetricColor(
      recursos.veiculosParados,
      "negative"
     )}`}
    >
     {recursos.veiculosParados}
    </span>
   </td>
   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
    <button
     onClick={(e) => {
      e.stopPropagation();
      onSelect(cluster);
     }}
     className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 transition-colors bg-cyan-950/20 hover:bg-cyan-950/40 px-3 py-2 rounded-lg border border-cyan-800/30"
    >
     <EyeIcon className="h-4 w-4" />
     <span>Ver</span>
    </button>
   </td>
  </tr>
 );
}

export default function ClusterTable({
 clusters: initialClusters,
 onClusterSelect,
}: ClusterTableProps) {
 const { clusters, sortField, sortDirection, handleSort } =
  useClusterTable(initialClusters);

 return (
  <div className="bg-dark-secondary rounded-xl shadow-dark-xl border border-border-primary overflow-hidden backdrop-blur-sm">
   {/* Header */}
   <div className="bg-dark-tertiary/80 px-6 py-4 border-b border-border-primary">
    <h3 className="text-lg font-semibold text-text-primary">
     Clusters Regionais
    </h3>
    <p className="text-sm text-text-muted mt-1">
     Visão consolidada de {clusters.length} clusters
    </p>
   </div>

   <div className="overflow-x-auto">
    <table className="w-full">
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
       <SortableHeader
        field="score"
        label="Saúde"
        currentField={sortField}
        direction={sortDirection}
        onSort={handleSort}
       />
       <SortableHeader
        field="atrasos"
        label="% Atrasos"
        currentField={sortField}
        direction={sortDirection}
        onSort={handleSort}
       />
       <SortableHeader
        field="faltas"
        label="% Faltas"
        currentField={sortField}
        direction={sortDirection}
        onSort={handleSort}
       />
       <SortableHeader
        field="sla"
        label="% SLA"
        currentField={sortField}
        direction={sortDirection}
        onSort={handleSort}
       />
       <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
        Motoristas
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
        Veíc. Parados
       </th>
       <th className="px-6 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider">
        Ações
       </th>
      </tr>
     </thead>
     <tbody className="divide-y divide-border-secondary">
      {clusters.map((cluster, index) => (
       <ClusterRow
        key={cluster.id}
        cluster={cluster}
        index={index}
        onSelect={onClusterSelect}
       />
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
}
