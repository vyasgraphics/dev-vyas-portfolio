import type { Scenario } from "@/data/scenarios";

function ProblemVisual({ scenario }: { scenario: Scenario }) {
  if (scenario.problem.icon === "anxiety") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(248,113,113,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.6">
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" />
          </svg>
        </div>
        {scenario.problem.badge && (
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.04em", color: "#fca5a5", background: "rgba(248,113,113,0.12)", border: "1px solid rgba(248,113,113,0.3)", padding: "3px 8px", borderRadius: "100px" }}>
            {scenario.problem.badge}
          </span>
        )}
      </div>
    );
  }
  return (
    <div style={{ position: "relative" }}>
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.4">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4" />
        <path d="M9 14l6 4M15 14l-6 4" stroke="rgba(255,255,255,0.35)" />
      </svg>
      <div style={{ position: "absolute", top: "-6px", right: "-6px", width: "20px", height: "20px", borderRadius: "50%", background: "#fb923c", color: "#fff", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
        ?
      </div>
    </div>
  );
}

function SolutionVisual({ scenario }: { scenario: Scenario }) {
  if (scenario.solution.icon === "video") {
    return (
      <div style={{ width: "88px", background: "#0f172a", border: "3px solid #334155", borderRadius: "12px", overflow: "hidden", boxShadow: "0 12px 24px rgba(0,0,0,0.4)" }}>
        <div style={{ height: "56px", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="12" r="11" fill="none" stroke="#fff" strokeWidth="1.6" /><path d="M10 8.5l6 3.5-6 3.5v-7Z" /></svg>
        </div>
        <div style={{ background: "#fff", padding: "6px" }}>
          <div style={{ height: "3px", width: "70%", background: "#e2e8f0", borderRadius: "2px", marginBottom: "4px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
            <div style={{ width: "26px", height: "6px", background: "#dcfce7", border: "1px solid #86efac", borderRadius: "2px" }} />
            <span style={{ fontSize: "5px", color: "#16a34a", fontWeight: 700 }}>{scenario.solution.caption}</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "10px 12px", display: "flex", gap: "8px", alignItems: "flex-start", maxWidth: "220px" }}>
      <div style={{ background: "rgba(16,185,129,0.15)", borderRadius: "6px", padding: "5px", flexShrink: 0 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></svg>
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>Gap Detected (2 hrs)</p>
        <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>You have time for &lsquo;Campus East Loop&rsquo; (20 mins).</p>
      </div>
    </div>
  );
}

export function ScenarioCard({ scenario }: { scenario: Scenario }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
        <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: scenario.color, color: "#fff", fontWeight: 700, fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {scenario.letter}
        </div>
        <div>
          {/* 16px to sit under the 17px h3 tier - see PhoneFrame.tsx */}
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>{scenario.title}</h3>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{scenario.subtitle}</p>
        </div>
      </div>

      <div className="scenario-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[scenario.problem, scenario.solution].map((half, i) => (
          <div key={half.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", overflow: "hidden" }}>
            <div style={{ height: "140px", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              {i === 0 ? <ProblemVisual scenario={scenario} /> : <SolutionVisual scenario={scenario} />}
            </div>
            <div style={{ padding: "18px" }}>
              <h4 style={{ fontSize: "14px", fontWeight: 700, color: i === 0 ? "#f87171" : "#60a5fa", marginBottom: "8px" }}>{half.label}</h4>
              <p style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.75)", marginBottom: "10px" }}>
                <strong style={{ color: "#fff" }}>Context:</strong> {half.context}
              </p>
              <p style={{ fontSize: "12.5px", lineHeight: 1.5, color: "rgba(255,255,255,0.55)", fontStyle: "italic", borderLeft: `2px solid ${i === 0 ? "rgba(248,113,113,0.4)" : "rgba(96,165,250,0.4)"}`, paddingLeft: "10px" }}>
                <strong style={{ fontStyle: "normal", color: "rgba(255,255,255,0.7)" }}>Outcome:</strong> {half.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
