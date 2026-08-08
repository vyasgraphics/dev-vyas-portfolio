import type { ReactNode } from "react";

// Desktop counterpart to PhoneFrame - same light "wireframe" theme (notebook
// grid backdrop, #334155 ink) so the two frame types read as one visual
// language, just swapping a phone bezel for a browser chrome bar. Font is
// Segoe UI/Arial/Calibri to match the real news_article_search_task.html
// exactly, rather than PhoneFrame's monospace treatment.
//
// Fixed desktop sizing throughout, deliberately not responsive on its own -
// the real news task required a laptop/desktop computer (it's in the
// consent form participants saw), so this recreation should look like an
// actual desktop webpage at every viewport, not reflow into a mobile
// layout. On narrow screens it's the caller's job to scale the whole thing
// down as a unit (see ScaleToFit), the way a phone browser shows a shrunk
// desktop site rather than a redesigned mobile one.
export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "720px",
        margin: "0 auto",
        borderRadius: "14px",
        border: "2px solid #334155",
        overflow: "hidden",
        position: "relative",
        background: "#f8fafc",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
        fontFamily: "'Segoe UI', Arial, Calibri, sans-serif",
        color: "#334155",
      }}
    >
      <div style={{ background: "#334155", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#eab308" }} />
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#22c55e" }} />
        </div>
        <div
          style={{
            flex: 1, background: "rgba(255,255,255,0.1)", borderRadius: "6px",
            padding: "5px 12px", fontSize: "12px", color: "rgba(255,255,255,0.55)",
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
