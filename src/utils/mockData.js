// Função para gerar dados mock com 81 serviços (41 chamados + 40 apropriações)
export const generateMockServices = () => {
  const services = [];
  
  // Tipos de serviços para chamados de rua
  const streetServiceTypes = [
    'Problema de Fusível', 'Cabo de Acelerador Rompido', 'Moto desligando sozinha',
    'Pedal de partida/Motor Travado', 'Moto não liga - Não Identificado',
    'Problema na Bateria', 'Pneu Furado', 'Problema no Carburador',
    'Freio com Defeito', 'Farol não funciona'
  ];
  
  // Tipos de serviços para apropriações
  const appropriationTypes = [
    'Apropriação - Mau uso', 'Apropriação - Roubo', 'Apropriação - Acidente',
    'Apropriação - Vandalismo', 'Apropriação - Abandono', 'Apropriação - Não devolução',
    'Apropriação - Danos graves', 'Apropriação - Uso inadequado'
  ];
  
  const branches = [
    'Jandira', 'Curitiba', 'Jacarepaguá', 'Ponta Grossa', 'Santos',
    'Limão-Zona N', 'Feira de Santa', 'Itajai', 'Goiânia', 'Belo Horizonte',
    'Campinas', 'Jundiaí', 'Itabuna', 'Montes Claros', 'Piracicaba',
    'Butantã', 'Vila Velha', 'São Paulo Centro', 'Guarulhos', 'Osasco'
  ];
  
  const drivers = [
    'João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Lima', 'Carlos Oliveira',
    'Lucia Ferreira', 'Roberto Alves', 'Fernanda Souza', 'Marcos Pereira', 'Juliana Rocha'
  ];
  
  // Gerar 41 chamados de rua
  for (let i = 1; i <= 41; i++) {
    const serviceType = streetServiceTypes[Math.floor(Math.random() * streetServiceTypes.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];
    const driver = drivers[Math.floor(Math.random() * drivers.length)];
    
    const service = {
      id: `CHAM-${String(i).padStart(3, '0')}`,
      serviceName: serviceType,
      status: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'in_progress' : 'open',
      vehiclePlate: `ABC-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      branch: branch,
      driver: driver,
      hasAlert: Math.random() > 0.6,
      needsReview: Math.random() > 0.7,
      actionTaken: Math.random() > 0.8,
      elapsedTime: Math.floor(Math.random() * 180) + 10,
      slaProgress: Math.floor(Math.random() * 100),
      serviceType: 'street_call',
      order: i, // Ordem simples para demonstração
      history: [{
        id: 1,
        action: 'Chamado registrado',
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
        responsible: 'Sistema Automático',
        type: 'system'
      }],
      alerts: [],
      logs: [],
      locations: [{
        id: 'branch',
        name: `Filial ${branch}`,
        type: 'branch',
        address: `Rua das Flores, ${Math.floor(Math.random() * 1000) + 1} - Centro`,
        status: 'base'
      }]
    };
    
    if (service.hasAlert) {
      service.alerts.push({
        id: 1,
        title: 'Tempo limite próximo',
        description: 'O serviço está próximo do tempo limite estabelecido',
        severity: service.status === 'critical' ? 'high' : 'medium',
        status: 'open',
        timestamp: new Date().toISOString()
      });
    }
    
    services.push(service);
  }
  
  // Gerar 40 apropriações críticas
  for (let i = 1; i <= 40; i++) {
    const serviceType = appropriationTypes[Math.floor(Math.random() * appropriationTypes.length)];
    const branch = branches[Math.floor(Math.random() * branches.length)];
    const driver = drivers[Math.floor(Math.random() * drivers.length)];
    
    const service = {
      id: `APRO-${String(i).padStart(3, '0')}`,
      serviceName: serviceType,
      status: Math.random() > 0.3 ? 'critical' : 'in_progress', // Apropriações são mais críticas
      vehiclePlate: `XYZ-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      branch: branch,
      driver: driver,
      hasAlert: Math.random() > 0.4, // Mais alertas em apropriações
      needsReview: Math.random() > 0.5,
      actionTaken: Math.random() > 0.7,
      elapsedTime: Math.floor(Math.random() * 240) + 30,
      slaProgress: Math.floor(Math.random() * 100),
      serviceType: 'appropriation',
      order: i + 41, // Ordem simples para demonstração
      history: [{
        id: 1,
        action: 'Apropriação identificada',
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 5).toISOString(),
        responsible: 'Sistema Automático',
        type: 'system'
      }],
      alerts: [],
      logs: [],
      locations: [{
        id: 'branch',
        name: `Filial ${branch}`,
        type: 'branch',
        address: `Rua das Flores, ${Math.floor(Math.random() * 1000) + 1} - Centro`,
        status: 'base'
      }]
    };
    
    if (service.hasAlert) {
      service.alerts.push({
        id: 1,
        title: 'Apropriação crítica detectada',
        description: 'Apropriação requer atenção imediata',
        severity: 'high',
        status: 'open',
        timestamp: new Date().toISOString()
      });
    }
    
    services.push(service);
  }
  
  // Ordenar por ordem (conceito simples de prioridade)
  return services.sort((a, b) => a.order - b.order);
};

