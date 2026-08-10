import { ImageResponse } from "next/og";

export const alt = "Optmiz, automatisation et digitalisation des processus pour PME en Wallonie";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #070910 0%, #0a0d16 45%, #0f1f2a 100%)",
          color: "#f5f7ff",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 42,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#20c894",
            }}
          />
          Optmiz
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 920 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
            }}
          >
            Moins de tâches manuelles. Plus de temps utile.
          </div>
          <div style={{ fontSize: 28, color: "#b4c0d9", lineHeight: 1.35, maxWidth: 820 }}>
            Automatisation et digitalisation des processus pour PME en Wallonie.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#b4c0d9",
            fontSize: 22,
          }}
        >
          <span>Diagnostic gratuit · Prix fixe · Soignies, Belgique</span>
          <span style={{ color: "#20c894", fontWeight: 600 }}>optmiz.be</span>
        </div>
      </div>
    ),
    size,
  );
}
