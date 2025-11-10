// Utilitários de formatação de texto e números
export function formatCurrency(value: number): string {
 return new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
 }).format(value);
}

export function formatNumber(value: number): string {
 return new Intl.NumberFormat("pt-BR").format(value);
}

export function formatPercentage(value: number, decimals: number = 0): string {
 return `${value.toFixed(decimals)}%`;
}

export function truncateText(text: string, maxLength: number): string {
 if (text.length <= maxLength) return text;
 return `${text.substring(0, maxLength)}...`;
}

export function capitalizeFirst(text: string): string {
 if (!text) return "";
 return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function toKebabCase(text: string): string {
 return text
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, "-")
  .toLowerCase();
}

export function toCamelCase(text: string): string {
 return text
  .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ""))
  .replace(/^(.)/, (char) => char.toLowerCase());
}

export function slugify(text: string): string {
 return text
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^\w\s-]/g, "")
  .replace(/[\s_-]+/g, "-")
  .replace(/^-+|-+$/g, "");
}
