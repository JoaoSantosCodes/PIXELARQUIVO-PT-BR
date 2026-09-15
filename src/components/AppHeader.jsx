import React from "react";
import { Search, User, SlidersHorizontal, Gamepad } from "lucide-react";

export default function AppHeader({ onOpenSearch, onOpenSettings, searchActive, setSearchActive, searchTerm, setSearchTerm }) {
  return (
    <header style={{
      padding: "16px 20px 12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid var(--border-subtle)",
      backgroundColor: "rgba(12, 14, 18, 0.9)",
      backdropFilter: "blur(12px)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Identity */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{
            width: "28px",
            height: "28px",
            borderRadius: "6px",
            backgroundColor: "var(--accent-amber)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#17120d"
          }}>
            <Gamepad size={18} strokeWidth={2.5} />
          </div>
          <h1 className="font-heading" style={{
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "var(--text-primary)",
            letterSpacing: "0.5px"
          }}>
            PIXEL<span style={{ color: "var(--accent-amber)" }}>ARQUIVO</span>
          </h1>
        </div>
        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500, marginTop: "1px" }}>
          Seu arquivo. Seus clássicos.
        </p>
      </div>

      {/* Header Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button
          onClick={() => setSearchActive(!searchActive)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: searchActive ? "rgba(245, 158, 11, 0.15)" : "var(--bg-surface)",
            border: searchActive ? "1px solid var(--accent-amber)" : "1px solid var(--border-subtle)",
            color: searchActive ? "var(--accent-amber)" : "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <Search size={18} />
        </button>

        <button
          onClick={onOpenSettings}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer"
          }}
        >
          <User size={18} />
        </button>
      </div>
    </header>
  );
}
