import React from "react";
import { Gamepad2, Heart, Shield, Sparkles, Code2, Globe } from "lucide-react";

export default function Footer({ totalRomsCount }) {
  return (
    <footer style={{
      marginTop: "60px",
      backgroundColor: "rgba(10, 12, 16, 0.95)",
      borderTop: "1px solid var(--border-color)",
      padding: "40px 24px 24px 24px"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "32px",
        marginBottom: "40px"
      }}>
        
        {/* Column 1: Brand Info */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <Gamepad2 size={20} color="#ffffff" />
            </div>
            <span className="font-pixel" style={{ fontSize: "1rem", color: "#ffffff" }}>
              PIXEL<span style={{ color: "var(--accent-emerald)" }}>ARQUIVO</span>
            </span>
          </div>

          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "16px" }}>
            Plataforma dedicada à preservação e catalogação da história dos jogos retro traduzidos em Português do Brasil.
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <a
              href="https://github.com/XJhonnyBRX/roms-catalogo-brasileiro"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-retro-secondary"
              style={{ padding: "6px 12px", fontSize: "0.8rem", textDecoration: "none" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg> Repositório GitHub
            </a>
          </div>
        </div>

        {/* Column 2: Stats Counter */}
        <div>
          <h4 style={{ fontSize: "0.95rem", color: "#ffffff", fontWeight: 700, marginBottom: "14px" }}>
            Estatísticas do Acervo
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "6px" }}>
              <span>ROMs Catalogadas PT-BR:</span>
              <strong style={{ color: "var(--accent-emerald)" }}>{totalRomsCount} Jogos</strong>
            </li>
            <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "6px" }}>
              <span>Consoles Mapeados:</span>
              <strong style={{ color: "var(--accent-cyan)" }}>6 Plataformas</strong>
            </li>
            <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "6px" }}>
              <span>Grupos de Romhacking:</span>
              <strong style={{ color: "var(--accent-magenta)" }}>12+ Equipes</strong>
            </li>
            <li style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Licença:</span>
              <strong style={{ color: "#ffffff" }}>Open Source / Fan-Made</strong>
            </li>
          </ul>
        </div>

        {/* Column 3: Romhacking Groups Homage */}
        <div>
          <h4 style={{ fontSize: "0.95rem", color: "#ffffff", fontWeight: 700, marginBottom: "14px" }}>
            Homenagem aos Tradutores
          </h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "10px" }}>
            Créditos especiais aos grupos de romhacking brasileira como <i>Monkey's Traduções, PO.BOX, Trans-Center, Romhackers BR, Tectoy, Sonic PTBR</i> e todos os autores independentes.
          </p>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        paddingTop: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "0.8rem",
        color: "var(--text-dark)",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        <div>
          © {new Date().getFullYear()} PixelArquivo • Preservação do Retrogaming Nacional.
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          Feito com <Heart size={14} color="#ec4899" fill="#ec4899" /> para a comunidade retrogamer do Brasil.
        </div>
      </div>
    </footer>
  );
}
