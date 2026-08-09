"use client";

import { useEffect, useState } from "react";
import { smoothScrollToTop } from "@/lib/smoothScroll";

// Appears once the reader has scrolled a full viewport height, so it
// doesn't clutter the screen right after landing on a long post.
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => smoothScrollToTop({ duration: 1 })}
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(27,30,35,0.85)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 40,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        pointerEvents: visible ? "auto" : "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,222,81,0.5)";
        e.currentTarget.style.color = "#00de51";
        e.currentTarget.style.boxShadow = "0 0 16px 2px rgba(0,222,81,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.35)";
      }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 14.5V3.5M9 3.5L4 8.5M9 3.5L14 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
