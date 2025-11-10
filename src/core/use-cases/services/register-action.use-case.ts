import { ServiceEntity } from "@/core/entities/service.entity";

export type ActionType =
 | "vehicle_issue"
 | "provider_issue"
 | "delay_notification"
 | "route_change"
 | "other";

export interface RegisterActionInput {
 service: ServiceEntity;
 actionType: ActionType;
 description: string;
 takenBy: string;
 timestamp?: Date;
}

export interface RegisterActionOutput {
 success: boolean;
 updatedService: ServiceEntity;
 message: string;
 actionId: string;
}

export class RegisterActionUseCase {
 execute(input: RegisterActionInput): RegisterActionOutput {
  const { service, description, takenBy } = input;

  if (!description || description.trim().length < 5) {
   return {
    success: false,
    updatedService: service,
    message: "Descrição da ação deve ter pelo menos 5 caracteres",
    actionId: "",
   };
  }
  if (!takenBy) {
   return {
    success: false,
    updatedService: service,
    message: "Usuário responsável pela ação não informado",
    actionId: "",
   };
  }

  const actionId = this.generateActionId();

  const updatedService: ServiceEntity = {
   ...service,
   actionTaken: true,
   needsReview: false,
   updatedAt: new Date(),
  };

  return {
   success: true,
   updatedService,
   message: "Ação registrada com sucesso",
   actionId,
  };
 }

 private generateActionId(): string {
  return `ACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
 }
}

export const registerAction = (
 input: RegisterActionInput
): RegisterActionOutput => {
 const useCase = new RegisterActionUseCase();
 return useCase.execute(input);
};
