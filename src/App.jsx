import React, { useState, useEffect, useMemo } from "react";
import { INITIAL_ROMS } from "./data/roms";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import FilterBar from "./components/FilterBar";
import RomGrid from "./components/RomGrid";
import RomDetailModal from "./components/RomDetailModal";
import EmulatorModal from "./components/EmulatorModal";
import FavoritesDrawer from "./components/FavoritesDrawer";
import SubmitRomModal from "./components/SubmitRomModal";
import Footer from "./components/Footer";

export default function App() {
  const [roms] = useState(INITIAL_ROMS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConsole, setSelectedConsole] = useState("ALL");
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [selectedTranslationType, setSelectedTranslationType] = useState("ALL");
  const [sortBy, setSortBy] = useState("POPULAR");

  // LocalStorage Persisted Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem("pixelarquivo_favorites");
      return saved ? JSON.parse(saved) : ["chrono-trigger-snes", "castlevania-sotn-ps1"];
    } catch {
      return ["chrono-trigger-snes", "castlevania-sotn-ps1"];
    }
  });

  // UI Modals & Effects State
  const [crtEnabled, setCrtEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedRom, setSelectedRom] = useState(null);
  const [activeEmulatorRom, setActiveEmulatorRom] = useState(null);
  const [isFavoritesDrawerOpen, setIsFavoritesDrawerOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("pixelarquivo_favorites", JSON.stringify(favorites));
    } catch (e) {
      console.warn("Could not save favorites to localStorage", e);
    }
  }, [favorites]);

  const handleToggleFavorite = (romId) => {
    setFavorites((prev) =>
      prev.includes(romId) ? prev.filter((id) => id !== romId) : [...prev, romId]
    );
  };

  const handleClearFavorites = () => {
    setFavorites([]);
  };

  // Filter & Sort Logic
  const filteredRoms = useMemo(() => {
    return roms.filter((rom) => {
      // Console Filter
      if (selectedConsole !== "ALL" && rom.system !== selectedConsole) {
        return false;
      }
      // Genre Filter
      if (selectedGenre !== "Todos" && rom.genre !== selectedGenre) {
        return false;
      }
      // Resource Filter
      if (selectedTranslationType === "DUBLADO" && !rom.isDubbed) {
        return false;
      }
      if (selectedTranslationType === "ACCENTED" && !rom.accented) {
        return false;
      }
      if (selectedTranslationType === "FEATURED" && !rom.featured) {
        return false;
      }
      // Search Term Filter
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesTitle = rom.title.toLowerCase().includes(query);
        const matchesOriginal = rom.originalTitle.toLowerCase().includes(query);
        const matchesGroup = rom.group.toLowerCase().includes(query);
        const matchesSystem = rom.system.toLowerCase().includes(query);
        return matchesTitle || matchesOriginal || matchesGroup || matchesSystem;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "POPULAR") return b.downloads - a.downloads;
      if (sortBy === "RATING") return b.rating - a.rating;
      if (sortBy === "TITLE") return a.title.localeCompare(b.title);
      if (sortBy === "YEAR") return parseInt(b.year) - parseInt(a.year);
      return 0;
    });
  }, [roms, selectedConsole, selectedGenre, selectedTranslationType, searchTerm, sortBy]);

  const featuredRoms = useMemo(() => roms.filter((r) => r.featured), [roms]);

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedConsole("ALL");
    setSelectedGenre("Todos");
    setSelectedTranslationType("ALL");
    setSortBy("POPULAR");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Optional Retro CRT Scanlines Overlay */}
      {crtEnabled && <div className="crt-overlay" />}

      {/* Top Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesDrawerOpen(true)}
        crtEnabled={crtEnabled}
        setCrtEnabled={setCrtEnabled}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{ maxWidth: "1400px", width: "100%", margin: "0 auto", padding: "0 24px", flex: 1 }}>
        
        {/* Featured Hero Banner */}
        <HeroBanner
          featuredRoms={featuredRoms}
          onSelectRom={(rom) => setSelectedRom(rom)}
          onPlayRom={(rom) => setActiveEmulatorRom(rom)}
        />

        {/* Console & Filter Controls Bar */}
        <FilterBar
          selectedConsole={selectedConsole}
          setSelectedConsole={setSelectedConsole}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedTranslationType={selectedTranslationType}
          setSelectedTranslationType={setSelectedTranslationType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          totalResultsCount={filteredRoms.length}
        />

        {/* ROMs Cards Grid */}
        <RomGrid
          roms={filteredRoms}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectRom={(rom) => setSelectedRom(rom)}
          onPlayRom={(rom) => setActiveEmulatorRom(rom)}
          onResetFilters={handleResetFilters}
        />

      </main>

      {/* Footer */}
      <Footer totalRomsCount={roms.length} />

      {/* Modals & Drawers */}
      {selectedRom && (
        <RomDetailModal
          rom={selectedRom}
          onClose={() => setSelectedRom(null)}
          onPlayRom={(rom) => setActiveEmulatorRom(rom)}
          isFavorite={favorites.includes(selectedRom.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {activeEmulatorRom && (
        <EmulatorModal
          rom={activeEmulatorRom}
          onClose={() => setActiveEmulatorRom(null)}
        />
      )}

      <FavoritesDrawer
        isOpen={isFavoritesDrawerOpen}
        onClose={() => setIsFavoritesDrawerOpen(false)}
        favorites={favorites}
        roms={roms}
        onRemoveFavorite={handleToggleFavorite}
        onClearFavorites={handleClearFavorites}
        onPlayRom={(rom) => setActiveEmulatorRom(rom)}
        onSelectRom={(rom) => setSelectedRom(rom)}
      />

      <SubmitRomModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
      />
    </div>
  );
}
