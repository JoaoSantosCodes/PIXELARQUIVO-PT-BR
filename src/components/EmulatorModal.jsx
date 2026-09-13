import React, { useState, useEffect } from "react";
import { X, Maximize2, RotateCcw, Volume2, VolumeX, Pause, Play, Gamepad2, Save, Download } from "lucide-react";
import { playSelectSound } from "../utils/audio";

export default function EmulatorModal({ rom, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activeMessage, setActiveMessage] = useState("Emulador Inicializado! Pressione START para jogar.");

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveMessage(`Carregando ROM: ${rom.title} (${rom.system} PT-BR)...`);
    }, 1200);
    return () => clearTimeout(timer);
  }, [rom]);

  if (!rom) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "960px",
          backgroundColor: "#080a0f",
          border: "2px solid var(--accent-emerald)",
          borderRadius: "var(--radius-lg)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          boxShadow: "0 0 40px rgba(16, 185, 129, 0.3)"
        }}
      >
        {/* Header Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "12px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: isPlaying ? "#10b981" : "#f59e0b",
              boxShadow: isPlaying ? "0 0 10px #10b981" : "none"
            }} />
            <h3 className="font-heading" style={{ fontSize: "1.2rem", color: "#ffffff", fontWeight: 700 }}>
              {rom.title} <span style={{ color: "var(--accent-emerald)", fontSize: "0.9rem" }}>[{rom.system} PT-BR]</span>
            </h3>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                color: "#ffffff",
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8rem"
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              {isMuted ? "Sem Som" : "Áudio OK"}
            </button>

            <button
              onClick={() => {
                setActiveMessage("Jogo Reiniciado!");
                playSelectSound();
              }}
              title="Reiniciar Jogo"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                color: "#ffffff",
                padding: "6px 10px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer"
              }}
            >
              <RotateCcw size={16} />
            </button>

            <button
              onClick={onClose}
              style={{
                background: "rgba(239, 68, 68, 0.2)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                color: "#ef4444",
                padding: "6px 10px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer"
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Emulator Display Screen */}
        <div style={{
          position: "relative",
          width: "100%",
          height: "460px",
          backgroundColor: "#000000",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {/* Cover Background Graphic */}
          <img
            src={rom.cover}
            alt={rom.title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(8px) opacity(0.35)"
            }}
          />

          {/* Simulated Retro Screen Canvas */}
          <div style={{
            position: "relative",
            zIndex: 2,
            width: "90%",
            maxWidth: "600px",
            height: "90%",
            backgroundColor: "#0c0f17",
            borderRadius: "var(--radius-md)",
            border: "2px solid #1f293d",
            boxShadow: "0 0 30px rgba(0, 0, 0, 0.9), inset 0 0 20px rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            textAlign: "center"
          }}>
            <div style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "2px solid var(--accent-emerald)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)"
            }}>
              <Gamepad2 size={36} color="var(--accent-emerald)" />
            </div>

            <span className="badge-ptbr" style={{ marginBottom: "12px" }}>
              {rom.translationStatus}
            </span>

            <h4 style={{ fontSize: "1.4rem", color: "#ffffff", fontWeight: 800, marginBottom: "6px" }}>
              {rom.title}
            </h4>

            <p style={{ fontSize: "0.85rem", color: "var(--accent-cyan)", marginBottom: "16px" }}>
              {activeMessage}
            </p>

            {/* Virtual Controls HUD overlay */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "12px"
            }}>
              <button
                className="btn-retro-primary"
                onClick={() => {
                  playSelectSound();
                  setIsPlaying(!isPlaying);
                  setActiveMessage(isPlaying ? "Jogo Pausado" : "Executando ROM PT-BR...");
                }}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} fill="#ffffff" />}
                {isPlaying ? "Pausar" : "Continuar"}
              </button>

              <button
                className="btn-retro-secondary"
                onClick={() => {
                  playSelectSound();
                  setActiveMessage("Estado Salvo no Navegador! (Slot 1)");
                }}
              >
                <Save size={15} /> Save State
              </button>
            </div>
          </div>
        </div>

        {/* Keyboard Controls Guide */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          padding: "10px 16px",
          borderRadius: "var(--radius-md)",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          flexWrap: "wrap",
          gap: "10px"
        }}>
          <div>
            <strong style={{ color: "#ffffff" }}>Controles no Teclado:</strong> Setas (Direcionais) | <strong style={{ color: "var(--accent-emerald)" }}>Z / X</strong> (A / B) | <strong style={{ color: "var(--accent-cyan)" }}>Enter</strong> (Start) | <strong style={{ color: "var(--accent-magenta)" }}>Shift</strong> (Select)
          </div>
          <div>
            Emulador Web: <span style={{ color: "var(--accent-emerald)", fontWeight: 700 }}>Online & Pronto</span>
          </div>
        </div>

      </div>
    </div>
  );
}
