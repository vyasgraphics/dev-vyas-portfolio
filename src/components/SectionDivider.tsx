"use client";

import { useEffect, useRef, useState } from "react";

// Chapter-marker divider between major sections - a numbered mono label,
// a line that draws itself in on scroll (transform scaleX, not stroke-
// dashoffset, so there's no per-path length math to keep in sync), and a
// short tag naming what the section actually contains. The numbering is
// real here: the six sections are a genuine, roughly chronological build-up
// of craft (marks → motion → social → print → sports → flipbooks), not
// decoration for its own sake.
export function SectionDivider({ index, tag }: { index: string; tag: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "22px" }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 700,
        color: "#00DE51", letterSpacing: "0.02em", flexShrink: 0,
      }}>
        {index}
      </span>
      <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, background: "#00DE51",
          transform: drawn ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left",
          transition: "transform 1.15s cubic-bezier(0.16,1,0.3,1)",
        }} />
      </div>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", fontWeight: 600,
        color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase", flexShrink: 0,
      }}>
        {tag}
      </span>
    </div>
  );
}
