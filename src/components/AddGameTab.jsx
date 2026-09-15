import React, { useState, useRef } from "react";
import { Upload, FileCode, CheckCircle2, Play, Sparkles, FolderOpen, AlertCircle, Cpu } from "lucide-react";
import { playStartSound, playCoinSound } from "../utils/audio";

export default function AddGameTab({ onPlayLocalFile }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [detectedCore, setDetectedCore] = useState("psx");
  const [detectedSystem, setDetectedSystem] = useState("PlayStation 1");
  const fileInputRef = useRef(null);

  const detectCoreAndSystem = (fileName) => {
    if (!fileName) return { core: "psx", system: "PlayStation 1" };
    const nameLower = fileName.toLowerCase();
    const ext = nameLower.split(".").pop();

    if (["gba", "agb"].includes(ext)) {
      return { core: "gba", system: "Game Boy Advance" };
    }
    if (["smc", "sfc", "fig", "swc"].includes(ext)) {
      return { core: "snes", system: "Super Nintendo" };
    }
    if (["nes", "fds"].includes(ext)) {
      return { core: "nes", system: "NES 8-Bit" };
    }
    if (["z64", "n64", "v64"].includes(ext)) {
      return { core: "n64", system: "Nintendo 64" };
    }
    if (["md", "gen", "smd"].includes(ext)) {
      return { core: "segaMD", system: "Mega Drive" };
    }
    if (["bin", "cue", "iso", "img", "pbp"].includes(ext)) {
      if (nameLower.includes("snes") || nameLower.includes("super")) {
        return { core: "snes", system: "Super Nintendo" };
      }
      return { core: "psx", system: "PlayStation 1" };
    }
    return { core: "snes", system: "Super Nintendo" };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const info = detectCoreAndSystem(file.name);
      setSelectedFile(file);
      setDetectedCore(info.core);
      setDetectedSystem(info.system);
      playCoinSound();
    }
  };

  const handleStartPlay = () => {
    if (selectedFile) {
      playStartSound();
      onPlayLocalFile(selectedFile, detectedCore, detectedSystem);
    }
  };

  return (
    <div style={{ padding: "20px 20px 80px 20px" }}>
      {/* Title with Caprasimo font */}
      <h2 className="font-heading" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
        Adicionar jogo
      </h2>
      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px" }}>
        Importe qualquer arquivo de ROM para jogar instantaneamente no hub.
      </p>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".bin,.cue,.iso,.smc,.sfc,.gba,.z64,.n64,.md,.gen,.nes,.zip"
        style={{ display: "none" }}
      />

      {/* Large Dropzone Card with Amber Dashed Border */}
      {!selectedFile ? (
        <div
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          className="ui-card"
          style={{
            padding: "44px 20px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "2px dashed var(--accent-amber)",
            backgroundColor: "var(--bg-surface)",
            cursor: "pointer",
            borderRadius: "var(--radius-lg)",
            boxShadow: "0 0 30px rgba(246, 160, 107, 0.08)"
          }}
        >
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "var(--accent-amber-glow)",
            color: "var(--accent-amber)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px"
          }}>
            <Upload size={28} />
          </div>

          <h3 className="font-heading" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
            Selecione seu arquivo
          </h3>
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", maxWidth: "300px", marginBottom: "20px" }}>
            BIN, CUE, ISO, ROM e outros formatos compatíveis
          </p>

          <button className="btn-primary" style={{ pointerEvents: "none" }}>
            <FolderOpen size={16} />
            <span>Selecionar arquivo</span>
          </button>
        </div>
      ) : (
        /* File Info Card with Sage Circular Badge */
        <div className="ui-card" style={{ padding: "24px", border: "1px solid var(--border-accent)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "var(--state-success-bg)",
              color: "var(--state-success)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(174, 191, 146, 0.4)"
            }}>
              <CheckCircle2 size={24} />
            </div>

            <div style={{ flex: 1, overflow: "hidden" }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {selectedFile.name}
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          {/* Details Table */}
          <div style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: "var(--radius-sm)",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "0.85rem",
            marginBottom: "20px",
            border: "1px solid var(--border-subtle)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>Tipo:</span>
              <strong style={{ color: "#ffffff" }}>{detectedSystem}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--text-muted)" }}>Core detectado:</span>
              <strong style={{ color: "var(--accent-amber)" }}>{detectedCore.toUpperCase()}</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--state-success)", fontWeight: 700, paddingTop: "6px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <CheckCircle2 size={16} />
              <span>Core identificado automaticamente</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="btn-primary"
              style={{ flex: 1 }}
              onClick={handleStartPlay}
            >
              <Play size={18} fill="#0f1218" />
              <span>Jogar agora</span>
            </button>

            <button
              className="btn-secondary"
              onClick={() => setSelectedFile(null)}
            >
              Trocar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
