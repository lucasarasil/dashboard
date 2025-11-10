"use client";

import React from "react";

interface ActionModalProps {
 isOpen: boolean;
 onClose: () => void;
 onSubmit: (data: any) => void;
}

export function ActionModal({ isOpen, onClose, onSubmit }: ActionModalProps) {
 const [actionType, setActionType] = React.useState("");
 const [description, setDescription] = React.useState("");

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit({ actionType, description });
  setActionType("");
  setDescription("");
  onClose();
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
   <div
    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
    onClick={onClose}
   />
   <div className="relative bg-dark-secondary border border-border-primary rounded-2xl p-6 w-full max-w-lg mx-4">
    <h2 className="text-xl font-bold text-text-primary mb-4">Registrar Ação</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
     <div>
      <label className="block text-sm font-medium text-text-secondary mb-2">
       Tipo de Ação
      </label>
      <select
       value={actionType}
       onChange={(e) => setActionType(e.target.value)}
       className="w-full px-4 py-2 bg-dark-tertiary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-mottu-500"
       required
      >
       <option value="">Selecione...</option>
       <option value="vehicle_issue">Problema no Veículo</option>
       <option value="provider_issue">Problema com Prestador</option>
       <option value="delay_notification">Notificação de Atraso</option>
       <option value="route_change">Mudança de Rota</option>
       <option value="other">Outro</option>
      </select>
     </div>
     <div>
      <label className="block text-sm font-medium text-text-secondary mb-2">
       Descrição
      </label>
      <textarea
       value={description}
       onChange={(e) => setDescription(e.target.value)}
       className="w-full px-4 py-2 bg-dark-tertiary border border-border-primary rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-mottu-500 min-h-[100px]"
       required
      />
     </div>
     <div className="flex gap-3 justify-end">
      <button
       type="button"
       onClick={onClose}
       className="px-4 py-2 bg-dark-tertiary text-text-primary rounded-lg hover:bg-dark-tertiary/80 transition-colors"
      >
       Cancelar
      </button>
      <button
       type="submit"
       className="px-4 py-2 bg-mottu-500 text-white rounded-lg hover:bg-mottu-600 transition-colors"
      >
       Registrar
      </button>
     </div>
    </form>
   </div>
  </div>
 );
}
