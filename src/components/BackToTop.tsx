"use client";

import { useEffect, useRef, useState } from "react";
import { smoothScrollToTop } from "@/lib/smoothScroll";

// Appears once the reader has scrolled a full viewport height, so it
// doesn't clutter the screen right after landing on a long post.
//
// The specular highlight tracks the pointer (--mx/--my below) rather than
// sitting fixed - real glass reflects a light source differently depending
// on where you're looking at it from, which is what Apple's own docs mean
// by glass "reacting to pointer interactions in real time." A short
// scale-down on press adds the same tactile "give" real Liquid Glass
// controls have on touch-down.
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const updatePointer = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((clientX - rect.left) / rect.width) * 100;
    const my = ((clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Back to top"
      onClick={() => smoothScrollToTop({ duration: 1 })}
      onPointerEnter={(e) => {
        setHover(true);
        updatePointer(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => updatePointer(e.clientX, e.clientY)}
      onPointerLeave={() => {
        setHover(false);
        setPressed(false);
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: `1px solid ${hover ? "rgba(0,222,81,0.5)" : "rgba(255,255,255,0.2)"}`,
        background: "radial-gradient(circle at var(--mx, 50%) var(--my, 30%), rgba(255,255,255,0.32), transparent 55%), linear-gradient(150deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.01) 100%), rgba(27,30,35,0.45)",
        backdropFilter: "blur(26px) saturate(190%) brightness(1.08)",
        WebkitBackdropFilter: "blur(26px) saturate(190%) brightness(1.08)",
        boxShadow: hover
          ? "0 0 18px 2px rgba(0,222,81,0.35), inset 0 1.5px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18)"
          : "0 10px 30px rgba(0,0,0,0.32), inset 0 1.5px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.18)",
        color: hover ? "#00de51" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 40,
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? "0" : "12px"}) scale(${pressed ? 0.92 : 1})`,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s cubic-bezier(0.2,0.8,0.2,1)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 14.5V3.5M9 3.5L4 8.5M9 3.5L14 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
