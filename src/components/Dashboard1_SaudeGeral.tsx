import React, { useState, useEffect } from "react";
import Header from "./Header";
import ServiceGrid from "./ServiceGrid";
import ServiceDetailDrawer from "./ServiceDetailDrawer";
import ActionModal from "./ActionModal";

// Importar a lógica do App.js
import { generateMockServices } from "../utils/mockData";
import { Service } from "../types";

const Dashboard1_SaudeGeral = () => {
 const [services, setServices] = useState<Service[]>(() =>
  generateMockServices()
 );
 const [filteredServices, setFilteredServices] = useState<Service[]>([]);
 const [selectedService, setSelectedService] = useState<Service | null>(null);
 const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 const [isActionModalOpen, setIsActionModalOpen] = useState(false);
 const [searchTerm, setSearchTerm] = useState("");
 const [activeFilter, setActiveFilter] = useState("all");

 // Handlers para filtros hierárquicos
 const [selectedSupervisor, setSelectedSupervisor] = useState("");
 const [selectedLeader, setSelectedLeader] = useState("");

 // Calcular alertas críticos
 const criticalAlertsCount = filteredServices.filter(
  (service) => service.status === "critical" || service.hasAlert
 ).length;

 // Contadores por tipo
 const streetCallsCount = filteredServices.filter(
  (s) => s.serviceType === "street_call"
 ).length;
 const appropriationsCount = filteredServices.filter(
  (s) => s.serviceType === "appropriation"
 ).length;

 // Função de busca
 const handleSearch = (term) => {
  setSearchTerm(term);
  filterServices(term, activeFilter, selectedSupervisor, selectedLeader);
 };

 // Função de filtro
 const handleFilterChange = (filter) => {
  setActiveFilter(filter);
  filterServices(searchTerm, filter, selectedSupervisor, selectedLeader);
 };

 const handleSupervisorChange = (supervisorId) => {
  setSelectedSupervisor(supervisorId);
  setSelectedLeader(""); // Reset líder quando supervisor muda
  filterServices(searchTerm, activeFilter, supervisorId, "");
 };

 const handleLeaderChange = (leaderId) => {
  setSelectedLeader(leaderId);
  filterServices(searchTerm, activeFilter, selectedSupervisor, leaderId);
 };

 const handleStatusChange = (status) => {
  setActiveFilter(status);
  filterServices(searchTerm, status, selectedSupervisor, selectedLeader);
 };

 // Função para filtrar serviços
 const filterServices = (search, filter, supervisorId = "", leaderId = "") => {
  let filtered = [...services];

  // Aplicar filtro de status
  if (filter !== "all") {
   filtered = filtered.filter((service) => service.status === filter);
  }

  // Aplicar filtro de supervisor/líder baseado em filiais
  if (supervisorId) {
   const supervisorBranches = getSupervisorBranches(supervisorId);
   filtered = filtered.filter((service) =>
    supervisorBranches.includes(service.branch)
   );
  }

  if (leaderId) {
   const leaderBranch = getLeaderBranch(leaderId);
   filtered = filtered.filter((service) => service.branch === leaderBranch);
  }

  // Aplicar busca
  if (search) {
   const searchLower = search.toLowerCase();
   filtered = filtered.filter(
    (service) =>
     service.id.toLowerCase().includes(searchLower) ||
     service.serviceName.toLowerCase().includes(searchLower) ||
     service.vehiclePlate.toLowerCase().includes(searchLower) ||
     service.branch.toLowerCase().includes(searchLower) ||
     (service.driver && service.driver.toLowerCase().includes(searchLower))
   );
  }

  setFilteredServices(filtered);
 };

 // Função para obter filiais do supervisor
 const getSupervisorBranches = (supervisorId) => {
  const supervisors = [
   {
    id: "sup1",
    branches: ["Jandira", "Curitiba", "Jacarepaguá"],
   },
   {
    id: "sup2",
    branches: ["Ponta Grossa", "Santos", "Limão-Zona N"],
   },
   {
    id: "sup3",
    branches: ["Feira de Santa", "Itajai", "Goiânia"],
   },
  ];
  const supervisor = supervisors.find((s) => s.id === supervisorId);
  return supervisor ? supervisor.branches : [];
 };

 // Função para obter filial do líder
 const getLeaderBranch = (leaderId) => {
  const leaders = [
   { id: "led1", branch: "Jandira" },
   { id: "led2", branch: "Curitiba" },
   { id: "led3", branch: "Ponta Grossa" },
   { id: "led4", branch: "Santos" },
   { id: "led5", branch: "Feira de Santa" },
   { id: "led6", branch: "Itajai" },
  ];
  const leader = leaders.find((l) => l.id === leaderId);
  return leader ? leader.branch : "";
 };

 // Inicializar serviços filtrados
 useEffect(() => {
  filterServices(searchTerm, activeFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 // Selecionar serviço
 const handleServiceSelect = (service: Service) => {
  setSelectedService(service);
  setIsDrawerOpen(true);
 };

 // Fechar drawer
 const handleCloseDrawer = () => {
  setIsDrawerOpen(false);
  setSelectedService(null);
 };

 // Registrar ação
 const handleActionSubmit = (actionData) => {
  if (selectedService) {
   const newLog = {
    id: Date.now(),
    action: actionData.actionType,
    details: actionData.comment,
    user: actionData.responsible,
    timestamp: new Date().toLocaleString("pt-BR"),
    type: "manual_action",
   };

   setServices((prevServices) =>
    prevServices.map((service) =>
     service.id === selectedService.id
      ? {
         ...service,
         logs: [...service.logs, newLog],
         actionTaken: true,
        }
      : service
    )
   );

   setSelectedService((prev) => {
    if (!prev) return null;
    return {
     ...prev,
     logs: [...prev.logs, newLog],
     actionTaken: true,
    };
   });
  }
 };

 return (
  <div className="h-full flex flex-col">
   <Header
    services={filteredServices}
    onSearch={handleSearch}
    onFilterChange={handleFilterChange}
    onSupervisorChange={handleSupervisorChange}
    onLeaderChange={handleLeaderChange}
    onStatusChange={handleStatusChange}
    criticalAlertsCount={criticalAlertsCount}
    streetCallsCount={streetCallsCount}
    appropriationsCount={appropriationsCount}
    selectedSupervisor={selectedSupervisor}
    selectedLeader={selectedLeader}
   />

   <main className="flex-1 relative overflow-hidden">
    <div className="h-full flex">
     {/* Lista de serviços */}
     <div className="flex-1">
      <ServiceGrid
       services={filteredServices}
       onServiceSelect={handleServiceSelect}
       selectedService={selectedService}
      />
     </div>

     {/* Drawer lateral */}
     <ServiceDetailDrawer
      service={selectedService}
      isOpen={isDrawerOpen}
      onClose={handleCloseDrawer}
     />
    </div>
   </main>

   <ActionModal
    isOpen={isActionModalOpen}
    onClose={() => setIsActionModalOpen(false)}
    onSubmit={handleActionSubmit}
   />
  </div>
 );
};

export default Dashboard1_SaudeGeral;
