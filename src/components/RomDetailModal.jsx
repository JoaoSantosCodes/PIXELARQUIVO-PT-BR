import React from "react";
import { X, Play, Download, Star, ShieldCheck, Gamepad2, FileText, CheckCircle2, Mic, Info } from "lucide-react";
import { playStartSound, playCoinSound } from "../utils/audio";

export default function RomDetailModal({ rom, onClose, onPlayRom, isFavorite, onToggleFavorite }) {
  if (!rom) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "840px",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "rgba(14, 18, 26, 0.95)",
          border: "1px solid rgba(16, 185, 129, 0.3)",
          borderRadius: "var(--radius-lg)",
          padding: "28px",
          position: "relative"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "none",
            color: "#ffffff",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Main Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px"
        }}>
          
          {/* Left Column: Cover Art and Quick Stats */}
          <div>
            <div style={{
              width: "100%",
              height: "340px",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              marginBottom: "16px",
              position: "relative",
              border: "1px solid var(--border-color)"
            }}>
              <img
                src={rom.cover}
                alt={rom.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <span className="badge-ptbr" style={{ position: "absolute", top: "12px", left: "12px" }}>
                {rom.translationStatus}
              </span>
              <div style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                backgroundColor: "rgba(0,0,0,0.85)",
                color: rom.systemBadgeColor,
                fontWeight: 800,
                fontSize: "0.75rem",
                padding: "4px 10px",
                borderRadius: "var(--radius-sm)",
                border: `1px solid ${rom.systemBadgeColor}`
              }}>
                {rom.system}
              </div>
            </div>

            {/* Play Online & Favorite Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                className="btn-retro-primary"
                style={{ width: "100%", justifyContent: "center", padding: "12px" }}
                onClick={() => {
                  onClose();
                  playStartSound();
                  onPlayRom(rom);
                }}
              >
                <Play size={18} fill="#ffffff" />
                <span>Jogar Agora no Emulador Web</span>
              </button>

              <button
                className="btn-retro-secondary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  borderColor: isFavorite ? "#ec4899" : "var(--border-color)",
                  color: isFavorite ? "#f472b6" : "var(--text-main)"
                }}
                onClick={() => {
                  playCoinSound();
                  onToggleFavorite(rom.id);
                }}
              >
                {isFavorite ? "❤️ Em Seus Favoritos" : "🤍 Adicionar aos Favoritos"}
              </button>
            </div>
          </div>

          {/* Right Column: Information & Download Options */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--accent-emerald)", fontWeight: 700 }}>
                {rom.genre}
              </span>
              <span style={{ color: "var(--text-muted)" }}>•</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                Lançamento: {rom.year}
              </span>
            </div>

            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#ffffff", marginBottom: "6px" }}>
              {rom.title}
            </h2>

            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", marginBottom: "16px" }}>
              Título Original: <i>{rom.originalTitle}</i>
            </p>

            {/* Summary */}
            <p style={{
              fontSize: "0.95rem",
              color: "var(--text-main)",
              lineHeight: 1.6,
              marginBottom: "20px",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              padding: "14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)"
            }}>
              {rom.description || rom.summary}
            </p>

            {/* Technical Specifications Table */}
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Info size={16} color="var(--accent-cyan)" /> Ficha Técnica do Patch
              </h4>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                fontSize: "0.85rem"
              }}>
                <div style={{ backgroundColor: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ color: "var(--text-muted)" }}>Grupo Tradutor:</span><br />
                  <strong style={{ color: "var(--accent-emerald)" }}>{rom.group}</strong>
                </div>

                <div style={{ backgroundColor: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ color: "var(--text-muted)" }}>Versão do Patch:</span><br />
                  <strong style={{ color: "#ffffff" }}>{rom.patchVersion}</strong>
                </div>

                <div style={{ backgroundColor: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ color: "var(--text-muted)" }}>Tamanho da ROM:</span><br />
                  <strong style={{ color: "#ffffff" }}>{rom.fileSize}</strong>
                </div>

                <div style={{ backgroundColor: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "var(--radius-sm)" }}>
                  <span style={{ color: "var(--text-muted)" }}>Formato de Arquivo:</span><br />
                  <strong style={{ color: "var(--accent-cyan)" }}>{rom.romFormat}</strong>
                </div>
              </div>
            </div>

            {/* Controls Schema */}
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 700, marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Gamepad2 size={16} color="var(--accent-magenta)" /> Esquema de Controles
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", backgroundColor: "rgba(236, 72, 153, 0.08)", padding: "10px 14px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(236, 72, 153, 0.2)" }}>
                {rom.controls}
              </p>
            </div>

            {/* Direct Download Mirrors */}
            <div>
              <h4 style={{ fontSize: "1rem", color: "#ffffff", fontWeight: 700, marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Download size={16} color="var(--accent-emerald)" /> Opções de Download da ROM PT-BR
              </h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <a
                  href={`#download-${rom.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Iniciando download seguro da ROM pré-patchada: ${rom.title} (${rom.system} PT-BR)`);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    color: "var(--accent-emerald)",
                    textDecoration: "none",
                    fontSize: "0.88rem",
                    fontWeight: 600
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Download size={16} /> Download ROM Pré-Patchada (.zip)
                  </span>
                  <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>{rom.fileSize}</span>
                </a>

                <a
                  href={`#patch-${rom.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Baixando apenas o arquivo de Patch de Tradução IPS/BPS de ${rom.title}`);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid var(--border-color)",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-md)",
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    fontSize: "0.85rem"
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <FileText size={15} /> Baixar Apenas Patch de Tradução IPS/BPS
                  </span>
                  <span style={{ fontSize: "0.75rem" }}>~120 KB</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
