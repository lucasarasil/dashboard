"use client";

import React, { useEffect, Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
 Dialog,
 DialogPanel,
 Transition,
 TransitionChild,
} from "@headlessui/react";

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 title?: string;
 children: React.ReactNode;
 size?: "sm" | "md" | "lg" | "xl" | "full";
 showCloseButton?: boolean;
}

const sizeClasses = {
 sm: "max-w-md",
 md: "max-w-lg",
 lg: "max-w-2xl",
 xl: "max-w-4xl",
 full: "max-w-7xl",
};

export function Modal({
 isOpen,
 onClose,
 title,
 children,
 size = "md",
 showCloseButton = true,
}: ModalProps) {
 useEffect(() => {
  if (isOpen) {
   document.body.style.overflow = "hidden";
  } else {
   document.body.style.overflow = "unset";
  }

  return () => {
   document.body.style.overflow = "unset";
  };
 }, [isOpen]);

 return (
  <Transition appear show={isOpen} as={Fragment}>
   <Dialog as="div" className="relative z-50" onClose={onClose}>
    <TransitionChild
     as={Fragment}
     enter="ease-out duration-300"
     enterFrom="opacity-0"
     enterTo="opacity-100"
     leave="ease-in duration-200"
     leaveFrom="opacity-100"
     leaveTo="opacity-0"
    >
     <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
    </TransitionChild>

    <div className="fixed inset-0 overflow-y-auto">
     <div className="flex min-h-full items-center justify-center p-4">
      <TransitionChild
       as={Fragment}
       enter="ease-out duration-300"
       enterFrom="opacity-0 scale-95"
       enterTo="opacity-100 scale-100"
       leave="ease-in duration-200"
       leaveFrom="opacity-100 scale-100"
       leaveTo="opacity-0 scale-95"
      >
       <DialogPanel
        className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-dark-secondary border border-border-primary shadow-2xl transition-all`}
       >
        {/* Header */}
        {(title || showCloseButton) && (
         <div className="flex items-center justify-between px-6 py-4 border-b border-border-primary">
          {title && (
           <Dialog.Title className="text-lg font-semibold text-text-primary">
            {title}
           </Dialog.Title>
          )}
          {showCloseButton && (
           <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-dark-tertiary transition-colors"
           >
            <XMarkIcon className="h-6 w-6 text-text-secondary hover:text-text-primary" />
           </button>
          )}
         </div>
        )}

        {/* Content */}
        <div className="px-6 py-4">{children}</div>
       </DialogPanel>
      </TransitionChild>
     </div>
    </div>
   </Dialog>
  </Transition>
 );
}
