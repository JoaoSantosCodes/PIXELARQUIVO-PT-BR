import React from "react";
import { Sparkles, Gamepad2, ShieldCheck, Download, Play, Flame } from "lucide-react";
import { playPowerupSound, playStartSound } from "../utils/audio";

export default function HeroBanner({ featuredRoms, onSelectRom, onPlayRom }) {
  const mainFeatured = featuredRoms[0] || null;

  return (
    <section style={{
      position: "relative",
      width: "100%",
      minHeight: "380px",
      borderRadius: "var(--radius-lg)",
      overflow: "hidden",
      margin: "24px 0 32px 0",
      border: "1px solid var(--border-color)",
      boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.7)",
      display: "flex",
      alignItems: "center"
    }}>
      {/* Background Image with Gradient Overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url('/assets/hero_bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.7) contrast(1.15)"
      }} />

      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(90deg, rgba(10, 12, 16, 0.95) 0%, rgba(10, 12, 16, 0.75) 50%, rgba(10, 12, 16, 0.4) 100%)"
      }} />

      {/* Hero Content Grid */}
      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: "1400px",
        width: "100%",
        margin: "0 auto",
        padding: "40px 32px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "32px",
        alignItems: "center"
      }}>
        
        {/* Left Column: Hero Text */}
        <div>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            backgroundColor: "rgba(16, 185, 129, 0.15)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            borderRadius: "var(--radius-full)",
            color: "var(--accent-emerald)",
            fontSize: "0.8rem",
            fontWeight: 700,
            marginBottom: "16px"
          }}>
            <Flame size={14} />
            <span>DESTAQUES DE TRADUÇÃO PT-BR</span>
          </div>

          <h1 className="font-heading" style={{
            fontSize: "clamp(2rem, 4vw, 3.2rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            color: "#ffffff",
            marginBottom: "16px",
            letterSpacing: "-0.5px"
          }}>
            Reviva os Maiores Clássicos Retro em <span className="text-neon-emerald">Português do Brasil</span>
          </h1>

          <p style={{
            fontSize: "1.05rem",
            color: "var(--text-muted)",
            maxWidth: "540px",
            marginBottom: "24px",
            lineHeight: 1.6
          }}>
            O acervo definitivo de ROMs traduzidas, acentuadas e dubladas por grupos históricos da romhacking brasileira. Compatíveis com emuladores de PC, Android e Retrogaming.
          </p>

          {/* Highlights Metrics */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div className="pulse-dot" />
              <span style={{ fontSize: "0.9rem", color: "#ffffff", fontWeight: 600 }}>100% Gratuito e Preservado</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={16} color="var(--accent-cyan)" />
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Patches Revisados</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={16} color="var(--accent-magenta)" />
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>Emulador Web Integrado</span>
            </div>
          </div>
        </div>

        {/* Right Column: Main Featured Card Card Preview */}
        {mainFeatured && (
          <div style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
            <div className="glass-card" style={{
              maxWidth: "380px",
              width: "100%",
              padding: "16px",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              background: "rgba(18, 22, 31, 0.85)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6), 0 0 25px rgba(16,185,129,0.2)"
            }}>
              <div style={{
                position: "relative",
                width: "100%",
                height: "220px",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                marginBottom: "14px"
              }}>
                <img
                  src={mainFeatured.cover}
                  alt={mainFeatured.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
                <span className="badge-ptbr" style={{
                  position: "absolute",
                  top: "10px",
                  left: "10px",
                  zIndex: 2
                }}>
                  {mainFeatured.translationStatus}
                </span>

                <div style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  backgroundColor: "rgba(0,0,0,0.75)",
                  color: mainFeatured.systemBadgeColor,
                  fontWeight: 800,
                  fontSize: "0.75rem",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-sm)",
                  border: `1px solid ${mainFeatured.systemBadgeColor}`
                }}>
                  {mainFeatured.system}
                </div>
              </div>

              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>
                {mainFeatured.title}
              </h3>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "14px" }}>
                Grupo: <strong style={{ color: "var(--accent-emerald)" }}>{mainFeatured.group}</strong>
              </p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  className="btn-retro-primary"
                  style={{ flex: 1, justifyContent: "center", padding: "8px 12px", fontSize: "0.85rem" }}
                  onClick={() => {
                    playStartSound();
                    onPlayRom(mainFeatured);
                  }}
                >
                  <Play size={14} fill="#ffffff" />
                  <span>Jogar Agora</span>
                </button>

                <button
                  className="btn-retro-secondary"
                  style={{ padding: "8px 12px", fontSize: "0.85rem" }}
                  onClick={() => {
                    playPowerupSound();
                    onSelectRom(mainFeatured);
                  }}
                >
                  Ver Ficha
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
