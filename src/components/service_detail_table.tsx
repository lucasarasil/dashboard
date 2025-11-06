"use client";
import React, { useState } from "react";
import TimelineTab from "./tabs/timeline_tab";
import AlertsTab from "./tabs/alerts_tab";
import ActionsTab from "./tabs/actions_tab";
import InteractiveMapTab from "./tabs/interactive_map_tab";
import {
 BellIcon,
 BoltIcon,
 ClockIcon,
 UserIcon,
} from "@heroicons/react/24/outline";

const ServiceDetailTabs = ({ service }) => {
 const [activeTab, setActiveTab] = useState("timeline");

 const tabs = [
  { key: "timeline", label: "Histórico", icon: ClockIcon },
  { key: "alerts", label: "Alertas", icon: BellIcon },
  { key: "actions", label: "Ações", icon: BoltIcon },
  { key: "map", label: "Atrelar Prestador", icon: UserIcon },
 ];

 return (
  <div className="h-full flex flex-col bg-zinc-900">
   {/* Tab Navigation */}
   <div className="border-b border-gray-200">
    <nav className="flex space-x-8 px-6" aria-label="Tabs">
     {tabs.map((tab) => (
      <button
       key={tab.key}
       onClick={() => setActiveTab(tab.key)}
       className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
        activeTab === tab.key ? "tab-active" : "tab-inactive"
       }`}
      >
       <div className="flex">
        <span className="mr-2">
         <tab.icon className="h-5 w-5" />
        </span>
        {tab.label}
       </div>
      </button>
     ))}
    </nav>
   </div>

   {/* Tab Content */}
   <div className="flex-1 overflow-hidden">
    {activeTab === "timeline" && <TimelineTab service={service} />}
    {activeTab === "alerts" && <AlertsTab service={service} />}
    {activeTab === "actions" && <ActionsTab service={service} />}
    {activeTab === "map" && <InteractiveMapTab service={service} />}
   </div>
  </div>
 );
};

export default ServiceDetailTabs;
