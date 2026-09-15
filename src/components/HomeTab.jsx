import React, { useState } from "react";
import { Play, Plus, Clock, Sparkles, Gamepad2, Star, ChevronRight, Zap } from "lucide-react";

export default function HomeTab({
  roms,
  lastPlayedRom,
  onPlayRom,
  onSelectRom,
  onOpenAddTab
}) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const platformFilters = [
    { id: "ALL", label: "Todos" },
    { id: "PlayStation", label: "PS1" },
    { id: "SNES", label: "SNES" },
    { id: "GBA", label: "GBA" },
    { id: "NES", label: "NES" },
    { id: "Mega Drive", label: "Mega Drive" },
    { id: "Nintendo 64", label: "N64" }
  ];

  const featuredLastGame = lastPlayedRom || roms.find(r => r.id === "resident-evil-2-ps1") || roms[0];

  const filteredRoms = roms.filter(r => activeFilter === "ALL" || r.system === activeFilter);

  return (
    <div style={{ padding: "16px 20px 80px 20px" }}>
      {/* User Greeting */}
      <div style={{ marginBottom: "20px" }}>
        <h2 className="font-heading" style={{ fontSize: "1.35rem", fontWeight: 400, color: "var(--text-primary)" }}>
          Olá, jogador 👋
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "2px" }}>
          Sua biblioteca retrô pronta para jogar.
        </p>
      </div>

      {/* "Continue sua jornada" Hero Card */}
      {featuredLastGame && (
        <div style={{ marginBottom: "28px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px"
          }}>
            <h3 style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Continue sua jornada
            </h3>
            <span style={{ fontSize: "0.75rem", color: "var(--accent-amber)", display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 }}>
              <Clock size={13} /> Há 2 horas
            </span>
          </div>

          <div
            className="ui-card ui-card-hover"
            style={{
              padding: "16px",
              display: "flex",
              gap: "16px",
              position: "relative",
              overflow: "hidden",
              border: "1px solid var(--border-accent)",
              background: "linear-gradient(135deg, #181d27 0%, #1e2432 100%)"
            }}
          >
            {/* Game Cover */}
            <img
              src={featuredLastGame.cover}
              alt={featuredLastGame.title}
              style={{
                width: "90px",
                height: "115px",
                objectFit: "cover",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border-subtle)"
              }}
            />

            {/* Info and Continue Button */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="platform-badge" style={{ backgroundColor: "rgba(59, 130, 246, 0.15)", color: "var(--color-ps1)", border: "1px solid rgba(59, 130, 246, 0.3)", marginBottom: "6px" }}>
                  {featuredLastGame.system}
                </span>

                <h4 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
                  {featuredLastGame.title}
                </h4>

                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                  {featuredLastGame.translationStatus} • {featuredLastGame.group}
                </p>
              </div>

              <button
                className="btn-primary"
                style={{ padding: "8px 16px", fontSize: "0.85rem", alignSelf: "flex-start" }}
                onClick={() => onPlayRom(featuredLastGame)}
              >
                <Play size={15} fill="#17120d" />
                <span>Continuar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "Minha biblioteca" Section */}
      <div>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "14px"
        }}>
          <h3 className="font-heading" style={{ fontSize: "1.05rem", fontWeight: 400, color: "#ffffff" }}>
            Minha biblioteca
          </h3>
          <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            {filteredRoms.length} jogos
          </span>
        </div>

        {/* Horizontal Platform Filter Pills */}
        <div style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "12px",
          marginBottom: "16px",
          scrollbarWidth: "none"
        }}>
          {platformFilters.map((p) => {
            const isActive = activeFilter === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActiveFilter(p.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: isActive ? "var(--accent-amber)" : "var(--bg-surface)",
                  color: isActive ? "#17120d" : "var(--text-secondary)",
                  border: isActive ? "none" : "1px solid var(--border-subtle)",
                  fontSize: "0.8rem",
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.18s ease"
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        {/* Compact GameCards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "14px"
        }}>
          {filteredRoms.map((r) => (
            <div
              key={r.id}
              className="ui-card ui-card-hover"
              onClick={() => onSelectRom(r)}
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer"
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "var(--radius-xs)", overflow: "hidden", marginBottom: "8px" }}>
                <img src={r.cover} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span className="platform-badge" style={{ position: "absolute", top: "6px", left: "6px", backgroundColor: "rgba(0,0,0,0.75)", color: r.systemBadgeColor, fontSize: "0.65rem", padding: "2px 6px" }}>
                  {r.system}
                </span>
              </div>

              <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "#ffffff", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {r.title}
              </h4>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
                  {r.genre}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPlayRom(r);
                  }}
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(245, 158, 11, 0.15)",
                    border: "1px solid var(--accent-amber)",
                    color: "var(--accent-amber)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}
                >
                  <Play size={12} fill="var(--accent-amber)" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button (FAB): + Adicionar jogo */}
      <button
        onClick={onOpenAddTab}
        style={{
          position: "fixed",
          bottom: "82px",
          right: "20px",
          backgroundColor: "var(--accent-amber)",
          color: "#17120d",
          borderRadius: "var(--radius-full)",
          padding: "12px 20px",
          fontWeight: 700,
          fontSize: "0.9rem",
          border: "none",
          boxShadow: "0 6px 20px rgba(245, 158, 11, 0.4)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          zIndex: 150
        }}
      >
        <Plus size={18} strokeWidth={3} />
        <span>Adicionar jogo</span>
      </button>
    </div>
  );
}
