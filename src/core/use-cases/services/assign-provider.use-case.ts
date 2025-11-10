import { ServiceEntity } from "@/core/entities/service.entity";

export interface AssignProviderInput {
 service: ServiceEntity;
 providerId: string;
 providerName: string;
 notes?: string;
 assignedBy: string;
}

export interface AssignProviderOutput {
 success: boolean;
 updatedService: ServiceEntity;
 message: string;
}

export class AssignProviderUseCase {
 execute(input: AssignProviderInput): AssignProviderOutput {
  const { service, providerId, providerName } = input;

  if (!providerId || !providerName) {
   return {
    success: false,
    updatedService: service,
    message: "Prestador inválido",
   };
  }
  if (service.provider) {
   return {
    success: false,
    updatedService: service,
    message: "Serviço já possui um prestador atrelado",
   };
  }

  if (service.status === "completed") {
   return {
    success: false,
    updatedService: service,
    message: "Não é possível atrelar prestador a serviço concluído",
   };
  }

  // Atualizar serviço
  const updatedService: ServiceEntity = {
   ...service,
   provider: providerName,
   status: service.status === "open" ? "in_progress" : service.status,
   updatedAt: new Date(),
  };

  return {
   success: true,
   updatedService,
   message: `Prestador ${providerName} atrelado com sucesso`,
  };
 }
}

export const assignProvider = (
 input: AssignProviderInput
): AssignProviderOutput => {
 const useCase = new AssignProviderUseCase();
 return useCase.execute(input);
};
