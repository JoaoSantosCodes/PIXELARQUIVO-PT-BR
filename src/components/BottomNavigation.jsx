import React from "react";
import { Home, Gamepad2, PlusCircle, Settings } from "lucide-react";

export default function BottomNavigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: "home", label: "Início", icon: Home },
    { id: "library", label: "Biblioteca", icon: Gamepad2 },
    { id: "add", label: "Adicionar", icon: PlusCircle },
    { id: "settings", label: "Configuração", icon: Settings }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`nav-item ${isActive ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            {isActive && <div className="bottom-nav-indicator" />}
            <IconComponent size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
