import React, { useState } from "react";
import Modal from "./Modal";

interface ActionModalProps {
 isOpen: boolean;
 onClose: () => void;
 onSubmit: (formData: FormData) => void;
}

interface FormData {
 responsible: string;
 actionType: string;
 comment: string;
}

const ActionModal: React.FC<ActionModalProps> = ({
 isOpen,
 onClose,
 onSubmit,
}) => {
 const [formData, setFormData] = useState<FormData>({
  responsible: "",
  actionType: "",
  comment: "",
 });

 const actionTypes = [
  { value: "status_change", label: "Alterar Status" },
  { value: "comment", label: "Adicionar Comentário" },
  { value: "priority_change", label: "Alterar Prioridade" },
  { value: "assignment", label: "Atribuir Responsável" },
  { value: "escalation", label: "Escalar Serviço" },
 ];

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit(formData);
  setFormData({ responsible: "", actionType: "", comment: "" });
  onClose();
 };

 const handleChange = (
  e: React.ChangeEvent<
   HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
 ) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: value,
  }));
 };

 return (
  <Modal isOpen={isOpen} onClose={onClose} title="Registrar Ação">
   <form onSubmit={handleSubmit} className="space-y-4">
    <div>
     <label
      htmlFor="responsible"
      className="block text-sm font-medium text-gray-700 mb-1"
     >
      Responsável
     </label>
     <input
      type="text"
      id="responsible"
      name="responsible"
      value={formData.responsible}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      placeholder="Nome do responsável pela ação"
     />
    </div>

    <div>
     <label
      htmlFor="actionType"
      className="block text-sm font-medium text-gray-700 mb-1"
     >
      Tipo de Ação
     </label>
     <select
      id="actionType"
      name="actionType"
      value={formData.actionType}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
     >
      <option value="">Selecione uma ação</option>
      {actionTypes.map((type) => (
       <option key={type.value} value={type.value}>
        {type.label}
       </option>
      ))}
     </select>
    </div>

    <div>
     <label
      htmlFor="comment"
      className="block text-sm font-medium text-gray-700 mb-1"
     >
      Comentário
     </label>
     <textarea
      id="comment"
      name="comment"
      value={formData.comment}
      onChange={handleChange}
      rows={4}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      placeholder="Descreva a ação realizada..."
     />
    </div>

    <div className="flex justify-end space-x-3 pt-4">
     <button type="button" onClick={onClose} className="btn-secondary">
      Cancelar
     </button>
     <button type="submit" className="btn-primary">
      Registrar Ação
     </button>
    </div>
   </form>
  </Modal>
 );
};

export default ActionModal;
