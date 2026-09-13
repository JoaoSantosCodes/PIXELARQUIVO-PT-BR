import React from "react";
import { Gamepad2, Search, Heart, Volume2, VolumeX, Tv, PlusCircle, Sparkles } from "lucide-react";
import { playSelectSound } from "../utils/audio";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  favoritesCount,
  onOpenFavorites,
  crtEnabled,
  setCrtEnabled,
  soundEnabled,
  setSoundEnabled,
  onOpenSubmitModal
}) {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      backgroundColor: "rgba(10, 12, 16, 0.85)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderBottom: "1px solid var(--border-color)",
      padding: "12px 24px"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        
        {/* Brand Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <div style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}>
            <Gamepad2 size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="font-pixel" style={{ fontSize: "1.1rem", color: "#ffffff", letterSpacing: "-0.5px" }}>
                PIXEL<span style={{ color: "var(--accent-emerald)" }}>ARQUIVO</span>
              </span>
              <span className="badge-ptbr" style={{ fontSize: "0.6rem", padding: "1px 5px" }}>PT-BR</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0, fontWeight: 500 }}>
              Catálogo Brasileiro de ROMs Retro
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div style={{
          flex: "1",
          maxWidth: "480px",
          position: "relative",
          minWidth: "260px"
        }}>
          <Search size={18} color="var(--text-muted)" style={{
            position: "absolute",
            left: "14px",
            top: "50%",
            transform: "translateY(-50%)"
          }} />
          <input
            type="text"
            placeholder="Buscar por nome do jogo, console, grupo de tradução..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 16px 10px 42px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid var(--border-color)",
              borderRadius: "var(--radius-full)",
              color: "#ffffff",
              fontSize: "0.9rem",
              outline: "none",
              transition: "all 0.2s ease"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent-emerald)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                fontSize: "0.8rem"
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          
          {/* CRT Effect Toggle */}
          <button
            title={crtEnabled ? "Desativar Efeito CRT" : "Ativar Efeito CRT (TV Antiga)"}
            onClick={() => {
              playSelectSound();
              setCrtEnabled(!crtEnabled);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)",
              backgroundColor: crtEnabled ? "rgba(16, 185, 129, 0.15)" : "rgba(255, 255, 255, 0.05)",
              color: crtEnabled ? "var(--accent-emerald)" : "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.85rem",
              fontWeight: 500,
              transition: "all 0.2s ease"
            }}
          >
            <Tv size={16} />
            <span style={{ display: "none", "@media (min-width: 768px)": { display: "inline" } }}>
              CRT {crtEnabled ? "ON" : "OFF"}
            </span>
          </button>

          {/* Sound FX Toggle */}
          <button
            title={soundEnabled ? "Som 8-Bit Ativo" : "Som Mutado"}
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playSelectSound();
            }}
            style={{
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)",
              backgroundColor: soundEnabled ? "rgba(6, 182, 212, 0.15)" : "rgba(255, 255, 255, 0.05)",
              color: soundEnabled ? "var(--accent-cyan)" : "var(--text-muted)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.85rem",
              fontWeight: 500
            }}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Favorites Drawer Toggle */}
          <button
            onClick={() => {
              playSelectSound();
              onOpenFavorites();
            }}
            style={{
              padding: "8px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid rgba(236, 72, 153, 0.3)",
              backgroundColor: "rgba(236, 72, 153, 0.1)",
              color: "#f472b6",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.85rem",
              fontWeight: 600
            }}
          >
            <Heart size={16} fill={favoritesCount > 0 ? "#f472b6" : "none"} />
            <span>Favoritos</span>
            {favoritesCount > 0 && (
              <span style={{
                backgroundColor: "#ec4899",
                color: "#ffffff",
                borderRadius: "var(--radius-full)",
                padding: "1px 7px",
                fontSize: "0.75rem",
                fontWeight: 700
              }}>
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Submit ROM Button */}
          <button
            className="btn-retro-primary"
            onClick={() => {
              playSelectSound();
              onOpenSubmitModal();
            }}
            style={{ padding: "8px 16px", fontSize: "0.85rem" }}
          >
            <PlusCircle size={16} />
            <span>Enviar ROM</span>
          </button>

        </div>
      </div>
    </header>
  );
}
