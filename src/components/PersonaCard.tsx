import { TiltCard } from "@/components/TiltCard";
import type { Persona } from "@/data/personas";

// TiltCard's parallax layers are tuned via --layer-depth/--layer-shift CSS
// custom properties (read by the .tilt-layer rule in styles.css) - this
// alias just lets TS accept them in a style object alongside normal props.
type StyleWithVars = React.CSSProperties & Record<`--${string}`, string>;

const ICONS: Record<Persona["demographics"][number]["icon"], React.ReactNode> = {
  age: (
    <path d="M4 21h16M5 21v-6.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2V21M8 12.5V9M16 12.5V9M12 12.5V6M12 6c-1.1 0-1.9-.7-1.9-1.6 0-.9.6-1.6 1.9-2.9 1.3 1.3 1.9 2 1.9 2.9 0 .9-.8 1.6-1.9 1.6Z" />
  ),
  gender: <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 13v8M9 18h6" />,
  location: (
    <path d="M12 21s7-6.1 7-11.2A7 7 0 0 0 5 9.8C5 14.9 12 21 12 21ZM12 12a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" />
  ),
  education: (
    <path d="M2 8.5 12 4l10 4.5-10 4.5-10-4.5ZM6 10.8v4.6c0 1 2.7 2.6 6 2.6s6-1.6 6-2.6v-4.6M20 9v6.5" />
  ),
  work: (
    <path d="M4 8.5h16a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a1 1 0 0 1 1-1ZM9 8.5V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2.5M3 13h18" />
  ),
};

function DemoIcon({ type }: { type: Persona["demographics"][number]["icon"] }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      {ICONS[type]}
    </svg>
  );
}

export function PersonaCard({ persona }: { persona: Persona }) {
  return (
    <TiltCard
      maxTilt={7}
      style={{
        background: "linear-gradient(155deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015))",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "24px",
        boxShadow: "0 40px 70px -30px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,222,81,0.05)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="tilt-glare" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      <div style={{ position: "relative", padding: "clamp(24px, 4vw, 40px)" }}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
          <div
            className="tilt-layer"
            style={{
              "--layer-depth": "50px",
              "--layer-shift": "18px",
              width: "76px",
              height: "76px",
              borderRadius: "18px",
              overflow: "hidden",
              flexShrink: 0,
              background: "rgba(0,222,81,0.08)",
              border: "1px solid rgba(0,222,81,0.25)",
              boxShadow: "0 12px 24px -8px rgba(0,222,81,0.25)",
            } as StyleWithVars}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={persona.avatar} alt={`${persona.name} illustrated portrait`} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }} />
          </div>
          <div>
            <h4 style={{ fontSize: "clamp(20px, 2vw + 10px, 26px)", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>
              {persona.name}
            </h4>
            <span
              style={{
                display: "inline-block",
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "5px 12px", borderRadius: "100px",
                background: "rgba(0,222,81,0.12)", border: "1px solid rgba(0,222,81,0.35)",
                color: "var(--primary)",
              }}
            >
              {persona.role}
            </span>
          </div>
        </div>

        {/* quote */}
        <div
          className="tilt-layer"
          style={{
            "--layer-depth": "24px",
            "--layer-shift": "6px",
            position: "relative",
            padding: "18px 20px 18px 24px",
            marginBottom: "24px",
            borderLeft: "2px solid var(--primary)",
            background: "rgba(255,255,255,0.025)",
            borderRadius: "0 12px 12px 0",
          } as StyleWithVars}
        >
          <p style={{ fontSize: "15px", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", fontStyle: "italic", margin: 0 }}>
            &ldquo;{persona.quote}&rdquo;
          </p>
        </div>

        {/* bio */}
        <p style={{ fontSize: "14.5px", lineHeight: 1.7, color: "rgba(255,255,255,0.62)", marginBottom: "28px" }}>
          {persona.bio}
        </p>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />

        {/* goals */}
        <div style={{ marginBottom: "24px" }}>
          <h5 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
            Goals
          </h5>
          <ul style={{ display: "flex", flexDirection: "column", gap: "9px", listStyle: "none", margin: 0, padding: 0 }}>
            {persona.goals.map((g) => (
              <li key={g} style={{ display: "flex", gap: "10px", fontSize: "14px", lineHeight: 1.5, color: "rgba(255,255,255,0.75)", marginBottom: 0 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: "3px" }}>
                  <circle cx="12" cy="12" r="10" stroke="var(--primary)" strokeWidth="1.6" opacity="0.4" />
                  <path d="M8 12.5l2.5 2.5L16 9.5" stroke="var(--primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />

        {/* demographics + frustrations */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          <div>
            <h5 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
              Demographics
            </h5>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", margin: 0, padding: 0 }}>
              {persona.demographics.map((d) => (
                <li key={d.label} style={{ display: "flex", gap: "9px", alignItems: "flex-start", fontSize: "13px", lineHeight: 1.4, color: "rgba(255,255,255,0.7)", marginBottom: 0 }}>
                  <DemoIcon type={d.icon} />
                  <span>{d.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>
              Frustrations
            </h5>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", listStyle: "none", margin: 0, padding: 0 }}>
              {persona.frustrations.map((f) => (
                <li key={f.label} style={{ fontSize: "13px", lineHeight: 1.5, color: "rgba(255,255,255,0.7)", marginBottom: 0 }}>
                  <strong style={{ color: "#fff", fontWeight: 600 }}>{f.label}: </strong>
                  {f.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* core needs / evidence footer */}
        <div
          style={{
            background: "rgba(0,222,81,0.05)",
            border: "1px solid rgba(0,222,81,0.18)",
            borderRadius: "14px",
            padding: "16px 18px",
          }}
        >
          <p style={{ fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.75)", marginBottom: "10px" }}>
            <strong style={{ color: "#fff", fontWeight: 600 }}>Core needs: </strong>
            {persona.coreNeeds}
          </p>
          <p style={{ fontSize: "12px", lineHeight: 1.6, color: "rgba(255,255,255,0.5)", margin: 0 }}>
            <strong style={{ color: "var(--primary)", fontWeight: 600 }}>Data evidence: </strong>
            {persona.dataEvidence}
          </p>
        </div>
      </div>
    </TiltCard>
  );
}
