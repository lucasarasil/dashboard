"use client";
import React, { useState, useEffect, useCallback } from "react";
import Header from "./header";
import ServiceGrid from "./service_grid";
import ServiceDetailDrawer from "./service_detail_drawer";
import ActionModal from "./action_modal";

import { generateMockServices } from "@/utils/mock_data";
import { Service } from "@/types/service";

// Static supervisor and leader data used for branch mapping. Kept outside the
// component so they are stable across renders and do not cause hook dependency
// churn.
const SUPERVISORS = [
 { id: "sup1", branches: ["Jandira", "Curitiba", "Jacarepaguá"] },
 { id: "sup2", branches: ["Ponta Grossa", "Santos", "Limão-Zona N"] },
 { id: "sup3", branches: ["Feira de Santa", "Itajai", "Goiânia"] },
];

const LEADERS = [
 { id: "led1", branch: "Jandira" },
 { id: "led2", branch: "Curitiba" },
 { id: "led3", branch: "Ponta Grossa" },
 { id: "led4", branch: "Santos" },
 { id: "led5", branch: "Feira de Santa" },
 { id: "led6", branch: "Itajai" },
];

const getSupervisorBranches = (supervisorId: string) => {
 const supervisor = SUPERVISORS.find((s) => s.id === supervisorId);
 return supervisor ? supervisor.branches : [];
};

const getLeaderBranch = (leaderId: string) => {
 const leader = LEADERS.find((l) => l.id === leaderId);
 return leader ? leader.branch : "";
};

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

 const [selectedSupervisor, setSelectedSupervisor] = useState("");
 const [selectedLeader, setSelectedLeader] = useState("");

 const criticalAlertsCount = filteredServices.filter(
  (service) => service.status === "critical" || service.hasAlert
 ).length;

 const streetCallsCount = filteredServices.filter(
  (s) => s.serviceType === "street_call"
 ).length;
 const appropriationsCount = filteredServices.filter(
  (s) => s.serviceType === "appropriation"
 ).length;

 const handleSearch = (term) => {
  setSearchTerm(term);
  filterServices(term, activeFilter, selectedSupervisor, selectedLeader);
 };

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

 const filterServices = useCallback(
  (search, filter, supervisorId = "", leaderId = "") => {
   let filtered = [...services];

   if (filter !== "all") {
    filtered = filtered.filter((service) => service.status === filter);
   }

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

   // Only update state if result changed to avoid unnecessary re-renders.
   setFilteredServices((prev) => {
    const isEqual =
     prev.length === filtered.length &&
     prev.every((p, i) => p.id === filtered[i].id);
    return isEqual ? prev : filtered;
   });
  },
  [services]
 );

 // getSupervisorBranches and getLeaderBranch are now defined above as stable
 // helpers (outside the component) so they don't affect hook deps.
 // Call filterServices when inputs that affect the filtered list change.
 // Do NOT include the `filterServices` function itself in the dependency array
 // because it is recreated on every render and would cause an infinite update
 // loop. We intentionally list the state values used for filtering instead.
 useEffect(() => {
  filterServices(searchTerm, activeFilter, selectedSupervisor, selectedLeader);
  // Depend on the memoized `filterServices` and the input state values so the
  // effect runs when inputs or the function (which depends on `services`) change.
 }, [
  filterServices,
  searchTerm,
  activeFilter,
  selectedSupervisor,
  selectedLeader,
 ]);

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
  <div className="h-screen flex flex-col">
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

   <main className="flex-1 overflow-hidden">
    <div className="h-full flex">
     {/* Lista de serviços */}
     <div className="flex-1 overflow-auto">
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
