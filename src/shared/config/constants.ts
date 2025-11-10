// Constantes globais da aplicação

export const APP_CONFIG = {
 name: "Mottu Dashboard",
 version: "1.0.0",
 environment: process.env.NODE_ENV || "development",
} as const;

export const API_CONFIG = {
 baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
 timeout: 30000, // 30 segundos
} as const;

export const PAGINATION = {
 defaultPageSize: 20,
 pageSizeOptions: [10, 20, 50, 100],
} as const;

export const STATUS_COLORS = {
 open: {
  text: "text-blue-400",
  bg: "bg-blue-500/10",
  border: "border-blue-400/20",
 },
 in_progress: {
  text: "text-amber-400",
  bg: "bg-amber-500/10",
  border: "border-amber-400/20",
 },
 critical: {
  text: "text-rose-400",
  bg: "bg-rose-500/10",
  border: "border-rose-400/20",
 },
 completed: {
  text: "text-emerald-400",
  bg: "bg-emerald-500/10",
  border: "border-emerald-400/20",
 },
 pending: {
  text: "text-gray-400",
  bg: "bg-gray-500/10",
  border: "border-gray-400/20",
 },
} as const;

export const ROUTES = {
 home: "/",
 dashboard: "/dashboard",
 clusters: "/dashboard/clusters",
 operations: "/dashboard/operacoes",
 login: "/login",
} as const;
