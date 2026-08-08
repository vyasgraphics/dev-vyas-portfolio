"use client";

import { useRef, type ReactNode } from "react";

// Mouse-tracking 3D tilt wrapper. Sets --rx/--ry/--px/--py custom properties
// on the card element directly (no React state, no re-renders) so inner
// elements can reference them in their own transforms via calc() - that's
// what gives the avatar/glow their extra parallax "pop" beyond the outer
// tilt. Resets through a CSS transition on pointer leave rather than a JS
// animation loop.
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

  const prefersReducedMotion = () => {
    if (reducedMotionRef.current === null) {
      reducedMotionRef.current =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return reducedMotionRef.current;
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--ry", `${(px * maxTilt * 2).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-py * maxTilt * 2).toFixed(2)}deg`);
    el.style.setProperty("--px", px.toFixed(3));
    el.style.setProperty("--py", py.toFixed(3));
    el.style.setProperty("--glow-x", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--glow-y", `${((py + 0.5) * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.classList.add("tilt-resetting");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
    el.style.setProperty("--glow-x", "50%");
    el.style.setProperty("--glow-y", "50%");
    window.setTimeout(() => el.classList.remove("tilt-resetting"), 500);
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
