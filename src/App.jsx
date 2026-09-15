import React, { useState, useEffect } from "react";
import { INITIAL_ROMS } from "./data/roms";
import AppHeader from "./components/AppHeader";
import BottomNavigation from "./components/BottomNavigation";
import HomeTab from "./components/HomeTab";
import LibraryTab from "./components/LibraryTab";
import AddGameTab from "./components/AddGameTab";
import SettingsTab from "./components/SettingsTab";
import GameDetailsModal from "./components/GameDetailsModal";
import EmulatorModal from "./components/EmulatorModal";

export default function App() {
  const [roms] = useState(INITIAL_ROMS);
  const [activeTab, setActiveTab] = useState("home");

  // App State
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRom, setSelectedRom] = useState(null);
  const [activeEmulatorRom, setActiveEmulatorRom] = useState(null);
  const [customLocalFile, setCustomLocalFile] = useState(null);
  const [lastPlayedRom, setLastPlayedRom] = useState(null);

  // Global Escape Key Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedRom(null);
        setActiveEmulatorRom(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handlePlayRom = (rom) => {
    setCustomLocalFile(null);
    setLastPlayedRom(rom);
    setActiveEmulatorRom(rom);
  };

  const handlePlayLocalFile = (file, core, system) => {
    setCustomLocalFile(file);
    const mockRom = {
      id: "custom-file",
      title: file.name,
      originalTitle: file.name,
      system: system || "PlayStation 1",
      systemBadgeColor: "#3b82f6",
      cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
      genre: "ROM Importada",
      year: "2026",
      group: "Arquivo Local",
      translationStatus: "ROM do Usuário",
      romFormat: file.name.split('.').pop().toUpperCase(),
      emulatorType: core || "psx"
    };
    setActiveEmulatorRom(mockRom);
  };

  return (
    <div style={{ backgroundColor: "var(--bg-app)", minHeight: "100vh" }}>
      {/* Mobile Frame Viewport */}
      <div className="app-viewport">
        {/* Top Header */}
        <AppHeader
          searchActive={searchActive}
          setSearchActive={setSearchActive}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onOpenSettings={() => setActiveTab("settings")}
        />

        {/* Tab 1: Home */}
        {activeTab === "home" && (
          <HomeTab
            roms={roms}
            lastPlayedRom={lastPlayedRom}
            onPlayRom={handlePlayRom}
            onSelectRom={(rom) => setSelectedRom(rom)}
            onOpenAddTab={() => setActiveTab("add")}
          />
        )}

        {/* Tab 2: Library */}
        {activeTab === "library" && (
          <LibraryTab
            roms={roms}
            onSelectRom={(rom) => setSelectedRom(rom)}
            onPlayRom={handlePlayRom}
          />
        )}

        {/* Tab 3: Add Game (Import Experience) */}
        {activeTab === "add" && (
          <AddGameTab
            onPlayLocalFile={handlePlayLocalFile}
          />
        )}

        {/* Tab 4: Settings */}
        {activeTab === "settings" && (
          <SettingsTab />
        )}

        {/* Fixed Bottom Navigation Bar */}
        <BottomNavigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Game Details Modal */}
        {selectedRom && (
          <GameDetailsModal
            rom={selectedRom}
            onClose={() => setSelectedRom(null)}
            onPlayRom={handlePlayRom}
          />
        )}

        {/* Emulator View Modal */}
        {activeEmulatorRom && (
          <EmulatorModal
            rom={activeEmulatorRom}
            localFile={customLocalFile}
            onClose={() => setActiveEmulatorRom(null)}
          />
        )}
      </div>
    </div>
  );
}
