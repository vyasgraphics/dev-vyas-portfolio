"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Wraps fixed-width content that's meant to look like an actual desktop
// webpage (not a responsive layout) and shrinks the whole thing as one
// unit on narrow viewports - the way a phone browser shows a shrunk
// desktop site, rather than reflowing text and columns into a mobile
// layout. Never scales up past natural size (1:1), so wide-viewport
// rendering is completely untouched; this only engages once the container
// is narrower than `width`.
//
// Two ResizeObservers: one on the outer container (catches viewport/column
// width changes) and one on the inner content (catches height changes from
// its own state, e.g. a selection toggling), so the reserved height always
// matches what's actually being painted and nothing clips or leaves a gap.
export function ScaleToFit({ width, children }: { width: number; children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const recompute = () => {
      const containerWidth = outer.clientWidth;
      if (containerWidth === 0) return;
      const nextScale = Math.min(1, containerWidth / width);
      setScale(nextScale);
      setHeight(inner.scrollHeight * nextScale);
    };

    recompute();
    const outerObserver = new ResizeObserver(recompute);
    outerObserver.observe(outer);
    const innerObserver = new ResizeObserver(recompute);
    innerObserver.observe(inner);
    return () => {
      outerObserver.disconnect();
      innerObserver.disconnect();
    };
  }, [width]);

  return (
    <div ref={outerRef} style={{ width: "100%", height, overflow: "hidden" }}>
      <div
        ref={innerRef}
        style={{
          width: `${width}px`,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}
