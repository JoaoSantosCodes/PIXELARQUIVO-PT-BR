import React, { useState } from "react";
import { Cpu, Gamepad2, Moon, Globe, Database, Info, HelpCircle, Check, ChevronRight } from "lucide-react";
import { playSelectSound } from "../utils/audio";

export default function SettingsTab() {
  const [autoDetect, setAutoDetect] = useState(true);
  const [vibration, setVibration] = useState(true);

  return (
    <div style={{ padding: "20px 20px 80px 20px" }}>
      <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>
        Configurações
      </h2>
      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
        Personalize a experiência do hub e a resposta da emulação.
      </p>

      {/* Emulação */}
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "0.82rem", color: "var(--accent-amber)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Cpu size={15} /> Emulação
        </h3>

        <div className="ui-card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)" }}>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>Core padrão</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Seleção baseada na extensão</div>
            </div>
            <span style={{ fontSize: "0.82rem", color: "var(--accent-amber)", fontWeight: 600 }}>Automático</span>
          </div>

          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>🧠 Detecção inteligente</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Identifica a plataforma da ROM</div>
            </div>
            <button
              onClick={() => {
                playSelectSound();
                setAutoDetect(!autoDetect);
              }}
              style={{
                width: "44px",
                height: "24px",
                borderRadius: "var(--radius-full)",
                backgroundColor: autoDetect ? "var(--state-success)" : "rgba(255,255,255,0.1)",
                border: "none",
                position: "relative",
                cursor: "pointer"
              }}
            >
              <div style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                position: "absolute",
                top: "3px",
                left: autoDetect ? "23px" : "3px",
                transition: "left 0.18s ease"
              }} />
            </button>
          </div>
        </div>
      </div>

      {/* Controles Virtuais */}
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "0.82rem", color: "var(--accent-amber)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Gamepad2 size={15} /> Controles Virtuais
        </h3>

        <div className="ui-card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)" }}>
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>Vibração (Haptic Feedback)</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Feedback ao tocar nos botões</div>
            </div>
            <button
              onClick={() => {
                playSelectSound();
                setVibration(!vibration);
              }}
              style={{
                width: "44px",
                height: "24px",
                borderRadius: "var(--radius-full)",
                backgroundColor: vibration ? "var(--state-success)" : "rgba(255,255,255,0.1)",
                border: "none",
                position: "relative",
                cursor: "pointer"
              }}
            >
              <div style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "#ffffff",
                position: "absolute",
                top: "3px",
                left: vibration ? "23px" : "3px",
                transition: "left 0.18s ease"
              }} />
            </button>
          </div>

          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>Tamanho dos Controles</span>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Médio (Padrão)</span>
          </div>
        </div>
      </div>

      {/* Aparência */}
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ fontSize: "0.82rem", color: "var(--accent-amber)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Moon size={15} /> Aparência
        </h3>

        <div className="ui-card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>Tema</span>
            <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Escuro Charcoal</span>
          </div>

          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>Idioma</span>
            <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>Português (Brasil) 🇧🇷</span>
          </div>
        </div>
      </div>

      {/* Sistema */}
      <div>
        <h3 style={{ fontSize: "0.82rem", color: "var(--accent-amber)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <Info size={15} /> Sistema
        </h3>

        <div className="ui-card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>Sobre o PIXELARQUIVO</span>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>v2.5 PT-BR</span>
          </div>

          <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#ffffff" }}>Ajuda e Suporte</span>
            <ChevronRight size={16} color="var(--text-muted)" />
          </div>
        </div>
      </div>
    </div>
  );
}
