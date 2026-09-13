import React, { useState } from "react";
import { X, Send, CheckCircle2, Upload, Gamepad2, Shield } from "lucide-react";
import { playPowerupSound } from "../utils/audio";

export default function SubmitRomModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    system: "SNES",
    translatorGroup: "",
    downloadUrl: "",
    translationProgress: "100% Traduzido",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    playPowerupSound();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        title: "",
        system: "SNES",
        translatorGroup: "",
        downloadUrl: "",
        translationProgress: "100% Traduzido",
        notes: ""
      });
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "560px",
          backgroundColor: "#0d1017",
          border: "1px solid rgba(16, 185, 129, 0.4)",
          borderRadius: "var(--radius-lg)",
          padding: "28px"
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Upload size={22} color="var(--accent-emerald)" />
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#ffffff" }}>
              Enviar ROM / Patch PT-BR
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer" }}
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "30px 10px" }}>
            <CheckCircle2 size={48} color="var(--accent-emerald)" style={{ marginBottom: "12px" }} />
            <h4 style={{ fontSize: "1.2rem", color: "#ffffff", fontWeight: 700, marginBottom: "6px" }}>
              Sugestão Recebida com Sucesso!
            </h4>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Sua sugestão de ROM PT-BR foi enviada para validação da comunidade. Obrigado por contribuir para o acervo brasileiro!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                Nome do Jogo *
              </label>
              <input
                type="text"
                required
                placeholder="Ex: Chrono Trigger, Resident Evil 2..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                  color: "#ffffff",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                  Console *
                </label>
                <select
                  value={formData.system}
                  onChange={(e) => setFormData({ ...formData, system: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-sm)",
                    color: "#ffffff",
                    fontSize: "0.9rem"
                  }}
                >
                  <option value="SNES" style={{ backgroundColor: "#12161f" }}>Super Nintendo (SNES)</option>
                  <option value="PlayStation" style={{ backgroundColor: "#12161f" }}>PlayStation 1 (PSX)</option>
                  <option value="Mega Drive" style={{ backgroundColor: "#12161f" }}>Mega Drive / Genesis</option>
                  <option value="GBA" style={{ backgroundColor: "#12161f" }}>Game Boy Advance</option>
                  <option value="Nintendo 64" style={{ backgroundColor: "#12161f" }}>Nintendo 64</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                  Grupo Tradutor / Autor
                </label>
                <input
                  type="text"
                  placeholder="Ex: Romhackers BR"
                  value={formData.translatorGroup}
                  onChange={(e) => setFormData({ ...formData, translatorGroup: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-sm)",
                    color: "#ffffff",
                    fontSize: "0.9rem"
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                Link de Download ou Patch (.ips / .bps / Drive / Mega)
              </label>
              <input
                type="url"
                required
                placeholder="https://..."
                value={formData.downloadUrl}
                onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                  color: "#ffffff",
                  fontSize: "0.9rem"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                Observações / Informações Adicionais
              </label>
              <textarea
                rows={3}
                placeholder="Detalhes sobre acentuação, dublagem ou requisitos..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                  color: "#ffffff",
                  fontSize: "0.9rem",
                  resize: "vertical"
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-retro-primary"
              style={{ justifyContent: "center", marginTop: "10px", padding: "12px" }}
            >
              <Send size={16} /> Enviar para Aprovação
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
