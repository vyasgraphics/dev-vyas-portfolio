"use client";

import { useState } from "react";
import { WireframeIntro } from "./PhoneFrame";
import { TiltCard } from "@/components/TiltCard";

// Illustrates how the working-memory measure used alongside the news task
// is actually calculated - an original diagram built for this site, not a
// screenshot of the validated instrument itself (the real circles test
// belongs to McNab et al., 2015 / the supervising lab's own platform), but
// a faithful recreation of its trial structure directly from the reference
// figure: a 4x4 grid, two red target rings to remember, and - depending on
// condition - two yellow distractor rings appearing either alongside the
// targets (encoding-stage) or only after the targets have disappeared,
// during the wait before recall (delay-stage). No Distraction is the
// baseline. Purely illustrative - not an interactive trial to run.
const TARGET_CELLS = new Set([1, 9]);
const DISTRACTOR_CELLS = new Set([4, 11]);

type Condition = "none" | "encoding" | "delay";

const CONDITIONS: { key: Condition; label: string }[] = [
  { key: "none", label: "No Distraction" },
  { key: "encoding", label: "Encoding" },
  { key: "delay", label: "Delay" },
];

// Each condition is the sequence of panels shown in the reference figure -
// what's visible on screen, a caption above (only the first and last panel
// carry one), and a timing label below (only Delay marks timing, matching
// the original).
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

const CONDITION_COPY: Record<Condition, { name: string; text: string }> = {
  none: {
    name: "No Distraction (ND)",
    text: "The baseline. Just two rings to hold in mind, nothing competing for attention.",
  },
  encoding: {
    name: "Encoding distraction (ED)",
    text: "Yellow rings appear at the same time as the red ones you're trying to remember.",
  },
  delay: {
    name: "Delay distraction (DD)",
    text: "The red rings are gone, held only in memory, when yellow rings appear during the wait before recall.",
  },
};

// Floors and vw-coefficients tuned against the actual card content width at
// narrow phone viewports (measured 162px at 320px wide, 217px at 375px),
// not just against the full viewport - the old clamp() floors (20px cell,
// 88px-ish gap on the flex row) assumed more room than the card's own
// padding and the page's outer margins actually leave, so three panels
// side by side needed ~270px against ~217px available and the overflow
// past the card's overflow:hidden edge was silently clipped rather than
// shown or wrapped. Desktop is unaffected: both the old and new formulas
// already reach their max (34px) well before typical desktop widths
// (old cap point ~607px viewport, new ~1133px, and this component is only
// ever viewed inside the reading column, comfortably past both once the
// viewport itself is any real desktop size).
const CELL = "clamp(10px, 3vw, 34px)";
const CELL_GAP = "clamp(1px, 0.35vw, 4px)";

function MiniGrid({ target, distractor }: { target: boolean; distractor: boolean }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(4, ${CELL})`, gap: CELL_GAP }}>
      {Array.from({ length: 16 }).map((_, i) => {
        const isTarget = target && TARGET_CELLS.has(i);
        const isDistractor = distractor && DISTRACTOR_CELLS.has(i);
        return (
          <div
            key={i}
            style={{
              width: CELL, height: CELL, border: "1px solid #cbd5e1", background: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            {(isTarget || isDistractor) && (
              <div
                style={{
                  width: "clamp(11px, 3.2vw, 18px)", height: "clamp(11px, 3.2vw, 18px)", borderRadius: "50%",
                  border: `2.5px solid ${isTarget ? "#ef4444" : "#eab308"}`,
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
  const copy = CONDITION_COPY[condition];

  return (
    <div>
      {showIntro && <WireframeIntro badge={badge} title={title} description={description} />}
      <TiltCard maxTilt={4}>
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "0 auto",
            borderRadius: "16px",
            border: "2px solid #334155",
            overflow: "hidden",
            background: "#f8fafc",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#334155",
            padding: "clamp(10px, 3vw, 32px)",
          }}
        >
          {/* Condition selector - alignItems: center keeps every tab at its
              own natural height, so a long label (e.g. "No Distraction")
              never stretches its neighbours into a taller, misaligned box. */}
          <div style={{ display: "flex", alignItems: "center", background: "#e2e8f0", padding: "4px", borderRadius: "10px", marginBottom: "28px" }}>
            {CONDITIONS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setCondition(c.key)}
                style={{
                  flex: 1,
                  // "Distraction" alone is 11 characters, which in this
                  // monospace font has a fixed minimum width a flex item
                  // won't shrink below by default (flex items don't shrink
                  // past their own content's min-content size unless told
                  // to) - three tabs' worth of that minimum overflowed the
                  // card at the smallest common phone width (320px), the
                  // same way the panels below did. minWidth:0 removes that
                  // floor so the three tabs genuinely share the row evenly;
                  // overflowWrap:"break-word" (not "anywhere") only then
                  // breaks the word as a last resort if the space that
                  // leaves is still too narrow to wrap normally - "anywhere"
                  // was tried first and, because it also feeds into the
                  // browser's flex-sizing math rather than just the visual
                  // wrap, it broke "Distraction" mid-word even at 375px
                  // where plain word-wrapping already fit fine.
                  minWidth: 0,
                  overflowWrap: "break-word",
                  padding: "9px clamp(3px, 1.5vw, 6px)", textAlign: "center", fontSize: "clamp(10px, 3vw, 12.5px)", fontWeight: 700, borderRadius: "7px",
                  cursor: "pointer", transition: "all 0.2s ease",
                  display: "flex", justifyContent: "center", alignItems: "center",
                  background: condition === c.key ? "#fff" : "transparent",
                  color: condition === c.key ? "#1e293b" : "#94a3b8",
                  boxShadow: condition === c.key ? "0 1px 4px rgba(0,0,0,0.14)" : "none",
                  border: "none",
                  lineHeight: 1.3,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", rowGap: "16px", columnGap: "clamp(3px, 1.2vw, 20px)" }}>
            {panels.map((panel, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ height: "30px", display: "flex", alignItems: "flex-end", marginBottom: "10px" }}>
                  <p style={{ fontSize: "clamp(8.5px, 2.4vw, 10px)", fontWeight: 700, color: "#64748b", textAlign: "center", lineHeight: 1.35, margin: 0, maxWidth: "clamp(68px, 22vw, 88px)" }}>
                    {panel.caption}
                  </p>
                </div>
                <MiniGrid target={panel.target} distractor={panel.distractor} />
                <div style={{ height: "18px", marginTop: "8px" }}>
                  {panel.timing && (
                    <p style={{ fontSize: "clamp(8px, 2.2vw, 9.5px)", fontWeight: 600, color: "#94a3b8", margin: 0, fontStyle: "italic", whiteSpace: "nowrap" }}>
                      {panel.timing}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "12.5px", lineHeight: 1.6, color: "#475569", textAlign: "center", margin: "24px 0 0" }}>
            <strong style={{ color: "#1e293b" }}>{copy.name}:</strong> {copy.text}
          </p>
        </div>
      </TiltCard>
    </div>
  );
}
