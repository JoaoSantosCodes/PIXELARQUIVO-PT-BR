import React, { useState, useEffect, useRef } from "react";
import { X, RotateCcw, Volume2, VolumeX, Pause, Play, Gamepad2, Upload, Maximize2, ShieldCheck, Sparkles, FolderOpen, FileCode, CheckCircle2, Cpu } from "lucide-react";
import { playSelectSound, playCoinSound, playStartSound } from "../utils/audio";

export default function EmulatorModal({ rom, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Local or Bundled ROM File State
  const [localFile, setLocalFile] = useState(null);
  const [localFileUrl, setLocalFileUrl] = useState(null);
  const [selectedCore, setSelectedCore] = useState(rom.emulatorType || "snes");
  const [isDragging, setIsDragging] = useState(false);
  const [activeMessage, setActiveMessage] = useState("Emulador Retro Ativo! Arraste sua ROM local ou use o jogo integrado.");

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-detect core based on file extension and name
  const detectCore = (fileName, fallbackSystem) => {
    if (!fileName) return fallbackSystem || "snes";
    const nameLower = fileName.toLowerCase();
    const ext = nameLower.split(".").pop();

    if (["gba", "agb"].includes(ext)) return "gba";
    if (["smc", "sfc", "fig", "swc"].includes(ext)) return "snes";
    if (["nes", "fds"].includes(ext)) return "nes";
    if (["z64", "n64", "v64"].includes(ext)) return "n64";
    if (["md", "gen", "smd"].includes(ext)) return "segaMD";
    if (["bin", "cue", "iso", "img", "pbp", "mdf"].includes(ext)) {
      // Check if it's PS1 or Genesis or SNES
      if (nameLower.includes("ps1") || nameLower.includes("playstation") || nameLower.includes("resident") || nameLower.includes("castlevania") || nameLower.includes("re2") || nameLower.includes("re3")) {
        return "psx";
      }
      if (nameLower.includes("snes") || nameLower.includes("super")) {
        return "snes";
      }
      return "psx"; // Default for .bin / .cue is PS1
    }
    return fallbackSystem || "snes";
  };

  // Clean up Blob URLs on unmount
  useEffect(() => {
    return () => {
      if (localFileUrl && localFileUrl.startsWith("blob:")) {
        URL.revokeObjectURL(localFileUrl);
      }
    };
  }, [localFileUrl]);

  // Handle local ROM selection from user disk
  const processLocalFile = (file) => {
    if (!file) return;

    if (localFileUrl && localFileUrl.startsWith("blob:")) {
      URL.revokeObjectURL(localFileUrl);
    }

    const detected = detectCore(file.name, rom.emulatorType);
    setSelectedCore(detected);

    const blobUrl = URL.createObjectURL(file);
    setLocalFile(file);
    setLocalFileUrl(blobUrl);
    playStartSound();
    setActiveMessage(`ROM Carregada: ${file.name} • Core: ${detected.toUpperCase()}`);
  };

  // Load built-in real demo ROM (/roms/real_game.nes)
  const handleLoadDemoRom = () => {
    if (localFileUrl && localFileUrl.startsWith("blob:")) {
      URL.revokeObjectURL(localFileUrl);
    }
    setSelectedCore("nes");
    setLocalFile({ name: "Demo Retro (real_game.nes)", size: 24576 });
    setLocalFileUrl("/roms/real_game.nes");
    playStartSound();
    setActiveMessage("ROM Demonstrativa Real Carregada: real_game.nes (NES)");
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    processLocalFile(file);
  };

  // Drag and Drop Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processLocalFile(e.dataTransfer.files[0]);
    }
  };

  // Retro Canvas Mini Game Engine Logic (Runs when no local ROM file is selected)
  useEffect(() => {
    if (!canvasRef.current || localFileUrl) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let player = {
      x: 100,
      y: 260,
      width: 24,
      height: 32,
      vx: 0,
      vy: 0,
      isGrounded: true,
      color: "#10b981",
      facing: "right"
    };

    let coins = [
      { x: 220, y: 220, collected: false },
      { x: 340, y: 180, collected: false },
      { x: 480, y: 240, collected: false },
      { x: 600, y: 190, collected: false },
      { x: 720, y: 230, collected: false }
    ];

    let enemies = [
      { x: 300, y: 272, width: 20, height: 20, vx: -1.5, minX: 200, maxX: 400 },
      { x: 550, y: 272, width: 20, height: 20, vx: 1.5, minX: 450, maxX: 680 }
    ];

    let keys = {};

    const handleKeyDown = (e) => { keys[e.key] = true; };
    const handleKeyUp = (e) => { keys[e.key] = false; };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const render = () => {
      if (isPlaying) {
        if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
          player.vx = 3.5;
          player.facing = "right";
        } else if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
          player.vx = -3.5;
          player.facing = "left";
        } else {
          player.vx *= 0.8;
        }

        if ((keys["ArrowUp"] || keys["w"] || keys["W"] || keys["z"] || keys["Z"]) && player.isGrounded) {
          player.vy = -9.5;
          player.isGrounded = false;
          playSelectSound();
        }

        player.vy += 0.5;
        player.x += player.vx;
        player.y += player.vy;

        const floorY = 260;
        if (player.y >= floorY) {
          player.y = floorY;
          player.vy = 0;
          player.isGrounded = true;
        }

        if (player.x < 10) player.x = 10;
        if (player.x > canvas.width - 34) player.x = canvas.width - 34;

        enemies.forEach((enemy) => {
          enemy.x += enemy.vx;
          if (enemy.x <= enemy.minX || enemy.x >= enemy.maxX) {
            enemy.vx *= -1;
          }
          if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
          ) {
            player.x = 40;
            player.y = floorY;
            setActiveMessage("Vidas: 2 • Tente novamente!");
          }
        });

        coins.forEach((coin) => {
          if (!coin.collected) {
            const dx = player.x + 12 - coin.x;
            const dy = player.y + 16 - coin.y;
            if (Math.sqrt(dx * dx + dy * dy) < 22) {
              coin.collected = true;
              setScore((s) => s + 100);
              playCoinSound();
            }
          }
        });
      }

      ctx.fillStyle = "#0c0f17";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(16, 185, 129, 0.08)";
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i, 0, 1, canvas.height);
      }

      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 292, canvas.width, 40);
      ctx.fillStyle = "#10b981";
      ctx.fillRect(0, 292, canvas.width, 4);

      coins.forEach((coin) => {
        if (!coin.collected) {
          ctx.beginPath();
          ctx.arc(coin.x, coin.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = "#f59e0b";
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#fbbf24";
          ctx.stroke();
        }
      });

      enemies.forEach((enemy) => {
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(enemy.x + 4, enemy.y + 4, 4, 4);
        ctx.fillRect(enemy.x + 12, enemy.y + 4, 4, 4);
      });

      ctx.fillStyle = rom.systemBadgeColor || "#10b981";
      ctx.fillRect(player.x, player.y, player.width, player.height);

      ctx.fillStyle = "#ffffff";
      if (player.facing === "right") {
        ctx.fillRect(player.x + 14, player.y + 6, 6, 6);
      } else {
        ctx.fillRect(player.x + 4, player.y + 6, 6, 6);
      }

      ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 2);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlaying, localFileUrl, rom]);

  // Construct inline srcDoc for EmulatorJS client-side WebAssembly player
  const getEmulatorSrcDoc = () => {
    if (!localFileUrl) return "";

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
    EJS_gameUrl = '${localFileUrl}';
    EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
    EJS_startOnLoaded = true;
    EJS_language = 'pt-BR';
    EJS_backgroundColor = '#080a0f';
  </script>
  <script src="https://cdn.emulatorjs.org/stable/data/loader.js"></script>
</body>
</html>`;
  };

  if (!rom) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          width: "100%",
          maxWidth: "980px",
          backgroundColor: "#080a0f",
          border: isDragging ? "2px dashed #10b981" : "2px solid var(--accent-emerald)",
          borderRadius: "var(--radius-lg)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          boxShadow: isDragging ? "0 0 50px rgba(16, 185, 129, 0.6)" : "0 0 40px rgba(16, 185, 129, 0.3)",
          position: "relative"
        }}
      >
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept=".smc,.sfc,.gba,.bin,.z64,.md,.gen,.nes,.zip,.iso"
          style={{ display: "none" }}
        />

        {/* Drag Overlay Notification */}
        {isDragging && (
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(10, 12, 16, 0.92)",
            borderRadius: "var(--radius-lg)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            border: "3px dashed #10b981",
            gap: "12px"
          }}>
            <Upload size={48} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: "1.4rem", color: "#ffffff", fontWeight: 800 }}>
              Solte seu arquivo de ROM aqui!
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Formatos aceitos: .smc, .sfc, .gba, .bin, .z64, .md, .nes, .zip
            </p>
          </div>
        )}

        {/* Header Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "12px",
          flexWrap: "wrap",
          gap: "10px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: localFile ? "#3b82f6" : (isPlaying ? "#10b981" : "#f59e0b"),
              boxShadow: "0 0 10px #10b981"
            }} />
            <h3 className="font-heading" style={{ fontSize: "1.2rem", color: "#ffffff", fontWeight: 700 }}>
              {localFile ? localFile.name : rom.title} <span style={{ color: "var(--accent-emerald)", fontSize: "0.9rem" }}>[{selectedCore.toUpperCase()}]</span>
            </h3>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            
            {/* Core Selector Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "rgba(255,255,255,0.05)", padding: "4px 8px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-color)" }}>
              <Cpu size={14} color="var(--accent-emerald)" />
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Core:</span>
              <select
                value={selectedCore}
                onChange={(e) => {
                  playSelectSound();
                  setSelectedCore(e.target.value);
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                <option value="psx" style={{ backgroundColor: "#12161f" }}>PlayStation 1 (PSX)</option>
                <option value="snes" style={{ backgroundColor: "#12161f" }}>Super Nintendo (SNES)</option>
                <option value="gba" style={{ backgroundColor: "#12161f" }}>Game Boy Advance (GBA)</option>
                <option value="segaMD" style={{ backgroundColor: "#12161f" }}>Mega Drive (Sega)</option>
                <option value="n64" style={{ backgroundColor: "#12161f" }}>Nintendo 64 (N64)</option>
                <option value="nes" style={{ backgroundColor: "#12161f" }}>NES 8-Bit</option>
              </select>
            </div>

            {/* Quick Demo ROM Loader Button */}
            <button
              onClick={handleLoadDemoRom}
              className="btn-retro-secondary"
              style={{ padding: "6px 12px", fontSize: "0.82rem", borderColor: "var(--accent-cyan)", color: "var(--accent-cyan)" }}
              title="Testar com a ROM real incluída no sistema"
            >
              <Play size={14} fill="var(--accent-cyan)" />
              <span>ROM Demo</span>
            </button>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="btn-retro-primary"
              style={{ padding: "6px 14px", fontSize: "0.82rem" }}
            >
              <FolderOpen size={16} />
              <span>{localFile ? "Trocar Arquivo" : "Selecionar ROM"}</span>
            </button>

            {localFile && (
              <button
                onClick={() => {
                  setLocalFile(null);
                  if (localFileUrl && localFileUrl.startsWith("blob:")) URL.revokeObjectURL(localFileUrl);
                  setLocalFileUrl(null);
                  setActiveMessage("Modo Canvas Retro Ativado");
                }}
                className="btn-retro-secondary"
                style={{ padding: "6px 10px", fontSize: "0.8rem" }}
                title="Voltar para a demonstração retro"
              >
                Voltar Demo
              </button>
            )}

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

        {/* Emulator Display Frame */}
        <div style={{
          position: "relative",
          width: "100%",
          height: "480px",
          backgroundColor: "#000000",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {localFileUrl ? (
            /* 100% Client-Side WebAssembly Emulator Engine with User's ROM File or Included ROM */
            <iframe
              key={`${selectedCore}-${localFileUrl}`}
              srcDoc={getEmulatorSrcDoc()}
              title={`Emulador WebAssembly - ${localFile.name}`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                backgroundColor: "#000000"
              }}
            />
          ) : (
            /* Interactive 60FPS Retro Demo Game Canvas */
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <canvas
                ref={canvasRef}
                width={920}
                height={480}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block"
                }}
              />

              {/* HUD Banner Overlay */}
              <div style={{
                position: "absolute",
                top: "14px",
                left: "14px",
                right: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(10, 12, 16, 0.85)",
                backdropFilter: "blur(8px)",
                padding: "8px 16px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)",
                flexWrap: "wrap",
                gap: "8px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <FolderOpen size={16} color="var(--accent-emerald)" />
                  <span style={{ fontSize: "0.85rem", color: "#ffffff", fontWeight: 600 }}>
                    Arquivo selecionado: <code style={{ color: "var(--accent-emerald)" }}>{localFile ? localFile.name : "Carregue sua ROM"}</code>
                  </span>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn-retro-secondary"
                    style={{ padding: "6px 12px", fontSize: "0.8rem", borderColor: "var(--accent-cyan)", color: "var(--accent-cyan)" }}
                    onClick={handleLoadDemoRom}
                  >
                    <Play size={14} fill="var(--accent-cyan)" /> Testar ROM Demo
                  </button>

                  <button
                    className="btn-retro-primary"
                    style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <Upload size={14} /> Selecionar Seu Arquivo
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Guidance Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          padding: "10px 16px",
          borderRadius: "var(--radius-md)",
          fontSize: "0.82rem",
          color: "var(--text-muted)",
          flexWrap: "wrap",
          gap: "10px"
        }}>
          <div>
            <strong style={{ color: "#ffffff" }}>Dica PS1 / ISO / BIN:</strong> Se você carregou um jogo de PlayStation 1 (`Resident Evil 3.bin`), certifique-se de que o seletor <strong style={{ color: "var(--accent-cyan)" }}>Core: PlayStation 1 (PSX)</strong> esteja ativo no topo!
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-emerald)", fontWeight: 600 }}>
            <ShieldCheck size={15} /> Detecção Automática de Core Ativa
          </div>
        </div>

      </div>
    </div>
  );
}
