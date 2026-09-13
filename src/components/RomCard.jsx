import React from "react";
import { Star, Download, Play, Heart, Mic, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { playCoinSound, playStartSound, playPowerupSound } from "../utils/audio";

export default function RomCard({ rom, isFavorite, onToggleFavorite, onSelectRom, onPlayRom }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!isFavorite) {
      playCoinSound();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#10b981', '#06b6d4', '#ec4899', '#f59e0b']
      });
    }
    onToggleFavorite(rom.id);
  };

  return (
    <div
      className="glass-card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        position: "relative"
      }}
    >
      {/* Cover Image Container */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "240px",
        overflow: "hidden",
        backgroundColor: "#0d1117"
      }}>
        <img
          src={rom.cover}
          alt={rom.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.06)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        />

        {/* Console System Badge */}
        <div style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          backgroundColor: "rgba(10, 12, 16, 0.85)",
          color: rom.systemBadgeColor,
          fontWeight: 800,
          fontSize: "0.75rem",
          padding: "3px 9px",
          borderRadius: "var(--radius-sm)",
          border: `1px solid ${rom.systemBadgeColor}`,
          boxShadow: `0 0 10px ${rom.systemBadgeColor}40`
        }}>
          {rom.system}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          title={isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "rgba(10, 12, 16, 0.8)",
            border: isFavorite ? "1px solid #ec4899" : "1px solid rgba(255, 255, 255, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
            transition: "all 0.2s ease"
          }}
        >
          <Heart
            size={18}
            color={isFavorite ? "#ec4899" : "#ffffff"}
            fill={isFavorite ? "#ec4899" : "none"}
          />
        </button>

        {/* Translation Status Pill */}
        <div style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          display: "flex",
          gap: "6px",
          flexWrap: "wrap"
        }}>
          <span className="badge-ptbr">
            {rom.translationStatus}
          </span>

          {rom.isDubbed && (
            <span className="badge-dubbed" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Mic size={10} /> Dublado
            </span>
          )}
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between"
      }}>
        <div>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "6px"
          }}>
            <span style={{ fontSize: "0.75rem", color: "var(--accent-emerald)", fontWeight: 600 }}>
              {rom.genre}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "var(--accent-amber)" }}>
              <Star size={13} fill="var(--accent-amber)" />
              <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>{rom.rating}</span>
            </div>
          </div>

          <h3 style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "4px",
            lineHeight: 1.3
          }}>
            {rom.title}
          </h3>

          <p style={{
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            marginBottom: "12px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            Original: {rom.originalTitle} ({rom.year})
          </p>

          <div style={{
            fontSize: "0.78rem",
            color: "var(--text-dark)",
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            padding: "6px 10px",
            borderRadius: "var(--radius-sm)",
            marginBottom: "16px",
            border: "1px solid rgba(255, 255, 255, 0.04)"
          }}>
            <strong style={{ color: "var(--text-muted)" }}>Tradutor:</strong> {rom.group}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px",
          marginTop: "auto"
        }}>
          <button
            className="btn-retro-secondary"
            style={{ padding: "8px 10px", fontSize: "0.8rem", justifyContent: "center" }}
            onClick={() => {
              playPowerupSound();
              onSelectRom(rom);
            }}
          >
            Ficha Detalhada
          </button>

          <button
            className="btn-retro-primary"
            style={{ padding: "8px 10px", fontSize: "0.8rem", justifyContent: "center" }}
            onClick={() => {
              playStartSound();
              onPlayRom(rom);
            }}
          >
            <Play size={13} fill="#ffffff" />
            Jogar Online
          </button>
        </div>
      </div>
    </div>
  );
}
