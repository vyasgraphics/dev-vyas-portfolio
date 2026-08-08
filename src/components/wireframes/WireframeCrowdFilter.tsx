"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneFrame, WireframeIntro } from "./PhoneFrame";
import { TiltCard } from "@/components/TiltCard";

export function WireframeCrowdFilter({ showIntro = true }: { showIntro?: boolean }) {
  const [filter, setFilter] = useState<"social" | "solo">("solo");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const select = (next: "social" | "solo") => {
    setFilter(next);
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  };

  return (
    <div>
      {showIntro && (
        <WireframeIntro
          badge="B"
          title={"Setup Profile \u2014 \u201cCrowd Filter\u201d"}
          description={
            <>
              <strong style={{ color: "#fff" }}>The fix:</strong> a segmented control replaces the ambiguous toggle,
              and an explicit toast confirms what just changed. Tap Social or Solo to try it.
            </>
          }
        />
      )}
      <TiltCard maxTilt={6}>
        <PhoneFrame>
          <div style={{ padding: "24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ width: "40px", height: "40px", background: "#e2e8f0", border: "2px solid #cbd5e1", borderRadius: "8px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6h16M4 12h10M4 18h16" /><circle cx="18" cy="12" r="2" /></svg>
            </div>
            <h3 style={{ fontSize: "17px", fontWeight: 700, marginBottom: "20px", color: "#334155" }}>Setup Profile</h3>

            <div style={{ position: "relative", marginBottom: "16px", padding: "14px", borderRadius: "10px", background: "#fff", border: "2px solid #10b981", boxShadow: "0 2px 8px rgba(16,185,129,0.15)" }}>
              <span style={{ position: "absolute", top: "-10px", right: "-8px", background: "#10b981", color: "#fff", fontSize: "8px", fontWeight: 700, padding: "3px 8px", borderRadius: "999px", boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }}>
                NEW FEATURE
              </span>
              <label style={{ display: "block", fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "#1e293b", marginBottom: "10px" }}>
                Crowd Filter
              </label>
              <div style={{ display: "flex", background: "#f1f5f9", padding: "3px", borderRadius: "8px", marginBottom: "8px" }}>
                <button
                  type="button"
                  onClick={() => select("social")}
                  style={{
                    flex: 1, padding: "8px 0", textAlign: "center", fontSize: "10px", fontWeight: 700, borderRadius: "6px",
                    cursor: "pointer", transition: "all 0.2s ease",
                    background: filter === "social" ? "#fff" : "transparent",
                    color: filter === "social" ? "#ea580c" : "#94a3b8",
                    boxShadow: filter === "social" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    border: filter === "social" ? "1px solid #e2e8f0" : "1px solid transparent",
                  }}
                >
                  Social
                </button>
                <button
                  type="button"
                  onClick={() => select("solo")}
                  style={{
                    flex: 1, padding: "8px 0", textAlign: "center", fontSize: "10px", fontWeight: 700, borderRadius: "6px",
                    cursor: "pointer", transition: "all 0.2s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px",
                    background: filter === "solo" ? "#fff" : "transparent",
                    color: filter === "solo" ? "#10b981" : "#94a3b8",
                    boxShadow: filter === "solo" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                    border: filter === "solo" ? "1px solid #e2e8f0" : "1px solid transparent",
                  }}
                >
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" /></svg>
                  Solo
                </button>
              </div>
              <p style={{ fontSize: "10.5px", fontWeight: 600, color: "#64748b", textAlign: "center" }}>
                {filter === "solo" ? "\u201cI prefer privacy.\u201d" : "\u201cShow me where everyone is.\u201d"}
              </p>
            </div>

            <div
              style={{
                background: "#1e293b", color: "#fff", fontSize: "10px", fontWeight: 600, padding: "10px", borderRadius: "8px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "16px",
                opacity: toastVisible ? 1 : 0, transition: "opacity 0.3s ease", pointerEvents: "none",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2"><path d="M4 5h16l-6 8v5l-4 2v-7L4 5Z" /></svg>
              {filter === "solo" ? "Hiding busy locations\u2026" : "Showing social spots\u2026"}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: "8px", background: "#f8fafc", border: "1px solid #e2e8f0", marginBottom: "20px", opacity: 0.6 }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>Connect Timetable</span>
              <div style={{ width: "32px", height: "18px", borderRadius: "999px", background: "#10b981", position: "relative" }}>
                <span style={{ position: "absolute", top: "1px", left: "14px", width: "10px", height: "10px", borderRadius: "50%", background: "#fff" }} />
              </div>
            </div>

            <div style={{ marginTop: "auto" }}>
              <div style={{ width: "100%", padding: "12px", textAlign: "center", borderRadius: "8px", background: "#cbd5e1", border: "2px solid #334155", color: "#0f172a", fontWeight: 700, fontSize: "12px", textTransform: "uppercase" }}>
                Start App
              </div>
            </div>
          </div>
        </PhoneFrame>
      </TiltCard>
    </div>
  );
}
