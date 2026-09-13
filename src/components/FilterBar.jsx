import React from "react";
import { CONSOLES_LIST, GENRES_LIST } from "../data/roms";
import { Gamepad2, Filter, ArrowUpDown, CheckCircle2, Mic, Flame } from "lucide-react";
import { playSelectSound } from "../utils/audio";

export default function FilterBar({
  selectedConsole,
  setSelectedConsole,
  selectedGenre,
  setSelectedGenre,
  selectedTranslationType,
  setSelectedTranslationType,
  sortBy,
  setSortBy,
  totalResultsCount
}) {
  return (
    <div style={{
      marginBottom: "28px",
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    }}>
      
      {/* Console Filter Pills */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        overflowX: "auto",
        paddingBottom: "8px",
        scrollbarWidth: "none"
      }}>
        {CONSOLES_LIST.map((consoleItem) => {
          const isActive = selectedConsole === consoleItem.id;
          return (
            <button
              key={consoleItem.id}
              onClick={() => {
                playSelectSound();
                setSelectedConsole(consoleItem.id);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-full)",
                border: isActive
                  ? `1px solid ${consoleItem.color || "var(--accent-emerald)"}`
                  : "1px solid var(--border-color)",
                backgroundColor: isActive
                  ? consoleItem.color
                    ? `${consoleItem.color}25`
                    : "rgba(16, 185, 129, 0.2)"
                  : "rgba(255, 255, 255, 0.03)",
                color: isActive ? "#ffffff" : "var(--text-muted)",
                fontSize: "0.85rem",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                transition: "all 0.2s ease",
                boxShadow: isActive ? `0 0 15px ${consoleItem.color || "var(--accent-emerald)"}40` : "none"
              }}
            >
              <span style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: consoleItem.color || "var(--accent-emerald)"
              }} />
              <span>{consoleItem.name}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Controls Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
        padding: "14px 18px",
        backgroundColor: "rgba(18, 22, 31, 0.6)",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-color)"
      }}>
        
        {/* Left Side: Genre and Translation Dropdowns */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Filter size={15} color="var(--accent-emerald)" />
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Gênero:</span>
            <select
              value={selectedGenre}
              onChange={(e) => {
                playSelectSound();
                setSelectedGenre(e.target.value);
              }}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-color)",
                color: "#ffffff",
                borderRadius: "var(--radius-sm)",
                padding: "6px 12px",
                fontSize: "0.85rem",
                outline: "none",
                cursor: "pointer"
              }}
            >
              {GENRES_LIST.map((g) => (
                <option key={g} value={g} style={{ backgroundColor: "#12161f", color: "#ffffff" }}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Recurso:</span>
            <select
              value={selectedTranslationType}
              onChange={(e) => {
                playSelectSound();
                setSelectedTranslationType(e.target.value);
              }}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-color)",
                color: "#ffffff",
                borderRadius: "var(--radius-sm)",
                padding: "6px 12px",
                fontSize: "0.85rem",
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="ALL" style={{ backgroundColor: "#12161f" }}>Todos os Recursos</option>
              <option value="DUBLADO" style={{ backgroundColor: "#12161f" }}>Dublado em PT-BR 🎙️</option>
              <option value="ACCENTED" style={{ backgroundColor: "#12161f" }}>Com Acentuação PT-BR ✍️</option>
              <option value="FEATURED" style={{ backgroundColor: "#12161f" }}>Apenas Destaques ⭐</option>
            </select>
          </div>

        </div>

        {/* Right Side: Sorting & Total Count */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ArrowUpDown size={15} color="var(--accent-cyan)" />
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 600 }}>Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                playSelectSound();
                setSortBy(e.target.value);
              }}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-color)",
                color: "#ffffff",
                borderRadius: "var(--radius-sm)",
                padding: "6px 12px",
                fontSize: "0.85rem",
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="POPULAR" style={{ backgroundColor: "#12161f" }}>Mais Baixados</option>
              <option value="RATING" style={{ backgroundColor: "#12161f" }}>Melhor Avaliados</option>
              <option value="TITLE" style={{ backgroundColor: "#12161f" }}>Nome (A-Z)</option>
              <option value="YEAR" style={{ backgroundColor: "#12161f" }}>Ano de Lançamento</option>
            </select>
          </div>

          <div style={{
            fontSize: "0.85rem",
            color: "var(--accent-emerald)",
            fontWeight: 700,
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            padding: "4px 10px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid rgba(16, 185, 129, 0.3)"
          }}>
            {totalResultsCount} ROMs Encontradas
          </div>

        </div>

      </div>
    </div>
  );
}
