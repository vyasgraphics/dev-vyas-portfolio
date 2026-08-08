"use client";

import { useState } from "react";
import { WireframeIntro } from "./PhoneFrame";
import { TiltCard } from "@/components/TiltCard";

// Illustrates the working-memory measure used alongside the news task - an
// original diagram built for this site, not a screenshot of the validated
// instrument itself (the real circles test belongs to McNab et al., 2015 /
// the supervising lab's own platform). Follows the real trial structure
// directly: a 4x4 grid, two red target rings to remember, and - depending
// on condition - two yellow distractor rings appearing either alongside the
// targets (encoding-stage) or only after the targets have disappeared,
// during the wait before recall (delay-stage). No Distraction is the
// baseline with no yellow rings at all.
const TARGET_CELLS = new Set([1, 9]);
const DISTRACTOR_CELLS = new Set([4, 11]);

type Condition = "none" | "encoding" | "delay";

const CONDITIONS: { key: Condition; label: string }[] = [
  { key: "none", label: "No Distraction" },
  { key: "encoding", label: "Encoding" },
  { key: "delay", label: "Delay" },
];

// Each condition is a sequence of panels - what's visible on screen, a
// caption above (only the first and last panel carry one, matching the
// real task), and a timing label below (only the Delay condition marks
// timing explicitly, again matching the real figure).
const PANELS: Record<Condition, { target: boolean; distractor: boolean; caption: string; timing: string }[]> = {
  none: [
    { target: true, distractor: false, caption: "Remember the rings", timing: "" },
    { target: false, distractor: false, caption: "", timing: "" },
    { target: false, distractor: false, caption: "Click the 2 rings", timing: "" },
  ],
  encoding: [
    { target: true, distractor: true, caption: "Remember the rings", timing: "" },
    { target: false, distractor: false, caption: "", timing: "" },
    { target: false, distractor: false, caption: "Click the 2 rings", timing: "" },
  ],
  delay: [
    { target: true, distractor: false, caption: "Remember the rings", timing: "1 second" },
    { target: false, distractor: true, caption: "", timing: "1 second" },
    { target: false, distractor: false, caption: "Click the 2 rings", timing: "Until response" },
  ],
};

function MiniGrid({ target, distractor }: { target: boolean; distractor: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 15px)", gap: "2px" }}>
      {Array.from({ length: 16 }).map((_, i) => {
        const isTarget = target && TARGET_CELLS.has(i);
        const isDistractor = distractor && DISTRACTOR_CELLS.has(i);
        return (
          <div
            key={i}
            style={{
              width: "15px", height: "15px", border: "1px solid #cbd5e1", background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {(isTarget || isDistractor) && (
              <div
                style={{
                  width: "9px", height: "9px", borderRadius: "50%",
                  border: `2px solid ${isTarget ? "#ef4444" : "#eab308"}`,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function WireframeCirclesTest({
  showIntro = true,
  badge = "02",
  title = "Measuring distraction resistance",
  description = (
    <>
      <strong style={{ color: "#fff" }}>Component:</strong>{" "}
      the working-memory measure participants completed alongside the search task, adapted from a validated
      circles test. Toggle between the three trial types below.
    </>
  ),
}: {
  showIntro?: boolean;
  badge?: string;
  title?: string;
  description?: React.ReactNode;
}) {
  const [condition, setCondition] = useState<Condition>("encoding");
  const panels = PANELS[condition];

  return (
    <div>
      {showIntro && <WireframeIntro badge={badge} title={title} description={description} />}
      <TiltCard maxTilt={5}>
        <div
          style={{
            width: "100%",
            maxWidth: "520px",
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
          <div style={{ display: "flex", background: "#e2e8f0", padding: "3px", borderRadius: "8px", marginBottom: "20px" }}>
            {CONDITIONS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCondition(c.key)}
                style={{
                  flex: 1, padding: "8px 4px", textAlign: "center", fontSize: "10.5px", fontWeight: 700, borderRadius: "6px",
                  cursor: "pointer", transition: "all 0.2s ease",
                  background: condition === c.key ? "#fff" : "transparent",
                  color: condition === c.key ? "#1e293b" : "#94a3b8",
                  boxShadow: condition === c.key ? "0 1px 3px rgba(0,0,0,0.12)" : "none",
                  border: "none",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "22px", marginBottom: "16px" }}>
            {panels.map((panel, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ height: "26px", display: "flex", alignItems: "flex-end", marginBottom: "8px" }}>
                  <p style={{ fontSize: "8.5px", fontWeight: 700, color: "#64748b", textAlign: "center", lineHeight: 1.3, margin: 0, maxWidth: "68px" }}>
                    {panel.caption}
                  </p>
                </div>
                <MiniGrid target={panel.target} distractor={panel.distractor} />
                <div style={{ height: "16px", marginTop: "6px" }}>
                  {panel.timing && (
                    <p style={{ fontSize: "8px", fontWeight: 600, color: "#94a3b8", margin: 0, fontStyle: "italic" }}>
                      {panel.timing}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "11.5px", lineHeight: 1.55, color: "#475569", textAlign: "center", margin: 0 }}>
            {condition === "none" && (
              <>
                <strong style={{ color: "#1e293b" }}>No Distraction (ND):</strong>{" "}
                the baseline. Just two rings to hold in mind, nothing competing for attention.
              </>
            )}
            {condition === "encoding" && (
              <>
                <strong style={{ color: "#1e293b" }}>Encoding distraction (ED):</strong>{" "}
                yellow rings appear at the same time as the red ones you&apos;re trying to remember.
              </>
            )}
            {condition === "delay" && (
              <>
                <strong style={{ color: "#1e293b" }}>Delay distraction (DD):</strong>{" "}
                the red rings are gone, held only in memory, when yellow rings appear during the wait before
                recall.
              </>
            )}
          </p>
        </div>
      </TiltCard>
    </div>
  );
}
