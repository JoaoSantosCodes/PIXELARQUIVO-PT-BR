import React from "react";
import { X, Play, Settings, MoreHorizontal, Clock, HardDrive, Cpu, ShieldCheck } from "lucide-react";
import { playStartSound } from "../utils/audio";

export default function GameDetailsModal({ rom, onClose, onPlayRom }) {
  if (!rom) return null;

  return (
    <div className="modal-backdrop-mobile" onClick={onClose}>
      <div
        className="ui-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "#10141d",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          padding: "24px",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
          borderTop: "1px solid var(--border-accent)"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "rgba(255,255,255,0.08)",
            border: "none",
            color: "#ffffff",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <X size={18} />
        </button>

        {/* Large Game Cover */}
        <div style={{
          width: "100%",
          height: "240px",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          marginBottom: "20px",
          position: "relative"
        }}>
          <img src={rom.cover} alt={rom.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <span className="platform-badge" style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "rgba(0,0,0,0.8)", color: rom.systemBadgeColor }}>
            {rom.system}
          </span>
        </div>

        {/* Title & Specs */}
        <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#ffffff", marginBottom: "4px" }}>
          {rom.title}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "20px" }}>
          {rom.originalTitle} ({rom.year}) • {rom.group}
        </p>

        {/* Information Table */}
        <div style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: "var(--radius-sm)",
          padding: "14px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          fontSize: "0.82rem",
          marginBottom: "24px",
          border: "1px solid var(--border-subtle)"
        }}>
          <div>
            <span style={{ color: "var(--text-muted)", display: "block", marginBottom: "2px" }}>Última vez jogado:</span>
            <strong style={{ color: "#ffffff" }}>Hoje, 20:45</strong>
          </div>

          <div>
            <span style={{ color: "var(--text-muted)", display: "block", marginBottom: "2px" }}>Tempo de jogo:</span>
            <strong style={{ color: "#ffffff" }}>3h 42min</strong>
          </div>

          <div>
            <span style={{ color: "var(--text-muted)", display: "block", marginBottom: "2px" }}>Core utilizado:</span>
            <strong style={{ color: "var(--accent-amber)" }}>{(rom.emulatorType || "snes").toUpperCase()}</strong>
          </div>

          <div>
            <span style={{ color: "var(--text-muted)", display: "block", marginBottom: "2px" }}>Formato do arquivo:</span>
            <strong style={{ color: "#ffffff" }}>{rom.romFormat}</strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className="btn-primary"
            style={{ flex: 1 }}
            onClick={() => {
              onClose();
              playStartSound();
              onPlayRom(rom);
            }}
          >
            <Play size={18} fill="#0d0e12" />
            <span>Continuar</span>
          </button>

          <button className="btn-secondary">
            <Settings size={18} />
          </button>

          <button className="btn-secondary">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
