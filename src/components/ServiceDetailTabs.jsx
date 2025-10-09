import React, { useState } from 'react';
import TimelineTab from './tabs/TimelineTab';
import AlertsTab from './tabs/AlertsTab';
import ActionsTab from './tabs/ActionsTab';
import InteractiveMapTab from './tabs/InteractiveMapTab';

const ServiceDetailTabs = ({ service }) => {
  const [activeTab, setActiveTab] = useState('timeline');

  const tabs = [
    { key: 'timeline', label: 'Histórico', icon: '📋' },
    { key: 'alerts', label: 'Alertas', icon: '⚠️' },
    { key: 'actions', label: 'Ações', icon: '🎯' },
    { key: 'map', label: 'Atrelar Prestador', icon: '🗺️' }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === tab.key
                  ? 'tab-active'
                  : 'tab-inactive'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'timeline' && <TimelineTab service={service} />}
        {activeTab === 'alerts' && <AlertsTab service={service} />}
        {activeTab === 'actions' && <ActionsTab service={service} />}
        {activeTab === 'map' && <InteractiveMapTab service={service} />}
      </div>
    </div>
  );
};

export default ServiceDetailTabs;
