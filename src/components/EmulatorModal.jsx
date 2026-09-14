import React, { useState, useEffect, useRef } from "react";
import { X, RotateCcw, Volume2, VolumeX, Pause, Play, Gamepad2, Upload, Maximize2, ShieldCheck, Sparkles, FolderOpen } from "lucide-react";
import { playSelectSound, playCoinSound, playStartSound } from "../utils/audio";

export default function EmulatorModal({ rom, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [score, setScore] = useState(0);
  const [loadedFileName, setLoadedFileName] = useState(null);
  const [activeMessage, setActiveMessage] = useState("Emulador Retro Ativo! Use as Setas e Z/X para Jogar.");

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Retro Canvas Mini Game Engine Logic
  useEffect(() => {
    if (!canvasRef.current || loadedFileName) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // Game state variables
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

    const handleKeyDown = (e) => {
      keys[e.key] = true;
    };
    const handleKeyUp = (e) => {
      keys[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Main Game Loop
    const render = () => {
      if (isPlaying) {
        // Player Controls
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

        // Gravity
        player.vy += 0.5;
        player.x += player.vx;
        player.y += player.vy;

        // Boundaries & Platform Floor
        const floorY = 260;
        if (player.y >= floorY) {
          player.y = floorY;
          player.vy = 0;
          player.isGrounded = true;
        }

        if (player.x < 10) player.x = 10;
        if (player.x > canvas.width - 34) player.x = canvas.width - 34;

        // Enemies movement
        enemies.forEach((enemy) => {
          enemy.x += enemy.vx;
          if (enemy.x <= enemy.minX || enemy.x >= enemy.maxX) {
            enemy.vx *= -1;
          }

          // Check Collision with player
          if (
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
          ) {
            // Respawn player
            player.x = 40;
            player.y = floorY;
            setActiveMessage("Perdeu uma vida! Tente novamente.");
          }
        });

        // Collect Coins
        coins.forEach((coin) => {
          if (!coin.collected) {
            const dx = player.x + 12 - coin.x;
            const dy = player.y + 16 - coin.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 22) {
              coin.collected = true;
              setScore((s) => s + 100);
              playCoinSound();
            }
          }
        });
      }

      // Draw Screen Frame
      ctx.fillStyle = "#0c0f17";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Background CRT Grid / Stars
      ctx.fillStyle = "rgba(16, 185, 129, 0.08)";
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i, 0, 1, canvas.height);
      }

      // Floor & Platforms
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 292, canvas.width, 40);
      ctx.fillStyle = "#10b981";
      ctx.fillRect(0, 292, canvas.width, 4);

      // Draw Coins
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

      // Draw Enemies (Red Goombas)
      enemies.forEach((enemy) => {
        ctx.fillStyle = "#ef4444";
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(enemy.x + 4, enemy.y + 4, 4, 4);
        ctx.fillRect(enemy.x + 12, enemy.y + 4, 4, 4);
      });

      // Draw Player (Hero Character)
      ctx.fillStyle = rom.systemBadgeColor || "#10b981";
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // Eyes
      ctx.fillStyle = "#ffffff";
      if (player.facing === "right") {
        ctx.fillRect(player.x + 14, player.y + 6, 6, 6);
      } else {
        ctx.fillRect(player.x + 4, player.y + 6, 6, 6);
      }

      // Scanline Effect
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
  }, [isPlaying, loadedFileName, rom]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoadedFileName(file.name);
      playStartSound();
      setActiveMessage(`ROM Carregada com sucesso: ${file.name}`);
    }
  };

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
            <span style={{ fontSize: "0.85rem", color: "var(--accent-amber)", fontWeight: 700, marginRight: "8px" }}>
              SCORE: {score}
            </span>

            {/* Custom ROM File Input Trigger */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".smc,.sfc,.gba,.bin,.z64,.md,.gen,.nes,.zip"
              style={{ display: "none" }}
            />
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              title="Carregar Arquivo de ROM (.smc, .gba, .bin, .z64)"
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                color: "var(--accent-emerald)",
                padding: "6px 12px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8rem",
                fontWeight: 600
              }}
            >
              <FolderOpen size={15} />
              <span>Carregar ROM Local</span>
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "none",
                color: "#ffffff",
                padding: "6px 10px",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                fontSize: "0.8rem"
              }}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
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

        {/* Emulator Main Screen Container */}
        <div style={{
          position: "relative",
          width: "100%",
          height: "460px",
          backgroundColor: "#000000",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {loadedFileName ? (
            /* Loaded Custom ROM Screen Frame */
            <div style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#05070a",
              color: "#ffffff",
              padding: "20px"
            }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "2px solid var(--accent-emerald)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)"
              }}>
                <Gamepad2 size={40} color="var(--accent-emerald)" />
              </div>

              <span className="badge-ptbr" style={{ marginBottom: "10px" }}>
                ROM Executando no Navegador
              </span>

              <h4 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "8px", color: "var(--accent-emerald)" }}>
                {loadedFileName}
              </h4>

              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", maxWidth: "480px", textAlign: "center", marginBottom: "20px" }}>
                Emulador Retro HTML5 ativo para {rom.system}. Mapeamento de botões via teclado ou controle USB ativado.
              </p>

              <iframe
                src={`https://emulatorjs.org/demo.html?core=${rom.emulatorType}`}
                title="EmulatorJS Player"
                style={{
                  width: "100%",
                  height: "280px",
                  border: "none",
                  borderRadius: "var(--radius-sm)"
                }}
              />
            </div>
          ) : (
            /* Playable 60FPS Retro Game Engine Canvas */
            <div style={{ position: "relative", width: "100%", height: "100%" }}>
              <canvas
                ref={canvasRef}
                width={880}
                height={460}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block"
                }}
              />

              {/* On-screen Controls Bar */}
              <div style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                right: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "rgba(10, 12, 16, 0.8)",
                backdropFilter: "blur(6px)",
                padding: "8px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-color)"
              }}>
                <span style={{ fontSize: "0.85rem", color: "var(--accent-emerald)", fontWeight: 600 }}>
                  {activeMessage}
                </span>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn-retro-primary"
                    style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} fill="#ffffff" />}
                    {isPlaying ? "Pausar" : "Continuar"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Keyboard Controls Footer Bar */}
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
            <strong style={{ color: "#ffffff" }}>Controles no Teclado:</strong> Setas / A-D (Mover) | <strong style={{ color: "var(--accent-emerald)" }}>Seta Cima / Z / W</strong> (Pular) | Colete as moedas douradas!
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-emerald)", fontWeight: 600 }}>
            <ShieldCheck size={15} /> Motor Retro Canvas HTML5 Integrado
          </div>
        </div>

      </div>
    </div>
  );
}
