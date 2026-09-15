import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Settings, CheckCircle2, Cpu, AlertTriangle, RefreshCw, Pause, Play, RotateCcw, Volume2, VolumeX, Sparkles } from "lucide-react";
import VirtualController from "./VirtualController";
import { playSelectSound, playStartSound, playCoinSound } from "../utils/audio";

export default function EmulatorModal({ rom, localFile, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  
  // Loading & Error States
  const [loadingState, setLoadingState] = useState("loading"); // 'loading', 'ready', 'error'
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Smart Core Detection
  const detectBestCore = (fileName, systemName) => {
    const name = (fileName || rom.title || "").toLowerCase();
    if (name.includes("snes") || name.includes("super mario") || name.includes("chrono") || name.includes("zelda")) return "snes";
    if (name.includes("gba") || name.includes("pokemon")) return "gba";
    if (name.includes("nes") || name.includes("8bit")) return "nes";
    if (name.includes("n64") || name.includes("64")) return "n64";
    if (name.includes("mega") || name.includes("sonic") || name.includes("sega")) return "segaMD";
    if (name.includes("bin") || name.includes("cue") || name.includes("ps1") || name.includes("resident") || name.includes("castlevania") || systemName === "PlayStation 1") return "psx";
    return rom.emulatorType || "snes";
  };

  const [selectedCore, setSelectedCore] = useState(() => detectBestCore(localFile ? localFile.name : rom.title, rom.system));
  const [autoDetected, setAutoDetected] = useState(true);

  const canvasRef = useRef(null);
  const [localBlobUrl, setLocalBlobUrl] = useState(null);

  // Initialize local Blob URL if localFile passed
  useEffect(() => {
    if (localFile && localFile instanceof File) {
      const url = URL.createObjectURL(localFile);
      setLocalBlobUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [localFile]);

  // Handle core change and simulate loading transition / compatibility check
  useEffect(() => {
    setLoadingState("loading");
    setErrorMessage(null);

    const isPs1File = (localFile ? localFile.name : rom.title).toLowerCase().includes("bin") || 
                      (localFile ? localFile.name : rom.title).toLowerCase().includes("resident") ||
                      rom.system === "PlayStation 1";

    const timer = setTimeout(() => {
      // Simulate core mismatch check if PS1 file run on SNES core without override
      if (isPs1File && selectedCore === "snes") {
        setLoadingState("error");
        setErrorMessage({
          title: "Não foi possível iniciar o jogo",
          text: "O arquivo parece ser de PlayStation 1, mas o core atual é Super Nintendo.",
          currentCore: "Super Nintendo (snes)",
          recommendedCore: "psx",
          recommendedCoreLabel: "PlayStation 1 (PSX)"
        });
      } else {
        setLoadingState("ready");
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [selectedCore, localFile, rom]);

  const handleFixCore = (recommendedCore) => {
    playCoinSound();
    setSelectedCore(recommendedCore);
    setAutoDetected(true);
  };

  // Construct srcDoc for EmulatorJS WebAssembly Core Frame
  const getEmulatorSrcDoc = () => {
    const gameUrl = localBlobUrl || "/roms/real_game.nes";
    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background: #080a0f; color: #fff; font-family: sans-serif; }
    #emulator-container { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
  </style>
</head>
<body>
  <div id="emulator-container">
    <div id="game"></div>
  </div>
  <script>
    EJS_player = '#game';
    EJS_core = '${selectedCore}';
    EJS_gameUrl = '${gameUrl}';
    EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    EJS_startOnLoaded = true;
    EJS_language = 'pt-BR';
    EJS_backgroundColor = '#080a0f';
  </script>
  <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
</body>
</html>`;
  };

  return (
    <div className="modal-backdrop-mobile" style={{ alignItems: "stretch", padding: 0 }}>
      <div style={{
        width: "100%",
        maxWidth: "1000px",
        height: "100vh",
        margin: "0 auto",
        backgroundColor: "#090b0e",
        display: "flex",
        flexDirection: "column",
        position: "relative"
      }}>
        
        {/* Header Bar: ← Voltar | Resident Evil 3 | ⚙ Configurações */}
        <header style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border-subtle)",
          backgroundColor: "#11141c"
        }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </button>

          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#ffffff" }}>
            {localFile ? localFile.name : rom.title}
          </h3>

          <button
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: "4px"
            }}
          >
            <Settings size={18} />
          </button>
        </header>

        {/* Smart Core Bar (🧠 Detecção Inteligente) */}
        <div style={{
          padding: "8px 16px",
          backgroundColor: "#161b24",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>Core:</span>
            <select
              value={selectedCore}
              onChange={(e) => {
                playSelectSound();
                setSelectedCore(e.target.value);
                setAutoDetected(false);
              }}
              style={{
                backgroundColor: "var(--bg-surface-elevated)",
                border: "1px solid var(--border-subtle)",
                color: "#ffffff",
                padding: "4px 8px",
                borderRadius: "var(--radius-xs)",
                fontSize: "0.82rem",
                fontWeight: 700,
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="psx">PlayStation 1 (PSX)</option>
              <option value="snes">Super Nintendo (SNES)</option>
              <option value="gba">Game Boy Advance (GBA)</option>
              <option value="nes">Nintendo Entertainment System (NES)</option>
              <option value="segaMD">Mega Drive</option>
              <option value="n64">Nintendo 64 (N64)</option>
            </select>
          </div>

          {autoDetected && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px", color: "var(--state-success)", fontSize: "0.78rem", fontWeight: 700 }}>
              <CheckCircle2 size={14} />
              <span>Core detectado automaticamente</span>
            </div>
          )}
        </div>

        {/* Gameplay Viewport Screen (Central Maximum Area) */}
        <div style={{
          flex: 1,
          position: "relative",
          backgroundColor: "#000000",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}>
          
          {/* STATE 1: LOADING STATE */}
          {loadingState === "loading" && (
            <div style={{
              position: "absolute",
              inset: 0,
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(10, 12, 16, 0.94)",
              backdropFilter: "blur(14px)"
            }}>
              {/* Blurred Cover Art Background */}
              <img
                src={rom.cover}
                alt={rom.title}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "blur(20px) opacity(0.2)"
                }}
              />

              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                {/* Minimalist Spinner */}
                <div style={{
                  width: "48px",
                  height: "48px",
                  border: "3px solid var(--border-subtle)",
                  borderTopColor: "var(--accent-amber)",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 16px auto"
                }} />

                <h4 className="font-heading" style={{ fontSize: "1.15rem", fontWeight: 400, color: "#ffffff", marginBottom: "6px" }}>
                  Preparando seu jogo...
                </h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  Detectando plataforma e carregando o core {selectedCore.toUpperCase()}
                </p>
              </div>
            </div>
          )}

          {/* STATE 2: CUSTOM CORE ERROR DIALOG */}
          {loadingState === "error" && errorMessage && (
            <div style={{
              position: "absolute",
              inset: 0,
              zIndex: 60,
              backgroundColor: "rgba(10, 12, 16, 0.95)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px"
            }}>
              <div className="ui-card" style={{
                maxWidth: "420px",
                width: "100%",
                padding: "24px",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                backgroundColor: "#161822"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "var(--state-error-bg)",
                  color: "var(--state-error)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px"
                }}>
                  <AlertTriangle size={24} />
                </div>

                <h3 className="font-heading" style={{ fontSize: "1.15rem", fontWeight: 400, color: "#ffffff", marginBottom: "6px" }}>
                  {errorMessage.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.5 }}>
                  {errorMessage.text}
                </p>

                <div style={{
                  backgroundColor: "rgba(0,0,0,0.3)",
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.82rem",
                  marginBottom: "20px"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "var(--text-muted)" }}>Core atual:</span>
                    <span style={{ color: "var(--state-error)", fontWeight: 700 }}>{errorMessage.currentCore}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "var(--text-muted)" }}>Core recomendado:</span>
                    <span style={{ color: "var(--state-success)", fontWeight: 700 }}>{errorMessage.recommendedCoreLabel}</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <button
                    className="btn-primary"
                    onClick={() => handleFixCore(errorMessage.recommendedCore)}
                  >
                    Usar {errorMessage.recommendedCoreLabel}
                  </button>

                  <button
                    className="btn-secondary"
                    onClick={() => {
                      setSelectedCore("psx");
                      setLoadingState("loading");
                    }}
                  >
                    Escolher outro core
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STATE 3: LIVE WEBASSEMBLY EMULATOR CANVAS */}
          {loadingState === "ready" && (
            <iframe
              srcDoc={getEmulatorSrcDoc()}
              title="PixelArquivo Emulator Engine"
              style={{
                width: "100%",
                height: "100%",
                border: "none"
              }}
            />
          )}
        </div>

        {/* Action Controls Bar below gameplay */}
        <div style={{
          padding: "8px 16px",
          backgroundColor: "#11141c",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <button
            className="pill-btn"
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ display: "flex", alignItems: "center", gap: "6px" }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            <span>{isPlaying ? "Pausar" : "Continuar"}</span>
          </button>

          <span style={{ fontSize: "0.78rem", color: "var(--state-success)", fontWeight: 700 }}>
            ✓ Pronto para jogar
          </span>

          <button className="pill-btn">
            ⚙ Configurações
          </button>
        </div>

        {/* Discrete Virtual Controller */}
        <VirtualController />

      </div>
    </div>
  );
}
