import type { ReactNode } from "react";

// Desktop counterpart to PhoneFrame - same light "wireframe" theme (notebook
// grid backdrop, JetBrains Mono, #334155 ink) so the two frame types read as
// one visual language, just swapping a phone bezel for a browser chrome bar.
// Used for the news article search task recreation, which was a desktop-first
// Prolific study rather than a mobile app.
export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "640px",
        margin: "0 auto",
        borderRadius: "14px",
        border: "2px solid #334155",
        overflow: "hidden",
        position: "relative",
        background: "#f8fafc",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
        fontFamily: "'JetBrains Mono', monospace",
        color: "#334155",
      }}
    >
      <div style={{ background: "#334155", padding: "10px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#eab308" }} />
          <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: "#22c55e" }} />
        </div>
        <div
          style={{
            flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: "6px",
            padding: "4px 10px", fontSize: "10px", color: "rgba(255,255,255,0.55)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}
        >
          news-search-task.study
        </div>
      </div>
      <div
        style={{
          backgroundImage: "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
