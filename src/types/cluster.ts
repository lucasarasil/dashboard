export interface Cluster {
 id: string;
 nome: string;
 filial: string;
 lider: string;
 supervisor: string;
 atrasos: number;
 faltas: number;
 adesao: number;
 sla: number;
 motoristas: number;
 motoristasNecessarios: number;
 veiculosParados: number;
 carrosAtivos: number;
 carrosNecessarios: number;
 motosAtivas: number;
 motasNecessarias: number;
 celularesAtivos: number;
 celularesNecessarios: number;
 apropriacoesEmAndamento: number;
 apropriacoesFinalizadas: number;
 apropriacoesForaRaio: number;
 apropriacoesMais60Dias: number;
 apropriacoesNaoVisitadas: number;
 produtividadeApropriacao: number;
 status: string;
 d1: {
  atrasos: number;
  faltas: number;
  adesao: number;
  sla: number;
  apropriacoesFinalizadas: number;
 };
}
