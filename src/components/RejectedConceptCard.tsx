import type { RejectedConcept } from "@/data/rejectedConcepts";

function PanelIcon({ type }: { type: RejectedConcept["panels"][number]["icon"] }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (type) {
    case "trigger":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" {...stroke} style={{ color: "#34d399" }}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 14c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8" />
          <path d="M9 9.5h.01M15 9.5h.01" strokeWidth="2.4" />
        </svg>
      );
    case "reaction":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" {...stroke} style={{ color: "#f87171" }}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 16c1-1.2 2.2-1.8 3.5-1.8s2.5.6 3.5 1.8" />
          <path d="M9 9.5h.01M15 9.5h.01" strokeWidth="2.4" />
        </svg>
      );
    case "rejection-trash":
      return (
        <svg width="30" height="30" viewBox="0 0 24 24" {...stroke} style={{ color: "#94a3b8" }}>
          <path d="M4 7h16M9 7V4.8c0-.4.4-.8.9-.8h4.2c.5 0 .9.4.9.8V7M6.5 7l.7 12.2c0 .9.8 1.6 1.7 1.6h6.2c.9 0 1.7-.7 1.7-1.6L17.5 7" />
        </svg>
      );
    case "opportunity":
      return (
        <svg width="32" height="32" viewBox="0 0 24 24" {...stroke} style={{ color: "#cbd5e1" }}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "friction":
      return (
        <svg width="30" height="30" viewBox="0 0 24 24" {...stroke} style={{ color: "#fb923c" }}>
          <circle cx="10" cy="8" r="3.2" />
          <path d="M4.5 19c0-3 2.5-5.3 5.5-5.3M17 8l4 4M21 8l-4 4" />
        </svg>
      );
    case "rejection-coffee":
      return (
        <svg width="30" height="30" viewBox="0 0 24 24" {...stroke} style={{ color: "#94a3b8" }}>
          <path d="M5 9h11v5.5A3.5 3.5 0 0 1 12.5 18h-4A3.5 3.5 0 0 1 5 14.5V9Z" />
          <path d="M16 10.5h1.5a2 2 0 0 1 0 4H16" />
          <path d="M8 6.3c0-.7.9-1 .9-1.8M12 6.3c0-.7.9-1 .9-1.8" />
        </svg>
      );
    default:
      return null;
  }
}

function LeaderboardMock() {
  return (
    <div style={{ width: "100%", background: "#fff", borderRadius: "6px", padding: "6px 8px", fontSize: "8px", lineHeight: 1.3, color: "#1e293b" }}>
      <div style={{ fontWeight: 700, borderBottom: "1px solid #e2e8f0", paddingBottom: "3px", marginBottom: "3px" }}>LEADERBOARD</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}><span>1. Alex</span><span>15k</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", background: "#fee2e2", fontWeight: 700, padding: "1px 3px", borderRadius: "3px" }}><span>142. YOU</span><span>800</span></div>
    </div>
  );
}

function FormMock() {
  return (
    <div style={{ width: "100%", background: "#fff", borderRadius: "6px", padding: "6px 8px", fontSize: "8px", lineHeight: 1.3, color: "#1e293b", display: "flex", flexDirection: "column", gap: "3px" }}>
      <div style={{ fontWeight: 700 }}>LOG AVAILABILITY</div>
      <div style={{ border: "1px solid #cbd5e1", borderRadius: "4px", padding: "2px 5px", color: "#94a3b8" }}>Start...</div>
      <div style={{ border: "1px solid #cbd5e1", borderRadius: "4px", padding: "2px 5px", color: "#94a3b8" }}>End...</div>
    </div>
  );
}

export function RejectedConceptCard({ concept }: { concept: RejectedConcept }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
        <div
          style={{
            width: "40px", height: "40px", borderRadius: "50%", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: concept.accentSoft, color: concept.accent,
            border: `1px solid ${concept.accent}55`, fontWeight: 700, fontSize: "16px",
          }}
        >
          {concept.number}
        </div>
        <div>
          {/* 16px to sit under the 17px h3 tier - see PhoneFrame.tsx */}
          <h4 style={{ fontSize: "16px", fontWeight: 700, color: "#00DE51", marginBottom: "4px" }}>{concept.title}</h4>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
            Target: {concept.target} | Conflict: {concept.conflict}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "24px" }} className="rejected-grid">
        <div
          style={{
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px", padding: "28px",
          }}
        >
          <h5 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: concept.accent, marginBottom: "16px" }}>
            Why it was rejected
          </h5>
          <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.8)", marginBottom: "12px" }}>
            <strong style={{ color: "#fff" }}>Initial Hypothesis:</strong> {concept.hypothesis}
          </p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
            {concept.dataPoints.map((dp, i) => (
              <li key={i} style={{ fontSize: "13.5px", lineHeight: 1.6, color: "rgba(255,255,255,0.7)", paddingLeft: "16px", position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: concept.accent }}>&bull;</span>
                <strong style={{ color: "#fff" }}>Data Point {i + 1}:</strong> {dp}
              </li>
            ))}
          </ul>
          <div style={{ background: `${concept.accent}14`, borderLeft: `3px solid ${concept.accent}`, padding: "10px 14px", borderRadius: "0 8px 8px 0" }}>
            <p style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.85)" }}>
              <strong style={{ color: "#fff" }}>Conclusion:</strong> {concept.conclusionText}
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          {concept.panels.map((p) => (
            <div
              key={p.label}
              style={{
                background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.15)",
                borderRadius: "12px", padding: "10px", display: "flex", flexDirection: "column",
              }}
            >
              <div style={{ fontSize: "9px", fontFamily: "monospace", color: "rgba(255,255,255,0.4)", marginBottom: "8px" }}>{p.label.toUpperCase()}</div>
              <div style={{ minHeight: "72px", background: "rgba(255,255,255,0.03)", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "8px", padding: "8px", overflow: "hidden" }}>
                {p.icon === "feature-leaderboard" ? <LeaderboardMock /> : p.icon === "feature-form" ? <FormMock /> : <PanelIcon type={p.icon} />}
              </div>
              <p style={{ fontSize: "10.5px", color: "rgba(255,255,255,0.45)", lineHeight: 1.4 }}>{p.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
