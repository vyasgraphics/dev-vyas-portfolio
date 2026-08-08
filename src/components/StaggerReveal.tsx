"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Wraps a single grid item (image or video tile) so it fades and slides up
// into place a beat after its neighbours, cascading left-to-right/top-to-
// bottom as the grid scrolls into view - rather than every item in a row
// popping in simultaneously. Delay is capped so long grids (10+ items)
// don't leave the last row waiting a full second to appear.
export function StaggerReveal({ children, index = 0 }: { children: ReactNode; index?: number }) {
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

  const delay = Math.min(index, 7) * 65;

  return (
    <div
      ref={ref}
      style={{
        height: "100%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
