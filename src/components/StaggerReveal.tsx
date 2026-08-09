"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Wraps a single grid item (image or video tile) so it fades and slides up
// into place a beat after its neighbours, cascading left-to-right/top-to-
// bottom as the grid scrolls into view - rather than every item in a row
// popping in simultaneously. Delay is capped so long grids (10+ items)
// don't leave the last row waiting a full second to appear.
export function StaggerReveal({
  children,
  index = 0,
  fan,
}: {
  children: ReactNode;
  index?: number;
  // Optional resting fan angle (in degrees) exposed to descendants as
  // --vg-fan, so a .vg-glass card inside can lean by a per-item amount that
  // CSS nth-child cannot supply through this single-child wrapper.
  fan?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.01, rootMargin: "0px 0px -30px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delay = Math.min(index, 6) * 55;

  return (
    <div
      ref={ref}
      style={{
        height: "100%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(14px)",
        transition: `opacity 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...(fan !== undefined ? ({ "--vg-fan": fan } as React.CSSProperties) : {}),
      }}
    >
      {children}
    </div>
  );
}
