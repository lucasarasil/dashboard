"use client";

import React, { useState } from "react";
import {
 BellIcon,
 ClockIcon,
 CodeBracketIcon,
 MapIcon,
 BoltIcon,
} from "@heroicons/react/24/outline";
import { ServiceEntity } from "@/core/entities/service.entity";
import { AlertsTab } from "./tabs/AlertsTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { LogsTab } from "./tabs/LogsTab";
import { MapTab } from "./tabs/MapTab";
import { ActionsTab } from "./tabs/ActionsTab";

interface ServiceDetailTabsProps {
 service: ServiceEntity;
}

export function ServiceDetailTabs({ service }: ServiceDetailTabsProps) {
 const [activeTab, setActiveTab] = useState("alerts");

 const tabs = [
  { id: "alerts", label: "Alertas", icon: BellIcon },
  { id: "history", label: "Histórico", icon: ClockIcon },
  { id: "logs", label: "Logs", icon: CodeBracketIcon },
  { id: "map", label: "Mapa", icon: MapIcon },
  { id: "actions", label: "Ações", icon: BoltIcon },
 ];

 const renderTabContent = () => {
  switch (activeTab) {
   case "alerts":
    return <AlertsTab alerts={service.alerts || []} />;
   case "history":
    return <HistoryTab history={service.history || []} />;
   case "logs":
    return <LogsTab logs={service.logs || []} />;
   case "map":
    return <MapTab location={service.location} />;
   case "actions":
    return <ActionsTab />;
   default:
    return null;
  }
 };
 return (
  <div className="flex flex-col h-full">
   <div className="border-b border-border-primary">
    <nav className="-mb-px flex space-x-6 px-6" aria-label="Tabs">
     {tabs.map((tab) => (
      <button
       key={tab.id}
       onClick={() => setActiveTab(tab.id)}
       className={`${
        activeTab === tab.id
         ? "border-mottu-500 text-mottu-500"
         : "border-transparent text-text-secondary hover:text-text-primary hover:border-gray-300"
       } group inline-flex items-center py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
      >
       <tab.icon
        className={`${
         activeTab === tab.id
          ? "text-mottu-500"
          : "text-text-secondary group-hover:text-text-primary"
        } -ml-0.5 mr-2 h-5 w-5 transition-colors duration-200`}
       />
       <span>{tab.label}</span>
      </button>
     ))}
    </nav>
   </div>
   <div className="flex-1 overflow-y-auto p-6">{renderTabContent()}</div>
  </div>
 );
}
