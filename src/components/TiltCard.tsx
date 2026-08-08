"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Mouse-tracking 3D tilt wrapper. A persistent rAF loop eases the applied
// rotation toward a target every frame (current += (target - current) *
// SMOOTHING) rather than snapping the CSS vars straight to the cursor's
// computed value on every pointermove - that first version tracked 1:1,
// which meant the tilt jumped straight to full deflection the instant the
// pointer entered and released just as abruptly on leave. Lerping the
// same way in both directions is what actually reads as a smooth,
// weighted card rather than a hard-wired cursor follower.
const SMOOTHING = 0.12;
const SETTLE_EPSILON = 0.01;

export function TiltCard({
  children,
  maxTilt = 9,
  className,
  style,
}: {
  children: ReactNode;
  maxTilt?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotionRef = useRef<boolean | null>(null);
  const target = useRef({ px: 0, py: 0 });
  const current = useRef({ px: 0, py: 0 });
  const rafId = useRef<number | null>(null);

  const prefersReducedMotion = () => {
    if (reducedMotionRef.current === null) {
      reducedMotionRef.current =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return reducedMotionRef.current;
  };

  const applyToDOM = (px: number, py: number) => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--ry", `${(px * maxTilt * 2).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-py * maxTilt * 2).toFixed(2)}deg`);
    el.style.setProperty("--px", px.toFixed(3));
    el.style.setProperty("--py", py.toFixed(3));
    el.style.setProperty("--glow-x", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--glow-y", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const tick = () => {
    const c = current.current;
    const t = target.current;
    c.px += (t.px - c.px) * SMOOTHING;
    c.py += (t.py - c.py) * SMOOTHING;
    applyToDOM(c.px, c.py);

    const settled = Math.abs(t.px - c.px) < SETTLE_EPSILON && Math.abs(t.py - c.py) < SETTLE_EPSILON;
    if (settled) {
      // Snap the last fraction of a percent so it actually reaches exactly
      // 0 (or the live target) instead of asymptotically crawling forever,
      // then stop the loop entirely rather than running it at rest.
      applyToDOM(t.px, t.py);
      current.current = { ...t };
      rafId.current = null;
      return;
    }
    rafId.current = requestAnimationFrame(tick);
  };

  const ensureLoopRunning = () => {
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(tick);
    }
  };

  useEffect(() => {
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    target.current = {
      px: (e.clientX - rect.left) / rect.width - 0.5,
      py: (e.clientY - rect.top) / rect.height - 0.5,
    };
    ensureLoopRunning();
  };

  const handleLeave = () => {
    target.current = { px: 0, py: 0 };
    ensureLoopRunning();
  };

  return (
    <div style={{ perspective: "1400px" }}>
      <div
        ref={cardRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={`tilt-card${className ? ` ${className}` : ""}`}
        style={{
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
          transformStyle: "preserve-3d",
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
}
