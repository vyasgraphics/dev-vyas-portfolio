"use client";

import { useState } from "react";
import { PhoneFrame, WireframeIntro } from "./PhoneFrame";

export function WireframeGapFinder({ showIntro = true }: { showIntro?: boolean }) {
  const [added, setAdded] = useState(false);

  return (
    <div>
      {showIntro && (
        <WireframeIntro
          badge="04"
          title="The &ldquo;Gap Finder&rdquo; Scheduler"
          description={<><strong style={{ color: "#fff" }}>Component:</strong> Additional Functionality (Timetable Sync).</>}
        />
      )}
      <PhoneFrame>
        <div style={{ padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #cbd5e1" }}>
          <span style={{ fontWeight: 700, fontSize: "13px" }}>Schedule</span>
          <span style={{ fontSize: "10px", fontFamily: "monospace" }}>TUE 24 OCT</span>
        </div>
        <div style={{ padding: "14px 16px", flex: 1, overflowY: "auto", position: "relative", background: "#f8fafc" }}>
          <div style={{ position: "absolute", left: "20px", top: 0, bottom: 0, width: "1px", background: "#cbd5e1" }} />
          <div style={{ marginLeft: "22px", marginBottom: "18px" }}>
            <div style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", marginBottom: "4px" }}>09:00 - 11:00</div>
            <div style={{ border: "1px solid #cbd5e1", padding: "8px", background: "#fff", borderRadius: "6px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: "11px", fontWeight: 700 }}>Lecture: Comp Sci</span>
            </div>
          </div>
          <div style={{ marginLeft: "22px", marginBottom: "18px" }}>
            <div style={{ position: "relative", border: "2px dashed #1e293b", borderRadius: "8px", padding: "10px", background: "rgba(239,246,255,0.6)" }}>
              <span style={{ position: "absolute", top: "4px", right: "6px", fontSize: "12px" }}>&#9889;</span>
              <div style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", color: "#334155", marginBottom: "6px" }}>Smart Gap Detected</div>
              <p style={{ fontSize: "9.5px", color: "#64748b", marginBottom: "8px" }}>40 Mins Free before Seminar.</p>
              <div style={{ background: "#fff", border: "1px solid #cbd5e1", borderRadius: "5px", padding: "6px 8px", marginBottom: "8px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700 }}>Suggestion: Lake Loop</div>
                <div style={{ fontSize: "9px", color: "#94a3b8" }}>20 Mins Walk</div>
              </div>
              <button
                type="button"
                onClick={() => setAdded(true)}
                disabled={added}
                style={{
                  width: "100%", padding: "8px", borderRadius: "6px", border: "none",
                  fontSize: "9.5px", fontWeight: 700, textTransform: "uppercase", cursor: added ? "default" : "pointer",
                  background: added ? "#059669" : "#1e293b", color: "#fff", transition: "background 0.2s ease",
                }}
              >
                {added ? "\u2713 Added to Calendar" : "Fill with 20min Walk?"}
              </button>
            </div>
          </div>
          <div style={{ marginLeft: "22px" }}>
            <div style={{ fontSize: "9px", fontWeight: 700, color: "#94a3b8", marginBottom: "4px" }}>11:40 - 13:00</div>
            <div style={{ border: "1px solid #cbd5e1", padding: "8px", background: "#fff", borderRadius: "6px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: "11px", fontWeight: 700 }}>Seminar: HCI</span>
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
