"use client";

import { useState } from "react";
import { WireframeIntro } from "./PhoneFrame";
import { TiltCard } from "@/components/TiltCard";

// Illustrates the working-memory measure used alongside the news task - an
// original diagram built for this site, not a screenshot of the validated
// instrument itself (the real circles test belongs to McNab et al., 2015 /
// the supervising lab's own platform). Sixteen-cell grid: four fixed
// "target" positions, four "distractor" positions. Toggling between the two
// conditions shows the one dimension the whole study turns on - whether the
// distractor appears at the same time as the thing you're memorising, or
// only once it's already gone and you're just holding onto it.
const TARGET_CELLS = new Set([1, 4, 10, 13]);
const DISTRACTOR_CELLS = new Set([3, 6, 9, 12]);

export function WireframeCirclesTest({
  showIntro = true,
  badge = "02",
  title = "Measuring distraction resistance",
  description = (
    <>
      <strong style={{ color: "#fff" }}>Component:</strong> the working-memory measure participants completed
      alongside the search task. Toggle to see the one thing that distinguishes the two scores.
    </>
  ),
}: {
  showIntro?: boolean;
  badge?: string;
  title?: string;
  description?: React.ReactNode;
}) {
  const [mode, setMode] = useState<"encoding" | "delay">("encoding");

  return (
    <div>
      {showIntro && <WireframeIntro badge={badge} title={title} description={description} />}
      <TiltCard maxTilt={5}>
        <div
          style={{
            width: "100%",
            maxWidth: "440px",
            margin: "0 auto",
            borderRadius: "14px",
            border: "2px solid #334155",
            overflow: "hidden",
            background: "#f8fafc",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#334155",
            padding: "20px",
          }}
        >
          <div style={{ display: "flex", background: "#e2e8f0", padding: "3px", borderRadius: "8px", marginBottom: "18px" }}>
            {(["encoding", "delay"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                style={{
                  flex: 1, padding: "8px 0", textAlign: "center", fontSize: "10.5px", fontWeight: 700, borderRadius: "6px",
                  cursor: "pointer", transition: "all 0.2s ease",
                  background: mode === m ? "#fff" : "transparent",
                  color: mode === m ? "#1e293b" : "#94a3b8",
                  boxShadow: mode === m ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
                  border: "none",
                }}
              >
                {m === "encoding" ? "Encoding-stage" : "Delay-stage"}
              </button>
            ))}
          </div>

          <div
            style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px",
              maxWidth: "220px", margin: "0 auto 18px",
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => {
              const isTarget = TARGET_CELLS.has(i);
              const isDistractor = DISTRACTOR_CELLS.has(i);
              let style: React.CSSProperties = {
                width: "100%", aspectRatio: "1", borderRadius: "50%",
                transition: "background 0.3s ease, border-color 0.3s ease, opacity 0.3s ease",
              };
              if (isTarget) {
                style = mode === "encoding"
                  ? { ...style, background: "#ef4444", border: "2px solid #ef4444" }
                  : { ...style, background: "transparent", border: "2px dashed #cbd5e1" };
              } else if (isDistractor) {
                style = { ...style, background: "#eab308", border: "2px solid #eab308" };
              } else {
                style = { ...style, background: "transparent", border: "2px solid #e2e8f0" };
              }
              return <div key={i} style={style} />;
            })}
          </div>

          <p style={{ fontSize: "11.5px", lineHeight: 1.55, color: "#475569", textAlign: "center", margin: 0 }}>
            {mode === "encoding" ? (
              <>
                <strong style={{ color: "#1e293b" }}>Encoding distraction (ED):</strong>{" "}
                yellow distractors appear at the same time as the red shapes you&apos;re trying to remember.
              </>
            ) : (
              <>
                <strong style={{ color: "#1e293b" }}>Delay distraction (DD):</strong>{" "}
                the shapes are gone, held only in memory, when yellow distractors appear during the wait before
                recall.
              </>
            )}
          </p>
        </div>
      </TiltCard>
    </div>
  );
}
