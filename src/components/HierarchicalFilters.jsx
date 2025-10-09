import React, { useState } from 'react';
import { 
  ChevronDownIcon, 
  MagnifyingGlassIcon,
  FunnelIcon 
} from '@heroicons/react/24/outline';

const HierarchicalFilters = ({ 
  onSupervisorChange, 
  onLeaderChange, 
  onStatusChange, 
  onSearch,
  services,
  selectedSupervisor,
  selectedLeader
}) => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data para supervisores e líderes baseados em filiais
  const supervisors = [
    { 
      id: 'sup1', 
      name: 'João Silva', 
      branches: ['Jandira', 'Curitiba', 'Jacarepaguá'],
      leaders: [
        { id: 'led1', name: 'Maria Santos', branch: 'Jandira' },
        { id: 'led2', name: 'Pedro Costa', branch: 'Curitiba' }
      ]
    },
    { 
      id: 'sup2', 
      name: 'Ana Lima', 
      branches: ['Ponta Grossa', 'Santos', 'Limão-Zona N'],
      leaders: [
        { id: 'led3', name: 'Carlos Oliveira', branch: 'Ponta Grossa' },
        { id: 'led4', name: 'Lucia Ferreira', branch: 'Santos' }
      ]
    },
    { 
      id: 'sup3', 
      name: 'Roberto Alves', 
      branches: ['Feira de Santa', 'Itajai', 'Goiânia'],
      leaders: [
        { id: 'led5', name: 'Fernanda Souza', branch: 'Feira de Santa' },
        { id: 'led6', name: 'Marcos Pereira', branch: 'Itajai' }
      ]
    }
  ];

  const statusOptions = [
    { key: 'all', label: 'Todos', count: services.length },
    { key: 'open', label: 'Aberto', count: services.filter(s => s.status === 'open').length },
    { key: 'in_progress', label: 'Em andamento', count: services.filter(s => s.status === 'in_progress').length },
    { key: 'critical', label: 'Crítico', count: services.filter(s => s.status === 'critical').length },
    { key: 'not_assigned', label: 'Não encaminhado', count: services.filter(s => !s.driver).length },
    { key: 'not_accepted', label: 'Não aceito', count: services.filter(s => s.needsReview).length },
    { key: 'completed_today', label: 'Finalizado hoje', count: services.filter(s => s.status === 'completed').length }
  ];

  const selectedSupervisorData = supervisors.find(s => s.id === selectedSupervisor);

  const handleSupervisorChange = (supervisorId) => {
    onSupervisorChange(supervisorId);
  };

  const handleLeaderChange = (leaderId) => {
    onLeaderChange(leaderId);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    onStatusChange(status);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center space-x-4">
      <FunnelIcon className="h-5 w-5 text-gray-400" />
      
      {/* Dropdown Supervisor */}
      <div className="relative">
        <select
          value={selectedSupervisor}
          onChange={(e) => handleSupervisorChange(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="">Supervisor</option>
          {supervisors.map(supervisor => (
            <option key={supervisor.id} value={supervisor.id}>
              {supervisor.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>

      {/* Dropdown Líder (dependente do supervisor) */}
      <div className="relative">
        <select
          value={selectedLeader}
          onChange={(e) => handleLeaderChange(e.target.value)}
          disabled={!selectedSupervisor}
          className={`appearance-none border rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
            !selectedSupervisor 
              ? 'bg-gray-100 border-gray-200 text-gray-400' 
              : 'bg-white border-gray-300'
          }`}
        >
          <option value="">Líder</option>
          {selectedSupervisorData?.leaders.map(leader => (
            <option key={leader.id} value={leader.id}>
              {leader.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
      </div>

      {/* Status */}
      <div className="flex space-x-1">
        {statusOptions.map(status => (
          <button
            key={status.key}
            onClick={() => handleStatusChange(status.key)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              selectedStatus === status.key
                ? 'bg-primary-100 text-primary-700 border border-primary-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status.label}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
              selectedStatus === status.key
                ? 'bg-primary-200 text-primary-800'
                : 'bg-gray-200 text-gray-600'
            }`}>
              {status.count}
            </span>
          </button>
        ))}
      </div>

      {/* Busca */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </form>
    </div>
  );
};

export default HierarchicalFilters;
