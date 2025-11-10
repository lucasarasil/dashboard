import React from "react";
import { Button } from "@/presentation/components/common";

export function ActionsTab() {
 return (
  <div className="space-y-4">
   <h3 className="text-lg font-semibold text-text-primary">Ações Rápidas</h3>
   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Button variant="secondary">Notificar Motorista</Button>
    <Button variant="secondary">Acionar Suporte</Button>
    <Button variant="secondary">Registrar Manutenção</Button>
    <Button variant="danger">Desativar Serviço</Button>
   </div>
  </div>
 );
}
