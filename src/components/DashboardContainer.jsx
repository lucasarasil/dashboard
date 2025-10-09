import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import DashboardMenu from './DashboardMenu';
import Dashboard1_SaudeGeral from './Dashboard1_SaudeGeral';
import Dashboard2_Cluster from './Dashboard2_Cluster';

const DashboardContainer = () => {
  const [activeDashboard, setActiveDashboard] = useState('operacoes-criticas');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDashboardChange = (dashboardId) => {
    setActiveDashboard(dashboardId);
    // Fechar menu após seleção
    setIsMenuOpen(false);
  };

  const renderDashboard = () => {
    switch (activeDashboard) {
      case 'saude-geral':
        return (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dashboard em Desenvolvimento
              </h3>
              <p className="text-gray-500">
                Saúde Geral será implementado em breve
              </p>
            </div>
          </div>
        );
      case 'performance-regional':
        return <Dashboard2_Cluster />;
      case 'operacoes-criticas':
        return <Dashboard1_SaudeGeral />;
      default:
        return <Dashboard1_SaudeGeral />;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex relative">
      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Menu lateral */}
      <DashboardMenu 
        activeDashboard={activeDashboard}
        onDashboardChange={handleDashboardChange}
        isOpen={isMenuOpen}
      />
      
      {/* Conteúdo principal */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Barra superior com botão de menu */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            title={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-700" />
            )}
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard Operacional</h1>
          <div className="w-10"></div> {/* Spacer para centralizar o título */}
        </div>

        {/* Dashboard ativo */}
        <div className="flex-1 overflow-hidden">
          {renderDashboard()}
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
