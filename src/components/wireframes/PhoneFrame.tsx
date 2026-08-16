import type { ReactNode } from "react";

// Light "wireframe" phone chrome shared by all four interactive screens -
// matches the notebook-grid aesthetic of the original static mockups so
// swapping to real interactive HTML doesn't change the visual language,
// just makes it clickable.
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "300px",
        margin: "0 auto",
        aspectRatio: "320 / 620",
        borderRadius: "32px",
        border: "6px solid #334155",
        overflow: "hidden",
        position: "relative",
        background: "#f8fafc",
        backgroundImage:
          "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
        backgroundSize: "16px 16px",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'JetBrains Mono', monospace",
        color: "#334155",
      }}
    >
      {children}
    </div>
  );
}

export function WireframeIntro({
  badge,
  title,
  description,
  rationale,
}: {
  badge: string;
  title: string;
  description: ReactNode;
  rationale?: string;
}) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <span
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            minWidth: "34px", height: "26px", padding: "0 8px", borderRadius: "6px",
            background: "rgba(0,222,81,0.12)", border: "1px solid rgba(0,222,81,0.35)",
            color: "#00DE51", fontSize: "12px", fontWeight: 700, fontFamily: "monospace",
          }}
        >
          {badge}
        </span>
        {/* 16px, not the 19px this was: this is an h4 sitting under the 17px
            h3 process steps, so at 19px the deeper level was the larger one.
            16px is the only slot that works: it clears the 14.5px paragraph
            directly below (15px was tried and left a half-pixel step, which
            is no hierarchy at all) while staying under the 17px h3. Every h4
            component on the case studies uses this value, so the pages read
            on one scale: 28 / 22 / 17 / 16 / body. */}
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>{title}</h3>
      </div>
      <p style={{ fontSize: "14.5px", lineHeight: 1.6, color: "rgba(255,255,255,0.65)", marginBottom: rationale ? "14px" : 0 }}>
        {description}
      </p>
      {rationale && (
        <div style={{ background: "rgba(0,222,81,0.05)", borderLeft: "3px solid #00DE51", borderRadius: "0 8px 8px 0", padding: "10px 14px" }}>
          <p style={{ fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#00DE51", marginBottom: "4px" }}>
            Rationale
          </p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{rationale}</p>
        </div>
      )}
    </div>
  );
}
