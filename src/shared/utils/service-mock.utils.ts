import {
 ServiceEntity,
 ServiceType,
 ServiceStatus,
} from "@/core/entities/service.entity";
import { AlertEntity } from "@/core/entities/alert.entity";
import { ActionEntity } from "@/core/entities/action.entity";
import { LogEntity } from "@/core/entities/log.entity";
import { LocationEntity } from "@/core/entities/location.entity";

const branches = [
 "São Paulo Centro",
 "Fortaleza",
 "Butantã",
 "Rio de Janeiro",
 "Belo Horizonte",
 "Salvador",
 "Porto Alegre",
 "Curitiba",
];

const providers = [
 "João Silva",
 "Maria Santos",
 "Carlos Alberto",
 "Ana Souza",
 "Pedro Oliveira",
 "Lucia Ferreira",
 "Bruno Costa",
 "Fernanda Lima",
];

function randomInt(min: number, max: number): number {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomItem<T>(array: T[]): T {
 return array[Math.floor(Math.random() * array.length)];
}

function randomStatus(): ServiceStatus {
 const rand = Math.random();
 if (rand < 0.5) return "open";
 if (rand < 0.7) return "in_progress";
 if (rand < 0.85) return "pending";
 if (rand < 0.95) return "completed";
 return "critical";
}

export function generateMockServices(count: number = 81): ServiceEntity[] {
 const services: ServiceEntity[] = [];

 for (let i = 0; i < count; i++) {
  const type: ServiceType =
   i < Math.floor(count / 2) ? "street_call" : "appropriation";
  const status = randomStatus();
  const slaProgress = randomInt(0, 100);
  const hasAlert = status === "critical" || Math.random() > 0.8;
  const hasProvider = status !== "open" || Math.random() > 0.3;

  const now = new Date();
  const createdAt = new Date(
   now.getTime() - randomInt(0, 7 * 24 * 60 * 60 * 1000)
  );

  const alerts: AlertEntity[] = hasAlert
   ? [
      {
       id: `alert-${i}-1`,
       serviceId: `SRV-${String(i + 1).padStart(4, "0")}`,
       type: "sla",
       severity: "high",
       status: "active",
       title: "SLA em Risco",
       message: "SLA em risco",
       timestamp: new Date(createdAt.getTime() + randomInt(1000, 10000)),
       createdAt: new Date(),
       updatedAt: new Date(),
      },
     ]
   : [];

  const history: ActionEntity[] = [];
  const logs: LogEntity[] = [
   {
    id: `log-${i}-1`,
    serviceId: `SRV-${String(i + 1).padStart(4, "0")}`,
    message: `Serviço criado`,
    level: "info",
    timestamp: createdAt,
   },
  ];

  const location: LocationEntity = {
   id: `loc-${i}`,
   name: `Localização ${i}`,
   address: `Rua Exemplo, ${randomInt(100, 999)}`,
   coordinates: {
    lat: -23.5505 + (Math.random() - 0.5) * 0.5,
    lng: -46.6333 + (Math.random() - 0.5) * 0.5,
   },
   city: randomItem(branches),
   state: "SP",
   country: "Brasil",
   createdAt,
   updatedAt: new Date(),
  };
  services.push({
   id: `SRV-${String(i + 1).padStart(4, "0")}`,
   title:
    type === "street_call"
     ? `Chamado de Rua #${i + 1}`
     : `Apropriação #${i + 1}`,
   status,
   type,
   sla: randomInt(30, 240),
   slaProgress,
   branch: randomItem(branches),
   provider: hasProvider ? randomItem(providers) : undefined,
   hasAlert,
   needsReview: Math.random() > 0.9,
   actionTaken: status === "completed" || Math.random() > 0.7,
   createdAt,
   updatedAt: new Date(),
   alerts,
   history,
   logs,
   location,
  });
 }

 return services;
}
