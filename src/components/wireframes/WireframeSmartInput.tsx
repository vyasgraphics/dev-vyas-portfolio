"use client";

import { useState } from "react";
import { PhoneFrame, WireframeIntro } from "./PhoneFrame";
import { TiltCard } from "@/components/TiltCard";

export function WireframeSmartInput({ showIntro = true }: { showIntro?: boolean }) {
  const [social, setSocial] = useState(20);
  const [connectTimetable, setConnectTimetable] = useState(true);
  const isInvisible = social < 60;

  return (
    <div>
      {showIntro && (
        <WireframeIntro
          badge="01"
          title="The &ldquo;Smart Input&rdquo; Onboarding"
          description={<><strong style={{ color: "#fff" }}>Component:</strong> Input details about attitude &amp; lifestyle.</>}
          rationale='For Liam, selecting "Solo" filters out intimidating environments immediately.'
        />
      )}
      <TiltCard maxTilt={6}>
      <PhoneFrame>
        <div style={{ padding: "24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ width: "40px", height: "40px", background: "#e2e8f0", border: "2px solid #cbd5e1", borderRadius: "8px", marginBottom: "20px" }} />
          <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "24px", lineHeight: 1.3 }}>
            Let&apos;s tailor this
            <br />
            to you.
          </h3>

          <div style={{ marginBottom: "22px", padding: "12px", borderRadius: "8px", background: "#fff", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
            <label style={{ display: "block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "#64748b", marginBottom: "10px" }}>
              1. Social Meter
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={social}
              onChange={(e) => setSocial(Number(e.target.value))}
              style={{ width: "100%", marginBottom: "6px", accentColor: "#334155" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", fontWeight: 700, color: "#94a3b8" }}>
              <span>SOLO</span>
              <span>SOCIAL</span>
            </div>
            <p
              style={{
                fontSize: "12.5px", fontWeight: 700, textAlign: "center", marginTop: "8px",
                fontFamily: "'Patrick Hand', cursive",
                color: isInvisible ? "#2563eb" : "#ea580c",
              }}
            >
              {isInvisible ? "\u201cI want to be invisible\u201d" : "\u201cReady for the gym!\u201d"}
            </p>
          </div>

          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "8px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>Connect Timetable</span>
            <button
              type="button"
              onClick={() => setConnectTimetable((v) => !v)}
              aria-pressed={connectTimetable}
              style={{
                width: "32px", height: "18px", borderRadius: "999px", border: "2px solid #334155",
                background: connectTimetable ? "#334155" : "#cbd5e1", position: "relative", cursor: "pointer", padding: 0,
                transition: "background 0.25s ease",
              }}
            >
              <span
                style={{
                  position: "absolute", top: "1px", left: connectTimetable ? "14px" : "1px",
                  width: "10px", height: "10px", borderRadius: "50%", background: "#fff",
                  transition: "left 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />
            </button>
          </div>

          <div style={{ marginTop: "auto" }}>
            <div
              style={{
                width: "100%", padding: "12px", textAlign: "center", borderRadius: "8px",
                background: "#cbd5e1", border: "2px solid #334155", color: "#0f172a",
                fontWeight: 700, fontSize: "12px", textTransform: "uppercase",
              }}
            >
              Next
            </div>
          </div>
        </div>
      </PhoneFrame>
      </TiltCard>
    </div>
  );
}
