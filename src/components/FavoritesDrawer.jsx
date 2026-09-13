import React from "react";
import { X, Heart, Play, Trash2, Download, Gamepad2 } from "lucide-react";
import { playStartSound, playSelectSound } from "../utils/audio";

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  roms,
  onRemoveFavorite,
  onClearFavorites,
  onPlayRom,
  onSelectRom
}) {
  if (!isOpen) return null;

  const favoriteRoms = roms.filter((r) => favorites.includes(r.id));

  const exportFavoritesJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favoriteRoms, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "pixelarquivo_favoritos.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ justifyContent: "flex-end", padding: 0 }}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "460px",
          height: "100vh",
          backgroundColor: "#0d1017",
          borderLeft: "1px solid rgba(236, 72, 153, 0.3)",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: "-10px 0 40px rgba(0, 0, 0, 0.8)",
          animation: "slideIn 0.25s ease-out"
        }}
      >
        {/* Drawer Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border-color)",
          paddingBottom: "16px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Heart size={22} color="#ec4899" fill="#ec4899" />
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#ffffff" }}>
              Seus Favoritos <span style={{ color: "#ec4899", fontSize: "0.9rem" }}>({favoriteRoms.length})</span>
            </h3>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              padding: "4px"
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Favorite Items List */}
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "14px" }}>
          {favoriteRoms.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "var(--text-muted)"
            }}>
              <Heart size={40} color="var(--border-color)" style={{ marginBottom: "12px" }} />
              <p style={{ fontSize: "0.95rem", color: "#ffffff", fontWeight: 600, marginBottom: "4px" }}>
                Sua lista está vazia
              </p>
              <p style={{ fontSize: "0.85rem" }}>
                Clique no ícone de coração ❤️ em qualquer jogo para salvá-lo nesta lista.
              </p>
            </div>
          ) : (
            favoriteRoms.map((rom) => (
              <div
                key={rom.id}
                style={{
                  display: "flex",
                  gap: "12px",
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-md)",
                  padding: "10px",
                  alignItems: "center"
                }}
              >
                <img
                  src={rom.cover}
                  alt={rom.title}
                  style={{
                    width: "60px",
                    height: "75px",
                    objectFit: "cover",
                    borderRadius: "var(--radius-sm)"
                  }}
                />

                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "0.7rem", color: rom.systemBadgeColor, fontWeight: 700 }}>
                    {rom.system}
                  </span>
                  <h4 style={{ fontSize: "0.95rem", color: "#ffffff", fontWeight: 700, marginBottom: "2px" }}>
                    {rom.title}
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                    {rom.translationStatus}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <button
                    onClick={() => {
                      onClose();
                      playStartSound();
                      onPlayRom(rom);
                    }}
                    title="Jogar Agora"
                    style={{
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      border: "none",
                      color: "#ffffff",
                      width: "32px",
                      height: "32px",
                      borderRadius: "var(--radius-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer"
                    }}
                  >
                    <Play size={14} fill="#ffffff" />
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(rom.id)}
                    title="Remover"
                    style={{
                      background: "rgba(239, 68, 68, 0.15)",
                      border: "none",
                      color: "#ef4444",
                      width: "32px",
                      height: "32px",
                      borderRadius: "var(--radius-sm)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer"
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Actions */}
        {favoriteRoms.length > 0 && (
          <div style={{
            borderTop: "1px solid var(--border-color)",
            paddingTop: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <button
              className="btn-retro-secondary"
              onClick={exportFavoritesJson}
              style={{ justifyContent: "center" }}
            >
              <Download size={15} /> Exportar Lista em JSON
            </button>

            <button
              onClick={() => {
                if (confirm("Tem certeza que deseja limpar seus favoritos?")) {
                  onClearFavorites();
                }
              }}
              style={{
                background: "none",
                border: "none",
                color: "#ef4444",
                fontSize: "0.8rem",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              Limpar Todos os Favoritos
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
