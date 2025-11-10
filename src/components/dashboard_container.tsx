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
import ThemeToggle from "./theme_toggle";
import Image from "next/image";

const DashboardContainer: React.FC = () => {
 const [activeDashboard, setActiveDashboard] = useState("operacoes-criticas");
 const [isMenuOpen, setIsMenuOpen] = useState(false);
 const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
 const profileMenuRef = useRef<HTMLDivElement>(null);

 const handleDashboardChange = (dashboardId: string) => {
  setActiveDashboard(dashboardId);
  setIsMenuOpen(false);
 };

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
   "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
 };

 const handleLogout = () => {
  console.log("Deslogando...");
  setIsProfileMenuOpen(false);
 };

 const handleLanguageChange = () => {
  console.log("Mudando idioma...");
  setIsProfileMenuOpen(false);
 };

 const renderDashboard = () => {
  switch (activeDashboard) {
   case "saude-geral":
    return (
     <div className="flex-1 flex items-center justify-center bg-dark-primary light:bg-light-primary">
      <div className="text-center">
       <div className="text-text-muted mb-4">
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
       <h3 className="text-xl font-semibold text-text-primary mb-2">
        Dashboard em Desenvolvimento
       </h3>
       <p className="text-text-secondary">
        Saúde Geral será implementado em breve
       </p>
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
  <div className="h-screen bg-dark-primary light:bg-light-primary flex relative w-full">
   {/* Overlay */}
   {isMenuOpen && (
    <div
     className="fixed inset-0 bg-black/60 light:bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
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
    {/* Barra superior */}
    <div className="bg-dark-secondary light:bg-light-secondary border-b border-border-primary light:border-border-primary-light px-4 py-3 flex items-center justify-between shadow-lg light:shadow-light relative">
     {/* Botão menu */}
     <div className="flex items-center gap-3">
      <button
       onClick={() => setIsMenuOpen(!isMenuOpen)}
       className="p-2 rounded-lg hover:bg-dark-tertiary light:hover:bg-light-tertiary transition-all duration-200 group"
       title={isMenuOpen ? "Fechar menu" : "Abrir menu"}
       aria-label={isMenuOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
      >
       {isMenuOpen ? (
        <XMarkIcon className="h-6 w-6 text-text-secondary group-hover:text-mottu-500" />
       ) : (
        <Bars3Icon className="h-6 w-6 text-text-secondary group-hover:text-mottu-500" />
       )}
      </button>
     </div>

     {/* Logo/Título no centro */}
     <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none select-none">
      <div className="w-2 h-2 bg-mottu-500 rounded-full animate-pulse-green" />
      <span className="text-text-primary font-bold text-lg tracking-wide">
       Dashboard Operacional
      </span>
     </div>

     {/* Theme Toggle + Perfil */}
     <div className="ml-auto flex items-center gap-3">
      <ThemeToggle />
      <div className="relative" ref={profileMenuRef}>
       <button
        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark-tertiary light:hover:bg-light-tertiary transition-all duration-200 group"
        aria-haspopup="true"
        aria-expanded={isProfileMenuOpen}
        aria-label="Abrir menu de perfil"
       >
        <Image
         src={userData.avatar}
         alt="Avatar do usuário"
         width={36}
         height={36}
         className="rounded-full border-2 border-border-primary light:border-border-primary-light group-hover:border-mottu-500 transition-all duration-200"
         priority
        />
        <span className="text-text-primary text-sm font-medium hidden sm:block">
         {userData.name}
        </span>
        <ChevronDownIcon
         className={`h-4 w-4 text-text-secondary group-hover:text-mottu-500 transition-all duration-200 ${
          isProfileMenuOpen ? "rotate-180" : ""
         }`}
        />
       </button>
       {isProfileMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-dark-secondary light:bg-light-secondary border border-border-primary light:border-border-primary-light rounded-xl shadow-2xl light:shadow-light z-50 overflow-hidden animate-slide-up">
         <div className="p-4 border-b border-border-primary light:border-border-primary-light bg-dark-primary/50 light:bg-light-primary/50">
          <div className="flex items-center gap-3">
           <Image
            src={userData.avatar}
            alt="Avatar do usuário"
            width={48}
            height={48}
            className="rounded-full border-2 border-mottu-500"
            priority={false}
           />
           <div className="flex-1 min-w-0">
            <p className="text-text-primary font-semibold truncate">
             {userData.name}
            </p>
            <p className="text-text-secondary text-sm truncate">
             {userData.email}
            </p>
           </div>
          </div>
         </div>
         <div className="p-2">
          <button
           onClick={handleLanguageChange}
           className="w-full flex items-center gap-3 px-3 py-2.5 text-text-primary rounded-lg hover:bg-dark-tertiary light:hover:bg-light-tertiary transition-all duration-200 text-left group"
           aria-label="Mudar idioma"
          >
           <svg
            className="h-5 w-5 text-text-secondary group-hover:text-mottu-500"
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
           className="w-full flex items-center gap-3 px-3 py-2.5 text-red-500 light:text-red-600 rounded-lg hover:bg-red-500/10 light:hover:bg-red-500/10 transition-all duration-200 text-left group"
           aria-label="Deslogar"
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
    </div>

    {/* Dashboard ativo */}
    <div className="flex-1 overflow-auto bg-dark-primary light:bg-light-primary">
     {renderDashboard()}
    </div>
   </div>
  </div>
 );
};

export default DashboardContainer;
