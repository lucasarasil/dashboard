// Utilitários de formatação
export function formatDate(date: Date | string): string {
 const d = typeof date === "string" ? new Date(date) : date;

 return new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
 }).format(d);
}

export function formatDateTime(date: Date | string): string {
 const d = typeof date === "string" ? new Date(date) : date;

 return new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
 }).format(d);
}

export function formatTime(date: Date | string): string {
 const d = typeof date === "string" ? new Date(date) : date;

 return new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
 }).format(d);
}

export function formatRelativeTime(date: Date | string): string {
 const d = typeof date === "string" ? new Date(date) : date;
 const now = new Date();
 const diffInMs = now.getTime() - d.getTime();
 const diffInMinutes = Math.floor(diffInMs / 60000);
 const diffInHours = Math.floor(diffInMinutes / 60);
 const diffInDays = Math.floor(diffInHours / 24);

 if (diffInMinutes < 1) return "agora";
 if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
 if (diffInHours < 24) return `${diffInHours}h atrás`;
 if (diffInDays < 7) return `${diffInDays}d atrás`;

 return formatDate(d);
}

export function formatElapsedTime(minutes: number): string {
 if (minutes < 60) return `${minutes}m`;

 const hours = Math.floor(minutes / 60);
 const remainingMinutes = minutes % 60;

 if (remainingMinutes === 0) return `${hours}h`;

 return `${hours}h ${remainingMinutes}m`;
}
