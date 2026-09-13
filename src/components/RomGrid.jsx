import React from "react";
import RomCard from "./RomCard";
import { SearchX, RefreshCw } from "lucide-react";

export default function RomGrid({ roms, favorites, onToggleFavorite, onSelectRom, onPlayRom, onResetFilters }) {
  if (roms.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "60px 20px",
        backgroundColor: "rgba(18, 22, 31, 0.5)",
        borderRadius: "var(--radius-lg)",
        border: "1px dashed var(--border-color)",
        margin: "20px 0"
      }}>
        <div style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          color: "var(--accent-red)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px auto"
        }}>
          <SearchX size={30} />
        </div>
        <h3 style={{ fontSize: "1.3rem", color: "#ffffff", fontWeight: 700, marginBottom: "8px" }}>
          Nenhuma ROM Encontrada
        </h3>
        <p style={{ color: "var(--text-muted)", maxWidth: "420px", margin: "0 auto 20px auto", fontSize: "0.95rem" }}>
          Não encontramos jogos com os termos ou filtros selecionados. Tente alterar o console ou limpar a busca.
        </p>
        <button
          className="btn-retro-secondary"
          onClick={onResetFilters}
          style={{ margin: "0 auto" }}
        >
          <RefreshCw size={15} />
          Limpar Filtros e Busca
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "24px",
      margin: "20px 0 40px 0"
    }}>
      {roms.map((rom) => (
        <RomCard
          key={rom.id}
          rom={rom}
          isFavorite={favorites.includes(rom.id)}
          onToggleFavorite={onToggleFavorite}
          onSelectRom={onSelectRom}
          onPlayRom={onPlayRom}
        />
      ))}
    </div>
  );
}
