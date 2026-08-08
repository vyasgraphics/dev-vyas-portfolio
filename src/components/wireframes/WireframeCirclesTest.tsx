"use client";

import { useEffect, useRef, useState } from "react";
import { WireframeIntro } from "./PhoneFrame";
import { TiltCard } from "@/components/TiltCard";

// A playable recreation of the working-memory measure used alongside the
// news task - not a screenshot of the validated instrument itself (the real
// circles test belongs to McNab et al., 2015 / the supervising lab's own
// platform), but a faithful, original rebuild of its trial structure: a 4x4
// grid, two red target rings to remember, and - depending on condition -
// two yellow distractor rings appearing either alongside the targets
// (encoding-stage) or only after the targets have disappeared, during the
// wait before recall (delay-stage). No Distraction is the baseline.
//
// Unlike a static diagram, this actually runs a trial: press Start, watch
// the sequence play out at roughly the real task's timing, then click the
// two squares you think held the red rings and see how you did.
const TARGET_CELLS = [1, 9];
const DISTRACTOR_CELLS = [4, 11];

type Condition = "none" | "encoding" | "delay";
type Phase = "idle" | "showing" | "gap" | "response" | "result";

const CONDITIONS: { key: Condition; label: string }[] = [
  { key: "none", label: "No Distraction" },
  { key: "encoding", label: "Encoding" },
  { key: "delay", label: "Delay" },
];

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

const SHOW_MS = 1400;
const GAP_MS = 1300;
const CELL = 58;
const GAP_PX = 8;

export function WireframeCirclesTest({
  showIntro = true,
  badge = "02",
  title = "Measuring distraction resistance",
  description = (
    <>
      <strong style={{ color: "#fff" }}>Component:</strong>{" "}
      the working-memory measure participants completed alongside the search task, adapted from a validated
      circles test. Pick a trial type and run it yourself.
    </>
  ),
}: {
  showIntro?: boolean;
  badge?: string;
  title?: string;
  description?: React.ReactNode;
}) {
  const [condition, setCondition] = useState<Condition>("encoding");
  const [phase, setPhase] = useState<Phase>("idle");
  const [pick, setPick] = useState<number[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const selectCondition = (c: Condition) => {
    clearTimers();
    setCondition(c);
    setPhase("idle");
    setPick([]);
  };

  const start = () => {
    clearTimers();
    setPick([]);
    setPhase("showing");
    const t1 = setTimeout(() => setPhase("gap"), SHOW_MS);
    const t2 = setTimeout(() => setPhase("response"), SHOW_MS + GAP_MS);
    timers.current = [t1, t2];
  };

  const tryAgain = () => {
    clearTimers();
    setPhase("idle");
    setPick([]);
  };

  const clickCell = (i: number) => {
    if (phase !== "response") return;
    setPick((p) => {
      if (p.includes(i)) return p.filter((x) => x !== i);
      if (p.length >= 2) return p;
      return [...p, i];
    });
  };

  const submit = () => setPhase("result");

  const correctCount = pick.filter((i) => TARGET_CELLS.includes(i)).length;

  // What each of the 16 cells should show right now, given phase/condition.
  const cellState = (i: number): "target" | "distractor" | "userPick" | "correct" | "wrong" | "missed" | "empty" => {
    const isTarget = TARGET_CELLS.includes(i);
    const isDistractor = DISTRACTOR_CELLS.includes(i);

    if (phase === "showing") {
      if (isTarget) return "target";
      if (isDistractor && condition === "encoding") return "distractor";
      return "empty";
    }
    if (phase === "gap") {
      if (isDistractor && condition === "delay") return "distractor";
      return "empty";
    }
    if (phase === "response") {
      return pick.includes(i) ? "userPick" : "empty";
    }
    if (phase === "result") {
      const picked = pick.includes(i);
      if (isTarget && picked) return "correct";
      if (!isTarget && picked) return "wrong";
      if (isTarget && !picked) return "missed";
      return "empty";
    }
    return "empty";
  };

  const copy = CONDITION_COPY[condition];

  return (
    <div>
      {showIntro && <WireframeIntro badge={badge} title={title} description={description} />}
      <TiltCard maxTilt={3}>
        <div
          style={{
            width: "100%",
            maxWidth: "660px",
            margin: "0 auto",
            borderRadius: "18px",
            border: "2px solid #334155",
            overflow: "hidden",
            background: "#f8fafc",
            boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
            fontFamily: "'JetBrains Mono', monospace",
            color: "#334155",
            padding: "clamp(22px, 4vw, 36px)",
          }}
        >
          {/* Condition selector */}
          <div style={{ display: "flex", background: "#e2e8f0", padding: "4px", borderRadius: "10px", marginBottom: "26px" }}>
            {CONDITIONS.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => selectCondition(c.key)}
                style={{
                  flex: 1, padding: "11px 6px", textAlign: "center", fontSize: "13px", fontWeight: 700, borderRadius: "7px",
                  cursor: "pointer", transition: "all 0.2s ease",
                  background: condition === c.key ? "#fff" : "transparent",
                  color: condition === c.key ? "#1e293b" : "#94a3b8",
                  boxShadow: condition === c.key ? "0 1px 4px rgba(0,0,0,0.14)" : "none",
                  border: "none",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "18px" }}>
            {/* Status line */}
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#1e293b", textAlign: "center", minHeight: "20px", margin: 0 }}>
              {phase === "idle" && "Press Start to run a trial"}
              {phase === "showing" && "Remember the red rings\u2026"}
              {phase === "gap" && (condition === "delay" ? "Stay with it\u2026" : "Hold onto it\u2026")}
              {phase === "response" && `Click the 2 squares - ${pick.length}/2 selected`}
              {phase === "result" && (correctCount === 2 ? "Got both! \u2713" : correctCount === 1 ? "Got 1 of 2" : "Got 0 of 2")}
            </p>

            {/* The grid */}
            <div style={{ display: "grid", gridTemplateColumns: `repeat(4, ${CELL}px)`, gap: `${GAP_PX}px` }}>
              {Array.from({ length: 16 }).map((_, i) => {
                const state = cellState(i);
                const clickable = phase === "response";
                let ringColor: string | null = null;
                let bg = "#fff";
                let borderColor = "#cbd5e1";
                let content: React.ReactNode = null;

                if (state === "target") ringColor = "#ef4444";
                if (state === "distractor") ringColor = "#eab308";
                if (state === "userPick") {
                  bg = "#eff6ff";
                  borderColor = "#3b82f6";
                  content = <div style={{ width: "16px", height: "16px", borderRadius: "50%", border: "3px solid #3b82f6" }} />;
                }
                if (state === "correct") {
                  bg = "#f0fdf4";
                  borderColor = "#22c55e";
                  content = <span style={{ color: "#16a34a", fontWeight: 800, fontSize: "20px" }}>✓</span>;
                }
                if (state === "wrong") {
                  bg = "#fef2f2";
                  borderColor = "#ef4444";
                  content = <span style={{ color: "#dc2626", fontWeight: 800, fontSize: "20px" }}>✕</span>;
                }
                if (state === "missed") {
                  borderColor = "#f59e0b";
                  content = <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: "3px dashed #f59e0b" }} />;
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => clickCell(i)}
                    disabled={!clickable}
                    style={{
                      width: `${CELL}px`, height: `${CELL}px`, borderRadius: "8px",
                      border: `2px solid ${borderColor}`, background: bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: clickable ? "pointer" : "default",
                      transition: "background 0.2s ease, border-color 0.2s ease",
                      padding: 0,
                    }}
                  >
                    {content}
                    {ringColor && (
                      <div style={{ width: "22px", height: "22px", borderRadius: "50%", border: `4px solid ${ringColor}` }} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div style={{ minHeight: "44px", display: "flex", alignItems: "center" }}>
              {phase === "idle" && (
                <button type="button" onClick={start} style={primaryBtn}>
                  Start trial →
                </button>
              )}
              {phase === "response" && (
                <button type="button" onClick={submit} disabled={pick.length !== 2} style={{ ...primaryBtn, opacity: pick.length === 2 ? 1 : 0.4, cursor: pick.length === 2 ? "pointer" : "default" }}>
                  Check answer
                </button>
              )}
              {phase === "result" && (
                <button type="button" onClick={tryAgain} style={primaryBtn}>
                  Try again
                </button>
              )}
            </div>
          </div>

          <p style={{ fontSize: "13px", lineHeight: 1.6, color: "#475569", textAlign: "center", margin: "22px 0 0" }}>
            <strong style={{ color: "#1e293b" }}>{copy.name}:</strong> {copy.text}
          </p>
        </div>
      </TiltCard>
    </div>
  );
}

const primaryBtn: React.CSSProperties = {
  padding: "11px 26px",
  borderRadius: "8px",
  background: "#1e293b",
  color: "#fff",
  border: "none",
  fontSize: "13.5px",
  fontWeight: 700,
  cursor: "pointer",
};
