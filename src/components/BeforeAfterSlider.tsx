"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// Drag (or tap-and-drag on touch) to reveal how much of the "after" image
// shows through. Pointer Events cover mouse + touch + pen in one listener
// set, so no separate touch handling is needed.
export function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // percent
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClientX]);

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        draggingRef.current = true;
        updateFromClientX(e.clientX);
      }}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1050 / 1200",
        borderRadius: "16px",
        overflow: "hidden",
        cursor: "ew-resize",
        userSelect: "none",
        touchAction: "none",
        background: "#fff",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={afterLabel} draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, width: `${position}%`, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt={beforeLabel}
          draggable={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: `${100 / (position / 100 || 1)}%`,
            maxWidth: "none",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* labels */}
      <span style={{
        position: "absolute", top: "14px", left: "14px",
        fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
        padding: "5px 12px", borderRadius: "100px",
        background: "rgba(10,10,10,0.7)", color: "#fff",
        opacity: position > 12 ? 1 : 0, transition: "opacity 0.2s ease",
      }}>
        {beforeLabel}
      </span>
      <span style={{
        position: "absolute", top: "14px", right: "14px",
        fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
        padding: "5px 12px", borderRadius: "100px",
        background: "rgba(10,10,10,0.7)", color: "#fff",
        opacity: position < 88 ? 1 : 0, transition: "opacity 0.2s ease",
      }}>
        {afterLabel}
      </span>

      {/* drag handle */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: `${position}%`,
        width: "3px", background: "#00DE51",
        transform: "translateX(-1.5px)", pointerEvents: "none",
        boxShadow: "0 0 12px rgba(0,222,81,0.6)",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "36px", height: "36px", borderRadius: "50%",
          background: "#00DE51",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L1 8L5 13M11 3L15 8L11 13" stroke="#0a0a0a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
