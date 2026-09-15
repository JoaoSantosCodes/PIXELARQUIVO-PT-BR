import React, { useState, useMemo } from "react";
import { Search, Filter, Play, Clock, Sparkles } from "lucide-react";

export default function LibraryTab({ roms, onSelectRom, onPlayRom }) {
  const [activeConsole, setActiveConsole] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const consoles = [
    { id: "ALL", name: "Todos" },
    { id: "PlayStation", name: "PS1" },
    { id: "SNES", name: "SNES" },
    { id: "GBA", name: "GBA" },
    { id: "NES", name: "NES" },
    { id: "Mega Drive", name: "Mega Drive" },
    { id: "Nintendo 64", name: "N64" }
  ];

  const filteredRoms = useMemo(() => {
    return roms.filter(r => {
      if (activeConsole !== "ALL" && r.system !== activeConsole) return false;
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        return r.title.toLowerCase().includes(query) || r.originalTitle.toLowerCase().includes(query) || r.group.toLowerCase().includes(query);
      }
      return true;
    });
  }, [roms, activeConsole, searchTerm]);

  return (
    <div style={{ padding: "20px 20px 80px 20px" }}>
      {/* Title */}
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>
          Biblioteca de Jogos
        </h2>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
          {filteredRoms.length} jogos organizados por plataforma.
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ position: "relative", marginBottom: "16px" }}>
        <Search size={18} color="var(--text-muted)" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
        <input
          type="text"
          placeholder="Buscar jogo, título original ou tradutor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px 10px 42px",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            color: "#ffffff",
            fontSize: "0.88rem",
            outline: "none"
          }}
        />
      </div>

      {/* Platform Pills */}
      <div style={{
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        paddingBottom: "10px",
        marginBottom: "20px",
        scrollbarWidth: "none"
      }}>
        {consoles.map(c => {
          const isActive = activeConsole === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setActiveConsole(c.id)}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--radius-full)",
                backgroundColor: isActive ? "var(--accent-amber)" : "var(--bg-surface)",
                color: isActive ? "#0d0e12" : "var(--text-secondary)",
                border: isActive ? "none" : "1px solid var(--border-subtle)",
                fontSize: "0.8rem",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap"
              }}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Game Cards List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {filteredRoms.map(r => (
          <div
            key={r.id}
            className="ui-card ui-card-hover"
            onClick={() => onSelectRom(r)}
            style={{
              padding: "12px",
              display: "flex",
              gap: "14px",
              alignItems: "center",
              cursor: "pointer"
            }}
          >
            <img
              src={r.cover}
              alt={r.title}
              style={{
                width: "60px",
                height: "75px",
                objectFit: "cover",
                borderRadius: "var(--radius-xs)"
              }}
            />

            <div style={{ flex: 1, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                <span className="platform-badge" style={{ backgroundColor: "rgba(255,255,255,0.08)", color: r.systemBadgeColor, fontSize: "0.65rem", padding: "1px 6px" }}>
                  {r.system}
                </span>
                <span style={{ fontSize: "0.72rem", color: "var(--state-success)", fontWeight: 600 }}>
                  {r.translationStatus}
                </span>
              </div>

              <h4 style={{ fontSize: "0.98rem", fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {r.title}
              </h4>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                {r.group} • {r.year}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayRom(r);
              }}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-amber)",
                border: "none",
                color: "#0d0e12",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)"
              }}
            >
              <Play size={16} fill="#0d0e12" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
