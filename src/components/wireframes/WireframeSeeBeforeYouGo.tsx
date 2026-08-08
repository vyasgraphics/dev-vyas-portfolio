"use client";

import { useState } from "react";
import { PhoneFrame, WireframeIntro } from "./PhoneFrame";

export function WireframeSeeBeforeYouGo({ showIntro = true }: { showIntro?: boolean }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      {showIntro && (
        <WireframeIntro
          badge="03"
          title="The &ldquo;See Before You Go&rdquo; Detail"
          description={
            <>
              <strong style={{ color: "#fff" }}>Component:</strong> Non-Gamified Encouragement. Tap the preview to see
              it in action.
            </>
          }
        />
      )}
      <PhoneFrame>
        <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #e2e8f0" }}>
          <span style={{ fontSize: "13px" }}>&larr;</span>
          <span style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase" }}>Back</span>
        </div>
        <div style={{ padding: "18px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}>Hidden Library Walk</h3>

          <button
            type="button"
            onClick={() => setPlaying(true)}
            style={{
              position: "relative", width: "100%", height: "128px", borderRadius: "6px",
              background: "#1e293b", border: playing ? "2px solid #ef4444" : "2px dashed #94a3b8",
              marginBottom: "8px", cursor: playing ? "default" : "pointer", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {playing ? (
              <span style={{ fontFamily: "monospace", fontSize: "10px", color: "#f87171", fontWeight: 700, animation: "pulse 1.4s ease-in-out infinite" }}>
                &#9679; RECORDING (PREVIEW)
              </span>
            ) : (
              <span
                style={{
                  width: "40px", height: "40px", borderRadius: "50%", border: "2px solid #fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <span style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: "10px solid #fff", marginLeft: "2px" }} />
              </span>
            )}
            <span style={{ position: "absolute", bottom: "6px", left: "8px", fontSize: "8px", fontFamily: "monospace", background: "#000", color: "#fff", padding: "1px 5px" }}>
              10S PREVIEW
            </span>
          </button>
          <p style={{ fontSize: "10px", textAlign: "center", color: "#ef4444", fontFamily: "'Patrick Hand', cursive", marginBottom: "18px" }}>
            {playing ? "" : "Overlay: \u201cWatch 10s preview\u201d"}
          </p>

          <div style={{ padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "6px", background: "#f8fafc", marginBottom: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "10px", fontWeight: 700, marginBottom: "6px" }}>
              <span>CROWD METER</span>
              <span style={{ color: "#ef4444" }}>&#9679; LIVE</span>
            </div>
            <div style={{ height: "10px", border: "1px solid #1e293b", background: "#fff", padding: "1px" }}>
              <div style={{ height: "100%", width: "20%", background: "#1e293b" }} />
            </div>
            <p style={{ fontSize: "11px", fontStyle: "italic", color: "#475569", marginTop: "8px" }}>
              &ldquo;Very Quiet - Only 2 people here&rdquo;
            </p>
          </div>

          <div style={{ marginTop: "auto" }}>
            <div style={{ width: "100%", padding: "12px", textAlign: "center", borderRadius: "8px", background: "#cbd5e1", border: "2px solid #334155", color: "#0f172a", fontWeight: 700, fontSize: "12px", textTransform: "uppercase" }}>
              Schedule This
            </div>
          </div>
        </div>
      </PhoneFrame>
    </div>
  );
}
