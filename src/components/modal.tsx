import React, { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 title: string;
 children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
 useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
   if (e.key === "Escape") {
    onClose();
   }
  };

  if (isOpen) {
   document.addEventListener("keydown", handleEscape);
   document.body.style.overflow = "hidden";
  }

  return () => {
   document.removeEventListener("keydown", handleEscape);
   document.body.style.overflow = "unset";
  };
 }, [isOpen, onClose]);

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 z-50 overflow-y-auto">
   <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
    {/* Overlay */}
    <div
     className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
     onClick={onClose}
    />

    {/* Modal content */}
    <div className="relative transform overflow-hidden rounded-lg bg-dark-secondary border border-border-primary text-left shadow-dark-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
     <div className="bg-dark-secondary px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
       <h3 className="text-lg font-medium text-text-primary">{title}</h3>
       <button
        onClick={onClose}
        className="p-2 hover:bg-dark-tertiary rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mottu-500"
       >
        <XMarkIcon className="h-5 w-5 text-text-muted" />
       </button>
      </div>

      {/* Content */}
      <div className="mt-2">{children}</div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Modal;
