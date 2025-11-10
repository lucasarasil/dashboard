"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { IServiceRepository } from "@/core/interfaces/repositories/service.repository";
import { MockServiceRepository } from "@/infrastructure/repositories/service.repository.impl";

interface RepositoryContextValue {
 serviceRepository: IServiceRepository;
}

const RepositoryContext = createContext<RepositoryContextValue | undefined>(
 undefined
);

interface RepositoryProviderProps {
 children: ReactNode;
 serviceRepository?: IServiceRepository;
}

export function RepositoryProvider({
 children,
 serviceRepository,
}: RepositoryProviderProps) {
 // Se não for fornecido um repository, usa o Mock por padrão
 const defaultRepository = serviceRepository ?? new MockServiceRepository();

 const value: RepositoryContextValue = {
  serviceRepository: defaultRepository,
 };

 return (
  <RepositoryContext.Provider value={value}>
   {children}
  </RepositoryContext.Provider>
 );
}

// Hook para acessar os repositories
export function useRepository() {
 const context = useContext(RepositoryContext);

 if (!context) {
  throw new Error("useRepository must be used within a RepositoryProvider");
 }

 return context;
}
