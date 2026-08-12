"use client";

import { useCallback, useEffect, useRef } from "react";

// The stage strip at the top of a case study's Process section, with the
// same green cursor glow the persona cards carry.
//
// Reuses the persona cards' --glow-x/--glow-y convention (see TiltCard.tsx
// and .tilt-glare in styles.css) so both surfaces share one visual
// language, but deliberately NOT TiltCard itself: that wraps its children
// in a 3D transform and parallax layers, which suit a portrait card and
// look wrong on a wide horizontal strip. All this needs is the glare.
//
// Writes CSS custom properties directly on the node rather than going
// through React state - a pointermove-driven re-render on every frame
// would be a lot of reconciliation for a background-position change that
// the compositor can do on its own.
export function ProcessPath({ stages }: { stages: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pending = useRef<{ x: number; y: number } | null>(null);

  const flush = useCallback(() => {
    frame.current = 0;
    const el = ref.current;
    const p = pending.current;
    if (!el || !p) return;
    el.style.setProperty("--glow-x", `${p.x.toFixed(1)}%`);
    el.style.setProperty("--glow-y", `${p.y.toFixed(1)}%`);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Touch has no hovering cursor to follow, and the CSS only reveals
      // the glow under (hover: hover) anyway - so skip the work entirely
      // rather than tracking a pointer that will never show anything.
      if (e.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      pending.current = {
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      };
      // Coalesce to one style write per frame; pointermove can fire far
      // more often than the display refreshes.
      if (!frame.current) frame.current = requestAnimationFrame(flush);
    },
    [flush]
  );

  useEffect(() => {
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="vg-process-path"
      onPointerMove={onPointerMove}
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "20px",
        marginBottom: "40px",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div aria-hidden className="vg-process-path-glow" />
      {stages.map((stage, i) => (
        <div key={stage} style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.72)",
              padding: "8px 16px",
              borderRadius: "100px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              whiteSpace: "nowrap",
            }}
          >
            {stage}
          </span>
          {i < stages.length - 1 && (
            <span aria-hidden style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>
              →
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
