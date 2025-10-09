// Mock data para clusters com números realistas
export const clusters = [
  {
    id: 'cluster-1',
    nome: "Mottu Fortaleza",
    filial: "Fortaleza",
    lider: "Wandrerson",
    supervisor: "Rodrigo",
    atrasos: 12,
    faltas: 4,
    adesao: 88,
    sla: 92,
    motoristas: 156,
    motoristasNecessarios: 160,
    veiculosParados: 5,
    carrosAtivos: 92,
    carrosNecessarios: 95,
    motosAtivas: 64,
    motasNecessarias: 65,
    celularesAtivos: 154,
    celularesNecessarios: 160,
    apropriacoesEmAndamento: 18,
    apropriacoesFinalizadas: 142,
    apropriacoesForaRaio: 2,
    apropriacoesMais60Dias: 1,
    apropriacoesNaoVisitadas: 4,
    produtividadeApropriacao: 85,
    status: 'normal',
    d1: {
      atrasos: 14,
      faltas: 5,
      adesao: 86,
      sla: 90,
      apropriacoesFinalizadas: 138
    }
  },
  {
    id: 'cluster-2',
    nome: "Mottu Butantã",
    filial: "Butantã",
    lider: "Bruno DE.",
    supervisor: "Evandro",
    atrasos: 22,
    faltas: 8,
    adesao: 74,
    sla: 78,
    motoristas: 198,
    motoristasNecessarios: 185,
    veiculosParados: 12,
    carrosAtivos: 115,
    carrosNecessarios: 110,
    motosAtivas: 83,
    motasNecessarias: 75,
    celularesAtivos: 192,
    celularesNecessarios: 185,
    apropriacoesEmAndamento: 31,
    apropriacoesFinalizadas: 178,
    apropriacoesForaRaio: 7,
    apropriacoesMais60Dias: 5,
    apropriacoesNaoVisitadas: 9,
    produtividadeApropriacao: 71,
    status: 'atencao',
    d1: {
      atrasos: 20,
      faltas: 9,
      adesao: 76,
      sla: 80,
      apropriacoesFinalizadas: 172
    }
  },
  {
    id: 'cluster-3',
    nome: "Mottu São Paulo Centro",
    filial: "São Paulo Centro",
    lider: "Carlos Silva",
    supervisor: "Ana Lima",
    atrasos: 35,
    faltas: 14,
    adesao: 62,
    sla: 65,
    motoristas: 142,
    motoristasNecessarios: 165,
    veiculosParados: 23,
    carrosAtivos: 78,
    carrosNecessarios: 98,
    motosAtivas: 64,
    motasNecessarias: 67,
    celularesAtivos: 135,
    celularesNecessarios: 165,
    apropriacoesEmAndamento: 45,
    apropriacoesFinalizadas: 98,
    apropriacoesForaRaio: 12,
    apropriacoesMais60Dias: 9,
    apropriacoesNaoVisitadas: 18,
    produtividadeApropriacao: 54,
    status: 'critico',
    d1: {
      atrasos: 33,
      faltas: 13,
      adesao: 64,
      sla: 68,
      apropriacoesFinalizadas: 102
    }
  },
  {
    id: 'cluster-4',
    nome: "Mottu Rio de Janeiro",
    filial: "Rio de Janeiro",
    lider: "Maria Santos",
    supervisor: "João Costa",
    atrasos: 9,
    faltas: 2,
    adesao: 91,
    sla: 94,
    motoristas: 223,
    motoristasNecessarios: 220,
    veiculosParados: 3,
    carrosAtivos: 134,
    carrosNecessarios: 132,
    motosAtivas: 89,
    motasNecessarias: 88,
    celularesAtivos: 221,
    celularesNecessarios: 220,
    apropriacoesEmAndamento: 12,
    apropriacoesFinalizadas: 256,
    apropriacoesForaRaio: 1,
    apropriacoesMais60Dias: 0,
    apropriacoesNaoVisitadas: 2,
    produtividadeApropriacao: 93,
    status: 'normal',
    d1: {
      atrasos: 10,
      faltas: 3,
      adesao: 90,
      sla: 93,
      apropriacoesFinalizadas: 251
    }
  },
  {
    id: 'cluster-5',
    nome: "Mottu Belo Horizonte",
    filial: "Belo Horizonte",
    lider: "Pedro Oliveira",
    supervisor: "Lucia Ferreira",
    atrasos: 26,
    faltas: 10,
    adesao: 72,
    sla: 76,
    motoristas: 134,
    motoristasNecessarios: 145,
    veiculosParados: 15,
    carrosAtivos: 72,
    carrosNecessarios: 87,
    motosAtivas: 62,
    motasNecessarias: 58,
    celularesAtivos: 128,
    celularesNecessarios: 145,
    apropriacoesEmAndamento: 28,
    apropriacoesFinalizadas: 121,
    apropriacoesForaRaio: 6,
    apropriacoesMais60Dias: 4,
    apropriacoesNaoVisitadas: 11,
    produtividadeApropriacao: 68,
    status: 'atencao',
    d1: {
      atrasos: 24,
      faltas: 11,
      adesao: 74,
      sla: 78,
      apropriacoesFinalizadas: 118
    }
  },
  {
    id: 'cluster-6',
    nome: "Mottu Salvador",
    filial: "Salvador",
    lider: "Fernanda Souza",
    supervisor: "Roberto Alves",
    atrasos: 8,
    faltas: 2,
    adesao: 93,
    sla: 96,
    motoristas: 98,
    motoristasNecessarios: 95,
    veiculosParados: 2,
    carrosAtivos: 58,
    carrosNecessarios: 57,
    motosAtivas: 40,
    motasNecessarias: 38,
    celularesAtivos: 97,
    celularesNecessarios: 95,
    apropriacoesEmAndamento: 8,
    apropriacoesFinalizadas: 187,
    apropriacoesForaRaio: 1,
    apropriacoesMais60Dias: 0,
    apropriacoesNaoVisitadas: 1,
    produtividadeApropriacao: 95,
    status: 'normal',
    d1: {
      atrasos: 9,
      faltas: 2,
      adesao: 92,
      sla: 95,
      apropriacoesFinalizadas: 183
    }
  }
];

// Função para calcular status baseado nas métricas
export const calculateClusterStatus = (cluster) => {
  const criticalThresholds = {
    atrasos: 30,
    faltas: 10,
    sla: 70,
    adesao: 70,
    apropriacoesFinalizadas: 100
  };

  const attentionThresholds = {
    atrasos: 20,
    faltas: 6,
    sla: 80,
    adesao: 80,
    apropriacoesFinalizadas: 120
  };

  let criticalCount = 0;
  let attentionCount = 0;

  // Verificar atrasos
  if (cluster.atrasos >= criticalThresholds.atrasos) criticalCount++;
  else if (cluster.atrasos >= attentionThresholds.atrasos) attentionCount++;

  // Verificar faltas
  if (cluster.faltas >= criticalThresholds.faltas) criticalCount++;
  else if (cluster.faltas >= attentionThresholds.faltas) attentionCount++;

  // Verificar SLA (quanto menor, pior)
  if (cluster.sla <= criticalThresholds.sla) criticalCount++;
  else if (cluster.sla <= attentionThresholds.sla) attentionCount++;

  // Verificar adesão (quanto menor, pior)
  if (cluster.adesao <= criticalThresholds.adesao) criticalCount++;
  else if (cluster.adesao <= attentionThresholds.adesao) attentionCount++;

  // Verificar apropriações finalizadas (quanto menor, pior)
  if (cluster.apropriacoesFinalizadas <= criticalThresholds.apropriacoesFinalizadas) criticalCount++;
  else if (cluster.apropriacoesFinalizadas <= attentionThresholds.apropriacoesFinalizadas) attentionCount++;

  if (criticalCount >= 2) return 'critico';
  if (attentionCount >= 2 || criticalCount >= 1) return 'atencao';
  return 'normal';
};

// Função para calcular saúde geral da operação (0-100%)
export const calculateHealthScore = (clusters) => {
  if (!clusters || clusters.length === 0) return 0;
  
  // Pesos para cada métrica (ajustar depois conforme necessidade)
  const weights = {
    sla: 0.30,           // 30% - SLA é crítico
    atrasos: 0.20,       // 20% - Atrasos impactam muito
    faltas: 0.15,        // 15% - Faltas prejudicam operação
    adesao: 0.15,        // 15% - Adesão à jornada importante
    produtividade: 0.10, // 10% - Produtividade em apropriações
    dimensionamento: 0.10 // 10% - Aderência ao dimensionamento
  };
  
  let totalScore = 0;
  
  clusters.forEach(cluster => {
    // SLA: quanto maior melhor (0-100)
    const slaScore = cluster.sla;
    
    // Atrasos: quanto menor melhor (inverter: 0% = 100 pontos, 100% = 0 pontos)
    const atrasosScore = Math.max(0, 100 - cluster.atrasos);
    
    // Faltas: quanto menor melhor
    const faltasScore = Math.max(0, 100 - (cluster.faltas * 5)); // faltas multiplicado por 5 para ter mais impacto
    
    // Adesão: quanto maior melhor
    const adesaoScore = cluster.adesao;
    
    // Produtividade: quanto maior melhor
    const produtividadeScore = cluster.produtividadeApropriacao;
    
    // Dimensionamento: quanto mais próximo de 100% melhor
    const dimensionamentoPercentual = (cluster.motoristas / cluster.motoristasNecessarios) * 100;
    const dimensionamentoScore = 100 - Math.abs(dimensionamentoPercentual - 100); // Penaliza desvio
    
    // Calcular score ponderado do cluster
    const clusterScore = 
      (slaScore * weights.sla) +
      (atrasosScore * weights.atrasos) +
      (faltasScore * weights.faltas) +
      (adesaoScore * weights.adesao) +
      (produtividadeScore * weights.produtividade) +
      (dimensionamentoScore * weights.dimensionamento);
    
    totalScore += clusterScore;
  });
  
  // Média dos clusters
  const averageScore = totalScore / clusters.length;
  
  return Math.round(Math.min(100, Math.max(0, averageScore)));
};

// Função para obter cor baseada no status
export const getStatusColor = (status) => {
  switch (status) {
    case 'normal':
      return {
        text: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        badge: 'bg-green-100 text-green-800'
      };
    case 'atencao':
      return {
        text: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        badge: 'bg-orange-100 text-orange-800'
      };
    case 'critico':
      return {
        text: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        badge: 'bg-red-100 text-red-800'
      };
    default:
      return {
        text: 'text-gray-600',
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        badge: 'bg-gray-100 text-gray-800'
      };
  }
};

// Lista de supervisores e seus líderes
export const supervisores = [
  {
    id: 'sup-rodrigo',
    nome: 'Rodrigo',
    lideres: [
      { id: 'lid-wandrerson', nome: 'Wandrerson', clusters: ['cluster-1'] }
    ]
  },
  {
    id: 'sup-evandro',
    nome: 'Evandro',
    lideres: [
      { id: 'lid-bruno', nome: 'Bruno DE.', clusters: ['cluster-2'] }
    ]
  },
  {
    id: 'sup-ana-lima',
    nome: 'Ana Lima',
    lideres: [
      { id: 'lid-carlos', nome: 'Carlos Silva', clusters: ['cluster-3'] }
    ]
  },
  {
    id: 'sup-joao-costa',
    nome: 'João Costa',
    lideres: [
      { id: 'lid-maria', nome: 'Maria Santos', clusters: ['cluster-4'] }
    ]
  },
  {
    id: 'sup-lucia',
    nome: 'Lucia Ferreira',
    lideres: [
      { id: 'lid-pedro', nome: 'Pedro Oliveira', clusters: ['cluster-5'] }
    ]
  },
  {
    id: 'sup-roberto',
    nome: 'Roberto Alves',
    lideres: [
      { id: 'lid-fernanda', nome: 'Fernanda Souza', clusters: ['cluster-6'] }
    ]
  }
];