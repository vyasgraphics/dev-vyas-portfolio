"use client";

import { Fragment, useCallback, useEffect, useRef } from "react";

// The stage strip at the top of a case study's Process section: each stage as
// a node, joined by dashed connectors with dots flowing along them, so the
// section reads as a pipeline with something moving through it rather than as
// a row of labels.
//
// Adapted from an "AI agent pipeline" reference component. Three things about
// that reference did not survive contact with this site, all deliberately:
//
//   1. It is a fixed 620px-wide SVG with every node and path hardcoded as
//      absolute coordinates, for one specific 6-node branching topology
//      (trigger -> vector db -> LLM -> three parallel outputs). What this
//      needs is a LINEAR chain of however many stages the page passes in -
//      five today, and the two case studies do not even use the same five.
//      Hardcoded SVG coordinates cannot express that, so the layout is flex
//      and the connectors are CSS. That is also what makes it responsive:
//      the same markup turns into a vertical pipeline on phones via one
//      media query, where a fixed viewBox would have needed a second
//      hand-drawn diagram.
//   2. Its palette is #0052FF blue throughout; this uses --primary.
//   3. Its header, message ticker and stats footer are invented telemetry -
//      "4.2M tokens", "342ms latency", "1,247 workflows", rolling fake log
//      lines. On a portfolio case study those would sit inches from real
//      research figures and read as equally real. Numbers on these pages
//      have to be defensible, so all of it is gone rather than reworded.
//
// Keeps the same single `stages` prop the pill version had, so neither case
// study page needed changing, and keeps that version's cursor glow.
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
    <div ref={ref} className="vg-process-path" onPointerMove={onPointerMove}>
      <div aria-hidden className="vg-process-path-glow" />

      <ol className="vg-pipe">
        {stages.map((stage, i) => (
          <Fragment key={stage}>
            <li className="vg-pipe-item">
              <div className="vg-pipe-node">
                <span className="vg-pipe-step">Stage {String(i + 1).padStart(2, "0")}</span>
                <span className="vg-pipe-label">{stage}</span>
              </div>

              {/* Connector belongs to the node on its left, so the last stage
                  simply has none and nothing dangles off the end. */}
              {i < stages.length - 1 && (
                <span className="vg-pipe-link" aria-hidden="true">
                  {/* Each runner spans the whole connector and is translated
                      by 100% of ITS OWN width, which is the connector's
                      width - that is what lets a pure-CSS transform animation
                      cover a distance the stylesheet never has to know. The
                      dot rides at the runner's leading edge. Staggering by
                      index makes the flow read as travelling along the whole
                      pipeline rather than every gap pulsing in unison. */}
                  <span className="vg-pipe-runner" style={{ animationDelay: `${i * 0.26}s` }}>
                    <i className="vg-pipe-dot" />
                  </span>
                  <span
                    className="vg-pipe-runner vg-pipe-runner--trail"
                    style={{ animationDelay: `${i * 0.26 + 0.32}s` }}
                  >
                    <i className="vg-pipe-dot" />
                  </span>
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </div>
  );
}
