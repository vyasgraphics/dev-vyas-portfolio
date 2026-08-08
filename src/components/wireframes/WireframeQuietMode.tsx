"use client";

import { useState } from "react";
import { PhoneFrame, WireframeIntro } from "./PhoneFrame";
import { TiltCard } from "@/components/TiltCard";

export function WireframeQuietMode({ showIntro = true }: { showIntro?: boolean }) {
  const [quietMode, setQuietMode] = useState(true);

  return (
    <div>
      {showIntro && (
        <WireframeIntro
          badge="02"
          title="The &ldquo;Quiet Mode&rdquo; Dashboard"
          description={
            <>
              <strong style={{ color: "#fff" }}>Component:</strong> Tailored Recommendations. Click the panel below to
              simulate toggling <strong style={{ color: "#fff" }}>&ldquo;Quiet Mode&rdquo;</strong> on and off.
            </>
          }
        />
      )}
      <TiltCard maxTilt={6}>
      <PhoneFrame>
        <div style={{ padding: "16px 16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #cbd5e1", paddingBottom: "12px" }}>
          <span style={{ fontWeight: 700, fontSize: "13px" }}>Home</span>
          <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#e2e8f0", border: "1px solid #cbd5e1" }} />
        </div>
        <div style={{ padding: "14px 16px", flex: 1, overflowY: "auto", background: "rgba(255,255,255,0.5)" }}>
          <p style={{ fontSize: "13px", fontWeight: 700, marginBottom: "14px" }}>Good Morning, Liam.</p>
          <button
            type="button"
            onClick={() => setQuietMode((v) => !v)}
            style={{
              width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
              border: "2px solid #1e293b", borderRadius: "6px", padding: "10px 12px", marginBottom: "18px",
              background: "#fff", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.08)", textAlign: "left",
            }}
          >
            <div>
              <div style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", color: "#94a3b8" }}>Mode</div>
              <div style={{ fontSize: "13px", fontWeight: 700 }}>QUIET MODE</div>
            </div>
            <span
              style={{
                fontSize: "10px", fontWeight: 700, padding: "4px 8px", borderRadius: "4px",
                background: quietMode ? "#1e293b" : "#e2e8f0", color: quietMode ? "#fff" : "#64748b",
                transition: "all 0.2s ease",
              }}
            >
              {quietMode ? "ON" : "OFF"}
            </span>
          </button>

          <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "#94a3b8", marginBottom: "8px" }}>
            Recommendations
          </p>

          {quietMode ? (
            <div style={{ border: "2px solid #cbd5e1", borderRadius: "8px", padding: "8px", background: "#fff", marginBottom: "10px" }}>
              <div style={{ height: "68px", borderRadius: "4px", background: "#f1f5f9", border: "1px dashed #cbd5e1", marginBottom: "6px", position: "relative" }}>
                <span style={{ position: "absolute", bottom: "3px", right: "4px", fontSize: "8px", fontFamily: "'Patrick Hand', cursive", background: "rgba(255,255,255,0.8)", padding: "0 3px", borderRadius: "3px" }}>1.2km away</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: "12px" }}>Hidden Library Walk</div>
              <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                <span style={{ fontSize: "8px", border: "1px solid #cbd5e1", padding: "1px 4px", borderRadius: "3px" }}>NATURE</span>
                <span style={{ fontSize: "8px", border: "1px solid #bfdbfe", background: "#eff6ff", color: "#1e40af", padding: "1px 4px", borderRadius: "3px" }}>QUIET</span>
              </div>
            </div>
          ) : (
            <div style={{ border: "2px solid #cbd5e1", borderRadius: "8px", padding: "8px", background: "#fff", marginBottom: "10px" }}>
              <div style={{ height: "68px", borderRadius: "4px", background: "#f1f5f9", border: "1px dashed #cbd5e1", marginBottom: "6px", position: "relative" }}>
                <span style={{ position: "absolute", bottom: "3px", right: "4px", fontSize: "8px", fontFamily: "'Patrick Hand', cursive", background: "rgba(255,255,255,0.8)", padding: "0 3px", borderRadius: "3px" }}>0.5km away</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: "12px" }}>Campus Gym</div>
              <div style={{ display: "flex", gap: "5px", marginTop: "5px" }}>
                <span style={{ fontSize: "8px", border: "1px solid #fed7aa", background: "#fff7ed", color: "#c2410c", padding: "1px 4px", borderRadius: "3px" }}>POPULAR</span>
              </div>
            </div>
          )}
          <div style={{ border: "2px solid #e2e8f0", borderRadius: "8px", padding: "8px", background: "#fff", opacity: 0.5 }}>
            <div style={{ height: "44px", borderRadius: "4px", background: "#f1f5f9", marginBottom: "6px" }} />
            <div style={{ fontWeight: 700, fontSize: "12px" }}>{quietMode ? "Room 102 (Empty)" : "Hidden Library"}</div>
          </div>
        </div>
        <div style={{ height: "40px", borderTop: "2px solid #cbd5e1", background: "#fff", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", alignItems: "center" }}>
          {["home", "calendar", "compass", "user"].map((icon, i) => (
            <div key={icon} style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "14px", height: "14px", borderRadius: i === 0 ? "3px" : "50%", border: `1.5px solid ${i === 0 ? "#1e40af" : "#94a3b8"}` }} />
            </div>
          ))}
        </div>
      </PhoneFrame>
      </TiltCard>
    </div>
  );
}
