"use client";
import React, { useState, useRef, useEffect } from "react";
import {
 Bars3Icon,
 XMarkIcon,
 ChevronDownIcon,
} from "@heroicons/react/24/outline";
import DashboardMenu from "./dashboard_menu";
import Dashboard1_SaudeGeral from "./dashboard_overview_health";
import Dashboard2_Cluster from "./dashboard_cluster";

const DashboardContainer = () => {
 const [activeDashboard, setActiveDashboard] = useState("operacoes-criticas");
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
 const profileMenuRef = useRef<HTMLDivElement>(null);

 const handleDashboardChange = (dashboardId: string) => {
  setActiveDashboard(dashboardId);
  setIsMenuOpen(false);
 };

 // Fechar menu de perfil ao clicar fora
 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   if (
    profileMenuRef.current &&
    !profileMenuRef.current.contains(event.target as Node)
   ) {
    setIsProfileMenuOpen(false);
   }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

 const userData = {
  name: "Enzo Ferracini Patti",
  email: "enzo.ferracini@mottu.com.br",
  avatar:
   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
 };

 const handleLogout = () => {
  console.log("Deslogando...");
  setIsProfileMenuOpen(false);
  // Adicionar lógica de logout aqui
 };

 const handleLanguageChange = () => {
  console.log("Mudando idioma...");
  setIsProfileMenuOpen(false);
  // Adicionar lógica de mudança de idioma aqui
 };

 const renderDashboard = () => {
  switch (activeDashboard) {
   case "saude-geral":
    return (
     <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="text-center">
       <div className="text-gray-400 mb-4">
        <svg
         className="mx-auto h-16 w-16"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
        >
         <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
         />
        </svg>
       </div>
       <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Dashboard em Desenvolvimento
       </h3>
       <p className="text-gray-500">Saúde Geral será implementado em breve</p>
      </div>
     </div>
    );
   case "performance-regional":
    return <Dashboard2_Cluster />;
   case "operacoes-criticas":
    return <Dashboard1_SaudeGeral />;
   default:
    return <Dashboard1_SaudeGeral />;
  }
 };

 return (
  <div className="h-screen bg-gray-950 flex relative w-full">
   {/* Overlay */}
   {isMenuOpen && (
    <div
     className="fixed inset-0 bg-slate-950/50 bg-opacity-25 z-40"
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
    {/* Barra superior com botão de menu e perfil */}
    <div className="bg-zinc-900 border-b border-gray-200 px-4 py-2 md:py-3 flex items-center justify-between">
     {/* Botão menu à esquerda */}
     <div className="flex items-center">
      <button
       onClick={() => setIsMenuOpen(!isMenuOpen)}
       className="p-2 rounded-lg hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
       title={isMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
       {isMenuOpen ? (
        <XMarkIcon className="h-5 w-5 md:h-6 md:w-6 text-gray-300" />
       ) : (
        <Bars3Icon className="h-5 w-5 md:h-6 md:w-6 text-gray-300" />
       )}
      </button>
     </div>

     {/* Texto "mottu" no centro */}
     <div className="absolute left-1/2 transform -translate-x-1/2">
      <span className="text-gray-300 font-medium text-lg">
       Dashboard Operacional
      </span>
     </div>

     {/* Perfil com menu dropdown */}
     <div className="ml-auto relative" ref={profileMenuRef}>
      <button
       onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
       className="flex items-center space-x-2 p-1 rounded-lg hover:bg-zinc-800 transition-colors duration-200 cursor-pointer"
      >
       <img
        src={userData.avatar}
        alt="Avatar"
        className="w-8 h-8 rounded-full border-2 border-zinc-600"
       />
       <span className="text-gray-300 text-sm font-medium hidden sm:block">
        {userData.name}
       </span>
       <ChevronDownIcon
        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
         isProfileMenuOpen ? "rotate-180" : ""
        }`}
       />
      </button>

      {/* Menu dropdown do perfil */}
      {isProfileMenuOpen && (
       <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-800 border border-zinc-700 rounded-lg shadow-2xl shadow-black/50 backdrop-blur-sm z-50 overflow-hidden">
        {/* Header do menu */}
        <div className="p-4 border-b border-zinc-700 bg-zinc-900/50">
         <div className="flex items-center space-x-3">
          <img
           src={userData.avatar}
           alt="Avatar"
           className="w-10 h-10 rounded-full border-2 border-zinc-600"
          />
          <div className="flex-1 min-w-0">
           <p className="text-gray-100 font-medium truncate">{userData.name}</p>
           <p className="text-gray-400 text-sm truncate">{userData.email}</p>
          </div>
         </div>
        </div>

        {/* Opções do menu */}
        <div className="p-2">
         <button
          onClick={handleLanguageChange}
          className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 rounded-lg hover:bg-zinc-700 transition-colors duration-200 text-left"
         >
          <svg
           className="h-5 w-5"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
          >
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
           />
          </svg>
          <span>Mudar idioma</span>
         </button>

         <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors duration-200 text-left"
         >
          <svg
           className="h-5 w-5"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor"
          >
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
           />
          </svg>
          <span>Deslogar</span>
         </button>
        </div>
       </div>
      )}
     </div>
    </div>

    {/* Dashboard ativo */}
    <div className="flex-1 overflow-auto">{renderDashboard()}</div>
   </div>
  </div>
 );
};

export default DashboardContainer;
