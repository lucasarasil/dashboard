"use client";
import React, { useState } from "react";
import {
 PlusIcon,
 UserIcon,
 ClockIcon,
 CheckCircleIcon,
 ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const ActionsTab = ({ service }) => {
 const [showActionForm, setShowActionForm] = useState(false);
 const [newAction, setNewAction] = useState({
  type: "",
  description: "",
  assignedTo: "",
 });

 // Ações manuais (diferente dos logs automáticos)
 const manualActions = (service.logs || []).filter(
  (log) => log.type === "manual_action"
 );

 const actionTypes = [
  { value: "assign", label: "Atribuir Prestador", icon: UserIcon },
  {
   value: "escalate",
   label: "Escalar Serviço",
   icon: ExclamationTriangleIcon,
  },
  { value: "comment", label: "Adicionar Comentário", icon: ClockIcon },
  {
   value: "priority",
   label: "Alterar Prioridade",
   icon: ExclamationTriangleIcon,
  },
 ];

 const handleSubmitAction = (e) => {
  e.preventDefault();
  // Aqui você implementaria a lógica para salvar a ação
  console.log("Nova ação:", newAction);
  setShowActionForm(false);
  setNewAction({ type: "", description: "", assignedTo: "" });
 };

 return (
  <div className="h-full overflow-y-auto p-6">
   {/* Header com botão de nova ação */}
   <div className="flex items-center justify-between mb-6">
    <h3 className="text-lg font-medium text-gray-900">Ações Manuais</h3>
    <button
     onClick={() => setShowActionForm(true)}
     className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
    >
     <PlusIcon className="h-4 w-4" />
     <span>Nova Ação</span>
    </button>
   </div>

   {/* Formulário de nova ação */}
   {showActionForm && (
    <div className="mb-6 p-4 bg-gray-950 rounded-lg border">
     <form onSubmit={handleSubmitAction} className="space-y-4">
      <div>
       <label className="block text-sm font-medium text-gray-300 mb-2">
        Tipo de Ação
       </label>
       <select
        value={newAction.type}
        onChange={(e) => setNewAction({ ...newAction, type: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        required
       >
        <option value="">Selecione uma ação</option>
        {actionTypes.map((type) => (
         <option key={type.value} value={type.value}>
          {type.label}
         </option>
        ))}
       </select>
      </div>

      {newAction.type === "assign" && (
       <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
         Atribuir para
        </label>
        <select
         value={newAction.assignedTo}
         onChange={(e) =>
          setNewAction({ ...newAction, assignedTo: e.target.value })
         }
         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
         <option value="">Selecione um prestador</option>
         <option value="provider1">João Silva</option>
         <option value="provider2">Maria Santos</option>
         <option value="provider3">Pedro Costa</option>
        </select>
       </div>
      )}

      <div>
       <label className="block text-sm font-medium text-gray-300 mb-2">
        Descrição
       </label>
       <textarea
        value={newAction.description}
        onChange={(e) =>
         setNewAction({ ...newAction, description: e.target.value })
        }
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        placeholder="Descreva a ação a ser realizada..."
        required
       />
      </div>

      <div className="flex justify-end space-x-3">
       <button
        type="button"
        onClick={() => setShowActionForm(false)}
        className="px-4 py-2 text-gray-600 hover:text-gray-800"
       >
        Cancelar
       </button>
       <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
       >
        Executar Ação
       </button>
      </div>
     </form>
    </div>
   )}

   {/* Lista de ações */}
   <div className="space-y-4">
    {manualActions.map((action) => (
     <div
      key={action.id}
      className="p-4 bg-green-50 border border-green-200 rounded-lg"
     >
      <div className="flex items-start space-x-3">
       <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5" />
       <div className="flex-1">
        <h4 className="font-medium text-green-900 mb-1">{action.action}</h4>
        <p className="text-sm text-green-700 mb-2">{action.details}</p>
        <div className="flex items-center space-x-4 text-xs text-green-600">
         <span>Por: {action.user}</span>
         <span>Em: {new Date(action.timestamp).toLocaleString("pt-BR")}</span>
        </div>
       </div>
      </div>
     </div>
    ))}
   </div>

   {manualActions.length === 0 && !showActionForm && (
    <div className="text-center py-8">
     <CheckCircleIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
     <h4 className="text-lg font-medium text-gray-900 mb-2">
      Nenhuma ação manual registrada
     </h4>
     <p className="text-gray-500">
      Clique em &quot;Nova Ação&quot; para registrar uma ação manual.
     </p>
    </div>
   )}
  </div>
 );
};

export default ActionsTab;
